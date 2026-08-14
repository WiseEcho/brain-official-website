/**
 * 视频大脑官网 - 交互逻辑
 */

(function () {
  'use strict';

  /* ========================================
     DOM 元素引用
     ======================================== */
  const els = {
    videoModal: document.getElementById('video-modal'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    testimonialTrack: document.getElementById('testimonial-track'),
    testimonialPrev: document.getElementById('testimonial-prev'),
    testimonialNext: document.getElementById('testimonial-next'),
    header: document.querySelector('header'),
    // Mobile optimization
    mobileStickyCta: document.getElementById('mobile-sticky-cta'),
    heroSection: document.getElementById('hero'),
    featureTabs: document.getElementById('feature-tabs'),
    heroVideo: document.getElementById('hero-video'),
    heroVideoPlayToggle: document.getElementById('hero-video-play-toggle'),
    heroVideoPlayIcon: document.getElementById('hero-video-play-icon'),
    heroVideoProgress: document.getElementById('hero-video-progress'),
    heroVideoCurrentTime: document.getElementById('hero-video-current-time'),
    heroVideoDuration: document.getElementById('hero-video-duration'),
    muteToggle: document.getElementById('mute-toggle'),
    muteIcon: document.getElementById('mute-icon'),
  };

  /* ========================================
     Hero 视频
     ======================================== */

  /* ========================================
     视频弹窗
     ======================================== */

  /**
   * 打开视频弹窗
   */
  window.openVideoModal = function () {
    if (els.videoModal) {
      els.videoModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  /**
   * 关闭视频弹窗
   */
  window.closeVideoModal = function () {
    if (els.videoModal) {
      els.videoModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // 点击弹窗背景关闭
  if (els.videoModal) {
    els.videoModal.addEventListener('click', function (e) {
      if (e.target === els.videoModal) {
        window.closeVideoModal();
      }
    });
  }

  // ESC 键关闭弹窗
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && els.videoModal && !els.videoModal.classList.contains('hidden')) {
      window.closeVideoModal();
    }
  });

  /* ========================================
     移动端导航（带动画）
     ======================================== */

  if (els.mobileMenuBtn && els.mobileMenu) {
    els.mobileMenu.classList.add('mobile-menu-slide');
    let menuCloseTimeout = null;

    function openMobileMenu() {
      clearTimeout(menuCloseTimeout);
      els.mobileMenu.classList.remove('hidden');
      requestAnimationFrame(function () {
        els.mobileMenu.classList.add('open');
      });
      els.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
      els.mobileMenu.classList.remove('open');
      menuCloseTimeout = setTimeout(function () {
        els.mobileMenu.classList.add('hidden');
      }, 250);
      els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    els.mobileMenuBtn.addEventListener('click', function () {
      const isOpen = !els.mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    els.mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu();
      });
    });
  }

  /* ========================================
     客户评价轮播
     ======================================== */

  function getVisibleTestimonialCards() {
    if (!els.testimonialTrack) return [];
    return Array.from(els.testimonialTrack.querySelectorAll('.testimonial-card')).filter(function (card) {
      return card.offsetWidth > 0 && card.offsetParent !== null;
    });
  }

  function getVisibleTestimonialIndex() {
    const cards = getVisibleTestimonialCards();
    if (!cards.length) return 0;

    const trackLeft = els.testimonialTrack.scrollLeft;
    const trackCenter = trackLeft + els.testimonialTrack.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach(function (card, index) {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function scrollTestimonialTo(index) {
    if (!els.testimonialTrack) return;
    const cards = getVisibleTestimonialCards();
    const target = cards[index];
    if (!target) return;

    // 真机上 scroll-snap 会和 smooth scroll 冲突产生空白，
    // 点击按钮时先临时禁用 snap，只进行水平滚动，结束后再恢复。
    const track = els.testimonialTrack;
    track.style.scrollSnapType = 'none';

    function restoreSnap() {
      track.style.scrollSnapType = '';
      track.removeEventListener('scrollend', restoreSnap);
    }

    track.addEventListener('scrollend', restoreSnap);
    // scrollend 兼容性兜底：500ms 后强制恢复
    setTimeout(restoreSnap, 500);

    track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }

  if (els.testimonialPrev && els.testimonialTrack) {
    els.testimonialPrev.addEventListener('click', function () {
      const index = getVisibleTestimonialIndex();
      scrollTestimonialTo(Math.max(0, index - 1));
    });
  }

  if (els.testimonialNext && els.testimonialTrack) {
    els.testimonialNext.addEventListener('click', function () {
      const cards = getVisibleTestimonialCards();
      const index = getVisibleTestimonialIndex();
      scrollTestimonialTo(Math.min(cards.length - 1, index + 1));
    });
  }

  /* ========================================
     滚动效果
     ======================================== */

  // Header 滚动时添加阴影
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (els.header) {
      if (currentScroll > 10) {
        els.header.classList.add('shadow-sm');
      } else {
        els.header.classList.remove('shadow-sm');
      }
    }

    lastScroll = currentScroll;
  });

  /* ========================================
     平滑滚动到锚点
     ======================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = els.header ? els.header.offsetHeight : 64;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // 带锚点打开页面时，懒加载图片就位会造成布局位移，load 后校正一次落点
  if (location.hash) {
    const anchorTarget = document.querySelector(location.hash);
    if (anchorTarget) {
      const rescroll = function () {
        const headerHeight = els.header ? els.header.offsetHeight : 64;
        const top = anchorTarget.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: top, behavior: 'auto' });
      };
      if (document.readyState === 'complete') {
        setTimeout(rescroll, 300);
      } else {
        window.addEventListener('load', function () {
          setTimeout(rescroll, 300);
        });
      }
    }
  }

  /* ========================================
     留资表单 → 飞书群机器人（一步提交，2026-07-15 由两步跳转改为 webhook 直发）
     ======================================== */

  // 飞书群自定义机器人 webhook（群设置 → 群机器人 → 添加机器人 → 自定义机器人 获取）
  // 注意：该地址与密钥只能用于向本群发消息，泄露风险可控；如被滥用可在飞书后台吊销重建。
  const FEISHU_BOT_WEBHOOK = 'https://open.feishu.cn/open-apis/bot/v2/hook/4207bff3-a93e-43d9-a14e-b6f6aabddb9f';
  const FEISHU_BOT_SECRET = 'HU6ltD2PX86btAsp52Bhg';

  // 飞书签名：Base64(HMAC-SHA256(key = "timestamp\n密钥", data = 空))
  const feishuSign = async function (secret) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(timestamp + '\n' + secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, new Uint8Array(0));
    return { timestamp: timestamp, sign: btoa(String.fromCharCode.apply(null, new Uint8Array(sig))) };
  };

  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    const submitBtn = trialForm.querySelector('button[type="submit"]');
    const errorEl = document.getElementById('trial-form-error');
    const successEl = document.getElementById('trial-success');

    const showError = function (msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    };
    const hideError = function () {
      if (errorEl) errorEl.classList.add('hidden');
    };

    const buildCardPayload = function (lead, time) {
      return {
        msg_type: 'interactive',
        card: {
          config: { wide_screen_mode: true },
          header: {
            title: { tag: 'plain_text', content: '🎯 官网新线索：预约演示' },
            template: 'violet'
          },
          elements: [
            {
              tag: 'div',
              fields: [
                { is_short: true, text: { tag: 'lark_md', content: '**姓名**\n' + lead.name } },
                { is_short: true, text: { tag: 'lark_md', content: '**电话**\n' + lead.phone } }
              ]
            },
            {
              tag: 'div',
              fields: [
                { is_short: true, text: { tag: 'lark_md', content: '**公司名称**\n' + (lead.company || '未填写') } },
                { is_short: true, text: { tag: 'lark_md', content: '**团队规模**\n' + (lead.teamSize || '未选择') } }
              ]
            },
            { tag: 'note', elements: [{ tag: 'plain_text', content: '来源：官网首页留资表单 · ' + time }] }
          ]
        }
      };
    };

    const buildTextPayload = function (lead, time) {
      return {
        msg_type: 'text',
        content: {
          text: '🎯 官网新线索：预约演示\n姓名：' + lead.name + '\n电话：' + lead.phone +
            '\n公司：' + (lead.company || '未填写') + '\n团队规模：' + (lead.teamSize || '未选择') + '\n时间：' + time
        }
      };
    };

    const postToFeishu = async function (payload) {
      const auth = await feishuSign(FEISHU_BOT_SECRET);
      const resp = await fetch(FEISHU_BOT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({ timestamp: auth.timestamp, sign: auth.sign }, payload))
      });
      const result = await resp.json().catch(function () { return { code: -1 }; });
      return result && result.code === 0;
    };

    trialForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      hideError();

      const data = Object.fromEntries(new FormData(trialForm).entries());
      const lead = {
        name: (data.name || '').trim(),
        phone: (data.phone || '').trim(),
        company: (data.company || '').trim(),
        teamSize: (data['team-size'] || '').trim()
      };

      if (!lead.name) {
        showError('请填写姓名');
        trialForm.querySelector('[name="name"]').focus();
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(lead.phone)) {
        showError('请填写正确的 11 位手机号');
        trialForm.querySelector('[name="phone"]').focus();
        return;
      }

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '提交中…';
      }

      const time = new Date().toLocaleString('zh-CN', { hour12: false });
      let ok = false;
      try {
        ok = await postToFeishu(buildCardPayload(lead, time));
        if (!ok) ok = await postToFeishu(buildTextPayload(lead, time));
      } catch (err) {
        ok = false;
      }

      if (ok) {
        trialForm.classList.add('hidden');
        if (successEl) successEl.classList.remove('hidden');
      } else {
        showError('提交失败，请稍后重试；也可直接拨打售前电话 18008627166 联系我们。');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  /* ========================================
     预约方式切换（移动端默认微信优先）
     ======================================== */

  const trialTabs = document.getElementById('trial-tabs');
  if (trialTabs) {
    const tabButtons = trialTabs.querySelectorAll('button[data-tab]');
    const panels = {
      form: document.getElementById('trial-panel-form'),
      wecom: document.getElementById('trial-panel-wecom'),
    };

    const setActiveTab = function (name) {
      tabButtons.forEach(function (btn) {
        const isActive = btn.dataset.tab === name;
        btn.classList.toggle('bg-white', isActive);
        btn.classList.toggle('text-gray-900', isActive);
        btn.classList.toggle('shadow-sm', isActive);
        btn.classList.toggle('text-gray-500', !isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
      Object.keys(panels).forEach(function (key) {
        if (panels[key]) panels[key].classList.toggle('hidden', key !== name);
      });
    };

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveTab(btn.dataset.tab);
      });
    });

    // 双端默认微信优先（一键唤醒转化路径最短）
    setActiveTab('wecom');
  }

  /* ========================================
     功能预览 (顶部Tab + 下方GIF展示)
     ======================================== */

  const previewGif = document.getElementById('preview-gif');
  const previewTitle = document.getElementById('preview-title-text');
  const featureDesc = document.getElementById('feature-desc');
  const featureTabs = document.getElementById('feature-tabs');
  let activeFeature = '爆款素材榜单';

  // 功能价值点数据（参考 products.html 各模块核心能力提炼，每个价值点均为 4 个字并对应用户需求场景）
  var featureValues = {
    '爆款素材榜单': [
      { icon: 'speed', text: '实时追热' },
      { icon: 'timer', text: '抢先跟拍' },
      { icon: 'campaign', text: '方向明确' },
      { icon: 'insights', text: '降低试错' }
    ],
    'AI拆解': [
      { icon: 'psychology', text: '一键拆解' },
      { icon: 'school', text: '看清结构' },
      { icon: 'auto_awesome', text: '复制爆款' },
      { icon: 'person_add', text: '新人速成' }
    ],
    '无限画布': [
      { icon: 'draw', text: '灵感沉淀' },
      { icon: 'groups', text: '团队共创' },
      { icon: 'layers', text: '资产复用' },
      { icon: 'share', text: '随时分享' }
    ],
    '成片协同': [
      { icon: 'edit_note', text: '在线审片' },
      { icon: 'track_changes', text: '版本清晰' },
      { icon: 'autorenew', text: '撞审裂变' },
      { icon: 'trending_up', text: '持续跑量' }
    ],
    '批量投流': [
      { icon: 'rocket_launch', text: '一键上机' },
      { icon: 'bolt', text: '批量建划' },
      { icon: 'account_tree', text: '多账管理' },
      { icon: 'verified', text: 'ROI更稳' }
    ],
    '报表': [
      { icon: 'assignment', text: '多维统计' },
      { icon: 'query_stats', text: '看清效果' },
      { icon: 'insights', text: '数据决策' },
      { icon: 'warning', text: '及时止损' }
    ],
    '消息通知': [
      { icon: 'notifications_active', text: '即时提醒' },
      { icon: 'fact_check', text: '审批不漏' },
      { icon: 'push_pin', text: '消息置顶' },
      { icon: 'hub', text: '协同支撑' }
    ],
    '项目协同': [
      { icon: 'assignment', text: '任务可视' },
      { icon: 'timeline', text: '进度清晰' },
      { icon: 'person', text: '责任到人' },
      { icon: 'groups', text: '协作有序' }
    ],
    '评论管理': [
      { icon: 'forum', text: '批量回复' },
      { icon: 'account_tree', text: '多账管理' },
      { icon: 'block', text: '违规隐藏' },
      { icon: 'thumb_up', text: '维护转化' }
    ]
  };

  var valuesContainer = document.getElementById('feature-values');

  /**
   * 更新价值点展示
   */
  function updateValuePoints(featureName) {
    if (!valuesContainer) return;
    var values = featureValues[featureName];
    if (!values) return;

    valuesContainer.innerHTML = values.map(function (v) {
      return '<div class="feature-value flex items-center gap-2 text-brand-700 font-semibold text-sm bg-brand-50 px-4 py-2 rounded-full">' +
        '<span class="material-symbols-outlined text-brand-500">' + v.icon + '</span>' +
        v.text +
        '</div>';
    }).join('');
  }

  /**
   * 切换功能预览
   */
  function switchFeaturePreview(featureName, displayName, item) {
    if (!previewGif) return;

    previewGif.src = 'images/' + featureName + '.gif';
    previewGif.alt = displayName + ' - 功能演示';
    activeFeature = featureName;

    // 更新标题
    if (previewTitle) previewTitle.textContent = displayName;

    // 更新价值点
    updateValuePoints(featureName);

    // 更新Tab激活状态
    if (featureTabs) {
      featureTabs.querySelectorAll('.feature-tab').forEach(function (tab) {
        tab.classList.remove('active', 'bg-brand-600', 'text-white');
        tab.classList.add('text-gray-600', 'hover:text-brand-600', 'hover:bg-brand-50');
      });
    }

    item.classList.remove('text-gray-600', 'hover:text-brand-600', 'hover:bg-brand-50');
    item.classList.add('active', 'bg-brand-600', 'text-white');
  }

  // 初始化
  if (featureTabs) {
    var firstTab = featureTabs.querySelector('.feature-tab.active');
    if (firstTab) {
      firstTab.classList.add('bg-brand-600', 'text-white');
      firstTab.classList.remove('text-gray-600', 'hover:text-brand-600', 'hover:bg-brand-50');
      var firstFeature = firstTab.getAttribute('data-feature');
      updateValuePoints(firstFeature);
    }

    // Tab点击事件
    featureTabs.querySelectorAll('.feature-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var featureName = tab.getAttribute('data-feature');
        var displayName = tab.getAttribute('data-name');

        if (activeFeature === featureName) return;
        switchFeaturePreview(featureName, displayName, tab);
      });
    });
  }

  /* ========================================
     功能 tab 横向滚动提示
     ======================================== */

  if (els.featureTabs) {
    const tabsContainer = els.featureTabs;
    const updateScrollHint = function () {
      const isEnd = tabsContainer.scrollLeft + tabsContainer.clientWidth >= tabsContainer.scrollWidth - 1;
      tabsContainer.classList.toggle('scrolled-end', isEnd);
    };

    tabsContainer.addEventListener('scroll', updateScrollHint, { passive: true });
    updateScrollHint();
  }

  /* ========================================
     动画入场效果 + 数字计数
     ======================================== */

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.willChange = 'transform, opacity';
        entry.target.classList.add('is-visible');
        entry.target.addEventListener('transitionend', function handler() {
          entry.target.style.willChange = '';
          entry.target.removeEventListener('transitionend', handler);
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ========================================
     数字计数动画
     ======================================== */

  function animateCountUp(el) {
    if (el.dataset.countAnimated === 'true') return;
    el.dataset.countAnimated = 'true';

    if (el.dataset.text === 'true') {
      el.style.willChange = 'opacity';
      el.style.opacity = '0';
      requestAnimationFrame(function () {
        el.style.transition = 'opacity 0.6s ease';
        el.style.opacity = '1';
        el.addEventListener('transitionend', function handler() {
          el.style.willChange = '';
          el.removeEventListener('transitionend', handler);
        });
      });
      return;
    }

    el.style.willChange = 'transform, opacity';

    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOut);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
        el.style.willChange = '';
      }
    }

    requestAnimationFrame(update);
  }

  const countUpObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        countUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.count-up').forEach(function (el) {
    countUpObserver.observe(el);
  });

  /* ========================================
     首页演示视频控制
     ======================================== */

  if (els.heroVideo) {
    let isProgressDragging = false;

    // 默认不强制静音，优先尝试有声自动播放；若被浏览器策略阻止，再回退到静音播放。
    const tryPlayHeroVideo = function () {
      const playPromise = els.heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          // 有声自动播放被阻止：回退到静音自动播放
          els.heroVideo.muted = true;
          const mutedPlayPromise = els.heroVideo.play();
          if (mutedPlayPromise && typeof mutedPlayPromise.catch === 'function') {
            mutedPlayPromise.catch(function () {
              syncPlayState();
            });
          }
          syncMuteState();
        });
      }
    };
    // 视频源延迟注入：等 load 事件后再拉取 22MB 视频，既不与首屏资源抢带宽，
    // 也避免 load 事件被视频下载阻塞（Slow 4G 实测曾被拖到 20s+）。
    if (els.heroVideo.dataset.src) {
      const loadHeroVideo = function () {
        if (!els.heroVideo || els.heroVideo.dataset.loaded) return;
        els.heroVideo.dataset.loaded = '1';
        els.heroVideo.src = els.heroVideo.dataset.src;
        els.heroVideo.load();
        // 等待视频可播放后再尝试自动播放（优先有声，失败则回退静音）
        els.heroVideo.addEventListener('canplay', tryPlayHeroVideo, { once: true });
      };
      const scheduleHeroVideo = function () {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadHeroVideo, { timeout: 2500 });
        } else {
          setTimeout(loadHeroVideo, 1200);
        }
      };
      if (document.readyState === 'complete') {
        scheduleHeroVideo();
      } else {
        window.addEventListener('load', scheduleHeroVideo);
      }
    } else {
      tryPlayHeroVideo();
    }
    function formatVideoTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
      const totalSeconds = Math.floor(seconds);
      const minutes = Math.floor(totalSeconds / 60);
      const remainSeconds = totalSeconds % 60;
      return minutes + ':' + String(remainSeconds).padStart(2, '0');
    }

    function syncPlayState() {
      if (!els.heroVideoPlayIcon || !els.heroVideoPlayToggle) return;
      const isPaused = els.heroVideo.paused;
      els.heroVideoPlayIcon.textContent = isPaused ? 'play_arrow' : 'pause';
      els.heroVideoPlayToggle.setAttribute('aria-label', isPaused ? '播放视频' : '暂停视频');
    }

    function syncMuteState() {
      if (!els.muteIcon || !els.muteToggle) return;
      els.muteIcon.textContent = els.heroVideo.muted ? 'volume_off' : 'volume_up';
      els.muteToggle.setAttribute('aria-label', els.heroVideo.muted ? '开启视频声音' : '关闭视频声音');
    }

    function syncProgress() {
      const duration = els.heroVideo.duration;
      const currentTime = els.heroVideo.currentTime;
      if (els.heroVideoCurrentTime) {
        els.heroVideoCurrentTime.textContent = formatVideoTime(currentTime);
      }
      if (els.heroVideoDuration) {
        els.heroVideoDuration.textContent = formatVideoTime(duration);
      }
      if (els.heroVideoProgress && Number.isFinite(duration) && duration > 0 && !isProgressDragging) {
        els.heroVideoProgress.value = String(Math.round((currentTime / duration) * 1000));
      }
    }

    function toggleHeroVideoPlay() {
      if (els.heroVideo.paused) {
        const playPromise = els.heroVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {
            syncPlayState();
          });
        }
      } else {
        els.heroVideo.pause();
      }
      syncPlayState();
    }

    if (els.heroVideoPlayToggle) {
      els.heroVideoPlayToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleHeroVideoPlay();
      });
    }

    els.heroVideo.addEventListener('click', toggleHeroVideoPlay);
    els.heroVideo.addEventListener('play', syncPlayState);
    els.heroVideo.addEventListener('pause', syncPlayState);
    els.heroVideo.addEventListener('loadedmetadata', syncProgress);
    els.heroVideo.addEventListener('timeupdate', syncProgress);

    if (els.heroVideoProgress) {
      els.heroVideoProgress.addEventListener('input', function () {
        isProgressDragging = true;
        const duration = els.heroVideo.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;
        const nextTime = (Number(els.heroVideoProgress.value) / 1000) * duration;
        if (els.heroVideoCurrentTime) {
          els.heroVideoCurrentTime.textContent = formatVideoTime(nextTime);
        }
      });

      els.heroVideoProgress.addEventListener('change', function () {
        const duration = els.heroVideo.duration;
        if (Number.isFinite(duration) && duration > 0) {
          els.heroVideo.currentTime = (Number(els.heroVideoProgress.value) / 1000) * duration;
        }
        isProgressDragging = false;
        syncProgress();
      });
    }

    if (els.muteToggle) {
      els.muteToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        els.heroVideo.muted = !els.heroVideo.muted;
        syncMuteState();
      });
    }

    syncPlayState();
    syncMuteState();
    syncProgress();
  }

  /* ========================================
     底部固定 CTA 条
     ======================================== */

  if (els.mobileStickyCta) {
    const ctaSentinel = document.getElementById('cta-sentinel');
    const ctaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === ctaSentinel) {
            // 哨兵离开视口 = 用户已向下滚动超过 100px，显示 CTA
            els.mobileStickyCta.classList.toggle('visible', !entry.isIntersecting);
          }
        });
      },
      { threshold: 0 }
    );

    if (ctaSentinel) ctaObserver.observe(ctaSentinel);
  }

  /* ========================================
     定价页移动端套餐功能对比
     ======================================== */

  const mobilePlanTabs = document.getElementById('mobile-plan-tabs');
  const mobilePlanFeatures = document.getElementById('mobile-plan-features');
  const priceCompareTable = document.querySelector('.price-compare-table');

  if (mobilePlanTabs && mobilePlanFeatures && priceCompareTable) {
    const planNames = [];
    priceCompareTable.querySelectorAll('thead th.plan-col .plan-header-name').forEach(function (el) {
      planNames.push(el.textContent.trim());
    });

    const planFeatures = planNames.map(function () { return []; });

    const expectedCells = planNames.length + 1;

    priceCompareTable.querySelectorAll('tbody tr').forEach(function (row) {
      const cells = row.querySelectorAll('td');
      if (cells.length < 2) return;

      const featureName = cells[0].textContent.trim();
      if (!featureName) return;

      if (cells.length !== expectedCells) {
        return;
      }

      if (row.classList.contains('module-row')) {
        planNames.forEach(function (_, i) {
          planFeatures[i].push({ type: 'header', name: featureName });
        });
        return;
      }

      cells.forEach(function (cell, index) {
        if (index === 0) return;
        const planIndex = index - 1;

        const valueEl = cell.querySelector('.compare-check, .compare-cross, .compare-num, .compare-unlimited');
        let value = '—';
        if (valueEl) {
          if (valueEl.classList.contains('compare-check')) value = '✓';
          else if (valueEl.classList.contains('compare-cross')) value = '—';
          else value = valueEl.textContent.trim();
        } else {
          value = cell.textContent.trim() || '—';
        }

        planFeatures[planIndex].push({ type: 'feature', name: featureName, value: value });
      });
    });

    function renderPlanFeatures(planIndex) {
      const features = planFeatures[planIndex] || [];
      mobilePlanFeatures.innerHTML = features.map(function (f) {
        if (f.type === 'header') {
          return '<div class="text-xs font-bold text-brand-700 uppercase tracking-wider mt-4 mb-2">' + f.name + '</div>';
        }
        return '<div class="flex items-center justify-between py-3 border-b border-gray-100">' +
          '<span class="text-gray-700 text-sm pr-4">' + f.name + '</span>' +
          '<span class="text-brand-600 font-bold whitespace-nowrap">' + f.value + '</span>' +
          '</div>';
      }).join('');
    }

    mobilePlanTabs.setAttribute('role', 'tablist');
    mobilePlanFeatures.setAttribute('role', 'tabpanel');

    const tabs = mobilePlanTabs.querySelectorAll('.mobile-plan-tab');
    tabs.forEach(function (tab, index) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', index === 2 ? 'true' : 'false');
      tab.setAttribute('tabindex', index === 2 ? '0' : '-1');

      tab.addEventListener('click', function () {
        tabs.forEach(function (t, i) {
          t.classList.remove('bg-brand-600', 'text-white');
          t.classList.add('bg-gray-100', 'text-gray-700');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        tab.classList.remove('bg-gray-100', 'text-gray-700');
        tab.classList.add('bg-brand-600', 'text-white');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        renderPlanFeatures(index);
      });
    });

    // Default to featured plan (团队专业版, index 2)
    renderPlanFeatures(2);
  }
})();
