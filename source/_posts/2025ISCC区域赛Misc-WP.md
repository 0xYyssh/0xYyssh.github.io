---
title: 2025ISCC区域赛Misc-WP
tags:
  - misc
  - WP
  - ctf比赛
categories:
  - ctf比赛
swiper_index: 1
description: >-
  ISCC出的misc题倒是各个方面都涉及到了（所以这就是你misc题套web前端出web题的理由吗？），图片隐写，音频隐写，内存取证，多多少少都考了一些，就是最近很多misc都考流量分析去了，ISCC没有出这方面的题（感觉是没有攻防经验啊，所以web出的依托），总的来说中规中矩
abbrlink: a691451b
date: 2025-05-19 12:36:20
---

# 比赛感受

ISCC出的misc题倒是各个方面都涉及到了（所以这就是你misc题套web前端出web题的理由吗？），图片隐写，音频隐写，内存取证，多多少少都考了一些，就是最近很多misc都考流量分析去了，ISCC没有出这方面的题（感觉是没有攻防经验啊，所以web出的依托），总的来说中规中矩


# Misc+返校之路

下载附件之后是两个文件

![image-20250510195600300](posts/a691451b/images/image-20250510195600300.webp)

第一个是伪加密，用高级一点的解压工具可以直接解压，没有的话，就丢进随波逐流里面一把梭

第一个压缩包打开之后是一个提示

![image-20250510195812990](posts/a691451b/images/image-20250510195812990.webp)

第二个压缩包其实硬爆破也能出来，就是耗时间，这里直接用掩码爆破快一点，掩码就是提示的bfs???

![image-20250510200011586](posts/a691451b/images/image-20250510200011586.webp)

这里用工具ARCHPR,拿到第二个压缩包密码bfsCXC

第二个压缩包打开是三张图片

1.jpg:朝阳站A

3.jpg:北京地铁线路图

查看图片描述

<img src ="/posts/a691451b/images/image-20250510200610699.webp" alt="image-20250510200610699" style="zoom: 50%;" />

提示路上换乘站数

picture2.webp:魏公村站

用zsteg获取到密文flag

![image-20250510200653450](posts/a691451b/images/image-20250510200653450.webp)

四个等号，明显就是base32加密

KIYGI6STIZFHGZCXMM6Q====

base32解密：

> R0dzSFJsdWc=

一个等号，然后再base64解密

>GGsHRlug

前面还有提示，路上换乘多少站和最开始的readme，中间经过19站，手机高德地图搜一下就出来了

<img src ="/posts/a691451b/images/2f1470ba75a4078d15d34a2d1c8f8e6.jpg" alt="2f1470ba75a4078d15d34a2d1c8f8e6" style="zoom: 25%;" />

拿到数字3104

最后结合前面的密文解密，得到最终flag

>ISCC{GGsHRlug3104}



# Misc+签个到吧

题目给了一个图片和压缩包，图片叫flag_is_not_here（那就先不看），压缩包直接丢给随波逐流

![image-20250513161155907](posts/a691451b/images/image-20250513161155907.webp)

binwalk检测到了图片，但是这里binwalk要手动分离，所以推荐使用foremost（随波逐流也有）

拿到一张png图片，丢给stegsolve看一下内容

<img src ="/posts/a691451b/images/image-20250513161550842.webp" alt="image-20250513161550842" style="zoom:50%;" />

透明度0发现有隐写

![image-20250513161749645](posts/a691451b/images/image-20250513161749645.webp)

数据分析拿到ArnoldEn Cryption,1112

丢给ai，说是猫脸变换，参数矩阵式1112，给了变换脚本

```python
import numpy as np
from PIL import Image

def arnold_decode_once(image: Image.Image, a: int = 1, b: int = -2, mode: str = '1'):
    image = np.array(image)
    N = image.shape[0]
    next_image = np.zeros_like(image)

    for x in range(N):
        for y in range(N):
            new_x = ((a * b + 1) * x - b * y) % N
            new_y = (-a * x + y) % N
            if mode == '1':
                next_image[new_x, new_y] = image[x, y]
            else:
                next_image[new_x, new_y, :] = image[x, y, :]

    return Image.fromarray(next_image)

if __name__ == '__main__':
    img = Image.open('flag.webp').convert('1')
    result_img = arnold_decode_once(img, a=1, b=-2, mode='1')
    result_img.save('flag-a1_b-2_step-1.webp')
```

拿到新的图片，类似于缺失一部分的二维码

<img src ="/posts/a691451b/images/image-20250513162150860.webp" alt="image-20250513162150860" style="zoom:50%;" />

拿到图片就有几个问题：

+ 底色问题
+ 方向问题，要与合并图片（flag_is_not_here）的方向保持一致

用随波逐流去除底色，右旋90°，再与flag_is_not_here进行异或合并，拿到最终flag图片

![image-20250513162900783](posts/a691451b/images/image-20250513162900783.webp)

扫码就能拿到flag



# Misc+取证分析

题目：

你想将压缩包中的一个文本的内容复制到word中再隐藏进一些内容，但是忘记了压缩包密码......（请为结果套上ISCC{}）
这里有个好东西：

Office文档本质上是ZIP压缩文件，包含多个文件夹和XML文件。

加上题目提示，直接把后缀改为zip，解压

![image-20250510201743558](posts/a691451b/images/image-20250510201743558.webp)

解压之后得到这四个文件和文件夹，这里说一下，office的文档构成

+ \- _rels文件夹：通常用于存储关系文件，如Office文档中的各部分之间的关系。
+ \- docProps：存放文档属性，如作者、创建时间等元数据。
+ \- word：存放Word文档的主要内容，如文本、图片、样式等。
+ \- [Content_Types].xml：定义文档中各个部分的内容类型，是Office Open XML格式的标准文件。

然后题目提示给的百度网盘文件，解压之后是

![image-20250510202016994](posts/a691451b/images/image-20250510202016994.webp)

这是一个VMware的内存镜像文件，所以我们采用volatility进行分析

先查看一下系统信息

<img src ="/posts/a691451b/images/image-20250510202215446.webp" alt="image-20250510202215446" style="zoom: 50%;" />

win7SP0的系统，接下来我们扫一下有哪些文件，并且把它提取出来

![image-20250510202649444](posts/a691451b/images/image-20250510202649444.webp)

文件提示压缩包，过滤一下zip关键字

<img src ="/posts/a691451b/images/image-20250510202735354.webp" alt="image-20250510202735354"  />

成功找到可疑zip包，使用命令把压缩包拉出来

![image-20250510202937631](posts/a691451b/images/image-20250510202937631.webp)

zip包密码直接爆破

![image-20250510203105476](posts/a691451b/images/image-20250510203105476.webp)

拿到密码bfs775，解压之后拿到三个文件

![image-20250510203208934](posts/a691451b/images/image-20250510203208934.webp)

Alphabet:

(2,10) (4,8) (2,4) (3,4) (11,13) (2,11) (1,1) (10,26) (5,6) (5,9)
杨辉三角是一种经典的数学数表，以中国古代数学家杨辉的名字命名。它是一个三角形数组，其中每个数字都是其上方两个数字的和。杨辉三角在组合数学、概率论和二项式定理等领域有广泛应用

hint:

rxms{ husqzqdq oubtqd }

密文提示直接丢进随波逐流

![image-20250510203347023](posts/a691451b/images/image-20250510203347023.webp)

拿到明文提示

> flag{vigenere cipher}

提示我们是维吉尼亚加密，密钥流应该就是Alphabet，但是我们还没有密文，回到最开始的office文档

查看 [Content_Types].xml，在注释里面找到密文

![image-20250510203629352](posts/a691451b/images/image-20250510203629352.webp)

密文：

> vbkdboopdzlt

密钥就是杨辉三角解密，直接丢给ai

转化方法:

这些坐标对通过以下步骤转化为 “IICCNJAYER”：

1. 对于每个坐标对 

	(x,y) (x, y) (x,y)

	- y y y 表示杨辉三角的行号（从 1 开始），x x x 表示该行中的位置号（从 1 开始）。
	- 计算对应的二项式系数 C(y−1,x−1) C(y-1, x-1) C(y−1,x−1)。

2. 将计算结果取模 26：即 C(y−1,x−1)mod  26 C(y-1, x-1) \mod 26 C(y−1,x−1)mod26。

3. 根据字母表映射转换为字母，其中：

	- 1 = A, 2 = B, 3 = C, ..., 9 = I, 10 = J, 14 = N, 18 = R, 25 = Y, 26 = Z。

4. 按照坐标对的顺序排列所有字母，得到最终序列。

<img src ="/posts/a691451b/images/image-20250510203913413.webp" alt="image-20250510203913413" style="zoom:33%;" />

拿到密钥

>IICCNJAYER

最后密钥维吉尼亚解密

![image-20250510204056843](posts/a691451b/images/image-20250510204056843.webp)

拿到最终flag

> ISCC{ntiboforzidl}



# Misc+睡美人

题目提示：

编织出红红红红红红绿绿绿蓝的梦幻篇章

这里先记住R:6，G:3，B:1

附件下载是一张图片（12.9MB）,这肯定不对劲啊

丢到随波逐流里面跑一下，binwalk分析有一堆东西，主要是文件尾有一个zip压缩包

![image-20250514204659440](posts/a691451b/images/image-20250514204659440.webp)

分离出来得到CD5B58.zip压缩包，前面的提示用到了

把三通道按 0.6/0.3/0.1 的权重加权，求和即可得到压缩包密码

```python
from PIL import Image

img = Image.open("Sleeping_Beauty_31.webp").convert("RGB")
sumR, sumG, sumB = 0, 0, 0
for y in range(img.height):
    for x in range(img.width):
        r, g, b = img.getpixel((x, y))
        sumR += r
        sumG += g
        sumB += b

print(f"{sumR*0.6+sumG*0.3+sumB*0.1}")
```

得到压缩包密码是：

> 1375729349.6

解压CD5B58.zip，得到一段音频，用Audacity分析一下（后段明显不正常波动）

![image-20250514212403953](posts/a691451b/images/image-20250514212403953.webp)

丢给ai，ai说是曼彻斯特编码，直接让ai帮我写exp

```python
import scipy.io.wavfile as wavfile
import numpy as np

def decode_non_standard_manchester(filename="normal_speech_31.wav",
                                   start_time_sec=6.0,
                                   segment_duration_sec=0.1):
    """
    解码非标准曼彻斯特编码的音频文件。
    
    参数:
    - filename: 音频文件名，默认为"normal_speech_31.wav"。
    - start_time_sec: 开始解码的时间点（秒），默认为6.0秒。
    - segment_duration_sec: 每个解码分段的持续时间（秒），默认为0.1秒。
    
    返回:
    - 解码后的比特序列字符串。
    """
    try:
        # 读取WAV文件
        sample_rate, data = wavfile.read(filename)
    except FileNotFoundError:
        # 文件未找到时的错误处理
        print(f"错误：文件 '{filename}' 未找到。")
        return ""
    except Exception as e:
        # 其他读取错误处理
        print(f"读取WAV文件时发生错误: {e}")
        return ""

    # 选择单声道音频信号
    if data.ndim == 2:
        audio_signal = data[:, 0]
    else:
        audio_signal = data

    # 计算开始采样点和每个分段的采样点数
    start_sample = int(start_time_sec * sample_rate)
    samples_per_segment = int(segment_duration_sec * sample_rate)

    # 检查是否有足够的音频数据进行处理
    if start_sample + samples_per_segment > len(audio_signal):
        print(f"错误：开始时间 ({start_time_sec}s) 太靠后，或音频文件太短，无法处理至少一个分段。")
        return ""

    # 初始化解码后的比特序列和当前处理位置
    decoded_bits = []
    current_pos_sample = start_sample

    # 初始化阈值（此处设为0，用于比较音频信号）
    threshold = 0
    # 打印调试信息
    print(f"采样率: {sample_rate} Hz")
    print(f"每个分段的采样点数: {samples_per_segment}")
    print(f"从采样点 {start_sample} 开始处理")
    segment_count = 0

    # 开始解码过程
    while current_pos_sample + samples_per_segment <= len(audio_signal):
        # 提取当前分段的音频数据
        segment_data = audio_signal[current_pos_sample: current_pos_sample + samples_per_segment]

        # 将音频数据转换为二进制序列
        binary_segment = (segment_data > threshold).astype(int)

        # 根据二进制序列判断解码结果
        if np.all(binary_segment == 1):
            decoded_bits.append('0')
        elif np.any(np.diff(binary_segment) == -1):
            decoded_bits.append('1')

        # 更新当前处理位置和分段计数
        current_pos_sample += samples_per_segment
        segment_count += 1

    # 打印处理的分段数量
    print(f"共处理了 {segment_count} 个分段。")
    # 返回解码后的比特序列字符串
    return "".join(decoded_bits)


if __name__ == "__main__":
    # 主程序入口
    decoded_sequence = decode_non_standard_manchester()
    if decoded_sequence:
        print("\n解码后的序列:")
        print(decoded_sequence)
```

拿到二进制的字符串，二进制转ascii码，拿到flag

<img src ="/posts/a691451b/images/image-20250514213609384.webp" alt="image-20250514213609384" style="zoom:50%;" />

ISCC{Hiding}