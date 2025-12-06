**语言:** [🇨🇳 中文](#-本地音乐播放器-v22) | [🇺🇸 English](#english-version)

---

# AuroraPlayer
一个轻量级、功能丰富的网页音乐播放器-可以引入到网站,博客等

# 🎵 本地音乐播放器 v2.2

一个轻量级、功能丰富的本地音乐播放器，基于原网易云音乐播放器修改，专为本地文件播放优化。

![播放器预览](https://img.shields.io/badge/版本-v2.2-blue.svg)
![许可证](https://img.shields.io/badge/许可证-Apache%202.0-green.svg)
![兼容性](https://img.shields.io/badge/兼容性-现代浏览器-orange.svg)

## ✨ 功能特性

### 🎵 核心播放功能
- **本地音乐播放** - 支持MP3、WAV、OGG等主流音频格式
- **歌词同步显示** - 支持标准LRC格式歌词文件
- **自动重播** - 歌曲播放结束后自动重新开始
- **进度控制** - 可拖动进度条精确定位

### 🎨 界面设计
- **圆盘模式** - 黑胶唱片风格的视觉效果
- **随机封面** - 无封面时自动获取精美图片
- **响应式设计** - 完美适配桌面端和移动端
- **多主题支持** - 自动/亮色/暗色主题切换
- **平滑动画** - 流畅的过渡和交互动效

### 🔧 高级功能
- **最小化模式** - 可缩小为悬浮按钮，节省屏幕空间
- **嵌入模式** - 适合iframe或小区域集成
- **智能封面** - 支持自定义封面URL或随机API
- **用户交互检测** - 优化的自动播放策略
- **音量控制** - 精确的音量调节

### 📱 移动端优化
- **触摸优化** - 完美支持触摸屏操作
- **自适应布局** - 根据屏幕大小自动调整
- **手势支持** - 滑动、点击等自然交互

## 🚀 快速开始

### 1. 基本用法

### 1️⃣ 引入文件


```html
<!-- 引入 CSS (HEAD标签内) -->
<link rel="stylesheet" href="/music.css">

<!-- 引入 JS (BODY标签底部) -->
<script src="/music.js"></script>
```

### 2️⃣ 使用播放器

#### 方法 A：使用 HTML 标签 (标准)

适合开发者或固定布局使用：

```html
<div class="netease-mini-player"
    data-music-file="audio/岸边客 (心碎版0.9x)-夏子航（2603）.mp3"
    data-lyric-file="audio/岸边客 (心碎版0.9x)-夏子航（2603）.lrc"
    data-autoplay="true"
    data-position="static"
    data-theme="auto"
    data-size="normal">
</div>
```

#### 方法 B：使用短代码 (推荐 v2.2+)

播放器内置了短代码解析功能，支持以下格式：

##### 📝 短代码格式

**基础格式：**
```html
{nmpv2:music-file=audio/song.mp3,lyric-file=audio/song.lrc,autoplay=true}
```

**完整格式：**
```html
{nmpv2:music-file=audio/岸边客.mp3,lyric-file=audio/岸边客.lrc,position=bottom-right,cover-mode=true,default-minimized=true,theme=auto}
```

##### 🎯 支持的短代码参数

| 参数 | 对应 data-* 属性 | 类型 | 默认值 | 说明 |
|------|------------------|------|--------|------|
| `position` | `data-position` | string | `static` | 播放器位置 |
| `theme` | `data-theme` | string | `auto` | 主题模式 |
| `lyric` | `data-lyric` | boolean | `true` | 显示歌词 |
| `embed` | `data-embed` | boolean | `false` | 嵌入模式 |
| `minimized` | `data-default-minimized` | boolean | `false` | 默认最小化 |
| `autoplay` | `data-autoplay` | boolean | `false` | 自动播放 |
| `idle-opacity` | `data-idle-opacity` | string | 可选 | 空闲透明度 |
| `auto-pause` | `data-auto-pause` | boolean | `false` | 页面隐藏暂停 |
| `cover-mode` | `data-cover-mode` | boolean | `false` | 圆盘模式 |
| `cover-url` | `data-cover-url` | string | 可选 | 自定义封面 |

##### 🛠️ WordPress 集成示例

**方法1：直接使用短代码（推荐）**
```php
// 在文章或页面中直接使用
{nmpv2:music-file=audio/歌曲.mp3,lyric-file=audio/歌曲.lrc,autoplay=true}
```

**方法2：创建自定义短代码**
```php
// 在主题的 functions.php 中添加
function music_player_shortcode($atts) {
    $atts = shortcode_atts(array(
        // 核心参数
        'music' => '',
        'lyric' => '',
        'autoplay' => 'false',
        'position' => 'static',
        'theme' => 'auto',
        'size' => 'compact',
        'lyric' => 'true',
        'embed' => 'false',
        
        // 界面参数
        'cover_mode' => 'false',
        'cover_url' => '',
        'default_minimized' => 'false',
        'idle_opacity' => '',
        
        // 行为参数
        'auto_pause' => 'false'
    ), $atts);
    
    ob_start();
    ?>
    <div class="netease-mini-player"
         data-music-file="<?php echo esc_attr($atts['music']); ?>"
         data-lyric-file="<?php echo esc_attr($atts['lyric']); ?>"
         data-autoplay="<?php echo esc_attr($atts['autoplay']); ?>"
         data-position="<?php echo esc_attr($atts['position']); ?>"
         data-theme="<?php echo esc_attr($atts['theme']); ?>"
         data-size="<?php echo esc_attr($atts['size']); ?>"
         data-lyric="<?php echo esc_attr($atts['lyric']); ?>"
         data-embed="<?php echo esc_attr($atts['embed']); ?>"
         data-cover-mode="<?php echo esc_attr($atts['cover_mode']); ?>"
         data-cover-url="<?php echo esc_attr($atts['cover_url']); ?>"
         data-default-minimized="<?php echo esc_attr($atts['default_minimized']); ?>"
         <?php if (!empty($atts['idle_opacity'])): ?>
         data-idle-opacity="<?php echo esc_attr($atts['idle_opacity']); ?>"
         <?php endif; ?>
         data-auto-pause="<?php echo esc_attr($atts['auto_pause']); ?>"
         >>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('music_player', 'music_player_shortcode');
```

##### 📋 使用示例

**基础播放器：**
```html
{nmpv2:music-file=audio/demo.mp3}
```

**带歌词的播放器：**
```html
{nmpv2:music-file=audio/demo.mp3,lyric-file=audio/demo.lrc,autoplay=true}
```

**悬浮播放器（右下角）：**
```html
{nmpv2:music-file=audio/song.mp3,position=bottom-right,cover-mode=true,default-minimized=true}
```

**嵌入式播放器：**
```html
{nmpv2:music-file=audio/background.mp3,embed=true,autoplay=true,auto-pause=false}
```

**自定义封面：**
```html
{nmpv2:music-file=audio/music.mp3,cover-url=https://picsum.photos/seed/music/300/300.jpg,cover-mode=true}
```

**完整配置：**
```html
{nmpv2:music-file=audio/岸边客.mp3,lyric-file=audio/岸边客.lrc,position=bottom-right,cover-mode=true,default-minimized=true,theme=dark,autoplay=false,size=normal}
```


## 📋 参数速查表

### 🎯 快速配置

#### 最简配置
```html
<div class="netease-mini-player" data-music-file="audio/song.mp3"></div>
```

#### 标准配置
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-autoplay="true"
    data-position="bottom-right">
</div>
```

#### 完整配置
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-autoplay="true"
    data-position="bottom-right"
    data-theme="auto"
    data-size="normal"
    data-lyric="true"
    data-embed="false"
    data-cover-mode="true"
    data-cover-url="https://example.com/cover.jpg"
    data-default-minimized="true"
    data-auto-pause="true"
    data-idle-opacity="0.3">
</div>
```

### 🎮 短代码快捷方式

| 需求 | 短代码 | 说明 |
|------|--------|------|
| 基础播放 | `{nmpv2:music-file=song.mp3}` | 最简单的播放器 |
| 带歌词 | `{nmpv2:music-file=song.mp3,lyric-file=song.lrc}` | 显示歌词 |
| 自动播放 | `{nmpv2:music-file=song.mp3,autoplay=true}` | 页面加载后播放 |
| 悬浮模式 | `{nmpv2:music-file=song.mp3,position=bottom-right}` | 右下角悬浮 |
| 圆盘模式 | `{nmpv2:music-file=song.mp3,cover-mode=true}` | 黑胶唱片风格 |

---

## 📝 2. 文件命名规则

为了让播放器自动识别歌曲信息，建议按以下格式命名：

**推荐格式：** `歌名-歌手.扩展名`

```
✅ 正确示例：
- 岸边客 (心碎版0.9x)-夏子航（2603）.mp3
- 月亮之上-凤凰传奇.lrc
- 夜曲-周杰伦.mp3

❌ 不推荐：
- song1.mp3
- 音乐文件.mp3
```

### 3. 完整配置参数

| 参数 | 类型 | 默认值 | 说明 | 示例 |
|------|------|--------|------|------|
| **data-music-file** | string | 必填 | 音乐文件路径 | `audio/song.mp3`, `audio/music/歌曲.mp3` |
| **data-lyric-file** | string | 可选 | 歌词文件路径 | `audio/song.lrc`, `lyrics/歌词.lrc` |
| **data-autoplay** | boolean | false | 是否自动播放 | `true`, `false` |
| **data-position** | string | static | 播放器位置 | `static`, `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| **data-theme** | string | auto | 主题模式 | `auto`, `light`, `dark` |
| **data-lyric** | boolean | true | 是否显示歌词 | `true`, `false` |
| **data-embed** | boolean | false | 嵌入模式 | `true`, `false` |
| **data-cover-mode** | boolean | false | 圆盘模式 | `true`, `false` |
| **data-cover-url** | string | 可选 | 自定义封面 | `https://picsum.photos/300/300.jpg`, `/images/cover.jpg` |
| **data-default-minimized** | boolean | false | 默认最小化 | `true`, `false` |
| **data-size** | string | compact | 播放器尺寸 | `compact`, `normal`, `large` |
| **data-auto-pause** | boolean | false | 页面隐藏时暂停 | `true`, `false` |
| **data-idle-opacity** | string | 可选 | 空闲透明度 | `0.1`, `0.3`, `0.5`, `0.7`, `0.9` |
---

#### 🎯 所有参数完整示例

```html
<!-- 完整功能配置 - 所有可用参数 -->
<div class="netease-mini-player"
    data-music-file="audio/歌曲.mp3"
    data-lyric-file="audio/歌曲.lrc"
    data-autoplay="false"
    data-position="bottom-right"
    data-theme="auto"
    data-size="normal"
    data-lyric="true"
    data-embed="false"
    data-cover-mode="true"
    data-cover-url="https://example.com/cover.jpg"
    data-default-minimized="true"
    data-auto-pause="true"
    data-idle-opacity="0.3">
</div>
```

#### 📋 参数使用场景组合

**桌面端悬浮播放器**（推荐配置）：
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-position="bottom-right"
    data-cover-mode="true"
    data-default-minimized="true"
    data-auto-pause="true"
    data-lyric="true">
</div>
```

**移动端嵌入式播放器**：
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-embed="true"
    data-size="compact"
    data-auto-pause="true"
    data-lyric="false">
</div>
```

**页面背景音乐播放器**：
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-position="top-left"
    data-default-minimized="true"
    data-lyric="false"
    data-auto-pause="true">
</div>
```

**展示型播放器**（带封面和歌词）：
```html
<div class="netease-mini-player"
    data-music-file="audio/demo.mp3"
    data-lyric-file="audio/demo.lrc"
    data-theme="light"
    data-size="normal"
    data-cover-mode="true"
    data-cover-url="https://picsum.photos/seed/music/300/300.jpg"
    data-lyric="true"
    data-auto-pause="false">
</div>
```

---

### 🔧 内部配置参数

这些参数在 JavaScript 代码中定义，通常不需要手动修改：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `idleDelay` | 5000ms | 空闲状态检测延迟 |
| `playPauseDebounceDelay` | 100ms | 播放按钮防抖延迟 |
| `mouseReturnDelay` | 3000ms | 鼠标在中央区域停留后自动播放延迟 |
| `volume` | 0.7 | 默认音量（0-1） |
| `cacheExpiry` | 5分钟 | 数据缓存过期时间 |

#### 🔧 参数详细说明

##### 播放器位置 (`data-position`)
- `static` - 普通文档流中的播放器（默认）
- `top-left` - 左上角悬浮播放器
- `top-right` - 右上角悬浮播放器  
- `bottom-left` - 左下角悬浮播放器
- `bottom-right` - 右下角悬浮播放器（推荐）

##### 主题模式 (`data-theme`)
- `auto` - 自动检测系统主题（默认）
- `light` - 强制亮色主题
- `dark` - 强制暗色主题

##### 播放器尺寸 (`data-size`)
- `compact` - 紧凑模式（默认）
- `normal` - 标准模式
- `large` - 大尺寸模式

##### 嵌入模式 (`data-embed`)
- `false` - 独立悬浮播放器（默认）
- `true` - 嵌入页面内，适合iframe集成

##### 圆盘模式 (`data-cover-mode`)
- `false` - 普通封面显示（默认）
- `true` - 黑胶唱片风格，封面会旋转

##### 自动暂停 (`data-auto-pause`)
- `false` - 页面隐藏时继续播放（默认）
- `true` - 页面隐藏时自动暂停

##### 歌词显示 (`data-lyric`)
- `true` - 显示歌词（默认）
- `false` - 隐藏歌词显示

##### 自定义封面 (`data-cover-url`)
- 留空 - 使用随机API获取封面
- 填写URL - 使用指定的图片作为封面

#### ⚠️ 参数兼容性说明

| 参数 | 浏览器支持 | 特殊要求 | 推荐用法 |
|------|------------|----------|----------|
| `data-autoplay` | 现代浏览器 | 需要用户交互 | 设置为 `false` 避免限制 |
| `data-embed` | 所有浏览器 | 无 | 集成到iframe时使用 |
| `data-auto-pause` | 所有浏览器 | 无 | 移动端建议开启 |
| `data-cover-url` | 所有浏览器 | 需要CORS或同域 | 留空使用随机API |
| `data-idle-opacity` | 现代浏览器 | CSS3支持 | 最小化模式时使用 |

#### 🎯 最佳实践推荐

**桌面端悬浮播放器：**
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-position="bottom-right"
    data-cover-mode="true"
    data-default-minimized="true"
    data-auto-pause="true">
</div>
```

**移动端嵌入播放器：**
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-embed="true"
    data-size="compact"
    data-auto-pause="true">
</div>
```

**后台音乐播放器：**
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-autoplay="false"
    data-position="top-left"
    data-theme="auto"
    data-default-minimized="true"
    data-lyric="false">
</div>
```

## 📁 支持的文件格式

### 🎵 音频文件
- **MP3** - 最常用的音频格式
- **WAV** - 无损音频格式
- **OGG** - 开源音频格式
- **AAC** - 高效音频编码
- **M4A** - Apple音频格式
- 以及其他HTML5 Audio支持的所有格式

### 📜 歌词文件
- **LRC** - 标准歌词文件格式
- **UTF-8编码** - 支持多语言字符

## 🎼 LRC歌词格式详解

### 标准格式
```lrc
[ar:艺术家名]
[ti:歌曲标题]
[al:专辑名称]
[offset:时间偏移量]  // 可选，单位毫秒

[00:12.34]第一句歌词
[00:56.78]第二句歌词  
[01:23.45]第三句歌词
[01:45.67]器乐演奏部分
```

### 时间戳格式
- `[分:秒.毫秒]` - 精确到10毫秒
- `[分:秒:毫秒]` - 精确到毫秒（3位）

## 🎮 JavaScript API

### 获取播放器实例
```javascript
const element = document.querySelector('.netease-mini-player');
const player = element.neteasePlayer;
```

### 播放控制
```javascript
// 基础控制
await player.play();              // 播放音乐
player.pause();                    // 暂停播放
await player.togglePlay();         // 切换播放状态

// 进度控制
player.seekTo(event);             // 跳转到指定位置

// 界面控制
player.toggleMinimize();           // 切换最小化状态
player.toggleLyrics();             // 切换歌词显示
```

### 事件监听
```javascript
const player = element.neteasePlayer;

// 监听播放状态变化
player.element.addEventListener('click', () => {
    console.log('当前播放状态:', player.isPlaying);
});

// 监听进度更新
player.audio.addEventListener('timeupdate', () => {
    console.log('当前时间:', player.currentTime);
});
```

## ⚠️ 重要注意事项

### 🔒 浏览器安全限制
1. **同源策略** - 文件需在同一域名下，或配置CORS
2. **自动播放策略** - 需要用户交互后才能自动播放
3. **本地文件访问** - 直接打开HTML文件可能无法加载本地文件

### 📂 文件路径说明
- 相对路径基于HTML文件位置
- 推荐使用绝对路径避免混淆
- 确保文件路径大小写匹配

### 🌍 编码格式
- **歌词文件** - 必须使用UTF-8编码
- **音频文件** - 支持各种编码格式

### 🌐 浏览器兼容性
| 浏览器 | 版本要求 | 支持状态 |
|--------|----------|----------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | 11 | ❌ 不支持 |

## 📂 项目结构

```
music/                          # 项目根目录
├── index.html                  # 示例页面
├── music.css                   # 样式文件
├── music.js                    # 核心JavaScript
├── README.md                   # 项目文档
└── audio/                      # 音频资源目录
    ├── 岸边客 (心碎版0.9x)-夏子航（2603）.mp3
    └── 岸边客 (心碎版0.9x)-夏子航（2603）.lrc
```

## 🛠️ 本地开发

### 快速启动
由于浏览器安全限制，需要通过HTTP服务器访问：

```bash
# 方法1: 使用Python (推荐)
python -m http.server 8000
# 访问: http://localhost:8000

# 方法2: 使用Node.js
npx http-server -p 8000
# 访问: http://localhost:8000

# 方法3: 使用PHP
php -S localhost:8000
# 访问: http://localhost:8000

# 方法4: 使用Live Server (VS Code插件)
# 右键HTML文件 → Open with Live Server
```

### 开发工具
- **代码编辑器** - VS Code, WebStorm, Sublime Text
- **浏览器开发者工具** - F12打开开发者工具进行调试
- **本地服务器** - 推荐使用Python内置服务器

## 📋 使用示例

### 示例1: 基础播放器
```html
<div class="netease-mini-player"
    data-music-file="audio/demo.mp3"
    data-lyric-file="audio/demo.lrc">
</div>
```

### 示例2: 悬浮播放器（右下角）
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-position="bottom-right"
    data-cover-mode="true"
    data-default-minimized="true">
</div>
```

### 示例3: 嵌入式播放器
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-embed="true"
    data-autoplay="true">
</div>
```

### 示例4: 自定义封面
```html
<div class="netease-mini-player"
    data-music-file="audio/music.mp3"
    data-cover-url="https://picsum.photos/seed/music/300/300.jpg"
    data-cover-mode="true">
</div>
```

### 示例5: 完整功能配置
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-autoplay="true"
    data-position="bottom-right"
    data-theme="auto"
    data-size="normal"
    data-lyric="true"
    data-cover-mode="true"
    data-cover-url="https://example.com/cover.jpg"
    data-default-minimized="true"
    data-auto-pause="true"
    data-idle-opacity="0.3">
</div>
```

### 示例6: 嵌入式完整配置
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-lyric-file="audio/background.lrc"
    data-embed="true"
    data-autoplay="false"
    data-theme="light"
    data-size="compact"
    data-lyric="true"
    data-cover-mode="false"
    data-auto-pause="true">
</div>
```

### 示例7: 悬浮播放器（暗色主题）
```html
<div class="netease-mini-player"
    data-music-file="audio/dark-theme-song.mp3"
    data-position="top-left"
    data-theme="dark"
    data-cover-mode="true"
    data-default-minimized="true"
    data-lyric="false">
</div>
```

## 🔄 版本历史

### 🎉 v2.2.0 - 功能完善版 (最新)
- ✨ **新增最小化功能** - 可缩小为悬浮按钮
- ✨ **智能封面系统** - 支持随机API和自定义URL
- ✨ **智能自动播放** - 中央区域检测 + 用户交互 + 3秒延迟 + 二次验证
- 🔧 **修复进度条拖动** - 解决拖动回跳问题
- 🎨 **改进用户体验** - 更流畅的动画和交互
- 📚 **完善文档系统** - 新增短代码支持和完整参数说明
- 🔗 **短代码解析器** - 内置`{nmpv2:...}`格式支持
- ⚙️ **参数完整性** - 支持所有JavaScript配置参数
- 📱 **响应式优化** - 移动端自动隐藏音量控制

#### 🎯 智能自动播放流程

**播放顺序**
```
1. 鼠标进入页面中央区域（距离边界10%）
2. 检测到用户交互（点击、滚动、键盘等）
3. 在中央区域停留3秒
4. 最后验证用户是否仍在交互
5. 开始自动播放
```

**核心检查机制**
- ✅ 鼠标在中央区域检测
- ✅ 用户交互状态验证
- ✅ 3秒停留倒计时
- ✅ 二次交互验证（防止用户离开后误播）
- ✅ 页面可见性和焦点检查

### 🎵 v2.1.0 - 圆盘模式
- ✨ **恢复圆盘模式** - 经典黑胶唱片风格
- ✨ **自定义封面** - 支持data-cover-url参数
- 🔧 **界面优化** - 改进视觉效果和动画

### 📦 v2.0.0 - 重构版本
- 🔄 **简化架构** - 移除复杂API，专注本地播放
- 🎵 **单曲播放** - 专注单首歌曲播放体验
- 📱 **响应式设计** - 完美适配移动端
- 🎨 **现代化UI** - 全新的界面设计

## 🤝 贡献指南

### 如何贡献
1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 问题反馈
如果遇到问题，请提供以下信息：
- 浏览器版本和操作系统
- 详细的错误描述
- 复现步骤
- 相关代码片段

## 🙏 致谢

### 原项目
本项目基于 [NeteaseMiniPlayer v2](https://github.com/ImBHCN/NeteaseMiniPlayer) 进行修改开发。

### 特别感谢
- 感谢所有为这个项目做出贡献的开发者
- 感谢开源社区的支持和反馈
- 感谢所有使用和推荐这个项目的用户

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！

---

# English Version

# AuroraPlayer
A lightweight, feature-rich web music player that can be integrated into websites, blogs, and more.

# 🎵 Local Music Player v2.2

A lightweight, feature-rich local music player, modified from the original NetEase Cloud Music player, optimized for local file playback.

![Player Preview](https://img.shields.io/badge/Version-v2.2-blue.svg)
![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)
![Compatibility](https://img.shields.io/badge/Compatibility-Modern%20Browsers-orange.svg)

## ✨ Features

### 🎵 Core Playback Features
- **Local Music Playback** - Supports mainstream audio formats like MP3, WAV, OGG
- **Synchronized Lyrics Display** - Supports standard LRC format lyrics files
- **Auto Replay** - Automatically restarts when song ends
- **Progress Control** - Draggable progress bar for precise positioning

### 🎨 Interface Design
- **Disc Mode** - Vinyl record-style visual effects
- **Random Cover** - Automatically gets beautiful images when no cover is available
- **Responsive Design** - Perfectly adapts to desktop and mobile
- **Multi-theme Support** - Auto/Light/Dark theme switching
- **Smooth Animations** - Fluid transitions and interactive effects

### 🔧 Advanced Features
- **Minimize Mode** - Can be reduced to a floating button to save screen space
- **Embed Mode** - Suitable for iframe or small area integration
- **Smart Cover** - Supports custom cover URL or random API
- **User Interaction Detection** - Optimized autoplay strategy
- **Volume Control** - Precise volume adjustment

### 📱 Mobile Optimization
- **Touch Optimization** - Perfect touch screen support
- **Adaptive Layout** - Automatically adjusts according to screen size
- **Gesture Support** - Natural interactions like swiping and tapping

## 🚀 Quick Start

### 1. Basic Usage

### 1️⃣ Include Files

```html
<!-- Include CSS (inside HEAD tag) -->
<link rel="stylesheet" href="/music.css">

<!-- Include JS (bottom of BODY tag) -->
<script src="/music.js"></script>
```

### 2️⃣ Use the Player

#### Method A: Using HTML Tags (Standard)

Suitable for developers or fixed layouts:

```html
<div class="netease-mini-player"
    data-music-file="audio/岸别客 (Heartbreak Version 0.9x)-Xia Zihang (2603).mp3"
    data-lyric-file="audio/岸别客 (Heartbreak Version 0.9x)-Xia Zihang (2603).lrc"
    data-autoplay="true"
    data-position="static"
    data-theme="auto"
    data-size="normal">
</div>
```

#### Method B: Using Short Codes (Recommended v2.2+)

The player has built-in short code parsing functionality, supporting the following formats:

##### 📝 Short Code Format

**Basic Format:**
```html
{nmpv2:music-file=audio/song.mp3,lyric-file=audio/song.lrc,autoplay=true}
```

**Complete Format:**
```html
{nmpv2:music-file=audio/岸别客.mp3,lyric-file=audio/岸别客.lrc,position=bottom-right,cover-mode=true,default-minimized=true,theme=auto}
```

##### 🎯 Supported Short Code Parameters

| Parameter | Corresponding data-* Attribute | Type | Default | Description |
|-----------|--------------------------------|------|---------|-------------|
| `position` | `data-position` | string | `static` | Player position |
| `theme` | `data-theme` | string | `auto` | Theme mode |
| `lyric` | `data-lyric` | boolean | `true` | Show lyrics |
| `embed` | `data-embed` | boolean | `false` | Embed mode |
| `minimized` | `data-default-minimized` | boolean | `false` | Default minimized |
| `autoplay` | `data-autoplay` | boolean | `false` | Auto play |
| `idle-opacity` | `data-idle-opacity` | string | optional | Idle opacity |
| `auto-pause` | `data-auto-pause` | boolean | `false` | Pause on page hide |
| `cover-mode` | `data-cover-mode` | boolean | `false` | Disc mode |
| `cover-url` | `data-cover-url` | string | optional | Custom cover |

##### 🛠️ WordPress Integration Example

**Method 1: Direct Short Code (Recommended)**
```php
// Use directly in articles or pages
{nmpv2:music-file=audio/song.mp3,lyric-file=audio/song.lrc,autoplay=true}
```

**Method 2: Create Custom Short Code**
```php
// Add to theme's functions.php
function music_player_shortcode($atts) {
    $atts = shortcode_atts(array(
        // Core parameters
        'music' => '',
        'lyric' => '',
        'autoplay' => 'false',
        'position' => 'static',
        'theme' => 'auto',
        'size' => 'compact',
        'lyric' => 'true',
        'embed' => 'false',
        
        // Interface parameters
        'cover_mode' => 'false',
        'cover_url' => '',
        'default_minimized' => 'false',
        'idle_opacity' => '',
        
        // Behavior parameters
        'auto_pause' => 'false'
    ), $atts);
    
    ob_start();
    ?>
    <div class="netease-mini-player"
         data-music-file="<?php echo esc_attr($atts['music']); ?>"
         data-lyric-file="<?php echo esc_attr($atts['lyric']); ?>"
         data-autoplay="<?php echo esc_attr($atts['autoplay']); ?>"
         data-position="<?php echo esc_attr($atts['position']); ?>"
         data-theme="<?php echo esc_attr($atts['theme']); ?>"
         data-size="<?php echo esc_attr($atts['size']); ?>"
         data-lyric="<?php echo esc_attr($atts['lyric']); ?>"
         data-embed="<?php echo esc_attr($atts['embed']); ?>"
         data-cover-mode="<?php echo esc_attr($atts['cover_mode']); ?>"
         data-cover-url="<?php echo esc_attr($atts['cover_url']); ?>"
         data-default-minimized="<?php echo esc_attr($atts['default_minimized']); ?>"
         <?php if (!empty($atts['idle_opacity'])): ?>
         data-idle-opacity="<?php echo esc_attr($atts['idle_opacity']); ?>"
         <?php endif; ?>
         data-auto-pause="<?php echo esc_attr($atts['auto_pause']); ?>"
         >>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('music_player', 'music_player_shortcode');
```

##### 📋 Usage Examples

**Basic Player:**
```html
{nmpv2:music-file=audio/demo.mp3}
```

**Player with Lyrics:**
```html
{nmpv2:music-file=audio/demo.mp3,lyric-file=audio/demo.lrc,autoplay=true}
```

**Floating Player (Bottom Right):**
```html
{nmpv2:music-file=audio/song.mp3,position=bottom-right,cover-mode=true,default-minimized=true}
```

**Embedded Player:**
```html
{nmpv2:music-file=audio/background.mp3,embed=true,autoplay=true,auto-pause=false}
```

**Custom Cover:**
```html
{nmpv2:music-file=audio/music.mp3,cover-url=https://picsum.photos/seed/music/300/300.jpg,cover-mode=true}
```

**Complete Configuration:**
```html
{nmpv2:music-file=audio/岸别客.mp3,lyric-file=audio/岸别客.lrc,position=bottom-right,cover-mode=true,default-minimized=true,theme=dark,autoplay=false,size=normal}
```

## 📋 Parameter Quick Reference

### 🎯 Quick Configuration

#### Minimal Configuration
```html
<div class="netease-mini-player" data-music-file="audio/song.mp3"></div>
```

#### Standard Configuration
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-autoplay="true"
    data-position="bottom-right">
</div>
```

#### Complete Configuration
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-autoplay="true"
    data-position="bottom-right"
    data-theme="auto"
    data-size="normal"
    data-lyric="true"
    data-embed="false"
    data-cover-mode="true"
    data-cover-url="https://example.com/cover.jpg"
    data-default-minimized="true"
    data-auto-pause="true"
    data-idle-opacity="0.3">
</div>
```

### 🎮 Short Code Quick Reference

| Requirement | Short Code | Description |
|-------------|------------|-------------|
| Basic Playback | `{nmpv2:music-file=song.mp3}` | Simplest player |
| With Lyrics | `{nmpv2:music-file=song.mp3,lyric-file=song.lrc}` | Show lyrics |
| Auto Play | `{nmpv2:music-file=song.mp3,autoplay=true}` | Play after page load |
| Floating Mode | `{nmpv2:music-file=song.mp3,position=bottom-right}` | Bottom right floating |
| Disc Mode | `{nmpv2:music-file=song.mp3,cover-mode=true}` | Vinyl record style |

---

## 📝 2. File Naming Rules

To help the player automatically recognize song information, it's recommended to name files in the following format:

**Recommended Format:** `Song Title-Artist.extension`

```
✅ Correct Examples:
- 岸别客 (Heartbreak Version 0.9x)-Xia Zihang (2603).mp3
- 月亮之上-Phoenix Legend.lrc
- 夜曲-Jay Chou.mp3

❌ Not Recommended:
- song1.mp3
- 音乐文件.mp3
```

### 3. Complete Configuration Parameters

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| **data-music-file** | string | Required | Music file path | `audio/song.mp3`, `audio/music/歌曲.mp3` |
| **data-lyric-file** | string | Optional | Lyrics file path | `audio/song.lrc`, `lyrics/歌词.lrc` |
| **data-autoplay** | boolean | false | Auto play | `true`, `false` |
| **data-position** | string | static | Player position | `static`, `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| **data-theme** | string | auto | Theme mode | `auto`, `light`, `dark` |
| **data-lyric** | boolean | true | Show lyrics | `true`, `false` |
| **data-embed** | boolean | false | Embed mode | `true`, `false` |
| **data-cover-mode** | boolean | false | Disc mode | `true`, `false` |
| **data-cover-url** | string | Optional | Custom cover | `https://picsum.photos/300/300.jpg`, `/images/cover.jpg` |
| **data-default-minimized** | boolean | false | Default minimized | `true`, `false` |
| **data-size** | string | compact | Player size | `compact`, `normal`, `large` |
| **data-auto-pause** | boolean | false | Pause on page hide | `true`, `false` |
| **data-idle-opacity** | string | Optional | Idle opacity | `0.1`, `0.3`, `0.5`, `0.7`, `0.9` |

---

#### 🎯 All Parameters Complete Example

```html
<!-- Complete feature configuration - all available parameters -->
<div class="netease-mini-player"
    data-music-file="audio/歌曲.mp3"
    data-lyric-file="audio/歌曲.lrc"
    data-autoplay="false"
    data-position="bottom-right"
    data-theme="auto"
    data-size="normal"
    data-lyric="true"
    data-embed="false"
    data-cover-mode="true"
    data-cover-url="https://example.com/cover.jpg"
    data-default-minimized="true"
    data-auto-pause="true"
    data-idle-opacity="0.3">
</div>
```

#### 📋 Parameter Usage Combinations

**Desktop Floating Player** (Recommended Configuration):
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-position="bottom-right"
    data-cover-mode="true"
    data-default-minimized="true"
    data-auto-pause="true"
    data-lyric="true">
</div>
```

**Mobile Embedded Player:**
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-embed="true"
    data-size="compact"
    data-auto-pause="true"
    data-lyric="false">
</div>
```

**Page Background Music Player:**
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-position="top-left"
    data-default-minimized="true"
    data-lyric="false"
    data-auto-pause="true">
</div>
```

**Display Player** (with cover and lyrics):
```html
<div class="netease-mini-player"
    data-music-file="audio/demo.mp3"
    data-lyric-file="audio/demo.lrc"
    data-theme="light"
    data-size="normal"
    data-cover-mode="true"
    data-cover-url="https://picsum.photos/seed/music/300/300.jpg"
    data-lyric="true"
    data-auto-pause="false">
</div>
```

---

### 🔧 Internal Configuration Parameters

These parameters are defined in the JavaScript code and usually don't need manual modification:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `idleDelay` | 5000ms | Idle state detection delay |
| `playPauseDebounceDelay` | 100ms | Play button debounce delay |
| `mouseReturnDelay` | 3000ms | Auto-play delay after mouse stays in central area |
| `volume` | 0.7 | Default volume (0-1) |
| `cacheExpiry` | 5 minutes | Data cache expiration time |

#### 🔧 Detailed Parameter Description

##### Player Position (`data-position`)
- `static` - Player in normal document flow (default)
- `top-left` - Top-left floating player
- `top-right` - Top-right floating player  
- `bottom-left` - Bottom-left floating player
- `bottom-right` - Bottom-right floating player (recommended)

##### Theme Mode (`data-theme`)
- `auto` - Auto-detect system theme (default)
- `light` - Force light theme
- `dark` - Force dark theme

##### Player Size (`data-size`)
- `compact` - Compact mode (default)
- `normal` - Standard mode
- `large` - Large size mode

##### Embed Mode (`data-embed`)
- `false` - Independent floating player (default)
- `true` - Embedded in page, suitable for iframe integration

##### Disc Mode (`data-cover-mode`)
- `false` - Normal cover display (default)
- `true` - Vinyl record style, cover rotates

##### Auto Pause (`data-auto-pause`)
- `false` - Continue playing when page hidden (default)
- `true` - Auto pause when page hidden

##### Lyrics Display (`data-lyric`)
- `true` - Show lyrics (default)
- `false` - Hide lyrics display

##### Custom Cover (`data-cover-url`)
- Leave blank - Use random API for cover
- Fill URL - Use specified image as cover

#### ⚠️ Parameter Compatibility Notes

| Parameter | Browser Support | Special Requirements | Recommended Usage |
|-----------|----------------|---------------------|-------------------|
| `data-autoplay` | Modern browsers | Requires user interaction | Set to `false` to avoid restrictions |
| `data-embed` | All browsers | None | Use when integrating into iframe |
| `data-auto-pause` | All browsers | None | Recommended for mobile |
| `data-cover-url` | All browsers | Requires CORS or same domain | Leave blank to use random API |
| `data-idle-opacity` | Modern browsers | CSS3 support | Use when minimized |

#### 🎯 Best Practice Recommendations

**Desktop Floating Player:**
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-position="bottom-right"
    data-cover-mode="true"
    data-default-minimized="true"
    data-auto-pause="true">
</div>
```

**Mobile Embedded Player:**
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-embed="true"
    data-size="compact"
    data-auto-pause="true">
</div>
```

**Background Music Player:**
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-autoplay="false"
    data-position="top-left"
    data-theme="auto"
    data-default-minimized="true"
    data-lyric="false">
</div>
```

## 📁 Supported File Formats

### 🎵 Audio Files
- **MP3** - Most common audio format
- **WAV** - Lossless audio format
- **OGG** - Open source audio format
- **AAC** - Efficient audio coding
- **M4A** - Apple audio format
- And all other formats supported by HTML5 Audio

### 📜 Lyrics Files
- **LRC** - Standard lyrics file format
- **UTF-8 Encoding** - Supports multi-language characters

## 🎼 LRC Lyrics Format Details

### Standard Format
```lrc
[ar:Artist Name]
[ti:Song Title]
[al:Album Name]
[offset:Time Offset]  // Optional, unit milliseconds

[00:12.34]First line of lyrics
[00:56.78]Second line of lyrics  
[01:23.45]Third line of lyrics
[01:45.67]Instrumental part
```

### Timestamp Format
- `[minute:second.millisecond]` - Precise to 10 milliseconds
- `[minute:second:millisecond]` - Precise to milliseconds (3 digits)

## 🎮 JavaScript API

### Get Player Instance
```javascript
const element = document.querySelector('.netease-mini-player');
const player = element.neteasePlayer;
```

### Playback Control
```javascript
// Basic controls
await player.play();              // Play music
player.pause();                    // Pause playback
await player.togglePlay();         // Toggle playback state

// Progress control
player.seekTo(event);             // Jump to specific position

// Interface control
player.toggleMinimize();           // Toggle minimize state
player.toggleLyrics();             // Toggle lyrics display
```

### Event Listening
```javascript
const player = element.neteasePlayer;

// Listen to playback state changes
player.element.addEventListener('click', () => {
    console.log('Current playback state:', player.isPlaying);
});

// Listen to progress updates
player.audio.addEventListener('timeupdate', () => {
    console.log('Current time:', player.currentTime);
});
```

## ⚠️ Important Notes

### 🔒 Browser Security Restrictions
1. **Same-Origin Policy** - Files need to be under the same domain, or configure CORS
2. **Autoplay Policy** - Requires user interaction before autoplay
3. **Local File Access** - Directly opening HTML files may not load local files

### 📂 File Path Description
- Relative paths are based on HTML file location
- Using absolute paths is recommended to avoid confusion
- Ensure file path case matching

### 🌍 Encoding Format
- **Lyrics files** - Must use UTF-8 encoding
- **Audio files** - Support various encoding formats

### 🌐 Browser Compatibility
| Browser | Version Requirement | Support Status |
|---------|-------------------|----------------|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 12+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| IE | 11 | ❌ Not Supported |

## 📂 Project Structure

```
music/                          # Project root directory
├── index.html                  # Example page
├── music.css                   # Style file
├── music.js                    # Core JavaScript
├── README.md                   # Project documentation
└── audio/                      # Audio resource directory
    ├── 岸别客 (Heartbreak Version 0.9x)-Xia Zihang (2603).mp3
    └── 岸别客 (Heartbreak Version 0.9x)-Xia Zihang (2603).lrc
```

## 🛠️ Local Development

### Quick Start
Due to browser security restrictions, access is required through an HTTP server:

```bash
# Method 1: Using Python (Recommended)
python -m http.server 8000
# Access: http://localhost:8000

# Method 2: Using Node.js
npx http-server -p 8000
# Access: http://localhost:8000

# Method 3: Using PHP
php -S localhost:8000
# Access: http://localhost:8000

# Method 4: Using Live Server (VS Code extension)
# Right-click HTML file → Open with Live Server
```

### Development Tools
- **Code Editor** - VS Code, WebStorm, Sublime Text
- **Browser Developer Tools** - Open developer tools with F12 for debugging
- **Local Server** - Python built-in server recommended

## 📋 Usage Examples

### Example 1: Basic Player
```html
<div class="netease-mini-player"
    data-music-file="audio/demo.mp3"
    data-lyric-file="audio/demo.lrc">
</div>
```

### Example 2: Floating Player (Bottom Right)
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-position="bottom-right"
    data-cover-mode="true"
    data-default-minimized="true">
</div>
```

### Example 3: Embedded Player
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-embed="true"
    data-autoplay="true">
</div>
```

### Example 4: Custom Cover
```html
<div class="netease-mini-player"
    data-music-file="audio/music.mp3"
    data-cover-url="https://picsum.photos/seed/music/300/300.jpg"
    data-cover-mode="true">
</div>
```

### Example 5: Complete Feature Configuration
```html
<div class="netease-mini-player"
    data-music-file="audio/song.mp3"
    data-lyric-file="audio/song.lrc"
    data-autoplay="true"
    data-position="bottom-right"
    data-theme="auto"
    data-size="normal"
    data-lyric="true"
    data-cover-mode="true"
    data-cover-url="https://example.com/cover.jpg"
    data-default-minimized="true"
    data-auto-pause="true"
    data-idle-opacity="0.3">
</div>
```

### Example 6: Embedded Complete Configuration
```html
<div class="netease-mini-player"
    data-music-file="audio/background.mp3"
    data-lyric-file="audio/background.lrc"
    data-embed="true"
    data-autoplay="false"
    data-theme="light"
    data-size="compact"
    data-lyric="true"
    data-cover-mode="false"
    data-auto-pause="true">
</div>
```

### Example 7: Floating Player (Dark Theme)
```html
<div class="netease-mini-player"
    data-music-file="audio/dark-theme-song.mp3"
    data-position="top-left"
    data-theme="dark"
    data-cover-mode="true"
    data-default-minimized="true"
    data-lyric="false">
</div>
```

## 🔄 Version History

### 🎉 v2.2.0 - Feature Complete Version (Latest)
- ✨ **New Minimize Feature** - Can be reduced to floating button
- ✨ **Smart Cover System** - Supports random API and custom URL
- ✨ **Smart Autoplay** - Central area detection + user interaction + 3 second delay + secondary verification
- 🔧 **Fixed Progress Bar Dragging** - Solved drag jump back issue
- 🎨 **Improved User Experience** - Smoother animations and interactions
- 📚 **Completed Documentation System** - Added short code support and complete parameter descriptions
- 🔗 **Short Code Parser** - Built-in `{nmpv2:...}` format support
- ⚙️ **Parameter Completeness** - Supports all JavaScript configuration parameters
- 📱 **Responsive Optimization** - Mobile auto-hide volume control

#### 🎯 Smart Autoplay Flow

**Playback Sequence**
```
1. Mouse enters page central area (10% from boundaries)
2. Detect user interaction (click, scroll, keyboard, etc.)
3. Stay in central area for 3 seconds
4. Final verification if user is still interacting
5. Start autoplay
```

**Core Check Mechanism**
- ✅ Central area mouse detection
- ✅ User interaction state verification
- ✅ 3 second stay countdown
- ✅ Secondary interaction verification (prevents accidental play after user leaves)
- ✅ Page visibility and focus check

### 🎵 v2.1.0 - Disc Mode
- ✨ **Restored Disc Mode** - Classic vinyl record style
- ✨ **Custom Cover** - Support for data-cover-url parameter
- 🔧 **Interface Optimization** - Improved visual effects and animations

### 📦 v2.0.0 - Refactored Version
- 🔄 **Simplified Architecture** - Removed complex APIs, focused on local playback
- 🎵 **Single Song Playback** - Focused on single song playback experience
- 📱 **Responsive Design** - Perfect mobile adaptation
- 🎨 **Modern UI** - All new interface design

## 🤝 Contributing Guidelines

### How to Contribute
1. Fork this project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Issue Feedback
If you encounter problems, please provide the following information:
- Browser version and operating system
- Detailed error description
- Reproduction steps
- Related code snippets

## 🙏 Acknowledgments

### Original Project
This project is modified and developed based on [NeteaseMiniPlayer v2](https://github.com/ImBHCN/NeteaseMiniPlayer).

### Special Thanks
- Thanks to all developers who contributed to this project
- Thanks to the open source community for support and feedback
- Thanks to all users who use and recommend this project

---

⭐ If this project helps you, please give it a Star to support it!