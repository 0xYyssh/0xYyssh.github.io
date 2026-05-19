---
title: python学习
tags:
  - python
categories:
  - 语言学习
swiper_index: 0
description: 个人初学python写的一些总结，不喜勿喷
abbrlink: fbaff1b6
date: 2025-05-19 12:25:47
---

### input输入

==python对缩进有着严格的要求，这里的print和input都是顶格写==

```python
#input()内的作用和print（）一样，都是打印，但是如果这样操作，输入不会换行
name=input("What is your name ?")
num=input("What is your number ?")
print(type(num))
#input输入数据都是字符串类型
int(num)
print(num)

#练习 欢迎登录小程序
user_name=input()
user_type=input()
print("您好：%s,您是尊贵的：%s用户，欢迎您的光临。"%(user_name,user_type))
```

```echo
What is your name ?123	#他会让你输入一些数据，123是我输入的数据
What is your number ?123
<class 'str'>
123
123
123
您好：123,您是尊贵的：123用户，欢迎您的光临。
```

### 算术运算符

```python
print("1+1=",1+1)
print("1-1=",1-1)
print("1*1=",1*1)
print("8/3=",8/3)
print("7//2=",7//2)
print("5%3=",5%3)
print("2**3=",2**3)
```

```echo
1+1= 2
1-1= 0
1*1= 1
8/3= 2.6666666666666665
7//2= 3
5%3= 2
2**2= 8
```

### 精确度和字符串拼接

```python
name="YYSSH"
num=1
print("My name is",name,"My number is",num)

#   %s表示占位符，后面%括号里面表示替代前面%s
message="My name is %s,My number is %s"%(name,num)

#    %s表示str占位符，%d表示int的占位符，%f表示float的占位符


num3=11
num4=15.557879798
#     首先是%d表示int占位符，然后%后的辅助符号第一个表示宽度
print("宽度限制5 结果是%5d"%num3)

#     若限制宽度小于数字本身宽度，则不生效
print("宽度限制1 结果是%1d"%num3)

################若控制精度则数值会四舍五入###################

#      首先是%f表示float占位符，%后的第一位表示宽度，第二位表示保留小数
print("宽度限制7，保留两位小数 结果是%7.2f"%num4)

#      若%后没有第一位只有小数点后位，则表示宽度没有限制
print("没有宽度限制，保留两位小数 结果是%.2f"%num4)

##########快速格式化########
Name="YYSSH"
set_num=1.01123
set_num2=12312

#进行所有括号内部格式化(将变量进行数据输出)，但是不能控制精度
print(f"My name is {Name},My num1 is{set_num},My num2 is{set_num2}")
nb=f"My name is {Name},My num1 is{set_num},My num2 is{set_num2}"
print(nb)
```

```echo
My name is YYSSH My number is 1
宽度限制5 结果是   11
宽度限制1 结果是11
宽度限制7，保留两位小数 结果是  15.56
没有宽度限制，保留两位小数 结果是15.56
My name is YYSSH,My num1 is1.01123,My num2 is12312
My name is YYSSH,My num1 is1.01123,My num2 is12312
```

### while循环\for循环

```python
num = 1
sum = 0
while num <=100 :
    sum += num
    num += 1

print(sum)

while Ture:	#死循环
```

```echo
5050
```

```python
name="itheima is a brand of itcast"
count=0
for x in name :
    if x=='a' :
        count+=1

print(count)

count=0
num =3
for x in range(1,num+1):	#没有取num+1
    print(x)
    if x%2==0 :
        count+=1

print(count)
```

```echo
4
1
2
3
1
```

### 函数

==def定义带有名称的函数==

```python
def 函数名：
	直接用
    返回值(可以有多个) e.g. retrun 1,"yanyuan",{123}
    
    x,y,z=函数名()
```

==lambda定义匿名函数==

只能被调用一次（因为没有名字），但可以多次写

```python
lambda x,y:x+y	#只能有一行函数体，冒号后面的即是return返回值也是函数体
```



#### 传参

```python
def user_info(name,age,gender):
	print(f"{name},{age},{gender}")
user_info("yanyuan",age=20,gender="男")	#乱序也可以，但是要指定键
```

```python
def user_info(name,age,gender="男"):	#只能在后面设置默认值，也就是默认值后面不允许不是默认值的
	print(f"{name},{age},{gender}")
user_info("yanyuan",age=20)	#若不传值，则为设定的默认值男
```

```python
def user_info(*args):	#规定叫args，不用也可以*a,*b
	print(f"{type(args)}")	#传进来之后都变成了元组
user_info("yanyuan",age=20,gender="男")

def user_info(**kwargs):	#规定叫kwargs，不用也可以*a,*b
	print(f"{type(kwargs)}")	#传进来之后都变成了字典
user_info(name="yanyuan",age=20,gender="男")	#所以只能键值对传参
```



### 序列(列表、元组、字符串)

#### 列表

##### 增删改查

```python
##增加
#######在指定下标前面插入一个元素###########

mylist=[1,2,3,4,5]
mylist.insert(1,"y")
print(mylist)

#######在列表末尾插入一个元素###########

mylist=[0,1,2,3,4,5]
mylist.append(9)
print(mylist)

#######在列表末尾插入一个列表###########

mylist=[0,2,4,5,6,8]
mylist2=[11111,222222,33333]
mylist.extend(mylist2)
print(mylist)
```

```echo
[1, 'y', 2, 3, 4, 5]
[0, 1, 2, 3, 4, 5, 9]
[0, 2, 4, 5, 6, 8, 11111, 222222, 33333]
```

```python
##删除
#######在指定下标删除一个元素###########

##Example(1)
mylist=[1,2,3,4,56,6,7]
del mylist[2]
print(mylist)

##Example(2)
mylist=[1,2,3,4,56,67,7,7,8]
pop=mylist.pop(4)
print(mylist)
print(pop)

##Example(3)  #只会删除第一个匹配项目
mylist=[1,2,3,4,56,67,7,7,8]
mylist.remove(7)
print(mylist)
```

```echo
[1, 2, 4, 56, 6, 7]
[1, 2, 3, 4, 67, 7, 7, 8]
56
[1, 2, 3, 4, 56, 67, 7, 8]
```

```python
##修改
#######在指定位置修改一个元素###########

mylist=[1,2,3,4,56,7,8,1]
mylist[5]=999999
print(mylist)
```

```echo
[1, 2, 3, 4, 56, 999999, 8, 1]
```

```python
##查询
#######查找一个元素,并返回他的下标###########

mylist=[1,23,4,54,645,7,54,1]
index=mylist.index(645)
print(index)
```

```echo
4
```

```python
##统计
#######统计一个元素在列表中出现的次数###########

mylist=[1,23,4,54,645,7,54,1]
count=mylist.count(1)
print(count)
```

```echo
2
```

```python
##清空
#######清空列表###########

mylist=[213125435423,541542354235]
mylist.clear()
print(mylist)
```

```echo
[]
```

```python
##求列表大小
#######求列表大小(返回数组有多少个元素)###########

mylist=[123123455435,456453,67345,67,546,543,6543]
len=len(mylist)
print(len)
```

```echo
7
```

#### 字符串

##### 字符串转大小写

```python
name='pyThOn'
print(name.upper())	#转大写
print(name.lower())	#转小写
print(name.capitalize())  # 输出：Python	首字母大写
print(name.title())  # 输出：Python	每个单词首字母大写
```



```python
my_str=("YYSSH")
y=my_str[0]
h=my_str[-1]
print(f"{y},{h}")

######### 查找
index=my_str.index("S")
print(f"{index}")

############ 替换
replace=my_str.replace("YY","yy")
print(f"{replace}")

############ 用split切割字符串，并且用一个列表进行存储,默认是清除空格
split=my_str.split()
print(f"{split},{type(split)}")

#############  strip 若括号里面不添加内容，则默认去除行首和行尾的空格和换行符
my_str=("   YYSSH    ")
strip=my_str.strip()
print(f"{strip}")

my_str=("78 YYSSH 87")
strip=my_str.strip("78")
print(f"{strip}")

#字符串也有count和len函数
```

```echo
Y,H
2
yySSH
['YYSSH'],<class 'list'>
YYSSH
 YYSSH 
```

#### 元组

```python
###########定义元组  :元组不可以被修改 tuple
from itertools import count

t =(1,1,1,1,1,1,23,577,"jianjian")
print(f"{t}")

################ 跟list一样 都可以使用 index count len
index = t.index(577)
print(f"{index}")
tc= t.count(1)
print(f"{tc}")
len =len(t)
print(f"{len}")

############# 元组元素不可以被修改（自我猜测应该是记录了元素的首地址），但是元素的元素可以被修改 e.g.（元组里面有个列表）

t2=(1,2,3,4,5,6,[1,2,3])
t2[6][0]=0
print(f"{t2}")
```

```echo
(1, 1, 1, 1, 1, 1, 23, 577, 'jianjian')
7
6
9
(1, 2, 3, 4, 5, 6, [0, 2, 3])
```



==序列 	连续、有序、支持下标索引 	e.g.(列表、元组、字符串)==

```python
my_list=[1,2,3,4,5,6,7]
result1=my_list[::]      ######### 三个空格默认分别为 行首、行尾、步长为1
print(f"{result1}")

my_tuple=("YYSSH","yyssh","YYssh","yuya","ioio")
result2=my_tuple[1:4:1]    #####如果不使用默认的空格表示，则不会表示步长最后一个数
result3=my_tuple[::-1]     #####若表明步长为-1，则默认从行尾到行首
print(f"{result2},{result3}")

my_str=("YySsH")
result4=my_str[::2]
print(f"{result4}")
```

```echo
[1, 2, 3, 4, 5, 6, 7]
('yyssh', 'YYssh', 'yuya'),('ioio', 'yuya', 'YYssh', 'yyssh', 'YYSSH')
YSH
```

```homework
#练习案例：序列的切片实践
my_str1=("学python,来黑马程序员,月薪过万")
my_str=my_str1[::-1]
print(f"{type(my_str)}")
split=my_str.split(",")
print(f"{split}")
split2=split[1]
strip=split2.strip("来")
print(f"{strip}")
print(f"{strip[::-1]}")
```

```echo
<class 'str'>
['万过薪月', '员序程马黑来', 'nohtyp学']
员序程马黑
黑马程序员
```

### 集合

```python
###############  集合 无序、所以不支持下标索引和while循环遍历 去重、集合里面不允许有重复的数据存在

## 定义一个空集合
SET=set()
print(f"{SET}")

my_set={1,3,34,5,5,6,7}
print(f"{my_set}")

## 添加一个集合元素
my_set.add("yan")
print(f"{my_set}")

## 移除一个集合元素
my_set.remove("yan")
print(f"{my_set}")

## 取出第一个元素
pop=my_set.pop()
print(f"{my_set}")

## 清空集合
my_set.clear()
print(f"{my_set}")

## 取集合1相比集合2的差集，集合1、2都不变，生成一个新的集合
my_set={1,2,3,4}
my_set2={2,3,4,5}
different=my_set.difference(my_set2)
print(f"{different},{my_set},{my_set2}")

## 去除集合1与集合2相同的部分，保留不同的部分
my_set.difference_update(my_set2)
print(f"{my_set},{my_set2}")

## 合并两个集合
my_set3=my_set.union(my_set2)
print(f"{my_set3},{my_set},{my_set2}")

## 集合也有len函数
```

```echo
set()
{1, 34, 3, 5, 6, 7}
{1, 34, 3, 5, 6, 7, 'yan'}
{1, 34, 3, 5, 6, 7}
{34, 3, 5, 6, 7}
set()
{1},{1, 2, 3, 4},{2, 3, 4, 5}
{1},{2, 3, 4, 5}
{1, 2, 3, 4, 5},{1},{2, 3, 4, 5}
```

### 字典

```python
# 定义字典
# {key:value,key:value,.....,key:value}

# 定义字典变量
# my_dict={key:value,key:value}

# 定义空字典
# my_dict={}
# my_dict=dict()

# 定义重复key值的话，新的key值会把老的key值给覆盖，
# 嵌套字典的话key值不可以为字典，但是value可以为字典

# 新增元素
# my_dict["新增的元素"]=你要赋的value值

# 删除元素
# my_dict.pop("删除的元素")

# 清空元素
# my_dict.clear()

# 获取全部的key
my_dict={1:1,23:2,4:2,4:2}
keys=my_dict.keys()

# 遍历字典
for key in keys:
    print(f"{key}")
    print(f"{my_dict[key]}")
for key in my_dict:
    print(f"{key}")
    print(f"{my_dict[key]}")
```

### 容器的不同

==都支持len\max\min\sorted(序列,[reverse=True])==

==使用sorted函数之后容器会变成列表==

==字典转序列除了字符串，其他都会丢失值==

![image-20241113202258253](posts/fbaff1b6/images/容器的不同.webp)

### 字符串的比较

```text
通过ascii码表一位一位比较，只要前面有一位比后面大，整体就大
```

### 文件读取

```python
open(name,mode,encoding)
#name是要打开文件名（可以包含文件所在的具体路径）
#mode设置文件打开的模式（访问模式）：只读、写入、追加等
#encoding编码格式（大多用UTF-8）

with open(name,mode,encoding) as f:	#会自动帮我们关闭文件

f=open(python.md,'r',encoding=UTF-8)
#r:read读取文件，文件指针放在文件开头
#w:write写入文件，默认删除原本文件内容，没有文件则新建文件
#a:add追加文件内容，没有文件新建文件
f.read(读取文件字节数)	#默认不写则为num，即是所有字节
f.read(10)	#会从本次代码中上一次read读取末尾进行读取，也就是文件读取指针发生了偏移

#在本次代码中文件读取指针对整个文件有影响，也就是不论函数，指针已经发生了偏移

f.readlines()	#读取文件一行内容，并以列表的模式返回，
f.close()
```

#### 循环读取文件数据

```python
for line in open("python.txt","r"):
    print(line)
#line是临时数据，记录文件一行数据，line的类型是字符串
```

#### 文件写入

```python
f=open(python.md,'w',encoding=UTF-8)
f.write(111)	#这行代码执行完之后还没有把内容写入硬盘文件中，而是写入到了内存中，防止重复调用硬盘
f.flush()	#把内容写入硬盘中
f.close()	#这个函数自带了flush功能
```

### 异常

```python
try:
	可能发生错误的代码
	f=open("NULL.txt","r",encoding="UTF-8")	//因为没有这个文件所以无法读取发生报错
except：
	发生错误之后的处理
	f=open("NULL.txt","w",encoding="UTF-8")	//所以改成写入文件即创建这个文件
except (NameError,ZeroDivisionError) as e(用e这个变量接收):	//捕获指定的异常、
	print(e)	//打印这个异常的具体信息
else:	//如果没有异常
finally:	//最终执行代码，不论上述代码执行成不成功

except Exception as e:	//等于except接收所有异常
```

**异常可以传递**

### Python模块

```python
[]:表示可选
[from 模块名] import [模块|类|变量|函数|*][as 别名]

如果调用模块的函数名一样的话，会使用后面那个函数

不进行调用模块的测试代码
if __name__='__main__' :
	测试代码
	
from 模块名 import *	//可以手动导入没有被all的函数
	如果模块里面定义了__all__==['执行函数']，则只能引入执行函数	//因为*===__all__	
```

### pip国内网站源安装包

```text
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 安装包名
```

### python中json格式

可以使用python中的内置模块，将字典或者包含字典的列表转换为json格式

+ `json.dump(data)`:将字典或者包含字典的列表转换为json格式
+ `json.load(data)`:将json转换为字典或者列表

### python服务请求

##### bs4库一些常用函数说明

`BeautifulSoup`（简称`bs4`）是一个用于解析HTML和XML文档的Python库。它创建了一个解析树，从中可以提取和操纵数据。对于Python新手来说，`BeautifulSoup`提供了一个非常直观和易于使用的接口来处理网页数据。以下是一些`BeautifulSoup`中常用的函数和方法，以及它们的说明和作用：

`BeautifulSoup` 构造函数

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')

html_doc: 一个字符串或字节对象，表示要解析的HTML或XML文档。
'html.parser': 解析器类型，BeautifulSoup支持多种解析器，但'html.parser'是Python标准库自带的，无需额外安装。
```

解析器解释

```text
解析器的作用是将HTML文档（通常是一个字符串或字节序列）转换成一个树形结构，这个结构中的每个节点都对应着HTML文档中的一个元素（如标签、文本节点等）。BeautifulSoup提供了对这个树形结构的操作接口，允许你查找、修改和删除元素，以及提取文档中的数据。

除了'html.parser'(这个python自带)之外，BeautifulSoup还支持其他几种解析器，如lxml和html5lib。这些解析器通常提供了更快的解析速度和更好的HTML5支持，但它们需要你先安装相应的库才能使用。

lxml：这是一个基于C语言库的解析器，速度非常快，并且支持XPath和XSLT等高级功能。但是，lxml不是Python标准库的一部分，你需要使用pip等包管理器来安装它。

html5lib：这是一个纯Python编写的解析器，它完全符合HTML5规范，并且可以处理一些html.parser无法正确解析的HTML文档。然而，html5lib的解析速度通常比lxml慢。
```

 `find()` 和 `find_all()`

```python
tag = soup.find('tagname')
tags = soup.find_all('tagname')

tagname: 要查找的标签名。
find() 方法返回文档中第一个匹配的标签。
find_all() 方法返回文档中所有匹配的标签的列表。
```

 `find_parents()` 和 `find_parent()`

```python
parents = tag.find_parents('tagname')
parent = tag.find_parent('tagname')

这些方法用于查找当前标签的父标签。
find_parents() 返回所有匹配的父标签。
find_parent() 返回第一个匹配的父标签。
```

 `find_next_siblings()` 和 `find_next_sibling()`

```python
siblings = tag.find_next_siblings('tagname')
sibling = tag.find_next_sibling('tagname')

这些方法用于查找当前标签之后的同级标签。
find_next_siblings() 返回所有匹配的同级标签。
find_next_sibling() 返回第一个匹配的同级标签。
```

 `get_text()`

```python
text = tag.get_text()

这个方法用于获取标签及其子孙标签中的所有文本内容。
可以传递参数来指定分隔符、剥离空白等。
```

`attrs`和`string`

```python
attributes = tag.attrs
content = tag.string

attrs 是一个字典，包含标签的所有属性及其值。
如果标签只包含文本内容（没有子标签），则string属性会返回该文本。
如果标签包含子标签，则string属性可能为None。
```

`navigable_string` 和 `set_navigable_string()`

```python
new_string = BeautifulSoup("<new_string>", 'html.parser').navigable_string
tag.set_navigable_string(new_string)

navigable_string 属性用于获取或设置标签的字符串内容。
set_navigable_string() 方法用于设置标签的字符串内容。
```

 `decode()` 和 `encode()`

```python
decoded_string = soup.decode()
encoded_bytes = soup.encode('utf-8')

decode() 方法用于将BeautifulSoup对象解码为字符串。
encode() 方法用于将BeautifulSoup对象编码为字节序列。
```



##### requests.post/requests.get

```text
requests.post(url, data=None, json=None, headers=None, cookies=None, files=None, auth=None, timeout=None, allow_redirects=True, proxies=None, stream=None, verify=None, cert=None, hooks=None)

data: (可选)
发送到服务器的表单数据。可以是字典、字节串、文件对象，或者一个文件描述符。
示例：
data = {'key': 'value'}
response = requests.post(url, data=data)

json: (可选)
这是一个将数据以 JSON 格式发送的快捷方式。如果提供了这个参数，requests 会自动将数据编码为 JSON 格式，并设置请求头 Content-Type 为 application/json。
示例：
json_data = {'name': 'Alice', 'age': 25}
response = requests.post(url, json=json_data)

headers: (可选)
字典类型的 HTTP 请求头。你可以在请求中添加自定义的 HTTP 头，例如设置 Content-Type，Authorization 等。
示例：
headers = {'User-Agent': 'my-app'}
response = requests.post(url, headers=headers)

cookies: (可选)
一个字典，包含要随请求发送的 Cookie 数据。可以指定浏览器会话的 Cookie 或者其他类型的 Cookie。
示例：
cookies = {'session_id': 'abc123'}
response = requests.post(url, cookies=cookies)

files: (可选)
用于上传文件。可以使用字典形式，键是表单字段名，值是文件对象（使用 open() 打开的文件）。
示例：
files = {'file': open('report.pdf', 'rb')}
response = requests.post(url, files=files)

auth: (可选)
用于 HTTP 基本认证的元组（username, password）。如果服务器要求身份验证，这个参数会帮助自动处理认证。
示例：
auth = ('username', 'password')
response = requests.post(url, auth=auth)

timeout: (可选)
请求的超时时间（单位是秒）。这个参数定义了请求等待服务器响应的最长时间。
示例：
response = requests.post(url, timeout=5)  # 5秒超时

allow_redirects: (可选)
默认为 True。如果设置为 False，请求将不会自动跟随 HTTP 重定向（3xx 状态码）。
示例：
response = requests.post(url, allow_redirects=False)

proxies: (可选)
用于指定代理服务器的字典。
proxies = {'http': 'http://10.10.1.10:3128', 'https': 'http://10.10.1.10:1080'}
response = requests.post(url, proxies=proxies)

stream: (可选)
默认为 False。如果设置为 True，响应的内容不会立即下载，直到你开始读取它。这对于大文件下载时非常有用。
示例：
response = requests.post(url, stream=True)

verify: (可选)
默认为 True，表示验证 SSL 证书。如果设置为 False，将不验证 SSL 证书，适用于不受信任的自签名证书。
示例：
response = requests.post(url, verify=False)

cert: (可选)
用于指定 SSL 证书文件。如果你需要进行客户端证书验证，可以使用该参数。
示例：
response = requests.post(url, cert=('cert.pem', 'key.pem'))

hooks: (可选)
钩子函数，通常用于在请求完成后执行一些自定义操作。例如，可以指定请求的 response 钩子以对响应做后处理。



requests.get 参数详解
requests.get(url, params=None, headers=None, cookies=None, auth=None, timeout=None, allow_redirects=True, proxies=None, stream=None, verify=None, cert=None, hooks=None)

params: (可选)
URL 查询参数，可以是字典、元组或字节序列。requests 会自动将其编码为查询字符串并附加到 URL 上。
示例：
params = {'q': 'python', 'page': 2}
response = requests.get(url, params=params)
```

### python脚本速写小技巧

##### format{}占位符

```python
soure_number='$(({}))'
add_number='$(())'
payload=soure_number.format(add_number*37)	#这里format函数将会使add_number*37与{}进行替换
print(payload)
```

##### 善用f_string格式化

在新版本的 Python 中（从 Python 3.6 开始），引入了 **f-string**（格式化字符串字面量），即通过在字符串前加上字母 `f` 来实现字符串插值，它比传统的 `.format()` 方法和 `%` 格式化更加简洁和高效。

**基本语法**

```python
f"Hello, {variable}!"
```

- `f` 表示这是一个格式化字符串。
- `{variable}` 是一个占位符，Python 会把 `variable` 的值插入到字符串中。

```python
name = "Alice"
age = 25

# 使用 f-string 格式化字符串
greeting = f"Hello, my name is {name} and I am {age} years old."
print(greeting)
```

输出：

```
Hello, my name is Alice and I am 25 years old.
```

在 `f-string` 中，任何在花括号 `{}` 内的表达式都会被计算并且结果会插入到字符串中。

**支持的表达式**

在 `f-string` 中，你不仅可以插入简单的变量，也可以使用复杂的表达式、函数调用、甚至条件判断。

1. **变量插值**

```python
name = "Bob"
message = f"Hello, {name}!"
print(message)  # 输出 'Hello, Bob!'
```

2. **数学表达式**

```python
x = 10
y = 5
result = f"The sum of {x} and {y} is {x + y}."
print(result)  # 输出 'The sum of 10 and 5 is 15.'
```

**调用函数**

```python
def greet(name):
    return f"Hello, {name}!"

name = "Alice"
message = f"Message: {greet(name)}"
print(message)  # 输出 'Message: Hello, Alice!'
```

4. **条件表达式**

```python
age = 20
message = f"You {'are' if age >= 18 else 'are not'} an adult."
print(message)  # 输出 'You are an adult.'
```

 **格式化选项**

你还可以在花括号内使用格式规范来对插入的值进行格式化。格式化规范通常写在 `:` 后面。

 常见格式化选项：

- `d`：十进制整数
- `x`：十六进制整数（小写字母）
- `X`：十六进制整数（大写字母）
- `o`：八进制整数
- `b`：二进制整数
- `f`：浮点数，默认是小数形式
- `e`：浮点数，使用科学记数法
- `g`：浮点数，自动选择最合适的表示方式

1. **数字格式化**

- **浮动数值：**

	```python
	pi = 3.141592653589793
	message = f"Pi is approximately {pi:.2f}."
	print(message)  # 输出 'Pi is approximately 3.14.'
	```

	`:.2f` 表示保留两位小数。

- **整数格式化：**

	```python
	num = 123456789
	message = f"Formatted number: {num:,}"
	print(message)  # 输出 'Formatted number: 123,456,789'
	```

	`:,` 会使用逗号作为千位分隔符。

2. **对齐和宽度**

你可以设置文本的对齐方式、宽度等。

- **右对齐（默认）：**

	```python
	name = "Alice"
	message = f"{name:>10}"  # 右对齐，宽度为10
	print(message)  # 输出 '     Alice'
	```

- **左对齐：**

	```python
	name = "Alice"
	message = f"{name:<10}"  # 左对齐，宽度为10
	print(message)  # 输出 'Alice     '
	```

- **居中对齐：**

	```python
	name = "Alice"
	message = f"{name:^10}"  # 居中对齐，宽度为10
	print(message)  # 输出 '  Alice   '
	```

3. **填充字符**

可以设置对齐时使用的填充字符。

```python
name = "Alice"
message = f"{name:.^10}"  # 使用点号 '.' 填充，宽度为 10
print(message)  # 输出 '..Alice...'
```

 **日期和时间格式化**

对于日期和时间类型，可以使用 `strftime` 格式来进行格式化。

```python
from datetime import datetime
now = datetime.now()
message = f"Current time: {now:%Y-%m-%d %H:%M:%S}"
print(message)  # 输出 'Current time: 2025-02-03 14:22:45'
```

`%Y-%m-%d %H:%M:%S` 是标准的日期时间格式，表示年-月-日 时:分:秒。

**嵌套 f-string**

如果你需要在一个 `f-string` 中嵌套另一个 `f-string`，可以直接这样做：

```python
name = "Bob"
age = 30
message = f"Name: {f'Name is {name}'} and Age: {age}"
print(message)  # 输出 'Name: Name is Bob and Age: 30'
```

##### 直接判断一个字符在不在字符串 not in

```python
text = "hello world"
if "evil input" not in text:
    print("没有 'evil input' 这个子字符串")
else:
    print("包含 'evil input' 这个子字符串")
```

### re模块(正则表达式)的学习

`re` 模块提供了一些用于处理字符串匹配、替换和分割的工具，基于正则表达式的语法。正则表达式是一种强大的模式匹配工具，可以用来查找、验证或替换字符串中的内容。

**常见用法：**

`re.compile()` 函数

`re.compile()` 函数用于将正则表达式编译成一个正则表达式对象，可以多次使用该对象进行匹配操作。这种方法在你需要进行多次匹配时非常有用，因为编译后的正则表达式对象会提高性能。

```
import re

# 使用 re.compile 编译正则表达式
pattern = re.compile(r'(\d+)-(\d+)-(\d+)')

# 进行多次匹配
text1 = "2025-03-25"
text2 = "2024-12-31"

match1 = pattern.match(text1)
if match1:
    print(match1.group(0))  # 输出: 2025-03-25

match2 = pattern.match(text2)
if match2:
    print(match2.group(0))  # 输出: 2024-12-31
```

在这个例子中，使用 `re.compile()` 编译正则表达式 `r'(\d+)-(\d+)-(\d+)'`，然后我们就可以多次调用 `match()` 或 `search()` 方法，避免每次都重新解析正则表达式，从而提高效率。

`re.match()` 和 `re.search()`

- **`re.match()`**: 从字符串的开始位置开始尝试匹配模式。如果模式在字符串开始处匹配成功，它会返回一个匹配对象；否则返回 `None`。

	```
	pythonresult = re.match(r'\d+', '123abc')
	print(result.group())  # 输出: 123
	```

	`match()` 只会在字符串的起始位置进行匹配，因此只有在匹配发生在字符串的最前面时才会成功。

- **`re.search()`**: 在整个字符串中搜索模式。如果在字符串中找到匹配的部分，它会返回一个匹配对象；否则返回 `None`。

	```
	pythonresult = re.search(r'\d+', 'abc123xyz')
	print(result.group())  # 输出: 123
	```

	`search()` 会在整个字符串中查找匹配项，而不仅仅是从起始位置开始，因此比 `match()` 更灵活。

 `re.findall()` 和 `re.finditer()`

- **`re.findall()`**: 返回一个包含所有匹配项的列表。每个元素是字符串中的一个匹配项。

	```
	pythonresult = re.findall(r'\d+', 'abc123def456gh789')
	print(result)  # 输出: ['123', '456', '789']
	```

- **`re.finditer()`**: 返回一个迭代器，其中每个元素都是一个匹配对象。你可以使用 `group()` 来提取每个匹配的子串。

	```
	pythonresult = re.finditer(r'\d+', 'abc123def456gh789')
	for match in result:
	    print(match.group())  # 输出: 123 456 789
	```

 `re.sub()` 和 `re.subn()`

- **`re.sub()`**: 用于替换字符串中的匹配内容。它接受三个参数：正则表达式、替换字符串、原始字符串。

	```
	pythonresult = re.sub(r'\d+', 'number', 'abc123def456')
	print(result)  # 输出: abcnumberdefnumber
	```

- **`re.subn()`**: 和 `re.sub()` 类似，但它还会返回替换操作发生的次数。

	```
	pythonresult, count = re.subn(r'\d+', 'number', 'abc123def456')
	print(result)  # 输出: abcnumberdefnumber
	print(count)   # 输出: 2
	```

 `re.split()`

`re.split()` 用于根据正则表达式分割字符串，返回一个列表。它与字符串的 `split()` 方法类似，但 `re.split()` 可以使用正则表达式作为分隔符。

```
pythonresult = re.split(r'\d+', 'abc123def456ghi789')
print(result)  # 输出: ['abc', 'def', 'ghi', '']
```

在这个例子中，正则表达式 `\d+` 匹配一个或多个数字，所以字符串会在这些数字处被分割。

**`group`方法**

在使用正则表达式进行匹配时，`re.match()`、`re.search()` 或 `re.findall()` 等函数会返回一个匹配对象。如果匹配成功，这些对象允许你调用 `.group()` 方法来提取匹配的字符串。

- **`group()` 方法**：返回匹配结果中捕获的子串。可以使用数字或名称来提取捕获的组。

```
import re

pattern = r'(\d+)-(\d+)-(\d+)'
text = "2025-03-25"

match = re.match(pattern, text)
if match:
    # group(0) 返回完整的匹配
    print(match.group(0))  # 输出: 2025-03-25
    
    # group(1) 返回第一个捕获组
    print(match.group(1))  # 输出: 2025
    
    # group(2) 返回第二个捕获组
    print(match.group(2))  # 输出: 03
    
    # group(3) 返回第三个捕获组
    print(match.group(3))  # 输出: 25
```

- **使用 `group()` 获取多个匹配组**：

	- `group(0)`：返回完整的匹配内容。
	- `group(1)`、`group(2)`、...：返回对应的捕获组内容。

- **提取所有捕获组**： 如果你想一次性获取所有捕获组，可以使用 `groups()` 方法，它返回一个元组，包含所有匹配的子组：

	```
	pythonmatch = re.match(pattern, text)
	if match:
	    print(match.groups())  # 输出: ('2025', '03', '25')
	```

- **使用命名组**：如果你在正则表达式中使用了命名捕获组，可以通过组名来获取匹配内容。

	```
	pattern = r'(?P<year>\d+)-(?P<month>\d+)-(?P<day>\d+)'
	text = "2025-03-25"
	match = re.match(pattern, text)
	if match:
	    print(match.group('year'))   # 输出: 2025
	    print(match.group('month'))  # 输出: 03
	    print(match.group('day'))    # 输出: 25
	```

**常见正则表达式模式：**

- **`.`**：匹配任何单个字符（除了换行符）。
- **`\d`**：匹配数字字符，等价于 `[0-9]`。
- **`\D`**：匹配非数字字符，等价于 `[^0-9]`。
- **`\w`**：匹配字母数字字符（包括下划线），等价于 `[a-zA-Z0-9_]`。
- **`\W`**：匹配非字母数字字符，等价于 `[^a-zA-Z0-9_]`。
- **`\s`**：匹配任何空白字符（空格、制表符、换行符等）。
- **`\S`**：匹配任何非空白字符。
- **`+`**：匹配前一个表达式一次或多次。
- **`\*`**：匹配前一个表达式零次或多次。
- **`?`**：匹配前一个表达式零次或一次。
- **`{n}`**：匹配前一个表达式恰好 n 次。
- **`[]`**：匹配括号内的任何一个字符。
- **`()`**：分组匹配，用来捕获子匹配。

### collections 模块的学习

`collections` 模块提供了许多有用的集合类，增强了 Python 内建数据结构的功能。

`Counter` 是一个字典的子类，用来计数某个元素出现的次数。它的键是元素，值是该元素出现的次数。

- **创建 `Counter`**：

	```
	from collections import Counter
	
	# 通过传入一个可迭代对象创建 Counter
	counter = Counter('abracadabra')
	print(counter)
	# 输出: Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
	```

- **从字典创建 `Counter`**：

	```
	counter = Counter({'a': 3, 'b': 1, 'c': 2})
	print(counter)
	# 输出: Counter({'a': 3, 'c': 2, 'b': 1})
	```

- **常见方法**：

	- **`most_common()`**: 返回出现频率最高的元素。

		```
		print(counter.most_common(2))  # 输出: [('a', 3), ('c', 2)]
		```

	- **`elements()`**: 返回按出现次数排序后的所有元素，可以重复返回。

		```
		print(list(counter.elements()))  # 输出: ['a', 'a', 'a', 'c', 'c', 'b']
		```

	- **`subtract()`**: 从当前 `Counter` 中减去另一个 `Counter` 或可迭代对象。

		```
		counter.subtract({'a': 1, 'b': 1})
		print(counter)  # 输出: Counter({'a': 2, 'c': 2, 'b': 0})
		```

### pyshark模块的学习

**主要功能**

`pyshark` 提供了一些强大的功能，主要包括：

1. **读取 pcap 文件**：分析现有的 `.pcap` 文件。
2. **实时捕获数据包**：实时捕获和分析网络流量。
3. **过滤和解析数据包**：应用过滤器以获取感兴趣的网络流量，支持解析各种协议（如 IP、TCP、UDP、HTTP 等）。

4. **从 pcap 文件读取数据包**

最基本的用法是加载 `.pcap` 文件并分析其中的数据包。

```
import pyshark

# 读取一个 pcap 文件
cap = pyshark.FileCapture('example.pcap')

# 遍历数据包并打印其摘要
for packet in cap:
    print(packet)
```

每个 `packet` 对象表示一个捕获的数据包，可以访问该数据包的不同字段，例如：

- `packet.ip`：表示 IP 层的信息。
- `packet.tcp`：表示 TCP 层的信息。
- `packet.udp`：表示 UDP 层的信息。

2. **实时捕获数据包**

你可以使用 `pyshark.LiveCapture` 来实时捕获网络数据包，并分析它们。你可以指定接口（如 `eth0`、`wlan0` 等）来捕获指定接口的流量，或者捕获所有接口的流量。

```
import pyshark

# 实时捕获网络流量
cap = pyshark.LiveCapture(interface='eth0')

# 捕获数据包并打印其摘要
for packet in cap.sniff_continuously(packet_count=5):
    print(packet)
```

在上述代码中，我们指定了网络接口 `eth0`，并捕获了 5 个数据包。`sniff_continuously()` 方法会持续捕获数据包，直到达到指定的数量。

3. **应用过滤器**

你可以使用 Wireshark 的显示过滤器来只捕获感兴趣的数据包。`pyshark` 允许你在读取数据包时应用这些过滤器，从而提高性能，减少不相关的数据包。

```
import pyshark

# 使用过滤器仅捕获 HTTP 请求
cap = pyshark.LiveCapture(interface='eth0', display_filter='http')

for packet in cap.sniff_continuously(packet_count=10):
    print(packet)
```

在上面的例子中，`display_filter='http'` 使得我们只捕获 HTTP 协议的数据包。这对于实时分析特定协议的流量非常有用。

4. **访问数据包字段**

每个数据包在捕获后都被解析成一个包含各层协议字段的对象。你可以访问这些字段来获取详细的信息。

获取 IP 层信息：

```
import pyshark

cap = pyshark.FileCapture('example.pcap')

for packet in cap:
    if 'IP' in packet:
        print(f"Source IP: {packet.ip.src}")
        print(f"Destination IP: {packet.ip.dst}")
```

 获取 TCP 层信息：

```
import pyshark

cap = pyshark.FileCapture('example.pcap')

for packet in cap:
    if 'TCP' in packet:
        print(f"Source Port: {packet.tcp.srcport}")
        print(f"Destination Port: {packet.tcp.dstport}")
```

获取 HTTP 层信息：

```
import pyshark

cap = pyshark.FileCapture('example.pcap')

for packet in cap:
    if 'HTTP' in packet:
        print(f"HTTP Host: {packet.http.host}")
        print(f"HTTP Method: {packet.http.request_method}")
```

5. 捕获特定的包或协议

`pyshark` 支持通过协议过滤器和其他条件来捕获特定类型的数据包。例如，你可以只捕获 TCP 数据包、特定端口的流量或 HTTP 请求。

```
import pyshark

# 捕获来自特定 IP 地址的数据包
cap = pyshark.LiveCapture(interface='eth0', bpf_filter='host 192.168.1.1')

for packet in cap.sniff_continuously(packet_count=5):
    print(packet)
```

`bpf_filter`（Berkley Packet Filter）用于指定捕获的数据包条件。它可以帮助你减少捕获的数据量，只捕获你需要的数据。

6. 读取和分析各种协议

`pyshark` 支持解析各种常见的网络协议，包括：

- **IP**：IPv4 和 IPv6。
- **TCP / UDP**：传输层协议。
- **HTTP**：用于 Web 通信的协议。
- **DNS**：域名系统。
- **ARP**：地址解析协议。
- **SSL/TLS**：安全套接层协议。

例如，如果你想检查某个数据包中的 DNS 查询，可以这样做：

```
import pyshark

cap = pyshark.FileCapture('example.pcap')

for packet in cap:
    if 'DNS' in packet:
        print(f"DNS Query: {packet.dns.qry_name}")
```

7. 数据包统计

你可以使用 `pyshark` 来对捕获的数据包进行统计。例如，计算不同协议的数据包数量：

```
import pyshark

cap = pyshark.FileCapture('example.pcap')

protocol_count = {}

for packet in cap:
    if 'IP' in packet:
        protocol = packet.highest_layer  # 获取数据包的最高层协议
        protocol_count[protocol] = protocol_count.get(protocol, 0) + 1

print(protocol_count)
```

8. 错误处理

在使用 `pyshark` 时，可能会遇到一些错误（例如文件损坏或网络接口无权限访问）。你可以通过捕获异常来处理这些错误。

```
import pyshark

try:
    cap = pyshark.FileCapture('example.pcap')
    for packet in cap:
        print(packet)
except Exception as e:
    print(f"Error occurred: {e}")
```

#### 实际案例（2025红明谷异常行为溯源）

```python
 from pyshark import FileCapture
 from base64 import b64decode
 from json import loads
 
 for packet in FileCapture(input_file="network_traffic.pcap", keep_packets=False):
 
     tcp = packet.tcp
     data = bytes.fromhex(tcp.payload.replace(":", "")).decode()
     data = b64decode(data).decode()
     data = loads(data)
     msg = data["msg"]
     type = data["type"]
     msg = b64decode(msg).decode().strip()
     print(msg)
```

```
for packet in FileCapture(input_file="network_traffic.pcap", keep_packets=False):
```

- **`FileCapture(input_file="network_traffic.pcap", keep_packets=False)`**: `FileCapture` 用于加载一个 `.pcap` 文件。`input_file` 参数指定了文件路径，`keep_packets=False` 参数告诉 `pyshark` 在处理完每个数据包后不保留它们的内存副本，这样可以减少内存使用，尤其是在处理大文件时。
- 这个 `for` 循环会逐个遍历 `.pcap` 文件中的每个数据包。

解析 TCP 数据包

```
tcp = packet.tcp
```

- `packet.tcp` 提取数据包中的 TCP 协议层。`pyshark` 会自动解析数据包并根据其协议层次进行分类。在这里，假设数据包包含 TCP 协议，因此你可以通过 `packet.tcp` 获取到与 TCP 协议相关的信息。

处理 TCP 数据包中的负载（Payload）

```
data = bytes.fromhex(tcp.payload.replace(":", "")).decode()
```

- **`tcp.payload`**: 每个 TCP 数据包都有一个 `payload` 字段，它包含数据包的实际负载。通常这部分数据是应用层传输的内容，可能是 HTTP 请求、DNS 响应、文件传输数据等。
- **`tcp.payload.replace(":", "")`**: TCP 的 `payload` 字段通常是以十六进制表示的，并且每两个字符之间由冒号分隔（例如 `00:1f:2a:3b`）。这里使用 `replace(":", "")` 去除所有冒号，得到一个纯粹的十六进制字符串。
- **`bytes.fromhex(...)`**: 这行代码将十六进制字符串转换为字节对象。例如，`"00:1f:2a"` 会被转换为 `b'\x00\x1f\x2a'`。
- **`.decode()`**: 将字节对象解码为字符串。假设 `payload` 中的内容是 UTF-8 编码的文本数据，所以我们可以直接将字节对象解码为文本。

解码 Base64 数据

```
data = b64decode(data).decode()
```

- **`b64decode(data)`**: 上一步解码得到的 `data` 是经过 Base64 编码的字符串，这里通过 `b64decode` 对其进行解码，恢复出原始的数据。Base64 是一种常见的编码方式，用于将二进制数据（如图像、文件或消息）转换为 ASCII 字符串，以便在网络中传输。
- **`.decode()`**: 解码得到的 Base64 数据依然是字节流，通过 `.decode()` 将其转换为字符串。

解析 JSON 数据

```
data = loads(data)
```

- **`loads(data)`**: 假设解码后的数据是 JSON 格式的字符串（例如，包含键值对的消息），`loads` 方法会将其解析为一个 Python 字典。在解析之后，你可以通过字典的键来访问具体的信息。

 提取消息和类型

```
msg = data["msg"]
type = data["type"]
```

- **`data["msg"]`**: 在解析的 JSON 数据中，提取 `"msg"` 字段，这可能是一个消息内容，通常是数据传输的核心信息。
- **`data["type"]`**: 同样提取 `"type"` 字段，这可能代表消息的类型或某种标识。

 进一步解码消息

```
msg = b64decode(msg).decode().strip()
```

- **`b64decode(msg)`**: 假设 `msg` 也是 Base64 编码的字符串，这一步将它解码回原始数据。
- **`.decode()`**: 将解码后的字节对象转换为字符串。
- **`.strip()`**: 去除字符串两端的空白字符（例如空格、换行符等）。

