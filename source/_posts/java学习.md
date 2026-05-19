---
title: java学习
tags:
  - java
categories:
  - 语言学习
swiper_index: 0
description: 个人初学java时的一些总结，不喜勿喷
abbrlink: c2adefc4
date: 2025-05-19 12:26:11
---

### idea程序多开

![image-20250530215419088](posts/c2adefc4/images/ideaMROI.webp)

![image-20250530215703610](posts/c2adefc4/images/ideaMROI_2.webp)

### 一个java程序的编写

> 模块->软件包->类

java主要是利用函数调用进行程序执行，主函数调用其他函数(类似于C++)

![image-20250402105354745](posts/c2adefc4/images/function.webp)

```java
public class functionBasic {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int c = sum(a,b);
        System.out.println(c);
    }
    public static int sum(int a, int b){
        return a+b;
    }
}
```

### java类似C++的方法重载

![image-20250402144705222](posts/c2adefc4/images/repeatFunction.webp)

重载的意义在于使一个函数实现多种功能以及方便记忆

```java
public class chongzai {
    public static void main(String[] args) {
        System.out.println("这是重载");
        fire();
        fire(99);
        fire(100,99);
    }
    //定义一个方法，发射导弹
    public static void fire(){
        System.out.println("发射导弹");
    }
    //定义导弹的重载函数
    public static void fire(int a){
        System.out.println("发射导弹"+a+"个");
    }
    //定义导弹的重载函数，位置更加精确
    public static void fire(int a,int b){
        System.out.println("坐标x:"+a+",y:"+b);
    }
}
```

### Java的类型转换（自动与强制）

#### 自动类型转换

![image-20250402150106025](posts/c2adefc4/images/typeChange.webp)

### 强制类型转换

![image-20250402150241186](posts/c2adefc4/images/typeChangeForce.webp)

### 表达式的自动类型提升

![image-20250402150843567](posts/c2adefc4/images/autoTypeChange.webp)

### Java的输入和输出

![image-20250402151755454](posts/c2adefc4/images/scannerPrintln.webp)

![image-20250402152452385](posts/c2adefc4/images/scannerStep.webp)

```java
public class testScanner {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个整数：");
        int a = sc.nextInt();
        System.out.println("您输入的整数是：" + a);
        System.out.println("您的名字是：");
        String name = sc.next();
        System.out.println("您的名字是：" + name);
    }
}
```

### java运算符和C++的区别

| 运算符类型     | C++ 特性                   | Java 特性                        |
| :------------- | :------------------------- | :------------------------------- |
| **赋值运算符** | 支持重载                   | 不支持重载，仅基本类型和引用赋值 |
| **三元运算符** | 允许隐式类型转换           | 严格类型兼容                     |
| **逻辑运算符** | 接受非布尔类型（隐式转换） | 必须为 `boolean` 类型            |

### java的boolean和C++的bool

`boolean` 在 Java 中是一个关键字，它定义了一个逻辑值类型，用来表示逻辑状态。与其他原始数据类型不同，`boolean` 只有两个固定的值：`true` 和 `false`，用于逻辑判断、条件判断等。

boolean和C++的bool不同的是boolean不允许与其他类型进行隐式转换，也就是boolean只能等于true或者false，不能等于1或0

### Java分支、循环结构和C++的区别

| 特性                | C++                               | Java                     |
| :------------------ | :-------------------------------- | :----------------------- |
| **`if` 条件类型**   | 允许隐式转换为 `bool`（如 `int`） | 必须为 `boolean` 类型    |
| **`switch` 类型**   | 整型、枚举                        | 整型、`String`、枚举等   |
| **`case` 值**       | 常量表达式                        | 编译时常量               |
| **`for-each` 循环** | 基于范围的 `for`                  | 需实现 `Iterable` 接口   |
| **`goto`**          | 支持                              | 不支持                   |
| **标签跳转**        | 支持（少用）                      | 支持（明确用于多层循环） |

### java数组和C++区别

| **特性**         | **Java 数组**              | **C++ 数组**                                     |
| :--------------- | :------------------------- | :----------------------------------------------- |
| **内存分配**     | 堆内存，GC 管理            | 栈或堆，手动管理堆内存                           |
| **类型安全**     | 严格类型检查               | 弱类型检查（可通过指针绕过）                     |
| **多维数组**     | 数组的数组（支持不规则）   | 连续内存块（固定维度）                           |
| **长度获取**     | `arr.length`               | 需手动维护或计算（栈数组用 `sizeof`）            |
| **越界检查**     | 抛出异常                   | 无检查，导致未定义行为                           |
| **动态调整大小** | 不可变，需借助集合类       | 堆数组可手动重新分配                             |
| **语法初始化**   | 支持直接初始化 `{1, 2, 3}` | 栈数组支持 `{}` 初始化（C++11+），堆数组需 `new` |

语法差异：

- **声明与初始化**：

	- **Java**：

		```java
		int[] arr1 = new int[3];     // 声明并分配空间
		int[] arr2 = {1, 2, 3};      // 直接初始化
		```

	- **C++**：

		```C++
		int arr1[3];                // 栈数组声明（未初始化）
		int arr2[] = {1, 2, 3};     // 栈数组直接初始化（C++11+）
		int* arr3 = new int[3];     // 堆数组动态分配
		```

### java的类和对象

#### 创建类和对象的语法和C++一样

```java
package CreatClass;

public class LearnCreat {
    public static void main(String[] args) {
        // 创建CreatClass类
        class CreatClass {
            private String name;
            private int age;
            private String sex;
        }
        //创建对象
        CreatClass creatClass = new CreatClass();
        creatClass.name="张三";
        creatClass.age=18;
        creatClass.sex="男";
        System.out.println(creatClass.name);
        System.out.println(creatClass.age);
        System.out.println(creatClass.sex);
    }
}
```

![image-20250412132223441](posts/c2adefc4/images/object.webp)

java的构造器就是C++的类函数（方法）

**注意：java的有参构造器创建了。默认的无参构造器就没有了，如果想用有参构造器，就必须自己写一个出来**

java的this和C++的也是一样

#### this

回顾this的作用：解决对象属性和类函数的参数名冲突的问题

```java
package yyssh.LearnClass;

public class testItem {
    public static void main(String[] args) {
        itemDemo s1 = new itemDemo("yanyuan", 18);
        s1.print();
    }
}

```

```java
package yyssh.LearnClass;

public class itemDemo
{
    String name;
    int age;
    public itemDemo(){

    }
    public itemDemo(String name,int age){
        this.name = name;	//如果这里不用this，那前面的属性name就会和参数name冲突
        this.age = age;
    }
    public void print(){
        System.out.println("姓名："+name+"年龄："+age);
    }
}
```

java的封装和C++一样，都是先赋值类函数，再取值类函数

#### static

java的static和C++一样，下面回顾一样static，static是属于类的公共成员变量，所有的对象都可以访问，作用是统计公共数据的变化等等

java:工具类私有化构造器，使用静态函数（方法），方便调用

![image-20250412154411085](posts/c2adefc4/images/static.webp)

```java
package yyssh.LearnStatic;

public class staticDemo {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.SetStudent("yanyuan", 18);
        s1.print();
        Student s2 = new Student();
        s2.SetStudent("chenzhuang", 19);
        Student.printStudentCount();	//公共成员变量直接使用类调用（变量也可以，但是不建议）
    }
}
```

```java
package yyssh.LearnStatic;

public class Student {
    private String name;
    private int age;
    private static int StudentCount;
    public Student(){
        StudentCount++;
    }
    public void SetStudent(String name,int age){
        this.name=name;
        this.age=age;
    }
    public int GetStudent(){
        return this.age;
    }
    public String GetName(){
        return this.name;
    }
    public void print(){
        System.out.println("姓名："+this.name+"年龄："+this.age);
    }
    public static void printStudentCount(){
        System.out.println("学生人数："+StudentCount);
    }
}
```

#### 继承

大致含义和C++的一样，都是只能继承父类的非私有成员和方法

java语法：

```java
public class A extends B	//A是子类，B是父类
```

继承权限

> private<缺省<protected<public
>
> private 本类 
>
> 缺省 本类、同一个包中的类
>
> protected 本类、同一个包中的类、子孙类中
>
> public 任意位置

java继承特点：单继承，不支持多继承（不能有多个父类）、支持多层继承（可以有爷类）

子类重写父类函数，名称、形参列表必须一样，访问权限要大于父类权限，私有和静态不能被重写

![image-20250412162444789](posts/c2adefc4/images/sonSupper.webp)

> `super()`:调用父类构造器
>
> super和this构造器都只能放在函数第一行，两者不能同时出现

#### 多态

java的多态，要在重写函数的上一行加上@Override

![image-20250412164138165](posts/c2adefc4/images/polymorphic.webp)

>类方法：编译看父类，运行看子类
>
>成员变量：编译、运行都看父类

**多态下的一个问题，怎么调用子类独有的方法？**

这个子类特有方法必须是重写父类的方法，才可以使用自动类型转换调用，如果是子类完全特有的，则只能强制类型转换

![image-20250412165552220](posts/c2adefc4/images/classForceExchange.webp)

```java
if (a instanceof wolf){
    wolf w = (wolf)a;
    w.run();
}
else if {
    rabbit r=(rabbit)a;
    r.run();
}
```

#### final

![image-20250412171637074](posts/c2adefc4/images/finalLearn.webp)

```java
final int [] arr1={11,22,33};
arr1[1]=99;	//这就是final修饰的变量地址不能改变，但是指向的对象内容是可用改变的
```

##### java的常量

![image-20250412172352819](posts/c2adefc4/images/staticFinal.webp)

#### 设计模式

![image-20250412172745541](posts/c2adefc4/images/designMoudel.webp)

#### 单例设计模式

饿汉式单例：

![image-20250412173924522](posts/c2adefc4/images/signalMoudelHungry.webp)

懒汉式单例：

![image-20250412174207184](posts/c2adefc4/images/signalMoudelLazy.webp)

#### 枚举类

![image-20250412204324418](posts/c2adefc4/images/enumClass.webp)



![image-20250412205158595](posts/c2adefc4/images/enumClassFeature.webp)

枚举类构造一个枚举对象也是单例类，因为他是常量，只能进行一次赋值操作

#### 抽象类

抽象方法的特点：

+ 只能在抽象类中
+ 只有方法声明，没有方法体
+ **子类必须重写**：如果一个类继承了含有抽象方法的抽象类，子类必须提供该抽象方法的实现，除非子类本身也被声明为抽象类。

![image-20250412213546010](posts/c2adefc4/images/abstractClass.webp)

![image-20250412214302944](posts/c2adefc4/images/abstractClassFeature.webp)

#### 抽象类设计模板

![image-20250412221849571](posts/c2adefc4/images/abstractClassSignMoudel.webp)

```java
package yyssh.LearnAbstractDemo;

public class testAbstractDemo {
    public static void main(String[] args) {
        People s1 = new Student();
        s1.write();
        People t1 =new Teacher();
        t1.write();
    }
}

```

```java
package yyssh.LearnAbstractDemo;

public abstract class People{
    public final void  write(){
        System.out.println("我是一个人");
        writemian();
        System.out.println("我生活在地球");
        System.out.println("-------------------------------------");
    }
    public abstract void writemian();
}

```

```java
package yyssh.LearnAbstractDemo;

public class Teacher extends People{
    @Override
    public void writemian() {
        System.out.println("我是一个老师");
    }
}
```

```java
package yyssh.LearnAbstractDemo;

public class Student extends People{
    @Override
    public void writemian() {
        System.out.println("我是一个学生");
    }
}
```

#### 接口

![image-20250412231127033](posts/c2adefc4/images/interface.webp)

java接口的作用，就类似于C++可以继承多个父类

![image-20250413164004611](posts/c2adefc4/images/interfaceFeature.webp)

![image-20250413164128523](posts/c2adefc4/images/interfaceCare.webp)

#### 代码块

![image-20250413173229750](posts/c2adefc4/images/codeChunk.webp)

#### 内部类

![image-20250413213704814](posts/c2adefc4/images/interClass.webp)

##### 成员内部类

![image-20250413214037804](posts/c2adefc4/images/interClassMember.webp)

##### 静态内部类

不能访问外部类的成员变量

![image-20250413214222416](posts/c2adefc4/images/interClassStatic.webp)

##### 局部内部类

![image-20250413214321344](posts/c2adefc4/images/interClassLocality.webp)

##### 匿名内部类

![image-20250413222523638](posts/c2adefc4/images/interClassAnonymity.webp)

开发方式：

![image-20250413222735742](posts/c2adefc4/images/interClassAnonymityDevelop.webp)

使用场景：

```java
package yyssh.innerClass;

import java.util.Comparator;
import java.util.Arrays;

public class testSort {
    public static void main(String[] args) {
        Student [] students = new Student[5];
        students[0] = new Student(18,"yanyuan","男");
        students[1] = new Student(19,"chenzhuang","男");
        students[2] = new Student(20,"zhanghao","男");
        students[3] = new Student(21,"zhangjie","男");
        students[4] = new Student(22,"xuziyang","男");
        Arrays.sort(students,new Comparator<Student>(){
            @Override
            public int compare(Student o1, Student o2) {
                return o1.getAge() - o2.getAge();// 升序
//                return o2.getAge() - o1.getAge();// 降序
            }
        });
        for (int i=0; i<5; i++) {
            Student s = students[i];
            System.out.println(s);
        }
    }
}
```

```java
package yyssh.innerClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class Student {
    //设置私有的年龄、姓名、性别
    private int age;
    private String name;
    private String sex;


}
```

#### Lambda表达式（函数式编程）

![image-20250415113836816](posts/c2adefc4/images/LambdaFunction.webp)

```java
package yyssh.learnLambda;

public class lambdaDemo {
    public static void main(String[] args) {
        //正常的匿名内部类
        Leap l = new Leap(){
            @Override
            public void leaping() {
                System.out.println("leaping");
            }
        };
        l.leaping();
        //使用函数式编程lambda的匿名内部类
        Swim s = ()->{
            System.out.println("swimming");
        };
        s.swimming();
    }
}

//函数式接口：只能包含一个抽象方法
@FunctionalInterface
interface Swim {
    void swimming();
}

abstract class Leap {
    public abstract void leaping();
}
```

![image-20250415170237428](posts/c2adefc4/images/lambdaOmitRule.webp)

```java
package yyssh.learnLambda;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Arrays;
import java.util.Comparator;

public class lambdaOmit {
    public static void main(String[] args) {
        sort();
    }
    public static void sort(){
        Student [] students = new Student[5];
        students[0] = new Student(18,"yanyuan","男");
        students[1] = new Student(19,"chenzhuang","男");
        students[2] = new Student(20,"zhanghao","男");
        students[3] = new Student(21,"zhangjie","男");
        students[4] = new Student(22,"xuziyang","男");
//      正常原始写法
//        Arrays.sort(students,new Comparator<Student>(){
//            @Override
//            public int compare(Student o1, Student o2) {
//                return o1.getAge() - o2.getAge();// 升序
//            }
//        });
        //省略写法
        //因为Comparator接口只有一个抽象方法，所以可以省略接口名
        Arrays.sort(students,(Student o1, Student o2)-> {
            return o1.getAge() - o2.getAge();// 升序
        });
        //省略写法，参数类型可以全部不写
        Arrays.sort(students,( o1,  o2)-> {
            return o1.getAge() - o2.getAge();// 升序
        });
        //省略写法，如果只有一个参数，可以省略参数圆括号，多个参数，不可以省略参数圆括号，这里不能省略
        //省略写法，如果方法体只有一行代码，可以省略方法体的大括号和分号，如果这行代码是return，可以省略return
        Arrays.sort(students,( o1,  o2)-> o1.getAge() - o2.getAge());
        for (int i=0; i<5; i++) {
            Student s = students[i];
            System.out.println(s);
        }
    }
}

@AllArgsConstructor
@Data
@NoArgsConstructor
class Student {
    //设置私有的年龄、姓名、性别
    private int age;
    private String name;
    private String sex;
}
```

##### 静态方法引用

![image-20250415213706281](posts/c2adefc4/images/lambdaStatic.webp)

这是正常方法

```java
Arrays.sort(students,( o1,  o2)-> {
		return o1.getAge() - o2.getAge();// 升序
});
```

使用静态方法

```java
package yyssh.learnLambda;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Arrays;
import java.util.Comparator;

public class lambdaOmit {
    public static void main(String[] args) {
        sort();
    }
    public static void sort(){
        Student [] students = new Student[5];
        students[0] = new Student(18,"yanyuan","男");
        students[1] = new Student(19,"chenzhuang","男");
        students[2] = new Student(20,"zhanghao","男");
        students[3] = new Student(21,"zhangjie","男");
        students[4] = new Student(22,"xuziyang","男");
//      正常原始写法
//        Arrays.sort(students,new Comparator<Student>(){
//            @Override
//            public int compare(Student o1, Student o2) {
//                return o1.getAge() - o2.getAge();// 升序
//            }
//        });
        //省略写法
        //因为Comparator接口只有一个抽象方法，所以可以省略接口名
        Arrays.sort(students,(Student o1, Student o2)-> {
            return o1.getAge() - o2.getAge();// 升序
        });
        //省略写法，参数类型可以全部不写
        Arrays.sort(students,( o1,  o2)-> {
            return o1.getAge() - o2.getAge();// 升序
        });
        //省略写法，如果只有一个参数，可以省略参数圆括号，多个参数，不可以省略参数圆括号，这里不能省略
        //省略写法，如果方法体只有一行代码，可以省略方法体的大括号和分号，如果这行代码是return，可以省略return
        Arrays.sort(students,( o1,  o2)-> o1.getAge() - o2.getAge());
        //静态方法引用
        Arrays.sort(students,Student::compare);
        for (int i=0; i<5; i++) {
            Student s = students[i];
            System.out.println(s);
        }
    }
}

@AllArgsConstructor
@Data
@NoArgsConstructor
class Student {
    //设置私有的年龄、姓名、性别
    private int age;
    private String name;
    private String sex;
    public static int compare(Student o1, Student o2) {
        return o1.getAge() - o2.getAge();
    }
}
```

##### 实例方法引用

![image-20250415213821803](posts/c2adefc4/images/lambdaExample.webp)

```java
//实例方法引用
Student t = new Student();
Arrays.sort(students,( o1,  o2)->t.compareHeight(o1,o2));
Arrays.sort(students,t::compareHeight);
```

##### 特定类型引用

![image-20250415213917736](posts/c2adefc4/images/lambdaSpecific.webp)

这里的特定类型是指lambda 表达式所实现的函数式接口的具体类型。

```java
package yyssh.lambdaOmitDemo;

import java.util.Arrays;
import java.util.Comparator;

public class Demo {
    public static void main(String[] args) {
        String [] names = {"Alies","ailiy","Bob","曹操","张飞","CaoCao"};
        //将数组进行排序
//        Arrays.sort(names);
//        System.out.println(Arrays.toString(names));
        //不区分首字母大小写，对数组进行排序
//        Arrays.sort(names, ( o1,  o2)-> o1.compareToIgnoreCase(o2));
        //特定类型引用
        Arrays.sort(names, String::compareToIgnoreCase);
        System.out.println(Arrays.toString(names));
    }
}
```

##### 构造器引用

![image-20250415214056396](posts/c2adefc4/images/lambdaFunctionQuote.webp)

```java
package yyssh.lambdaOmitDemo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class Demo2 {
    public static void main(String[] args) {
//        CarFactory cf =  new CarFactory() {
//            @Override
//            public Car getCar(String brand) {
//                return new Car(brand);
//            }
//        };
//        CarFactory cf =  brand-> new Car(brand);
        //构造器引用
        CarFactory cf =  Car::new;
        Car c1 = cf.getCar("Benz");
        System.out.println(c1.getBrand());
    }
}

@FunctionalInterface
interface CarFactory {
    Car getCar(String brand);
}

@AllArgsConstructor
@Data
@NoArgsConstructor
class Car {
    private String brand;
}
```

### 常用的模块与框架

#### Lombok

##### 检查模块依赖

- 打开 IntelliJ IDEA，进入 File > Project Structure > Modules，确认每个模块的 Dependencies 选项卡中包含 Lombok。
- 如果缺少，可以手动添加或确保 Maven/Gradle 已同步。

##### 启用注解处理

- 进入 Settings > Build, Execution, Deployment > Compiler > Annotation Processors，勾选 "Enable annotation processing" 和 "Obtain processors from project classpath"。
- 这确保 Lombok 的注解处理器能被正确识别。

#####  `@AllArgsConstructor`

- **作用**：生成一个包含所有字段的构造函数（即所有成员变量的初始化构造函数）。
- 引用：`import lombok.AllArgsConstructor`

#####  `@Data`

- **作用**：`@Data` 是一个组合注解，它包含了以下几个 Lombok 注解的功能：

	- `@Getter`：为所有字段生成 getter 方法。
	- `@Setter`：为所有非 `final` 字段生成 setter 方法。
	- `@ToString`：生成 `toString()` 方法。
	- `@EqualsAndHashCode`：生成 `equals()` 和 `hashCode()` 方法。
	- `@RequiredArgsConstructor`：生成一个带有 `final` 字段的构造函数（或者是 `@NonNull` 注解的字段）。

	这个注解的作用是为类自动生成常见的getter/setter、`toString`、`equals`、`hashCode` 等方法，减少了很多样板代码。

- 引用：`import lombok.Data`

#####  `@NoArgsConstructor`

- **作用**：生成一个无参构造函数。
- 引用：`import lombok.NoArgsConstructor`

#### 框架解释

总的来说一个jar包就是一个java框架

![image-20250527123411020](posts/c2adefc4/images/FrameworkExplain.webp)

##### commons-io

导入框架的步骤

1. 在项目中创建一个文件夹lib
2. 将jar包框架复制到lib文件夹中
3. 在jar包右键，选择Add as Library

![image-20250527123919865](posts/c2adefc4/images/FrameworkCommons_io.webp)

```java
package yyssh.learnCommonsIO;

import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;

public class LearnCommons {
    public static void main(String[] args) {
        try {
            FileUtils.copyFile(new File("FileAndIO/src/yyssh/learnCommonsIO/test.txt"),new File("C:/Users/肥猪/Desktop/test.txt"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

### java类和对象与C++的区别

| **特性**     | **Java**                             | **C++**                |
| :----------- | :----------------------------------- | :--------------------- |
| **类定义**   | 所有代码必须在类中                   | 允许全局函数和类外代码 |
| **对象存储** | 堆内存（GC 管理）                    | 栈或堆（手动管理）     |
| **继承**     | 单继承 + 接口多继承                  | 支持多重继承           |
| **多态**     | 所有方法默认是虚函数（除非 `final`） | 需显式声明 `virtual`   |
| **内存管理** | 自动垃圾回收                         | 手动 `new`/`delete`    |
| **访问控制** | 支持包级私有                         | 无包级私有             |
| **静态成员** | 类内直接初始化                       | 需类外初始化           |

### Java的API学习.

#### String

![image-20250416191200852](posts/c2adefc4/images/creatString.webp)

String提供的常用方法

![image-20250416191317337](posts/c2adefc4/images/StringFunction.webp)

#### ArrayList

![image-20250416192538903](posts/c2adefc4/images/creatArrayList.webp)

#### LocalDateTime

![image-20250531233826006](posts/c2adefc4/images/CreateLocalDateTime.webp)

![image-20250531233910167](posts/c2adefc4/images/LocalDateTimeFunction.webp)

#### StirngBuilder

使用StringBuilder拼接字符串之后，还要把StringBuilder对象转回string

![image-20250531234150900](posts/c2adefc4/images/StringBuilder.webp)

#### BigDecimal

![image-20250531234314601](posts/c2adefc4/images/BigDecimal.webp)

### Java中的API和C++、python有什么异同

| **特性**         | **Java**             | **C++**                            | **Python**               |
| :--------------- | :------------------- | :--------------------------------- | :----------------------- |
| **内存管理**     | 自动垃圾回收         | 手动管理（`new`/`delete`）         | 自动垃圾回收             |
| **类型系统**     | 静态类型，强类型检查 | 静态类型，弱类型检查（可强制转换） | 动态类型，运行时检查     |
| **API 调用方式** | 通过类方法、接口     | 通过函数、类方法、运算符重载       | 通过函数、模块、动态类型 |
| **跨平台性**     | 字节码（JVM）        | 需重新编译为平台特定机器码         | 解释执行（如 CPython）   |
| **代码复杂度**   | 严格的面向对象结构   | 支持多范式（面向对象、过程式）     | 灵活，支持函数式编程     |

#### 典型应用场景

1. **Java**：适合企业级应用（如 Spring 框架的 RESTful API）、Android 开发，依赖成熟的生态系统（如 Maven、JUnit）916。
2. **C++**：适用于高性能计算（如游戏引擎、操作系统底层 API）、资源敏感场景（如嵌入式系统）510。
3. **Python**：快速原型开发（如 Flask/Django 的 Web API）、数据科学（如 NumPy、Pandas），依赖简洁语法和丰富库支持313。

### Java的异常

![image-20250416195452970](posts/c2adefc4/images/throwabel.webp)

![image-20250416195624436](posts/c2adefc4/images/exception.webp)

使用快捷键(`alt+回车`)可以快速将异常抛出，异常统称exception和python是一样的，可以用这个关键字接收所有异常，java异常是层级抛出的，在最初调用的main函数进行异常处理

```java
package yyssh.exceptionDemo;

public class exceptionDemo1 {
    public static void main(String[] args) {
        try {
            System.out.println(test(15,0));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("程序异常");
            e.printStackTrace();//打印异常信息
        }
        System.out.println("程序结束");
        System.exit(0);
    }
    public static int test(int a,int b) throws Exception {
        int result =a/b;
        if (b==0){
            throw new Exception("除数不能为0");
        }
        return result;
    }
}
```

![image-20250416205943086](posts/c2adefc4/images/selfDefineException.webp)

尽量定义运行时异常，编译时异常正在被全面放弃，因为编译时异常需要层级上抛需要每层进行处理或者上抛，资源消耗大

#### 异常的解决方案

```java
package yyssh.exceptionDemo2;

import java.util.Scanner;

public class exceptionDemo2 {
    public static void main(String[] args) {
        System.out.println("程序开始");
        // 抓捕用户输入错误的异常，让用户一直输入价格，直到输入正确的价格为止
        while (true) {
            try {
                UserInputPrice();
                System.out.println("用户输入成功！！！");
                break;
            } catch (Exception e) {
                System.out.println("你的输入有问题，请输入正常的价格");
            }
        }
        System.out.println("程序结束");
    }
    //定义一个方法，让用户输入商品的价格、
    public static double UserInputPrice() {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入商品的价格：");
        double price = sc.nextDouble();
        return price;
    }
}
```



### java的异常和C++、python有什么异同

| **特性**     | **Java**                         | **C++**                    | **Python**                         |
| :----------- | :------------------------------- | :------------------------- | :--------------------------------- |
| **异常传播** | 检查型异常必须处理或声明         | 异常可跨函数传播，无需声明 | 异常自动传播，无需声明             |
| **性能开销** | 较高（因堆栈跟踪生成）           | 低（无运行时类型检查）     | 较高（动态类型和堆栈跟踪）         |
| **错误恢复** | 支持完整的异常链（`cause` 属性） | 仅支持基本异常信息         | 支持异常链（`raise ... from ...`） |

### java的泛型

泛型只在编译阶段，运行阶段就把泛型擦除了

![image-20250417120550466](posts/c2adefc4/images/generics.webp)

自我理解：泛型就是规定了一个集合只能输入或输出一种类型（因为java是强类型）

```java
package yyssh.knowGenerics;

import java.util.ArrayList;

public class knowGenerics {
    public static void main(String[] args) {
        //如果不加泛型，arraylist集合可以添加任意类型的数据
        ArrayList list = new ArrayList();
        list.add(1);
        list.add("yyssh");
        list.add(true);
        list.add(new Object());
        for (Object o : list) {
            System.out.println(o);
        }
        //加string泛型，只能添加String类型，就像厕所打了标签之后，男生只能进男厕所
        ArrayList<String> StringList = new ArrayList<>();
        StringList.add("yyssh");
        for (String s : StringList) {
            System.out.println(s);
        }
    }
}
```

`shift+f6`一键式改名

#### 泛型类和接口

![image-20250417205752890](posts/c2adefc4/images/classGenerics.webp)

![image-20250417205935809](posts/c2adefc4/images/interfaceGenerics.webp)

#### 泛型的方法、通配符和上下限

![image-20250420113150153](posts/c2adefc4/images/genericsEverything.webp)

#### 泛型的包装类

Java为了灌输它的万物皆对象的理念，只允许泛型传入的数据是对象，而不能传入基本数据类型，所以包装类也就应运而生，包装类就是将基本数据类型转换为对象

![](posts/c2adefc4/images/genericsPack.webp)

其实第二种方法也不是经常使用可以直接将两者进行转换看，因为java内置了一个自动装箱（自动把int转换为Integer）和自动拆箱（自动把Integer转换为int)的功能

但是这种方法没有被程序员认可，所以sun公司提供了包装类的两个好用的API

![image-20250420121236023](posts/c2adefc4/images/genericsPackAPI.webp)

```java
package yyssh.genericsPack;

import java.util.ArrayList;

public class PackClass {
    public static void main(String[] args) {
        ArrayList <Integer> list = new ArrayList<>();
        list.add(123);
        list.add(456);
        for (Integer integer : list) {
            System.out.println(integer);
        }
        Integer i =123; //自动装箱
        System.out.println(i);
        int j=i;  //自动拆箱
        System.out.println(j);
        System.out.println(i==j);   //Integer类的范围是-128~127，所以i==j为true，如果超出了这个范围，Integer会new一个新对象，则会返回false
        String name = i.toString(); //Integer转String,其实没什么屌用，我用数据类型加“”也可以实现
        System.out.println(name);
        String is = i+"";
        System.out.println(is);
        //查看is的数据类型
        System.out.println(is.getClass());  //返回String
        //但是第二个方法很有用，可以将String转成int
        String a = "123";
        String c = "456";
        Integer b = Integer.parseInt(a);    //这两种方法都可以将String转成int
        Integer d = Integer.valueOf(c);
        System.out.println(b);
        System.out.println(b.getClass());
        System.out.println(d);
        System.out.println(d.getClass());
    }
}
```

### java的泛型和C++、python有什么异同

| **特性**           | **Java 泛型**          | **C++ 模板**                  | **Python 类型系统**                  |
| :----------------- | :--------------------- | :---------------------------- | :----------------------------------- |
| **类型检查时机**   | 编译时                 | 编译时                        | 运行时（类型提示为静态检查工具服务） |
| **实现机制**       | 类型擦除               | 代码实例化                    | 动态类型 + 类型提示                  |
| **支持基本类型**   | 需装箱（如 `Integer`） | 直接支持（如 `int`）          | 无泛型，直接支持所有类型             |
| **类型约束**       | 显式边界（`extends`）  | 隐式约束（操作符/方法存在性） | 鸭子类型                             |
| **代码复用灵活性** | 高（类型安全）         | 极高（支持元编程）            | 极高（动态特性）                     |

### java的集合

#### collection集合的特点

![image-20250421151949661](posts/c2adefc4/images/collection.webp)

#### collection的工具类

![image-20250525191540539](posts/c2adefc4/images/collectionToolClass.webp)

#### collection常用方法

![image-20250421154738910](posts/c2adefc4/images/collectionFunction.webp)

#### collection的遍历方法：迭代器遍历

![image-20250421163757699](posts/c2adefc4/images/collectionIterator.webp)

#### collection的遍历方法：for循环遍历

![image-20250421165236492](posts/c2adefc4/images/collectionFor.webp)

#### collection的遍历方法：lambda遍历

![image-20250421165400864](posts/c2adefc4/images/collectionLambda.webp)

```java
package yyssh.knowCollection;

import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;
import java.util.function.Consumer;

public class CollectionDemo1 {
    public static void main(String[] args) {
        //使用List接口实例化一个集合
        //List接口是Collection接口的子接口，所以List接口也可以实例化
        List<String> list =new ArrayList<>();
        list.add("123");
        list.add("yyssh");
        list.add("yanyuan");
        list.add("chenzhuang");
        list.add("张浩");

        //使用集合迭代器来进行遍历
        Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()){
            String s = iterator.next();
            System.out.println(s);
        }
        System.out.println("-------------------------------------------------------");

        //使用for循环遍历
        for (String s : list) {
            System.out.println(s);
        }
        System.out.println("-------------------------------------------------------");

        //使用lambda遍历
        //标准的匿名内部类
//        list.forEach(new Consumer<String>() {
//            @Override
//            public void accept(String s) {
//                System.out.println(s);
//            }
//        });
        list.forEach(s-> System.out.println(s));    //这样其实已经很nb的lambda简化了
        System.out.println("--------------------------------------------------------");
        list.forEach(System.out::println);  //实例方法引用
        System.out.println(System.out.getClass());
    }
}
```

#### java集合的三种遍历循环，有什么区别，同时又会造成什么问题？

在说这三种循环的区别时，先谈一下这三种循环会造成什么问题？

+  遍历集合的同时又存在增删集合元素的行为时可能出现业务异常，这种现象被称为并发异常问题

异常产生的原因，因为在进行正序遍历时，删除一位，指针往前一位，集合补齐一位（说白了就是集合的长度是一直变化的），就会导致集合补齐的这一位逃过检查，从而造成删除不完全

```java
import java.util.ArrayList;
import java.util.List;

public class circleDemo1 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("金龙");
        list.add("木龙");
        list.add("水龙");
        list.add("火龙");
        list.add("土龙");
        list.add("龙虾");
        list.add("龙王");
        list.add("男人");
        list.add("女人");
        for (int i=0;i< list.size();i++) {
            String name = list.get(i);
            if (name.contains("龙")){
                list.remove(i);
            }
        }
        System.out.println(list);   //输出[木龙, 火龙, 龙虾, 男人, 女人]
    }
}
```

可以看到含有龙的字样并没有被删除完全，这里我们可以采取两种解决方案

+ 方案一：

	+ 将for循环，进行i--，因为每删除一个就会漏掉一个，那我就回退一个就可以解决这个问题

		```java
		for (int i=0;i< list.size();i++) {
		    String name = list.get(i);
		    if (name.contains("龙")){
		        list.remove(i);
		        i--;
		    }
		}
		```

+ 方案二：

	+ 使用倒序循环，将不存在漏掉情况

		```java
		for (int i= list.size()-1;i>=0;i--) {
		    String name = list.get(i);
		    if (name.contains("龙")){
		        list.remove(i);
		    }
		}
		```

这前面两个例子是为了说明在有索引的情况下是可以采用上面方案解决并发异常问题的，但是如果没有索引的话，例如Set集合，就无法采用上面的方案进行删除，只能采用迭代器自带的删除功能进行删除

```java
for (String name : list){
    System.out.println(name);
}
```

```java
//        list.forEach( name-> System.out.println(name));   lambda简化
        list.forEach(System.out::println);  //实例方法引用
```

都无法进行索引，也无法进行并发操作，只有迭代器可以

```java
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()){
    String name = iterator.next();
    if (name.contains("龙")){
        iterator.remove();
    }
}
System.out.println(list);
```

![image-20250421214202085](posts/c2adefc4/images/collectionCircleSandD.webp)

#### ArrayList底层原理

ArrayList的扩容原理是基于数组存储数据的，查询数据效率高，但是增减效率慢，第一次扩容10个长度，以后每一次扩容1.5倍

#### LinkedList底层原理

LinkedLIst底层是基于双链表存储数据的，查询效率慢，无论查询哪个数据都要从头或者尾（双向链表）开始找，增删速率高

java为LinkedList增加了许多对于首尾操作的方法

#### LinkedList的应用场景队列和栈

```java
package yyssh.applyLinkedListDemo1;

import java.util.List;
import java.util.LinkedList;

public class LinkedListDemo1 {
    public static void main(String[] args) {
        //使用LinkedList创建一个队列
        LinkedList<String> queue = new LinkedList<>();
        //入队
        queue.addLast("张三");
        queue.addLast("李四");
        queue.addLast("王五");
        queue.addLast("赵六");

        //出队
        for (int i=0;i<queue.size();i++){
            System.out.println(queue.removeFirst());
            i--;
        }

        System.out.println("------------------------------------------------------------------");

        //使用LinkedList创建一个栈
        LinkedList<String> stack = new LinkedList<>();
        //入栈
        stack.push("张三");   //push==addFirst
        stack.push("李四");
        stack.push("王五");
        stack.push("赵六");

        //出栈
        for (int i=0;i<stack.size();i++){
            System.out.println(stack.pop());    //pop==removeFirst
            i--;
        }
    }
}
```

#### Set集合

![image-20250423170935359](posts/c2adefc4/images/collectionHashSet.webp)



##### java的哈希表

JDK8之前，哈希表=数组+链表

JDK8之后，哈希表=数组+链表+红黑树

哈希表是一种增删改查数据效率都比较高的数据结构

![image-20250423171307658](posts/c2adefc4/images/collectionHashSet_8Before.webp)

![image-20250423171436677](posts/c2adefc4/images/collectionHashSet_8after.webp)

#### HashSet集合对象去重操作

HashSet虽然是不重复的，但是对象之间如果数据完全相等，但对象之间的hash值不一定相等

```java
package yyssh.hashset;

import java.util.Set;
import java.util.HashSet;

public class HashSetSingle {
    public static void main(String[] args) {
        //定义一个HashSet集合
        Set<Student> Students = new HashSet<>();
        Students.add(new Student("yanyuan", 21, 100, 1, "男", "北京", "123456789"));
        Students.add(new Student("chenzhuang", 18, 91, 2, "男", "北京", "123456789"));
        Students.add(new Student("zhanghao", 20, 95, 3, "男", "北京", "123456789"));
        Students.add(new Student("zhangjie", 39, 88, 4, "男", "北京", "123456789"));
        Students.add(new Student("chenzhuang", 18, 91, 2, "男", "北京", "123456789"));
        Students.add(new Student("zhanghao", 20, 95, 3, "男", "北京", "123456789"));

        //打印Students集合
        for (Student s : Students) {
            System.out.println(s);
        }
    }
}
```

学生类：

```java
package yyssh.hashset;

import java.util.Objects;

public class Student {
    private String name;
    private int age;
    private int score;
    private int id;
    private String sex;
    private String address;
    private String phone;

    public Student(String name, int age, int score, int id, String sex, String address, String phone) {
        this.name = name;
        this.age = age;
        this.score = score;
        this.id = id;
        this.sex = sex;
        this.address = address;
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && score == student.score && id == student.id && Objects.equals(name, student.name) && Objects.equals(sex, student.sex) && Objects.equals(address, student.address) && Objects.equals(phone, student.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age, score, id, sex, address, phone);
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", score=" + score +
                ", id=" + id +
                ", sex='" + sex + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                '}'+'\n';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
```

主要在于equals和hashCode两个方法，但是sun公司都帮你写好了，直接调用就可以了，原理就是hashset集合存储数据要经过两个比较，一个是hashcode算hash值，一个是equals比较实际值

#### TreeSet集合自定义类型对象排序

```java
package yyssh.TreeSet;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class TreeSetDemo1 {
    public static void main(String[] args) {
//        Set<Teacher> teachers = new TreeSet<>(new Comparator<Teacher>() {
//            @Override
//            public int compare(Teacher o1, Teacher o2) {
//                return Double.compare(o1.getSalary(), o2.getSalary());
//            }
//        });
        //使用lambda简化
       Set<Teacher> teachers =new TreeSet<>(( o1,  o2)->Double.compare(o1.getSalary(), o2.getSalary()));   //升序
        teachers.add(new Teacher("yanyuan", 21, "男", 9009.9));
        teachers.add(new Teacher("chenzhuang", 18, "男", 10010.4));
        teachers.add(new Teacher("zhanghao", 20, "男", 10009.9));
        teachers.add(new Teacher("zhangjie", 39, "男", 99999.9));
        teachers.add(new Teacher("huangzhenbao", 18, "男", 199999.9));
        System.out.println(teachers);
    }
}
```

```java
package yyssh.TreeSet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Teacher {
    private String name;
    private int age;
    private String sex;
    private double salary;

    @Override
    public String toString() {
        return "Teacher{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                ", salary=" + salary +
                '}'+'\n';
    }
}
```

#### 集合的选择

1. 如果希望记住元素的添加顺序，需要存储重复的元素，又要频繁的根据索引查询数据？
	+ **用ArrayList集合（有序、可重复、有索引），底层基于数组的（常用）。**
2. 如果希望记住元素的添加顺序，且增删首位数据的情况较多？
	+ 用LinkedList集合（有序、可重复、有索引），底层基于双链表的。
3. 如果不在意元素顺序，也没有重复元素需要存储，只希望增删改查都快？
	+ **用HashSet集合（无序、不重复、无索引），底层基于哈希表实现的。（常用）**
4. 如果希望记住元素的添加顺序，也没有重复元素需要存储，且希望增删改查都快？
	+ 用LinkedHashSet集合（有序、不重复、无索引），底层基于哈希表和双链表。
5. 如果要对元素进行排序，也没有重复元素需要存储？且希望增删改查都快？
	+ 用TreeSet集合，基于红黑树实现。



#### Map集合

 ![image-20250428195109539](posts/c2adefc4/images/Map.webp)

#### Map集合的常用方法

![image-20250428195353360](posts/c2adefc4/images/MapFunction.webp)

```java
package yyssh.LearnMapFunction;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapDemo1 {
    public static void main(String[] args) {
        Map<String, Integer> maps = new HashMap<>();
        maps.put("张三", 18);
        maps.put("王五", 19);
        maps.put("赵六", 20);
        System.out.println(maps);
        System.out.println(maps.size());
        Set<String> keys = maps.keySet();   //使用Set集合接收键，不重复
        System.out.println(keys);
        Collection<Integer> values = maps.values();     //使用Collection集合接收值，可重复
        System.out.println(values);
    }
}

```

#### Map集合的遍历方法

##### 根据键找值

先获取Map集合的全部键，再通过遍历键来找值

```java
package yyssh.MapTraversingDemo1;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapTraversingDemo1 {
    public static void main(String[] args) {
        Map<String, Integer> maps = new HashMap<>();
        maps.put("张三", 18);
        maps.put("王五", 19);
        maps.put("赵六", 20);
        Set<String> keys = maps.keySet();   //使用Set集合接收键，不重复
        //根据键遍历map集合
        for (String key : keys) {
            Integer value = maps.get(key);
            System.out.println(key + ":" + value);
        }

    }
}
```

##### 把键值对看成一个整体进行遍历

利用java内置api将键值对看成一个entry对象进行遍历

![image-20250428204446696](posts/c2adefc4/images/MapTraversingEntry.webp)

```java
package yyssh.MapTraversingDemo2;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapTraversingDemo2 {
    public static void main(String[] args) {
        Map<String, Double> maps = new HashMap<>();
        maps.put("蜘蛛精", 169.8);
        maps.put("紫霞",165.8 );
        maps.put("至尊宝", 169.5);
        maps.put("牛魔王", 183.6);

        //将键值对看成一个entry对象，用Set集合接收，然后遍历
        Set<Map.Entry<String, Double>> entries = maps.entrySet();
        for (Map.Entry<String, Double> entry : entries) {
            String key = entry.getKey();
            Double value = entry.getValue();
            System.out.println(key + ":" + value);
        }
    }
}
```

##### lambda表达式遍历

![image-20250428214052427](posts/c2adefc4/images/MapTraversingLambda.webp)

```java
package yyssh.MapTraversingDemo3;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.BiConsumer;

public class MapTraversingDemo3 {
    public static void main(String[] args) {
        Map<String, Double> maps = new HashMap<>();
        maps.put("蜘蛛精", 169.8);
        maps.put("紫霞",165.8 );
        maps.put("至尊宝", 169.5);
        maps.put("牛魔王", 183.6);

        //使用lambda表达式遍历map集合
//        maps.forEach(new BiConsumer<String, Double>() {
//            @Override
//            public void accept(String key, Double value) {
//                System.out.println(key + ":" + value);
//            }
//        });
        maps.forEach(( key,  value)-> System.out.println(key + ":" + value));


    }
}
```

#### Map集合的实现类

描述：Set集合就是基于Map集合的，Set集合就是Map集合不取值，只取键的结果

| 实现类        | 底层原理                     | Set集合基于Map集合                                           |
| ------------- | ---------------------------- | ------------------------------------------------------------ |
| HashMap       | 哈希表                       | `public HashSet() {     map = new HashMap<>(); }`            |
| LinkedHashMap | 基于双链表的首尾指针进行排序 | `HashSet(int initialCapacity, float loadFactor, boolean dummy) {     map = new LinkedHashMap<>(initialCapacity, loadFactor); }` |
| TreeMap       | 哈希表+红黑树                | `public TreeSet(Comparator<? super E> comparator) {     this(new TreeMap<>(comparator)); }` |

#### Stream流

![image-20250507221557452](posts/c2adefc4/images/streamIntroduce.webp)

##### stream流的使用步骤

![image-20250507221406458](posts/c2adefc4/images/streamUse.webp)

#### 获取stream流

![image-20250507222550152](posts/c2adefc4/images/streamGet.webp)

```java
package fun.yyssh.GetStream;

import java.util.*;
import java.util.stream.Stream;

public class GetStream {
    public static void main(String[] args) {
        //获取collection的stream
        List<String> list = new ArrayList<>();
        list.add("yanyuan");
        list.add("chenzhuang");
        Stream<String> sl = list.stream();

        //获取map键的stream
        Map<String,Integer> map = new HashMap<>();
        Stream<String> sm = map.keySet().stream();
        //获取map值的stream
        Stream<Integer> sv = map.values().stream();
        //map键值对的steam
        Stream<Map.Entry<String,Integer>> sme = map.entrySet().stream();

        //获取数组的stream
        String[] arr = {"yanyuan","chenzhuang"};
        Stream<String> sa = Arrays.stream(arr); //方法1
        Stream<String> sa2 = Stream.of(arr);    //方法2 Stream of (T....values)代表接收可变参数

    }
}
```

+ 可变参数代表可以接收多种数据，无数据、多个数据、数组等都可以接收

![image-20250525191105529](posts/c2adefc4/images/changeParam.webp)

#### Stream流的中间方法

![image-20250525190230328](posts/c2adefc4/images/StreamMiddleFunction.webp)

#### Stram流的终结（收集）方法

![image-20250525190525050](D:\JavaProject\StreamEndFunction.webp)



### java的集合和python的集合有什么异同

#### **1. List（列表）**

| **特性**     | **Java**                                                     | **Python**                             |
| :----------- | :----------------------------------------------------------- | :------------------------------------- |
| **有序性**   | 有序（插入顺序），可重复                                     | 有序（插入顺序），可重复               |
| **实现分类** | `ArrayList`（数组）、`LinkedList`（链表）、`Vector`（线程安全数组） | 单一列表类型（`list`），底层为动态数组 |
| **线程安全** | `Vector`线程安全，其他默认不安全                             | 默认不安全，需手动同步                 |
| **操作示例** | `list.add(元素)`、`list.get(索引)`                           | `list.append(元素)`、`list[索引]`      |
| **特点**     | 类型固定（泛型），需显式声明                                 | 动态类型，可混合存储不同类型元素       |

#### **2. Map（字典）**

| **特性**       | **Java**                                         | **Python**                                           |
| :------------- | :----------------------------------------------- | :--------------------------------------------------- |
| **键值对存储** | 键唯一，值可重复                                 | 键唯一且不可变（如字符串、数字、元组），值可任意类型 |
| **实现分类**   | `HashMap`（哈希表）、`TreeMap`（红黑树）         | 单一字典类型（`dict`），底层为哈希表                 |
| **线程安全**   | `ConcurrentHashMap`线程安全，其他默认不安全      | 默认不安全                                           |
| **操作示例**   | `map.put(key, value)`、`map.get(key)`            | `dict[key] = value`、`dict.get(key)`                 |
| **特点**       | 键可为任意对象（需实现`hashCode()`和`equals()`） | 键必须为不可变类型（如列表不可作为键）               |

#### **3. Set（集合）**

| **特性**     | **Java**                                 | **Python**                                           |
| :----------- | :--------------------------------------- | :--------------------------------------------------- |
| **元素特性** | 无序，不可重复                           | 无序，不可重复（支持集合运算如并集、交集）           |
| **实现分类** | `HashSet`（哈希表）、`TreeSet`（红黑树） | 单一集合类型（`set`），底层为哈希表                  |
| **线程安全** | 默认不安全                               | 默认不安全                                           |
| **操作示例** | `set.add(元素)`、`set.contains(元素)`    | `set.add(元素)`、`元素 in set`                       |
| **特点**     | 基于`Map`实现（键存储，值为空对象）      | 直接支持数学集合操作（如 `union()`, `intersection()` |

### Java的File类

#### File类对象

![image-20250526115701588](posts/c2adefc4/images/fileObject.webp)

#### File类的基础方法

![image-20250526120247121](posts/c2adefc4/images/fileClassFunction.webp)

#### File类创建和删除文件夹

![image-20250526120955564](posts/c2adefc4/images/fileCreateDelete.webp)

#### File类的遍历文件夹功能

![image-20250526121438392](posts/c2adefc4/images/filelist.webp)

```java
package yyssh.learnFile;

import java.io.File;

public class LearnFile {
    public static void main(String[] args) {
        try {
            //创建一个file对象
            File file = new File(".\\..\\images\\fileObject.webp"); //这里相对路径的根目录是指工程目录
            //获取文件名
            System.out.println(file.getName());
            //获取文件大小
            System.out.println(file.length());
            //获取创建文件对象是，使用的路径
            System.out.println(file.getPath());
            //获取文件绝对路径
            System.out.println(file.getAbsolutePath());
            System.out.println("-----------------------------------------------");
            //遍历当前目录下的所有文件
            File file2 = new File(".\\..\\images");
            File[] files = file2.listFiles(); //获取当前目录下的所有一级文件并返回到一个对象数组当中
            for (File f : files) {
                System.out.println(f.getName());
            }
            System.out.println("-----------------------------------------------");
            //遍历当前目录下的所有文件，并返回一个字符串数组
            String[] fileNames = file2.list();
            for (String name : fileNames) {
                System.out.println(name);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

#### 公式化递归

![image-20250526125422172](posts/c2adefc4/images/functionRecursion.webp)

```java
package yyssh.learnFile;

public class LearnRecursion {
    public static void main(String[] args) {
        System.out.println("10的阶乘和"+factorial(10));
        System.out.println("10的累加和"+accumulate(10));
    }
    public static int factorial(int n){
        if(n==1){
            return 1;
        }
        return factorial(n-1)*n;
    }
    public static int accumulate(int n){
        if(n==1){
            return 1;
        }
        return accumulate(n-1)+n;
    }
}

```

#### 文件夹递归搜索

```java
package yyssh.learnFile;

import java.io.File;

public class FileSearchDemo {
    public static void main(String[] args) {
        //创建一个文件夹对象
        File file = new File("D:/");
        searchFile(file, "Everything.exe");

    }
    public static void searchFile(File dir, String name) {
        //判断极端情况
        if (!dir.exists()|| dir.isFile()|| dir == null) {
            return;
        }
        File[] files = dir.listFiles();
        if (files != null&&  files.length > 0) {
            for (File f : files) {
                if (f.isFile()) {
                    if (f.getName().contains(name)) {
                        System.out.println("找到了："+f.getAbsolutePath());
                    }
                } else {
                    searchFile(f, name);
                }
            }
        }
    }
}
```

#### java的编码与解码

![image-20250526193006968](posts/c2adefc4/images/javaCharset.webp)

### Javad的IO流

#### IO流的体系

![image-20250527121210382](posts/c2adefc4/images/IOsystem.webp)

#### FileInputStream

![image-20250526195613203](posts/c2adefc4/images/IOfileinputstream.webp)

+ read方法无法读取汉字，因为汉字在不同编码下所占字节不同，无法1字节读取
+ `read(buffer)`,如果读取包含汉字的文件，只能选择包含整个文件大小的字符数组去读，java特别给了一个方法`readAllBytes`可以一次读取整个文件的字符数组,但是这样也有缺陷，如果文件太大，这无法一次读取整个文件，也影响内存效率

```java
package yyssh.learnIO;

import java.io.*;

public class LearnFileInputStream {
    public static void main(String[] args) {
        //创建一个文件输入流对象
        try {
            InputStream  is = new FileInputStream("FileAndIO/src/yyssh/learnIO/1.txt");
            byte[] buffer = new byte[3];
            int len;
            //先判断是否读取到文件末尾，再将读取到的字节赋值给len
            while ((len = is.read(buffer)) != -1) {
                System.out.print(new String(buffer,0,len));
            }
			is.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
```

```java
package yyssh.learnIO;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.FileInputStream;

public class LearnFileInputStreamDemo2 {
    public static void main(String[] args) {
        //创建一个文件流对象
        try {
            InputStream is = new FileInputStream("FileAndIO/src/yyssh/learnIO/2.txt");
            byte[] buffer = is.readAllBytes();
            System.out.println(new String(buffer));
            is.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

#### FileOutputStream

![image-20250526210908436](posts/c2adefc4/images/IOfileOutputStream.webp)

#### 使用字符流进行文件复制操作

```java
package yyssh.learnIO;

import java.io.*;

public class FileCopy {
    public static void main(String[] args) {
        copyFile("FileAndIO/src/yyssh/learnIO/1.txt", "C:/Users/肥猪/Desktop/1_new.txt");
    }
    public static void copyFile(String src, String dest) {
        //创建一个文件输入流和输出流对象
        try (            InputStream fis = new FileInputStream(src);
                         OutputStream fos = new FileOutputStream(dest)
        ){
            //创建一个字节数组
            byte[] buffer = new byte[1024];
            int len;
            while ((len = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, len);
            }
            System.out.println("复制成功");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

#### 资源释放的方案

java7之前使用try-catch-finally的方法在finally进行资源释放

java7之后使用try-with-resource的方法

![image-20250526220603246](posts/c2adefc4/images/IOTryWithResource.webp)

#### FileReader

![image-20250526222621431](posts/c2adefc4/images/IOFileReader.webp)

#### FileWriter

![image-20250526222705936](posts/c2adefc4/images/IOFileWriter.webp)



![image-20250526222835979](posts/c2adefc4/images/IOflush.webp)

+ 通过代码写入的数据不会立马写入磁盘中，会进入内存缓冲区的地方，内存缓冲区可以避免内存与磁盘进行多次IO操作，从而拖累内存运行
+ 刷新流之后还可以继续使用流，但是关闭流之后无法继续使用流，关闭流包含了刷新流

#### 缓冲流

缓冲流的功能就是代替原先的字节和字符流，提高效率和性能

![image-20250526225315736](posts/c2adefc4/images/IObuffered.webp)

缓冲流就相当于这里8kb的桶，目的是减少了内存和磁盘的IO次数

##### bufferedInputStream

![image-20250526225525508](posts/c2adefc4/images/IObufferedInputStream.webp)

bufferedOutputStream和bufferedInputStream是一样的构造器

##### BufferedReader

![image-20250526225728250](posts/c2adefc4/images/IObufferedReader.webp)

##### BufferedWriter

![image-20250526225850668](posts/c2adefc4/images/IObufferedWriter.webp)

#### 字符输入转换流InputStramReader

![image-20250527121523667](posts/c2adefc4/images/IOinputStreamReader.webp)

#### 打印流PrintStream

![image-20250527121651361](posts/c2adefc4/images/IOprintStream.webp)

#### 特殊数据流DataOutputStream/DataInputStream

![image-20250527121835205](posts/c2adefc4/images/IOdataOutputStream.webp)

![image-20250527122143133](posts/c2adefc4/images/IOdataInputStream.webp)

#### Properties类读取配置信息

**作用**

Properties类是Java中用于处理配置文件的工具类，它可以方便地读写键值对格式的配置文件（通常是.properties文件）。Properties继承自Hashtable，表示一个持久的属性集，能够将属性保存到流中或从流中加载。

**构造器**

| 构造器                                   | 说明                               |
| :--------------------------------------- | :--------------------------------- |
| `public Properties()`                    | 创建一个无默认值的空属性列表       |
| `public Properties(Properties defaults)` | 创建一个带有指定默认值的空属性列表 |

**基本操作方法**

| 方法                                                         | 说明                                                   |
| :----------------------------------------------------------- | :----------------------------------------------------- |
| `public String getProperty(String key)`                      | 用指定的键在此属性列表中搜索属性                       |
| `public String getProperty(String key, String defaultValue)` | 用指定的键在属性列表中搜索属性，如果未找到则返回默认值 |
| `public Object setProperty(String key, String value)`        | 调用Hashtable的方法put，设置键值对                     |
| `public void load(InputStream inStream)`                     | 从输入流中读取属性列表（键和元素对）                   |
| `public void load(Reader reader)`                            | 按简单的面向行的格式从输入字符流中读取属性列表         |
| `public void store(OutputStream out, String comments)`       | 将属性列表写入输出流                                   |
| `public void store(Writer writer, String comments)`          | 将属性列表写入输出字符流                               |
| `public Enumeration<?> propertyNames()`                      | 返回属性列表中所有键的枚举                             |

```java
InputStream is = BaseDao.class.getClassLoader().getResourceAsStream("db.properties");
Properties p = new Properties();
try {
    p.load(is);
    String driver = p.getProperty("driver");
    String url = p.getProperty("url");
    String user = p.getProperty("user");
    String password = p.getProperty("password");
} catch (Exception e) {
    throw new RuntimeException(e);
}
```

### Java的file和IO流和python与c++有什么异同

| 特性/语言            | Java                                                         | Python                                            | C++                                              |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------ |
| **基本 I/O 类/模块** | `java.io`、`java.nio`                                        | `open()`、`io`、`os`、`pathlib`                   | `<fstream>`、`<iostream>`                        |
| **文件类**           | `File`, `Path`, `Files`（`java.nio.file`）                   | `os`, `pathlib.Path`, `open()`                    | `std::ifstream`, `std::ofstream`, `std::fstream` |
| **打开文件方式**     | `FileReader`, `FileInputStream` 等                           | `open('file.txt', 'r')`                           | `ifstream file("file.txt");`                     |
| **关闭文件**         | `close()`，或使用 try-with-resources 自动关闭                | `file.close()`，或用 `with open() as f:` 自动关闭 | `file.close()`，或通过 RAII 自动关闭             |
| **字符流/字节流**    | 明确区分：字符流 (`Reader/Writer`)，字节流 (`InputStream/OutputStream`) | `open()` 区分文本 (`'t'`) 和二进制 (`'b'`) 模式   | 没有明确区分，操作依据数据类型                   |
| **缓冲支持**         | `BufferedReader`, `BufferedWriter`                           | `io.BufferedReader`, `io.BufferedWriter`          | `std::ifstream` 等本身带缓冲                     |
| **随机访问文件**     | `RandomAccessFile`                                           | `seek()`, `tell()`                                | `seekg()`, `seekp()`, `tellg()`, `tellp()`       |
| **内存映射文件**     | `FileChannel.map()`                                          | `mmap` 模块                                       | `<mmap>` (非标准，平台依赖)                      |
| **异常处理**         | 必须处理 `IOException` 等                                    | 异常可选处理（`try/except`）                      | 可抛出异常或使用状态检查（如 `file.fail()`）     |
| **Unicode 支持**     | 需要明确设置编码，如 `InputStreamReader`                     | 默认支持 Unicode（Python 3）                      | C++11 起支持 UTF 编码，但操作复杂                |
| **现代语法支持**     | try-with-resources 自动资源管理（Java 7+）                   | with 语句上下文管理                               | C++11 起支持智能指针和 RAII                      |
| **异步 I/O 支持**    | `java.nio.channels`, `AsynchronousFileChannel`               | `asyncio` 模块，第三方库如 `aiofiles`             | 标准库无直接异步支持，可通过线程或 Boost 实现    |
| **跨平台一致性**     | 很好                                                         | 很好                                              | 一般较好，但与系统接口关系更紧密                 |

### 多线程

#### 多线程常用的方法

![image-20250527200206148](posts/c2adefc4/images/threadFunction.webp)

#### 继承Thread类

![image-20250527175311775](posts/c2adefc4/images/thread.webp)

注意事项：

+ 启动线程必须是调用start方法，不是调用run方法
+ 不要把主线程任务放在子线程之前

```java
package yyssh.LearnThread;

public class LearnThread {
    public static void main(String[] args) {
        //创建子线程
        Thread t1 = new MyThread();
        t1.start();

        //主线程开始运行
        for (int i = 0; i < 10; i++) {
            System.out.println("主线程开始执行");
        }
    }
}

class MyThread extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 6; i++){
            System.out.println("子线程开始执行");
        }
    }
}
```

#### 继承Runnable接口

Thread类本身就继承了Runnable接口，所以Thread类也可以当作任务对象来用

![image-20250527182025202](posts/c2adefc4/images/threadRunnable.webp)

```java
package yyssh.LearnThread;

public class LearnThreadDemo2 {
    public static void main(String[] args) {
        //创建子线程1
        Runnable task = new MyTask();
        Thread t1 = new Thread(task);
        t1.start();

        //使用匿名内部类的方法创建子线程1.5
        Runnable t1_5 = new Runnable(){
            @Override
            public void run() {
                for (int i = 0; i < 6; i++){
                    System.out.println("子线程1.5开始执行");
                }
            }
        };
        Thread  t1_5_thread = new Thread(t1_5);
        t1_5_thread.start();

        //使用匿名内部类的方法创建子线程2
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 6; i++){
                    System.out.println("子线程2开始执行");
                }
            }
        });
        t2.start();

        //使用lambda表达式简化匿名内部类
        Thread t3 = new Thread(() -> {
            for (int i = 0; i < 6; i++){
                System.out.println("子线程3开始执行");
            }
        });
        t3.start();

        //主线程开始运行
        for (int i = 0; i < 10; i++) {
            System.out.println("主线程开始执行");
        }
    }
}

class MyTask implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 6; i++){
            System.out.println("子线程1开始执行");
        }
    }
}
```

#### 继承Callable接口

![image-20250527192856770](posts/c2adefc4/images/threadCallabel.webp)

![image-20250527195033794](posts/c2adefc4/images/threadFutureTaskAPI.webp)

```java
package yyssh.LearnThread;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class LearnThreadDemo3 {
    public static void main(String[] args) {
        //创建一个Callable对象
        MyCallable c1 = new MyCallable(100);
        Callable c2 = new MyCallable(10);
        //把Callable对象封装给FutureTask对象
        /*
        * FutureTask的作用？
        *   a.FutureTask类实现了Runnable接口，所以FutureTask对象也可以作为线程执行对象
        *   b.FutureTask对象也可以获取线程执行结果
        */
        FutureTask<String> f1 = new FutureTask<>(c1);
        FutureTask<String> f2 = new FutureTask<>(c2);
        //把FutureTask对象封装给Thread对象
        Thread t1 = new Thread(f1);
        t1.start();
        Thread t2 = new Thread(f2);
        t2.start();
        //获取线程执行结果
        
        //写两个子线程捕获异常的原因是：如果一个子线程因为异常终止，不会影响其他子线程的执行
        try {
            String result = f1.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            String result = f2.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //主线程执行
        System.out.println("主线程执行");
    }
}

class MyCallable implements Callable<String> {
    private int n;
    //定义一个有参构造器
    public MyCallable(int n) {
        this.n = n;
    }
    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 0; i < n+1 ; i++){
           sum += i;
        }
        return "子线程计算1-"+  n + "的和为：" + sum;
    }
}
```

#### 线程安全

当两个线程同时挤占CPU时，可能在一个线程进行重要操作时（取款），另外一个线程也完成了重要操作，从而导致银行出线违规操作

![image-20250529195634054](posts/c2adefc4/images/threadSecurity.webp)

**ThreadSecurityDemo.java**

```java
package yyssh.ThreadSecurity;

public class ThreadSecurityDemo {
    public static void main(String[] args) {
        //创建两个用户
        Account account = new Account("小明", "123456", 100000.0);

        //创建两个子线程
        Thread t1 = new MyThread("小明",account);
        Thread t2 = new MyThread("小红",account);

        t1.start();
        t2.start();
    }
}
```

**Account.java**

```java
package yyssh.ThreadSecurity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    private String name;
    private String password;
    private double balance;

    //判断余额是否足够，从而取钱
    public synchronized void drawMoney(double drawAmount) {
        if (balance >= drawAmount) {
            System.out.println(Thread.currentThread().getName() + "取钱成功，吐出钞票：" + drawAmount);
            balance -= drawAmount;
            System.out.println("余额为：" + balance);
        } else {
            System.out.println(Thread.currentThread().getName() + "取钱失败，余额不足");
        }
    }
}
```

**MyThread.java**

```java
package yyssh.ThreadSecurity;

public class MyThread extends Thread{

    private Account account;

    //创建一个有参构造器
    public MyThread(String name,Account account){
        super(name);
        this.account = account;
    }
    @Override
    public void run() {
        account.drawMoney(100000);
    }

}
```

##### 同步代码块

![image-20250529213642274](posts/c2adefc4/images/synchronizedCode.webp)

同步锁选择对象：

+ 使用共享资源作为锁对象，对于实例方法建议使用this作为锁对象
+ 对于静态方法建议使用字节码（类名.class）对象作为锁对象

##### 同步方法

![image-20250529214055404](posts/c2adefc4/images/synchronizedFunction.webp)

##### lock锁

![image-20250529214206127](posts/c2adefc4/images/synchronizedLock.webp)

```java
package yyssh.ThreadSecurity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    private String name;
    private String password;
    private double balance;
    private final Lock lk = new ReentrantLock();

    //判断余额是否足够，从而取钱,使用lock锁来保证线程安全
    public void drawMoney(double amount) {
        if (balance >= amount) {
            lk.lock();
            try {
                balance -= amount;
                System.out.println(Thread.currentThread().getName() + "取款成功，余额为：" + balance);
            } finally { lk.unlock();}
        }
        else {
            System.out.println(Thread.currentThread().getName() + "取款失败，余额不足");
        }
    }

}
```

#### 线程池

线程池的创建原因是因为不可能每一个任务都创建一个线程来管理，所以存在线程复用的情况

![image-20250530162943637](posts/c2adefc4/images/threadPool.webp)

##### 创建线程池

![image-20250530163321775](posts/c2adefc4/images/createThreadPool.webp)

###### ExecutorService的实现类创建线程池

![image-20250530163730785](posts/c2adefc4/images/threadPoolExecutorService.webp)

```java
package yyssh.threadPool;

import java.util.concurrent.*;

public class LearnThreadPool {
    public static void main(String[] args) {
        //使用executorService的实现类threadPoolExecutor创建线程池
        /*
        * 参数1：int corePoolSize,线程池中核心线程的数量
        * 参数2：int maximumPoolSize,线程池中最大线程数量
        * 参数3：long keepAliveTime,线程池中线程空闲时间
        * 参数4：TimeUnit unit,keepAliveTime的单位
        * 参数5：BlockingQueue<Runnable> workQueue,线程池中任务队列 ，可以选择ArrayBlockingQueue，也可以选择LinkedBlockingQueue，一个是数组队列，一个是链表队列
        * 参数6：ThreadFactory threadFactory,线程工厂 他这个线程工厂还是用Executor的工具类创建的,那这种创建线程池的方法不推荐
        * 参数7：RejectedExecutionHandler handler,线程池中任务队列已满，且线程池中线程数量达到最大值时，线程池拒绝处理任务时，调用的拒绝策略
         */
        ExecutorService pool = new ThreadPoolExecutor(3,5,10, TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(3), Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());
    }
}
```

**ExecutorService的常用方法**

![image-20250530165712915](posts/c2adefc4/images/threadPoolExecutorServiceFunction.webp)

**处理Runnable任务**

**LearnThreadPool.java**

```java
package yyssh.threadPool;

import java.util.concurrent.*;

public class LearnThreadPool {
    public static void main(String[] args) {
        //使用executorService的实现类threadPoolExecutor创建线程池
        /*
        * 参数1：int corePoolSize,线程池中核心线程的数量
        * 参数2：int maximumPoolSize,线程池中最大线程数量
        * 参数3：long keepAliveTime,线程池中线程空闲时间
        * 参数4：TimeUnit unit,keepAliveTime的单位
        * 参数5：BlockingQueue<Runnable> workQueue,线程池中任务队列 ，可以选择ArrayBlockingQueue，也可以选择LinkedBlockingQueue，一个是数组队列，一个是链表队列
        * 参数6：ThreadFactory threadFactory,线程工厂 他这个线程工厂还是用Executor的工具类创建的,那这种创建线程池的方法不推荐
        * 参数7：RejectedExecutionHandler handler,线程池中任务队列已满，且线程池中线程数量达到最大值时，线程池拒绝处理任务时，调用的拒绝策略
         */
        ExecutorService pool = new ThreadPoolExecutor(3,5,10, TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(3), Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());

        //线程池分配线程，执行任务
        Runnable target = new MyRunnable();
        for (int i = 0; i < 6; i++){
            pool.execute(target);
        }
        
        //一般不选择线程池关闭，而是使用线程池的shutdownNow方法，这个方法会立即关闭线程池，并且会中断正在运行的线程，并且返回正在运行的线程
        //pool.shutdown();
    }
}
```

**MyRunnable.java**

```java
package yyssh.threadPool;

public class MyRunnable implements Runnable{
    //重写run方法，设置线程任务
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName()+"开始运行");
    }
}
```

**临时线程的创建和任务拒绝策略**

![image-20250530171705708](posts/c2adefc4/images/temporaryTaskAndTaskreject.webp)

**处理Callable任务**

**LearnThreadPool.java**

```java
package yyssh.threadPool;

import java.util.concurrent.*;

public class LearnThreadPool {
    public static void main(String[] args) {
        //使用executorService的实现类threadPoolExecutor创建线程池
        /*
        * 参数1：int corePoolSize,线程池中核心线程的数量
        * 参数2：int maximumPoolSize,线程池中最大线程数量
        * 参数3：long keepAliveTime,线程池中线程空闲时间
        * 参数4：TimeUnit unit,keepAliveTime的单位
        * 参数5：BlockingQueue<Runnable> workQueue,线程池中任务队列 ，可以选择ArrayBlockingQueue，也可以选择LinkedBlockingQueue，一个是数组队列，一个是链表队列
        * 参数6：ThreadFactory threadFactory,线程工厂 他这个线程工厂还是用Executor的工具类创建的,那这种创建线程池的方法不推荐
        * 参数7：RejectedExecutionHandler handler,线程池中任务队列已满，且线程池中线程数量达到最大值时，线程池拒绝处理任务时，调用的拒绝策略
         */
        ExecutorService pool = new ThreadPoolExecutor(3,5,10, TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(3), Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());

        //线程池分配线程，执行Runnable任务
        Runnable target = new MyRunnable();
        for (int i = 0; i < 6; i++){
            pool.execute(target);
        }

        //一般不选择线程池关闭，而是使用线程池的shutdownNow方法，这个方法会立即关闭线程池，并且会中断正在运行的线程，并且返回正在运行的线程
        //pool.shutdown();

        //线程池处理Callable任务，并获取执行结果
        Future<String> f1 = pool.submit(new MyCallable(50));
        Future<String> f2 = pool.submit(new MyCallable(10));
        Future<String> f3 = pool.submit(new MyCallable(100));
        Future<String> f4 = pool.submit(new MyCallable(20));
        Future<String> f5 = pool.submit(new MyCallable(30));
        Future<String> f6 = pool.submit(new MyCallable(40));

        try {
            String result1 = f1.get();
            String result2 = f2.get();
            String result3 = f3.get();
            String result4 = f4.get();
            String result5 = f5.get();
            String result6 = f6.get();
            System.out.println(result1);
            System.out.println(result2);
            System.out.println(result3);
            System.out.println(result4);
            System.out.println(result5);
            System.out.println(result6);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

**MyCallable.java**

```java
package yyssh.threadPool;

import java.util.concurrent.Callable;

class MyCallable implements Callable<String> {
    private int n;
    //定义一个有参构造器
    public MyCallable(int n) {
        this.n = n;
    }
    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 0; i < n+1 ; i++){
           sum += i;
        }
        return Thread.currentThread().getName() + "计算1-"+  n + "的和为：" + sum;
    }
}
```

###### Executors工具类创建线程池

![image-20250530175028677](posts/c2adefc4/images/executorToolClass.webp)

大公司禁止使用 Executor工具类创建线程池

![image-20250530175314815](posts/c2adefc4/images/forbidExecutorToolClass.webp)

#### 并发和并行

并发：同一**时间段**执行的程序

并行：同一**时间**执行的程序

### java多线程和python、c++的区别

| **特性**                 | **Java**                                                     | **Python**                                                   | **C++**                                                      |
| :----------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **线程模型**             | 原生支持多线程（基于操作系统线程），通过`Thread`类和`Runnable`接口实现。 | 由于GIL（全局解释器锁），CPython的多线程无法真正并行，多线程适合I/O密集型任务。 | 原生支持多线程（C++11起通过`<thread>`标准库），无GIL限制，可真正并行。 |
| **并行性**               | 支持真正的多线程并行（利用多核CPU）。                        | 由于GIL限制，多线程无法并行（但多进程可以）。                | 支持真正的多线程并行（依赖操作系统和硬件）。                 |
| **线程安全机制**         | 内置`synchronized`关键字、`Lock`接口、`volatile`变量等。     | 通过`threading.Lock`、`RLock`等实现，但GIL导致线程安全复杂性降低。 | 通过`std::mutex`、`std::atomic`等实现，需手动管理，灵活性高但易出错。 |
| **线程通信**             | 使用`wait()`/`notify()`或`BlockingQueue`等高级工具。         | 使用`queue.Queue`或条件变量（`threading.Condition`）。       | 通过条件变量（`std::condition_variable`）或低级原子操作实现。 |
| **内存模型**             | 定义明确的线程内存模型（JMM），保证可见性和有序性。          | 无严格内存模型，依赖GIL简化同步。                            | C++11引入内存模型（`std::memory_order`），需显式控制。       |
| **性能**                 | 线程创建和切换开销适中，适合高并发场景。                     | 线程创建开销低，但GIL导致计算密集型性能差。                  | 线程性能接近原生操作系统，高效但需精细优化。                 |
| **多进程支持**           | 可通过`ProcessBuilder`启动多进程，但线程更常用。             | 多进程是并行计算的推荐方式（`multiprocessing`模块）。        | 可通过`fork()`或`std::process`（C++20）实现，但多线程更常见。 |
| **典型应用场景**         | 高并发服务器、企业级应用。                                   | I/O密集型任务（如网络请求），GIL限制计算密集型任务。         | 高性能计算、游戏引擎、系统级编程。                           |
| **代码示例（简单线程）** | `java<br>new Thread(() -> {<br> System.out.println("Hello");<br>}).start();<br>` | `python<br>import threading<br>threading.Thread(target=lambda: print("Hello")).start()<br>` | `cpp<br>#include <thread><br>std::thread t([](){ std::cout << "Hello"; });<br>t.join();<br>` |

### Java的InetAddress

![image-20250530181211885](posts/c2adefc4/images/InetAddress.webp)

#### CS架构

##### UDP通信的实现

![image-20250530210127641](posts/c2adefc4/images/UDPCommunication.webp)

**Client:**

```java
package yyssh.UDPCommunication;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;

public class LearnUDPClient {
    public static void main(String[] args) throws IOException {
        //创建UDP通信的client端
        System.out.println("UDP通信Client端");

        //创建client的socket对象
        DatagramSocket client = null;
        try {
            client = new DatagramSocket();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        //创建键盘扫描器对象，让client自定义发送数据
        while(true){
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入你要发送的信息：");
            String msg = sc.next();

            //将msg数据封装成byte数组发送给Server
            byte[] bytes = new byte[1024*64];
            bytes = msg.getBytes();
            client.send(new DatagramPacket(bytes, bytes.length,InetAddress.getLocalHost(),9999));

            if("exit".equals(msg)){
                break;
            }
        }
        client.close();
    }
}
```

**Server:**

```java
package yyssh.UDPCommunication;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;


public class LearnUDPServer {
    public static void main(String[] args) throws IOException {
        //创建UDP通信的Server端
        System.out.println("UDP通信Server端");

        //创建server的socket对象
        DatagramSocket server = null;
        try {
            server = new DatagramSocket(9999);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


        while(true){
            //创建byte数组接收来自client的数据
            byte[] buf = new byte[1024*64];
            DatagramPacket packet = new DatagramPacket(buf,0,buf.length);
            server.receive(packet);

            //将数据包转换成字符串
            String msg = new String(packet.getData(),0,packet.getLength());

            //打印输出client发送过来的数据
            System.out.println("来自"+ packet.getAddress() +"的数据："+ msg);
        }
    }
}
```

##### TCP通信的实现

**Client:**

![image-20250531105346874](posts/c2adefc4/images/TCPcommunication.webp)

```java
package yyssh.TCPcommunication;

import java.io.DataOutputStream;
import java.net.Socket;
import java.util.Scanner;

public class LearnTCPClient {
    public static void main(String[] args) throws Exception {
        //创建一个TCP通信的client端
        System.out.println("============TCP通信Client端============");

        //创建一个client的socket对象
        Socket client = new Socket("127.0.0.1",  9999);

        //获得特殊数据流对象
        DataOutputStream dis = new DataOutputStream(client.getOutputStream());

        //创建键盘扫描器对象，让client自定义发送数据
        Scanner sc = new Scanner(System.in);
        while(true){

            System.out.println("请输入你要发送的信息：");
            String msg = sc.next();

            //使用特殊数据流对象发送数据给Server
            dis.writeUTF(msg);
            dis.flush();
            
            //如果client输入exit，则结束client
            if("exit".equals(msg)){
                client.close();
            }
        }
    }
}
```

**Server:**

![image-20250531105523586](posts/c2adefc4/images/TCPcommunicationServer.webp)

```java
package yyssh.TCPcommunication;

import java.net.ServerSocket;
import java.net.Socket;

public class LearnTCPServerDemo2 {
    public static void main(String[] args) throws Exception {
        //创建一个TCP通信的Server端
         System.out.println("==================TCP通信Server端================");

         //为Server端注册端口
        ServerSocket server = new ServerSocket(9999);

        while (true){
            //阻塞等待客户端的连接请求，一旦客户端连接，则返回socket对象
            Socket socket = server.accept();

            //为每一个client分配一个子线程
            new MyThread(socket).start();
        }

    }
}
```

**MyThread.java:**

```java
package yyssh.TCPcommunication;

import java.io.DataInputStream;
import java.net.Socket;

public class MyThread extends Thread{
    private Socket socket;
    public MyThread(Socket socket){
        this.socket = socket;
    }
    @Override
     public void run() {
        try {
            //获得client的特殊数据流对象
            DataInputStream dis = new DataInputStream(socket.getInputStream());

            //接收client发送的数据
            while(true){

                String msg = dis.readUTF();

                //获得client的ip的端口
                System.out.println("ip："+socket.getInetAddress().getHostAddress()
                        + ":"+socket.getPort()+"发送消息"+msg);
            }
        } catch (Exception e) {
            System.out.println("ip："+socket.getInetAddress().getHostAddress()
                    + ":"+socket.getPort()+"下线了");
            throw new RuntimeException(e);
        }
    }
}
```

#### BS架构

**Server:**

```java
package yyssh.BSCommunication;

import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LearnTCPServerDemo2 {
    public static void main(String[] args) throws Exception {

         //为Server端注册端口
        ServerSocket server = new ServerSocket(9999);
        //使用Executors工具类创建10个子线程的线程池
        ExecutorService pool = Executors.newFixedThreadPool(10);

        while (true){
            //阻塞等待客户端的连接请求，一旦客户端连接，则返回socket对象
            Socket socket = server.accept();

            //为每一个client分配一个子线程
            pool.execute( new MyThread(socket));
        }

    }
}
```

**MyThread.java:**

```java
package yyssh.BSCommunication;

import java.io.DataInputStream;
import java.io.PrintStream;
import java.net.Socket;

public class MyThread extends Thread{
    private Socket socket;
    public MyThread(Socket socket){
        this.socket = socket;
    }
    @Override
     public void run() {
        try {
            //创建打印流，打印数据到网页中
            PrintStream  ps = new PrintStream(socket.getOutputStream());
            ps.println("HTTP/1.1 200 OK");
            ps.println("Content-Type:text/html;charset=UTF-8");
            ps.println();
            ps.println("<html>");
            ps.println("<body>");
            ps.println("<h1>Hello World</h1>");
            ps.println("</body>");
            ps.println("</html>");

            ps.close();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

### Junit单元测试

在 JUnit 4 中：

- @Test测试方法必须是 **public、非静态（non-static）、无参数、无返回值** 的方法。

在 JUnit 5 中（使用 `org.junit.jupiter.api.Test`）：

- @Test测试方法也 **必须是非静态的（non-static）**。
- 同样不能有参数（除非你用的是参数化测试）。

所以用@Test直接注释main函数会报错

![image-20250601001240161](posts/c2adefc4/images/JunitTest.webp)

单元测试本质就是你新建一个类调用被测试的类，然后传入测试参数（null、“”等等），观察程序是否报错或者与预期值是否相同

#### 断言测试

+ 断言测试：Assert.assertEquals("测试不相等时你想输出的字符串",应输出值，实际值)

![image-20250820105231535](C:\Users\肥猪\AppData\Roaming\Typora\typora-user-images\image-20250820105231535.webp)

#### 测试的注解

![image-20250820120649623](C:\Users\肥猪\AppData\Roaming\Typora\typora-user-images\image-20250820120649623.webp)

### Java的反射

![image-20250601111751831](posts/c2adefc4/images/JavaReflect.webp)

#### 加载类

![image-20250601114652504](posts/c2adefc4/images/JavaGetClass.webp)

#### 获取构造器

![image-20250601121407027](posts/c2adefc4/images/JavaReflectConstructors.webp)

#### 获取成员变量

![image-20250601121535470](posts/c2adefc4/images/JavaReflectField.webp)

#### 获取成员方法

![image-20250601121700608](posts/c2adefc4/images/JavaReflectFunction.webp)

#### 反射类和构造器、成员变量、成员方法例子

**LearnReflect:**

```java
package yyssh.reflect;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class LearnReflect {
    public static void main(String[] args) throws Exception {
        //用反射的方法获取狗的加载类
        Class  dogClass = Dog.class;
        //获取类的类名
        System.out.println(dogClass.getName());
        System.out.println(dogClass.getSimpleName());

        System.out.println("--------------------------------");

        //用反射的方法获取狗的构造器
        Constructor [] constructors = dogClass.getConstructors();
        for ( Constructor constructor : constructors) {
            System.out.println(constructor.getName()+" "+constructor.getParameterCount());
        }
        //获取某个构造器 无参构造器
        Constructor constructor2 = dogClass.getDeclaredConstructor();
        System.out.println( constructor2.getName()+ " "+constructor2.getParameterCount());
        // 获取某个构造器 有参构造器
        Constructor constructor3 = dogClass.getDeclaredConstructor(String.class,int.class,String.class);
        System.out.println( constructor3.getName()+ " "+constructor3.getParameterCount());

        //初始化对象并返回 还是调用狗的构造器，但是java不知道是谁的构造器，所以强转为狗
        //这里因为无参构造器私有的，所以使用setAccessible(true),可以暴力反射，临时跳过私有权限
        constructor2.setAccessible(true);
        Dog dog = (Dog)constructor2.newInstance();  //无参构造器
        Dog dog1 = (Dog)constructor3.newInstance("旺财", 3, "狗粮");    //有参构造器

        System.out.println("--------------------------------");

        //使用反射的方法获取狗的成员变量
        Field [] fields = dogClass.getDeclaredFields();
        for ( Field field : fields) {
             System.out.println(field.getName() + " " + field.getType());
        }
        //获取单个成员变量
        Field field = dogClass.getDeclaredField("name");
        System.out.println(field.getName()+" "+field.getType());
        //name是私有成员变量，所以依然使用 setAccessible(true)暴力反射
        field.setAccessible(true);
        //反射成员变量赋值
        field.set(dog, "旺财");
        //反射成员变量取值
        System.out.println(field.get(dog)); //get传参对象，获取哪个对象的值

        System.out.println( "--------------------------------");

        // 使用反射的方法获取狗的成员方法
        Method[] methods = dogClass.getDeclaredMethods();
         for ( Method method : methods) {
             System.out.println(method.getName() + " " + method.getReturnType());
         }
         //获取单个成员方法 无参方法
         Method method = dogClass.getDeclaredMethod("eat");
         System.out.println(method.getName() + " " + method.getReturnType());
         //获取单个成员方法 有参方法
        //eat重载是私有函数，所以依然使用 setAccessible(true)暴力反射
        Method method1 = dogClass.getDeclaredMethod("eat", String.class);
        method1.setAccessible(true);
        System.out.println( method1.getName() + " " + method1.getReturnType());
        //使用反射调用方法
        //invoke会自动判断有参无参调用
        method1.invoke(dog, "狗粮");

    }
}
```

**Dog.java:**

```java
package yyssh.reflect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class Dog {
    private String name;
    private int age;
    public String food;

    private Dog() {
        System.out.println("无参构造器");
    }

    public Dog(String name, int age, String food) {
        this.name = name;
        this.age = age;
        this.food = food;
        System.out.println("有参构造器");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    private void eat () {
        System.out.println("吃吃吃");
    }

    public void eat (String food) {
        System.out.println("🐕吃"+food);
    }

}
```

#### 反射的作用

![image-20250601233639456](posts/c2adefc4/images/reflectEffect.webp)



### Java的反射与python的反射

| **Java 反射功能**         | **Java 示例代码**                                            | **Python 类似功能**                                          | **Python 示例代码**                                          |
| :------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **获取类对象**            | `Class<?> clazz = Class.forName("com.example.MyClass");`     | 通过 `type()` 或模块的 `globals()` 获取类                    | `MyClass = globals()["MyClass"]` 或 `clazz = type(obj)`      |
| **创建实例**              | `Object obj = clazz.newInstance();`                          | 直接调用类或动态获取类后实例化                               | `obj = MyClass()` 或 `obj = globals()["MyClass"]()`          |
| **调用方法**              | `Method method = clazz.getMethod("methodName", paramTypes);` `method.invoke(obj, args);` | 使用 `getattr()` 获取方法并调用                              | `method = getattr(obj, "methodName")` `method(*args)`        |
| **访问/修改字段**         | `Field field = clazz.getField("fieldName");` `field.set(obj, value);` | 使用 `getattr()` 和 `setattr()` 动态操作属性                 | `setattr(obj, "fieldName", value)` `value = getattr(obj, "fieldName")` |
| **获取注解信息**          | `Annotation[] anns = clazz.getAnnotations();`                | 通过 `__annotations__` 或 `inspect` 模块获取装饰器/注解      | `anns = obj.__annotations__` 或 `inspect.getmembers(obj)`    |
| **动态代理/拦截调用**     | `Proxy.newProxyInstance()` + `InvocationHandler`             | 重写 `__getattr__` 或 `__setattr__` 魔术方法                 | `python<br>class Proxy:<br> def __getattr__(self, name):<br> return lambda *args: ...<br>` |
| **检查方法/字段是否存在** | `clazz.getMethod("method")` (抛异常) `clazz.getDeclaredFields()` | `hasattr(obj, "attr")` 或 `dir(obj)`                         | `if hasattr(obj, "method"): ...` 或 `"field" in dir(obj)`    |
| **调用私有方法/字段**     | `field.setAccessible(true);` `method.setAccessible(true);`   | Python 无严格私有成员（通过名称约定 `_name` 或 `__name` 变形） | `obj._MyClass__private_field` （需知道变形后的名称）         |

### 注解

![image-20250602001010394](posts/c2adefc4/images/JavaAnnotation.webp)

#### 自定义注解

![image-20250602001227451](posts/c2adefc4/images/customAnnotation.webp)

#### 自定义注解的原理

![image-20250602001438278](posts/c2adefc4/images/customAnnotationTheory.webp)

#### 元注解

![image-20250602001703205](posts/c2adefc4/images/meta_annotation.webp)

#### 注解解析

![image-20250602002745304](posts/c2adefc4/images/annotationAnalysis.webp)

#### 自定义注解、元注解、注解解析例子

**LearnAnnotation.java:**

```java
package yyssh.learnAnnotation;

import org.junit.jupiter.api.Test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

public class LearnAnnotation {
    @Test
    public void test1() {
        //获取被注解类
        Class s1 = Student.class;
        //获取当前类上面所有的注解
        Annotation [] annotations = s1.getDeclaredAnnotations();
        //遍历注解，并打印注解上面的信息
        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

        //先判断当前对象上是否存在某个注解，然后在遍历当前对象上的注解
        if (s1.isAnnotationPresent(MyAnnotation.Teacher.class)){
            //获取当前类上单个注解(这里单个注解是MyAnnotation.Teacher)
             MyAnnotation.Teacher MyTeacher = (MyAnnotation.Teacher) s1.getDeclaredAnnotation(MyAnnotation.Teacher.class);
            //打印注解里面的值
             System.out.println(MyTeacher.name() + " " + MyTeacher.age() + " " + MyTeacher.sex());
        }
    }

    //获取方法上的注解信息
    @Test
    public void test2() throws Exception {
        //获取被注解的方法的类
        Class s1 = Student.class;
        //获取被注解的方法
        Method method = s1.getDeclaredMethod("run");
        //获取该方法上的所有注解
        Annotation [] annotations = method.getDeclaredAnnotations();
        //遍历注解，并打印注解上面的信息
        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

        //判断方法上是否存在注解
        if (method.isAnnotationPresent(MyAnnotation.Teacher.class)){
            //获取方法上的这个注解，这和类不一样，这个不用强转
             MyAnnotation.Teacher MyTeacher = method.getDeclaredAnnotation(MyAnnotation.Teacher.class);
             System.out.println(MyTeacher.name() + " " + MyTeacher.age() + " " + MyTeacher.sex());
        }
    }
}
```

**Student.java:**

```java
package yyssh.learnAnnotation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MyAnnotation.Teacher(name = "小明",age = 18,sex = "男")
public class Student {
     private String name;
     private int age;
     public  String sex;

     @MyAnnotation.Teacher(name = "小红",age = 19,sex = "女")
     public void run(){}
}
```

**MyAnnotation.java:**

```java
package yyssh.learnAnnotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class MyAnnotation {
    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.TYPE,ElementType.METHOD})
    public @interface Teacher {
        public String name() ;
        public int age() ;
        public String sex() ;
    }
}
```

### Java和python、C++的注解的异同

| **特性**               | **Java 注解 (`@Annotation`)**                                | **Python 装饰器/类型注解**                        | **C++ 属性 (`[[attr]]`)**                            |
| :--------------------- | :----------------------------------------------------------- | :------------------------------------------------ | :--------------------------------------------------- |
| **语法示例**           | `@Override` `@Deprecated(since="1.0")`                       | `@decorator` `def func() -> str: ...`             | `[[deprecated]]` `[[nodiscard]]`                     |
| **主要用途**           | 元数据标记、编译时检查、运行时反射                           | 函数/类行为修改、类型提示、元编程                 | 编译器指令、优化提示、废弃警告                       |
| **自定义支持**         | 是（可定义新的注解类型）                                     | 是（可编写自定义装饰器）                          | 否（仅支持标准属性，C++23 可能扩展）                 |
| **运行时访问**         | 是（通过反射 `getAnnotations()`）                            | 是（通过 `__annotations__` 或 `inspect` 模块）    | 否（仅编译期处理）                                   |
| **影响编译行为**       | 是（如 `@Override` 检查重写）                                | 否（类型提示需额外工具如 `mypy`）                 | 是（如 `[[nodiscard]]` 警告返回值未使用）            |
| **类型检查**           | 可结合泛型（如 `@NotNull`）                                  | 通过 `typing` 模块（运行时无强制）                | 通过 `concepts`（C++20 编译时约束）                  |
| **多注解叠加**         | 支持（`@A @B`）                                              | 支持（多层装饰器 `@A @B`）                        | 支持（`[[attr1, attr2]]`）                           |
| **标准库中的常见用例** | `@Override`, `@FunctionalInterface`, `@SpringBootApplication` | `@staticmethod`, `@dataclass`, `@typing.overload` | `[[deprecated]]`, `[[maybe_unused]]`, `[[noreturn]]` |

### 动态代理

代理含义：中介人，假设一个明星需要唱歌跳舞，他会让中介人去和主办方谈，中介人负责收钱，日期安排等等，明星只需要唱歌跳舞

实现步骤：

+ 明星和中介人都有相同的方法，也就是继承同一个接口

![image-20250602115128183](posts/c2adefc4/images/javaProxyClass.webp)

##### **ProxyUtil.java:**

```java
package yyssh.learnProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 *代理工具类，中介公司专门创建一个代理对象并返回
 */

public class ProxyUtil {
    /**
     * 传一个明星对象过来，返回一个代理对象
     */
    public static StarService getProxy(Star s) {
        //创建一个代理对象
        /**
         * 参数1：指定哪一个类加载器加载这个代理类,选择生成代理的类(ProxyUtil.class.getClassLoader())或者生成被代理的类(s.getClass().getClassLoader())
         * 参数2：代理对象和明星对象都实现的接口，也可以指定多个接口
         * 参数3：代理对象需要完成的方法（代理需要做的事情）
         * 返回值：返回一个代理对象
         * 因为返回的这个代理对象应为明星所实现的接口，则需要强转为 StarService
         */
        StarService proxy = (StarService) Proxy.newProxyInstance(ProxyUtil.class.getClassLoader(), s.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                //代理完成的方法
                /**
                 * 参数1：代理对象
                 * 参数2：代理对象所调用的方法
                 * 参数3：方法参数
                 */
                if ( method.getName().equals("sing")){
                    System.out.println("准备话筒，收钱");
                }else if( method.getName().equals("dance")){
                    System.out.println("准备场地，收钱");
                }
                //invoke会自动判断有参无参调用
                Object result = method.invoke(s, args);
                return result;
            }
        });
        return proxy;
    }
}
```

可以将`public static StarService getProxy(Star s)`改为泛型

再将对象改为代理对象

```java
//创建明星对象的代理对象
StarService proxy = ProxyUtil.getProxy(star);
proxy.sing("夜曲");
System.out.println(proxy.dance());
```

就可以为任何类都做代理

```java
package yyssh.learnProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 *代理工具类，中介公司专门创建一个代理对象并返回
 */

public class ProxyUtil {
    /**
     * 传一个明星对象过来，返回一个代理对象
     */
    public static <T> T getProxy(Star s) {
        //创建一个代理对象
        /**
         * 参数1：指定哪一个类加载器加载这个代理类,选择生成代理的类(ProxyUtil.class.getClassLoader())或者生成被代理的类(s.getClass().getClassLoader())
         * 参数2：代理对象和明星对象都实现的接口，也可以指定多个接口
         * 参数3：代理对象需要完成的方法（代理需要做的事情）
         * 返回值：返回一个代理对象
         * 因为返回的这个代理对象应为明星所实现的接口，则需要强转为 StarService
         */
        T proxy = (T) Proxy.newProxyInstance(ProxyUtil.class.getClassLoader(), s.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                //代理完成的方法
                /**
                 * 参数1：代理对象
                 * 参数2：代理对象所调用的方法
                 * 参数3：方法参数
                 */
                if ( method.getName().equals("sing")){
                    System.out.println("准备话筒，收钱");
                }else if( method.getName().equals("dance")){
                    System.out.println("准备场地，收钱");
                }
                //invoke会自动判断有参无参调用
                Object result = method.invoke(s, args);
                return result;
            }
        });
        return proxy;
    }
}
```

##### **StarService.java:**

```java
package yyssh.learnProxy;

public interface StarService {
     public void sing(String name);
     public String dance();
}
```

##### **Star.java:**

```java
package yyssh.learnProxy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Star implements StarService {
    private String name;
    @Override
    public void sing(String name) {
        System.out.println("我在唱歌singing");
    }
    @Override
    public String dance() {
        System.out.println("我在跳舞I'm dancing");
        return "谢谢大家！";
    }
}
```

##### **LearnProxy.java:**

```java
package yyssh.learnProxy;

public class LearnProxy {
    public static void main(String[] args) {
        //创建一个明星对象
        Star star = new Star("小红");
        //创建明星对象的代理对象
        StarService proxy = ProxyUtil.getProxy(star);
        proxy.sing("夜曲");
        System.out.println(proxy.dance());
    }
}
```

#### 切面编程思想（AOP）

 AOP（面向切面编程）是对 OOP（面向对象编程）的一种补充。

> **目标**：将通用功能（如日志、事务、安全等）从主业务逻辑中**分离出来**，达到**增强代码模块化**、**降低耦合度**的目的。

 AOP 要解决的问题：**把这些通用逻辑抽离成“切面”，以插件的形式织入到业务方法前后。**

Spring AOP 默认使用的就是 **JDK 动态代理**（如果是接口），或 **CGLIB 代理**（如果是类）。

在 Spring 中用 `@Aspect`、`@Before`、`@After` 就可以配置这些代理逻辑，无需手写 `InvocationHandler`。