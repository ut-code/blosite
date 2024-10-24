/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {htmlBlocks} from '/src/blockly/blocks/html';
import {websiteGenerator} from '/src/blockly/generators/html';
import customMsg from '/src/blockly/custom_msg';
import '/src/styles/main.css';

// 現在のページを取得
const page = window.location.pathname;
let toolbox, save, load;

// 現在のページに応じてファイルを読み込む
async function loadModules(page) {
  let toolboxModule, serializationModule;
  console.log(page);

  switch(page) {
    case '/sandbox':
      toolboxModule = await import('/src/sandbox/toolbox.js');
      serializationModule = await import('/src/sandbox/serialization.js');
      break;
    case '/tutorial/spread-sheet':
      toolboxModule = await import('/src/tutorial/spread-sheet/toolbox.js');
      serializationModule = await import('/src/tutorial/spread-sheet/serialization.js');
      break;
    default:
      throw new Error('Unknown page');
  }

  toolbox = toolboxModule.toolbox;
  save = serializationModule.save;
  load = serializationModule.load;
}

await loadModules(page);

Blockly.Themes.customStyle = Blockly.Theme.defineTheme('custom_style', {
   'base': Blockly.Themes.Classic, // 既存のベーステーマを指定
   'blockStyles' : {
      'htmlelement_blocks': {
      'colourPrimary': '#673ab7', // 紫
      'colourSecondary': '#ab47bc', // 明るい紫
      'colourTertiary': '#e1bee7' // 薄い紫
      },
      'htmlattribute_blocks': {
          'colourPrimary': '#00796b', // 深い緑
          'colourSecondary': '#4db6ac', // 明るい緑
          'colourTertiary': '#b2dfdb' // 薄い緑
      },
      'css_blocks': {
          'colourPrimary': '#ff5722', // オレンジ
          'colourSecondary': '#ffab40', // 明るいオレンジ
          'colourTertiary': '#ffe0b2' // 薄いオレンジ
      },
      'javascript_blocks': {
          'colourPrimary': '#2196f3', // 青
          'colourSecondary': '#64b5f6', // 明るい青
          'colourTertiary': '#bbdefb' // 薄い青
      },
   },
   'categoryStyles': {
      'htmlelement_category': {
         'colour': '#673ab7'
      },
      'htmlattribute_category': {
         'colour': '#00796b'
      },
      'css_category': {
         'colour': '#ff5722'
      },
      'javascript_category': {
         'colour': '#2196f3'
      },
   },
});

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(htmlBlocks);
// Object.assign(javascriptGenerator.forBlock, forBlock);

// Register the custom messages
Object.assign(Blockly.Msg, customMsg);

// Set up UI elements and inject Blockly
const titlename = document.getElementById('wstitle');
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');

const ws = Blockly.inject(blocklyDiv, {

  // ワークスペースにおける見た目などの設定
  toolbox, //使用するツールボックスを定義
  theme: Blockly.Themes.customStyle,
  grid: {
    spacing: 20,    // グリッド線の間隔
    length: 3,      // グリッド線の長さ
    colour: '#ccc', // グリッド線の色
    snap: true      // グリッドにスナップさせるかどうか
  },
  zoom: {
    controls: true, // ズーム可能かどうか
    wheel: false,   // マウスホイールでズーム可能かどうか
    startScale: 1,  // 初期のズーム倍率
    maxScale: 5,    // 最大ズーム倍率
    minScale: 0.5,  // 最小ズーム倍率
    // scaleSpeed: 1.2, // 1回毎のズーム倍率
  },
  sounds: true, // 音を鳴らすかどうか
});

const getErrorId = document.getElementById("errorMessage");

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
   // Blocklyからコードを生成
   let code = websiteGenerator.workspaceToCode(ws);
  
   // <html> タグの位置を見つける
   const htmlTagIndex = code.indexOf('<html>');
   const closeHtmlTagIndex = code.indexOf('</html>');
     // <title> タグの位置を見つける
  const titleTagIndex = code.indexOf('<title>');
  const closeTitleTagIndex = code.indexOf('</title>');

  // <title> タグが見つからない場合
  let titleContent = 'no title';
  if (titleTagIndex >= 0 && closeTitleTagIndex > titleTagIndex) {
    titleContent = code.slice(titleTagIndex + 7, closeTitleTagIndex); // <title> と </title> の間の内容
  }
  titlename.innerText = titleContent;
   // <html> タグの内側だけを取得
   code = code.slice(htmlTagIndex, closeHtmlTagIndex + 7); // <html> と </html> を含む
 
   // コードを表示
   codeDiv.innerText = code;
   outputDiv.innerHTML = code;
  // eval(code);

  // 正規表現で <script> タグを取り出す
  const scriptRegex = /<script>([\s\S]*?)<\/script>/;
  const match = code.match(scriptRegex);

  // スクリプト部分とそれ以外の部分を抽出
  const scriptCode = match ? match[1] : '';
  
  // スクリプトを動的に評価してエラーがあれば表示
  try {
    eval(scriptCode);
    getErrorId.textContent = "何もエラーは起こってません"
    getErrorId.classList = "safe"
  }  catch (e) {
    getErrorId.textContent = e.name + " " +e.message 
    getErrorId.classList = "errorOccured"
  }

  /*
  const outputId = document.getElementById("output");
  const addDiv = document.createElement("div")
  addDiv.textContent =DOMPurify.sanitize(scriptCode);
  outputId.appendChild(addDiv);
  */

  // スクリプトを動的に評価
  // const script = document.createElement('script');
  // script.textContent = scriptCode;
  // document.body.appendChild(script);
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  
  // 追加するロジック: 特定のブロック同士の接続を禁止
  const blocks = ws.getAllBlocks();
  blocks.forEach((block) => {
    if (block.type === 'html_script') {
      const statementInput = block.getInput('CONTENT'); // 'CONTENT' は input_statement
  
      if (statementInput) {
        const connection = statementInput.connection; // 'CONTENT' に接続されるブロックを取得
  
        if (connection && connection.targetBlock()) {
          const targetBlock = connection.targetBlock(); // targetBlock を変数に格納
        if (targetBlock) {
          // 接続を禁止するブロックのタイプをリストにする
          const htmlelements = [
            'html_html-head-body',
            'html_comment',
            'html_title',
            'html_div',
            'html_ul',
            'html_ol',
            'html_li',
            'html_button',
            'html_id',
            'html_color',
            'html_font-size',
            'html_style',
            'html_strong',
            'html_input',
            'html_text',
          ];

          // 接続が input_statement であり、かつ禁止リストに含まれている場合
          if (htmlelements.includes(targetBlock.type)) {
            connection.disconnect(); // 接続を解除
            console.log(`html_script には ${targetBlock.type} を中に入れることはできません。`);
          }
        }
        } 
      }
    }
    if (block.type === 'html_title') {
      // titleブロックが接続されているブロックを調べる
      const connections = block.getConnections_(true); // 入力側の接続を取得
      connections.forEach(connection => {
        const targetBlock = connection.targetBlock(); // 接続されているターゲットブロックを取得
        if (targetBlock && targetBlock.type === 'html_html-head-body') {
          // 接続先の HEAD 部分を確認
         
          const bodyConnection = targetBlock.getInput('BODY').connection; // BODY の接続を取得
    
          // BODY に接続されている場合、接続を解除
          const connectedBlock = bodyConnection.targetBlock();
          if (connectedBlock && connectedBlock.type === 'html_title') {
            bodyConnection.disconnect();
            alert(`'html_title' は HEAD の中にしか接続できません。`);
          }
    
        } else if (targetBlock) {
          // HEAD 以外に接続されている場合は接続を解除
          connection.disconnect(); 
          alert(`'html_title' は 'html_html-head-body' にしか接続できません。`);
        }
      });
    }
    
     forbidblockconnect(block,'html_strong','html_input')
  });
  
  runCode();

  /*
  function getCodeContent(){
    const getCodeId = document.getElementById("generatedCode");
    const pickCode = getCodeId.querySelector("code");
    const getContentOfCode = pickCode ? pickCode.textContent : getCodeId.textContent;
    return getContentOfCode
  };
  const outputId = document.getElementById("output");
  const addDiv = document.createElement("div")
  addDiv.textContent = getCodeContent();
  outputId.appendChild(addDiv);
  */

  // const code = websiteGenerator.workspaceToCode(ws);
  // codeDiv.innerText = code;
  // outputDiv.innerHTML = code;
  // const scriptRegex = /<script>([\s\S]*?)<\/script>/;
  // const match = code.match(scriptRegex);
  // const scriptCode = match ? match[1] : '';
  // const getErrorId = document.getElementById("errorMessage");
  /*
  const addDiv2 = document.createElement("div");
  addDiv2.textContent = scriptCode;
  outputId.appendChild(addDiv2);
  */
  // try {
  //   eval(scriptCode);
  //   getErrorId.textContent = "何もエラーは起こってません"
  //   getErrorId.classList = "safe"
  // }  catch (e) {
  //   getErrorId.textContent = e.name + " " +e.message 
  //   getErrorId.classList = "errorOccured"
  // }

});

limitBlockCount(ws,'html_html-head-body',1);

function limitBlockCount(workspace, blockType, maxCount) {
  
  // ワークスペースにイベントリスナーを追加
  workspace.addChangeListener(function(event) {

    // イベントがブロック作成（BLOCK_CREATE）でない場合は無視
    if (event.type !== Blockly.Events.BLOCK_CREATE) {
      return;
    }

    // 作成されたブロックが制限対象のブロックか確認
    const createdBlock = workspace.getBlockById(event.blockId);
    if (createdBlock && createdBlock.type === blockType) {
      // 特定のブロックの数をカウント
      const blockCount = workspace.getAllBlocks().filter(block => block.type === blockType).length;

      // 最大数を超えている場合、追加されたブロックを削除
      if (blockCount > maxCount) {
        alert(`${blockType} ブロックは最大 ${maxCount} 個までしか使用できません。`);
        createdBlock.dispose(); // ブロックを削除
      }
    }
  });
}

function forbidblockconnect(block,blockA,blockB,){
  if (block.type === blockA){
    const statementInput =  block.getInput('CONTENT'); // 
    if (statementInput) {
        const connection = statementInput.connection; // 'CONTENT' に接続されるブロックを取得
      if (connection && connection.targetBlock()) {
        const targetBlock = connection.targetBlock(); // targetBlock を変数に格納
        if (targetBlock) {
          if (targetBlock.type === blockB){
            connection.disconnect();
            alert(`${blockA}に${blockB}を中に入れることはできません`);
          }
        }
      }
    }
  }
}

document.getElementById("code-button").onclick = () => {
  const getCodeID = document.getElementById("generatedCode");
  const getButtonID = document.getElementById("code-button");
  getCodeID.classList.toggle("afterClicked");
  getCodeID.classList.toggle("beforeClicked");
  if (getButtonID.textContent === "コードを表示する"){
    getButtonID.textContent = "コードを隠す";
  } else {
    getButtonID.textContent = "コードを表示する";
  }
}

// ポップアップの表示

const popupId = document.getElementById("popup");
const popupOuterId = document.getElementById("popup-outer");
const popupInnerId = document.getElementById("popup-inner");
const popupCloseId = document.getElementById("popup-close");

popupId.addEventListener('click', e => {
  if ((e.target.id === popupOuterId.id) || (e.target.id === popupCloseId.id)){
    popupOuterId.style.display = 'none';
    popupInnerId.style.display = 'none';
  }
})

// 現在表示しているポップアップスライドの番号
let currentSlideIndex = 0;

// 各ボタンにクリックイベントを追加
const buttons = document.querySelectorAll('.popup-buttons');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      showPopupSlideContent(index)
      highlightButton(button);
    });
});

// スライドを表示する関数
function showPopupSlideContent(index) {
    const slides = document.querySelectorAll('.popup-slides');
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
    currentSlideIndex = index;
    updateNavigationButtons();
}

// 選択中のボタンをハイライトする関数
function highlightButton(selectedButton) {
  buttons.forEach(button => {
      button.classList.remove('active'); // すべてのボタンからactiveクラスを削除
  });
  selectedButton.classList.add('active'); // 選択されたボタンにactiveクラスを追加
}

// 戻るボタンの機能
function popupPrevSlide() {
    if (currentSlideIndex > 0) {
      const button = document.getElementById(`popup-button-${currentSlideIndex - 1}`)
      showPopupSlideContent(currentSlideIndex - 1);
      highlightButton(button);
    }
}

// 進むボタンの機能
function popupNextSlide() {
    const slides = document.querySelectorAll('.popup-slides');
    if (currentSlideIndex < slides.length - 1) {
      const button = document.getElementById(`popup-button-${currentSlideIndex + 1}`)
      showPopupSlideContent(currentSlideIndex + 1);
      highlightButton(button);
    }
}

// ナビゲーションボタンの状態を更新する関数
function updateNavigationButtons() {
  const prevButton = document.getElementById('popup-prev');
  const nextButton = document.getElementById('popup-next');
  const endButton = document.getElementById('popup-end');

  // 戻るボタンの無効化
  prevButton.disabled = (currentSlideIndex === 0);
  
  // 進むボタンの無効化
  const slides = document.querySelectorAll('.popup-slides');
  nextButton.disabled = (currentSlideIndex === slides.length - 1);
  if (currentSlideIndex === slides.length - 1) {
    nextButton.style.display = 'none';
    endButton.style.display = 'block';
  }
  else {
    nextButton.style.display = 'block';
    endButton.style.display = 'none';
  }
}

// 戻るボタン、進むボタン、始めるボタンにイベントリスナーを追加
document.getElementById('popup-prev').addEventListener('click', popupPrevSlide);
document.getElementById('popup-next').addEventListener('click', popupNextSlide);
document.getElementById('popup-end').addEventListener('click', () => {
  popupOuterId.style.display = 'none';
  popupInnerId.style.display = 'none';
});

// ヘルプボタンでポップアップを表示
document.getElementById("header-help").onclick = () => {
  popupOuterId.style.display = 'block';
  popupInnerId.style.display = 'block';
  showPopupSlideContent(0);
  highlightButton(buttons[0]);
}

// ポップアップの初期表示
showPopupSlideContent(0);
highlightButton(buttons[0]); 

// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
  const content = document.getElementById('content');
  content.style.visibility = 'visible';
});