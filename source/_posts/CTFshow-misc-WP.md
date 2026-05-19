---
title: CTFshow_misc_WP
tags:
  - misc
  - WP
categories:
  - ctfshow
swiper_index: 0
description: >-
  本人是在web入门篇写到128题左右开始也刷Misc的题目了，因为现在CTF挑战中，Web与Misc大量的牵扯了进来，Misc又由于本身的解密性，从而增加了一个Web题目的趣味性，也更加的符合实战场景，就我目前的水平而言，Web刷的题都是简单的php代码审计，也想换一个放松心情（\~找虐\~）
abbrlink: 57b6e4e
date: 2025-05-19 12:17:51
---

### 前言

本人是在web入门篇写到128题左右开始也刷Misc的题目了，因为现在CTF挑战中，Web与Misc大量的牵扯了进来，Misc又由于本身的解密性，从而增加了一个Web题目的趣味性，也更加的符合实战场景，就我目前的水平而言，Web刷的题都是简单的php代码审计，也想换一个放松心情（\~找虐\~）

## 不要固定思维，多找找意想不到的地方

## Misc入门

### Misc-01

解压即有，拿个图片文字工具(qq截图就有)把flag提取出来

### Misc-02

打开txt文件看一眼，有图片头png，改文件后缀.webp，然后和第一关一样

### Misc-03

一种稀奇古怪的图片格式，网络上还没有在线转换器，下一个honeyview/bpgview查看器查看就可以得到图片

### Misc-04

这不得不说honeyview工具的强大了，这几个txt文件用honeyview工具打开就可以得到图片，再用工具查看，可以得到图片格式分别为png、jpeg(正常打开txt文件可以知道这张图还用Ps改了)、bmp、gif、tiff、webp

```flag
ctfshow{4314e2b15ad9a960e7d9d8fc2ff902da} 
```

#### 常见图片头和压缩包格式

```introduce
JPEG (jpg) 文件头：FF D8 FF  文件尾：FF D9

PNG (png)，文件头：89 50 4E 47 0D 0A 1A 0A 

Windows Bitmap (bmp)， 文件头：424D 文件尾：

GIF (gif)，文件头：47494638

XML (xml)，文件头：3C3F786D6C

HTML (html)，文件头：68746D6C3E

MS Word/Excel (xls.or.doc)，文件头：D0CF11E0

MS Access (mdb)，文件头：5374616E64617264204A

Adobe Acrobat (pdf)，文件头：255044462D312E

Windows Password (pwl)，文件头：E3828596

ZIP Archive (zip)，文件头：504B0304

RAR Archive (rar)，文件头：52617221

Wave (wav)，文件头：57415645

AVI (avi)，文件头：41564920

TIFF (tif)， 文件头：49492A00 文件尾：


 ZIP 压缩文件
文件头：50 4B 03 04（PK\x03\x04）

文件尾：50 4B 05 06（中央目录结束标记）

文本标记：PK（常见于ZIP结构）


RAR 压缩文件
文件头：52 61 72 21 1A 07 00（Rar!\x1A\x07\x00）

文件尾：52 61 72 21 1A 07 1C（RAR 5.0结束标记）

文本标记：RAR（压缩标识）

7z 压缩文件
文件头：37 7A BC AF 27 1C（7z¼¯'）

文件尾：无固定文件尾（以流结束标记 00 结尾）

文本标记：7z（格式标识）

BZ2 压缩文件
文件头：42 5A 68（BZh）

文本标记：BZ（标识压缩方法，如 BZh1）

GZIP 压缩文件
文件头：1F 8B 08

文本标记：.gz（常用于文件名）

PDF 文档
文件头：25 50 44 46（%PDF）

文件尾：25 25 45 4F 46（%%EOF）

文本标记：/Page 或 /Type（文档结构标识）

MP3 音频
文件头（ID3标签）：49 44 33（ID3）

音频帧头：FF FB（MPEG-1 Layer III）

文本标记：歌曲元数据（如标题、艺术家）。

MP4 视频
文件头：66 74 79 70 69 73 6F 6D（ftypisom）

文本标记：moov（视频元数据块）或 avc1（H.264编码标识）。

AVI 视频
文件头：52 49 46 46 ... 41 56 49 20（RIFF...AVI ）

文本标记：vids（视频流标识）或 auds（音频流标识）。
```

### Misc-05/06/07/09/15

文件内容包含flag，记事本打开，`ctrl+f`查找`ctfshow`

### Misc-08

问题提示在图片文件中图片文件中，可以猜想应该是多个图片杂糅，尝试用binwalk分离图片回显

![image-20250103170113633](posts/57b6e4e/images/Misc_08binwalk.webp)

可以看到回显有两个`PNG image`说明之前的猜测是正确的

解法一：

+ 直接使用foremost分离出两个图片，其中一个图片包含flag

解法二：

+ 使用010删去第一个图片，png的文件头是89 50 4E 47 0D 0A 1A 0A 

解法三：

+ 使用命令跳过第一个图片的字节数3892

![image-20250104131441316](posts/57b6e4e/images/Misc_08_010.webp)

```payload
dd if=misc8.webp of=flag.webp bs=1 skip=3892
```

得到flag图片

#### dd命令基本语法

```bash
dd if=<input_file> of=<output_file> [options]
```

- `if`：输入文件（input file）
- `of`：输出文件（output file）

**【options】**

+ **bs=<block_size>**

设置块大小。`dd` 会按块读取输入文件，块大小是每次读写操作的数据量。单位可以是字节（`B`），千字节（`K`），兆字节（`M`）等。

```bash
dd if=/dev/sda of=/backup/disk.img bs=4M
```

+ **count=<block_count>**

`dd` 会读取输入文件中的块，直到读取到指定数量的块为止。

```bash
dd if=/dev/sda of=/backup/disk.img bs=1M count=100
```

+ **skip=<skip_count>**

跳过输入文件中的指定块数。

```bash
dd if=/dev/sda of=/backup/disk.img bs=1M skip=10
```

+ **seek=<seek_count>**

在输出文件中跳过指定数量的块。

```bash
dd if=input.img of=output.img bs=1M seek=50
```

+ **conv=\<conversion>**

用于指定转换方式。`dd` 支持多个转换选项，可以同时使用多个转换方式，多个转换用逗号分隔。

常用的转换选项包括：

- **`noerror`**：忽略读取错误。
- **`sync`**：填充读取到的空白区域，保证输入输出大小一致。
- **`notrunc`**：不截断输出文件。
- **`ucase`**：将小写字母转换为大写字母。
- **`lcase`**：将大写字母转换为小写字母。
- **`swab`**：交换字节顺序。

```bash
dd if=input.txt of=output.txt conv=ucase
```

该命令将 `input.txt` 中的所有小写字母转换为大写字母，写入 `output.txt`。

### Misc-10

binwalk分离图片，10E5打开就是，不要惯性思维，每个分离文件都要打开看看

### Misc-11

这题考察png图片的数据块显示，根据题目提示，这道题应该还有第二个图片，但是用`binwalk`和`foremost`都分离不出来图片，用010打开发现，有两个IDAT模块（图片一般默认显示第一个IDAT模块），可以直接使用010删除第一个IDAT模块，但是只会显示图片上半身，建议直接使用`tweakpng`直接删除第一个IDAT模块

经过我的测试发现，代表IDAT图片模块的是6个16进制数据

从下图框住地方开始删除

![image-20250111170633271](posts/57b6e4e/images/Misc_11DeleteIDAT.webp)

保留至第一个IDAT模块的6位，即可得到完整图片

![image-20250111171004230](posts/57b6e4e/images/Misc_11_ReserveIDAT.webp)

### Misc-12

010打开图片之后发现一堆IDAT模块，binwalk和foremost分离都没用

方法一：

+ 直接使用`tweakpng`一个一个删除IDAT模块，删除到第八个就得到flag了

方法二：

+ 使用tweakpng把所有的IDAT模块合并，再使用binwalk解析图片

![image-20250111180136661](posts/57b6e4e/images/Misc_12BinwalkAnalysis.webp)

可以看到有两个模块，一个是从41开始，一个是从3149开始，利用`tweakpng->spilt IDAT`分隔出`3149-41=3108`,现在查看图片可以看到有两个IDAT模块，但是依然没有正确显示flag，那么删去第一个模块得到flag图片

### Misc-13

010转换ascii编码查看，通过查找发现四段可疑字符

```text
ct¹fshªoKw{!aeS6¥eT34fxa%4Ý8ïf«528b1º7E4|2Td~7:2äeñ6úfõ4129T8ñ328é0l}
ct¹fshªoKw{!1eS3¥eT24exd%4Ý8ïf«518b7ºeE4|2T6~7:däeñ1úcõ412aT8ñ329éal}
ct¹fshªoKw{!aeS6¥eT34exa%4Ý8ïf«518b7ºeE4|2Td~7:däeñ6úfõ412fT8ñ329éal}
ct¹fshªoKw{!aeS6¥eT446xc%4Ý8ïf«739b7ºeEb|2Td~1:däeñ6úeõ412fT8ñ329éal}
```

写一段python脚本隔位提取字符串

```python
def Misc13Print(str):
    PrintStr=''
    count=1
    for i in str:
        if i == '{':
            count += 1
        if count % 2 != 0:
            PrintStr += i
        count += 1
    return PrintStr

str1='ct¹fshªoKw{!aeS6¥eT34fxa%4Ý8ïf«528b1º7E4|2Td~7:2äeñ6úfõ4129T8ñ328é0l}'
str2=Misc13Print(str1)
str3='ct¹fshªoKw{!1eS3¥eT24exd%4Ý8ïf«518b7ºeE4|2T6~7:däeñ1úcõ412aT8ñ329éal}'
str4=Misc13Print(str3)
str5='ct¹fshªoKw{!aeS6¥eT34exa%4Ý8ïf«518b7ºeE4|2Td~7:däeñ6úfõ412fT8ñ329éal}'
str6=Misc13Print(str5)
str7='ct¹fshªoKw{!aeS6¥eT446xc%4Ý8ïf«739b7ºeEb|2Td~1:däeñ6úeõ412fT8ñ329éal}'
str8=Misc13Print(str7)

print(str2+'\n'+str4+'\n'+str6+'\n'+str8)
```

得到四个可疑flag

```flag
ctfshow{ae6e3fa48f528b1742d72e6f41298380}
ctfshow{1e3e2ed48f518b7e4267de1c412a839a}
ctfshow{ae6e3ea48f518b7e42d7de6f412f839a}
ctfshow{ae6e46c48f739b7eb2d1de6e412f839a}
```

第三个是正确的

### Misc-14

首先用binwalk分析一波

![image-20250113170136428](posts/57b6e4e/images/Misc_13BinwalkAnalysis.webp)

可以看到有两个`Tiff`图片，一个`JFIF`模块，`JFIF`模块的功能类似于png图片的IDAT模块

方法1：

+ 直接使用010删除前2103个数据,得到flag图片

方法2：

+ 使用dd命令跳过

```shell
dd if=misc14.jpg of=flag.jpg bs=1 skip=2103
```

方法3：

+ 直接使用binwalk命令将图片分离出来

```shell
binwalk -D "jpeg" misc14.jpg --run-as=root
```

这里说一下binwalk`-e`和`-D`选项的区别

| 选项 | 功能描述                                                 | 使用场景                                                     |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------ |
| `-e` | 自动提取所有被识别的嵌入式文件，如压缩文件、文件系统等。 | 如果你想提取所有嵌入的文件和数据，可以使用 `-e`。            |
| `-D` | 指定要提取的特定数据类型，如 `gzip`、`jpeg`、`tar` 等。  | 如果你只关心某种特定类型的数据（如只提取压缩文件），可以使用 `-D`。 |

### Misc-16

用binwalk分离图片得到的数据D5C打开就是flag，binwalk还分离出了一个LZMA模块，可以得到一个压缩包，但是压缩包已经损坏

### Misc-17

先用010打开图片看一下，发现有多个IDAT模块，用`tweakpng`合并一下IDAT模块，然后直接使用binwalk分析一下，发现有两个多余模块，一个zlib压缩，一个bizp2压缩

+ 用kali的binwalk分离的话，如果没有下zsteg，只会得到两个zlib压缩文件，拿不到flag，需要单独下载zsteg，如果kali版本较高则会自带zsteg，binwalk会分离出D6E,010查看发现是png文件头，添加后缀png，拿到flag
+ 如果使用的是随波逐流软件里自带的binwalk(本人最开始是这种情况，所以也特别说明一下)会得到一个D6E.bz2,使用解压软件解压一下就可以得到D6E，后续操作和kali的一样了

### Misc-18

不要被做题思维所固定，提示信息确实保存在XMP元素里面，用随波逐流分析工具都能分析出来，然后拼凑（本人最开始就是这个方法），但是直接**文件查看属性**，详细信息里面也有这些，所以不要固定思维

### Misc-19

题目提示在文档名称

方法一：

+ 可以直接使用在线工具exit文档查看器查看[https://exif.tuchong.com/](https://exif.tuchong.com/)

方法二：

+ 直接使用strings命令查看图片中的可打印信息

```shell
strings misc19.tif | grep "ctfshow"
```

方法三：

+ 使用本地工具随波逐流将文档信息过滤出来，或者直接使用010手动筛选（不建议）

### Misc-20

用上一题的工具可以查找到评论所在，然后谐音，考普通话吧

### Misc-21

依旧是用上一题的工具可以得到序列号，把序列号尝试提交发现错误，用序列号转ascii得到，`hex(X&Ys)`，猜测用x、y的分辨率和坐标得到flag，由于x、y的分辨率和坐标都是十进制，分别将X分辨率，Y分辨率，X定位，Y定位进行hex转换得到e8a221498d5c073b4084eb51b1a1686d，拿到flag

### Misc-22

题目说flag在图片里，猜测有两个图片

方法一：

+ 直接使用exiftool 、Magicexif、XnView、随波逐流一把梭出来缩略图查看，拿到flag

```shell
 exiftool -ThumbnailImage -b misc22.webp > flag.webp 
```

方法二：

+ 用010查看图片发现有两个jpg图片头（FF D8 FF）,删除一个图片，第二个图片就是缩略图

### Misc-23

题目提示flag在图片时间里面，直接用exiftool查看图片信息
![image-20250119120219107](posts/57b6e4e/images/Misc_23_ExifTool.webp)

拿到提示`UnixTimestamp,DECtoHEX`,很明显了时间转时间戳，时间戳转16进制最后拿到flag

ctfshow{3425649ea0e31938808c0de51b70ce6a}

### Misc-24

题目提示flag在图片上面，看一下图片的宽高，900*150，再看一下图片大小

用计算公式算一下，发现高被修改了

#### 图片宽高计算公式(只对未被压缩的图片格式适用，bmp)：

**`ImageSize/BytesPerPixel=Width*Height`**

- **ImageSize**：图像文件的总大小，通常是字节（Byte）为单位。
- **BytesPerPixel**：每个像素所占用的字节数，这取决于图像的色深（bitCount）。比如，24位色深的图像通常每个像素占用3个字节（8位红、8位绿、8位蓝），而32位色深的图像每个像素占用4个字节（包括透明度Alpha通道）。
- **Width**：图像的宽度，单位通常是像素。
- **Height**：图像的高度，单位通常是像素。

用exiftool看图片大小和位深，用公式算高：675000/3/900=250

用010修改图片高度

![image-20250120115512649](posts/57b6e4e/images/Misc_24_010.webp)

拿到flag图片

### Misc-25/26

题目提示flag在图片下，那基本就是宽高被修改了

#### png图片的结构讲解以及宽高验证

##### **PNG文件的结构**：

PNG文件不仅仅包含图像数据本身，还包括多个结构化的块（Chunk）。这些块包含：

- **文件头**（包含签名信息）。
- **图像数据块**（IDAT块，包含压缩后的图像数据）。
- **颜色信息块**（IHDR块，包含图像的基本信息，如宽度、高度、位深、颜色类型等）。
- **元数据块**（如tEXt块，包含文本信息）。
- **校验码**（CRC块）。

```tex
1、开头的0~7八个字节为png的文件头：89 50 4E 47 0D 0A 1A 0A （固定格式）

2、8~11四个字节：00 00 00 0D 表示头部数据块的长度为13（固定格式）

3、12~15四个字节：49 48 44 52 表示文件头数据块的标示（固定格式）

4、16~19四个字节：00 00 03 84表示图片的宽（不固定）

5、20~23四个字节：00 00 00 96表示图片的高（不固定）

6、24~28五个字节：08 02 00 00 00表示Bit depth（图像深度）、ColorType（颜色类型）、 Compression method（压缩方法）、 Filter method（滤波器方法）、Interlace method（隔行扫描方法）这五个字节不固定，均为可变数据

7、29~32四个字节：76 EC 1E 40为图片的crc校验值由从第12个字节到第28个字节的十七位字节进行crc计算得到
```

#####  **png图片的CRC校验**：

**每个PNG块都有一个CRC校验码**，用来验证数据的完整性。CRC校验码是一个基于数据内容的散列值。每个块（如IDAT、IHDR等）都会附带一个CRC值，保证块的内容没有被篡改。这也是PNG文件大小的一部分，因为每个块的大小包括了CRC校验码。

对于PNG文件，文件大小不仅与图像的分辨率和色深（BytesPerPixel）相关，还与图像的内容、压缩效果、块结构和CRC校验码等因素密切相关。因此，单纯使用 `ImageSize = Width × Height × BytesPerPixel` 来估算PNG图像的大小是不准确的，尤其是对于已经压缩的PNG图像。

原理懂了，下面开始做题

方法一：

+ 直接用脚本爆出png图片真实的宽高，然后用010修改

```python
import binascii
import struct
 
 
crcbp = open("misc25.webp", "rb").read()    #打开图片
crc32frombp = int(crcbp[29:33].hex(),16)     #读取图片中的CRC校验值
print(crc32frombp)
 
for i in range(4000):                        #宽度1-4000进行枚举
    for j in range(4000):                    #高度1-4000进行枚举
        data = crcbp[12:16] + \
            struct.pack('>i', i)+struct.pack('>i', j)+crcbp[24:29]
        crc32 = binascii.crc32(data) & 0xffffffff
        # print(crc32)
        if(crc32 == crc32frombp):            #计算当图片大小为i:j时的CRC校验值，与图片中的CRC比较，当相同，则图片大小已经确定
            print(i, j)
            print('hex:', hex(i), hex(j))
            exit(0)
 
```

![image-20250120122346746](posts/57b6e4e/images/Misc_25_010.webp)

方法二：

+ 随波逐流工具一把梭

### Misc-27

题目提示flag在图片下面

jpg图片没有可还原性，高度随便改，超了就是黑边，最好改大一点，拿到flag

![image-20250120124019338](posts/57b6e4e/images/Misc_27_010.webp)

### Misc-28

题目依然提示flag在图片下，只不过换了一种图片格式

gif图片虽然有crc校验，但是无法校验宽高，只能校验特定扩展块的数据

修改gif图片的宽高，要修改两个变量值：
![image-20250121104100947](posts/57b6e4e/images/Misc_28_010_Logical.webp)

![image-20250121104216024](C:\Users\肥猪\AppData\Roaming\Typora\typora-user-images\Misc_28_010_Image.webp)

- **修改 `LogicalScreenDescriptor` 宽高**：影响整个图像的显示区域。
- **修改 `ImageDescriptor` 宽高**：只影响某一帧的显示方式。

高度随便改，超了就是黑边，最好改大一点，拿到flag图片

### Misc_29

和上一题一样，依然是修改高度，图片格式依然是gif，但是他有十帧，用winhex把高度全部替换

![image-20250121111113622](posts/57b6e4e/images/Misc_29_winhex.webp)

然后用分帧查看stegsolve，第八帧就是我们要的flag图片

### Misc_30

和24题一样，但是题目直接告诉了我们宽度是950，我们也可以用24题的公式算，假设宽是正确的，得到高度是158，修改之后图片错误，假设高是正确的，得到宽度950，直接用010修改宽度950拿到flag图片

### Misc_31

依然是24题一样，计算公式，高度正确直接算出宽度=487200/3/150=1082

修改宽度1082拿到flag图片

### Misc_32/33

和25题一样，用png的crc校验爆破出png图片真实的宽高，也可以用工具随波逐流

### Misc_34

由于CRC校验码也被改了，但是题目给了提示，宽度大于900，所以写一个爆破脚本，把大于900的图片筛出来，然后肉眼看，哪张图片是正常的

```python
import struct

filename='misc34.webp'
with open(filename, 'rb') as f:
    data = f.read()
    for i in range(901,1501):
        NewName=str(i)+'.webp'
        NewData=data[:16]+struct.pack('>i',i)+data[20:]
        with open(NewName, 'wb') as Nf:
            Nf.write(NewData)

```

文件资源管理器改成大图标查看，一眼白的就是flag图片，网上有些脚本还将CRC校验码也改了过来，其实不用，CRC校验码的作用就是校验图片是否被篡改，对图片本身没有影响

### Misc_35

题目提示是宽度有问题，修改了之后发现还是不行，把高度再改一下得到flag图片

### Misc_36

#### **常见图片格式的宽高存储方式**

| 格式        | 存储位置                   | 字节长度 | 字节序           |
| :---------- | :------------------------- | :------- | :--------------- |
| **GIF**     | 逻辑屏幕描述块             | 2字节    | **小端序**       |
| **PNG**     | IHDR块                     | 4字节    | **大端序**       |
| **JPEG**    | SOF0标记（Start of Frame） | 2字节    | **大端序**       |
| **BMP**     | 文件头（偏移 18/22）       | 4字节    | **小端序**       |
| **WebP**    | VP8X扩展块（扩展格式）     | 3字节    | **小端序**       |
| **TIFF**    | IFD（图像文件目录）        | 4字节    | **取决于文件头** |
| **ICO/CUR** | 图标目录条目               | 1字节²   | **无字节序**     |

先了解了常见的字节序格式，才能理解编写的脚本，这道题和34题是一样的，只不过图片格式换成了gif，gif是小端序所以脚本有所修改，再把高度修改成300，则可以得到flag图片。因为高度是不变的，所以修改原图高度为300，再进行脚本爆破

```python
import struct
filename = "misc36.gif"
with open(filename, 'rb') as f:
    data = f.read()
    for i in range(920,951):
        name = str(i) + ".gif"
        f1 = open(name,"wb")
        new = data[:38]+struct.pack('<h',i)+data[40:]	#这里改成小端序
        f1.write(new)
        f1.close()
```

进行肉眼筛选，拿到flag图片

### Misc_37

打开图片看一眼，发现有几帧会是flag一部分，直接用工具分解帧（随波逐流一把梭），或者使用在线网站[https://tu.sioe.cn/gj/fenjie/](https://tu.sioe.cn/gj/fenjie/)，或者使用gif图片编辑工具`UleadGIFAnimato`

+ WP里看到的其他方法，gif图片每一个图片只有几帧，我们可以把flag那几帧时间延长，这样就拿到了flag长时间图片
+ 010+修改时间 首先用010查看，发现有45个图，点看第一个图片持续时间DelayTime为10，将其和下面的变量TransparentColorIndex（图片透明度）的值一起搜索发现有40结果，将其中时间修改后可以确定包含第一个flag的图片，而总的图为45，所以基本确定剩余5个图包含flag，用上述同样的方法将包含flag的图时间改大就能获得最终flag。

### Misc_38

用010打开发现`acTL、fcTL、fdAT`模块

PNG（Portable Network Graphics）格式是一种广泛使用的无损压缩图像格式，虽然它最常用于静态图像，但也支持简单的动画。为了支持动画，PNG使用了几个特定的块（chunks），其中 `acTL`、`fcTL` 和 `fdAT` 是与动画相关的块。

#### png图片的动画结构

1. `acTL` (Animation Control Chunk)

- **作用**：`acTL` 是一个控制PNG动画的块，它是整个动画的控制器。
- **用途**：它的主要作用是指示图像是否为动画图像，并且包含了动画帧的数量和是否循环播放。
- 字段
	- **num_plays**：动画播放的次数。如果值为0，则表示动画无限循环播放；如果大于0，则表示动画播放指定次数。
	- **num_frames**：动画包含的总帧数。

2. `fcTL` (Frame Control Chunk)

- **作用**：`fcTL` 定义了每一帧动画的详细信息。

- **用途**：它控制每一帧的显示时间、位置和大小等参数。每个 `fcTL` 块对应PNG动画中的一帧。

- 字段

	- **sequence_number**：帧的序号。

	- **width, height**：当前帧的宽度和高度。

	- **x_offset, y_offset**：当前帧相对于画布的显示位置（即图像左上角的偏移量）。

	- **delay_num, delay_den**：帧之间的延迟时间。

		`Delay Time=delay_num/delay_den(seconds)`

	- **dispose_op**：帧结束时的清理操作（例如，保留当前帧或用透明背景覆盖）。

	- **blend_op**：当前帧与前一帧的合成方式。

3. `fdAT` (Frame Data Chunk)

- **作用**：`fdAT` 存储每一帧的实际图像数据。
- **用途**：每个 `fdAT` 块包含了对应帧的压缩图像数据。`fdAT` 块通常紧跟在 `fcTL` 块后面，用于存储该帧的像素数据（类似于 `IDAT` 块用于静态图像）。
- **字段**：与普通的 `IDAT` 块类似，`fdAT` 包含经过压缩的图像数据。

下面开始解题

方法一：

+ 直接使用png动画查看软件查看，Honeyview一把梭

方法二：

+ 利用010把delay_num改大，增加每帧的延迟时间，然后拼接拿到flag图片

### Misc_39

根据题目提示，flag就像水，忽快忽慢。可以联想到gif的每帧图片的间隔时间不同（其实我也不知道这是怎么联想的，，，，）

利用工具imagemagick的命令把间隔时间提取出来

```shell
identify -format "%T " misc39.gif > 39.txt
```

1. **`identify`**: 这是 ImageMagick 中的一个命令，用于获取图像的详细信息。
2. **`-format "%T "`**:
	- `-format` 选项允许你指定输出的格式。
	- `"%T"` 是一个格式说明符，表示输出图像的延迟时间（以百分之一秒为单位）。对于 GIF 图像，延迟时间通常用于控制每一帧的显示时间。
	- 也可以往`%T`后加空格分隔
3. 其他常用格式说明符：
	- `%w`: 图像宽度
	- `%h`: 图像高度
	- `%n`: 帧数（对于多帧图像如 GIF）
	- `%g`: 图像的几何信息（宽度x高度）

下面是python脚本：

```python
str1='3737363636373737373736373636373736363737363737373636373737373637363636373736373737373737373637373737373737363737363737363736373637373636373636373737363636363737363636373637373636373637373636373736373736363737363637373736363736373737363637363737363736373737363637373637373636363736363737363737373737363636373637373636373637363737363637363637373637373636373737363636373736363736363637373736363736373736373736363737363637373737363636363736373737363637373736363736373737363636373637373636363737373736363636373637373636363636373736373636363737363736373637373736363737373737373637'	#这是提取到的时间间隔
str2=str1.replace('37','1').replace('36','0')	#猜测是二进制数据
system=len(str2)/41	#ctfshow的flag是41位，则就是7个二进制组成一个字母
flag=''
for i in range(41):
    flag+=chr(int(str2[i*7:7*(i+1)],2))	#每7个二进制转字符串

print(flag)
```

### Misc_40

这题和上一题其实是一样的，但是需要工具`APNG Disassembler`提取每帧图片延迟时间，拿到一堆文本图片其实就是`Delay Time=delay_num/delay_den(seconds)`，发现后面的delay_den是不变的，所以只提取前面的delay_num

跟39题一样猜测是ascii码

```python
content=''
for i in range(1,69):
    with open(f'apngframe{i:02d}.txt','r',encoding='utf-8') as f:
        content+=f.read()
        content=content.replace('delay=','').replace('/1000','').replace('\n',' ')

print(content)
SplitContent=content.split()
print(SplitContent)
flag=''
for j in SplitContent:
    flag+=chr(int(j))

print(flag)
```

前面有一些字母是干扰项，但是不影响脚本拿到flag

### Misc_41(愚人节特别篇)

有点抽象的，前面说了是fool，后面提示笨蛋（fool）在飞（改变形状），010搜索F001（fool），观察形状就是flag

### Misc_42

根据提示基本确定了跟39，40题一样的ascii码转换，010打开发现chunk块的长度明显有问题

先用`pngcheck`工具把块的长度提取出来

```shell
pngcheck -v misc42.webp | grep 'IDAT' | awk '{print $7}' | paste -sd ' ' >42.txt
```

 **`awk '{print \$7}'`**

- **`awk`** 是一个强大的文本处理工具，通常用于根据特定的模式分割行，并进行进一步操作。
- **`'{print \$7}'`** 表示从匹配的行中提取第 7 列（字段）。

 **`paste -sd ' '`**

- **`paste`** 命令用于将多行文本合并成一行，默认按制表符分隔。
- **`-s`** 选项表示将所有输入行串联成一行。
- **`-d ' '`** 选项指定使用空格作为分隔符。

拿到每个chunk的长度，还是和39，40差不多的脚本，尽量学会自己写脚本

```python
with open('42.txt','r',encoding='utf-8') as f:
    data = f.read()
    content=data.split()

print(content)
flag=''
for i in content:
    flag+=chr(int(i))

print(flag)
```

### Misc_43

题目提示错误中隐藏正确的道路，用`tweakpng`发现所有的IDAT块的crc校验码都是错的，也就是说这个错的crc校验码很有可能是我们的flag，16进制转ascii拿到flag

### Misc_44

题目依然提示我们flag在错误中寻找，但是错误的有太多了，总量也太多了，但是IDAT模块的chunk数是344，344/41=8.3.....，我们尝试一下二进制，因为前面有很多对的干扰，c的二进制是`01100011`,成功比对，下面给脚本

```python
flag=''
with open('44.txt','r',encoding='utf-8') as f:
    for line in f:
        if 'CRC OK' in line:
            flag+='1'
        if 'CRC FAILED' in line:
            flag+='0'

print(flag)
flag=flag[17:]
print(flag)
TrueFlag=''
for i in range(41):
    TrueFlag+=chr(int(flag[8*i:8*(i+1)],2))

print(TrueFlag)
```

这里先用`pngdebugger`获取所有的crc校验码信息导入文本文件中，方便做题

### Misc_45

题目提示换一个思维**格式**，因为bmp和png的像素点读取方式不一样（不懂，看wp的），转换成bmp格式然后binwalk分离拿到flag图片

### Misc_46

题目提示扶乩，这个可能有的师傅有些陌生，换个名字大家就知道了，笔仙。笔仙的玩法就是两人互相拽着手握着一个笔，然后笔就动。

这个自然就想到笔画图，坐标就是gif图片给的偏移量

先用imageMagick得到图的偏移量

```shell
magick identify misc46.gif >46.txt
```

![image-20250205202814478](posts/57b6e4e/images/Misc_46_magick.webp)

用命令提取出来

```shell
cat 46.txt | awk '{print $4}' >466.txt
```

写个脚本只要偏移量

```python
with open('466.txt','r',encoding='utf8') as f:
    data = f.read()
    content=data.replace('900x150','').replace('+',' ').split()

print(content)
count=0
for i in content:
    count+=1
    with open('4667.txt','a',encoding='utf8') as f:
        if count%2==0:
            f.write(i+'\n')
        else :
            f.write(i+' ')
```

下面就两种解决办法了

+ 方法一：

	+ 直接使用工具`gnuplot`读取坐标画图

		```shell
		plot '4667.txt'
		```

+ 方法二：

	+ 使用python脚本画图

		```python
		from PIL import Image  # 用于图像操作
		img = Image.new('RGB', (900, 150), (255, 255, 255))  # 创建900x150的白色背景图
		content=[]
		with open('4667.txt','r',encoding='utf-8') as f:
		    for line in f:
		        x=int(line.split()[0])
		        y=int(line.split()[1])
		        spot=(x,y)
		        content.append(spot)
		
		for i in content:  # 遍历所有坐标
		    new = Image.new('RGB', (1, 1), (0, 0, 0))  # 创建1x1的黑色像素点
		    img.paste(new, i)  # 将黑点粘贴到坐标i处
		
		img.show()
		```

	python脚本得到的图是flag图，gnuplot得到的图需要进行上下反转

### Misc_47

这题和上题基本一样，就是图片格式改成了apng，做题思路依然是取x,y的偏移量画图

#### **apng的fctl结构**

1. **Length（4字节）**：固定为4字节，表示块的总长度（不包括CRC）。
2. **Sequence number（4字节）**：帧的序列号，是一个4字节的无符号整数，表示当前帧的编号（从0开始）。
3. **Width（4字节）**：帧的宽度，单位为像素。
4. **Height（4字节）**：帧的高度，单位为像素。
5. **x_offset（2字节）**：该帧在图像中的水平偏移位置，单位为像素。用来确定当前帧相对于原始图像的水平位置。
6. **y_offset（2字节）**：该帧在图像中的垂直偏移位置，单位为像素。用来确定当前帧相对于原始图像的垂直位置。
7. **Delay (time)（2字节）**：帧的显示时间，单位为1/100秒，表示此帧显示的时长。
8. **Disposal method（1字节）**：指示如何处理前一帧的内容。常见的值包括：
	- 0：不做任何操作。
	- 1：清除之前帧的区域。
	- 2：保留之前帧的区域。
	- 3：恢复到背景颜色。
9. **Blend method（1字节）**：指示该帧如何与背景或前一帧合成。常见的值包括：
	- 0：不合成。
	- 1：合成当前帧与前一帧。
10. **CRC（4字节）**：对 `fctl` 块数据（不包括块长度字段）进行CRC-32校验的结果。

总的来说就是fctl的长度不变，这样就方便我们取到x,y的偏移量

![image-20250208220320705](posts/57b6e4e/images/Misc_47_010.webp)

把图片文件以十六进制导出(删除所有换行和空格)，用010可以知道`fctl`的十六进制是`6663544C`,前面的fctl的结构告诉我们这个块的长度是固定的，所以写一个脚本拿到x、y偏移量并画图

```python
from PIL import Image  # 用于图像操作
img = Image.new('RGB', (900, 150), (255, 255, 255))  # 创建900x150的白色背景图
with open('misc47','r') as f:	#misc47是图片导出来的16进制文件
    data = f.read()
    content=data.split('6663544C')	#用fctl分割图片内容

count=0
pp=[]
for i in content:
    if count==0:	#第一个块不是fctl所以跳过
        count+=1
        continue
    x=i[24:32]	#固定的x、y偏移量的位置
    y=i[32:40]
    print(x,y)
    spot=(int(x,16),int(y,16))
    pp.append(spot)

print(pp)
for i in pp:
    new=Image.new('RGB', (1, 1), (0, 0, 0)) # 创建1x1的黑色像素点
    img.paste(new, i)  # 将黑点粘贴到坐标i处

img.show()
```

这个题依然可以用上一道题的`gnuplot`工具画图做，但是还要十六进制转10进制，所以还是推荐脚本一把梭

### Misc_48

题目提示是D(Di)Q(Qi)T(Ti)模块,找到DQT模块里面有提示`count FF&minus 1`意思是统计FF的数量然后减1

我这里手动统计的，也可以写脚本

```text
0 12 11 0 7 10 13 13 9 0 9 13 0 13 6 0 10 9 2 1 0 1 10 8 11 5 12 7 2 2 3 10
```

然后转换为十六进制就可以拿到flag了

```python
str1='0 12 11 0 7 10 13 13 9 0 9 13 0 13 6 0 10 9 2 1 0 1 10 8 11 5 12 7 2 2 3 10'
data=str1.split()
print(data)
flag=''
for i in data:
    flag+=str(hex(int(i)))

flag=flag.replace('0x','')
print(flag)
```

也可以直接用脚本一把梭

```python
with open('misc48', 'r') as f:	#文件是导出的十六进制，用空格替换了换行
    data = f.read().split()

counts = []
current = 0

for item in data:
    if item == 'FF':
        current += 1
    elif current:  # 遇到非FF且已有计数时
        counts.append(current - 1)
        current = 0
# 处理文件末尾可能的FF序列
if current:
    counts.append(current - 1)

# 直接取前32个有效计数（如果不足则全取）
hex_flag = ''.join(f"{n:x}" for n in counts[:32])

print(hex_flag)
```

### Misc_49

这题不懂，纯脑洞，（看Wp的）做法是FFE后面的字符就是拿到32个就行了

下面给脚本

```python
with open('misc49','r') as f:	#这个文件导出的十六进制把换行替换成了空格的
    data=f.read()
    content=data.split('FF E')

print(content)
flag=''
for i in content:
    if i=='FF D8 ':
        continue
    flag+=i[0]

print(flag[:32].lower())

```

### Misc_50

StegSlove一把梭,找到3张有flag的图片就行

### Misc_53

题目提示开始愉快的LSB部分

+ 方法一：

先用StegSlove查看一下，发现`Gray bits Blue plane 0 Green plane 0 Red plane 0`左上角有东西

![image-20250211165215244](posts/57b6e4e/images/Misc_53_StegSlove_Gray.webp)

![image-20250211165335254](posts/57b6e4e/images/Misc_53_StegSlove_Blue0.webp)

![image-20250211165425102](posts/57b6e4e/images/Misc_53_StegSlove_Green0.webp)

![image-20250211165517235](posts/57b6e4e/images/Misc_53_StegSlove_Red0.webp)

然后`Analyse`的`Data extract`把三色调到相应的plane，就可以得到flag

+ 方法二：

使用工具一把梭，随波逐流，zsteg

### Misc_54

题目提示：还是愉快的LSB部分

那我们依然用StegSlove看，发现Gray Bit左边有LSB隐写，找其他颜色，发现B0、G0、A0左侧都有LSB隐写

那我们依然用`Analyse`的`Data extract`调到对应的选项拿到flag

### Misc_55

题目提示：还是愉快的LSB部分

方法一：

+ 那我们依然用StegSlove看，发现图片是上下反转的，用工具（随波逐流）或者在线网站先把图片拨正，然后依然查看每个等级的RGBA，发现R0、G0、B0左侧有纵向隐写痕迹，得到PK开头的文件，也就是zip文件，解压拿到flag

方法二：

+ 用zsteg所有的隐写方法查看

	```shell
	zsteg -a misc55UpDownInversion.webp
	```

+ ![image-20250211192726731](posts/57b6e4e/images/Misc_55_Zsteg.webp)

用这个方法把压缩文件提取出来

```shell
zsteg -e b1,rgb,lsb,yx misc55UpDownInversion.webp > flag.zip
```

解压拿到flag

### Misc_56

题目提示：**怎么老是愉快的LSB部分。**

LSB部分依然用StegSlove查看，发现R1 2 4、G1 2 4左上侧有隐写痕迹，依然来到`Analyse`的`Data Extract`选择对应的选项拿到flag

## zsteg的用法

`zsteg` 是一个用于分析和提取图像文件（尤其是 PNG 文件）中隐写数据的工具。它主要用于图像隐写分析，可以帮助从 PNG 图像文件中提取嵌入的数据。`zsteg` 支持不同的隐写术算法，常用于数字取证和数据恢复。

### `zsteg` 常见选项及用法

以下是 `zsteg` 中常用的一些选项和说明：

####  `-v, --verbose`

启用详细输出模式，显示更多的分析信息。通常在你想要看到更多的内部过程时使用这个选项。

```
zsteg -v filename.webp
```

####  `-E, --extract`

提取图像中的隐藏信息。`-E` 选项用于从图像中提取可能嵌入的隐写数据。

```
zsteg -E filename.webp
```

#### `-e, --method`

指定分析隐写数据的算法或方法。你可以选择使用不同的隐写分析方法来测试图像。常见的方法有：

- `-e b1`：分析最不重要位（LSB，Least Significant Bit）。这是隐写数据最常见的存储方式。
- `-e b2`：分析第二个最不重要位（Second LSB）。
- `-e b3`：分析第三个最不重要位，依此类推。

例如：

```
zsteg -e b1 filename.webp
```

####  `-o, --output`

指定输出格式，可以选择输出为 `json` 格式或者 `txt` 格式。

```
zsteg -o json filename.webp
```

#### `-l, --list`

列出所有支持的隐写分析方法。使用此选项可以查看哪些分析方法可以用于图像文件。

```
zsteg -l
```

####  `-a, --all`

使用所有隐写算法分析图像文件。这可以帮助你快速地检查是否有任何隐藏数据，而不需要逐个测试每个方法。

```
zsteg -a filename.webp
```

####  `-i, --interactive`

交互式模式，允许用户与 `zsteg` 交互，并根据不同情况选择不同的分析方法。

```
zsteg -i filename.webp
```

####  `-p, --png`

强制将图像文件当作 PNG 文件处理。即使文件的扩展名不是 `.webp`，也会强制以 PNG 格式分析。

```
zsteg -p filename.jpeg
```

####  `-C, --color`

启用颜色输出，这将使输出更加生动和易于理解。适合在终端中查看时使用。

```
zsteg -C filename.webp
```

####  `-f, --force`

强制 `zsteg` 分析即使文件并不是 PNG 格式。通常情况下，`zsteg` 仅支持 PNG 文件，但使用 `-f` 可以强制进行其他格式的分析（如 BMP 或其他位图文件）。

```
zsteg -f filename.bmp
```

####  `--password`

如果你知道图像文件中可能存在加密的隐写数据并且需要密码来提取它，可以使用此选项。

```
zsteg --password 'yourpassword' filename.webp
```

### 实例用法

#### 示例 1：分析 PNG 文件并提取隐藏数据

```
zsteg -E example.webp
```

#### 示例 2：使用最不重要位（LSB）分析图像

```
zsteg -e b1 example.webp
```

#### 示例 3：列出所有支持的隐写分析方法

```
zsteg -l
```

#### 示例 4：以交互模式分析图像

```shell
zsteg -i example.webp
```

#### 一般用法

使用之前得到的隐写信息将其提取出来

```bash
zsteg -E 'outputMessage' example.webp > output
```

然后再用binwalk分离

```shell
binwlak -e output --run-as=root
```

## ExifTool的用法

**ExifTool** 是一个强大的命令行工具，用于读取、编写和编辑图像、音频、视频文件的元数据（Exif、IPTC、XMP 等）。它支持多种文件格式，广泛应用于数字图像处理、摄影和文件管理等领域。

### ExifTool 的基本用法

1. **查看文件的元数据**
	使用 ExifTool 可以查看图像或其他文件的详细元数据。

	```bash
	exiftool filename.jpg
	```

	这将显示 `filename.jpg` 文件中的所有元数据（例如，拍摄时间、相机型号、GPS 信息等）。

2. **查看某些特定的元数据字段**
	如果你只想查看某些特定的元数据字段（例如，拍摄日期和相机型号），可以指定要查看的标签。

	```bash
	exiftool -DateTimeOriginal -Model filename.jpg
	```

	这将仅显示文件的拍摄时间和相机型号。

3. **编辑元数据**
	ExifTool 还允许你修改图像文件的元数据。例如，修改文件的日期时间信息：

	```shell
	exiftool -DateTimeOriginal="2025:01:19 10:00:00" filename.jpg
	```

	这将把 `filename.jpg` 文件的拍摄时间设置为 "2025:01:19 10:00:00"。

4. **批量修改多个文件**
	你可以一次性对多个文件进行操作。比如，修改所有 `.jpg` 文件的日期时间：

	```bash
	exiftool -DateTimeOriginal="2025:01:19 10:00:00" *.jpg
	```

5. **删除文件的元数据**
	如果你希望从图像文件中删除所有元数据，可以使用以下命令：

	```shell
	exiftool -all= filename.jpg
	```

	这将删除 `filename.jpg` 文件中的所有元数据。

6. **导出元数据到文本文件**
	如果你希望将文件的元数据保存到文本文件中，可以使用 `-w` 选项：

	```shell
	exiftool -w txt filename.jpg
	```

	这将把 `filename.jpg` 的元数据保存到一个名为 `filename.txt` 的文本文件中。

7. **批量删除目录中所有文件的元数据**
	如果你想删除目录中所有图片的元数据，可以使用 `-r` 选项递归处理目录：

	```shell
	exiftool -r -all= /path/to/directory
	```

8. **获取图像的 GPS 信息**
	查看图片的 GPS 坐标信息：

	```shell
	exiftool -GPSLatitude -GPSLongitude filename.jpg
	```

9. **转换图片的元数据格式**
	ExifTool 支持从图片文件中提取并输出为其他格式。例如，导出为 JSON 格式：

	```shell
	exiftool -json filename.jpg
	```

#### 常见选项和标签

- `-Model`：显示或修改相机型号。
- `-DateTimeOriginal`：显示或修改拍摄时间。
- `-ExposureTime`：显示曝光时间。
- `-GPSLatitude`、`-GPSLongitude`：显示 GPS 坐标。
- `-FileName`：显示或修改文件名。
- `-Title`：显示或修改文件的标题。

## pngcheck的用法

**`pngcheck`** 是一个用来检查和验证 PNG 文件的工具，能够显示 PNG 文件的元数据、每个 chunk（数据块）及其详细信息，并可以检测文件是否损坏。

### **基本用法**

```shell
pngcheck [选项] 文件.webp
```

### **常用选项说明**

- `-v` 或 `--verbose`

	- 显示详细的 chunk 信息和 PNG 文件内部的结构。

	- 示例：

		```
		pngcheck -v image.webp
		```

	- 这将会显示该 PNG 文件的所有 chunk 的详细信息，包括每个 chunk 的类型和大小。

- `-t` 或 `--text`

	- 显示 PNG 文件中的文本信息（例如 tEXt、zTXt chunk 信息）。

	- 示例：

		```
		pngcheck -t image.webp
		```

- `-c` 或 `--checksum`

	- 检查 PNG 文件的 CRC 校验和是否正确。

	- 示例：

		```
		pngcheck -c image.webp
		```

- `-q` 或 `--quiet`

	- 只输出基本信息，不显示额外的详细内容或错误信息。

	- 示例：

		```
		pngcheck -q image.webp
		```

- `-o` 或 `--outdir`

	- 设置输出目录，常用于批量处理图片文件时。

	- 示例：

		```
		pngcheck -o output_dir image.webp
		```

### **常见输出说明**

运行 `pngcheck -v image.webp` 时，输出将包含以下内容：

- 文件的基本信息：
	- 文件的版本、大小等。
- 每个 chunk 的详细信息：
	- 每个 chunk 的类型（如 `IHDR`、`PLTE`、`tEXt` 等）。
	- 每个 chunk 的长度。
	- 每个 chunk 的校验和是否正确。
	- 如果 chunk 是文本类型（如 `tEXt` 或 `zTXt`），会显示文本内容。

### **示例**

1. 检查文件并查看详细信息：

	```
	pngcheck -v your-image.webp
	```

	输出将会显示文件的各个 chunk，包括 `IHDR`（头部信息）、`IDAT`（图像数据）、`IEND`（结束）等。

2. 查看文本信息（tEXt 和 zTXt）：

	```
	pngcheck -t your-image.webp
	```

	输出将显示文件中的文本信息。

3. 检查 PNG 文件的完整性：

	```
	pngcheck -c your-image.webp
	```

## mdadm的用法

### `mdadm` 常见选项及作用

1. **`--create`**
	用于创建一个新的 RAID 阵列。

	```
	mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sda /dev/sdb
	```

	创建一个 RAID 1 阵列，包含两个设备 `/dev/sda` 和 `/dev/sdb`。

2. **`--assemble`**
	用于组装现有的 RAID 阵列，恢复已经存在的 RAID 阵列。

	```
	mdadm --assemble /dev/md0 /dev/sda /dev/sdb
	```

	组装一个 RAID 阵列 `/dev/md0`，其成员为 `/dev/sda` 和 `/dev/sdb`。

3. **`--stop`**
	停止一个 RAID 阵列，解除 RAID 阵列的活动状态。

	```
	mdadm --stop /dev/md0
	```

	停止并卸载 RAID 阵列 `/dev/md0`。

4. **`--add`**
	向现有的 RAID 阵列添加一个新的磁盘。

	```
	mdadm --add /dev/md0 /dev/sdc
	```

	向阵列 `/dev/md0` 添加磁盘 `/dev/sdc`。

5. **`--remove`**
	从 RAID 阵列中移除一个磁盘。

	```
	mdadm --remove /dev/md0 /dev/sdb
	```

	从阵列 `/dev/md0` 中移除磁盘 `/dev/sdb`。

6. **`--fail`**
	将 RAID 阵列中的一个磁盘标记为故障。

	```
	mdadm --fail /dev/md0 /dev/sdb
	```

	将磁盘 `/dev/sdb` 标记为故障。

7. **`--grow`**
	动态调整 RAID 阵列的大小或增加磁盘。可以增加 RAID 阵列的设备数量或改变 RAID 类型。

	```
	mdadm --grow /dev/md0 --raid-devices=3
	```

	增加阵列 `/dev/md0` 的设备数量到 3。

8. **`--monitor`**
	启动对 RAID 阵列的监控，通常会定期检查阵列状态并发送通知。

	```
	mdadm --monitor /dev/md0
	```

	启动对 RAID 阵列 `/dev/md0` 的监控。

9. **`--detail`**
	查看一个阵列的详细状态信息，包括成员磁盘、同步状态、阵列级别等。

	```
	mdadm --detail /dev/md0
	```

	显示 RAID 阵列 `/dev/md0` 的详细信息。

10. **`--backup`**
	 备份 RAID 阵列的元数据。

	```
	mdadm --backup /dev/md0 > backup.txt
	```

	将 `/dev/md0` 阵列的元数据备份到 `backup.txt` 文件中。

11. **`--zero-superblock`**
	 清除磁盘上的 RAID 元数据（superblock），使该磁盘不再属于任何 RAID 阵列。

	```
	mdadm --zero-superblock /dev/sda
	```

	删除磁盘 `/dev/sda` 上的 RAID 元数据。

12. **`--scan`**
	 扫描系统中的所有 RAID 阵列，并显示它们的状态。

	```
	mdadm --scan
	```

	自动扫描并显示所有已配置的 RAID 阵列。

13. **`--config`**
	 用于指定一个自定义的配置文件，通常用来加载 `mdadm` 的配置文件。

	```
	mdadm --config=/etc/mdadm.conf --assemble /dev/md0
	```

	使用指定的配置文件来组装 RAID 阵列。

14.`--examine`

​	用于检查一个或一列RAID文件的属性

```shell
 mdadm --examine /dev/loop1 /dev/loop2 /dev/loop3 /dev/loop4 /dev/loop5
```

## ImageMagick的用法

### 基本命令介绍

1. **创建图像**

	使用 `magick` 命令加上特定标识符来创建一个新图像文件。例如，创建一个名为 logo.gif 的空白 GIF 图像文件：

	```
	magick logo: logo.gif
	```

2. **获取图像信息**

	使用 `identify` 命令来获取有关图像的信息，如尺寸、格式等：

	```
	magick identify logo.gif
	```

3. **转换图像格式**

	使用 `convert` 命令将一种格式的图像转换为另一种格式。例如，将 PNG 文件转换为 ICO 格式图标：

	```
	magick convert macaw.webp -resize 256x256 macaw.ico
	```

4. **SVG 转 PNG 并设置透明背景**

	将 SVG 文件转换为 PNG 格式，并确保背景是透明的

	```
	magick -background none FFmpeg.svg FFmpeg.webp
	```

5. **批量处理图像**

	使用 `mogrify` 命令对多个图像执行相同的操作。例如，将指定目录下的所有 PNG 图像调整大小并转换为 ICO 文件：

	```
	magick mogrify -path "output/path" -format ico -resize 256x256 "*.webp"
	```

6. **添加边框或效果**

	给图像添加边框或者应用其他效果。例如，给图片添加红色边框：

	```
	magick input.jpg -bordercolor red -border 10 output.jpg
	```

7. **调整大小**

	调整图像大小到特定宽度和高度。例如，将图像调整为 800x600 像素：

	```
	magick input.jpg -resize 800x600 output.jpg
	```

8. **旋转图像**

	指定角度来旋转图像。例如，顺时针旋转 90 度：

	```
	magick input.jpg -rotate 90 output.jpg
	```

9. **合并图像**

	使用 `-append` 或 `+append` 来垂直或水平拼接多张图像。例如，垂直拼接两张图像：

	```
	magick image1.jpg image2.jpg -append combined.jpg
	```



## StegSlove的用法

主要讲解一下Analyse的各个选项

```text
File Format:文件格式
Data Extract:数据提取
Steregram Solve:立体试图 
Frame Browser:帧浏览器
Image Combiner:拼图 
```

1. 文件格式：
	+ 就是看图片文件的具体信息的，这个大部分工具都可以做到（这里不细讲）
2. 数据提取：
	+ 左边主要是RGBA（Alpha是透明度）的颜色通道
	+ R的数字越大，则代表红色亮度越高；R的数字越小，则代表红色亮度越低。G，B同理。R的亮度各有256个级别，GB同理。即从0到255，合计为256个。从数字0到255的逐渐增高，我们人眼观察到的就是亮度越来越大，红色、绿色或蓝色越来越亮。然而256是2的8次方 所以你会看见上图的0~7， 一共8个通道。
	+ alpha的值为0就是全透明，alpha 的值为 255 则表示不透明
	+ 右半部分就是Extra By(额外的)和Bit Order（位顺序）和Bit Plane Order（位平面的顺序）
	+ Row横向隐写，column纵向隐写
	+ MSB最高位隐写，LSB最低位隐写
	+ RGB/RGBA顺序：按颜色通道顺序提取（如先R通道的所有位，再G通道，最后B通道）。
3. 立体试图：
	+ 可以左右控制偏移
4. 帧浏览器：
	+ 主要是对GIF之类的动图进行分解
5. 拼图：
	+ 可以把两个图片进行XOR（通常用于生成反相图像或混合图像）、OR（常用于高亮显示某些区域，或者合成不同图像的部分区域）、AND（通常用于图像的遮罩操作，保留某些区域并将其他区域设为透明或黑色）等操作，以便于发现两张类似图片中隐含的信息



## Misc题小技巧

每个比赛都会给他的flag格式可以先转换格式前半段的十六进制和二进制 ，在拿到奇怪的字符串时或有规律的节奏时，可以先行比对

+ 例如：
	+ `ctfshow{`的十六进制是`63 74 66 73 68 6f 77 7b`或`63746673686f777b`或`63h74667368h6F777B`
	+ ctfshow{的二进制是`01100011 01110100 01100110 01110011 01101000 01101111 01110111 01111011`