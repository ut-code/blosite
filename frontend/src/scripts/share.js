import '/src/styles/share.css';
import DOMPurify from 'dompurify';

function sanitizeInput(input) {
    // エスケープ処理
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };
  
    // エスケープされた文字列をDOMPurifyでさらにサニタイズ
    const escapedInput = escapeHtml(input);
    return DOMPurify.sanitize(escapedInput);
}

async function fetchContents() {
    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/api/getContents`);
        if (!response.ok) {
            throw new Error(`ネットワークエラー: ${response.status}`);
        }
        
        const contents = await response.json();
        document.getElementById('loading-spinner').classList.add('hidden');
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
            <div class="content-text">
                <h2>${sanitizeInput(content.contentName)}</h2>
                <p class="description">${sanitizeInput(content.description)}</p>
                <div class="details">
                    <p>投稿者: ${sanitizeInput(content.username)}</p>
                    <p>作成日時: ${new Date(content.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <img src="${sanitizeInput(content.photo)}" class="images">
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

    console.log(data);
    console.log(Object.keys(data).length);

    // SandboxにlocalStorageにデータがあるかどうか
    if (data && (Object.keys(data).length > 2)) {
        popupMessage.innerText = 'サンドボックスに移動して作り続けよう！\n\n注意：サンドボックスに作りかけのデータがあります。\nこの途中のデータは上書きされます。';
    } else {
        popupMessage.innerText = 'サンドボックスに移動して作り続けよう！';
    }

    popup.classList.remove('hidden');

    // 確認ボタンがクリックされた場合の処理
    document.getElementById('confirm-button').onclick = () => {
        window.localStorage?.setItem("sandboxWorkspace", content);
        window.location.href = `./../sandbox`;
    };
}

const popup = document.getElementById('popup');
const cancelButton = document.getElementById('cancel-button');

// ポップアップ外とキャンセルをクリックした場合の処理
popup.onclick = (event) => {
    if (event.target === popup || event.target === cancelButton) {
        popup.classList.add('hidden');
    }
};

// ページが読み込まれたらデータを取得
window.onload = () => {
    fetchContents();
};

// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
    const content = document.body;
    content.style.visibility = 'visible';
});
