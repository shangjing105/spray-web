# spray-web——水花一现APP

<figure class="half">
	<a href="http://o6n64wdk9.bkt.clouddn.com/791028987bbf43af8d5e5a5c60286e0a.PNG"><img width="300" height="500" src="http://o6n64wdk9.bkt.clouddn.com/791028987bbf43af8d5e5a5c60286e0a.PNG"></a>
	<a href="http://o6n64wdk9.bkt.clouddn.com/8cc4709da9474162b3372ba8b6c5ff3a.PNG"><img width="300" height="500" src="http://o6n64wdk9.bkt.clouddn.com/8cc4709da9474162b3372ba8b6c5ff3a.PNG"></a>
</figure>

<figure class="half">
  <a href="http://o6n64wdk9.bkt.clouddn.com/2bef26cb21ee4d1a8232051a66a9716c.png"><img width="300" height="500" src="http://o6n64wdk9.bkt.clouddn.com/2bef26cb21ee4d1a8232051a66a9716c.png"/></a>
  <a href="http://o6n64wdk9.bkt.clouddn.com/c411b56a965d45cd88f195a7c2c6be2d.jpeg"><img width="300" height="500" src="http://o6n64wdk9.bkt.clouddn.com/c411b56a965d45cd88f195a7c2c6be2d.jpeg"/></a>
</figure>

<figure class="half">
  <a href="http://o6n64wdk9.bkt.clouddn.com/6b53dca2e9834b9ba487a36e0810eaaa.PNG"><img width="300" height="500" src="http://o6n64wdk9.bkt.clouddn.com/6b53dca2e9834b9ba487a36e0810eaaa.PNG"/></a>
  <a href="http://o6n64wdk9.bkt.clouddn.com/918adc878ce6499aa086b0dae7422c04.PNG"><img width="300" height="500" src="http://o6n64wdk9.bkt.clouddn.com/918adc878ce6499aa086b0dae7422c04.PNG"/></a>
</figure>

## APP下载地址

![图标](http://upload-images.jianshu.io/upload_images/2728175-90fda6375d617e2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[https://www.pgyer.com/aR19](https://www.pgyer.com/aR19)

    android版可以下载,ios没有签名,暂时不能安装,我也只给自己手机安装一个。


**水花一现使用的ionic技术**

	ionic=ionic myApp + ThemeableBrowser + ImgDownloader + Clipboard
	
# ionic技术初识

>ionic是一个用来开发混合手机应用的，开源的，免费的代码库。可以优化html、css和js的性能，构建高效的应用程序，而且还可以用于构建Sass和AngularJS的优化。ionic会是一个可以信赖的框架。

Ionic(ionicframework)一款接近原生的Html5移动App开发框架　会html css js就可以开发app。

我自己也是无意从网上了解到这个技术，当我明白这个技术后，我就想也创建一个我自己的APP，我理想的app由我自己来定义。作为一个技术人员我对html,css,js不说很了解，但是也会基本使用。但是说正在的ios和android开发，自己想必去学习就比较麻烦，既然了解到这个技术，我感觉凭借自己的能力，是可以完成自己构想的app的。

# ionic技术使用开始

开始用Ionic创建我们的移动应用，如果您已经安装好了Cordova，您可以直接把Ionic当作Html5框架，用Cordova开发Ionic，无需进行下面步骤。

1.安装ionic/Install Ionic

>$ npm install -g cordova ionic

2.通过Ionic创建一个项目

>$ ionic start myApp tabs

3.运行我们刚才创建的Ionic项目

>$ cd myApp

>$ ionic platform add ios

>$ ionic build ios

>$ ionic emulate ios

也可以通过中文官网去学习[http://www.ionic.wang/start-index.html](http://www.ionic.wang/start-index.html)

运行起来的界面是这样的

![界面](http://upload-images.jianshu.io/upload_images/2728175-5a1b614b07841c7d?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


# ionic技术实现APP

在实现的过程中我总共打算做4个菜单，分别是：**精选**，**美图**，**笑话**，**我的**，最终我完成了我界面的3个菜单的开发，我的这个菜单并没有开发，因为具体要做什么有些不确定，最后也就放弃了，在我的界面写了关于我的一些情况。

## 精选菜单

这个菜单我使用的官方demo(名字是myApp)的原型上做修改的，在后台定时任务去抓取不同网站的文章，新闻链接和标题，并在这里做显示，
点击标题就跳转到链接所对应的文章。

在跳转其他网站链接方面我使用的`cordova`的高度自定义的浏览器插件`ThemeableBrowser`，并且根据自己的情况定义了菜单


## 美图菜单


这个菜单内容完全是自定义的，在样式显示方面我如果所有图片平铺就会显的比较单调，于是我对图片的排列进行了有规则的调整，具体看图片效果

在单击图片显示大图上我用的也是ionic的一个放大图片插件：`ionic-zoom-view`,这是github上的一个插件，有兴趣的可以去搜索了解一下

并且我在原有插件的基础上增加了一个下载图片的功能（使用的有下载插件`ImgDownloader`），可以下载到手机上

* iOS是下载到照片里
* android是下载到sd卡的水花一现目录里



## 笑话菜单


笑话菜单很简单，爬取各种段子和笑话然后做显示，经常看对自己的会不断提升自己的幽默能力啊!

我这文字上面增加了复制段子的能力，使用的插件是`Clipboard`.


**我在ionic项目上使用的插件有以下各种**

	com.okmemo.cordova.imgdownloader 0.1.0 "ImgDownloader"
	com.verso.cordova.clipboard 0.1.0 "Clipboard"
	cordova-plugin-compat 1.0.0 "Compat"
	cordova-plugin-console 1.0.3 "Console"
	cordova-plugin-device 1.1.2 "Device"
	cordova-plugin-file 4.2.0 "File"
	cordova-plugin-file-transfer 1.5.1 "File Transfer"
	cordova-plugin-splashscreen 3.2.2 "Splashscreen"
	cordova-plugin-statusbar 2.1.3 "StatusBar"
	cordova-plugin-themeablebrowser 0.2.17 "ThemeableBrowser"
	cordova-plugin-whitelist 1.2.2 "Whitelist"
	ionic-plugin-keyboard 2.2.0 "Keyboard"
	
	

# APP技术文章解析

    我会在我的博客里更新关于我这个APP的开发过程,有兴趣的可以下载APP试用一下,有需要的欢迎给我来信。

博客:[www.shuihua.me](www.shuihua.me)

邮箱:[shangjing105@163.com](shangjing105@163.com)
