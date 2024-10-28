import '/src/styles/top.css';

// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
    const content = document.getElementById('container');
    content.style.visibility = 'visible';
  });