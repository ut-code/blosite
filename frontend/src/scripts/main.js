/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import * as acorn from "acorn";
import * as estraverse from "estraverse";
import * as escodegen from "escodegen";
import {htmlBlocks} from '/src/blockly/blocks/html';
import {websiteGenerator} from '/src/blockly/generators/html';
import customMsg from '/src/blockly/custom_msg';
import '/src/styles/main.css';

// 現在のページを取得
const page = window.location.pathname;
let toolbox, save, load, storageKey;

// 現在のページに応じてファイルを読み込む
async function loadModules(page) {
  let toolboxModule, serializationModule;

  switch(page) {
    case '/sandbox':
      toolboxModule = await import('/src/sandbox/toolbox.js');
      serializationModule = await import('/src/sandbox/serialization.js');
      break;
    case '/tutorial/blosite-introduction':
      toolboxModule = await import('/src/tutorial/blosite-introduction/toolbox.js');
      serializationModule = await import('/src/tutorial/blosite-introduction/serialization.js');
      break;
    case '/tutorial/html-introduction':
      toolboxModule = await import('/src/tutorial/html-introduction/toolbox.js');
      serializationModule = await import('/src/tutorial/html-introduction/serialization.js');
      break;
    case '/tutorial/various-html-elements':
      toolboxModule = await import('/src/tutorial/various-html-elements/toolbox.js');
      serializationModule = await import('/src/tutorial/various-html-elements/serialization.js');
      break;
    case '/tutorial/css-introduction':
      toolboxModule = await import('/src/tutorial/css-introduction/toolbox.js');
      serializationModule = await import('/src/tutorial/css-introduction/serialization.js');
      break;
    case '/tutorial/variables-and-functions':
      toolboxModule = await import('/src/tutorial/variables-and-functions/toolbox.js');
      serializationModule = await import('/src/tutorial/variables-and-functions/serialization.js');
      break;
    case '/tutorial/dom-manipulation':
      toolboxModule = await import('/src/tutorial/dom-manipulation/toolbox.js');
      serializationModule = await import('/src/tutorial/dom-manipulation/serialization.js');
      break;
    case '/tutorial/control-structure':
      toolboxModule = await import('/src/tutorial/control-structure/toolbox.js');
      serializationModule = await import('/src/tutorial/control-structure/serialization.js');
      break;
    case '/tutorial/omikuji':
      toolboxModule = await import('/src/tutorial/omikuji/toolbox.js');
      serializationModule = await import('/src/tutorial/omikuji/serialization.js');
      break;
    case '/tutorial/todo':
      toolboxModule = await import('/src/tutorial/todo/toolbox.js');
      serializationModule = await import('/src/tutorial/todo/serialization.js');
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
      'template_category': {
          'colour': '#800080'
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

  // HTML文字列をパースしてDOMに変換
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputCode, 'text/html');

  // idやclassに追加する接頭辞
  const idPrefix = 'USER_ID_';
  const classPrefix = 'USER_CLASS_';

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
    }
  });

  // HTML全体を再整形する
  const serializer = new XMLSerializer();
  let formattedHTML = serializer.serializeToString(doc);

  formattedHTML = formattedHTML.replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, '');

  return formattedHTML;
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
  // 「コードを表示」に表示されるコードと同一の処理
  let code = websiteGenerator.workspaceToCode(ws);
  const htmlTagIndex = code.indexOf('<html>');
  const closeHtmlTagIndex = code.indexOf('</html>');
  code = code.slice(htmlTagIndex, closeHtmlTagIndex + 7);

  const generatedHTML = processDisplayedCode(code);

  // const generatedHTML = document.getElementById("output").innerHTML;

  // sessionStorageに保存
  sessionStorage.setItem("previewHTML", generatedHTML);
  console.log("HTMLを保存しました。");

  // プレビュー画面に遷移
  window.open('./../preview', '_blank');
}

// ポップアップの表示

const popupId = document.getElementById("popup");
const popupOuterId = document.getElementById("popup-outer");
const popupInnerId = document.getElementById("popup-inner");
const popupCloseId = document.getElementById("popup-close");
const popupSandbox = document.getElementById("popup-sandbox");
const hamburgerIcon = document.getElementById('hamburger-icon');
let bodyScrollWidth = document.body.scrollWidth;

// ポップアップの背景の幅を調整
popupOuterId.style.width = `${bodyScrollWidth}px`;
// resize時にも調整
window.addEventListener('resize', () => {
  bodyScrollWidth = document.body.scrollWidth;
  popupOuterId.style.width = `${bodyScrollWidth}px`;
});

// サンドボックスに移動するボタン
document.getElementById("sandbox-button").onclick = () => {
  const content = JSON.stringify(Blockly.serialization.workspaces.save(ws));
  const data = window.localStorage?.getItem("sandboxWorkspace");
  showPopup(content, data);
};

function showPopup(content, data) {
  const popup = document.getElementById('popup-sandbox');
  const popupSandboxMessage = document.getElementById('popup-sandbox-message');
  popup.style.display = 'block';
  popupOuterId.style.display = 'block';

  if (data && (data.length > 2)) {
      popupSandboxMessage.innerText = 'サンドボックスに移動して作り続けよう！\n\n注意：サンドボックスに途中のデータがあります。\n途中のデータは上書きされます。';
  } else {
      popupSandboxMessage.innerText = 'サンドボックスに移動して作り続けよう！';
  }

  // 確認ボタンがクリックされた場合の処理
  document.getElementById('popup-sandbox-button').onclick = () => {
      window.localStorage?.setItem("sandboxWorkspace", content);
      window.location.href = `./../sandbox`;
  };
}

document.getElementById("popup-sandbox-button").onclick = () => {
  popupOuterId.style.display = 'block';
}

popupId.addEventListener('click', e => {
  if ((e.target.id === popupOuterId.id) || (e.target.id === popupCloseId.id)){
    popupOuterId.style.display = 'none';
    popupInnerId.style.display = 'none';
    popupSandbox.style.display = 'none';
  }
})

popupSandbox.addEventListener('click', e => {
  if ((e.target.id === popupOuterId.id) || (e.target.id === popupCloseId.id)){
    popupOuterId.style.display = 'none';
    popupInnerId.style.display = 'none';
    popupSandbox.style.display = 'none';
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
        slide.style.display = (i === index) ? 'flex' : 'none';
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

// クリックイベントで状態を切り替える
runIcon.addEventListener('click', () => {

  if(state === 'play') {
    playClicked = true;
    runCode();
  }
  else {
    // 現在のクラスを削除
    runIcon.classList.remove(state);

    // インデックスを次の状態に変更
    state = (state==='stop') ? 'continuous' : 'stop';

    // 新しいクラスを追加
    runIcon.classList.add(state);
  }
});

runSwitchButton.addEventListener('click', () => {
  
  if(state === 'play') {
    runIcon.classList.remove('play');
    runIcon.classList.add('continuous');
    state = 'continuous';
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

hamburgerIcon.addEventListener('click', () => {
  hamburgerIcon.classList.toggle('open');
});



// ページ読み込み時のレイアウト崩れを防ぐための処理
window.addEventListener('load', function() {
  const content = document.getElementById('content');
  content.style.visibility = 'visible';
});
