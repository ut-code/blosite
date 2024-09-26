import * as Blockly from 'blockly';

// ブロックの見た目などを定義
export const htmlBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
    'type': 'html_html-head-body',
    'message0': '<html> %1 <head> %2 %3 </head> %4 <body> %5 %6 </body> %7 </html>',
    'args0': [
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_statement',
            'name': 'HEAD'
        },
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'BODY'
        },
        {
            'type': 'input_dummy'
        },
    ],
},
{
    'type': 'html_comment',
    'message0': '<!-- %1 --->',
    'args0': [
        {
            'type': 'field_input',
            'name': 'CONTENT',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_title',
    'message0': '<title> %1 </title>',
    'args0': [
        {
            'type': 'field_input',
            'name': 'CONTENT',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_div',
    'message0': '<div> %1 %2 </div>',
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
    'type': 'html_ul',
    'message0': '<ul> %1 %2 </ul>',
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
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_button',
    'message0': '<button> %1 %2 </button>',
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
    'type': 'html_script',
    'message0': '<script> %1 %2 </script>',
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
    'type': 'html_id',
    'message0': 'id = "%1" %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'FIELD',
        },
        {
            'type': 'input_value',
            'name': 'VALUE'
        }
    ],
    'output': null,
},
{
    'type': 'html_color',
    'message0': 'color = %1 %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'FIELD',
            'text': '#000000'
        },
        {
            'type': 'input_value',
            'name': 'VALUE'
        }
    ],
    'output': null,
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
    'previousStatement': null,
    'nextStatement': null,
    'extensions': ['text_quotes'], // ダブルクォーテーションのアイコンを追加
},
{
    'type': 'js_getElementById',
    'message0': 'id="%1"の要素を取得し変数"%2"に代入',
    'args0': [
        {
            'type': 'field_input',
            'name': 'ID',
        },
        {
            'type': 'field_input',
            'name': 'NAME',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'js_addEventListener',
    'message0': 'もし id="%1" が %2 されたら %3 %4',
    'args0': [
        {
            'type': 'field_input',
            'name': 'ID',
        },
        {
            'type': 'field_dropdown',
            'name': 'EVENT',
            'options': [
                ['クリック', 'click'],
                ['マウスオーバー', 'mouseover'],
                ['マウスアウト', 'mouseout'],
                ['フォーカス', 'focus'],
                ['フォーカスアウト', 'blur'],
                ['キーダウン', 'keydown'],
                ['キーアップ', 'keyup'],
                ['キープレス', 'keypress'],
            ],
        },
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_statement',
            'name': 'CONTENT',
            'check': 'Javascript',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'js_alert',
    'message0': 'アラート%1',
    'args0': [
        {
            'type': 'input_value',
            'name': 'CONTENT',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'js_string',
    'message0': '"%1"',
    'args0' : [
        {
            'type': 'field_input',
            'name': 'CONTENT',
            'text': '文字列'
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
]);
