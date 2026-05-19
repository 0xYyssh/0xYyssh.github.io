---
title: javaWeb
tags:
  - java
  - web
categories:
  - 网站开发
swiper_index: 0
description: 学习java所踩的坑，安全就是什么都要学啊，感觉好多公司都用GO了，感觉以后GO也要学了
abbrlink: 56cf3280
date: 2026-01-20 17:33:15
---

## tomcat导入idea

![image-20250608161401709](posts/56cf3280/images/image-20250608161401709.webp)

![image-20250608161438523](posts/56cf3280/images/image-20250608161438523.webp)

添加成功tomcat之后，再将模块改为web模块

![image-20250608161146550](posts/56cf3280/images/image-20250608161146550.webp)

然后选择导入web框架即可

![image-20250608161255070](posts/56cf3280/images/image-20250608161255070.webp)

## idea2024.1 配置Servlet踩坑

idea没有自动识别java源码目录，maven的pom.xml，url的web目录，全部都要自己导入

![image-20251208213333252](posts/56cf3280/images/image-20251208213333252.webp)

+ java源码目录识别
	+ ![image-20251208213536552](posts/56cf3280/images/image-20251208213536552.webp)
+ web目录识别
	+ ![image-20251208213604201](posts/56cf3280/images/image-20251208213604201.webp)
+ maven的pom.xml导入
	+ ![image-20251208213634805](posts/56cf3280/images/image-20251208213634805.webp)



## tomcat运行与修改

![image-20250607132543254](posts/56cf3280/images/image-20250607132543254.webp)

安装目录下解压下载的tomcat包，点击bin/start.bat脚本

### 命令行中文乱码修改

安装目录下的conf/logging.properties文件

![image-20250607133002489](posts/56cf3280/images/image-20250607133002489.webp)

这4个编码修改成与命令行一样的编码就行了，中国的win11命令行默认是gbk

方法一：把上面四个编码改成GBK

方法二：修改命令行的编码为UTF-8

设置里面的更改国家和地区

![image-20250607133204099](posts/56cf3280/images/image-20250607133204099.webp)

选择管理语言设置

![image-20250607133305649](posts/56cf3280/images/image-20250607133305649.webp)

重启之后命令行的编码就是UTF-8了

![image-20250607132641825](posts/56cf3280/images/image-20250607132641825.webp)

### tomcat网页启动端口修改

还是安装目录下的conf/server.xml

![image-20250607133546300](posts/56cf3280/images/image-20250607133546300.webp)

修改8080端口为9999

![image-20250607133620272](posts/56cf3280/images/image-20250607133620272.webp)

启动成功如下：

![image-20250607132701493](posts/56cf3280/images/image-20250607132701493.webp)

##  servlet

### 基本概念

  Servlet是运行在Web服务器上的Java程序，用于处理客户端请求并生成动态Web内容。它是Java EE（现为Jakarta EE）规范的核心组件，充当了客户端（通常是浏览器）与服务器端应用程序之间的桥梁。

  简单来说Servlet用于处理客户端发来的请求，以及回显客户端请求

### 快速使用

1. 使用web.xml映射url路径进行部署

	+ 首先我们要编写一个我们的Servlet，用来处理请求，例如：`MyServlet`

	+ ```java
		package fun.yyssh.servletmemshell;
		
		import jakarta.servlet.http.HttpServlet;
		import jakarta.servlet.http.HttpServletRequest;
		import jakarta.servlet.http.HttpServletResponse;
		
		import java.io.IOException;
		import java.io.PrintWriter;
		
		public class MyServlet extends HttpServlet {
		
		    public void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException {
		        response.setContentType("text/html");
		        PrintWriter out = response.getWriter();
		        out.println("<html><body>");
		        out.println("<h1>" + "MyServlet" + "</h1>");
		        out.println("</body></html>");
		    }
		}
		```

	+ 然后在web.xml映射我们的url路径

	+ url-pattern就是我们根目录下的访问路径（根目录在tomcat的deloyment配置），servlet-class要能定位到我们编写的servlet类

	+ ```xml
		<?xml version="1.0" encoding="UTF-8"?>
		<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
		         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
		         version="6.0">
		
		    <servlet>
		        <servlet-name>MyServlet</servlet-name>
		        <servlet-class>fun.yyssh.servletmemshell.MyServlet</servlet-class>
		    </servlet>
		    <servlet-mapping>
		        <servlet-name>MyServlet</servlet-name>
		        <url-pattern>/my</url-pattern>
		    </servlet-mapping>
		</web-app>
		```

网络页面访问![image-20251208215150421](posts/56cf3280/images/image-20251208215150421.webp)

2. 使用注解进行Servlet编写

	+ WebServlet注解的好处就在于可以不用在web.xml进行url的映射

```java
package fun.yyssh.servletmemshell;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(value = "/yyssh")
public class YysshServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + "YysshServlet" + "</h1>");
        out.println("</body></html>");
    }
}
```

网页访问![image-20251208220118789](posts/56cf3280/images/image-20251208220118789.webp)

### **@WebServlet 注解**

| 属性            | 说明                                                         |
| :-------------- | :----------------------------------------------------------- |
| `name`          | 指定 Servlet 名称（可选），默认值为类全限定名。              |
| `value`         | 指定访问路径（如 `"/hello"`），是 `urlPatterns` 的快捷方式。 |
| `urlPatterns`   | 指定一组访问路径（如 `{"/hello", "/demo"}`），与 `value` 互斥。 |
| `loadOnStartup` | 指定 Servlet 的加载顺序（≥0 表示启动时加载，数值越小优先级越高）。 |
| `initParams`    | 用于指定 Servlet 的初始化参数。                              |

### **HttpServlet 类**

| 方法名                                                       | 说明                                                        |
| :----------------------------------------------------------- | :---------------------------------------------------------- |
| `protected void doGet(HttpServletRequest req, HttpServletResponse resp)` | 处理 HTTP GET 请求。                                        |
| `protected void doPost(HttpServletRequest req, HttpServletResponse resp)` | 处理 HTTP POST 请求。                                       |
| `protected void doPut(HttpServletRequest req, HttpServletResponse resp)` | 处理 HTTP PUT 请求。                                        |
| `protected void doDelete(HttpServletRequest req, HttpServletResponse resp)` | 处理 HTTP DELETE 请求。                                     |
| `protected void service(HttpServletRequest req, HttpServletResponse resp)` | 根据请求类型自动调用对应的 `doXxx()` 方法（通常无需重写）。 |

------

### **HttpServletRequest 接口**

| 方法名                                                | 说明                                               |
| :---------------------------------------------------- | :------------------------------------------------- |
| **请求参数相关**                                      |                                                    |
| `String getParameter(String name)`                    | 获取单个请求参数值（URL 或表单字段）。             |
| `String[] getParameterValues(String name)`            | 获取同名参数的多个值（如复选框、多选列表）。       |
| `Map<String, String[]> getParameterMap()`             | 获取所有请求参数的键值对映射。                     |
| **请求头相关**                                        |                                                    |
| `String getHeader(String name)`                       | 获取指定请求头的值（如 `User-Agent`、`Referer`）。 |
| `Enumeration<String> getHeaderNames()`                | 获取所有请求头名称的枚举。                         |
| **Session 相关**                                      |                                                    |
| `HttpSession getSession()`                            | 获取当前会话，若不存在则创建新会话。               |
| `HttpSession getSession(boolean create)`              | 若 `create=false`，会话不存在时返回 `null`。       |
| `String getRequestedSessionId()`                      | 获取客户端传来的 Session ID（可能已过期）。        |
| `boolean isRequestedSessionIdValid()`                 | 检查请求中的 Session ID 是否有效。                 |
| **Cookie 相关**                                       |                                                    |
| `Cookie[] getCookies()`                               | 获取客户端发送的所有 Cookie。                      |
| **路径与作用域相关**                                  |                                                    |
| `String getContextPath()`                             | 获取项目根路径（如 `/myapp`）。                    |
| `String getServletPath()`                             | 获取 Servlet 映射路径（如 `/hello`）。             |
| `RequestDispatcher getRequestDispatcher(String path)` | 获取请求转发器，用于服务器端跳转。                 |
| `void setAttribute(String name, Object value)`        | 在请求作用域中存储数据。                           |
| `Object getAttribute(String name)`                    | 从请求作用域中获取数据。                           |
| **其他常用方法**                                      |                                                    |
| `String getMethod()`                                  | 获取 HTTP 请求方法（`GET`、`POST` 等）。           |
| `String getRemoteAddr()`                              | 获取客户端 IP 地址。                               |
| `String getQueryString()`                             | 获取 URL 中的查询字符串（如 `name=Tom&age=20`）。  |

------

#### `getRequestDispatcher()`

| 方法名                                                       | 说明                                                 |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| `RequestDispatcher getRequestDispatcher(String path)`        | 获取 `RequestDispatcher`，用于请求转发或包含。       |
| `void forward(ServletRequest request, ServletResponse response)` | 将请求转发到指定的资源，通常是 Servlet 或 JSP 页面。 |
| `void include(ServletRequest request, ServletResponse response)` | 包含另一个资源的内容到当前请求响应中。               |

### **HttpServletResponse 接口**

| 方法名                                       | 说明                                                     |
| :------------------------------------------- | :------------------------------------------------------- |
| **响应输出相关**                             |                                                          |
| `PrintWriter getWriter()`                    | 获取字符输出流，用于返回文本数据（如 HTML、JSON）。      |
| `ServletOutputStream getOutputStream()`      | 获取字节输出流，用于返回二进制数据（如图片、文件下载）。 |
| `void setContentType(String type)`           | 设置响应内容类型（如 `text/html;charset=UTF-8`）。       |
| `void setCharacterEncoding(String charset)`  | 设置响应编码（需在 `setContentType` 之前调用）。         |
| **状态码与重定向**                           |                                                          |
| `void setStatus(int sc)`                     | 设置 HTTP 状态码（如 `200`、`404`、`500`）。             |
| `void sendError(int sc, String msg)`         | 发送错误状态码及自定义消息。                             |
| `void sendRedirect(String location)`         | 重定向到指定 URL（状态码 302）。                         |
| **Cookie 相关**                              |                                                          |
| `void addCookie(Cookie cookie)`              | 向客户端添加 Cookie。                                    |
| **Session 相关**                             |                                                          |
| `void setHeader(String name, String value)`  | 设置响应头（如 `Cache-Control: no-cache`）。             |
| `void addHeader(String name, String value)`  | 添加响应头（可重复）。                                   |
| **缓存控制**                                 |                                                          |
| `void setDateHeader(String name, long date)` | 设置日期格式的响应头（如 `Expires`）。                   |
| `void setIntHeader(String name, int value)`  | 设置整型响应头（如 `Content-Length`）。                  |

### **request.getRequestDispatcher().forward()与respone.sendRedirect()区别**

本质上就是请求转发(getRequestDispatcher())和重定向（sendRedirect()）的区别

| **特性**           | **`request.getRequestDispatcher().forward()`** | **`response.sendRedirect()`**               |
| :----------------- | :--------------------------------------------- | :------------------------------------------ |
| **行为**           | 服务器端跳转（**URL 不变**）                   | 客户端跳转（**URL 变化**，返回 302 状态码） |
| **请求次数**       | 1 次请求                                       | 2 次请求                                    |
| **数据共享**       | 通过 `request.setAttribute()` 共享数据         | 需通过 `Session` 或 `URL` 参数传递数据      |
| **Session 有效期** | 沿用原始请求的 Session                         | 沿用原始请求的 Session（但可能因超时失效）  |
| **目标资源路径**   | 只能跳转当前应用内的资源（`/path`）            | 可跳转任意路径（包括外部域名）              |

### **Cookie 对象**

| **构造器/方法**                      | **说明**                                                     |
| :----------------------------------- | :----------------------------------------------------------- |
| **构造器**                           |                                                              |
| `Cookie(String name, String value)`  | 创建一个 Cookie 对象，指定名称和值（名称不能含空格或特殊符号）。 |
| **常用方法**                         |                                                              |
| `String getName()`                   | 获取 Cookie 的名称。                                         |
| `String getValue()`                  | 获取 Cookie 的值。                                           |
| `void setValue(String value)`        | 设置 Cookie 的值。                                           |
| `void setMaxAge(int expiry)`         | 设置 Cookie 有效期（秒），`>0` 表示持久化，`=0` 表示删除，`<0` 表示会话级（浏览器关闭失效）。 |
| `int getMaxAge()`                    | 获取 Cookie 的有效期。                                       |
| `void setPath(String uri)`           | 设置 Cookie 的生效路径（如 `/app`，仅该路径下可访问）。      |
| `String getPath()`                   | 获取 Cookie 的生效路径。                                     |
| `void setDomain(String domain)`      | 设置 Cookie 的生效域名（如 `.example.com`）。                |
| `String getDomain()`                 | 获取 Cookie 的生效域名。                                     |
| `void setHttpOnly(boolean httpOnly)` | 设置是否禁止 JavaScript 访问（安全防护）。                   |
| `boolean isHttpOnly()`               | 检查 Cookie 是否禁止 JS 访问。                               |
| `void setSecure(boolean secure)`     | 设置是否仅通过 HTTPS 传输。                                  |
| `boolean isSecure()`                 | 检查 Cookie 是否要求 HTTPS。                                 |

------

### **HttpSession 对象**

| **构造器/方法**                                | **说明**                                                   |
| :--------------------------------------------- | :--------------------------------------------------------- |
| **获取方式**                                   |                                                            |
| `request.getSession()`                         | 获取当前会话，若不存在则创建新会话。                       |
| `request.getSession(false)`                    | 获取当前会话，若不存在则返回 `null`。                      |
| **常用方法**                                   |                                                            |
| `String getId()`                               | 获取 Session 的唯一 ID。                                   |
| `long getCreationTime()`                       | 获取 Session 的创建时间（毫秒，从 1970 年起）。            |
| `long getLastAccessedTime()`                   | 获取 Session 的最后访问时间。                              |
| `void setMaxInactiveInterval(int interval)`    | 设置 Session 超时时间（秒），超过未访问则失效。            |
| `int getMaxInactiveInterval()`                 | 获取 Session 的超时时间。                                  |
| `void invalidate()`                            | 强制使 Session 失效（用户登出时调用）。                    |
| `boolean isNew()`                              | 检查 Session 是否为新创建的（客户端尚未收到 Session ID）。 |
| **数据操作**                                   |                                                            |
| `void setAttribute(String name, Object value)` | 存储数据到 Session 中。                                    |
| `Object getAttribute(String name)`             | 从 Session 中获取数据。                                    |
| `void removeAttribute(String name)`            | 移除 Session 中的指定数据。                                |
| `Enumeration<String> getAttributeNames()`      | 获取 Session 中所有数据的名称枚举。                        |

**demo1.java:**

```java
package fun.yyssh.route;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/demo1")
public class demo1 extends HttpServlet{

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException  {
        System.out.println("This is demo1");    //控制台输出内容
        //设置响应类型
        resp.setContentType("text/html;charset=utf-8");
        //返回响应内容
        resp.getWriter().write("This is demo1");
        //给客户端返回一个cookie和session
        Cookie cookie = new Cookie("username","yyssh");
        resp.addCookie(cookie);
        req.getSession().setAttribute("username","yyssh");
        req.getSession().setAttribute("password","yyssh");
        //将请求转发给index.jsp
        req.getRequestDispatcher("/index.jsp").forward(req,resp);
    }
}
```

**index.jsp:**

```jsp
<%--
  Created by IntelliJ IDEA.
  User: 肥猪
  Date: 2025/6/7
  Time: 14:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>首页</title>
</head>
<body>
<%
    String username = null;
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("username".equals(cookie.getName())) {
                username = cookie.getValue();
                break;
            }
        }
    }

    if (username != null) {
        out.println("用户名：" + username);
    } else {
        out.println("未找到用户名");
    }
%>
<hr>
</body>
</html>
```

### 过滤器filter

#### 介绍

![image-20250923103709920](posts/56cf3280/images/image-20250923103709920.webp)

#### 快速使用

![image-20250923103812348](posts/56cf3280/images/image-20250923103812348.webp)

#### 过滤器链

![image-20250923113607619](posts/56cf3280/images/image-20250923113607619.webp)

过滤器链放行前的顺序是按照类名的首字母顺序执行的，例如：

+ AFilter->CFilter->JFilter->ZFilter

放行后就反过来了

+ ZFilterr->JFilter->CFilter->AFilter



## JSP

### JSTL的Tomcat高版本和Tomcat的低版本

#### 一、Tomcat 8及以下（Java EE / `javax` 命名空间）

 ✅ 1. 必需的 JAR 包

| 文件名         | 下载链接                                                     |
| -------------- | ------------------------------------------------------------ |
| `jstl-1.2.jar` | [点击下载](https://repo1.maven.org/maven2/javax/servlet/jstl/1.2/jstl-1.2.jar) |

> 只需要 `jstl-1.2.jar`，**不再需要 `standard.jar`，它早期与 jstl 分开，但 jstl-1.2 已整合了**

✅ 2. 放入位置

```
YourWebProject/WebContent/WEB-INF/lib/jstl-1.2.jar
```

✅ 3. JSP 中使用 JSTL

```
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:forEach items="${users}" var="user">
    <p>${user.key} : ${user.value}</p>
</c:forEach>
```

✅ 4. JSP 引擎兼容性

- 使用 Tomcat 8 默认的 `javax.servlet.*`，兼容 JSTL 1.2。
- 不需要特殊配置。

------

#### 🔁 二、Tomcat 10.1+ / 11（Jakarta EE / `jakarta.*` 命名空间）

Tomcat 10.1 起，**Servlet API、JSP、JSTL 全部迁移到 `jakarta.\*`**，不兼容老的 `javax.*` 包！

✅ 1. 必需的 JSTL Jakarta JAR 包

你需要以下两个 JAR 包：

| 文件名                                                       | 下载链接 |
| ------------------------------------------------------------ | -------- |
| [`jakarta.servlet.jsp.jstl-api-3.0.0.jar`](https://repo1.maven.org/maven2/jakarta/servlet/jsp/jstl/jakarta.servlet.jsp.jstl-api/3.0.0/jakarta.servlet.jsp.jstl-api-3.0.0.jar) |          |
| [`jakarta.servlet.jsp.jstl-3.0.1.jar`](https://repo1.maven.org/maven2/org/glassfish/web/jakarta.servlet.jsp.jstl/3.0.1/jakarta.servlet.jsp.jstl-3.0.1.jar) |          |

✅ 2. 放入位置

```
YourWebProject/WEB-INF/lib/
```

> **确保删除 `jstl-1.2.jar` 和 `standard.jar`，否则会导致冲突报错！**

✅ 3. JSP 中照常使用 JSTL

```
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

URI 不变，Tomcat 会自动识别。

### **1. JSP 注释类型**

| **注释类型**      | **语法**                             | **特点**                                                |
| :---------------- | :----------------------------------- | :------------------------------------------------------ |
| **HTML 显示注释** | `<!-- 注释内容 -->`                  | 发送到客户端，浏览器中可见（源码查看）。                |
| **JSP 隐式注释**  | `<%-- 注释内容 --%>`                 | 仅在服务器端有效，不会发送到客户端。                    |
| **Java 代码注释** | `<% //单行注释 或 /* 多行注释 */ %>` | 嵌入在 `<% %>` 中的 Java 代码注释，服务器端执行时忽略。 |

------

### **2. JSP 代码书写方式**

| **语法**        | **名称**       | **作用**                                              |
| :-------------- | :------------- | :---------------------------------------------------- |
| `<% 代码 %>`    | **Scriptlet**  | 嵌入 Java 代码，在 `_jspService()` 方法内执行。       |
| `<%= 表达式 %>` | **表达式输出** | 计算表达式并输出结果到页面（自动调用 `toString()`）。 |
| `<%! 声明 %>`   | **声明**       | 定义全局变量或方法（生成在 Servlet 类中，非方法内）。 |
| `<%@ 指令 %>`   | **指令**       | 控制 JSP 页面行为（如导包、设置内容类型）。           |
| `${EL表达式}`   | **EL 表达式**  | 简化页面数据访问（如 `${user.name}`）。               |

**learnJSPfunction.jsp:**

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<!--这是显示注释-->
<%--这是隐式注释--%>
<%
//    out.println("This is Java Code annotation");
%>
<%
    out.println("This is Java Code");
%>
<%!
//这是全局变量声明
    String name = "yyssh";
%>
<%--直接输出值--%>
<%=name%>
<%--静态包含，变量名不能重复定义--%>
<%--<%@ include file="flag.jsp"%>--%>
<%--动态包含--%>
<%--并且可以往被包含文件传参--%>
<jsp:include page="flag.jsp">
    <jsp:param name="username" value="yyssh"/>
    <jsp:param name="flag" value="This is flag"/>
</jsp:include>

</body>
</html>
```

**flag.jsp:**

```jsp
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    String username = request.getParameter("username");
    String flag = request.getParameter("flag");
    out.println(username);
    out.print(flag);
%>
</body>
</html>
```

####  **表达式取值（EL 表达式）**

EL表达式默认作用域查找（从小到大）：Page → Request → Session → Application

| **数据类型**   | **EL 表达式语法**               | **示例**                                    |
| :------------- | :------------------------------ | :------------------------------------------ |
| **基本变量**   | `${变量名}`                     | `${username}`                               |
| **List 集合**  | `${list[索引]}`                 | `${userList[0]}`（获取第一个元素）          |
| **Map 集合**   | `${map.key}` 或 `${map["key"]}` | `${userMap.name}` 或 `${userMap["name"]}`   |
| **数组**       | `${array[索引]}`                | `${strArray[1]}`（获取第二个元素）          |
| **Bean 属性**  | `${bean.property}`              | `${user.age}`（需符合 JavaBean 规范）       |
| **作用域变量** | `${scopeScope.key}`             | `${requestScope.message}`（明确指定作用域） |
| **隐式对象**   | `${header}`、`${param}` 等      | `${header["User-Agent"]}`（获取请求头）     |

### **3. JSP 包含机制**

| **包含方式** | **语法**                            | **特点**                                                     |
| :----------- | :---------------------------------- | :----------------------------------------------------------- |
| **静态包含** | `<%@ include file="header.jsp" %>`  | - 编译时合并，生成一个 Servlet。 - 被包含文件不能有重复变量或方法。 |
| **动态包含** | `<jsp:include page="header.jsp" />` | - 运行时独立编译，通过请求合并结果。 - 可传递参数（`<jsp:param>`）。 |

`<jsp:param>` 传递的参数仅在本次包含请求中有效，**不会影响原始 `request` 对象**。

### **4.JSP 四大作用域操作方法**

| **作用域**      | **存储方法**                             | **获取方法**                      | **移除方法**                         | **生命周期**                     |
| :-------------- | :--------------------------------------- | :-------------------------------- | :----------------------------------- | :------------------------------- |
| **Page**        | `pageContext.setAttribute("key", value)` | `pageContext.getAttribute("key")` | `pageContext.removeAttribute("key")` | 当前页面有效                     |
| **Request**     | `request.setAttribute("key", value)`     | `request.getAttribute("key")`     | `request.removeAttribute("key")`     | 同一次请求有效（含转发）         |
| **Session**     | `session.setAttribute("key", value)`     | `session.getAttribute("key")`     | `session.removeAttribute("key")`     | 用户会话期间有效（默认 30 分钟） |
| **Application** | `application.setAttribute("key", value)` | `application.getAttribute("key")` | `application.removeAttribute("key")` | 整个应用运行期间有效             |

###  **5.JSP 动作标签（Action Tags）**

| **标签**            | **语法**                                                     | **作用**                                                 |
| :------------------ | :----------------------------------------------------------- | :------------------------------------------------------- |
| `<jsp:include>`     | `<jsp:include page="文件" />`                                | **动态包含**：运行时将目标页面的输出结果包含到当前页面。 |
| `<jsp:forward>`     | `<jsp:forward page="目标" />`                                | 请求转发到另一个资源（URL 不变）。                       |
| `<jsp:useBean>`     | `<jsp:useBean id="id" class="类名" />`                       | 实例化或复用 JavaBean 对象。                             |
| `<jsp:setProperty>` | `<jsp:setProperty name="beanId" property="属性" value="值" />` | 设置 Bean 的属性值。                                     |
| `<jsp:getProperty>` | `<jsp:getProperty name="beanId" property="属性" />`          | 获取 Bean 的属性值并输出。                               |

### **6.JSP 指令（Directives）**

| **指令**  | **语法**                                | **作用**                                         |
| :-------- | :-------------------------------------- | :----------------------------------------------- |
| `page`    | `<%@ page 属性="值" %>`                 | 设置页面属性（如编码、内容类型、导包等）。       |
| `include` | `<%@ include file="文件" %>`            | **静态包含**：在编译时将文件内容合并到当前 JSP。 |
| `taglib`  | `<%@ taglib uri="URI" prefix="前缀" %>` | 引入标签库（如 JSTL、自定义标签）。              |

### JSTL

#### **1. JSTL 核心标签库（Core）**

| **标签**       | **语法**                                | **作用**                                             | **示例**                                                     |
| :------------- | :-------------------------------------- | :--------------------------------------------------- | :----------------------------------------------------------- |
| **变量设置**   | `<c:set>`                               | 在指定作用域中设置变量值。                           | `<c:set var="name" value="Tom" scope="request"/>`            |
| **变量移除**   | `<c:remove>`                            | 移除指定作用域的变量。                               | `<c:remove var="name" scope="request"/>`                     |
| **条件判断**   | `<c:if>`                                | 根据条件执行逻辑（无 `else`）。                      | `<c:if test="${age > 18}">成年</c:if>`                       |
| **多条件选择** | `<c:choose>` `<c:when>` `<c:otherwise>` | 实现 `if-else if-else` 逻辑。                        | `<c:choose><c:when test="${score >= 90}">优秀</c:when><c:otherwise>一般</c:otherwise></c:choose>` |
| **循环遍历**   | `<c:forEach>`                           | 遍历集合（List、Map、数组等）或固定次数循环。        | `<c:forEach items="${userList}" var="user" varStatus="status">${user.name}</c:forEach>` |
| **URL 构造**   | `<c:url>`                               | 自动添加应用上下文路径，支持参数拼接。               | `<c:url value="/login" var="loginUrl"><c:param name="from" value="home"/></c:url>` |
| **重定向**     | `<c:redirect>`                          | 发送重定向响应（等价于 `response.sendRedirect()`）。 | `<c:redirect url="/error.jsp"/>`                             |
| **导入资源**   | `<c:import>`                            | 动态导入其他资源（支持跨应用）。                     | `<c:import url="https://example.com/header.html"/>`          |

#### **2. JSTL 格式化标签库（FMT）**

| **标签**       | **语法**             | **作用**                                      | **示例**                                                     |
| :------------- | :------------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| **本地化消息** | `<fmt:message>`      | 根据资源文件（`.properties`）显示本地化文本。 | `<fmt:message key="welcome.message" bundle="${messages}"/>`  |
| **数字格式化** | `<fmt:formatNumber>` | 格式化数字（货币、百分比等）。                | `<fmt:formatNumber value="${price}" type="currency" currencyCode="USD"/>` |
| **日期格式化** | `<fmt:formatDate>`   | 格式化日期时间。                              | `<fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm"/>` |
| **时区设置**   | `<fmt:setTimeZone>`  | 设置时区。                                    | `<fmt:setTimeZone value="GMT+8"/>`                           |

#### **3. JSTL 函数标签库（Functions）**

| **函数**       | **语法**                           | **作用**                   | **示例**                                       |
| :------------- | :--------------------------------- | :------------------------- | :--------------------------------------------- |
| **字符串长度** | `${fn:length(str)}`                | 获取字符串或集合长度。     | `${fn:length(userList)}`                       |
| **字符串截取** | `${fn:substring(str, start, end)}` | 截取子字符串。             | `${fn:substring("Hello", 1, 3)}` → `"el"`      |
| **字符串替换** | `${fn:replace(str, old, new)}`     | 替换字符串中的内容。       | `${fn:replace("A-B-C", "-", ",")}` → `"A,B,C"` |
| **大小写转换** | `${fn:toUpperCase(str)}`           | 转换为大写。               | `${fn:toUpperCase("hello")}` → `"HELLO"`       |
| **分割字符串** | `${fn:split(str, delimiter)}`      | 按分隔符分割字符串为数组。 | `${fn:split("A,B,C", ",")[0]}` → `"A"`         |

```jsp
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    Map<String, String> map = new HashMap<>();
    map.put("user1", "yyssh");
    map.put("user2", "lihao");
    map.put("user3", "zhanghao");
    map.put("user4", "kutianjie");
    map.put("user5", "yangyang");
    request.setAttribute("users", map);
%>
<%--使用jstl循环遍历这个集合--%>
<c:forEach items="${users}" var="user">
    <p>${user.key} : ${user.value}</p>
</c:forEach>
</body>
</html>
```

## Maven



高版本的idea自带Maven，低版本的idea在File → Settings → Build, Execution, Deployment → Build Tools → Maven手动导入你下载的Maven

![image-20250818124633956](posts/56cf3280/images/image-20250818124633956.webp)

![image-20250820080241875](posts/56cf3280/images/image-20250820080241875.webp)

### Maven配置阿里云镜像源

![image-20250820080457681](posts/56cf3280/images/image-20250820080457681.webp)

#### idea内置Maven配置方法

在File → Settings → Build, Execution, Deployment → Build Tools → Maven部分的User settings file路径（有的话修改，没的话手动创建一个）settings.xml

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 
                              https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <mirrors>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>central</mirrorOf>
            <name>阿里云中央仓库</name>
            <url>https://maven.aliyun.com/repository/central</url>
        </mirror>
    </mirrors>
</settings>

```

### Maven坐标

![image-20250820101434057](posts/56cf3280/images/image-20250820101434057.webp)

### 导入Maven

![image-20250820101530463](posts/56cf3280/images/image-20250820101530463.webp)

![image-20250820101602496](posts/56cf3280/images/image-20250820101602496.webp)

### Maven导入jar包

 ✅ 一、找到你要导入的 jar 包的 Maven 坐标

比如你要导入 MySQL 驱动：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.0.33</version>
</dependency>
```

如果你不知道坐标，可以在 [Maven Central 仓库搜索](https://mvnrepository.com/)：

> 👉 网址：https://mvnrepository.com/

------

✅ 二、添加到 `pom.xml` 文件中

在你的项目根目录下找到 `pom.xml` 文件，打开它，添加到 `<dependencies>` 标签内：

```xml
<dependencies>
    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>

    <!-- JSTL -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>

    <!-- Servlet API（只在编译时用，不打包） -->
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>5.0.0</version>
        <scope>provided</scope>
    </dependency>

</dependencies>
```

------

groupId：公司名，artifactId：项目/jar包名，version：jar包版本名

✅ 三、刷新 Maven 项目

完成 `pom.xml` 修改后，在 IDEA 中：

1. 打开右侧的 **Maven 面板**
2. 点击顶部的 **刷新按钮（Reimport）**

Maven 会自动下载并导入这些 jar 包。

#### 排除依赖jar包

![image-20250820102521753](posts/56cf3280/images/image-20250820102521753.webp)

### Maven生命周期

![image-20250820102843406](posts/56cf3280/images/image-20250820102843406.webp)

![image-20250820103023029](posts/56cf3280/images/image-20250820103023029.webp)

![image-20250820103052027](posts/56cf3280/images/image-20250820103052027.webp)

### Maven测试

![image-20250820103852465](posts/56cf3280/images/image-20250820103852465.webp)

![image-20250820103953577](posts/56cf3280/images/image-20250820103953577.webp)

### Maven依赖范围

![image-20250820123214283](posts/56cf3280/images/image-20250820123214283.webp)

### 继承

![image-20251004195642862](posts/56cf3280/images/image-20251004195642862.webp)

#### 版本锁定

![image-20251004195752061](posts/56cf3280/images/image-20251004195752061.webp)

#### 自定义属性

![image-20251004195736024](posts/56cf3280/images/image-20251004195736024.webp)

### 聚合

![image-20251004195834600](posts/56cf3280/images/image-20251004195834600.webp)

### 私服的资源上传

![image-20251004195929613](posts/56cf3280/images/image-20251004195929613.webp)

![image-20251004195944212](posts/56cf3280/images/image-20251004195944212.webp)

![image-20251004200000089](posts/56cf3280/images/image-20251004200000089.webp)

![image-20251004200015670](posts/56cf3280/images/image-20251004200015670.webp)

## Mybatis

MyBatis 是一个 **持久层框架**，用来简化 Java 程序访问数据库的过程。它用 XML 或注解的方式将 SQL 和 Java 方法进行映射，非常适合你这种“已经知道要写什么 SQL”的场景。

### ✅ 添加 Maven 依赖

在 `pom.xml` 中添加 MyBatis 及数据库驱动相关依赖：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>JavaMaven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.16</version>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>9.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.36</version>
        </dependency>
    </dependencies>


</project>
```

1. **`<environments default="dev">`**：
	- 这个选项表示定义多个运行环境，并且指定默认的环境。`default="dev"` 表示默认选择的环境是 `dev`，即开发环境。
	- 该标签内的所有配置都会应用到指定的环境 (`dev`) 上。
2. **`<environment id="dev">`**：
	- `id="dev"` 是环境的标识符，表示这一组配置属于开发环境（`dev`）。
	- 在 MyBatis 中，你可以根据不同的环境（如开发环境、测试环境、生产环境等）来配置不同的数据库连接、事务管理器等。
3. **`<transactionManager type="JDBC"/>`**：
	- 配置事务管理器类型。`type="JDBC"` 表示使用基于 JDBC 的事务管理方式。
	- 这意味着 MyBatis 会通过 JDBC 事务来控制数据库的提交与回滚。
4. **`<dataSource type="POOLED">`**：
	- `type="POOLED"` 表示使用数据库连接池来管理数据库连接，提升数据库连接的复用性和性能。
	- 连接池类型通常是多线程共享数据库连接池，而不是每次都建立新的连接。
5. **`<property name="driver" value="com.mysql.cj.jdbc.Driver"/>`**：
	- `name="driver"` 表示配置 JDBC 驱动类。
	- `value="com.mysql.cj.jdbc.Driver"` 表示 MySQL 数据库的 JDBC 驱动。
6. **`<property name="url" value="jdbc:mysql://localhost:3306/你的数据库名?useSSL=false&serverTimezone=UTC"/>`**：
	- `name="url"` 配置数据库的连接 URL。
	- 这个 URL 用来连接到指定的数据库。这里的 `localhost:3306` 表示数据库服务器地址和端口，`你的数据库名` 需要替换为实际的数据库名称。
	- `useSSL=false` 是禁用 SSL 连接，`serverTimezone=UTC` 是设置时区为 UTC，防止时区问题。
7. **`<property name="username" value="root"/>`** 和 **`<property name="password" value="你的密码"/>`**：
	- 配置连接数据库时的用户名和密码。`username="root"` 是默认的 MySQL 用户名，`password="你的密码"` 需要替换为实际的密码。
8. **`<mappers>`**：
	- `<mappers>` 标签用于配置 MyBatis 的映射文件。它指定了 SQL 映射文件的位置，这些文件通常包含 SQL 语句的映射规则和接口方法的绑定。
	- 在你的例子中，`<mapper resource="mapper/UserMapper.xml"/>` 表示 MyBatis 会加载 `mapper/UserMapper.xml` 这个文件来进行 SQL 映射。
9. **`<mapper resource="mapper/UserMapper.xml"/>`**：
	- 这个配置告诉 MyBatis 映射器（Mapper）文件的位置。
	- `UserMapper.xml` 文件包含 SQL 查询语句及其与 Java 方法的映射关系。每个 SQL 查询都会被一个接口方法调用并执行。

### ✅ 创建数据库与数据表

![image-20250618230140681](posts/56cf3280/images/image-20250618230140681.webp)

### ✅ 创建实体类（POJO）

**User.java:**

```java
package fun.yyssh.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private int age;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}'+'\n';
    }
}
```

**UserMapper.java:**

```java
package fun.yyssh.service;

import java.util.List;

public interface UserMapper {
    /**
     * 增加用户
     */
    int addUser(User user);

    /**
     * 删除用户
     */
    int deleteUser(int id);

    /**
     * 修改用户
     */
    int updateUser(User user);

    /**
     * 根据ID查询用户
     */
    User queryUserById(int id);

    /**
     * 查询所有用户
     */
    List<User> queryAllUser();
}
```

### ✅ 创建 MyBatis 配置文件 `mybatis-config.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--打印sql日志-->
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>

    <!--  数据库配置文件  -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"></property>
                <property name="url" value="jdbc:mysql://localhost:3306/TestJavaConnection?useUnicode=true&amp;characterEncoding=utf8&amp;serverTimezone=GMT%2B8&amp;useSSL=false"></property>
                <property name="username" value="yyssh"></property>
                <property name="password" value="yanyuanshishen"></property>
            </dataSource>
        </environment>
    </environments>

    <!--  映射文件  -->
    <mappers>
        <mapper resource="mapper/UserMapper.xml"></mapper>
    </mappers>
</configuration>
```

### ✅ 编写 Mapper 接口和 XML 映射文件

![image-20250908171204901](posts/56cf3280/images/image-20250908171204901.webp)

![image-20250908172649383](posts/56cf3280/images/image-20250908172649383.webp)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="fun.yyssh.service.UserMapper">
    <!-- 编写sql规则,传参数据用占位符替代 -->
    <!-- 添加用户 -->
    <insert id="addUser" parameterType="fun.yyssh.service.User">
        insert into users(name, age) values(#{name}, #{age})
    </insert>
    <!-- 删除用户 -->
    <delete id="deleteUser" parameterType="Integer">
        delete from users where id = #{id}
    </delete>
    <!-- 修改用户 -->
    <update id="updateUser" parameterType="fun.yyssh.service.User">
        update users set name = #{name}, age = #{age} where id = #{id}
    </update>
    <!-- 根据id查询用户 -->
    <select id="queryUserById" parameterType="Integer" resultType="fun.yyssh.service.User">
        select * from users where id = #{id}
    </select>
    <!-- 查询所有用户 -->
    <select id="queryAllUser" resultType="fun.yyssh.service.User">
        select * from users
    </select>
</mapper>
```

### ✅ 在 Servlet 中调用 MyBatis 执行查询

```java
import fun.yyssh.service.User;
import fun.yyssh.service.UserMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class test1 {
    public static void main(String[] args) {
        //创建一个IO流读取mybatis的配置文件
        InputStream inputStream = test1.class.getClassLoader().getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

        //创建一个list对象接收查询结果
        List<User> userList = userMapper.queryAllUser();
        System.out.println(userList);

        //往数据库中添加一个user
//        User user = new User(99,"熊二",998);//因为id在设置数据库的时候设置了自增，所以这里的id是占位符的作用
//        int result = userMapper.addUser(user);
//        System.out.println(result);
//        sqlSession.commit();//提交
//        sqlSession.close();//关闭

        //删除数据库中的一个user
//        int deleteResult = userMapper.deleteUser(9);
//        System.out.println(deleteResult);

        System.out.println("---------------------");
        //根据id查询一个user
        User userSearch = userMapper.queryUserById(10);
        System.out.println(userSearch);

        System.out.println("---------------------");
        //修改数据库中的一个user
//        User userUpdate = new User(10,"小王",999);
//        int updateResult = userMapper.updateUser(userUpdate);
//        System.out.println(updateResult);
//        sqlSession.commit();
//        sqlSession.close();
    }
}
```

### 分页查询插件PageHelper

![image-20250916165729053](posts/56cf3280/images/image-20250916165729053.webp)

![image-20250916165743508](posts/56cf3280/images/image-20250916165743508.webp)

注意事项：

+ 使用pageHelper这个插件的sql语句结尾不要加;
+ PageHelper这个插件只会对紧跟着其后的第一条sql语句进行分页处理

### 动态sql

![image-20250917114607085](posts/56cf3280/images/image-20250917114607085.webp)

![image-20250918162056869](posts/56cf3280/images/image-20250918162056869.webp)

#### 手动封装

![image-20250920172948379](posts/56cf3280/images/image-20250920172948379.webp)

### 主键回填

```java
@Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("insert into emp (username, password, name, gender, image, job, salary, entryDate, deptId, createTime, updateTime)" +
            "values(#{username},#{password},#{name},#{gender},#{image},#{job},#{salary},#{entryDate},#{deptId},#{createTime},#{updateTime})")
    void addEmp(Emp emp);
```

这个注解会在sql语句执行成功以后，返回id的值，赋值给emp对象的属性id

## Spirng

Spring 是一个 **轻量级的 Java 开发框架**，主要解决企业级应用中对象创建、管理和依赖注入的问题。其核心是 IOC（控制反转）和 AOP（面向切面编程），为分层架构提供了良好的支持。

### ✅ 添加 Maven 依赖

在 `pom.xml` 中添加 Spring 的核心依赖，如 `spring-context`、`spring-beans`、`spring-core` 等：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>JavaMaven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>6.2.6</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>6.2.6</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.23</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.16</version>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>9.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.36</version>
        </dependency>
    </dependencies>
    
</project>
```

### 创建实体类（POJO）

作为演示用的 Java 类，将作为 Bean 被 Spring 容器管理。

**People.java:**

```java
package fun.yyssh.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class People {
    private int id;
    private String name;
    private int age;

    @Override
    public String toString() {
        return "People{" +
                "id=" + id +
                ", name='" + name + '\''
                +'}'+'\n';
            }
}
```

**User.java:**

```java
package fun.yyssh.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private int age;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}'+'\n';
    }
}
```

**SecurityClass.java:**

```java
package fun.yyssh.service;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class SecurityClass {
    public String className;
    public String classPeopleCount;
    public List<People> peopleList;
    public Map<String,String> map;

    public SecurityClass() {
    }

    public SecurityClass(String className, String classPeopleCount, List<People> peopleList, Map<String, String> map) {
        this.className = className;
        this.classPeopleCount = classPeopleCount;
        this.peopleList = peopleList;
        this.map = map;
    }
}
```

### 编写 Spring 配置文件 `applicationContext.xml`

这是 Spring 的核心配置文件，用于定义 Bean 及其依赖关系。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
```

#### 配置Bean及依赖注入（构造器/Setter）

使用 XML 配置或注解方式向 Bean 注入依赖。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--  无参构造器调用  -->
<!--    <bean id="people" class="fun.yyssh.service.People">-->
<!--    </bean>-->

    <!--  有参构造器调用  -->
    <bean id="people" class="fun.yyssh.service.People">
        <constructor-arg name="id" value="1"></constructor-arg>
        <constructor-arg name="name" value="yyssh"></constructor-arg>
        <constructor-arg name="age" value="18"></constructor-arg>
    </bean>
    <bean id="people1" class="fun.yyssh.service.People">
        <constructor-arg name="id" value="2"></constructor-arg>
        <constructor-arg name="name" value="boo"></constructor-arg>
        <constructor-arg name="age" value="19"></constructor-arg>
    </bean>



    <!--  SecurityClass的list<String>列表初始化  -->
<!--    <bean id="securityClass" class="fun.yyssh.service.SecurityClass">-->
<!--        <property name="peopleList">-->
<!--            <list>-->
<!--                <value></value>-->
<!--                <value></value>-->
<!--            </list>-->
<!--        </property>-->
<!--    </bean>-->
    <!--  SecurityClass的list<String>列表初始化的另外一种方式，但是这样list.size()=1  -->
<!--        <bean id="securityClass" class="fun.yyssh.service.SecurityClass">-->
<!--            <property name="peopleList" value="1,2,3,4,5">-->
<!--            </property>-->
<!--        </bean>-->

    <!--  SecurityClass的list<People>列表初始化  -->
    <bean id="securityClass" class="fun.yyssh.service.SecurityClass">
        <property name="peopleList">
            <list>
                <ref bean="people"></ref>
                <ref bean="people1"></ref>
            </list>
        </property>
        <property name="map">
            <map>
                <entry key="1" value="1"></entry>
                <entry key="2" value="2"></entry>
            </map>
        </property>
    </bean>
</beans>
```

### 加载 Spring 容器并获取 Bean

通过 `ApplicationContext` 加载配置并获取实例。

```java
import fun.yyssh.service.People;
import fun.yyssh.service.SecurityClass;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LearnSpring {
    public static void main(String[] args) {
        //读取applicationContext.xml文件
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //获取People对象
        People people = context.getBean("people", People.class);
        System.out.println(people);//自动调用toString方法
        People people1 = context.getBean("people1", People.class);
        System.out.println(people1);
        System.out.println("----------------------------------");

        //获取SecurityClass对象
        SecurityClass securityClass = context.getBean("securityClass", SecurityClass.class);
        System.out.println(securityClass);
    }
}
```

## SpringBoot结合Mybatis

![image-20250908165123978](posts/56cf3280/images/image-20250908165123978.webp)





## Springboot

![image-20250820183600923](posts/56cf3280/images/image-20250820183600923.webp)

### Springboot官方脚手架换源

![image-20250821072319415](posts/56cf3280/images/image-20250821072319415.webp)

### Springboot内嵌tomcat

![image-20250821073836379](posts/56cf3280/images/image-20250821073836379.webp)

### Spring Servlet获取请求和返回响应

![image-20250821074653704](posts/56cf3280/images/image-20250821074653704.webp)

![image-20250821085353241](posts/56cf3280/images/image-20250821085353241.webp)

```java
package fun.yyssh.controller;

import cn.hutool.core.io.IoUtil;
import fun.yyssh.pojo.User;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @RequestMapping("/userList")
    public List<User> user() {
    //1. 读取用户数据文件
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IoUtil.readLines(in, StandardCharsets.UTF_8, new ArrayList<>());
    //2. 将用户数据封装成User对象，再将用户对象放入list集合中
        List<User> users = lines.stream().map(line -> {
            String[] split = line.split(",");
            Integer id = Integer.parseInt(split[0]);
            String username = split[1];
            String password = split[2];
            String name = split[3];
            Integer age = Integer.parseInt(split[4]);
            LocalDateTime updateTime = LocalDateTime.parse(split[5],DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new User(id,username,password,name,age,updateTime);
        }).toList();
    //3. 返回用户的json数据
        return users;
    }
}

```

### 业务开发中的三层逻辑

![image-20250907112721838](posts/56cf3280/images/image-20250907112721838.webp)

#### 请求响应层(Controller)

```java
package fun.yyssh.controller;

import cn.hutool.core.io.IoUtil;
import fun.yyssh.pojo.User;
import fun.yyssh.service.UserService;
import fun.yyssh.service.impl.UserServiceImpl;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

   /* @RequestMapping("/userList")
    public List<User> user() {
    //1. 读取用户数据文件
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IoUtil.readLines(in, StandardCharsets.UTF_8, new ArrayList<>());
    //2. 将用户数据封装成User对象，再将用户对象放入list集合中
        List<User> users = lines.stream().map(line -> {
            String[] split = line.split(",");
            Integer id = Integer.parseInt(split[0]);
            String username = split[1];
            String password = split[2];
            String name = split[3];
            Integer age = Integer.parseInt(split[4]);
            LocalDateTime updateTime = LocalDateTime.parse(split[5],DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new User(id,username,password,name,age,updateTime);
        }).toList();
    //3. 返回用户的json数据
        return users;
    }*/

    //创建一个UserServiceDao对象
    private UserService userService = new UserServiceImpl();

    @RequestMapping("/userList")
    public List<User> user() {

        //调用业务逻辑方法
        List<User> users = userService.getUserList();

        //3. 返回用户的json数据
        return users;
    }
}
```

#### 业务逻辑层(Service)

> UserService Interface

```java
package fun.yyssh.service;

import fun.yyssh.pojo.User;

import java.util.List;

public interface UserService {
    public List<User> getUserList();
}
```

> UserServiceImpl

```java
package fun.yyssh.service.impl;

import fun.yyssh.dao.UserDao;
import fun.yyssh.dao.impl.UserDaoImpl;
import fun.yyssh.pojo.User;
import fun.yyssh.service.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class UserServiceImpl implements UserService {

    //创建一个UserDao用户对象
    private UserDao userDao = new UserDaoImpl();
    @Override
    public List<User> getUserList() {
        //1. 获取用户数据
        List<String> lines = userDao.readUserData();
        //2. 将用户数据封装成User对象，再将用户对象放入list集合中
        List<User> users = lines.stream().map(line -> {
            String[] split = line.split(",");
            Integer id = Integer.parseInt(split[0]);
            String username = split[1];
            String password = split[2];
            String name = split[3];
            Integer age = Integer.parseInt(split[4]);
            LocalDateTime updateTime = LocalDateTime.parse(split[5], DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return new User(id,username,password,name,age,updateTime);
        }).toList();
        //3. 返回用户列表
        return users;
    }
}
```

#### 数据层(Dao)

> UserDao interface

```java
package fun.yyssh.dao;

import java.util.List;

public interface UserDao {
    public List<String> readUserData();
}
```

> UserDaoImpl

```java
package fun.yyssh.dao.impl;

import cn.hutool.core.io.IoUtil;
import fun.yyssh.dao.UserDao;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class UserDaoImpl implements UserDao {
    @Override
    public List<String> readUserData() {
        //1. 读取用户数据文件
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("user.txt");
        ArrayList<String> lines = IoUtil.readLines(in, StandardCharsets.UTF_8, new ArrayList<>());
        return lines;
    }
}
```

### 分层解耦

![image-20250907121907246](posts/56cf3280/images/image-20250907121907246.webp)

### Spring的控制反转，依赖注入、bean管理

![image-20250907122309922](posts/56cf3280/images/image-20250907122309922.webp)

![image-20250907122752655](posts/56cf3280/images/image-20250907122752655.webp)

#### IOC详解

![image-20250907124227253](posts/56cf3280/images/image-20250907124227253.webp)

![image-20250907124142087](posts/56cf3280/images/image-20250907124142087.webp)

#### DI详解

![image-20250907125523163](posts/56cf3280/images/image-20250907125523163.webp)

![image-20250907130246571](posts/56cf3280/images/image-20250907130246571.webp)

#### bean的作用域

![image-20251002194154716](posts/56cf3280/images/image-20251002194154716.webp)

可以使用@Lazy注解使bean对象在调用的时候才被创建（默认是项目启动时创建）

![image-20251002194004728](posts/56cf3280/images/image-20251002194004728.webp)

有无状态的bean：该类有没有进行存储数据

+ 存储数据则为有状态的bean
+ 不存储数据则为无状态的bean

#### 第三方的bean

![image-20251002195242980](posts/56cf3280/images/image-20251002195242980.webp)



### Springboot的自动配置依赖注入

方案一：

![image-20251003120858213](posts/56cf3280/images/image-20251003120858213.webp)

方案二：

![image-20251003120921661](posts/56cf3280/images/image-20251003120921661.webp)

如果第三方jar包中没有进行@Component注解，则需要手动进行第三方@bean的配置

#### 自动配置的源码跟踪

![image-20251003122435177](posts/56cf3280/images/image-20251003122435177.webp)

![image-20251003122404706](posts/56cf3280/images/image-20251003122404706.webp)

#### @conditional装配

![image-20251003123450846](posts/56cf3280/images/image-20251003123450846.webp)

#### 自定义starter

![image-20251003125819502](posts/56cf3280/images/image-20251003125819502.webp)

### 配置文件格式properties/yml

![image-20250908181354589](posts/56cf3280/images/image-20250908181354589.webp)

![image-20250908181324412](posts/56cf3280/images/image-20250908181324412.webp)

### 事务管理

#### 使用方法

![image-20250918164051662](posts/56cf3280/images/image-20250918164051662.webp)

#### rollback回滚机制

![image-20250918170323700](posts/56cf3280/images/image-20250918170323700.webp)

例子：

+ 如果不设置rollback的异常回滚类型，手动抛出的异常，将不会影响submit

#### propagation多种事务的控制/事务的传播行为

![image-20250918170521916](posts/56cf3280/images/image-20250918170521916.webp)

例子：

+ 保证一段程序不会被rollback，try/finally如果在transactional中则会被回滚，这时即需要给finally方法加上REQUIRES_NEW的propagation，也就是保证finally的执行

#### 四大特性

![image-20250918170851843](posts/56cf3280/images/image-20250918170851843.webp)

### Interceptor拦截器

#### 介绍

![image-20250923115052579](posts/56cf3280/images/image-20250923115052579.webp)

#### 快速入门

![image-20250923115035596](posts/56cf3280/images/image-20250923115035596.webp)

#### 拦截路径

![image-20250923121246037](posts/56cf3280/images/image-20250923121246037.webp)

#### 与filter的区别

![image-20250923121333124](posts/56cf3280/images/image-20250923121333124.webp)

### SpringAOP

#### 快速入门

![image-20250924110556352](posts/56cf3280/images/image-20250924110556352.webp)

#### 核心概念

![image-20250924115318843](posts/56cf3280/images/image-20250924115318843.webp)

#### 通知类型

![image-20250924120237632](posts/56cf3280/images/image-20250924120237632.webp)

##### 切入点表达式抽取@PointCut 

![image-20250924120326745](posts/56cf3280/images/image-20250924120326745.webp)



##### 通知顺序

![image-20250924120703698](posts/56cf3280/images/image-20250924120703698.webp)

#### 切入点表达式

![image-20250924122043394](posts/56cf3280/images/image-20250924122043394.webp)

##### @execution

![image-20250924122120809](posts/56cf3280/images/image-20250924122120809.webp)

##### @annotation

![image-20250924122229372](posts/56cf3280/images/image-20250924122229372.webp)

#### 连接点

![image-20250924122423524](posts/56cf3280/images/image-20250924122423524.webp)



## mysql

### 数据类型

#### 数值类型

![image-20250915222403915](posts/56cf3280/images/image-20250915222403915.webp)

#### 字符串类型

![image-20250915222430039](posts/56cf3280/images/image-20250915222430039.webp)

#### 时间类型

![image-20250915222503171](posts/56cf3280/images/image-20250915222503171.webp)

### 约束

![image-20250907174243359](posts/56cf3280/images/image-20250907174243359.webp)

```sql
CREATE TABLE user2 (
  id int PRIMARY KEY auto_increment comment '自动增长且唯一',
  username varchar(50) not null unique comment '不能为空',
  name varchar(50) not null COMMENT '不能为空',
  age int ,
  gender char(1) DEFAULT '男' COMMENT '默认为男'
) COMMENT 'heima复习mysql'; 
```

### 多表查询

#### 外键约束

![image-20250915181338192](posts/56cf3280/images/image-20250915181338192.webp)

#### 外键缺点

![image-20250915181439169](posts/56cf3280/images/image-20250915181439169.webp)

#### 一对一

![image-20250915182254850](posts/56cf3280/images/image-20250915182254850.webp)

#### 多对多

![image-20250915182236168](posts/56cf3280/images/image-20250915182236168.webp)

#### 内连接

![image-20250915224135506](posts/56cf3280/images/image-20250915224135506.webp)

#### 外连接

![image-20250915224102222](posts/56cf3280/images/image-20250915224102222.webp)

#### 子查询

![image-20250915224242225](posts/56cf3280/images/image-20250915224242225.webp)

### 事务操作

![image-20250918163140476](posts/56cf3280/images/image-20250918163140476.webp)

![image-20250918163113023](posts/56cf3280/images/image-20250918163113023.webp)

### case函数

![image-20250922171715169](posts/56cf3280/images/image-20250922171715169.webp)

### if函数

![image-20250922172700279](posts/56cf3280/images/image-20250922172700279.webp)

## redis

> 简单来说mysql存储的是冷数据，redis存储的是热数据

### 介绍

![image-20251017162512577](posts/56cf3280/images/image-20251017162512577.webp)

### 简单使用

#### 修改密码

![image-20251105122800266](posts/56cf3280/images/image-20251105122800266.webp)

默认密码是`foobared`，修改为自己的即可

### 数据类型

![image-20251109150214866](posts/56cf3280/images/image-20251109150214866.webp)

| 数据类型   | 介绍                           |
| ---------- | ------------------------------ |
| string     | 普通字符串                     |
| hash       | 散列，键值对存储，适合存储对象 |
| list       | 列表                           |
| set        | 无序集合，无重复元素           |
| sorted set | 有序集合，根据分数升序排序     |

### 常用命令

#### 字符串常用命令

![image-20251109151156738](posts/56cf3280/images/image-20251109151156738.webp)

#### 哈希常用命令

 ![image-20251109151754034](posts/56cf3280/images/image-20251109151754034.webp)

#### 列表常用命令

![image-20251109152220164](posts/56cf3280/images/image-20251109152220164.webp)

#### 无序集合常用命令

![image-20251109152257277](posts/56cf3280/images/image-20251109152257277.webp)

#### 有序集合常用命令

![image-20251109152337947](posts/56cf3280/images/image-20251109152337947.webp)

#### 通用命令

![image-20251109153123479](posts/56cf3280/images/image-20251109153123479.webp)



## Logback

### 创建对象

![image-20250913121636646](posts/56cf3280/images/image-20250913121636646.webp)

如果使用lombok注解，可以直接使用@Slf4j即可省略创建对象

### 日志级别

![image-20250915175243970](posts/56cf3280/images/image-20250915175243970.webp)

## 项目开发

### 前端后端分离/接口文档

![image-20250909103509963](posts/56cf3280/images/image-20250909103509963.webp)

### 开发规范-Restful

![image-20250909103603966](posts/56cf3280/images/image-20250909103603966.webp)

Restful请求资源路径一般都是以复数结尾的，例如，`users`、`books`，表示请求的是一类资源，而不是请求单个资源

### APIfox

![image-20250909104450193](posts/56cf3280/images/image-20250909104450193.webp)

### Swagger

> 简单来说可以根据后端代码自动生成rustful风格的接口文档

#### 介绍

![image-20251017160812344](posts/56cf3280/images/image-20251017160812344.webp)

#### 快速使用

![image-20251017160844274](posts/56cf3280/images/image-20251017160844274.webp)

### 响应结果封装类

![image-20250909105706809](posts/56cf3280/images/image-20250909105706809.webp)

### 数据封装

![image-20250910115839843](posts/56cf3280/images/image-20250910115839843.webp)

### nginx反向代理

![image-20250911110103941](posts/56cf3280/images/image-20250911110103941.webp)

![image-20250911110124727](posts/56cf3280/images/image-20250911110124727.webp)

### 公共路径RequestMapping

![image-20250913120115073](posts/56cf3280/images/image-20250913120115073.webp)

### 后端接收前端参数

#### 请求参数多个值

![image-20250920123634760](posts/56cf3280/images/image-20250920123634760.webp)

#### GET/uri/路径参数

![image-20250911112849315](posts/56cf3280/images/image-20250911112849315.webp)

![image-20250911112909811](posts/56cf3280/images/image-20250911112909811.webp)

![image-20250911112928540](posts/56cf3280/images/image-20250911112928540.webp)

![image-20250913113717047](posts/56cf3280/images/image-20250913113717047.webp)

如果前端传递参数过多，则直接用对象进行封装

![image-20250917113912890](posts/56cf3280/images/image-20250917113912890.webp)

#### POST/body

![image-20250911115144623](posts/56cf3280/images/image-20250911115144623.webp)

##### 文件上传

![image-20250918174400453](posts/56cf3280/images/image-20250918174400453.webp)

![](posts/56cf3280/images/image-20250918180241776.webp)

### 参数配置化

![image-20250919182723248](posts/56cf3280/images/image-20250919182723248.webp)

![image-20250919182801091](posts/56cf3280/images/image-20250919182801091.webp)

### OSS文件上传

```java
package fun.yyssh.utils;

import com.aliyun.oss.*;
import com.aliyun.oss.common.auth.CredentialsProviderFactory;
import com.aliyun.oss.common.auth.EnvironmentVariableCredentialsProvider;
import com.aliyun.oss.common.comm.SignVersion;
import com.aliyun.oss.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * 阿里云OSS工具操作类
 */

@Component
public class AliyunOSSOperator {

    @Autowired
    private AliyunOSSProperties aliyunOSSProperties;

    public String upload(String originalFilename , InputStream inputStream) throws Exception {
        String endpoint = aliyunOSSProperties.getEndpoint();
        String bucketName = aliyunOSSProperties.getBucketName();
        String region = aliyunOSSProperties.getRegion();

        EnvironmentVariableCredentialsProvider credentialsProvider = CredentialsProviderFactory.newEnvironmentVariableCredentialsProvider();

        // 格式化文件名
        // 获取当前系统日期的字符串，格式化为yyyy/MM/dd
        String dir = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        // 生成一个不重复的文件名
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String random = UUID.randomUUID().toString();
        String newFileName = random + extension;
        String objectName = dir + "/" + newFileName;

        // 创建OSSClient实例。
        // 当OSSClient实例不再使用时，调用shutdown方法以释放资源。
        ClientBuilderConfiguration clientBuilderConfiguration = new ClientBuilderConfiguration();
        clientBuilderConfiguration.setSignatureVersion(SignVersion.V4);
        OSS ossClient = OSSClientBuilder.create()
                .endpoint(endpoint)
                .credentialsProvider(credentialsProvider)
                .clientConfiguration(clientBuilderConfiguration)
                .region(region)
                .build();

        try {
            // 创建PutObjectRequest对象。
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, objectName, inputStream);

            // 上传文件。
            ossClient.putObject(putObjectRequest);
        }  finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
        return "https://" + bucketName + "." + endpoint.split("://")[1] + "/" + objectName;
    }
}
```

### 全局异常处理

![image-20250922163443687](posts/56cf3280/images/image-20250922163443687.webp)

### 登录权限设置

#### cookie

![image-20250922210832738](posts/56cf3280/images/image-20250922210832738.webp)

#### session

![image-20250922211703632](posts/56cf3280/images/image-20250922211703632.webp)

#### JWT令牌

![image-20250922212110579](posts/56cf3280/images/image-20250922212110579.webp)

![image-20250922220250167](posts/56cf3280/images/image-20250922220250167.webp)

##### 生成jwt令牌

![image-20250922220311005](posts/56cf3280/images/image-20250922220311005.webp)

##### 解析jwt令牌

![image-20250922220430715](posts/56cf3280/images/image-20250922220430715.webp)

### ThreadLocal

#### 介绍

![image-20250926111017774](posts/56cf3280/images/image-20250926111017774.webp)

#### 在AOP程序中获取jwt中的员工id

![image-20250926111117526](posts/56cf3280/images/image-20250926111117526.webp)

### 配置优先级

![image-20251008000831263](posts/56cf3280/images/image-20251008000831263.webp)

<img src="/posts/56cf3280/images/image-20251002192731040.webp" alt="image-20251002192731040" style="zoom:50%;" />

### 分模块设计与开发

![image-20251004191209079](posts/56cf3280/images/image-20251004191209079.webp)

![image-20251004191225963](posts/56cf3280/images/image-20251004191225963.webp)

如果想要使用其他模块的功能，在对应的pom文件中引入对应的模块即可

### docker项目发布

#### Dockerfile编写

```bash
# 基础镜像：CentOS 7
FROM centos:7

# 创建应用目录
RUN mkdir -p /app
WORKDIR /app

# 将本地的 JDK 压缩包和 JAR 文件复制到镜像中
COPY jdk-17.0.16_linux-x64_bin.tar.gz /app/
COPY Tlias.jar /app/app.jar  # 重命名为 app.jar

# 解压 JDK 并设置环境变量
RUN tar -xzf jdk-17.0.16_linux-x64_bin.tar.gz && \
    rm jdk-17.0.16_linux-x64_bin.tar.gz && \
    mv jdk-17.0.16 /usr/local/

# 设置 JAVA_HOME 和 PATH
ENV JAVA_HOME=/usr/local/jdk-17.0.16
ENV PATH=${PATH}:${JAVA_HOME}/bin

# 暴露应用端口
EXPOSE 8080

# 启动命令
CMD ["java", "-jar", "/app/app.jar"]
```

## 微信小程序开发

### 介绍

![image-20251109162443888](posts/56cf3280/images/image-20251109162443888.webp)

### 目录结构

![image-20251109163938995](posts/56cf3280/images/image-20251109163938995.webp)

### 页面结构

![image-20251109164018617](posts/56cf3280/images/image-20251109164018617.webp)

### 登录流程

<img src="/posts/56cf3280/images/image-20260120173109187.webp" alt="image-20260120173109187" style="zoom: 80%;" />