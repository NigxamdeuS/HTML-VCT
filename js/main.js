// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// モーダルの改善
document.addEventListener('DOMContentLoaded', function() {
  const modalLinks = document.querySelectorAll('.modal-open');
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);

  modalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const contentId = this.dataset.content;
      const content = document.getElementById(contentId);
      
      if (content) {
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
          <span class="modal-close">&times;</span>
          ${content.innerHTML}
        `;
        
        modalOverlay.appendChild(modalContent);
        modalOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // アニメーション用のクラスを追加
        setTimeout(() => {
          modalContent.classList.add('modal-show');
        }, 10);
      }
    });
  });

  // モーダルを閉じる処理
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay || e.target.classList.contains('modal-close')) {
      closeModal();
    }
  });

  function closeModal() {
    const modalContent = modalOverlay.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.remove('modal-show');
      setTimeout(() => {
        modalOverlay.style.display = 'none';
        modalOverlay.innerHTML = '';
        document.body.style.overflow = '';
      }, 300);
    }
  }
});

// スクロールアニメーション
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('.card, .teamname, .vctfont').forEach(el => {
  el.classList.add('fade-out');
  observer.observe(el);
});

// ヘッダーのスクロール制御
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
}); 

document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.header__menu-button');
  const nav = document.querySelector('.header__nav');

  menuButton.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // 画面サイズが変更された時にメニューを閉じる
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      menuButton.classList.remove('active');
      nav.classList.remove('active');
    }
  });

  // メニューリンクをクリックした時にメニューを閉じる
  const menuLinks = document.querySelectorAll('.header__nav-list a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuButton.classList.remove('active');
      nav.classList.remove('active');
    });
  });
});

// テーブルソート機能
function sortTable(columnIndex) {
  const table = document.getElementById('playerTable');
  const tbody = table.getElementsByTagName('tbody')[0];
  const rows = Array.from(tbody.getElementsByTagName('tr'));
  const headers = table.getElementsByTagName('th');
  
  // 現在のソート方向を判定
  const currentHeader = headers[columnIndex];
  const isAscending = !currentHeader.classList.contains('sort-asc');
  
  // すべてのヘッダーからソートクラスを削除
  Array.from(headers).forEach(header => {
    header.classList.remove('sort-asc', 'sort-desc');
  });
  
  // 新しいソート方向を設定
  currentHeader.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
  
  // ソート処理
  rows.sort((a, b) => {
    let aValue = a.cells[columnIndex].textContent;
    let bValue = b.cells[columnIndex].textContent;
    
    // 数値の場合は数値としてソート
    if (columnIndex === 1) { // DPIの列
      aValue = parseInt(aValue.replace('dpi', ''));
      bValue = parseInt(bValue.replace('dpi', ''));
    } else if (columnIndex === 2) { // Sensitivityの列
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    if (aValue < bValue) return isAscending ? -1 : 1;
    if (aValue > bValue) return isAscending ? 1 : -1;
    return 0;
  });
  
  // ソート結果をテーブルに反映
  rows.forEach(row => tbody.appendChild(row));
}

// テーブルヘッダーにソートアイコンを追加
document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('#playerTable th');
  headers.forEach(header => {
    header.classList.add('sort-icon');
  });
});