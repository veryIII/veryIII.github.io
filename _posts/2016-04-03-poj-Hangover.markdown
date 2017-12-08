---
layout:     post
title:      "poj 1003 Hangover"
subtitle:   "poj 1003题"
date:       2016-04-03 12:00:00
author:     "Zeg"
header-img: "img/2016-04-03-bg.jpg"
tags:
    - poj
    - c++
---

## 前言

>POJ 是“北京大学程序在线评测系统”（Peking University Online Judge）的缩写，是个提供编程题目的网站，兼容Pascal、C、C++、Java、Fortran等多种语言。

## 翻译

#### Description

How far can you make a stack of cards overhang a table?
你能使卡片伸出桌子边多远？

If you have one card, you can create a maximum overhang of half a cardlength.
如果你有一张卡片，你最多能使卡片长度的一半伸出桌子。

(We're assuming that the cards must be perpendicular to the table.)
（我们假设卡片垂直于桌子）

With two cards you can make the top card overhang the bottom one by half acard length,
如果有两张卡片，你最多能使上面一张卡片的1/2超出下面一张卡片

 and the bottom one overhang thetable by a third of a card length,
下面一张卡片的1/3伸出桌子

for a total maximum overhang of 1/2 + 1/3 = 5/6 cardlengths.
总共伸出桌子的长度是1/2 + 1/3 = 5/6个卡片长度

In general you can make n cards overhang by 1/2 + 1/3 + 1/4 + ... +1/(n + 1) cardlengths,
总之，你可以使n张卡片的1/2 + 1/3 + 1/4 + ... +1/(n + 1)长度伸出桌子

where the top card overhangs the second by 1/2,
最上一张卡片伸出1/2

the second overhangs tha third by 1/3,
第二张伸出1/3

 the third overhangs the fourth by1/4, etc.,
第三张伸出1/4

and the bottom card overhangs the table by 1/(n + 1).
最下面一张伸出1/(n + 1)

This is illustrated in the figure below.
如下图所示

![enter image description here](http://poj.org/images/1003/hangover.jpg)

#### Input

The inputconsists of one or more test cases,
输入包含多组测试数据

followed by aline containing the number 0.00 that signals the end of the input.
0.00表示输入结束

 Each test case is a single line containing apositive floating-point number c whose value is at least 0.01 and at most 5.20;
每组测试占一行，包含一个0.01到 5.20之间的小数c

c willcontain exactly three digits.
c恰好是一个三位数

#### Output

For each testcase, output the minimum number of cards necessary to achieve an overhang of atleast c card lengths.
对于每组测试，输出伸出长度c最少需要的卡片数量

 Use the exact output format shown in theexamples.
用精确的数输出。

#### Sample Input

```
1.00
3.71
0.04
5.19
0.00
```

#### Sample Output

```
3card(s)
61card(s)
1card(s)
273card(s)
```

## 正文

<a href="http://poj.org/problem?id=1003" target="_blank">poj 1003</a>并不难，毕竟只是第4题，所以也不过多解释，下面是我用c++写的例子：

``` cpp
include <iostream>
using namespace std;

int hangover(float size)
{
	double sum = 0.0;
	int i;
	for (i = 2; sum < size; i++)
		sum += 1.0 / i;
	i -= 2;
	return i;
}
int main()
{
	float size;
	while (true)
	{
		cin >> size;
		if (size <= 5.20 && size >= 0.01)
			cout << hangover(size) << "card(s)" << endl;
		else if (.0f == size)
			break;
		else
			cout << "Input error!" << endl;
	}
	return 0;
}
```

