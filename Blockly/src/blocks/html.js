import * as Blockly from "blockly";

// ブロックの見た目などを定義
export const htmlBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: "html_html-head-body",
    message0:
      "<html> %1 <head> %2 %3 </head> %4 <body> %5 %6 </body> %7 </html>",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "HEAD",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "BODY",
      },
      {
        type: "input_dummy",
      },
    ],
  },
  {
    type: "html_comment",
    message0: "<!-- %1 --->",
    args0: [
      {
        type: "field_input",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_title",
    message0: "<title> %1 </title>",
    args0: [
      {
        type: "field_input",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_div",
    message0: "<div> %1 %2 </div>",
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_br",
    message0: "<br />",
    args0: [
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_p",
    message0: "<p> %1 %2 </p>",
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_blockquote",
    message0: "<blockquote> %1 %2 </blockquote>",
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_ul",
    message0: "<ul> %1 %2 </ul>",
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
  },
  {
    'type': 'html_ol',
    'message0': '<ol> %1 %2 </ol>',
    'args0': [
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'CONTENT'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
  },
  {
    'type': 'html_li',
    'message0': '<li> %1 </li> %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'CONTENT'
        },
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_button",
    message0: "<button> %1 %2 </button>",
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_script",
    message0: "<script> %1 %2 </script>",
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "html_id",
    message0: 'id = "%1" %2',
    args0: [
      {
        type: "field_input",
        name: "FIELD",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "html_style",
    message0: "style = %1 %2",
    args0: [
      {
        type: "input_value",
        name: "ADD0",
      },
      {
        type: "input_value",
        name: "ADD1",
      },
    ],
    mutator: "html_style_mutator",
    output: "Array",
    tooltip: "Create a list with any number of items.",
    helpUrl: "",
  },
  {
    type: "html_style_mutator",
    message0: "要素を追加",
    tooltip: "リストに要素を追加または削除します。",
  },
  {
    type: "html_style_item", // ミューテーター内のブロック
    message0: "項目",
    previousStatement: null,
    nextStatement: null,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "html_style_container", // ミューテーター内のブロック
    message0: "項目を追加 %1",
    args0: [
      {
        type: "input_statement",
        name: "STACK",
      },
    ],
    output: null,
},
{
    'type': 'html_font-size',
    'message0': 'font-size = %1 %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'FIELD',
            'text': '16'
        },
        {
            'type': 'input_value',
            'name': 'VALUE'
        }
    ],
    'output': null,
},
{
    'type': 'html_strong',
    'message0': '<strong> %1 %2 </strong>',
    'args0': [
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'CONTENT'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_input',
    'message0': 'input type = %1 %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'CONTENT',
            'text': 'text'
        },
        {
            'type': 'input_value',
            'name': 'VALUE'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
},

{
    'type': 'html_text',
    'message0': '%1',
    'args0': [
        {
            'type': 'field_input',
            'name': 'TEXT',
        },
    ],
    previousStatement: null,
    nextStatement: null,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "css_color",
    message0: "color: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "#000000",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_font-size",
    message0: "font-size: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "16px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_font-weight",
    message0: "font-weight: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "bold",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_line-height",
    message0: "line-height; %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "1.5",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_background-color",
    message0: "background-color: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "#ffffff",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_margin",
    message0: "margin: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "20px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_padding",
    message0: "padding: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "10px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_border",
    message0: "border: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "1px solid #ccc",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_border-radius",
    message0: "border-radius: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "5px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_display",
    message0: "display: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "block",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_position",
    message0: "position: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "relative",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_top",
    message0: "top: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "10px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_left",
    message0: "left: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "10px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_right",
    message0: "right: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "10px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_bottom",
    message0: "bottom: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "10px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_top",
    message0: "top: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "10px",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_font-family",
    message0: "font-family: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "serif",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "css_font-family",
    message0: "font-family: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "serif",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
  },
  {
    type: "html_text",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    extensions: ["text_quotes"], // ダブルクォーテーションのアイコンを追加
  },
  {
    type: "js_getElementById",
    message0: 'id="%1"の要素を取得し変数"%2"に代入',
    args0: [
      {
        type: "field_input",
        name: "ID",
      },
      {
        type: "field_input",
        name: "NAME",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "js_addEventListener",
    message0: 'もし id="%1" が %2 されたら %3 %4',
    args0: [
      {
        type: "field_input",
        name: "ID",
      },
      {
        type: "field_dropdown",
        name: "EVENT",
        options: [
          ["クリック", "click"],
          ["マウスオーバー", "mouseover"],
          ["マウスアウト", "mouseout"],
          ["フォーカス", "focus"],
          ["フォーカスアウト", "blur"],
          ["キーダウン", "keydown"],
          ["キーアップ", "keyup"],
          ["キープレス", "keypress"],
        ],
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "CONTENT",
        check: "Javascript",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "js_alert",
    message0: "アラート%1",
    args0: [
      {
        type: "input_value",
        name: "CONTENT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "js_string",
    message0: '"%1"',
    args0: [
      {
        type: "field_input",
        name: "CONTENT",
        text: "文字列",
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
]);


// 動的な変更を伴うブロックの定義
Blockly.Blocks['html_hn'] = {
  init: function() {
    // ブロックのJSON定義に基づいて初期化
    this.jsonInit({
      type: "html_hn",
      message0: "<h%1>  %2 %3 %4",
      args0: [
        {
          type: "field_dropdown",
          name: "HN",
          options: [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"]
          ],
        },
        {
          type: "input_value",
          name: "ATTRIBUTE",
        },
        {
          type: "input_statement",
          name: "CONTENT",
        },
        {
          type: "field_label",
          name: "LABEL",
          text: "error!!",
        }
      ],
      previousStatement: null,
      nextStatement: null,
    });

    // ブロックの初期化時にラベルを更新
    // 確実に更新させるためにsetTimeoutを使用
    setTimeout(() => {
      this.updateLabel();
    }, 0);

    // ドロップダウンの選択に応じてラベルを更新
    this.setOnChange(() => {
      this.updateLabel(); // ラベルを更新するメソッドを呼び出す
    });
  },

  updateLabel: function() {
    const selectedOption = this.getFieldValue('HN');
    const labelField = this.getField('LABEL');

    // ドロップダウンの値に応じてラベルを変更
    labelField.setValue(`</h${selectedOption}>`);
    console.log(`</h${selectedOption}>`);
  }
};
