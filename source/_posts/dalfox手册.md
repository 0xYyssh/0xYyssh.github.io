---
title: dalfox手册
abbrlink: 937811a0
date: 2026-03-08 17:07:36
tags:
  - xss
  - 工具
categories:
  - 工具分享
---

## dalfox介绍

  有攻击就有脚本，有脚本就有工具。这是目前为止，我找到的xss里面，一个比较好用的工具了。网络上鼓吹的XSStrike，我个人觉得并不好用。Dalfox是一个强大的开源XSS（跨站脚本）扫描工具，专注于自动化漏洞检测和参数分析  。它的名称中"Dal"是韩语"月亮"的意思，"Fox"代表"XSS查找器"。

## dalfox下载安装

  如果你不追求最新的改动，直接下载release版本就可以了。

[hahwul/dalfox: 🌙🦊 Dalfox is a powerful open-source XSS scanner and utility focused on automation.](https://github.com/hahwul/dalfox)

  在release版本中，根据自己的电脑架构选择对应的版本即可，darwin是macos，amd是大多数笔记本电脑的架构，也就是x64。我个人下载的是release版本中的win_x64，开箱即用（打开是一个exe文件），无需配置环境。

## dalfox使用

### 基础选项

`url`:指定URL扫描（这个exe我改名了,原先的太长了）

```shell
dalfox.exe url http://192.168.20.128:3000/level/6
```

![image-20260308115752986](posts/937811a0/images/image-20260308115752986.webp)

+ 我可以说这个输出界面已经做了非常友好了(请求方法、并发、性能、默认启用的挖掘方式、超时、重定向、开始时间)
+ POC直接在界面输出了，我们直接点击即可测试是否正确，注入点的位置也给出了

`file`:从文件读取请求进行注入/从文件中读取url列表进行注入（对每个url进行注入）

```shell
dalfox.exe file ./target/test.txt --rawdata --http
```

+ 输出图片和url是一样的输出，这里我就不粘图了
+ `--rawdata`：代表是原始的http数据
+ `--http`:强制使用http(本地的测试网站，没有https)

从文件中读取url列表进行注入:

```shell
dalfox.exe file ./target/urls.txt
```

```text
http://192.168.20.128:3000/level/1
http://192.168.20.128:3000/level/2
http://192.168.20.128:3000/level/3
```

![image-20260308122637957](posts/937811a0/images/image-20260308122637957.webp)

`sxss`:进行存储型xss注入，因为存储型，如果没有人浏览，就属于盲打了，所以需要一个callback地址(**个人觉得如果有反射性xss，之后再确定为存储型xss，之后再用手注**)，选择工具进行存储型xss注入，需要根据工具修改请求，或者修改你接收请求的文件

```shell
dalfox.exe sxss http://192.168.20.128:3000/level/2 --trigger http://vps
```

`payload`:用于生成payload

```shell
dalfox.exe payload --enum-common
```

+ `--enum-common`：枚举常见payload
+ 更多的枚举看文章下面的payload模式手册，或者直接ctrl+f查找，例如：html内

![image-20260308154224641](posts/937811a0/images/image-20260308154224641.webp)

`pipe`:与shell脚本一起使用，如下：

```shell
nmap -p 80,443 192.168.1.0/24 | grep open | dalfox pipe
cat targets.txt | dalfox pipe -H "Authorization: Bearer token"
```

+ 适合在linux模式，快速与管道符相配合

`server`:与api模式相结合，适合自动化扫描

```shell
# 启动REST API服务器  
dalfox server --host 0.0.0.0 --port 8090  
  
# 提交扫描任务  
curl -X POST "http://localhost:8090/scan" \  
  -H "Content-Type: application/json" \  
  -d '{"url": "https://example.com"}'  
  
# 获取扫描结果  
curl -X GET "http://localhost:8090/result/SCAN_ID"
```

- `/scan`：提交扫描任务
- `/result/:id`：获取扫描结果
- `/status/:id`：检查扫描状态
- `/stop/:id`：停止扫描任务

### 请求选项

`-C cookie`:使用自定义的cookie

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 -C "username=admin"
```

`-H header`:使用自定义的http头

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 -H "Authorization: Bearer"
```

`-X PUT`:指定请求方法（默认为GET）

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 -X "PUT"
```

`--user-agent`:指定UA

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --user-agent="yyssh"
```

`--proxy`:指定代理

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --proxy="http://127.0.0.1:8080"
```

`--delay`:请求延迟（毫秒）

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --delay="1000"
```

`-w`:并发数量，默认（100）

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 -w 1
```

+ sxss模式默认是并发1进行测试的

`--timeout`:请求超时,默认(10s)

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --timeout="20"
```

### 字典选项

`--remote-payloads string`：加载portswigger, payloadbox进行测试

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --remote-payloads="portswigger"
dalfox.exe url http://192.168.20.128:3000/level/6 --remote-payloads="payloadbox"
```

`--remote-wordlists`:加载burp, assetnote进行web参数fuzz

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --remote-wordlists="burp" 
```

+ 使用这些远程的字典确实是比工具自带的字典要大，但是花费时间也更多，看个人取舍吧

`-W wordlist.txt`:使用自定义的web参数字典fuzz

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 -W "./myWord.txt"
```

`--custom-payload`:使用自定义的xss字典

```shell
dalfox.exe url http://192.168.20.128:3000/level/6  --custom-payload="./xss.txt"
```

+ `--only-custom-payload`:只用自定义的字典进行扫描，默认是自定义加上工具字典的字典扫描

### 扫描选项

`--context-aware`:使用上下文感知

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --context-aware
```

`--deep-domxss`:使用更多的dom测试

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --deep-domxss
```

`--detailed-analysis`:启用详细的参数分析

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --detailed-analysis
```

`--force-headless-verification`:强行启用无头浏览器验证

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --force-headless-verification
```

+ 无头浏览器是指没有GUI界面的浏览器，本工具采用的chrome浏览器的内核和无头浏览器来提供验证率

`-p`:指定参数测试

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 -p "q"
```

`--waf-evasion`:检测到waf时，自动降低速度

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --waf-evasion
```

### 常用命令

#### ctf

```shell
dalfox.exe url http://192.168.20.128:3000/level/6 --deep-domxss --detailed-analysis --context-aware --remote-payloads="portswigger,payloadbox" --remote-wordlists="burp,assetnote"
```

如果需要cookie等，则进行file文件读取

```shell
dalfox.exe file ./target/test.txt --rawdata --http --deep-domxss --detailed-analysis --context-aware --remote-payloads="portswigger" --remote-wordlists="burp"
```

#### 真实网站

  真实网站一旦涉及到攻击，不建议使用工具，统一建议使用手注

```shell
dalfox.exe url file ./target/test.txt --rawdata --waf-evasion
```

## 帮助手册翻译

### 通用模式手册

```text
**Usage:** dalfox [flags] [command]
**用法：** dalfox [选项] [命令]

**Available Commands:**
**可用命令：**
  completion  Generate the autocompletion script for the specified shell
  completion  为指定的 shell 生成自动补全脚本
  file        Use file mode (targets list or raw HTTP request data)
  file        使用文件模式（目标列表或原始 HTTP 请求数据）
  payload     Payload mode, make and enum payloads
  payload     有效载荷模式，生成和枚举有效载荷
  pipe        Use pipeline mode
  pipe        使用管道模式
  server      Start API Server
  server      启动 API 服务器
  sxss        Use Stored XSS mode
  sxss        使用存储型 XSS 模式
  url         Use single target mode
  url         使用单个目标模式
  version     Show version
  version     显示版本信息

**Input:**
**输入：**
      --config string                     Load configuration from a file. 
      									  Example: --config 'config.json'
      --config string                     从文件加载配置。
      									  示例：--config 'config.json'
      --custom-blind-xss-payload string   Load custom blind XSS payloads from a file. 
      									  Example: --custom-blind-xss-payload 'payloads.txt'
      --custom-blind-xss-payload string   从文件加载自定义盲 XSS 有效载荷。
      									  示例：--custom-blind-xss-payload 'payloads.txt'
      --custom-payload string             Load custom payloads from a file. 
      									  Example: --custom-payload 'payloads.txt'
      --custom-payload string             从文件加载自定义有效载荷。
      									  示例：--custom-payload 'payloads.txt'
  -d, --data string                       Use POST method and add body data. 
      									  Example: -d 'username=admin&password=admin'
  -d, --data string                       使用 POST 方法并添加请求体数据。
      									  示例：-d 'username=admin&password=admin'
      --grep string                        Use a custom grepping file. 
      									  Example: --grep './samples/sample_grep.json'
      --grep string                        使用自定义的 grep 文件。
      									  示例：--grep './samples/sample_grep.json'
      --har-file-path string              Specify the path to save HAR files of scan requests. 
      									  Example: --har-file-path 'scan.har'
      --har-file-path string               指定保存扫描请求 HAR 文件的路径。
      									  示例：--har-file-path 'scan.har'
      --remote-payloads string            Use remote payloads for XSS testing. 
      									  Supported: portswigger, payloadbox. 
      									  Example: --remote-payloads 'portswigger,payloadbox'
      --remote-payloads string             使用远程有效载荷进行 XSS 测试。
      									  支持的来源：portswigger, payloadbox。
      									  示例：--remote-payloads 'portswigger,payloadbox'
      --remote-wordlists string           Use remote wordlists for parameter mining. 
      									  Supported: burp, assetnote. 
      									  Example: --remote-wordlists 'burp'
      --remote-wordlists string            使用远程单词列表进行参数挖掘。
      									  支持的来源：burp, assetnote。
      									  示例：--remote-wordlists 'burp'

**Request:**
**请求：**
  -C, --cookie string            Add custom cookies to the request. 
      						     Example: -C 'sessionid=abc123'
  -C, --cookie string            向请求中添加自定义 Cookie。
      						     示例：-C 'sessionid=abc123'
      --cookie-from-raw string   Load cookies from a raw HTTP request file. 
      						     Example: --cookie-from-raw 'request.txt'
      --cookie-from-raw string   从原始 HTTP 请求文件中加载 Cookie。
      						     示例：--cookie-from-raw 'request.txt'
  -H, --header strings           Add custom headers to the request. 
      						     Example: -H 'Authorization: Bearer <token>'
  -H, --header strings           向请求中添加自定义请求头。
      						     示例：-H 'Authorization: Bearer <token>'
  -X, --method string            Override the HTTP method. 
      						     Example: -X 'PUT' (default "GET")
  -X, --method string            覆盖 HTTP 方法。
      						     示例：-X 'PUT' (默认为 "GET")
      --user-agent string        Set a custom User-Agent header. 
      						     Example: --user-agent 'Mozilla/5.0'
      --user-agent string        设置自定义的 User-Agent 请求头。
      						     示例：--user-agent 'Mozilla/5.0'

**Scanning:**
**扫描：**
  -b, --blind string                  Specify a blind XSS callback URL. 
      							      Example: -b 'https://your-callback-url.com'
  -b, --blind string                  指定一个盲 XSS 回调 URL。
      							      示例：-b 'https://your-callback-url.com'
      --context-aware                 Enable context-aware payload selection for better XSS detection. 
      							      Example: --context-aware
      --context-aware                 启用上下文感知的有效载荷选择，以获得更好的 XSS 检测效果。
      							      示例：--context-aware
      --deep-domxss                   Enable deep DOM XSS testing with more payloads (slow). 
      							      Example: --deep-domxss
      --deep-domxss                   启用深度 DOM XSS 测试，使用更多有效载荷（速度较慢）。
      							      示例：--deep-domxss
      --delay int                     Set the delay between requests to the same host in milliseconds. 
      							      Example: --delay 1000
      --delay int                     设置对同一主机发起请求之间的延迟时间（毫秒）。
      							      示例：--delay 1000
      --detailed-analysis             Enable detailed parameter analysis for better XSS detection. 
      							      Example: --detailed-analysis
      --detailed-analysis             启用详细的参数分析，以获得更好的 XSS 检测效果。
      							      示例：--detailed-analysis
      --fast-scan                     Enable fast scanning mode for URL lists. 
      							      Example: --fast-scan
      --fast-scan                     为 URL 列表启用快速扫描模式。
      							      示例：--fast-scan
      --force-headless-verification   Force headless browser-based verification, 
      							      useful when automatic detection fails or to override default behavior. 
      							      Example: --force-headless-verification
      --force-headless-verification   强制使用基于无头浏览器的验证，
      							      当自动检测失败或需要覆盖默认行为时很有用。
      							      示例：--force-headless-verification
      --ignore-param strings          Ignore specific parameters during scanning. 
      							      Example: --ignore-param 'api_token' --ignore-param 'csrf_token'
      --ignore-param strings          在扫描过程中忽略特定的参数。
      							      示例：--ignore-param 'api_token' --ignore-param 'csrf_token'
      --magic-char-test               Enable magic character testing for manual XSS analysis. 
      							      Example: --magic-char-test
      --magic-char-test               为手动 XSS 分析启用魔法字符测试。
      							      示例：--magic-char-test
      --only-custom-payload           Only test custom payloads. 
      							      Example: --only-custom-payload
      --only-custom-payload            仅测试自定义有效载荷。
      							      示例：--only-custom-payload
  -p, --param strings                 Specify parameters to test. 
      							      Example: -p 'username' -p 'password'
  -p, --param strings                 指定要测试的参数。
      							      示例：-p 'username' -p 'password'
      --skip-bav                      Skip Basic Another Vulnerability (BAV) analysis. 
      							      Example: --skip-bav
      --skip-bav                       跳过基本其他漏洞（BAV）分析。
      							      示例：--skip-bav
      --skip-discovery                Skip the entire discovery phase, proceeding directly to XSS scanning. 
      							      Requires -p flag to specify parameters. 
      							      Example: --skip-discovery -p 'username'
      --skip-discovery                 跳过整个发现阶段，直接进行 XSS 扫描。
      							      需要 -p 参数指定参数。
      							      示例：--skip-discovery -p 'username'
      --skip-grepping                 Skip built-in grepping. 
      							      Example: --skip-grepping
      --skip-grepping                  跳过内置的 grep 功能。
      							      示例：--skip-grepping
      --skip-headless                 Skip headless browser-based scanning 
      							      (DOM XSS and inJS verification). 
      							      Example: --skip-headless
      --skip-headless                   跳过基于无头浏览器的扫描
      							      （DOM XSS 和 JavaScript 内验证）。
      							      示例：--skip-headless
      --skip-mining-all               Skip all parameter mining. 
      							      Example: --skip-mining-all
      --skip-mining-all                 跳过所有参数挖掘。
      							      示例：--skip-mining-all
      --skip-mining-dict              Skip dictionary-based parameter mining. 
      							      Example: --skip-mining-dict
      --skip-mining-dict                跳过基于字典的参数挖掘。
      							      示例：--skip-mining-dict
      --skip-mining-dom               Skip DOM-based parameter mining. 
      							      Example: --skip-mining-dom
      --skip-mining-dom                 跳过基于 DOM 的参数挖掘。
      							      示例：--skip-mining-dom
      --skip-xss-scanning             Skip XSS scanning. 
      							      Example: --skip-xss-scanning
      --skip-xss-scanning               跳过 XSS 扫描。
      							      示例：--skip-xss-scanning
      --timeout int                   Set the request timeout in seconds. 
      							      Example: --timeout 10 (default 10)
      --timeout int                    设置请求超时时间（秒）。
      							      示例：--timeout 10 (默认为 10)
      --use-bav                       Enable Basic Another Vulnerability (BAV) analysis. 
      							      Example: --use-bav
      --use-bav                        启用基本其他漏洞（BAV）分析。
      							      示例：--use-bav
      --waf-evasion                   Enable WAF evasion by adjusting speed 
      							      when detecting WAF (worker=1, delay=3s). 
      							      Example: --waf-evasion
      --waf-evasion                    启用 WAF 绕过，检测到 WAF 时调整速度
      							      （并发数=1，延迟=3秒）。
      							      示例：--waf-evasion
  -w, --worker int                    Set the number of concurrent workers. 
      							      Example: -w 100 (default 100)
  -w, --worker int                     设置并发工作线程的数量。
      							      示例：-w 100 (默认为 100)

**Mining:**
**挖掘：**
      --mining-dict               Enable dictionary-based parameter mining. 
      						      Example: --mining-dict (default true)
      --mining-dict                启用基于字典的参数挖掘。
      						      示例：--mining-dict (默认为 true)
  -W, --mining-dict-word string   Specify a custom wordlist file for parameter mining. 
      						      Example: -W 'wordlist.txt'
  -W, --mining-dict-word string   为参数挖掘指定自定义的单词列表文件。
      						      示例：-W 'wordlist.txt'
      --mining-dom                Enable DOM-based parameter mining. 
      						      Example: --mining-dom (default true)
      --mining-dom                 启用基于 DOM 的参数挖掘。
      						      示例：--mining-dom (默认为 true)

**Output:**
**输出：**
      --format string          Set the output format. 
      						   Supported: plain, json, jsonl. 
      						   Example: --format 'json' (default "plain")
      --format string          设置输出格式。
      						   支持的格式：plain, json, jsonl。
      						   示例：--format 'json' (默认为 "plain")
      --no-color               Disable colorized output. 
      						   Example: --no-color
      --no-color               禁用彩色输出。
      						   示例：--no-color
      --no-spinner             Disable spinner animation. 
      						   Example: --no-spinner
      --no-spinner             禁用旋转动画。
      						   示例：--no-spinner
      --only-poc string        Show only the PoC code for the specified pattern. 
      						   Supported: g (grep), r (reflected), v (verified). 
      						   Example: --only-poc 'g,v'
      --only-poc string        仅显示指定模式的POC。
      						   支持的模式：g (grep), r (反射型), v (已验证)。
      						   示例：--only-poc 'g,v'
  -o, --output string          Write output to a file. 
      						   Example: -o 'output.txt'
  -o, --output string          将输出写入文件。
      						   示例：-o 'output.txt'
      --output-all             Enable all log write mode (output to file or stdout). 
      						   Example: --output-all
      --output-all             启用所有日志写入模式（输出到文件或标准输出）。
      						   示例：--output-all
      --output-request         Include raw HTTP requests in the results. 
      						   Example: --output-request
      --output-request         在结果中包含原始 HTTP 请求。
      						   示例：--output-request
      --output-response        Include raw HTTP responses in the results. 
      						   Example: --output-response
      --output-response        在结果中包含原始 HTTP 响应。
      						   示例：--output-response
      --poc-type string        Select the PoC type. 
      						   Supported: plain, curl, httpie, http-request. 
      						   Example: --poc-type 'curl' (default "plain")
      --poc-type string        选择概念验证类型。
      						   支持的类型：plain, curl, httpie, http-request。
      						   示例：--poc-type 'curl' (默认为 "plain")
      --report                 Show detailed report. 
      						   Example: --report
      --report                 显示详细报告。
      						   示例：--report
      --report-format string   Set the format of the report. 
      						   Supported: plain, json, markdown, md. 
      						   Example: --report-format 'json' (default "plain")
      --report-format string   设置报告的格式。
      						   支持的格式：plain, json, markdown, md。
      						   示例：--report-format 'json' (默认为 "plain")
  -S, --silence                Only print PoC code and progress. 
      						   Example: -S
  -S, --silence                仅打印POC和进度。
      						   示例：-S

**Advanced:**
**高级：**
      --custom-alert-type string    Set a custom alert type. 
      							    Example: --custom-alert-type 'str,none' (default "none")
      --custom-alert-type string    设置自定义的告警类型。
      							    示例：--custom-alert-type 'str,none' (默认为 "none")
      --custom-alert-value string   Set a custom alert value. 
      							    Example: --custom-alert-value 'document.cookie' (default "1")
      --custom-alert-value string   设置自定义的告警值。
      							    示例：--custom-alert-value 'document.cookie' (默认为 "1")
      --debug                       Enable debug mode and save all logs. 
      							    Example: --debug
      --debug                       启用调试模式并保存所有日志。
      							    示例：--debug
  -F, --follow-redirects            Follow HTTP redirects. 
      							    Example: -F
  -F, --follow-redirects            跟随 HTTP 重定向。
      							    示例：-F
      --found-action string         Execute a command when a vulnerability is found. 
      							    Example: --found-action './notify.sh'
      --found-action string         当发现漏洞时执行一个命令。
      							    示例：--found-action './notify.sh'
      --found-action-shell string   Specify the shell to use for the found action. 
      							    Example: --found-action-shell 'bash' (default "bash")
      --found-action-shell string   指定用于发现漏洞后执行操作的 shell。
      							    示例：--found-action-shell 'bash' (默认为 "bash")
      --ignore-return string        Ignore specific HTTP return codes. 
      							    Example: --ignore-return '302,403,404'
      --ignore-return string        忽略特定的 HTTP 返回码。
      							    示例：--ignore-return '302,403,404'
      --max-cpu int                 Set the maximum number of CPUs to use. 
      							    Example: --max-cpu 1 (default 1)
      --max-cpu int                 设置使用的最大 CPU 数量。
      							    示例：--max-cpu 1 (默认为 1)
      --only-discovery              Only perform parameter analysis, skip XSS scanning. 
      							    Example: --only-discovery
      --only-discovery              仅执行参数分析，跳过 XSS 扫描。
      							    示例：--only-discovery
      --proxy string                Send all requests through a proxy server. 
      							    Example: --proxy 'http://127.0.0.1:8080'
      --proxy string                通过代理服务器发送所有请求。
      							    示例：--proxy 'http://127.0.0.1:8080'

**Local Flags:**
**本地选项：**
      --har               [FORMAT] Use HAR format. 
                          Example: --har
      --har               [格式] 使用 HAR 格式。
                          示例：--har
  -h, --help              help for file
  -h, --help              显示 file 命令的帮助信息
      --http              Force HTTP on raw data mode. 
                          Example: --http
      --http             在原始数据模式下强制使用 HTTP。
                          示例：--http
      --limit int         Limit the number of results to display. 
                          Example: --limit 10
      --limit int        限制显示的结果数量。
                          示例：--limit 10
      --mass              Enable parallel scanning in N*Host mode (only shows PoC code). 
                          Example: --mass
      --mass             启用 N*Host 模式的并行扫描（仅显示POC）。
                          示例：--mass
      --mass-worker int   Set the number of parallel workers for --mass and --multicast options. 
                          Example: --mass-worker 10 (default 10)
      --mass-worker int  为 --mass 和 --multicast 选项设置并行工作线程的数量。
                          示例：--mass-worker 10 (默认为 10)
      --multicast         Enable parallel scanning in N*Host mode (only shows PoC code). 
                          Example: --multicast
      --multicast        启用 N*Host 模式的并行扫描（仅显示POC）。
                          示例：--multicast
      --rawdata           [FORMAT] Use raw data from Burp/ZAP. 
                          Example: --rawdata
      --rawdata          [格式] 使用来自 Burp/ZAP 的原始数据。
                          示例：--rawdata
      --silence-force     Only print PoC code, suppress progress output. 
                          Example: --silence-force
      --silence-force    仅打印POC，抑制进度输出。
                          示例：--silence-force
```

### payload模式手册

  大部分与通用模式手册相同，只有Local Flags选项不同

```text
**Local Flags:**
**本地选项：**
      --encoder-url            Encode output as URL. 
                              Example: --encoder-url
      --encoder-url           将输出编码为 URL 格式。
                              示例：--encoder-url
      --entity-event-handler   Enumerate event handlers for XSS. 
                              Example: --entity-event-handler
      --entity-event-handler   枚举用于 XSS 的事件处理程序。
                              示例：--entity-event-handler
      --entity-gf              Enumerate parameters from GF-Patterns for XSS. 
                              Example: --entity-gf
      --entity-gf             从 GF 模式中枚举用于 XSS 的参数。
                              示例：--entity-gf
      --entity-special-chars   Enumerate special characters for XSS. 
                              Example: --entity-special-chars
      --entity-special-chars   枚举用于 XSS 的特殊字符。
                              示例：--entity-special-chars
      --entity-useful-tags     Enumerate useful tags for XSS. 
                              Example: --entity-useful-tags
      --entity-useful-tags     枚举用于 XSS 的有用标签。
                              示例：--entity-useful-tags
      --enum-attr              Enumerate in-attribute XSS payloads. 
                              Example: --enum-attr
      --enum-attr              枚举属性内的 XSS 有效载荷。
                              示例：--enum-attr
      --enum-common            Enumerate common XSS payloads. 
                              Example: --enum-common
      --enum-common            枚举常见的 XSS 有效载荷。
                              示例：--enum-common
      --enum-html              Enumerate in-HTML XSS payloads. 
                              Example: --enum-html
      --enum-html              枚举 HTML 内的 XSS 有效载荷。
                              示例：--enum-html
      --enum-injs              Enumerate in-JavaScript XSS payloads. 
                              Example: --enum-injs
      --enum-injs              枚举 JavaScript 内的 XSS 有效载荷。
                              示例：--enum-injs
  -h, --help                   help for payload
  -h, --help                   显示 payload 命令的帮助信息
      --make-bulk              Generate bulk payloads for stored XSS. 
                              Example: --make-bulk
      --make-bulk              为存储型 XSS 生成批量有效载荷。
                              示例：--make-bulk
      --remote-payloadbox      Enumerate payloads from Payloadbox's XSS payloads. 
                              Example: --remote-payloadbox
      --remote-payloadbox      从 Payloadbox 的 XSS 有效载荷中枚举。
                              示例：--remote-payloadbox
      --remote-portswigger     Enumerate payloads from PortSwigger's XSS cheatsheet. 
                              Example: --remote-portswigger
      --remote-portswigger     从 PortSwigger 的 XSS 速查表中枚举有效载荷。
                              示例：--remote-portswigger
```

