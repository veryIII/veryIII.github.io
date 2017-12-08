---
layout:     post
title:      "给WordPress设置CDN加速"
subtitle:   ""
date:       2017-04-22 12:00:00
author:     "Creeper"
header-rgba: "#aaefa3"
tags:
    - WordPress
    - CDN
---

在当前主题的模板函数文件(functions.php)里面添加下面代码：

``` php
/*
 * 设置CDN加速
 */
if (!is_admin()) {
	add_action('wp_loaded','itchen_ob_start');
	function itchen_ob_start() {
		ob_start('cdn_replace');
	}
	function cdn_replace($html) {
		$local_host = 'http://www.xxx.xyz'; //源地址
		$aliyun_host = 'http://cdn.xxx.com'; //CDN加速地址
		$cdn_exts = 'js|css|png|jpg|jpeg|gif|ico|eot|woff|ttf|ttf2';  //加速文件类型
		$cdn_dirs = 'wp-content|wp-includes|ngg_styles'; //加速目录
		$cdn_dirs = str_replace('-', '\-', $cdn_dirs);
		if ($cdn_dirs) {
			$regex	= '/' . str_replace('/', '\/', $local_host) . '\/((' . $cdn_dirs . ')\/[^\s\?\\\'\"\;\>\< ]{1,}.(' . $cdn_exts . '))([\"\\\'\s\?]{1})/';
			$html = preg_replace($regex, $aliyun_host . '/$1$4', $html);
		} else {
			$regex	= '/' . str_replace('/', '\/', $local_host) . '\/([^\s\?\\\'\"\;\>\<]{1,}.(' . $cdn_exts . '))([\"\\\'\s\?]{1})/';
			$html = preg_replace($regex, $aliyun_host . '/$1$3', $html); 
		}
		return $html;
	}
}
```

需要修改的地方在代码里有注释。
