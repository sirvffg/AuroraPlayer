/**
 * [NMPv2] NeteaseMiniPlayer v2 JavaScript
 * Lightweight Player Component Based on NetEase Cloud Music API
 * 
 * Copyright 2025 BHCN STUDIO & 夏雨（Skytech Studio）
 * Copyright 2025 BHCN STUDIO & 北海的佰川（ImBHCN[numakkiyu]）
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(()=>{try{const s=document.currentScript;if(s&&s.src){fetch(s.src,{mode:'cors',credentials:'omit'}).catch(()=>{});}}catch(e){}})();

// 过滤浏览器扩展相关的运行时错误
if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = function(...args) {
        const message = args[0];
        if (typeof message === 'string' && 
            (message.includes('runtime.lastError') || 
             message.includes('message port closed') ||
             message.includes('chrome.runtime'))) {
            // 静默处理浏览器扩展错误
            return;
        }
        originalError.apply(console, args);
    };
}

const GlobalAudioManager = {
    currentPlayer: null,
    setCurrent(player) {
        if (this.currentPlayer && this.currentPlayer !== player) {
            this.currentPlayer.pause();
        }
        this.currentPlayer = player;
    }
};

const ICONS = {
    prev: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M556.2 541.6C544.2 546.6 530.5 543.8 521.3 534.7L352 365.3L352 512C352 524.9 344.2 536.6 332.2 541.6C320.2 546.6 306.5 543.8 297.3 534.7L128 365.3L128 512C128 529.7 113.7 544 96 544C78.3 544 64 529.7 64 512L64 128C64 110.3 78.3 96 96 96C113.7 96 128 110.3 128 128L128 274.7L297.4 105.4C306.6 96.2 320.3 93.5 332.3 98.5C344.3 103.5 352 115.1 352 128L352 274.7L521.4 105.3C530.6 96.1 544.3 93.4 556.3 98.4C568.3 103.4 576 115.1 576 128L576 512C576 524.9 568.2 536.6 556.2 541.6z"/></svg>`,
    next: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M83.8 541.6C95.8 546.6 109.5 543.8 118.7 534.7L288 365.3L288 512C288 524.9 295.8 536.6 307.8 541.6C319.8 546.6 333.5 543.8 342.7 534.7L512 365.3L512 512C512 529.7 526.3 544 544 544C561.7 544 576 529.7 576 512L576 128C576 110.3 561.7 96 544 96C526.3 96 512 110.3 512 128L512 274.7L342.6 105.3C333.4 96.1 319.7 93.4 307.7 98.4C295.7 103.4 288 115.1 288 128L288 274.7L118.6 105.4C109.4 96.2 95.7 93.5 83.7 98.5C71.7 103.5 64 115.1 64 128L64 512C64 524.9 71.8 536.6 83.8 541.6z"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>`,
    pause: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>`,
    volume: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M533.6 96.5C523.3 88.1 508.2 89.7 499.8 100C491.4 110.3 493 125.4 503.3 133.8C557.5 177.8 592 244.8 592 320C592 395.2 557.5 462.2 503.3 506.3C493 514.7 491.5 529.8 499.8 540.1C508.1 550.4 523.3 551.9 533.6 543.6C598.5 490.7 640 410.2 640 320C640 229.8 598.5 149.2 533.6 96.5zM473.1 171C462.8 162.6 447.7 164.2 439.3 174.5C430.9 184.8 432.5 199.9 442.8 208.3C475.3 234.7 496 274.9 496 320C496 365.1 475.3 405.3 442.8 431.8C432.5 440.2 431 455.3 439.3 465.6C447.6 475.9 462.8 477.4 473.1 469.1C516.3 433.9 544 380.2 544 320.1C544 260 516.3 206.3 473.1 171.1zM412.6 245.5C402.3 237.1 387.2 238.7 378.8 249C370.4 259.3 372 274.4 382.3 282.8C393.1 291.6 400 305 400 320C400 335 393.1 348.4 382.3 357.3C372 365.7 370.5 380.8 378.8 391.1C387.1 401.4 402.3 402.9 412.6 394.6C434.1 376.9 448 350.1 448 320C448 289.9 434.1 263.1 412.6 245.5zM80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416z"/></svg>`,
    lyrics: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M532 71C539.6 77.1 544 86.3 544 96L544 400C544 444.2 501 480 448 480C395 480 352 444.2 352 400C352 355.8 395 320 448 320C459.2 320 470 321.6 480 324.6L480 207.9L256 257.7L256 464C256 508.2 213 544 160 544C107 544 64 508.2 64 464C64 419.8 107 384 160 384C171.2 384 182 385.6 192 388.6L192 160C192 145 202.4 132 217.1 128.8L505.1 64.8C514.6 62.7 524.5 65 532.1 71.1z"/></svg>`,
    list: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z"/></svg>`,
    minimize: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 352C302.3 352 288 337.7 288 320C288 302.3 302.3 288 320 288C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352zM224 320C224 373 267 416 320 416C373 416 416 373 416 320C416 267 373 224 320 224C267 224 224 267 224 320zM168 304C168 271.6 184.3 237.4 210.8 210.8C237.3 184.2 271.6 168 304 168C317.3 168 328 157.3 328 144C328 130.7 317.3 120 304 120C256.1 120 210.3 143.5 176.9 176.9C143.5 210.3 120 256.1 120 304C120 317.3 130.7 328 144 328C157.3 328 168 317.3 168 304z"/></svg>`, 
    maximize: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 352C302.3 352 288 337.7 288 320C288 302.3 302.3 288 320 288C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352zM224 320C224 373 267 416 320 416C373 416 416 373 416 320C416 267 373 224 320 224C267 224 224 267 224 320zM168 304C168 271.6 184.3 237.4 210.8 210.8C237.3 184.2 271.6 168 304 168C317.3 168 328 157.3 328 144C328 130.7 317.3 120 304 120C256.1 120 210.3 143.5 176.9 176.9C143.5 210.3 120 256.1 120 304C120 317.3 130.7 328 144 328C157.3 328 168 317.3 168 304z"/></svg>`, 
    loopList: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M534.6 182.6C547.1 170.1 547.1 149.8 534.6 137.3L470.6 73.3C461.4 64.1 447.7 61.4 435.7 66.4C423.7 71.4 416 83.1 416 96L416 128L256 128C150 128 64 214 64 320C64 337.7 78.3 352 96 352C113.7 352 128 337.7 128 320C128 249.3 185.3 192 256 192L416 192L416 224C416 236.9 423.8 248.6 435.8 253.6C447.8 258.6 461.5 255.8 470.7 246.7L534.7 182.7zM105.4 457.4C92.9 469.9 92.9 490.2 105.4 502.7L169.4 566.7C178.6 575.9 192.3 578.6 204.3 573.6C216.3 568.6 224 556.9 224 544L224 512L384 512C490 512 576 426 576 320C576 302.3 561.7 288 544 288C526.3 288 512 302.3 512 320C512 390.7 454.7 448 384 448L224 448L224 416C224 403.1 216.2 391.4 204.2 386.4C192.2 381.4 178.5 384.2 169.3 393.3L105.3 457.3z"/></svg>`,
    loopSingle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M534.6 182.6C547.1 170.1 547.1 149.8 534.6 137.3L470.6 73.3C461.4 64.1 447.7 61.4 435.7 66.4C423.7 71.4 416 83.1 416 96L416 128L256 128C150 128 64 214 64 320C64 337.7 78.3 352 96 352C113.7 352 128 337.7 128 320C128 249.3 185.3 192 256 192L416 192L416 224C416 236.9 423.8 248.6 435.8 253.6C447.8 258.6 461.5 255.8 470.7 246.7L534.7 182.7zM105.4 457.4C92.9 469.9 92.9 490.2 105.4 502.7L169.4 566.7C178.6 575.9 192.3 578.6 204.3 573.6C216.3 568.6 224 556.9 224 544L224 512L384 512C490 512 576 426 576 320C576 302.3 561.7 288 544 288C526.3 288 512 302.3 512 320C512 390.7 454.7 448 384 448L224 448L224 416C224 403.1 216.2 391.4 204.2 386.4C192.2 381.4 178.5 384.2 169.3 393.3L105.3 457.3z"/><path d="M295 280L305 260L335 260L335 380L305 380L305 280Z"/></svg>`, 
    shuffle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M467.8 98.4C479.8 93.4 493.5 96.2 502.7 105.3L566.7 169.3C572.7 175.3 576.1 183.4 576.1 191.9C576.1 200.4 572.7 208.5 566.7 214.5L502.7 278.5C493.5 287.7 479.8 290.4 467.8 285.4C455.8 280.4 448 268.9 448 256L448 224L416 224C405.9 224 396.4 228.7 390.4 236.8L358 280L318 226.7L339.2 198.4C357.3 174.2 385.8 160 416 160L448 160L448 128C448 115.1 455.8 103.4 467.8 98.4zM218 360L258 413.3L236.8 441.6C218.7 465.8 190.2 480 160 480L96 480C78.3 480 64 465.7 64 448C64 430.3 78.3 416 96 416L160 416C170.1 416 179.6 411.3 185.6 403.2L218 360zM502.6 534.6C493.4 543.8 479.7 546.5 467.7 541.5C455.7 536.5 448 524.9 448 512L448 480L416 480C385.8 480 357.3 465.8 339.2 441.6L185.6 236.8C179.6 228.7 170.1 224 160 224L96 224C78.3 224 64 209.7 64 192C64 174.3 78.3 160 96 160L160 160C190.2 160 218.7 174.2 236.8 198.4L390.4 403.2C396.4 411.3 405.9 416 416 416L448 416L448 384C448 371.1 455.8 359.4 467.8 354.4C479.8 349.4 493.5 352.2 502.7 361.3L566.7 425.3C572.7 431.3 576.1 439.4 576.1 447.9C576.1 456.4 572.7 464.5 566.7 470.5L502.7 534.5z"/></svg>`
};
class NeteaseMiniPlayer {
    constructor(element) {
        this.element = element;
        this.element.neteasePlayer = this;
        this.config = this.parseConfig();
        this.currentSong = null;
        this.playlist = [];
        this.currentIndex = 0;
        this.audio = new Audio();
        this.wasPlayingBeforeHidden = false;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 0.7;
        this.lyrics = [];
        this.currentLyricIndex = -1;
        this.showLyrics = this.config.lyric;
        this.cache = new Map();

        // 检测来源网站
        this.referrerInfo = this.detectReferrer();
        
        this.init();

        this.idleTimeout = null;
        this.idleDelay = 5000;
        this.isIdle = false;
        
        // 播放控制防抖
        this.playPauseDebounce = false;
        this.playPauseDebounceDelay = 100;
        
        // 用户交互检测
        this.hasUserInteraction = false;
        this.autoplayAttempted = false;
        this.lastInteractionTime = 0;
        this.lastInteractionEvent = null;
        
        // 进度条拖动状态
        this.isDragging = false;
        
        // 最小化状态
        this.isMinimized = false;
        
        // 资源加载状态跟踪
        this.resourcesLoaded = false;
        this.loadingPromises = [];
        
        // 鼠标状态跟踪
        this.mouseInDocument = true; // 默认认为鼠标在页面内
        this.mouseLeaveTime = 0;
        this.mouseReturnDelay = 1500; // 鼠标返回后延迟3秒才允许自动播放
        this.mouseInCenterArea = false; // 鼠标是否在中央区域
        this.centerAreaEnterTime = 0; // 进入中央区域的时间
        this.autoplayTimer = null; // 自动播放定时器
    }
    detectReferrer() {
        const referrer = document.referrer || '';
        const currentHost = window.location.hostname;
        
        // 如果没有referrer，说明是直接访问
        if (!referrer) {
            return {
                hasReferrer: false,
                isExternal: false,
                domain: null,
                url: null,
                type: 'direct'
            };
        }
        
        try {
            const referrerUrl = new URL(referrer);
            const referrerDomain = referrerUrl.hostname;
            
            // 检测是否来自同一域名
            const isExternal = referrerDomain !== currentHost;
            
            // 分析来源类型
            let type = 'unknown';
            if (this.isSocialMedia(referrerDomain)) {
                type = 'social';
            } else if (this.isSearchEngine(referrerDomain)) {
                type = 'search';
            } else if (this.isVideoPlatform(referrerDomain)) {
                type = 'video';
            } else if (isExternal) {
                type = 'external';
            } else {
                type = 'internal';
            }
            
            return {
                hasReferrer: true,
                isExternal: isExternal,
                domain: referrerDomain,
                url: referrer,
                type: type
            };
        } catch (error) {
            console.warn('解析referrer失败:', error);
            return {
                hasReferrer: true,
                isExternal: true,
                domain: 'unknown',
                url: referrer,
                type: 'unknown'
            };
        }
    }
    
    logReferrerInfo() {
        const info = this.referrerInfo;
        
        if (info.hasReferrer) {
            console.log(`🔗 来源网站检测: ${info.domain}`, {
                类型: info.type,
                是否外部来源: info.isExternal,
                完整URL: info.url
            });
            
            // 根据来源类型输出不同信息
            switch (info.type) {
                case 'social':
                    console.log('📱 检测到来自社交媒体的访问');
                    break;
                case 'search':
                    console.log('🔍 检测到来自搜索引擎的访问');
                    break;
                case 'video':
                    console.log('🎥 检测到来自视频平台的访问');
                    break;
                case 'external':
                    console.log('🌐 检测到来自外部网站的访问');
                    break;
                case 'internal':
                    console.log('🏠 检测到来自同域名的内部访问');
                    break;
                default:
                    console.log('❓ 未知类型的来源访问');
            }
        } else {
            console.log('🎯 直接访问 - 用户直接输入网址或使用书签访问');
        }
        
        // 将来源信息存储到全局，方便其他功能使用
        window.NeteasePlayerReferrer = info;
    }
    

    
    isSocialMedia(domain) {
        const socialDomains = [
            'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com',
            'weibo.com', 'zhihu.com', 'douyin.com', 'xiaohongshu.com',
            'tiktok.com', 'snapchat.com', 'pinterest.com', 'reddit.com'
        ];
        return socialDomains.some(social => domain.includes(social));
    }
    
    isSearchEngine(domain) {
        const searchDomains = [
            'google.com', 'baidu.com', 'bing.com', 'sogou.com',
            'so.com', 'duckduckgo.com', 'yandex.com', 'yahoo.com'
        ];
        return searchDomains.some(search => domain.includes(search));
    }
    
    isVideoPlatform(domain) {
        const videoDomains = [
            'youtube.com', 'bilibili.com', 'vimeo.com', 'douyin.com',
            'kuaishou.com', 'youku.com', 'iqiyi.com', 'ted.com'
        ];
        return videoDomains.some(video => domain.includes(video));
    }

    parseConfig() {
        const element = this.element;
        const position = element.dataset.position || 'static';
        const validPositions = ['static', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
        const finalPosition = validPositions.includes(position) ? position : 'static';
        const defaultMinimized = element.dataset.defaultMinimized === 'true';
        
        const embedValue = element.getAttribute('data-embed') ?? element.dataset.embed;
        const isEmbed = embedValue === 'true' || embedValue === true;

        const autoPauseAttr = element.getAttribute('data-auto-pause') ?? element.dataset.autoPause;
        const autoPauseDisabled = autoPauseAttr === 'true' || autoPauseAttr === true;

        const coverModeValue = element.getAttribute('data-cover-mode') ?? element.dataset.coverMode;
        let coverMode = coverModeValue === 'true' || coverModeValue === true;

        const coverUrlValue = element.getAttribute('data-cover-url') ?? element.dataset.coverUrl;
        const coverUrl = coverUrlValue || '';

        // 检测是否为移动端，如果是则强制取消黑胶唱片模式
        const env = NeteaseMiniPlayer.getUAInfo();
        if (env.isMobile && coverMode) {
            coverMode = false;
            console.log('检测到移动端环境，已强制禁用黑胶唱片模式');
            // 同时更新data属性，确保HTML和CSS保持一致
            element.setAttribute('data-cover-mode', 'false');
            element.removeAttribute('data-cover-mode');
        }

        return {
            embed: isEmbed,
            autoplay: element.dataset.autoplay === 'true',
            musicFile: element.dataset.musicFile,
            lyricFile: element.dataset.lyricFile,
            position: finalPosition,
            lyric: element.dataset.lyric !== 'false',
            theme: element.dataset.theme || 'auto',
            size: element.dataset.size || 'compact',
            defaultMinimized: defaultMinimized,
            autoPauseDisabled: autoPauseDisabled,
            coverMode: coverMode,
            coverUrl: coverUrl
        };
    }
    async init() {
        // 输出来源网站信息
        this.logReferrerInfo();
        
        if (this.config.embed) {
            this.element.setAttribute('data-embed', 'true');
        }
        this.element.setAttribute('data-position', this.config.position);
        
        if (this.config.embed) {
            this.element.classList.add('netease-mini-player-embed');
        }
        
        this.initTheme();
        this.createPlayerHTML();
        this.applyResponsiveControls?.();
        this.setupEnvListeners?.();
        this.bindEvents();
        this.setupAudioEvents();
        
        // 等待所有资源加载完成
        await this.waitForResourcesLoaded();
        
        try {
            await this.loadLocalFiles();
            if (this.playlist.length > 0) {
                await this.loadCurrentSong();
                
                // 等待音频元数据加载完成
                await this.waitForAudioReady();
                
                // 更新进度和时间显示
                this.updateProgress();
                this.updateTimeDisplay();
                console.log('播放器初始化完成 - 当前时间:', this.currentTime, '总时长:', this.duration);
                
                // 标记资源已加载完成
                this.resourcesLoaded = true;
                
                // 处理自动播放
                if (this.config.autoplay && !this.config.embed) {
                    const env = NeteaseMiniPlayer.getUAInfo();
                    console.log('自动播放条件检查:', {
                        isMobile: env.isMobile,
                        referrerType: this.referrerInfo ? this.referrerInfo.type : 'null',
                        referrerInfo: this.referrerInfo
                    });
                    // 检测是否来自同域名内部访问或移动端
                    if (env.isMobile || (this.referrerInfo && this.referrerInfo.type === 'internal')) {
                        const reason = env.isMobile ? '移动端环境' : '同域名内部访问';
                        console.log(`${reason}自动播放已启用，直接尝试播放`);
                        this.attemptAutoplay();
                    } else {
                        // 桌面端外部访问：等待用户交互和鼠标进入中央区域
                        console.log('桌面端外部访问自动播放已启用，等待用户交互和鼠标进入中央区域');
                        // 不在初始化时调用 play()，等待完整的用户交互流程
                    }
                }
            }
            if (this.config.defaultMinimized && !this.config.embed && this.config.position !== 'static') {
                this.toggleMinimize();
            }
        } catch (error) {
            console.error('播放器初始化失败:', error);
            this.showError('加载失败，请稍后重试');
        }
    }
    createPlayerHTML() {
        const isCoverMode = this.config.coverMode;
        
        this.element.innerHTML = `
            <div class="player-main">
                <div class="album-cover-container${isCoverMode ? ' vinyl-mode' : ''}">
                    <img class="album-cover" src="" alt="专辑封面">
                    ${isCoverMode ? `
                    <div class="vinyl-record">
                        <div class="vinyl-grooves"></div>
                        <div class="vinyl-center">
                            <div class="vinyl-hole"></div>
                        </div>
                    </div>
                    ` : `
                    <div class="vinyl-overlay">
                        <div class="vinyl-center"></div>
                    </div>
                    `}
                </div>
                <div class="song-content">
                    <div class="song-info">
                        <div class="song-title">♪</div>
                        <div class="song-artist"></div>
                    </div>
                    <div class="lyrics-container">
                        <div class="lyric-line original">♪</div>
                        <div class="lyric-line translation"></div>
                    </div>
                </div>
                <div class="controls">
                    <button class="control-btn minimize-btn" title="最小化/恢复">
                        <span class="minimize-icon">${ICONS.minimize}</span>
                        <span class="maximize-icon" style="display: none;">${ICONS.maximize}</span>
                    </button>
                    <button class="control-btn play-btn" title="播放/暂停">
                        <span class="play-icon">${ICONS.play}</span>
                        <span class="pause-icon" style="display: none;">${ICONS.pause}</span>
                    </button>
                </div>
            </div>
            <div class="player-bottom">
                <div class="progress-container">
                    <span class="time-display current-time">0:00</span>
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                    <span class="time-display total-time">0:00</span>
                </div>
                <div class="bottom-controls">
                    <div class="volume-container">
                        <span class="volume-icon">${ICONS.volume}</span>
                        <div class="volume-slider-container">
                            <div class="volume-slider">
                                <div class="volume-bar"></div>
                            </div>
                        </div>
                    </div>
                    <span class="feature-btn lyrics-btn" role="button" title="显示/隐藏歌词">${ICONS.lyrics}</span>
                </div>
            </div>
        `;
        this.elements = {
            albumCover: this.element.querySelector('.album-cover'),
            albumCoverContainer: this.element.querySelector('.album-cover-container'),
            songTitle: this.element.querySelector('.song-title'),
            songArtist: this.element.querySelector('.song-artist'),
            lyricsContainer: this.element.querySelector('.lyrics-container'),
            lyricLine: this.element.querySelector('.lyric-line.original'),
            lyricTranslation: this.element.querySelector('.lyric-line.translation'),
            playBtn: this.element.querySelector('.play-btn'),
            playIcon: this.element.querySelector('.play-icon'),
            pauseIcon: this.element.querySelector('.pause-icon'),
            progressContainer: this.element.querySelector('.progress-bar-container'),
            progressBar: this.element.querySelector('.progress-bar'),
            currentTime: this.element.querySelector('.current-time'),
            totalTime: this.element.querySelector('.total-time'),
            volumeContainer: this.element.querySelector('.volume-container'),
            volumeSlider: this.element.querySelector('.volume-slider'),
            volumeBar: this.element.querySelector('.volume-bar'),
            volumeIcon: this.element.querySelector('.volume-icon'),
            lyricsBtn: this.element.querySelector('.lyrics-btn'),
            minimizeBtn: this.element.querySelector('.minimize-btn'),
            minimizeIcon: this.element.querySelector('.minimize-icon'),
            maximizeIcon: this.element.querySelector('.maximize-icon')
        };
        
        // 检查关键元素是否正确创建
        const missingElements = [];
        if (!this.elements.progressBar) missingElements.push('progressBar');
        if (!this.elements.progressContainer) missingElements.push('progressContainer');
        if (missingElements.length > 0) {
            console.error('播放器元素创建失败，缺少:', missingElements);
        }
        this.isMinimized = false;
    }
    bindEvents() {
        this.elements.playBtn.addEventListener('click', () => this.togglePlay());
        this.elements.albumCoverContainer.addEventListener('click', () => {
            if (this.element.classList.contains('minimized')) {
                this.elements.albumCoverContainer.classList.toggle('expanded');
                return;
            }
        });
        this.elements.progressContainer.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.seekTo(e);
            e.preventDefault(); // 防止选中文本
        });
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.seekTo(e);
            }
        });
        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                // 拖动结束后立即更新显示
                this.currentTime = this.audio.currentTime;
                this.updateProgress();
                this.updateTimeDisplay();
            }
        });
        this.elements.progressContainer.addEventListener('click', (e) => {
            if (!this.isDragging) {
                this.seekTo(e);
            }
        });
        let isVolumesDragging = false;
        this.elements.volumeSlider.addEventListener('mousedown', (e) => {
            isVolumesDragging = true;
            this.setVolume(e);
        });
        document.addEventListener('mousemove', (e) => {
            if (isVolumesDragging) {
                this.setVolume(e);
            }
        });
        document.addEventListener('mouseup', () => {
            isVolumesDragging = false;
        });
        this.elements.volumeSlider.addEventListener('click', (e) => this.setVolume(e));
        this.elements.lyricsBtn.addEventListener('click', () => this.toggleLyrics());
        this.elements.minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        
        // 用户交互检测事件
        this.setupUserInteractionDetection();
        
        if (typeof document.hidden !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (this.config.autoPauseDisabled === true) {
                    return;
                }
                if (document.hidden && this.isPlaying) {
                    this.wasPlayingBeforeHidden = true;
                    this.pause();
                } else if (!document.hidden && this.wasPlayingBeforeHidden) {
                    this.play();
                    this.wasPlayingBeforeHidden = false;
                }
            });
        }

        this.element.addEventListener('mouseenter', () => {
            this.restoreOpacity();
        });
        this.element.addEventListener('mouseleave', () => {
            this.startIdleTimer();
        });
        this.applyIdlePolicyOnInit();
    }
    
    setupUserInteractionDetection() {
        // 检测用户交互的事件列表
        const env = NeteaseMiniPlayer.getUAInfo();
        const interactionEvents = env.isMobile ? 
            ['click', 'mousedown', 'touchstart', 'keydown', 'scroll', 'pointerdown'] :
            ['click', 'mousedown', 'touchstart', 'keydown', 'scroll', 'wheel', 'pointerdown'];
        
        const handleUserInteraction = (event) => {
            if (!this.hasUserInteraction) {
                this.hasUserInteraction = true;
                this.lastInteractionTime = Date.now();
                console.log('检测到用户交互:', event.type);
                
                // 存储最后一次交互事件，用于后续用户手势模拟
                this.lastInteractionEvent = event;
                
                const env = NeteaseMiniPlayer.getUAInfo();
                
                if (this.config.autoplay && !this.config.embed && !this.autoplayAttempted) {
                    if (env.isMobile) {
                        // 移动端：直接开始自动播放，不需要检测用户交互
                        this.attemptAutoplay();
                    } else {
                        // 桌面端：只有鼠标在中央区域才开始倒计时
                        if (this.mouseInCenterArea) {
                            this.startAutoplayCountdown();
                        }
                    }
                }
                
                // 不移除事件监听器，继续监听以获取最新的交互事件
            } else {
                // 更新最后交互时间
                this.lastInteractionTime = Date.now();
                this.lastInteractionEvent = event;
            }
        };
        
        // 添加事件监听器（使用捕获阶段确保能检测到交互）
        interactionEvents.forEach(event => {
            document.addEventListener(event, handleUserInteraction, { 
                passive: true, 
                capture: true 
            });
        });
        
        // 同时检测播放器区域的交互
        const playerInteractionEvents = ['click', 'mousedown', 'touchstart'];
        playerInteractionEvents.forEach(event => {
            this.element.addEventListener(event, handleUserInteraction, { 
                passive: true 
            });
        });
        
        // 添加鼠标检测功能
        this.setupMouseDetection();
    }
    
    checkInitialMousePosition() {
        // 初始化时检查鼠标是否已在中央区域
        if (typeof MouseEvent !== 'undefined') {
            try {
                // 检查当前鼠标位置
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const marginX = window.innerWidth * 0.1;
                const marginY = window.innerHeight * 0.1;
                
                // 假设鼠标在中心区域（无法获取实时位置）
                // 如果用户有交互，说明鼠标很可能在页面内
                if (this.hasUserInteraction) {
                    this.mouseInDocument = true;
                    // 不自动设置中央区域，需要实际鼠标移动
                }
            } catch (error) {
                console.warn('检查初始鼠标位置失败:', error);
            }
        }
    }
    
    setupMouseDetection() {
        // 检测是否为移动端
        const env = NeteaseMiniPlayer.getUAInfo();
        if (env.isMobile) {
            // 移动端不需要鼠标检测，直接返回
            console.log('移动端环境，跳过鼠标检测');
            return;
        }
        
        // 初始化鼠标状态
        this.mouseInDocument = true; // 默认认为鼠标在页面内
        
        // 鼠标进入文档 - 使用 window 而不是 document
        window.addEventListener('mouseenter', () => {
            this.mouseInDocument = true;
            this.mouseLeaveTime = 0;
            console.log('鼠标进入文档');
        }, { once: false });
        
        // 鼠标离开文档 - 使用 window 而不是 document
        window.addEventListener('mouseleave', (e) => {
            // 检查是否真的离开了窗口（而不是移动到其他元素）
            if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                this.mouseInDocument = false;
                this.mouseInCenterArea = false;
                this.mouseLeaveTime = Date.now();
                
                // 离开页面时清除自动播放定时器
                if (this.autoplayTimer) {
                    clearTimeout(this.autoplayTimer);
                    this.autoplayTimer = null;
                    console.log('鼠标离开页面，取消自动播放倒计时');
                }
            }
        }, { once: false });
        
        // 鼠标移动检测是否在中央区域
        let lastInCenterArea = false;
        let mouseMoveCount = 0;
        
        document.addEventListener('mousemove', (e) => {
            // 检查窗口尺寸
            if (window.innerWidth <= 0 || window.innerHeight <= 0) return;
            
            // 每次鼠标移动都认为在页面内
            if (!this.mouseInDocument) {
                this.mouseInDocument = true;
                this.mouseLeaveTime = 0;
                console.log('检测到鼠标移动，重置页面内状态');
            }
            
            const env = NeteaseMiniPlayer.getUAInfo();
            
            // 移动端不需要检测中央区域
            if (env.isMobile) {
                return;
            }
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const marginX = window.innerWidth * 0.1; // 10% 边界
            const marginY = window.innerHeight * 0.1; // 10% 边界
            
            // 检查是否在中央区域（距离边界10%）
            const inCenterArea = e.clientX >= marginX && 
                                e.clientX <= (window.innerWidth - marginX) &&
                                e.clientY >= marginY && 
                                e.clientY <= (window.innerHeight - marginY);
            
            // 增加鼠标移动计数，防止误判
            mouseMoveCount++;
            
            // 防止频繁触发状态变化
            if (inCenterArea !== lastInCenterArea) {
                if (inCenterArea && !this.mouseInCenterArea) {
                    // 刚进入中央区域
                    this.mouseInCenterArea = true;
                    this.centerAreaEnterTime = Date.now();
                    console.log('鼠标进入中央区域', `移动次数: ${mouseMoveCount}`);
                    
                    // 如果已有用户交互，开始倒计时
                    if (this.hasUserInteraction && this.config.autoplay && !this.config.embed && !this.autoplayAttempted) {
                        this.startAutoplayCountdown();
                    }
                    
                } else if (!inCenterArea && this.mouseInCenterArea) {
                    // 离开中央区域
                    this.mouseInCenterArea = false;
                    this.centerAreaEnterTime = 0;
                    console.log('鼠标离开中央区域，取消自动播放倒计时', `移动次数: ${mouseMoveCount}`);
                    
                    // 清除自动播放定时器
                    if (this.autoplayTimer) {
                        clearTimeout(this.autoplayTimer);
                        this.autoplayTimer = null;
                    }
                }
                lastInCenterArea = inCenterArea;
            }
        }, { passive: true });
        
        // 添加鼠标进入检测作为备用
        document.addEventListener('mouseover', (e) => {
            if (!this.mouseInDocument) {
                this.mouseInDocument = true;
                this.mouseLeaveTime = 0;
                console.log('mouseover事件检测到鼠标进入');
            }
        }, { passive: true });
    }
    
    startAutoplayCountdown() {
        const env = NeteaseMiniPlayer.getUAInfo();
        
        // 移动端：需要检查是否为页面刷新
        if (env.isMobile) {
            console.log('移动端环境，检查页面刷新状态', {
                hasUserInteraction: this.hasUserInteraction,
                autoplayAttempted: this.autoplayAttempted,
                isPageRefresh: this.isPageRefresh()
            });
            
            if (this.isPageRefresh()) {
                console.log('检测到移动端页面刷新，等待用户交互后播放');
                this.waitForUserInteractionAndPlay();
            } else if (this.hasUserInteraction && !this.autoplayAttempted) {
                this.autoplayAttempted = true;
                this.attemptAutoplay();
            } else {
                console.log(`移动端条件不满足，无法自动播放:`, {
                    hasUserInteraction: this.hasUserInteraction,
                    autoplayAttempted: this.autoplayAttempted,
                    isPageRefresh: this.isPageRefresh()
                });
            }
            return;
        }
        
        // 桌面端：执行原有的倒计时逻辑
        // 清除之前可能存在的定时器
        if (this.autoplayTimer) {
            clearTimeout(this.autoplayTimer);
        }
        
        const startTime = Date.now();
        console.log(`开始${this.mouseReturnDelay}ms自动播放倒计时`, {
            mouseInCenterArea: this.mouseInCenterArea,
            hasUserInteraction: this.hasUserInteraction,
            autoplayAttempted: this.autoplayAttempted,
            mouseInDocument: this.mouseInDocument
        });
        
        this.autoplayTimer = setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            console.log('自动播放倒计时结束，检查条件', `耗时: ${elapsedTime}ms`);
            
            // 桌面端：检查鼠标是否在页面内（不需要检查中央区域）
            if (this.mouseInDocument && this.hasUserInteraction && !this.autoplayAttempted) {
                // 最后一次检查用户是否仍在交互（避免用户已离开但仍触发播放）
                this.checkRecentUserInteraction().then(hasRecentInteraction => {
                    if (hasRecentInteraction) {
                        this.autoplayAttempted = true;
                        console.log('桌面端所有条件满足，开始自动播放');
                        this.attemptAutoplay();
                    } else {
                        console.log('用户近期无交互，取消自动播放');
                    }
                });
            } else {
                console.log(`桌面端条件不满足，取消自动播放:`, {
                    mouseInDocument: this.mouseInDocument,
                    hasUserInteraction: this.hasUserInteraction,
                    autoplayAttempted: this.autoplayAttempted
                });
            }
            
            this.autoplayTimer = null;
        }, this.mouseReturnDelay);
    }
    
    async checkRecentUserInteraction() {
        // 检查最近2秒内是否有用户交互
        const recentInteractionThreshold = 2000; // 2秒
        return new Promise(resolve => {
            let interactionDetected = false;
            
            // 监听用户交互事件
            const env = NeteaseMiniPlayer.getUAInfo();
            const interactionEvents = env.isMobile ? 
                ['mousedown', 'touchstart', 'keydown', 'scroll'] :
                ['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll', 'wheel'];
            
            const handleInteraction = () => {
                interactionDetected = true;
                cleanup();
            };
            
            const cleanup = () => {
                interactionEvents.forEach(event => {
                    document.removeEventListener(event, handleInteraction, { passive: true });
                });
            };
            
            // 添加监听器
            interactionEvents.forEach(event => {
                document.addEventListener(event, handleInteraction, { passive: true });
            });
            
            // 等待500ms检测是否有交互
            setTimeout(() => {
                cleanup();
                resolve(interactionDetected);
            }, recentInteractionThreshold);
        });
    }
    
    async attemptAutoplay() {
        // 确保所有资源已加载完成
        if (!this.resourcesLoaded) {
            console.log('资源尚未完全加载，等待完成后再尝试自动播放');
            return;
        }
        
        const env = NeteaseMiniPlayer.getUAInfo();
        
        // 检测是否来自同域名的内部访问或移动端
        if ((this.referrerInfo && this.referrerInfo.type === 'internal') || env.isMobile) {
            let reason = '';
            if (env.isMobile) {
                reason = '移动端环境';
                // 移动端需要检查是否为页面刷新
                if (this.isPageRefresh()) {
                    console.log('检测到移动端页面刷新，需要用户交互后才能播放');
                    this.waitForUserInteractionAndPlay();
                    return;
                }
            } else {
                reason = '同域名内部访问';
            }
            
            console.log(`检测到${reason}，直接进行播放`);
            if (!this.playlist || this.playlist.length === 0) {
                console.warn('播放列表为空，无法自动播放');
                return;
            }
            
            try {
                console.log(`${reason}，开始自动播放`);
                const playResult = await this.playWithUserGesture();
                
                // 验证是否真的播放成功
                const actuallyPlaying = playResult && !this.audio.paused;
                
                if (!actuallyPlaying) {
                    console.warn('自动播放失败，可能是浏览器策略限制');
                    // 如果是同域名访问失败，尝试等待用户交互后播放
                    if (this.referrerInfo && this.referrerInfo.type === 'internal' && !env.isMobile) {
                        console.log('同域名刷新访问，回退到用户交互模式');
                        this.waitForUserInteractionAndPlay();
                    } else if (env.isMobile) {
                        // 移动端失败时也等待用户交互
                        console.log('移动端播放失败，等待用户交互后播放');
                        this.waitForUserInteractionAndPlay();
                    }
                } else {
                    console.log(`${reason}自动播放成功`);
                    this.autoplayAttempted = true; // 标记已尝试自动播放
                }
            } catch (error) {
                console.warn('自动播放失败:', error);
                // 如果是同域名访问失败，尝试等待用户交互后播放
                if (this.referrerInfo && this.referrerInfo.type === 'internal' && !env.isMobile) {
                    console.log('同域名刷新访问，回退到用户交互模式');
                    this.waitForUserInteractionAndPlay();
                } else if (env.isMobile) {
                    // 移动端失败时也等待用户交互
                    console.log('移动端播放失败，等待用户交互后播放');
                    this.waitForUserInteractionAndPlay();
                }
            }
            return;
        }
        
        // 移动端：不需要检测用户交互
        // 桌面端：检查用户交互和鼠标状态
        if (!env.isMobile) {
            if (!this.hasUserInteraction) {
                console.log('等待用户交互后才能自动播放');
                return;
            }
            if (!this.mouseInDocument) {
                console.log('鼠标未在页面内，暂不自动播放');
                return;
            }
        }
        
        if (!this.playlist || this.playlist.length === 0) {
            console.warn('播放列表为空，无法自动播放');
            return;
        }
        
        try {
            console.log('所有条件检查通过，开始自动播放');
            // 创建用户手势事件来触发播放
            const playResult = await this.playWithUserGesture();
            if (!playResult) {
                console.warn('自动播放失败，可能是浏览器策略限制');
            } else {
                console.log('自动播放成功');
                this.autoplayAttempted = true; // 标记已尝试自动播放
            }
        } catch (error) {
            console.warn('自动播放失败:', error);
        }
    }
    
    // 检测是否为页面刷新
    isPageRefresh() {
        // 检查页面导航类型
        if (window.performance && window.performance.getEntriesByType) {
            const navigationEntries = window.performance.getEntriesByType('navigation');
            if (navigationEntries.length > 0) {
                const navigationType = navigationEntries[0].type;
                return navigationType === 'reload' || navigationType === 'back_forward';
            }
        }
        
        // 备用方案：检查sessionStorage是否已存在标记
        const hasVisited = sessionStorage.getItem('netease_player_visited');
        if (hasVisited) {
            return true; // 已经访问过，说明是刷新或返回
        }
        
        // 首次访问时设置标记
        sessionStorage.setItem('netease_player_visited', 'true');
        return false;
    }

    // 等待用户交互后播放（用于同域名刷新访问的回退方案）
    waitForUserInteractionAndPlay() {
        if (!this.playlist || this.playlist.length === 0) {
            console.warn('播放列表为空，无法自动播放');
            return;
        }
        
        const env = NeteaseMiniPlayer.getUAInfo();
        const reason = env.isMobile ? '移动端' : '同域名刷新访问';
        console.log(`${reason}：等待用户交互后自动播放`);
        
        // 监听用户交互 - 在用户交互的上下文中直接调用 play()
        const handleUserInteraction = async (event) => {
            console.log('检测到用户交互，开始播放');
            
            try {
                // 在真实用户交互上下文中直接播放
                await this.audio.play();
                this.isPlaying = true;
                this.updatePlayButton();
                console.log(`${reason}：用户交互后播放成功`);
                this.autoplayAttempted = true;
                
                // 移除所有监听器
                this.removeUserInteractionListeners(handleUserInteraction);
            } catch (error) {
                console.warn(`${reason}：用户交互后播放失败:`, error);
                // 不移除监听器，继续等待下一次交互
            }
        };
        
        // 添加用户交互监听器（移动端额外添加touchstart）
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });
        document.addEventListener('pointerdown', handleUserInteraction, { once: true });
        
        if (env.isMobile) {
            document.addEventListener('touchstart', handleUserInteraction, { once: true });
        }
        
        // 保存处理函数引用，用于移除监听器
        this.userInteractionHandler = handleUserInteraction;
    }
    
    // 移除用户交互监听器
    removeUserInteractionListeners(handler) {
        const env = NeteaseMiniPlayer.getUAInfo();
        document.removeEventListener('click', handler);
        document.removeEventListener('keydown', handler);
        document.removeEventListener('pointerdown', handler);
        
        if (env.isMobile) {
            document.removeEventListener('touchstart', handler);
        }
    }
    
    async playWithUserGesture() {
        try {
            // 尝试直接播放
            await this.play();
            return true;
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                console.log('浏览器阻止自动播放，尝试使用最近的用户交互事件');
                try {
                    // 检查是否有最近的用户交互事件
                    const timeSinceLastInteraction = Date.now() - (this.lastInteractionTime || 0);
                    if (timeSinceLastInteraction < 5000 && this.lastInteractionEvent) {
                        // 如果最近5秒内有用户交互，尝试在该交互的上下文中播放
                        console.log('使用最近用户交互的上下文尝试播放');
                        
                        // 等待一小段时间
                        await new Promise(resolve => setTimeout(resolve, 50));
                        
                        // 再次尝试播放
                        await this.play();
                        return true;
                    } else {
                        // 创建一个模拟的用户手势事件
                        const playPromise = new Promise((resolve, reject) => {
                            const handleClick = async (e) => {
                                try {
                                    await this.play();
                                    resolve(true);
                                } catch (err) {
                                    reject(err);
                                } finally {
                                    document.removeEventListener('click', handleClick, true);
                                }
                            };
                            
                            // 添加一次性的点击监听器
                            document.addEventListener('click', handleClick, { 
                                capture: true, 
                                once: true 
                            });
                            
                            // 2秒后超时
                            setTimeout(() => {
                                document.removeEventListener('click', handleClick, true);
                                reject(new Error('等待用户点击超时'));
                            }, 2000);
                        });
                        
                        await playPromise;
                        // 验证是否真的在播放
                        return !this.audio.paused;
                    }
                } catch (secondError) {
                    console.warn('用户手势触发播放失败:', secondError);
                    return false;
                }
            } else {
                throw error;
            }
        }
    }

    startIdleTimer() {
        this.clearIdleTimer();
        if (!this.shouldEnableIdleOpacity()) return;
        this.idleTimeout = setTimeout(() => {
            this.triggerFadeOut();
        }, this.idleDelay);
    }

    clearIdleTimer() {
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
    }

    triggerFadeOut() {
        if (!this.shouldEnableIdleOpacity()) return;
        if (this.isIdle) return;
        this.isIdle = true;
        this.element.classList.remove('fading-in');
        const side = this.getDockSide();
        if (side) {
            this.element.classList.add(`docked-${side}`);
        }
        this.element.classList.add('fading-out');
        const onEnd = (e) => {
            if (e.animationName !== 'player-fade-out') return;
            this.element.classList.remove('fading-out');
            this.element.classList.add('idle');
            this.element.removeEventListener('animationend', onEnd);
        };
        this.element.addEventListener('animationend', onEnd);
    }

    restoreOpacity() {
        this.clearIdleTimer();
        const side = this.getDockSide();
        const hasDock = side ? this.element.classList.contains(`docked-${side}`) : false;
        if (hasDock) {
            const popAnim = side === 'right' ? 'player-popout-right' : 'player-popout-left';
            this.element.classList.add(`popping-${side}`);
            const onPopEnd = (e) => {
                if (e.animationName !== popAnim) return;
                this.element.removeEventListener('animationend', onPopEnd);
                this.element.classList.remove(`popping-${side}`);
                this.element.classList.remove(`docked-${side}`);
                if (this.isIdle) {
                    this.isIdle = false;
                }
                this.element.classList.remove('idle', 'fading-out');
                this.element.classList.add('fading-in');
                const onEndIn = (ev) => {
                    if (ev.animationName !== 'player-fade-in') return;
                    this.element.classList.remove('fading-in');
                    this.element.removeEventListener('animationend', onEndIn);
                };
                this.element.addEventListener('animationend', onEndIn);
            };
            this.element.addEventListener('animationend', onPopEnd);
            return;
        }
        if (!this.isIdle) return;
        this.isIdle = false;
        this.element.classList.remove('idle', 'fading-out');
        this.element.classList.add('fading-in');
        const onEndIn = (ev) => {
            if (ev.animationName !== 'player-fade-in') return;
            this.element.classList.remove('fading-in');
            this.element.removeEventListener('animationend', onEndIn);
        };
        this.element.addEventListener('animationend', onEndIn);
    }

    shouldEnableIdleOpacity() {
        return this.isMinimized === true;
    }

    applyIdlePolicyOnInit() {
        if (!this.shouldEnableIdleOpacity()) {
            this.clearIdleTimer();
            this.isIdle = false;
            this.element.classList.remove('idle', 'fading-in', 'fading-out', 'docked-left', 'docked-right', 'popping-left', 'popping-right');
        }
    }
    getDockSide() {
        const pos = this.config.position;
        if (pos === 'top-left' || pos === 'bottom-left') return 'left';
        if (pos === 'top-right' || pos === 'bottom-right') return 'right';
        return 'right';
    }
    
    // 等待所有资源加载完成
    async waitForResourcesLoaded() {
        console.log('开始等待页面资源加载完成...');
        
        // 等待DOM完全加载
        if (document.readyState !== 'complete') {
            await new Promise(resolve => {
                const checkReady = () => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        setTimeout(checkReady, 100);
                    }
                };
                checkReady();
            });
        }
        
        // 等待图片资源加载完成
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            return new Promise(resolve => {
                if (img.complete) {
                    resolve();
                } else {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                }
            });
        });
        
        // 等待CSS文件加载完成
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        const cssPromises = Array.from(links).map(link => {
            return new Promise(resolve => {
                if (link.sheet) {
                    resolve();
                } else {
                    link.addEventListener('load', resolve, { once: true });
                    link.addEventListener('error', resolve, { once: true });
                }
            });
        });
        
        // 合并所有资源加载Promise
        this.loadingPromises = [...imagePromises, ...cssPromises];
        
        if (this.loadingPromises.length > 0) {
            console.log(`等待 ${this.loadingPromises.length} 个资源加载完成...`);
            await Promise.all(this.loadingPromises);
        }
        
        // 额外等待，确保渲染完成
        await new Promise(resolve => setTimeout(resolve, 300));
        
        console.log('页面资源加载完成');
    }
    
    // 等待音频准备就绪
    async waitForAudioReady() {
        if (!this.audio) return;
        
        console.log('等待音频准备就绪...');
        
        // 如果音频已经加载完成
        if (this.audio.readyState >= 2) {
            console.log('音频已准备就绪');
            return;
        }
        
        // 等待音频元数据或可播放状态
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                console.warn('音频加载超时，但继续执行');
                resolve();
            }, 5000);
            
            const cleanup = () => {
                clearTimeout(timeout);
                this.audio.removeEventListener('loadedmetadata', onReady);
                this.audio.removeEventListener('canplay', onReady);
                this.audio.removeEventListener('error', onError);
            };
            
            const onReady = () => {
                cleanup();
                console.log('音频准备就绪');
                resolve();
            };
            
            const onError = (e) => {
                cleanup();
                console.error('音频加载失败:', e);
                resolve(); // 即使失败也继续执行
            };
            
            this.audio.addEventListener('loadedmetadata', onReady);
            this.audio.addEventListener('canplay', onReady);
            this.audio.addEventListener('error', onError);
        });
    }
    
    static getUAInfo() {
        if (NeteaseMiniPlayer._uaCache) return NeteaseMiniPlayer._uaCache;
        const nav = typeof navigator !== 'undefined' ? navigator : {};
        const uaRaw = (nav.userAgent || '');
        const ua = uaRaw.toLowerCase();
        const platform = (nav.platform || '').toLowerCase();
        const maxTP = nav.maxTouchPoints || 0;
        const isWeChat = /micromessenger/.test(ua);
        const isQQ = /(mqqbrowser| qq)/.test(ua);
        const isInAppWebView = /\bwv\b|; wv/.test(ua) || /version\/\d+.*chrome/.test(ua);
        const isiPhone = /iphone/.test(ua);
        const isiPadUA = /ipad/.test(ua);
        const isIOSLikePad = !isiPadUA && platform.includes('mac') && maxTP > 1;
        const isiOS = isiPhone || isiPadUA || isIOSLikePad;
        const isAndroid = /android/.test(ua);
        const isHarmonyOS = /harmonyos/.test(uaRaw) || /huawei|honor/.test(ua);
        const isMobileToken = /mobile/.test(ua) || /sm-|mi |redmi|huawei|honor|oppo|vivo|oneplus/.test(ua);
        const isHarmonyDesktop = isHarmonyOS && !isMobileToken && !isAndroid && !isiOS;
        const isPWA = (typeof window !== 'undefined' && (
            (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
            (nav.standalone === true)
        )) || false;
        const isMobile = (isiOS || isAndroid || (isHarmonyOS && !isHarmonyDesktop) || isMobileToken || isInAppWebView);
        const info = { isMobile, isiOS, isAndroid, isHarmonyOS, isHarmonyDesktop, isWeChat, isQQ, isInAppWebView, isPWA, isiPad: isiPadUA || isIOSLikePad };
        NeteaseMiniPlayer._uaCache = info;
        return info;
    }
    applyResponsiveControls() {
        const env = NeteaseMiniPlayer.getUAInfo();
        const shouldHideVolume = !!env.isMobile;
        this.element.classList.toggle('mobile-env', shouldHideVolume);
        if (this.elements && this.elements.volumeContainer == null) {
            this.elements.volumeContainer = this.element.querySelector('.volume-container');
        }
        if (this.elements.volumeContainer) {
            if (shouldHideVolume) {
                this.elements.volumeContainer.classList.add('sr-visually-hidden');
                this.elements.volumeContainer.setAttribute('aria-hidden', 'false');
                this.elements.volumeSlider?.setAttribute('aria-label', '音量控制（移动端隐藏，仅无障碍可见）');
            } else {
                this.elements.volumeContainer.classList.remove('sr-visually-hidden');
                this.elements.volumeContainer.removeAttribute('aria-hidden');
                this.elements.volumeSlider?.removeAttribute('aria-label');
            }
        }
    }
    setupEnvListeners() {
        const reapply = () => this.applyResponsiveControls();
        if (window.matchMedia) {
            try {
                const mq1 = window.matchMedia('(orientation: portrait)');
                const mq2 = window.matchMedia('(orientation: landscape)');
                mq1.addEventListener?.('change', reapply);
                mq2.addEventListener?.('change', reapply);
            } catch (e) {
                mq1.onchange = reapply;
                mq2.onchange = reapply;
            }
        } else {
            window.addEventListener('orientationchange', reapply);
        }
        window.addEventListener('resize', reapply);
    }
    setupAudioEvents() {
        this.audio.addEventListener('loadedmetadata', () => {
            console.log('音频元数据已加载，时长:', this.audio.duration);
            this.duration = this.audio.duration;
            this.updateTimeDisplay();
            // 立即更新一次进度条
            this.updateProgress();
        });
        this.audio.addEventListener('timeupdate', () => {
            // 只有在不在拖动状态下才更新 currentTime
            if (!this.isDragging) {
                this.currentTime = this.audio.currentTime;
                this.updateProgress();
                this.updateLyrics();
                this.updateTimeDisplay();
            }
        });
        this.audio.addEventListener('ended', async () => {
            // 歌曲结束后重新播放当前歌曲
            // 只有在不拖动且真正播放到结尾时才重置
            if (!this.isDragging && this.audio.currentTime >= this.duration * 0.98) {
                this.audio.currentTime = 0;
                if (this.isPlaying) {
                    await this.play();
                }
            }
        });
        this.audio.addEventListener('error', async (e) => {
            console.error('音频播放错误:', e);
            console.error('错误详情:', {
                code: e.target.error?.code,
                message: e.target.error?.message,
                src: e.target.src
            });
            // 静默处理播放失败，尝试下一首
            setTimeout(async () => {
                await this.nextSong();
            }, 1000);
        });
        this.audio.addEventListener('abort', () => {
            console.warn('音频加载被中断');
        });
        this.audio.addEventListener('stalled', () => {
            console.warn('音频加载停滞，尝试重新加载...');
            // 尝试重新加载音频
            setTimeout(() => {
                if (this.audio.src && this.audio.paused) {
                    const currentTime = this.audio.currentTime;
                    this.audio.load();
                    this.audio.currentTime = currentTime;
                }
            }, 1000);
        });
        this.audio.addEventListener('canplay', () => {
            console.log('音频可以播放');
            if (this.isPlaying && this.audio.paused) {
                this.audio.play().catch(e => {
                    if (e.name !== 'AbortError') {
                        console.error('自动播放失败:', e);
                    }
                });
            }
        });
        this.audio.volume = this.volume;
        this.updateVolumeDisplay();
    }
    async loadLocalFiles() {
        if (!this.config.musicFile) {
            throw new Error('未指定音乐文件');
        }
        
        // 从文件名提取歌名和歌手信息
        const fileName = this.config.musicFile.split('/').pop().split('\\').pop();
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        
        let songName = nameWithoutExt;
        let artistName = '未知艺术家';
        
        // 尝试解析 "歌名-歌手" 格式
        if (nameWithoutExt.includes('-')) {
            const parts = nameWithoutExt.split('-');
            if (parts.length === 2) {
                songName = parts[0].trim();
                artistName = parts[1].trim();
            }
        }
        
        // 创建歌曲对象
        const song = {
            id: 'local_' + Date.now(),
            name: songName,
            artists: artistName,
            album: '本地文件',
            picUrl: '',
            duration: 0,
            url: this.config.musicFile
        };
        
        this.playlist = [song];
        
        // 如果有歌词文件，预加载歌词
        if (this.config.lyricFile) {
            // 先清空现有歌词显示
            if (this.elements.lyricLine) {
                this.elements.lyricLine.textContent = '♪ 加载歌词中... ♪';
            }
            if (this.elements.lyricTranslation) {
                this.elements.lyricTranslation.style.display = 'none';
            }
            await this.loadLocalLyrics();
        }
    }
    getCacheKey(type, id) {
        return `${type}_${id}`;
    }
    setCache(key, data, expiry = 5 * 60 * 1000) {
        this.cache.set(key, {
            data,
            expiry: Date.now() + expiry
        });
    }
    getCache(key) {
        const cached = this.cache.get(key);
        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    async loadCurrentSong() {
        if (this.playlist.length === 0) return;
        
        if (this.showLyrics) {
            this.elements.lyricLine.textContent = '♪ 加载歌词中... ♪';
            this.elements.lyricTranslation.style.display = 'none';
            this.elements.lyricLine.classList.remove('current', 'scrolling');
            this.elements.lyricTranslation.classList.remove('current', 'scrolling');
            this.lyrics = [];
            this.currentLyricIndex = -1;
        }
        
        const song = this.playlist[this.currentIndex];
        this.currentSong = song;
        this.updateSongInfo(song);
        
        // 设置封面：优先使用配置的封面URL，然后是歌曲封面，最后使用随机API
        if (this.config.coverUrl) {
            this.elements.albumCover.src = this.config.coverUrl;
        } else if (song.picUrl) {
            this.elements.albumCover.src = song.picUrl;
        } else {
            // 使用随机API获取封面
            const randomSeed = Math.random().toString(36).substring(7);
            this.elements.albumCover.src = `https://picsum.photos/seed/${randomSeed}/300/300.jpg`;
            
            // 为随机图片添加错误处理
            this.elements.albumCover.onerror = () => {
                console.warn('随机封面加载失败，使用默认封面');
                this.elements.albumCover.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiNmMGYwZjAiLz4KPHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMiAyWk0xMiAxNkM5Ljc5IDE2IDggMTQuMjEgOCAxMlM5Ljc5IDggMTIgOFMxNiA5Ljc5IDE2IDEyUzE0LjIxIDE2IDEyIDE2WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4KPC9zdmc+';
            };
        }
        
        // 设置音频源
        this.audio.src = song.url;
        console.log('音频源设置:', song.url);
        
        // 强制音频加载以确保元数据可用
        try {
            // 添加超时保护，避免长时间阻塞
            const loadPromise = this.audio.load();
            if (loadPromise) {
                await Promise.race([
                    loadPromise,
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('音频加载超时')), 3000)
                    )
                ]);
            }
        } catch (error) {
            if (error.message !== '音频加载超时') {
                console.error('音频加载失败:', error);
            }
        }
        
        if (this.showLyrics) {
            await this.loadLyrics(song.id);
        }
    }
    updateSongInfo(song) {
        if (!song) return;
        this.elements.songTitle.textContent = song.name || '未知歌曲';
        if (song.artists) {
            const truncatedArtist = this.truncateArtistName(song.artists);
            this.elements.songArtist.textContent = truncatedArtist;
            if (truncatedArtist !== song.artists) {
                this.elements.songArtist.setAttribute('title', song.artists);
            } else {
                this.elements.songArtist.removeAttribute('title');
            }
        }
    }
    truncateArtistName(artistText) {
        if (!artistText) return '';
        const tempElement = document.createElement('span');
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        tempElement.style.fontSize = '12px';
        tempElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        tempElement.textContent = artistText;
        document.body.appendChild(tempElement);
        const fullWidth = tempElement.offsetWidth;
        const availableWidth = 200;
        if (fullWidth <= availableWidth) {
            document.body.removeChild(tempElement);
            return artistText;
        }
        const artists = artistText.split(' / ');
        let result = '';
        let currentWidth = 0;
        for (let i = 0; i < artists.length; i++) {
            const testText = result ? `${result} / ${artists[i]}` : artists[i];
            tempElement.textContent = testText + '...';
            const testWidth = tempElement.offsetWidth;
            if (testWidth > availableWidth) {
                if (result) {
                    break;
                } else {
                    const artist = artists[i];
                    for (let j = 1; j < artist.length; j++) {
                        const partialArtist = artist.substring(0, j);
                        tempElement.textContent = partialArtist + '...';
                        if (tempElement.offsetWidth > availableWidth) {
                            result = artist.substring(0, Math.max(1, j - 1));
                            break;
                        }
                        result = partialArtist;
                    }
                    break;
                }
            }
            result = testText;
        }
        document.body.removeChild(tempElement);
        return result + (result !== artistText ? '...' : '');
    }


    async loadLocalLyrics() {
        if (!this.config.lyricFile) {
            this.lyrics = [];
            return;
        }
        
        try {
            const response = await fetch(this.config.lyricFile);
            if (!response.ok) {
                throw new Error(`歌词文件加载失败: ${response.status}`);
            }
            const lyricText = await response.text();
            this.parseLyricText(lyricText);
        } catch (error) {
            console.error('加载本地歌词失败:', error);
            this.lyrics = [];
        }
    }
    
    async loadLyrics(songId) {
        // 保持兼容性，但实际调用本地歌词加载
        await this.loadLocalLyrics();
    }
    parseLyricText(lyricText) {
        this.lyrics = [];
        this.currentLyricIndex = -1;
        
        if (!lyricText) {
            this.elements.lyricLine.textContent = '暂无歌词';
            this.elements.lyricTranslation.style.display = 'none';
            this.elements.lyricLine.classList.remove('current', 'scrolling');
            this.elements.lyricTranslation.classList.remove('current', 'scrolling');
            return;
        }
        
        const lrcMap = new Map();
        const tlyricMap = new Map();
        const lrcLines = lyricText.split('\n');
        
        lrcLines.forEach(line => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
            if (match) {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3].padEnd(3, '0'));
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = match[4].trim();
                if (text && !text.startsWith('[')) { // 过滤掉元数据标签
                    lrcMap.set(time, text);
                }
            }
        });
        
        const allTimes = Array.from(lrcMap.keys()).sort((a, b) => a - b);
        this.lyrics = allTimes.map(time => ({
            time,
            text: lrcMap.get(time) || '',
            translation: ''
        }));
        this.currentLyricIndex = -1;
        this.updateLyrics();
    }
    
    parseLyrics(lyricData) {
        // 保持兼容性，直接调用歌词文本解析
        this.parseLyricText('');
    }
    async togglePlay() {
        // 防抖处理
        if (this.playPauseDebounce) {
            console.log('播放控制防抖中，忽略点击');
            return;
        }
        
        this.playPauseDebounce = true;
        setTimeout(() => {
            this.playPauseDebounce = false;
        }, this.playPauseDebounceDelay);
        
        if (this.isPlaying) {
            this.pause();
        } else {
            await this.play();
        }
    }
    async play() {
        GlobalAudioManager.setCurrent(this);
        
        // 确保所有资源已加载完成
        if (!this.resourcesLoaded) {
            console.log('等待资源加载完成后再播放...');
            await this.waitForResourcesLoaded();
        }
        
        // 确保音频已加载
        if (this.audio.readyState < 2) {
            console.log('音频未就绪，等待加载...');
            await this.waitForAudioReady();
        }
        
        try {
            // 确保音频没有暂停
            if (!this.audio.paused) {
                console.log('音频已在播放中');
                return;
            }
            
            // 使用用户手势触发播放
            const playPromise = this.audio.play();
            if (playPromise) {
                await playPromise;
            }
            
            this.isPlaying = true;
            this.elements.playIcon.style.display = 'none';
            this.elements.pauseIcon.style.display = 'inline';
            this.elements.albumCover.classList.add('playing');
            this.elements.albumCoverContainer.classList.add('playing');
            this.element.classList.add('player-playing');
            console.log('播放成功');
        } catch (error) {
            console.error('播放失败:', error);
            if (error.name === 'AbortError') {
                console.warn('播放被中断，可能是快速点击导致的');
                // 不显示错误给用户，因为这通常是正常操作
            } else if (error.name === 'NotAllowedError') {
                // 静默处理自动播放失败，不显示错误信息
            } else if (error.name === 'NotSupportedError') {
                // 静默处理音频格式不支持
            } else {
                // 静默处理播放失败
            }
        }
    }
    pause() {
        if (this.audio && !this.audio.paused) {
            this.audio.pause();
            console.log('音频已暂停');
        }
        this.isPlaying = false;
        if (this.elements.playIcon) this.elements.playIcon.style.display = 'inline';
        if (this.elements.pauseIcon) this.elements.pauseIcon.style.display = 'none';
        if (this.elements.albumCover) this.elements.albumCover.classList.remove('playing');
        if (this.elements.albumCoverContainer) this.elements.albumCoverContainer.classList.remove('playing');
        if (this.element) this.element.classList.remove('player-playing');
    }
    async previousSong() {
        // 已禁用切歌功能
    }
    async nextSong() {
        // 已禁用切歌功能，歌曲结束后重新播放
        this.audio.currentTime = 0;
        if (this.isPlaying) {
            await this.play();
        }
    }
    updateProgress() {
        if (this.duration > 0) {
            const progress = (this.currentTime / this.duration) * 100;
            if (this.elements.progressBar) {
                this.elements.progressBar.style.width = `${progress}%`;
            } else {
                console.warn('进度条元素未找到');
            }
        } else {
            // 当duration为0时，尝试从audio元素获取
            if (this.audio && this.audio.duration && !isNaN(this.audio.duration)) {
                this.duration = this.audio.duration;
                const progress = (this.currentTime / this.duration) * 100;
                if (this.elements.progressBar) {
                    this.elements.progressBar.style.width = `${progress}%`;
                }
            }
        }
    }
    updateTimeDisplay() {
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };
        this.elements.currentTime.textContent = formatTime(this.currentTime);
        this.elements.totalTime.textContent = formatTime(this.duration);
    }
    updateVolumeDisplay() {
        this.elements.volumeBar.style.width = `${this.volume * 100}%`;
    }
    updateLyrics() {
        if (this.lyrics.length === 0) return;
        let newIndex = -1;
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.currentTime >= this.lyrics[i].time) {
                newIndex = i;
            } else {
                break;
            }
        }
        if (newIndex !== this.currentLyricIndex) {
            this.currentLyricIndex = newIndex;
            if (newIndex >= 0 && newIndex < this.lyrics.length) {
                const lyric = this.lyrics[newIndex];
                const lyricText = lyric.text || '♪';
            
                this.elements.lyricLine.classList.remove('current');
            
                requestAnimationFrame(() => {
                    this.elements.lyricLine.textContent = lyricText;
                    this.checkLyricScrolling(this.elements.lyricLine, lyricText);
            
                    this.elements.lyricLine.classList.add('current');
            
                    if (lyric.translation) {
                        this.elements.lyricTranslation.textContent = lyric.translation;
                        this.elements.lyricTranslation.style.display = 'block';
                        this.elements.lyricTranslation.classList.remove('current'); 
                        requestAnimationFrame(() => {
                            this.elements.lyricTranslation.classList.add('current'); 
                        });
                    } else {
                        this.elements.lyricTranslation.style.display = 'none';
                        this.elements.lyricTranslation.classList.remove('current', 'scrolling');
                    }
                });
            
                this.elements.lyricsContainer.classList.add('switching');
                setTimeout(() => {
                    this.elements.lyricsContainer.classList.remove('switching');
                }, 500);
                if (lyric.translation) {
                    this.elements.lyricTranslation.textContent = lyric.translation;
                    this.elements.lyricTranslation.classList.add('current');
                    this.elements.lyricTranslation.style.display = 'block';
                    this.checkLyricScrolling(this.elements.lyricTranslation, lyric.translation);
                } else {
                    this.elements.lyricTranslation.style.display = 'none';
                    this.elements.lyricTranslation.classList.remove('current', 'scrolling');
                }
            } else {
                this.elements.lyricLine.textContent = '♪ 纯音乐，请欣赏 ♪';
                this.elements.lyricLine.classList.remove('current', 'scrolling');
                this.elements.lyricTranslation.style.display = 'none';
                this.elements.lyricTranslation.classList.remove('current', 'scrolling');
            }
        }
    }
    checkLyricScrolling(element, text) {
        if (!element || !text) return;
        const tempElement = document.createElement('span');
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        tempElement.style.fontSize = window.getComputedStyle(element).fontSize;
        tempElement.style.fontFamily = window.getComputedStyle(element).fontFamily;
        tempElement.style.fontWeight = window.getComputedStyle(element).fontWeight;
        tempElement.textContent = text;
        document.body.appendChild(tempElement);
        const textWidth = tempElement.offsetWidth;
        document.body.removeChild(tempElement);
        const containerWidth = element.parentElement.offsetWidth - 16;
        if (textWidth > containerWidth) {
            element.classList.add('scrolling');
        } else {
            element.classList.remove('scrolling');
        }
    }
    updatePlaylistDisplay() {
        // 已移除列表功能
    }
    seekTo(e) {
        if (!this.elements.progressContainer || !this.audio) {
            console.warn('seekTo: 缺少必要元素', {
                progressContainer: !!this.elements.progressContainer,
                audio: !!this.audio
            });
            return;
        }
        const rect = this.elements.progressContainer.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = percent * this.duration;
        
        if (isFinite(newTime) && newTime >= 0 && this.duration > 0) {
            this.audio.currentTime = newTime;
            // 拖动时立即更新显示
            this.currentTime = newTime;
            this.updateProgress();
            this.updateTimeDisplay();
            console.log('进度跳转到:', newTime.toFixed(2) + 's', percent * 100 + '%');
        }
    }
    setVolume(e) {
        if (!this.elements.volumeSlider) return;
        const rect = this.elements.volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.volume = percent;
        this.audio.volume = this.volume;
        this.updateVolumeDisplay();
    }
    toggleLyrics() {
        this.showLyrics = !this.showLyrics;
        this.elements.lyricsContainer.classList.toggle('hidden', !this.showLyrics);
        this.elements.lyricsBtn.classList.toggle('active', this.showLyrics);
    }
    togglePlaylist(show = null) {
        // 已移除列表功能
    }
    togglePlayMode() {
        // 已移除播放模式功能
    }
    toggleMinimize() {
        if (this.config.embed || this.config.position === 'static') {
            console.log('嵌入模式或静态位置不支持最小化');
            return;
        }
        
        this.isMinimized = !this.isMinimized;
        this.element.classList.toggle('minimized', this.isMinimized);
        
        // 更新图标显示
        if (this.elements.minimizeIcon && this.elements.maximizeIcon) {
            this.elements.minimizeIcon.style.display = this.isMinimized ? 'none' : 'inline';
            this.elements.maximizeIcon.style.display = this.isMinimized ? 'inline' : 'none';
        }
        
        // 更新按钮标题
        if (this.elements.minimizeBtn) {
            this.elements.minimizeBtn.title = this.isMinimized ? '恢复' : '最小化';
        }
        
        // 应用或清除空闲策略
        if (this.isMinimized) {
            this.startIdleTimer();
            console.log('播放器已最小化');
        } else {
            this.clearIdleTimer();
            this.restoreOpacity();
            console.log('播放器已恢复');
        }
    }
    determinePlaylistDirection() {
        // 已移除列表功能
    }
    setupDragAndDrop() {
        return;
    }
    showError(message) {
        // 只在控制台记录错误，不显示给用户
        console.error('Player error:', message);
        // 保持显示歌曲信息，不覆盖标题
    }
    initTheme() {
        this.setTheme(this.config.theme);
        if (this.config.theme === 'auto') {
            this.setupThemeListener();
        }
    }
    setTheme(theme) {
        if (theme === 'auto') {
            const detectedTheme = this.detectTheme();
            this.element.setAttribute('data-theme', 'auto');
            if (detectedTheme === 'dark') {
                this.element.classList.add('theme-dark-detected');
            } else {
                this.element.classList.remove('theme-dark-detected');
            }
        } else {
            this.element.setAttribute('data-theme', theme);
            this.element.classList.remove('theme-dark-detected');
        }
    }
    detectTheme() {
        const hostTheme = this.detectHostTheme();
        if (hostTheme) {
            return hostTheme;
        }
        const cssTheme = this.detectCSSTheme();
        if (cssTheme) {
            return cssTheme;
        }
        return this.detectSystemTheme();
    }
    detectHostTheme() {
        const html = document.documentElement;
        const body = document.body;
        const darkClasses = ['dark', 'theme-dark', 'dark-theme', 'dark-mode'];
        const lightClasses = ['light', 'theme-light', 'light-theme', 'light-mode'];
        for (const className of darkClasses) {
            if (html.classList.contains(className)) return 'dark';
        }
        for (const className of lightClasses) {
            if (html.classList.contains(className)) return 'light';
        }
        if (body) {
            for (const className of darkClasses) {
                if (body.classList.contains(className)) return 'dark';
            }
            for (const className of lightClasses) {
                if (body.classList.contains(className)) return 'light';
            }
        }
        const htmlTheme = html.getAttribute('data-theme');
        if (htmlTheme === 'dark' || htmlTheme === 'light') {
            return htmlTheme;
        }
        const bodyTheme = body?.getAttribute('data-theme');
        if (bodyTheme === 'dark' || bodyTheme === 'light') {
            return bodyTheme;
        }
        return null;
    }
    detectCSSTheme() {
        try {
            const rootStyles = getComputedStyle(document.documentElement);
            const bgColor = rootStyles.getPropertyValue('--bg-color') || 
                           rootStyles.getPropertyValue('--background-color') ||
                           rootStyles.getPropertyValue('--color-bg');
            const textColor = rootStyles.getPropertyValue('--text-color') || 
                             rootStyles.getPropertyValue('--color-text') ||
                             rootStyles.getPropertyValue('--text-primary');
            if (bgColor || textColor) {
                const isDarkBg = this.isColorDark(bgColor);
                const isLightText = this.isColorLight(textColor);
                if (isDarkBg || isLightText) {
                    return 'dark';
                }
                if (!isDarkBg || !isLightText) {
                    return 'light';
                }
            }
        } catch (error) {
            console.warn('CSS主题检测失败:', error);
        }
        return null;
    }
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    isColorDark(color) {
        if (!color) return false;
        color = color.replace(/\s/g, '').toLowerCase();
        if (color.includes('dark') || color.includes('black') || color === 'transparent') {
            return true;
        }
        const rgb = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
        if (rgb) {
            const [, r, g, b] = rgb.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128;
        }
        const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
        if (hex) {
            const hexValue = hex[1];
            const r = parseInt(hexValue.length === 3 ? hexValue[0] + hexValue[0] : hexValue.substr(0, 2), 16);
            const g = parseInt(hexValue.length === 3 ? hexValue[1] + hexValue[1] : hexValue.substr(2, 2), 16);
            const b = parseInt(hexValue.length === 3 ? hexValue[2] + hexValue[2] : hexValue.substr(4, 2), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128;
        }
        return false;
    }
    isColorLight(color) {
        return !this.isColorDark(color);
    }
    setupThemeListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleThemeChange = () => {
                if (this.config.theme === 'auto') {
                    this.setTheme('auto');
                }
            };
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleThemeChange);
            } else {
                mediaQuery.addListener(handleThemeChange);
            }
        }
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                if (this.config.theme === 'auto') {
                    let shouldUpdate = false;
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && 
                            (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
                            shouldUpdate = true;
                        }
                    });
                    if (shouldUpdate) {
                        this.setTheme('auto');
                    }
                }
            });
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-theme']
            });
            if (document.body) {
                observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme']
                });
            }
        }
    }
    static init() {
        document.querySelectorAll('.netease-mini-player').forEach(element => {
            if (!element._neteasePlayer) {
                element._neteasePlayer = new NeteaseMiniPlayer(element);
            }
        });
    }
    static initPlayer(element) {
        if (!element._neteasePlayer) {
            element._neteasePlayer = new NeteaseMiniPlayer(element);
        }
        return element._neteasePlayer;
    }
}
if (typeof window !== 'undefined') {
    window.NeteaseMiniPlayer = NeteaseMiniPlayer;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', NeteaseMiniPlayer.init);
    } else {
        NeteaseMiniPlayer.init();
    }
}

class NMPv2ShortcodeParser {
    constructor() {
        this.paramMappings = {
            'position': 'data-position',
            'theme': 'data-theme',
            'lyric': 'data-lyric',
            'embed': 'data-embed',
            'minimized': 'data-default-minimized',
            'autoplay': 'data-autoplay',
            'idle-opacity': 'data-idle-opacity',
            'auto-pause': 'data-auto-pause',
            'cover-mode': 'data-cover-mode',
            'cover-url': 'data-cover-url'
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.processContainer(document.body);
    }

    /**
     * 处理容器内的所有短语法
     */
    processContainer(container) {
        this.processTextNodes(container);
        this.processExistingElements(container);
        this.initializePlayers(container);
    }

    /**
     * 处理文本节点中的短语法
     */
    processTextNodes(container) {
        const walker = document.createTreeWalker(
            container, 
            NodeFilter.SHOW_TEXT, 
            null, 
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes('{nmpv2:')) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(node => {
            const content = node.textContent;
            const shortcodes = this.extractShortcodes(content);
            
            if (shortcodes.length > 0) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;

                shortcodes.forEach(shortcode => {
                    if (shortcode.startIndex > lastIndex) {
                        fragment.appendChild(document.createTextNode(
                            content.substring(lastIndex, shortcode.startIndex)
                        ));
                    }

                    const playerElement = this.createPlayerElement(shortcode);
                    fragment.appendChild(playerElement);

                    lastIndex = shortcode.endIndex;
                });

                if (lastIndex < content.length) {
                    fragment.appendChild(document.createTextNode(
                        content.substring(lastIndex)
                    ));
                }

                node.parentNode.replaceChild(fragment, node);
            }
        });
    }

    processExistingElements(container) {
        container.querySelectorAll('.netease-mini-player:not([data-shortcode-processed])')
            .forEach(element => {
                element.setAttribute('data-shortcode-processed', 'true');
            });
    }

    initializePlayers(container) {
        container.querySelectorAll('.netease-mini-player:not([data-initialized])')
            .forEach(element => {
                element.setAttribute('data-initialized', 'true');
                NeteaseMiniPlayer.initPlayer(element);
            });
    }

    extractShortcodes(text) {
        const regex = /\{nmpv2:([^}]*)\}/g;
        let match;
        const results = [];
        let lastIndex = 0;

        while ((match = regex.exec(text)) !== null) {
            const content = match[1].trim();
            const startIndex = match.index;
            const endIndex = match.index + match[0].length;

            let shortcode = {
                type: 'song',
                id: null,
                params: {},
                startIndex,
                endIndex
            };

            this.parseShortcodeContent(content, shortcode);
            results.push(shortcode);
        }

        return results;
    }

    parseShortcodeContent(content, shortcode) {
        if (content.startsWith('playlist=')) {
            shortcode.type = 'playlist';
            const parts = content.split(/,\s*/);
            const firstPart = parts.shift();
            shortcode.id = firstPart.replace('playlist=', '').trim();
            
            parts.forEach(part => this.parseParam(part, shortcode.params));
        } else if (content.includes('=')) {
            const parts = content.split(/,\s*/);
            const firstPart = parts.shift();
            
            if (firstPart.includes('=')) {
                this.parseParam(firstPart, shortcode.params);
                parts.forEach(part => this.parseParam(part, shortcode.params));
            } else {
                shortcode.id = firstPart.trim();
                parts.forEach(part => this.parseParam(part, shortcode.params));
            }
        } else {
            shortcode.id = content.trim();
        }

        if (shortcode.params.position === undefined || shortcode.params.position === 'static') {
            shortcode.params.embed = shortcode.params.embed ?? 'true';
        } else if (shortcode.params.embed === undefined) {
            shortcode.params.embed = 'false';
        }
    }

    parseParam(paramStr, params) {
        const [key, value] = paramStr.split('=');
        if (!key || !value) return;

        const cleanKey = key.trim().toLowerCase();
        const cleanValue = value.trim().toLowerCase();

        if (cleanKey === 'song-id') {
            params.songId = cleanValue;
        } else if (cleanKey === 'playlist-id') {
            params.playlistId = cleanValue;
            params.type = 'playlist';
        } else if (cleanKey === 'minimized') {
            params.defaultMinimized = cleanValue === 'true' ? 'true' : 'false';
        } else {
            const mapping = this.paramMappings[cleanKey] || `data-${cleanKey}`;
            params[cleanKey] = cleanValue;
        }
    }

    createPlayerElement(shortcode) {
        const div = document.createElement('div');
        div.className = 'netease-mini-player';
        div.setAttribute('data-shortcode-processed', 'true');

        if (shortcode.type === 'playlist' && shortcode.id) {
            div.setAttribute('data-playlist-id', shortcode.id);
        } else if (shortcode.id) {
            div.setAttribute('data-song-id', shortcode.id);
        }

        Object.entries(shortcode.params).forEach(([key, value]) => {
            if (key === 'songId') {
                div.setAttribute('data-song-id', value);
            } else if (key === 'playlistId') {
                div.setAttribute('data-playlist-id', value);
            } else if (key === 'type') {
            } else {
                const dataKey = this.paramMappings[key] || `data-${key}`;
                div.setAttribute(dataKey, value);
            }
        });

        return div;
    }

    static processDynamicContent(content) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        window.nmpv2ShortcodeParser.processContainer(tempDiv);
        return tempDiv.innerHTML;
    }
}

if (typeof window !== 'undefined') {
    window.nmpv2ShortcodeParser = new NMPv2ShortcodeParser();
    
    window.processNMPv2Shortcodes = function(container) {
        if (container instanceof Element) {
            window.nmpv2ShortcodeParser.processContainer(container);
        } else {
            console.warn('processNMPv2Shortcodes requires a DOM element');
        }
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderShortcodes: function(html) {
            return html.replace(/\{nmpv2:([^}]*)\}/g, (match, content) => {
                let shortcode = {
                    type: 'song',
                    id: null,
                    params: {}
                };
                
                if (content.startsWith('playlist=')) {
                    shortcode.type = 'playlist';
                    const parts = content.split(/,\s*/);
                    shortcode.id = parts[0].replace('playlist=', '').trim();
                    parts.slice(1).forEach(part => {
                        const [key, value] = part.split('=');
                        if (key && value) shortcode.params[key.trim()] = value.trim();
                    });
                } else {
                    const parts = content.split(/,\s*/);
                    if (parts[0].includes('=')) {
                        parts.forEach(part => {
                            const [key, value] = part.split('=');
                            if (key && value) shortcode.params[key.trim()] = value.trim();
                        });
                    } else {
                        shortcode.id = parts[0].trim();
                        parts.slice(1).forEach(part => {
                            const [key, value] = part.split('=');
                            if (key && value) shortcode.params[key.trim()] = value.trim();
                        });
                    }
                }

                if (!shortcode.params.position || shortcode.params.position === 'static') {
                    shortcode.params.embed = shortcode.params.embed ?? 'true';
                } else if (shortcode.params.embed === undefined) {
                    shortcode.params.embed = 'false';
                }

                let html = '<div class="netease-mini-player"';
                
                if (shortcode.type === 'playlist' && shortcode.id) {
                    html += ` data-playlist-id="${shortcode.id}"`;
                } else if (shortcode.id) {
                    html += ` data-song-id="${shortcode.id}"`;
                }

                Object.entries(shortcode.params).forEach(([key, value]) => {
                    if (key === 'songId') {
                        html += ` data-song-id="${value}"`;
                    } else if (key === 'playlistId') {
                        html += ` data-playlist-id="${value}"`;
                    } else {
                        const dataKey = {
                            'position': 'data-position',
                            'theme': 'data-theme',
                            'lyric': 'data-lyric',
                            'embed': 'data-embed',
                            'minimized': 'data-default-minimized',
                            'autoplay': 'data-autoplay',
                            'idle-opacity': 'data-idle-opacity',
                            'auto-pause': 'data-auto-pause',
                            'cover-mode': 'data-cover-mode',
                            'cover-url': 'data-cover-url'
                        }[key] || `data-${key}`;
                        html += ` ${dataKey}="${value}"`;
                    }
                });

                html += '></div>';
                return html;
            });
        }
    };
}

console.log(["版本号 v2.1.0", "NeteaseMiniPlayer V2 [NMPv2]", "BHCN STUDIO & 北海的佰川（ImBHCN[numakkiyu]）", "BHCN STUDIO & 夏雨（Skytech Studio）", "基于 Apache 2.0 开源协议发布"].join("\n"));
