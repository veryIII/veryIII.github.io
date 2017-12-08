---
layout:     post
title:      "poj 1007 DNA Sorting"
subtitle:   "poj 1007题"
date:       2016-04-12 12:00:00
author:     "Zeg"
header-img: "img/2016-04-12-bg.jpg"
tags:
    - poj
    - c++
    - 算法
---

## <a href="http://poj.org/problem?id=1007" target="_blank">DNA 排序</a>

### 题目大意：

序列“未排序程度”的一个计算方式是元素乱序的元素对个数。例如：在单词序列“DAABEC'”中，因为D大于右边四个单词，E大于C，所以计算结果为5。这种计算方法称为序列的逆序数。序列“AACEDGG”逆序数为1（E与D）——近似排序，而序列``ZWQM'' 逆序数为6（它是已排序序列的反序）。

你的任务是分类DNA字符串（只有ACGT四个字符）。但是你分类它们的方法不是字典序，而是逆序数，排序程度从好到差。所有字符串长度相同。
     
#### 输入：

第一行包含两个数：一个正整数n（0<n<=50）表示字符串长度，一个正整数m（0<m<=100）表示字符串个数。接下来m行，每行一个长度为n的字符串。

#### 输出：

输出输入字符串列表，按排序程度从好到差。如果逆序数相同，就原来顺序输出。

##### 样例输入：

`10 6`

`AACATGAAGG`

`TTTTGGCCAA`

`TTTGGCCAAA`

`GATCAGATTT`

`CCCGGGGGGA`

`ATCGATGCAT`

##### 样例输出:

`CCCGGGGGGA`

`AACATGAAGG`

`GATCAGATTT`

`ATCGATGCAT`

`TTTTGGCCAA`

`TTTGGCCAAA`

###  思路

本题主要在于考察排序，难度比较高。关键在于计算`逆序数`，逆序数的算法有多种。

第一种就是`遍历法`，直接对数组进行遍历比较，然后计算逆序数。但这种方法非常浪费时间时间复杂度为`O（n ^ 2）`；

常用的计算逆序数的方法是`并归排序法`。

>`归并排序`(英语：Merge sort，或mergesort)，是创建在归并操作上的一种有效的排序算法，效率为O(n log n)。1945年由约翰·冯·诺伊曼首次提出。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用，且各层分治递归可以同时进行。 ——维基百科

![示例]({{site.img}}/2016-04-12-bg-Merge-sort.gif)

![示例]({{site.img}}/2016-04-12-bg-bgpx.jpg)

因为并归排序的时间复杂度为`O(n log n)`，所以求逆序数的算法时间复杂度也是O(n log n)。

代码如下：

```c++
/*
* 计算字符串逆序数
*
* 参数说明：
*     daStr -- 目标字符串
*     daSize -- 目标字符串的长度
*/
int fun(char *daStr, int daStart, int daEnd)
{
	int mergeSort = 0;
	int daMid = (daStart + daEnd) / 2;//求中间位置
	if (daStart != daMid)//递归分解排序
	{
		mergeSort += fun(daStr, daStart, daMid);
		mergeSort += fun(daStr, daMid + 1, daEnd);
	}
	char *temp = new char[daEnd - daStart + 1];//开辟临时空间
	int k = 0, i = daStart, j = daMid + 1;
	while (i <= daMid && j <= daEnd)//进行排序
		if (daStr[i] > daStr[j])
		{
			temp[k++] = daStr[j++];
			mergeSort += (daMid - i + 1); /***************本句是关键********************/
		}
		else 
			temp[k++] = daStr[i++];
	while (i <= daMid)
		temp[k++] = daStr[i++];
	while (j <= daEnd)
		temp[k++] = daStr[j++];

	for (i = daStart, j = 0; i <= daEnd; i++, j++)//将数据放回原数组
		daStr[i] = temp[j];
	delete[] temp;//销毁临时空间
	return mergeSort;
}
```

这里关键的一句是`mergeSort += (daMid - i + 1);`，逆序数等于左边数组的剩下元素长度，自己可以画图理解一下。

对数组计算逆序数后，就要按照逆序数大小输出DNA序列了。这时可以用冒泡排序法来对逆序数排序，最后输出。

完整程序如下：

```c++
#include "stdafx.h"
#include <iostream>
using namespace std;

/*
* 计算字符串逆序数
*
* 参数说明：
*     daStr -- 目标字符串
*     daSize -- 目标字符串的长度
*/
int fun(char *daStr, int daStart, int daEnd)
{
	int mergeSort = 0;
	int daMid = (daStart + daEnd) / 2;//求中间位置
	if (daStart != daMid)//递归分解排序
	{
		mergeSort += fun(daStr, daStart, daMid);
		mergeSort += fun(daStr, daMid + 1, daEnd);
	}
	char *temp = new char[daEnd - daStart + 1];//开辟临时空间
	int k = 0, i = daStart, j = daMid + 1;
	while (i <= daMid && j <= daEnd)//进行排序
		if (daStr[i] > daStr[j])
		{
			temp[k++] = daStr[j++];
			mergeSort += (daMid - i + 1);
		}
		else 
			temp[k++] = daStr[i++];
	while (i <= daMid)
		temp[k++] = daStr[i++];
	while (j <= daEnd)
		temp[k++] = daStr[j++];

	for (i = daStart, j = 0; i <= daEnd; i++, j++)//将数据放回原数组
		daStr[i] = temp[j];
	delete[] temp;//销毁临时空间
	return mergeSort;
}

int main()
{
	int n, m;//n（0<n <= 50）表示字符串长度，m（0<m <= 100）表示字符串个数
	cin >> n >> m;

	char**a = new char*[m];
	for (int i = 0; i < m; i++)
	{
		a[i] = new char[n + 1];//创建空间，最后一位为结束标识
		cin >> a[i];//接收数据

		char* p = new char[n + 1];//开辟临时空间
		for (int j = 0; j < n; j++)//对临时空间赋值
			p[j] = a[i][j];
		a[i][n] = fun(p, 0, n-1);//计算逆序数,并存在原数组最后一位
		delete[] p;//释放临时空间
	}
	
	//对逆序数和DNA冒泡排序
	for (int i = 1; i < m; i++)
		for (int j = 1; j < m; j++) 
			if (a[j - 1][n] > a[j][n])
			{
				char* temp = a[j];
				a[j] = a[j - 1];
				a[j - 1] = temp;
			}
	//输出结果并释放空间
	for (int i = 0; i <	m; i++)
	{
		for (int j = 0; j < n; j++)
			cout << a[i][j];
		cout << endl;
		delete[] a[i];
	}
	delete[] a;
	return 0;
}
```

### 总结

这个题分别使用了**并归排序**和**冒泡排序**来计算和输出DNA的排序程度，具有一定难度。但整体思路并不难，只要掌握这两种排序方法就可以轻松做出本题。还有一点，要搞清楚*并归排序*和*逆序数*的关系。

