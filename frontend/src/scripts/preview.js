window.onload = () => {
    const cachedHTML = sessionStorage.getItem("previewHTML");
    if (cachedHTML) {
        document.body.innerHTML = cachedHTML;
        console.log("HTMLを復元しました。");
        console.log(cachedHTML);
    } else {
        console.log("エラー：表示するコードがありません");
        document.body.innerHTML = "エラー：表示するコードがありません";
    }
};