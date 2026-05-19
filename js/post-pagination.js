/**
 * Butterfly Virtual Pagination
 * 真正的虚拟分页 / 延迟挂载
 */

(() => {

  // =========================
  // 配置
  // =========================

  const CONFIG = {

    // 每个 H2 一个分页
    splitBy: 'h2',

    // 翻页滚动顶部偏移
    scrollOffset: 80,

    // 是否自动处理图片懒加载
    lazyImage: true
  }

  // =========================
  // 状态
  // =========================

  let pages = []
  let currentPage = 0

  let articleContainer = null

  // heading id -> page index
  const headingPageMap = new Map()

  // =========================
  // 初始化
  // =========================

  function init() {

    if (
      !window.GLOBAL_CONFIG_SITE ||
      GLOBAL_CONFIG_SITE.pageType !== 'post'
    ) {
      return
    }

    articleContainer = document.getElementById('article-container')

    if (!articleContainer) return

    // 防止重复初始化
    if (articleContainer.dataset.virtualPaginationInit) return

    articleContainer.dataset.virtualPaginationInit = 'true'

    splitArticle()

    if (pages.length <= 1) return

    createPaginationNav()

    renderPage(0)

    bindTOC()
  }

  // =========================
  // 分割文章
  // =========================

  function splitArticle() {

    pages = []

    const children = Array.from(articleContainer.childNodes)

    let currentFragment = document.createDocumentFragment()

    let currentPageIndex = 0

    children.forEach(node => {

      const isSplitNode =
        node.nodeType === 1 &&
        node.tagName.toLowerCase() === CONFIG.splitBy

      if (isSplitNode && currentFragment.childNodes.length > 0) {

        pages.push(currentFragment)

        currentFragment = document.createDocumentFragment()

        currentPageIndex++
      }

      // 记录 heading -> page
      if (
        node.nodeType === 1 &&
        /^H[1-6]$/.test(node.tagName) &&
        node.id
      ) {
        headingPageMap.set(node.id, currentPageIndex)
      }

      currentFragment.appendChild(node)
    })

    if (currentFragment.childNodes.length > 0) {
      pages.push(currentFragment)
    }
  }

  // =========================
  // 渲染分页
  // =========================

  function renderPage(index) {

    if (index < 0 || index >= pages.length) return

    currentPage = index

    articleContainer.replaceChildren()

    articleContainer.appendChild(
      pages[index].cloneNode(true)
    )

    updatePaginationNav()

    reinitializeButterfly()

    scrollToTop()
  }

  // =========================
  // 重新初始化 Butterfly
  // =========================

  function reinitializeButterfly() {

    // lazyload
    if (window.lazyLoadInstance) {
      window.lazyLoadInstance.update()
    }

    // lightbox
    if (window.btf?.loadLightbox) {

      const imgs = articleContainer.querySelectorAll(
        'img:not(.no-lightbox)'
      )

      btf.loadLightbox(imgs)
    }

    // 图片真正懒加载
    if (CONFIG.lazyImage) {

      articleContainer
        .querySelectorAll('img[data-src]')
        .forEach(img => {

          if (!img.src) {
            img.src = img.dataset.src
          }
        })
    }

    // table wrap
    articleContainer
      .querySelectorAll('table')
      .forEach(table => {

        if (
          !table.closest('.table-wrap') &&
          !table.closest('.highlight')
        ) {

          const wrapper = document.createElement('div')

          wrapper.className = 'table-wrap'

          table.parentNode.insertBefore(
            wrapper,
            table
          )

          wrapper.appendChild(table)
        }
      })
  }

  // =========================
  // 分页按钮
  // =========================

  function createPaginationNav() {

    if (
      document.getElementById(
        'virtual-pagination-nav'
      )
    ) {
      return
    }

    const nav = document.createElement('div')

    nav.id = 'virtual-pagination-nav'

    nav.innerHTML = `
            <button id="vp-prev">
                ← 上一页
            </button>

            <span id="vp-info"></span>

            <button id="vp-next">
                下一页 →
            </button>
        `

    articleContainer.after(nav)

    // 样式
    const style = document.createElement('style')

    style.innerHTML = `
            #virtual-pagination-nav{
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-top:40px;
                gap:20px;
            }

            #virtual-pagination-nav button{
                border:none;
                padding:10px 18px;
                border-radius:8px;
                cursor:pointer;
                background:var(--btn-bg);
                color:white;
                transition:.2s;
            }

            #virtual-pagination-nav button:hover{
                opacity:.85;
            }

            #vp-info{
                opacity:.7;
                font-size:14px;
            }
        `

    document.head.appendChild(style)

    // 事件
    nav
      .querySelector('#vp-prev')
      .addEventListener('click', () => {

        renderPage(currentPage - 1)
      })

    nav
      .querySelector('#vp-next')
      .addEventListener('click', () => {

        renderPage(currentPage + 1)
      })
  }

  // =========================
  // 更新分页状态
  // =========================

  function updatePaginationNav() {

    const prev =
      document.getElementById('vp-prev')

    const next =
      document.getElementById('vp-next')

    const info =
      document.getElementById('vp-info')

    if (!prev || !next) return

    prev.style.visibility =
      currentPage === 0
        ? 'hidden'
        : 'visible'

    next.style.visibility =
      currentPage === pages.length - 1
        ? 'hidden'
        : 'visible'

    info.innerText =
      `${currentPage + 1} / ${pages.length}`
  }

  // =========================
  // TOC 联动
  // =========================

  function bindTOC() {

    const toc =
      document.getElementById('card-toc')

    if (!toc) return

    toc.addEventListener('click', e => {

      const link =
        e.target.closest('.toc-link')

      if (!link) return

      const href =
        decodeURIComponent(
          link.getAttribute('href')
        )

      if (!href.startsWith('#')) return

      const id = href.slice(1)

      const targetPage =
        headingPageMap.get(id)

      if (
        targetPage == null ||
        targetPage === currentPage
      ) {
        return
      }

      e.preventDefault()

      renderPage(targetPage)

      requestAnimationFrame(() => {

        const el =
          document.getElementById(id)

        if (el) {

          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    }, true)
  }

  // =========================
  // 滚动顶部
  // =========================

  function scrollToTop() {

    const top =
      articleContainer.getBoundingClientRect().top +
      window.scrollY -
      CONFIG.scrollOffset

    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }

  // =========================
  // PJAX 支持
  // =========================

  document.addEventListener(
    'pjax:complete',
    () => {

      pages = []

      currentPage = 0

      headingPageMap.clear()

      setTimeout(init, 0)
    }
  )

  // =========================
  // 启动
  // =========================

  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      () => setTimeout(init, 0)
    )

  } else {

    setTimeout(init, 0)
  }

})()