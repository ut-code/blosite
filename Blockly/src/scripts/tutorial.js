import '/src/styles/tutorial.css';

// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
    const content = document.getElementById('content');
    content.style.visibility = 'visible';
  });