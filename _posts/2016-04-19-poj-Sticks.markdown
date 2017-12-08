---
layout:     post
title:      "poj 1011 Sticks"
subtitle:   "poj 1011题(经典搜索+剪枝)"
date:       2016-04-19 12:00:00
author:     "Zeg"
header-img: "img/2016-04-19-bg.jpg"
tags:
    - poj
    - 算法
    - c++
---

## <a target="_blank" href="http://poj.org/problem?id=1011">木棒（经典搜索）</a>

### 题目

#### Description

乔治拿来一组等长的木棒，将它们随机地砍断，使得每一节木棍的长度都不超过50个长度单位。然后他又想把这些木棍恢复到为裁截前的状态，但忘记了初始时有多少木棒以及木棒的初始长度。请你设计一个程序，帮助乔治计算木棒的可能最小长度。每一节木棍的长度都用大于零的整数表示。

#### Input

输入包含多组数据，每组数据包括两行。第一行是一个不超过64的整数，表示砍断之后共有多少节木棍。第二行是截断以后，所得到的各节木棍的长度。在最后一组数据之后，是一个零。

#### Output

为每组数据，分别输出原始木棒的可能最小长度，每组数据占一行。

#### Sample Input

```
9
5 2 1 5 2 1 5 2 1
4
1 2 3 4
0
```

#### Sample Output

```
6
5
```

### 正文

这一题就是传说中的经典搜索，主要就是**搜索**和**剪枝**。花了半天时间才做出来，主要是最开始有了一点思路就开始写了，到最后又全部删了重写。

很容易想到木棍原长度一定是总长度的因数，所以最开始要对木棍长度**求和**。从长木棍到短木棍（就像往瓶子里面灌石子、沙子和水一样）可以大幅度降低搜索次数，所以开始也要对木棒**排序**。

还有一个就是**标志位**，对每一段碎片设一个标志位可以很好的判断这个片段是否使用。

我觉得这题最难的一点就是递归寻找时的返回条件和返回值，在这里我绕了很长的时间才弄好。

### code

代码如下：

```cpp
#include <iostream>
using namespace std;

struct Stick
{
	int size;//长度
	bool is;//使用标志
};

Stick* sticks;//碎片所在数组
int nSize;//碎片个数
int isF;//返回状态

/*
* 拼接木棍函数
*
* 参数：
*     mun 当前木棍长度
*     k 真实木棍长度
*     i 本次操作的木棍序号
* 返回值：
*     0 本分支错误
*     1 测试正确
*     2 测试错误
*/
int fun(int mun, int k, int i)
{
	//当前木棍长度，本次使用的木棍序号
	for (; i < nSize; i++)
	{
		if (sticks[i].is == false && mun + sticks[i].size <= k)
		{
			mun += sticks[i].size;
			//cout << '(' << i << ')' << sticks[i].size << ' ' << mun << endl;
			sticks[i].is = true;
			if (mun == k)//木棍长度填满后，开始下一根木棍
			{
				isF = fun(0, k, 0);
				if (isF == 0) //本分枝错误，恢复状态
				{
					sticks[i].is = false;
					mun -= sticks[i].size;
				}
				return isF;
			}
			else
			{
				isF = fun(mun, k, i + 1);
				if (isF == 0)
				{
					sticks[i].is = false;
					mun -= sticks[i].size;
					if (mun == 0)
						return 0;
					for (; i + 1 < nSize && sticks[i].size == sticks[i + 1].size; i++);//》》》》》剪枝5：如果下一个木棒与本木棒相等则不再搜索下一个《《《《《
				}
				else
					return isF;
			}
		}
	}
	if (mun == 0)//》》》》》剪枝4：本轮搜索完成后如果当前木棍没有到长度则本分支错误《《《《《
		return 1;
	else
		return 0;
}

int main()
{
	cin >> nSize;
	while (nSize != 0)
	{
		sticks = new Stick[nSize];
		int sum = 0;//碎片长度和
		for (int i = 0; i < nSize; i++)
		{
			cin >> sticks[i].size;
			sum += sticks[i].size;
		}
		for (int j = 0; j < nSize - 1; j++)//》》》》》剪枝1：对碎片进行从大到小排序可大幅度减小遍历次数《《《《《
			for (int i = 0; i < nSize - 1; i++)
				if (sticks[i].size < sticks[i + 1].size)
				{
					int temp = sticks[i].size;
					sticks[i].size = sticks[i + 1].size;
					sticks[i + 1].size = temp;
				}
		int m = sticks[0].size;//》》》》》剪枝2：测试长度应该是 最长片段长度<=m<=木棍长度和《《《《《
		//cout << "sum = " << sum << " nSize = " << nSize << endl;
		//cout << "Sticks = ";
		//for (int i = 0; i < nSize; i++)
		//	cout << sticks[i].size << ' ';
		//cout << endl;

		for (; m < sum; m++)
			if (sum % m == 0)//》》》》》剪枝3：测试长度应该是长度和的因数《《《《《
			{
				for (int i = 0; i < nSize; i++)//将标志位初始化
					sticks[i].is = false;
				int zz = fun(0, m, 0);
				//cout << "m = " << m << " zz = " << zz << endl;
				if (zz == 1)
					break;
			}
		cout << m << endl;
		delete[] sticks;
		cin >> nSize;
	}

	return 0;
}
```

