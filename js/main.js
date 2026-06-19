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
    footer: document.querySelector('footer'),
    featureTabs: document.getElementById('feature-tabs'),
    heroVideo: document.querySelector('video[src*="hero-video"]'),
    heroVideoPlayToggle: document.getElementById('hero-video-play-toggle'),
    heroVideoPlayIcon: document.getElementById('hero-video-play-icon'),
    heroVideoProgress: document.getElementById('hero-video-progress'),
    heroVideoCurrentTime: document.getElementById('hero-video-current-time'),
    heroVideoDuration: document.getElementById('hero-video-duration'),
    muteToggle: document.getElementById('mute-toggle'),
    muteIcon: document.getElementById('mute-icon'),
  };

  /* ========================================
     移动端不加载 Hero 视频
     ======================================== */

  if (els.heroVideo && window.innerWidth < 1024) {
    els.heroVideo.remove();
    els.heroVideo = null;
    if (els.muteToggle) els.muteToggle.style.display = 'none';
  }

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

  let testimonialScrollAmount = 0;

  function getTestimonialCardWidth() {
    if (!els.testimonialTrack) return 0;
    const card = els.testimonialTrack.querySelector('.testimonial-card');
    return card ? card.offsetWidth + 24 : 304; // 24px = gap-6
  }

  if (els.testimonialPrev && els.testimonialTrack) {
    els.testimonialPrev.addEventListener('click', function () {
      const cardWidth = getTestimonialCardWidth();
      els.testimonialTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  if (els.testimonialNext && els.testimonialTrack) {
    els.testimonialNext.addEventListener('click', function () {
      const cardWidth = getTestimonialCardWidth();
      els.testimonialTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
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

  /* ========================================
     表单处理
     ======================================== */

  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(trialForm);
      const data = Object.fromEntries(formData.entries());

      // 必填字段校验，给出明确提示
      const name = (data.name || '').trim();
      const phone = (data.phone || '').trim();
      if (!name) {
        alert('请填写姓名');
        trialForm.querySelector('[name="name"]').focus();
        return;
      }
      if (!phone) {
        alert('请填写手机号');
        trialForm.querySelector('[name="phone"]').focus();
        return;
      }

      // 飞书多维表格表单预填充配置
      // 飞书预填充参数格式：prefill_问题名称=值，问题名称必须与表单字段标题完全一致
      const feishuFormBase = 'https://situohezhong.feishu.cn/share/base/form/shrcna7QkvJxucOyDTtfpel55Gc';
      const fieldMapping = {
        name: 'prefill_姓名',
        phone: 'prefill_电话',
        company: 'prefill_公司名称',
        'team-size': 'prefill_内容团队人数'
      };

      const params = new URLSearchParams();
      for (const [localKey, feishuKey] of Object.entries(fieldMapping)) {
        const value = data[localKey];
        if (value) {
          params.append(feishuKey, String(value));
        }
      }

      const feishuUrl = params.toString()
        ? `${feishuFormBase}?${params.toString()}`
        : feishuFormBase;

      const newWindow = window.open(feishuUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // 弹窗被拦截时给出提示，用户确认后使用当前页跳转作为兜底
        if (confirm('预约页面被浏览器拦截，是否在当前页面打开？')) {
          window.location.href = feishuUrl;
          return;
        }
      }
      trialForm.reset();
    });
  }

  /* ========================================
     功能预览 (顶部Tab + 下方视频展示)
     ======================================== */

  const previewVideo = document.getElementById('preview-video');
  const previewTitle = document.getElementById('preview-title-text');
  const featureDesc = document.getElementById('feature-desc');
  const featureTabs = document.getElementById('feature-tabs');
  const featurePreview = document.getElementById('feature-preview');
  let activeFeature = '爆款素材榜单';
  let activeFeatureName = '爆款榜单';

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
    if (!previewVideo) return;

    activeFeature = featureName;
    activeFeatureName = displayName;
    loadFeaturePreviewVideo(featureName, displayName);

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

  /**
   * 加载当前功能演示视频。
   * 官网演示素材原来使用大体积 GIF。这里改成 MP4，并延迟到预览区可见后再写入 src，
   * 避免首屏阶段提前下载非首屏资源。
   */
  function loadFeaturePreviewVideo(featureName, displayName) {
    if (!previewVideo) return;
    const nextSrc = 'images/' + featureName + '.mp4';
    previewVideo.setAttribute('aria-label', displayName + ' - 功能演示');
    previewVideo.dataset.src = nextSrc;
    if (previewVideo.dataset.ready !== 'true') return;
    if (previewVideo.getAttribute('src') !== nextSrc) {
      previewVideo.pause();
      previewVideo.setAttribute('src', nextSrc);
      previewVideo.load();
    }
    const playPromise = previewVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        // 浏览器可能因省电或自动播放策略拒绝播放，保留静态首帧即可，不打断页面浏览。
      });
    }
  }

  function markFeaturePreviewReady() {
    if (!previewVideo || previewVideo.dataset.ready === 'true') return;
    previewVideo.dataset.ready = 'true';
    loadFeaturePreviewVideo(activeFeature, activeFeatureName);
  }

  // 初始化
  if (featureTabs) {
    var firstTab = featureTabs.querySelector('.feature-tab.active');
    if (firstTab) {
      firstTab.classList.add('bg-brand-600', 'text-white');
      firstTab.classList.remove('text-gray-600', 'hover:text-brand-600', 'hover:bg-brand-50');
      var firstFeature = firstTab.getAttribute('data-feature');
      activeFeature = firstFeature || activeFeature;
      activeFeatureName = firstTab.getAttribute('data-name') || activeFeatureName;
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

  if (previewVideo) {
    if ('IntersectionObserver' in window && featurePreview) {
      const previewObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            markFeaturePreviewReady();
            previewObserver.disconnect();
          }
        });
      }, { rootMargin: '200px 0px' });
      previewObserver.observe(featurePreview);
    } else {
      markFeaturePreviewReady();
    }
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

    // 首屏演示视频使用封面图和按需播放，避免桌面端首屏直接下载完整视频。
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

  if (els.mobileStickyCta && els.heroSection && els.footer) {
    const ctaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === els.heroSection) {
            els.mobileStickyCta.classList.toggle('visible', !entry.isIntersecting);
          } else if (entry.target === els.footer) {
            if (entry.isIntersecting) {
              els.mobileStickyCta.classList.remove('visible');
            }
          }
        });
      },
      { threshold: 0 }
    );

    ctaObserver.observe(els.heroSection);
    ctaObserver.observe(els.footer);
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
