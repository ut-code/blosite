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
    const contentsList = document.getElementById('contentsList');
    contentsList.innerHTML = ''; // 既存の内容をクリア

    contents.forEach(content => {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content-item';
        
        contentDiv.innerHTML = `
            <h2>${content.contentName}</h2>
            <p>${content.description}</p>
            <img src="${content.photo}">
            <p>投稿者: ${content.username}</p>
            <p>作成日時: ${new Date(content.createdAt).toLocaleString()}</p>
        `;
        
        contentsList.appendChild(contentDiv);
    });
}

// ページが読み込まれたらデータを取得
window.onload = fetchContents;