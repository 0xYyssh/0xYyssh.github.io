---
title: hexoLearn
tags:
  - hexo-butterfly
categories:
  - 博客美化
abbrlink: d071fe4b
date: 2026-01-04 11:15:49
---

## hexo的目录映射

  当我们下载好了hexo之后，会得到一个hexo的目录，下面是目录的解析

```markdown
your-hexo-site/
├── _config.yml          # 站点全局配置文件
├── package.json         # 依赖和脚本
├── scaffolds/           # 模板文件（post/page/draft 的默认格式）
├── source/              # 所有源内容（最终生成网站的“原料”）
│   ├── _posts/          # 博客文章（.md 文件）
│   ├── _drafts/         # 草稿（未发布）
│   ├── about/           # 自定义页面（如 about/index.md）
│   └── images/          # 【推荐】存放全局图片或附件（可自定义）
├── themes/              # 主题目录
└── public/              # `hexo generate` 生成的静态网站（部署用）
```

hexo部署成功之后，网站的目录映射

| 本地路径                           | 部署后网站路径（假设域名为 example.com）            |
| :--------------------------------- | :-------------------------------------------------- |
| `source/images/logo.webp`           | `https://example.com/images/logo.webp`               |
| `source/_posts/旅行日记/cover.jpg` | `https://example.com/2026/01/04/旅行日记/cover.jpg` |
| `source/about/avatar.jpg`          | `https://example.com/about/avatar.jpg`              |

> 注意：文章资源路径会包含**发布日期 + 文章 slug**，这是由 Hexo 的 permalink 规则决定的（可在 `_config.yml` 中配置 `permalink`）。

## hexo创建文章

  使用`hexo new post “第一篇文章”`

  生成：`source/_posts/第一篇文章.md`

例如：![image-20260104105322472](posts/d071fe4b/images/image-20260104105322472.webp)

  这里的同名资源文件夹在下一小节讲解

## hexo的资源文件

  当我们发布一篇文章时，总需要添加图片或者附件，这些图片和附件就需要存放在资源文件夹中，而hexo可以为每一篇文章创建资源文件夹。

在站点 `_config.yml` 中设置：将post_asset_folder修改为true即可

![image-20260104105322472](posts/d071fe4b/images/image-20260104105322472.webp)

## hexo 本地调式

这里我们需要了解hexo的三板斧

1. `hexo clean`:清空缓存以及生成的静态文件
2. `hexo g`:生成静态文件
3. `hexo s`:本地调式，注意hexo调式之前要先生成静态文件，否则可能修改的文件不成功

例如：

![image-20260104110020799](posts/d071fe4b/images/image-20260104110020799.webp)

## hexo 创建页面

  在编写博客时，我们可能需要分类页，例如：一个分类页包含了所有的分类标签，或者一个外链页包含了所有的外链

  使用hexo new page "categories"，可以在_source目录下创建一个categories目录用来存放新的文章页

例如：

![image-20260104111145973](posts/d071fe4b/images/image-20260104111145973.webp)

## 结语

  这就是hexo所有的基础教程了，如果还想进阶的话，就需要添加主题，这里我推荐的是butterfly，文章跳转：https://0xyyssh.github.io/posts/143a4fd3.html

