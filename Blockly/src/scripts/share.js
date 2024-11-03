import '/src/styles/share.css';

async function fetchContents() {
    try {
        const response = await fetch('http://localhost:3000/api/getContents');
        if (!response.ok) {
            throw new Error(`ネットワークエラー: ${response.status}`);
        }
        
        const contents = await response.json();
        displayContents(contents);
    } catch (error) {
        console.error('エラー:', error);
    }
}

function displayContents(contents) {
    const contentsList = document.getElementById('contents-list');
    contentsList.innerHTML = ''; // 既存の内容をクリア

    contents.forEach(content => {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card';
        
        contentDiv.innerHTML = `
            <div class="description">
                <h2>${content.contentName}</h2>
                <p>${content.description}</p>
                <p>投稿者: ${content.username}</p>
                <p>作成日時: ${new Date(content.createdAt).toLocaleString()}</p>
            </div>
            <img src="${content.photo}" class="images">
        `;

        contentDiv.addEventListener('click', () => {
            const data = window.localStorage?.getItem("sandboxWorkspace");
            showPopup(content.content, data);
        });
        
        contentsList.appendChild(contentDiv);
    });
}

function showPopup(content, data) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');

    if (data) {
        popupMessage.innerText = 'サンドボックスに移動してもよろしいですか？\n注意：サンドボックスに途中のデータがあります。上書きしてもよろしいですか？';
    } else {
        popupMessage.innerText = 'サンドボックスに移動してもよろしいですか？';
    }

    popup.classList.remove('hidden');

    // 確認ボタンがクリックされた場合の処理
    document.getElementById('confirmButton').onclick = () => {
        window.localStorage?.setItem("sandboxWorkspace", content);
        window.location.href = `./../sandbox`;
    };

    // キャンセルボタンがクリックされた場合の処理
    document.getElementById('cancelButton').onclick = () => {
        popup.classList.add('hidden');
    };
}

// ページが読み込まれたらデータを取得
window.onload = fetchContents;

// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
    const content = document.body;
    content.style.visibility = 'visible';
});
