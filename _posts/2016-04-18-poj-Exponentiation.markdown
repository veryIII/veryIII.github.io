---
layout:     post
title:      "poj 1001 Exponentiation"
subtitle:   "poj 1001题（大数运算）"
date:       2016-04-18 12:00:00
author:     "Zeg"
header-img: "img/2016-04-18-bg.jpg"
tags:
    - poj
    - 算法
    - c++
---

## <a target="_blank" href="http://poj.org/problem?id=1001">Exponentiation（大数运算）</a>

### 题目

#### Description

>对数值很大、精度很高的数进行高精度计算是一类十分常见的问题。比如，对国债进行计算就是属于这类问题。 

>现在要你解决的问题是：对一个实数R( 0.0 < R < 99.999 )，要求写程序精确计算 R 的 n 次方(Rn)，其中n 是整数并且 0 < n <= 25。

#### Input

>T输入包括多组 R 和 n。 R 的值占第 1 到第 6 列，n 的值占第 8 和第 9 列。

#### Output

>对于每组输入，要求输出一行，该行包含精确的 R 的 n 次方。输出需要去掉前导的 0 后不要的 0 。如果输出是整数，不要输出小数点。

#### Sample Input

```
95.123 12
0.4321 20
5.1234 15
6.7592  9
98.999 10
1.0100 12
```

Sample Output

```
548815620517731830194541.899025343415715973535967221869852721
.00000005148554641076956121994511276767154838481760200726351203835429763013462401
43992025569.928573701266488041146654993318703707511666295476720493953024
29448126.764121021618164430206909037173276672
90429072743629540498.107596019456651774561044010001
1.126825030131969720661201
```

## 正文

先吐槽一下，作为第一道题难度这么大好吗？

这道题考查的是大数运算，大数次幂首先就是要计算`大数乘法`。 

大数乘法的计算就和我们手算乘法差不多，把每一位拆开，然后按位计算，下面一段就是核心算法：

```cpp
//计算 pc = pa * pb;
int i, j;
			for (i = 0; pa[i] != '*'; i++)
				for (j = 0; pb[j] != '*'; j++)
				{
					pc[i + j] += pa[i] * pb[j];
					if (pc[i + j] >= 10)//进位
					{
						pc[i + j + 1] += pc[i + j] / 10;
						pc[i + j] %= 10;
					}
				}
			//if (0 == pc[i + j - 1]) i--;//去除最高位的0
			pc[i + j] = '*';
```

然后要注意的就是几个输出条件，对没有0进行删除调整。

求`n`次幂就是自乘`n-1`次，可是这样有点浪费时间。所以我就调整了一下算法，多加了一个临时空间来简化算法2。后来我又发现了更快的算法3，可是懒得去实现。效果如下：

比如求12次幂，每次计算后最大次幂为：

* 算法一： `2 3 4 5 6 7 8 9 10 11 12`
* 算法二： `2 3 5 8 11 12`
* 算法三： `2 4 8 12`

### code

以下为算法二的实现代码：

```c++
#include <iostream>
#include <string>
#include <math.h>
using namespace std;
#define i_size 100
/*
* 求大数幂函数
*
* 参数
*     data 底数所在数组
*     n 幂
*     dSize 底数的位数
*
* 返回 结果数组
*/

char *Exponentiation(char *data, int n, int dSize)//参数(底数，幂，底数位数)
{
	int pSize = n * dSize + 1;//临时数组的长度（最后一位用来保存当前是几次方）
	char *pa = new char[pSize + 1];
	char *pb = new char[pSize + 1];
	char *pc = new char[pSize + 1];//开辟三个数组来储存临时计算结果
	for (int i = 0; data[i - 1] != '*'; i++)//初始化pc数组
		pc[i] = data[i];
	pc[pSize] = 1;

	while (pc[pSize] != n)
	{
		for (int i = 0; data[i - 1] != '*'; i++)//初始化pa数组
			pa[i] = data[i];
		pa[pSize] = 1;
		while (true)
		{
			//交换指针顺序（初始pc>pa>pb）
			if (pc[pSize] + pa[pSize] <= n)
			{
				char *p = pc; pc = pb; pb = pa; pa = p;
			}
			else if (pc[pSize] + pb[pSize] <= n)
			{
				char *p = pa; pa = pc; pc = p;
			}
			else  break;//幂已近足够大，进行下一次循环

			for (int i = 0; i <= pSize; i++)//清空结果数组
				pc[i] = 0;
			pc[pSize] = pa[pSize] + pb[pSize];

			int i, j;
			for (i = 0; pa[i] != '*'; i++)
				for (j = 0; pb[j] != '*'; j++)
				{
					pc[i + j] += pa[i] * pb[j];
					if (pc[i + j] >= 10)//进位
					{
						pc[i + j + 1] += pc[i + j] / 10;
						pc[i + j] %= 10;
					}
				}
			//if (0 == pc[i + j - 1]) i--;//去除最高位的0
			pc[i + j] = '*';
		}
	}
	delete[] pb; delete[] pa;
	return pc;
}

int main()
{
	int i, j, n, nd, dSize;
	char m_data[i_size];

	while (cin >> m_data >> n) {

		for (dSize = 0; m_data[dSize] != NULL; dSize++);//测出底数的长度
		for (dSize--; m_data[dSize] == '0'; dSize--);//减去末尾的0
		for (i = 0; m_data[i] != '.'; i++)//去除小数点
			m_data[i] -= '0';
		nd = i;//保存整数位数
		for (; m_data[i] != NULL; i++)
			m_data[i] = m_data[i + 1] - '0';
		for (i = (dSize - 1) / 2; i >= 0; i--)//倒置
		{
			j = m_data[i];
			m_data[i] = m_data[dSize - 1 - i];
			m_data[dSize - 1 - i] = j;
		}
		if (0 == m_data[dSize - 1])//去除前导0
		{
			dSize--; nd--;
		}
		nd = dSize - nd;//转为小数位数
		m_data[dSize] = '*';//添加末尾标记

		//cout << dSize << " " << nd << endl;
		char *p = Exponentiation(m_data, n, dSize);

		for (i = dSize * n + 1; p[i] != '*'; i--);//找到结果长度
		for (i--; p[i] == 0 && i >= nd * n; i--);//去除后无用0
		i++;
		for (int j = i - nd * n; j > 0; j--)
			cout << (int)p[--i];
		cout << '.';
		while (i != 0)
			cout << (int)p[--i];
		cout << endl;
	}
	//计算
	//输出
	return 0;
}
```

### 问题

1. 本地示例运行正常（如图），可是提交以后一直提示错误的结果，所以希望各位能指出问题所在。
 ![示例]({{site.img}}/2016-04-18-bg-a.png)

2. 还有输入要求里面的那一行话也看不懂

>T输入包括多组 R 和 n。 R 的值占第 1 到第 6 列，n 的值占第 8 和第 9 列。

这里的第8 和第 9 列到底是什么意思，难道输入格式不是示例上那样吗？

