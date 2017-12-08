---
layout:     post
title:      "Bash on Ubuntu on Windows"
subtitle:   "试用Bash on Ubuntu on Windows"
date:       2016-04-16 12:00:00
author:     "Zeg"
header-img: "img/2016-04-16-bg.jpg"
tags:
    - Windows
    - Linux
    - 试用
---

## Bash on Ubuntu on Windows

>**bash**，Unix shell的一种，在1987年由*布莱恩·福克斯*为了GNU计划而编写。1989年发布第一个正式版本，原先是计划用在GNU操作系统上，但能运行于大多数类Unix系统的操作系统之上，包括Linux与Mac OS X v10.4都将它作为默认shell。它也被移植到Microsoft Windows上的Cygwin与MinGW，或是可以在MS-DOS上使用的DJGPP项目。在Novell NetWare与Android在上也有移植。1990年后，Chet Ramey成为了主要的维护者。 --**维基百科**

在今年的微软Build2016大会上，微软发布了一个对开发者来说很好的东西。那就是Bash on Ubuntu on Windows，直接在Windows上原生地运行Linux，而不是通过虚拟机来实现。这包括 Linux 上著名的  bash shell 以及很多重要的 Linux 程序，如：apt、ssh、 vim、 emacs、tar、 php、  perl、 python、 gcc 等等！

#### 安装方法

 1. 首先将Win10系统升级到最新的Build 14316。
 2. 然后到系统设置——更新和安全——针对开发人员——选择开发者模式。
 3. 然后系统搜索“程序和功能”，选择“开启或关闭Windows功能”，开启Windows Subsystem for Linux (Beta)，并重启系统。
 4. 开启命令行模式，然后输入“bash”，即可使用安装试用“bash”。

#### 使用演示视频

手机党移步这里-><a href="https://www.bilibili.com/video/av4261219/" target="_blank">演示Windows10即将支持的Bash Shell</a>

<div class="bilibili-play-ratio">
  <iframe src="//www.bilibili.com/blackboard/player.html?aid=4261219&cid=6888969&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen></iframe>
</div>
<style>
.bilibili-play-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 60%; /* 高度应该是宽度的56% */
}
.bilibili-play-ratio iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>

#### 使用问题

可是经过我的试用，发现有以下几个问题：

-  安装时很容易出错，重装几遍后才装成功。
-  对中文支持不好，无法显示较长的中文（见下图）。
![中文支持]({{site.img}}/2016-04-16-bg-a.png)
-  软件源为Ubuntu的，不翻墙的话速度非常慢，而且暂时无法更换国内的源。

#### 附：Windows10 Bash 使用图形界面

经过几天，社区用户找到了方法可以在 Windows 上运行有 GUI 的 Linux 应用。该开发者说，“显然，这要比原生的 Windows/Linux 应用慢一些，但是肯定比 VNC/X11 转发要快。使用这个只需要简单的两部：

1. 首先需要下载并安装<a href="https://sourceforge.net/projects/xming/files/" target="_blank">Xming X Server for Windows</a>  。
2. 然后在 Bash 的命令行环境中输入所想要运行的 Linux 应用，比如运行 Firefox 就是“DISPLAY=:0 firefox”。

以Firefox为例：

先更新`apt-get update`；再安装Firefox`apt-get install firefox`；最后打开图形界面`DISPLAY=:0 firefox`。打开后如图：

![]({{site.img}}/2016-04-16-bg-b.png)

但是我打开Firefox后它非常不稳定，不到十秒就闪退了。希望以后能更好的运行GUI程序了，这样就可以不用双系统了。

　　
