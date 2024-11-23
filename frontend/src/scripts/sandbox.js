/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import '@blockly/toolbox-search';
import * as acorn from "acorn";
import * as estraverse from "estraverse";
import * as escodegen from "escodegen";
import {htmlBlocks} from '/src/blockly/blocks/html';
import {websiteGenerator} from '/src/blockly/generators/html';
import customMsg from '/src/blockly/custom_msg';
import html2canvas from 'html2canvas';
import { createClient } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';
import '/src/styles/main.css';

// 現在のページを取得
const page = window.location.pathname;
let toolbox, save, load, storageKey;

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
  storageKey = serializationModule.storageKey;
}

await loadModules(page);

Blockly.Themes.customStyle = Blockly.Theme.defineTheme('custom_style', {
  'base': Blockly.Themes.Classic, // 既存のベーステーマを指定
  'blockStyles' : {
     'htmlelement_blocks': {
       'colourPrimary': '#d8a200', // 暗めで少し明るくした黄色
       'colourSecondary': '#a67900', // 少し明るめの黄土色
       'colourTertiary': '#e0b415' // 落ち着いた黄色
     },
     'htmlattribute_blocks': {
       'colourPrimary': '#00796b', // 深い緑
       'colourSecondary': '#4db6ac', // 明るい緑
       'colourTertiary': '#b2dfdb' // 薄い緑
     },
     'css_blocks': {
       'colourPrimary': '#f4511e', // やや薄めの暗いオレンジ
       'colourSecondary': '#ff8e53', // やや薄めの明るいオレンジ
       'colourTertiary': '#ffd1a3' // 薄めのオレンジ
     },
     'javascript_blocks': {
       'colourPrimary': '#1e88e5', // 少し暗めの青
       'colourSecondary': '#5aaefb', // 少し暗めの明るい青
       'colourTertiary': '#aed6fb' // やや薄めの青
     },
  },
  'categoryStyles': {
     'htmlelement_category': {
        'colour': '#d8a200'
     },
     'htmlattribute_category': {
        'colour': '#00796b'
     },
     'css_category': {
        'colour': '#f4511e'
     },
     'javascript_category': {
        'colour': '#1e88e5'
     },
  },
  'componentStyles': {
    'toolboxBackgroundColour': '#f0f0f0', // ツールボックス背景色
    'toolboxForegroundColour': '#000000', // ツールボックス文字色
    'flyoutBackgroundColour': '#cccccc', // フライアウトの背景色
    // 'flyoutForegroundColour': '#cccccc', // フライアウトの文字色
    'flyoutOpacity': 0.8, // フライアウトの透明度 (0.0 ～ 1.0)
    'scrollbarColour': '#888888', // スクロールバーの色
    'scrollbarOpacity': 0.6, // スクロールバーの透明度
  }
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
  renderer: 'geras', // レンダラーの指定
});

const errorMessage = document.getElementById("error-message");
const runIcon = document.getElementById('run-icon');
const runSwitchButton = document.getElementById('run-switch-button');
// state は 'play', 'stop', 'continuous'のどれか
let state = 'play';
let playClicked = false;


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
  if (titleTagIndex >= 0 && closeTitleTagIndex > titleTagIndex + 7) {
    titleContent = code.slice(titleTagIndex + 7, closeTitleTagIndex); // <title> と </title> の間の内容
  }
  titlename.innerText = titleContent;

  codeDiv.innerText = code;

  // <html> タグの内側だけを取得
  code = code.slice(htmlTagIndex, closeHtmlTagIndex + 7); // <html> と </html> を含む

  code = processDisplayedCode(code);

  // コードを表示
  codeDiv.innerText = code;

  code = processExecutedCode(code);

  outputDiv.innerHTML = code;

  // 正規表現で <script> タグを取り出す
  const scriptRegex = /<script>([\s\S]*?)<\/script>/;
  const match = code.match(scriptRegex);

  // スクリプト部分とそれ以外の部分を抽出
  const scriptCode = match ? match[1] : '';
  
  // スクリプトを動的に評価してエラーがあれば表示
  if (state==="stop" || playClicked){
    playClicked = false;
    try {
      eval(scriptCode);
      errorMessage.style.display = "none";
    }  catch (e) {
      errorMessage.style.display = "block";
      errorMessage.textContent = `エラーが発生しました\n${e.name} ${e.message}`; 
    }
  }
};

// 「コードを表示」用のコード
// 特定のタグ前後の改行や空白を削除
function processDisplayedCode(inputCode) {
  // HTML文字列をパースしてDOMに変換
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputCode, 'text/html');

  console.log(doc);
  console.log(doc.documentElement.outerHTML);

  // 特定のタグの前後の改行や空白を削除
  const tags = ['i', 'b', 'u', 'del', 'ins', 'small', 'sub', 'sup','em'];
  tags.forEach(tag => {
      doc.querySelectorAll(tag).forEach(el => {;

          // 前後の兄弟ノードを確認して改行や空白を削除
          if (
            el.previousSibling && isNonEmptyTextNode(el.previousSibling) ||
              (el.previousElementSibling
                && (el.previousElementSibling.nodeType === Node.ELEMENT_NODE
                  && tags.includes(el.previousElementSibling.tagName.toLowerCase())))
          ){
              el.previousSibling.textContent = el.previousSibling.textContent.replace(/\s+$/, '');
          }
          if (
            el.nextSibling && isNonEmptyTextNode(el.nextSibling) ||
              (el.nextElementSibling
                && (el.nextElementSibling.nodeType === Node.ELEMENT_NODE
                  && tags.includes(el.nextElementSibling.tagName.toLowerCase())))
          ) {
              el.nextSibling.textContent = el.nextSibling.textContent.replace(/^\s+/, '');
          }
      });
  });

  // 再整形する
  return doc.documentElement.outerHTML.replace('<head>', '\n<head>').replace('\n</body>', '</body>').replace('</html>', '\n</html>');
}

function isNonEmptyTextNode(node) {
  return (
      node.nodeType === Node.TEXT_NODE &&
      node.textContent.trim() !== '' // 空白文字のみではないかを確認
  );
}

// プレビューと実行用のコード
// idとclassに接頭辞を追加
function processExecutedCode(inputCode) {

  let parseSuccess = true;

  // HTML文字列をパースしてDOMに変換
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputCode, 'text/html');

  // idやclassに追加する接頭辞
  const idPrefix = 'USER_ID_';
  const classPrefix = 'USER_CLASS_';

  // <script>内のコードを解析し、id/classの参照を置換
  doc.querySelectorAll('script').forEach(script => {
    const originalCode = script.textContent;

    try {
        // JavaScriptコードをASTに変換
        const ast = acorn.parse(originalCode, { ecmaVersion: 'latest' });

        // ASTを走査して対象を置換
        estraverse.traverse(ast, {
            enter(node) {
                if (
                    node.type === 'CallExpression' &&
                    node.callee.type === 'MemberExpression' &&
                    node.callee.object.name === 'document'
                ) {
                    if (node.callee.property.name === 'getElementById') {
                        // getElementById
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            arg.value = idPrefix + arg.value;
                        }
                    } else if (node.callee.property.name === 'getElementsByClassName') {
                        // getElementsByClassName
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            arg.value = classPrefix + arg.value;
                        }
                    }
                }
            },
        });

        // ASTをコードに戻す（インデントと改行を保持するためにオプションを設定）
        const modifiedCode = escodegen.generate(ast, {
          format: { 
              indent: { style: '    ' }, // インデントのスタイルを設定
              newline: '\n', // 改行コードの設定
          }
        });

        script.textContent = modifiedCode;
    } catch (e) {
        console.error('Script parsing failed:', e);
        parseSuccess = false;
    }
  });

  // パースに失敗した場合はそのままのHTMLを返す
  if (!parseSuccess) {
    return doc.documentElement.outerHTML;
  }

  // id属性に接頭辞を追加
  doc.querySelectorAll('[id]').forEach(el => {
    el.id = idPrefix + el.id;
  });

  // class属性に接頭辞を追加
  doc.querySelectorAll('[class]').forEach(el => {
      el.classList.forEach(cls => {
          el.classList.replace(cls, classPrefix + cls);
      });
  });

  console.log("実行コード\n" + doc.documentElement.outerHTML);

  return doc.documentElement.outerHTML;
}

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

// コードを表示するボタン
document.getElementById("code-button").onclick = () => {
  const getCodeID = document.getElementById("generatedCode");
  const getButtonID = document.getElementById("code-button");
  if (getButtonID.textContent === "コードを表示"){
    getButtonID.textContent = "コードを隠す";
    getCodeID.style.display = "block";
  } else {
    getButtonID.textContent = "コードを表示";
    getCodeID.style.display = "none";
  }
}

// プレビューを表示するボタン
document.getElementById("preview-button").onclick = () => {
  // 保存するHTMLの文字列を取得
  const generatedHTML = document.getElementById("output").innerHTML;

  // sessionStorageに保存
  sessionStorage.setItem("previewHTML", generatedHTML);
  console.log("HTMLを保存しました。");

  // プレビュー画面に遷移
  window.open('./../preview', '_blank');
}

// // ポップアップの表示

// const popupId = document.getElementById("popup");
const popupOuterId = document.getElementById("popup-outer");
// const popupInnerId = document.getElementById("popup-inner");
// const popupCloseId = document.getElementById("popup-close");
const popupForm = document.getElementById('popup-form');
const hamburgerIcon = document.getElementById('hamburger-icon');
const loadingSpinner = document.getElementById('loading-spinner');
const loadingOverlay = document.getElementById('loading-overlay');
const successMessage = document.getElementById('success-message');
let bodyScrollWidth = document.body.scrollWidth;

// ポップアップの背景の幅を調整
popupOuterId.style.width = `${bodyScrollWidth}px`;
loadingOverlay.style.width = `${bodyScrollWidth}px`;
// resize時にも調整
window.addEventListener('resize', () => {
  bodyScrollWidth = document.body.scrollWidth;
  popupOuterId.style.width = `${bodyScrollWidth}px`;
  loadingOverlay.style.width = `${bodyScrollWidth}px`;
});

popupOuterId.addEventListener('click', e => {
  popupOuterId.style.display = 'none';
  // popupInnerId.style.display = 'none';
  popupForm.style.display = 'none';
})

// // 現在表示しているポップアップスライドの番号
// let currentSlideIndex = 0;

// // 各ボタンにクリックイベントを追加
// const buttons = document.querySelectorAll('.popup-buttons');

// buttons.forEach((button, index) => {
//     button.addEventListener('click', () => {
//       showPopupSlideContent(index)
//       highlightButton(button);
//     });
// });

// // スライドを表示する関数
// function showPopupSlideContent(index) {
//     const slides = document.querySelectorAll('.popup-slides');
//     slides.forEach((slide, i) => {
//         slide.style.display = (i === index) ? 'block' : 'none';
//     });
//     currentSlideIndex = index;
//     updateNavigationButtons();
// }

// // 選択中のボタンをハイライトする関数
// function highlightButton(selectedButton) {
//   buttons.forEach(button => {
//       button.classList.remove('active'); // すべてのボタンからactiveクラスを削除
//   });
//   selectedButton.classList.add('active'); // 選択されたボタンにactiveクラスを追加
// }

// // 戻るボタンの機能
// function popupPrevSlide() {
//     if (currentSlideIndex > 0) {
//       const button = document.getElementById(`popup-button-${currentSlideIndex - 1}`)
//       showPopupSlideContent(currentSlideIndex - 1);
//       highlightButton(button);
//     }
// }

// // 進むボタンの機能
// function popupNextSlide() {
//     const slides = document.querySelectorAll('.popup-slides');
//     if (currentSlideIndex < slides.length - 1) {
//       const button = document.getElementById(`popup-button-${currentSlideIndex + 1}`)
//       showPopupSlideContent(currentSlideIndex + 1);
//       highlightButton(button);
//     }
// }

// // ナビゲーションボタンの状態を更新する関数
// function updateNavigationButtons() {
//   const prevButton = document.getElementById('popup-prev');
//   const nextButton = document.getElementById('popup-next');
//   const endButton = document.getElementById('popup-end');

//   // 戻るボタンの無効化
//   prevButton.disabled = (currentSlideIndex === 0);
  
//   // 進むボタンの無効化
//   const slides = document.querySelectorAll('.popup-slides');
//   nextButton.disabled = (currentSlideIndex === slides.length - 1);
//   if (currentSlideIndex === slides.length - 1) {
//     nextButton.style.display = 'none';
//     endButton.style.display = 'block';
//   }
//   else {
//     nextButton.style.display = 'block';
//     endButton.style.display = 'none';
//   }
// }

// // 戻るボタン、進むボタン、始めるボタンにイベントリスナーを追加
// document.getElementById('popup-prev').addEventListener('click', popupPrevSlide);
// document.getElementById('popup-next').addEventListener('click', popupNextSlide);
// document.getElementById('popup-end').addEventListener('click', () => {
//   popupOuterId.style.display = 'none';
//   popupInnerId.style.display = 'none';
// });

// // ヘルプボタンでポップアップを表示
// document.getElementById("header-help").onclick = () => {
//   popupOuterId.style.display = 'block';
//   popupInnerId.style.display = 'block';
//   showPopupSlideContent(0);
//   highlightButton(buttons[0]);
// }

// // ポップアップの初期表示
// showPopupSlideContent(0);
// highlightButton(buttons[0]); 

// 状態を切り替える
runIcon.addEventListener('click', () => {

  if(state === 'play') {
    playClicked = true;
    runCode();
  }
  else {
    // 現在のクラスを削除
    runIcon.classList.remove(state);

    // 次の状態に変更
    state = (state==='stop') ? 'continuous' : 'stop';

    // 新しい状態のクラスを追加
    runIcon.classList.add(state);
  }
});

runSwitchButton.addEventListener('click', () => {
  
  if(state === 'play') {
    runIcon.classList.remove('play');
    runIcon.classList.add('stop');
    state = 'stop';
    runSwitchButton.innerHTML = 'スクリプトの<br>常時実行:ON';
  }
  else {
    // 現在のクラスを削除
    runIcon.classList.remove(state);
    runIcon.classList.add('play');
    state = 'play';
    runSwitchButton.innerHTML = 'スクリプトの<br>常時実行:OFF';
  }
});

// ハンバーガーアイコンを開く
hamburgerIcon.addEventListener('click', () => {
  hamburgerIcon.classList.toggle('open');
});

// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
  const content = document.getElementById('content');
  content.style.visibility = 'visible';
});

// 共有するボタン
document.getElementById("save-button").onclick = () => {
  
  // ポップアップを表示して入力を求める
  const popupForm = document.getElementById('popup-form');

  popupOuterId.style.display = 'block';
  popupForm.style.display = 'grid';
}

// SupabaseのプロジェクトURLとAPIキーを使用してクライアントを作成
const supabaseUrl = 'https://foxfxembozpnvfdwxnog.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZveGZ4ZW1ib3pwbnZmZHd4bm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTQ0NDMsImV4cCI6MjA0NTY5MDQ0M30.brm2eeigBJv6u1QBcbEl5QAsqsEl1IzYtICuhrlYdDc';
const supabase = createClient(supabaseUrl, supabaseKey);

// 共有フォームの送信
document.getElementById('content-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // フォームのデフォルトの送信を防ぐ

  const formElement = document.getElementById('content-form'); // フォーム要素を取得
  
  const formData = new FormData(formElement);
  const content = JSON.stringify(Blockly.serialization.workspaces.save(ws)); // ブロックの配置を取得

  loadingSpinner.style.display = 'block'; // ローディングスピナーを表示
  loadingOverlay.style.display = 'block'; // ローディングオーバーレイを表示
  
  try {

    const response = await fetch(`${process.env.API_ENDPOINT}/api/saveContent`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json', // レスポンスの形式を指定
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: formData.get('username'),
          contentName: formData.get('contentName'),
          description: formData.get('description'),
          content: content,
          photo: '', // 一時的に空
      }),
    });

    console.log(response);

    if (!response.ok) {
      const errorText = await response.text(); // エラーレスポンスを取得
      throw new Error(`ネットワークエラーが発生しました: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    const contentId = result.id;
    console.log('写真以外のコンテンツの保存に成功しました:', result);

    // html2canvasを使用して出力されたHTMLをキャプチャ
    const canvas = await html2canvas(document.getElementById('output'));
    const imgData = canvas.toDataURL('image/png'); // PNGデータを取得
    const blob = await (await fetch(imgData)).blob(); // Blob形式に変換
    
    // Supabaseに画像をアップロード
    const fileName = `images/content-${contentId}.png`; // IDをファイル名に追加
    const { data, error } = await supabase.storage.from('Blosite_photos').upload(fileName, blob, {
        contentType: 'image/png',
    });

    if (error) {
        console.error('画像の送信に失敗しました:', error);
        return;
    }

    // アップロードした画像のURLを取得
    const url = `https://foxfxembozpnvfdwxnog.supabase.co/storage/v1/object/public/Blosite_photos/images/content-${contentId}.png`;
    
    // データベースに画像のURLを更新
    await fetch(`${process.env.API_ENDPOINT}/api/updateContent`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: contentId, // コンテンツIDを指定
            photo: url, // 画像のURLを保存
        }),
    });

    console.log('画像のアップロードとURLの更新に成功しました');

    // 成功した場合の処理（例: フォームをクリアする）
    formElement.reset();

    // すべて非表示にする
    loadingSpinner.style.display = 'none';
    loadingOverlay.style.display = 'none';
    popupOuterId.style.display = 'none';
    popupForm.style.display = 'none';

    // 紙吹雪を降らせる
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });

    successMessage.style.display = 'block'; // 送信成功メッセージを表示
    setTimeout(() => {
      successMessage.style.display = 'none'; // 送信成功メッセージを非表示
    }, 3000);

  } catch (error) {
      console.error('送信中エラー:', error);

      alert('送信に失敗しました。');

      loadingSpinner.style.display = 'none'; // ローディングスピナーを非表示
      loadingOverlay.style.display = 'none'; // ローディングオーバーレイを非表示
  }
  
});
