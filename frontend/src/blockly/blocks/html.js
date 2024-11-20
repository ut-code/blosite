import * as Blockly from "blockly";
import { registerFieldColour } from '@blockly/field-colour';
registerFieldColour();
// フィールドを登録



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
    style: "htmlelement_blocks",
    tooltip:"HTML要素をこの中にいれてウェブサイトを作る。headにはウェブページに\n表示されない要素を、bodyにはウェブページの内容となる要素をいれる。"
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
    style: "htmlelement_blocks",
    tooltip: "コード上にコメントを残す要素"
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
    style: "htmlelement_blocks",
    extensions: ["text_quotes"], // ダブルクォーテーションのアイコンを追加
    tooltip: "HTMLの中に文章を入れる"
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
    style: "htmlelement_blocks",
    tooltip: "titleを作る要素。<head>タグの中に入れる。",
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
    style: "htmlelement_blocks",
    tooltip: "HTMLのまとまりを作る要素。この中にある要素を1つの大きなまとまりとみなせる。",
  },
  {
    type: "html_br",
    message0: "<br />",
    args0: [
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "文章と文章の間に入れることで改行させる。",
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
    style: "htmlelement_blocks",
    tooltip: "段落を作る要素",
  },
  {
    type: "html_a",
    message0: "<a> %1 %2 </a>",
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
    style: "htmlelement_blocks",
    tooltip: "ハイパーリンク(テキストをクリックすることで別のURLに飛ぶリンク)を作る要素\n使用できる特殊な属性\n・href",
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
    style: "htmlelement_blocks",
    tooltip: "引用・転載文であることを表す要素。\n使用できる特殊な属性\n・cite",
  },
  {
    type: 'html_i',
    message0: '<i> %1 </i> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "イタリック体(斜体)の文章を作る。",
  },
  {
    type: 'html_b',
    message0: '<b> %1 </b> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "太文字の文章を作る。",
  },
  {
    type: 'html_u',
    message0: '<u> %1 </u> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "下線付きの文章を作る。",
  },
  {
    type: 'html_del',
    message0: '<del> %1 </del> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "削除された文章を表す。打消し線付きの文字で表示される。",
  },
  {
    type: 'html_ins',
    message0: '<ins> %1 </ins> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "追加された文章を表す。",
  },
  {
    type: 'html_small',
    message0: '<small> %1 </small> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "一回り小さな文章を作る。",
  },
  {
    type: 'html_sub',
    message0: '<sub> %1 </sub> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "下付き文字を作る。",
  },
  {
    type: 'html_sup',
    message0: '<sup> %1 </sup> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "上付き文字を作る。",
  },
  {
    type: 'html_em',
    message0: '<em> %1 </em> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "強調した文章を作る。",
  },
  {
    type: 'html_strong',
    message0: '<strong> %1 </strong> %2',
    args0: [
        {
          type: 'field_input',
          name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "強調した文章を作る。",
},
  {
    type: 'html_code',
    message0: '<code> %1 </code> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "文章がプログラムのソースコードであることを表す。",
  },
  {
    type: 'html_kbd',
    message0: '<kbd> %1 </kbd> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "キーボードのキーを表示する。",
  },
  {
    type: 'html_var',
    message0: '<var> %1 </var> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "数式やプログラムにおける変数や引数の名前を表す。イタリック体で表示される。",
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
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "順序のない箇条書きのリストを作る要素。リストの内容は<li>を用いて表す。\n使用できる特殊な属性\n・type",
  },
  {
    type: 'html_ol',
    message0: '<ol> %1 %2 </ol>',
    args0: [
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
        {
            type: 'input_statement',
            name: 'CONTENT'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "項目の順序付きリストを作る要素。要素の内容は<li>を用いて表す。\n使用できる特殊な属性\n・type・start",
  },
  {
    type: 'html_li',
    message0: '<li> %1 </li> %2',
    args0: [
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
    style: "htmlelement_blocks",
    tooltip: "リストの項目を表す。",
  },
  {
    type: 'html_cite',
    message0: '<cite> %1 </cite> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "引用の出典や参照先を表す。",
  },
  {
    type: "html_table",
    message0: "<table> %1 %2 </table>",
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
    style: "htmlelement_blocks",
    tooltip: "<thead>,<tbody>などと組み合わせてを表を作る要素。",
  },
  {
    type: "html_thead",
    message0: "<thead> %1 %2 </thead>",
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
    style: "htmlelement_blocks",
    tooltip: "表の一連の行(<tr>要素)をまとめて、各列の見出しであることを表す要素",
  },
  {
    type: "html_tbody",
    message0: "<tbody> %1 %2 </tbody>",
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
    style: "htmlelement_blocks",
    tooltip: "表の一連の行(<tr>要素)をまとめて表のデータの本体部分であることを表す要素。",
  },
  {
    type: "html_tfoot",
    message0: "<tfoot> %1 %2 </tfoot>",
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
    style: "htmlelement_blocks",
    tooltip: "表の一連の行(<tr>要素)をまとめて、列の脚部であることを表す。列の集計行として主に使われる。",
  },
  {
    type: "html_tr",
    message0: "<tr> %1 %2 </tr>",
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
    style: "htmlelement_blocks",
    tooltip: "表の行部分を指定する要素。<th>要素と<td>要素を入れる。",
  },
  {
    type: 'html_caption',
    message0: '<caption> %1 </caption> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "表のタイトルを作る要素",
  },
  {
    type: 'html_th',
    message0: '<th> %1 </th> %2',
    args0: [
        {
            type: 'field_input',
            name: 'CONTENT'
        },
        {
            type: 'input_value',
            name: 'ATTRIBUTE'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "<tr>要素の中に入れる。表のセルのグループの見出しを表す要素。",
  },
  {
    type: 'html_td',
    message0: '<td> %1 %2 </td>',
    args0: [
        {
          type: 'input_value',
          name: 'ATTRIBUTE'
        },
        {
            type: 'input_statement',
            name: 'CONTENT'
        },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "<tr>要素の中に入れる。表の内容のデータを表す要素。",
  },
  {
    type: "html_header",
    message0: "<header> %1 %2 </header>",
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
    style: "htmlelement_blocks",
    tooltip: "導入的なコンテンツを表す要素。見出しやロゴ、検索フォームなどを書く。",
  },
  {
    type: "html_footer",
    message0: "<footer> %1 %2 </footer>",
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
    style: "htmlelement_blocks",
    tooltip: "ウェブページの下部の領域を表す要素。",
  },
  {
    type: "html_hgroup",
    message0: "<hgroup> %1 %2 </hgroup>",
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
    style: "htmlelement_blocks",
    tooltip: "小見出しなど副次的コンテンツとグループ化された見出しを表す要素。1つの<hn>要素といくつかの<p>要素をグループ化する。",
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
    style: "htmlelement_blocks",
    tooltip: "ボタンを作る要素。\n使用できる特殊な属性\n・type・value・disable",
  },
  {
    type: "html_form",
    message0: "<form> %1 %2 </form>",
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
    style: "htmlelement_blocks",
    tooltip: "<input>要素や<select>要素などを中に入れることで入力送信フォームを作る要素\n使用できる特殊な属性\n・autocapitalize",
  },
  {
    type: 'html_input',
    message0: '<input /> %1',
    args0: [
      {
        type: "input_value",
        name: "ATTRIBUTE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "htmlelement_blocks",
    tooltip: "いろいろな入力欄を作る要素。\n使用できる特殊な属性(type属性の値によって使用できる属性が変化する)\n・type・value・checked・placeholder・max・maxlengthなど",
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
    style: "htmlelement_blocks",
    tooltip: "JavaScriptのコードを埋め込む要素。この中にスクリプトブロックを入れてください。\n使用できる特殊な属性\nsrc",
  },
  {
    type: "html_textarea",
    message0: "<textarea> %1 %2 </textarea>",
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
    style: "htmlelement_blocks",
    tooltip: "複数行の入力が可能な入力欄を作る要素\n使用できる特殊な属性\n・cols・maxlength・placeholder・autocorrect・autocapitalize",
  },
  {
    type: "html_select",
    message0: "<select> %1 %2 </select>",
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
    style: "htmlelement_blocks",
    tooltip: "セレクトボックスを作る要素。メニューの選択肢は<option>要素で指定する。\n使用できる特殊な属性\n・size・disable",
  },
  {
    type: "html_optgroup",
    message0: "<optgroup> %1 %2 </optgroup>",
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
    style: "htmlelement_blocks",
    tooltip: "<select>要素の中にいれる。<option>タグをグループ化する要素。\n使用できる特殊な属性\n・label・disable",
  },
  {
    type: 'html_option',
    message0: '<option> %1 </option> %2',
    args0: [
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
    style: "htmlelement_blocks",
    tooltip: "<select>要素または<optgroup>要素の中に入れる。メニューの選択肢を作る要素。\n使用できる特殊な属性\n・label・selected・value",
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
    style: "htmlattribute_blocks",
    tooltip: "要素を特定できる目印を設置する",
  },
  {
    type: "html_class",
    message0: 'class = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "要素に対して分類を設定する"
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
    style: "htmlattribute_blocks",
    tooltip: "cssブロックを接続することで要素のcssを表す。",
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
    style: "htmlattribute_blocks",
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
    style: "htmlattribute_blocks",
  },
  {
    type: "html_hidden",
    message0: 'hidden %1',
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "要素を非表示にする。",
  },
  {
    type: "html_spellcheck",
    message0: 'spellcheck = "%1" %2',
    args0: [
      {
        type: "field_dropdown",
        name: "FIELD",
        options: [
          ["true", "true"],
          ["false", "false"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "要素の中にスペルミスがないかチェックする。\n入力できる値\n・true・false",
  },
  {
    type: "html_title_attr",
    message0: 'title = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "要素に補足情報を追加する。値がそのまま補足情報となる。",
  },
  {
    type: "html_autocapitalize",
    message0: 'autocapitalize = "%1" %2',
    args0: [
      {
        type: "field_dropdown",
        name: "FIELD",
        options: [
          ["off", "off"],
          ["on", "on"],
          ["words", "words"],
          ["characters", "characters"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "入力文字を自動的に大文字化するかどうかを指定する。\n入力できる値\n・none・off・sentences・on・words・characters",
  },
  {
    type: "html_checked",
    message0: 'checked %1',
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "チェックボックスの初期状態を選択された状態にする。",
  },
  {
    type: "html_cols",
    message0: 'cols = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<textarea>要素の1行に表示する文字数を指定する。なにも入力されなければ20となる",
  },
  {
    type: "html_rows",
    message0: 'rows = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<textarea>要素の表示する文字数の高さを指定する。何も入力しない場合は２となる",
  },
  {
    type: "html_contenteditable",
    message0: 'contenteditable = "%1" %2',
    args0: [
      {
        type: "field_dropdown",
        name: "FIELD",
        options: [
          ["true", "true"],
          ["false", "false"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "ユーザーが要素の内容を変更できるようにする。\n入力できる値\n・true・false",
  },
  {
    type: "html_disabled",
    message0: 'disabled %1',
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "要素を非活性化する。",
  },
  {
    type: "html_href",
    message0: 'href = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "リンクのURLを設定する。",
  },
  {
    type: "html_label",
    message0: 'label = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<optgroup>要素や<option>要素で表示する文章を表す。",
  },
  {
    type: "html_max",
    message0: 'max = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<input>要素などで使い、入力できる値の最大値を表す。",
  },
  {
    type: "html_min",
    message0: 'min = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<input>要素などで使い、入力できる最小値を表す。",
  },
  {
    type: "html_maxlength",
    message0: 'maxlength = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<input>要素<textarea>要素で使い、入力できる最長文字列を表す。",
  },
  {
    type: "html_minlength",
    message0: 'minlength = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<input>要素<textarea>要素で使い、入力できる最小文字列を指定します。",
  },
  {
    type: "html_pattern",
    message0: 'pattern = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<input>要素の入力値の書式を指定する\n入力例(値を4-8文字に制限したい場合)：{4,8}",
  },
  {
    type: "html_placeholder",
    message0: 'placeholder = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "入力フォームに入力値がないときに表示する文章を表す。",
  },
  {
    type: "html_readonly",
    message0: 'readonly %1',
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "<input>要素<textarea>要素でユーザーが入力値を変更できないようにする。",
  },
  {
    type: "html_selected",
    message0: 'selected %1',
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: "<option>要素の中に書くことで<select>要素の初期値を指定する。",
  },
  {
    type: "html_size",
    message0: 'size = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "input要素の表示される文字数やselect要素で一度に表示される選択項目数を指定します。",
  },
  {
    type: "html_src",
    message0: 'src = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "文書内に埋め込む画像やファイルのファイルパスやURLを指定する。",
  },
  {
    type: "html_step",
    message0: 'step = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "入力可能な数値の間隔を指定する。",
  },
  {
    type: "html_start",
    message0: 'start = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "順序付きリストの開始番号を指定する。",
  },
  {
    type: "html_tabindex",
    message0: 'tabindex = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "ユーザーがTabキーを押した際にフォーカスする順番を指定する。",
  },
  {
    type: "html_type",
    message0: 'type = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "<input>要素では入力フォームの種類を<button>要素ではボタンの種類を<ol>要素ではリストマーカーの種類をする。\n入力できる値\n・input：・text・checkbox・date・color・email・number・radioなど\nol：・a・A・i・I・1\nbutton：・submit・reset・button",
  },
  {
    type: "html_value",
    message0: 'value = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "入力フォームの初期値を指定する。",
  },
  {
    type: "html_width",
    message0: 'width = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "横幅の長さをピクセル単位で指定する。",
  },
  {
    type: "html_height",
    message0: 'height = "%1" %2',
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
    style: "htmlattribute_blocks",
    tooltip: "縦幅の長さをピクセル単位で指定する。",
  },
  {
    type: "html_wrap",
    message0: 'wrap = "%1" %2',
    args0: [
      {
        type: "field_dropdown",
        name: "FIELD",
        options: [
          ["hard", "hard"],
          ["soft", "soft"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "htmlattribute_blocks",
    tooltip: " <textarea>要素で、入力した文章を送信時にテキストエリアの端で改行して送信するかどうかを指定\n入力できる値\n・soft・hard",
  },
  {
    type: "css_color",
    message0: "color: %1 %2",
    args0: [
      {
        type: 'field_colour',
        name: 'FIELD',
        colour:'#000000',
        colourOptions: [
          '#000000', '#696969', '#808080', '#a9a9a9', '#c0c0c0', '#d3d3d3', '#ffffff', // 黒・グレー・白
          '#ff0000', '#ff4500', '#ff6347', '#ff8c00', '#ffa500', '#ffd700', '#ffff00', // 赤・オレンジ・黄色
          '#006400', '#008000', '#32cd32', '#7fff00', '#adff2f', '#00ff00', '#00ff7f', // 緑系
          '#000080', '#0000cd', '#0000ff', '#1e90ff', '#00bfff', '#00ced1', '#00ffff', // 青系
          '#800080', '#9400d3', '#8a2be2', '#ba55d3', '#ff69b4', '#ff1493', '#ff00ff'  // 紫系
      ],
      colourTitles: [
          'Black', 'Dim Gray', 'Gray', 'Light Gray', 'Silver', 'Light Silver', 'White', // 黒・グレー・白
          'Red', 'Orange Red', 'Tomato', 'Dark Orange', 'Orange', 'Gold', 'Yellow', // 赤・オレンジ・黄色
          'Dark Green', 'Green', 'Lime Green', 'Lime', 'Yellow Green', 'Green Yellow', 'Spring Green', // 緑系
          'Navy', 'Medium Blue', 'Blue', 'Dodger Blue', 'Deep Sky Blue', 'Dark Turquoise', 'Cyan', // 青系
          'Indigo', 'Purple', 'Blue Violet', 'Medium Slate Blue', 'Orchid', 'Deep Pink', 'Magenta' // 紫系
      ],
      columns: 7 // 列数
      
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "css_blocks",
    tooltip: "色をカラーパレットで設定",
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
    style: "css_blocks",
    tooltip: "文字サイズをpx単位で指定",
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
        tooltip: "フォントの太さを指定\n入力できる値\n・normal・bold・lighter・bolder(また100の倍数単位で指定できます(900が最大))"
      },
    ],
    output: null,
    style: "css_blocks",
    tooltip: "",
  },
  {
    type: "css_line-height",
    message0: "line-height: %1 %2",
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
    style: "css_blocks",
    tooltip: "行の高さを%または倍数で指定。",
  },
  {
    type: "css_background-color",
    message0: "background-color: %1 %2",
    args0: [
      {
        type: 'field_colour',
        name: 'FIELD',
        colourOptions: [
          '#000000', '#696969', '#808080', '#a9a9a9', '#c0c0c0', '#d3d3d3', '#ffffff', // 黒・グレー・白
          '#ff0000', '#ff4500', '#ff6347', '#ff8c00', '#ffa500', '#ffd700', '#ffff00', // 赤・オレンジ・黄色
          '#006400', '#008000', '#32cd32', '#7fff00', '#adff2f', '#00ff00', '#00ff7f', // 緑系
          '#000080', '#0000cd', '#0000ff', '#1e90ff', '#00bfff', '#00ced1', '#00ffff', // 青系
          '#800080', '#9400d3', '#8a2be2', '#ba55d3', '#ff69b4', '#ff1493', '#ff00ff'  // 紫系
      ],
      colourTitles: [
          'Black', 'Dim Gray', 'Gray', 'Light Gray', 'Silver', 'Light Silver', 'White', // 黒・グレー・白
          'Red', 'Orange Red', 'Tomato', 'Dark Orange', 'Orange', 'Gold', 'Yellow', // 赤・オレンジ・黄色
          'Dark Green', 'Green', 'Lime Green', 'Lime', 'Yellow Green', 'Green Yellow', 'Spring Green', // 緑系
          'Navy', 'Medium Blue', 'Blue', 'Dodger Blue', 'Deep Sky Blue', 'Dark Turquoise', 'Cyan', // 青系
          'Indigo', 'Purple', 'Blue Violet', 'Medium Slate Blue', 'Orchid', 'Deep Pink', 'Magenta' // 紫系
      ],
      columns: 7 // 列数
      
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "css_blocks",
    tooltip: "背景色の色をカラーパレットで設定",
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
    style: "css_blocks",
    tooltip: "ボックスの外側の上下左右の空白を指定",
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
    style: "css_blocks",
    tooltip: "ボックスの内側の上下左右の空白を指定",
  },
  {
    type: "css_text-align",
    message0: "text-align: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "left",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "css_blocks",
    tooltip: "文章の水平方向の表示位置を調整\n入力できる値\n・left・center・right・justify(両端揃え)",
  },
  {
    type: "css_list-style-position",
    message0: "list-style-position: %1 %2",
    args0: [
      {
        type: "field_input",
        name: "FIELD",
        text: "inside",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "css_blocks",
    tooltip: "リストマーカーをボックスに含むかどうかを指定\n入力できる値\n・inside・outside",
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
    style: "css_blocks",
    tooltip: "境界線の作成。太さ、スタイル、色の順で値を半角スペースで区切る。\nスタイルの例：solid,dotted,double\n入力例：10px\x20dotted\x20red",
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
    style: "css_blocks",
    tooltip: "境界線の外側の角を丸める。半径を指定。",
  },
  {
    type: "css_border-collapse",
    message0: "border-collapse: %1 %2",
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
    style: "css_blocks",
    tooltip: "table要素に対して表の境界線の表示方法を指定\n入力できる値\n・collapse・separate",
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
    style: "css_blocks",
    tooltip: "要素の表示場所を指定する。\n入力できる値\n・inline・block・lisy-item・ruin-in・compact・none",
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
    style: "css_blocks",
    tooltip: "要素の配置方法を指定する。指定した値とtop,right,bottom,leftで位置を指定する。\n入力できる値\n・static・relative・absolute・fixed",
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
    style: "css_blocks",
    tooltip: "上からの距離をピクセル単位で指定する。positionの値がrelative,absolute,fixedの場合有効",
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
    style: "css_blocks",
    tooltip: "左からの距離をピクセル単位で指定する。positionの値がrelative,absolute,fixedの場合有効",
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
    style: "css_blocks",
    tooltip: "右からの距離をピクセル単位で指定する。positionの値がrelative,absolute,fixedの場合有効",
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
    style: "css_blocks",
    tooltip: "下からの距離をピクセル単位で指定する。positionの値がrelative,absolute,fixedの場合有効",
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
    style: "css_blocks",
    tooltip: "上からの距離をピクセル単位で指定する。positionの値がrelative,absolute,fixedの場合有効",
  },
  {
    type: "css_table-layout",
    message0: 'table-layout: %1 %2',
    args0: [
      {
        type: "field_dropdown",
        name: "FIELD",
        options: [
          ["auto", "auto"],
          ["fixed", "fixed"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    style: "css_blocks",
    tooltip: "表のレイアウト方法を指定する。\n入力できる値\n・auto・fixed(fixedの場合は表全体の幅やセルの幅を指定する必要がある。)",
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
    style: "css_blocks",
    tooltip: "フォントの種類を指定\n入力できる値：・sans-serif・selif・cursiveなど\n入力例：'MSPゴシック',sans-serif(フォント名,フォントファミリー名の順で記入)",
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
    style: "css_blocks",
    tooltip: "フォントの種類を指定\n入力できる値：・sans-serif・selif・cursiveなど\n入力例：'MSPゴシック',sans-serif(フォント名,フォントファミリー名の順で記入)",
  },
  // {
  //   type: "js_getElementById",
  //   message0: 'id="%1"の要素を取得し変数"%2"に代入',
  //   args0: [
  //     {
  //       type: "field_input",
  //       name: "ID",
  //     },
  //     {
  //       type: "field_input",
  //       name: "NAME",
  //     },
  //   ],
  //   previousStatement: null,
  //   nextStatement: null,
  //   style: "javascript_blocks",
  // },
  {
    type: "js_getElementById",
    message0: 'id="%1"の要素',
    args0: [
      {
        type: "field_input",
        name: "ID",
      },
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "指定したid名の要素を取得"
  },
  {
    type: "js_getElementByClassName",
    message0: 'class="%1"の要素',
    args0: [
      {
        type: "field_input",
        name: "CLASS",
      },
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "指定したclass名の要素を取得"
  },
  {
    type: "js_getElementByTagName",
    message0: '要素名"%1"の要素',
    args0: [
      {
        type: "field_input",
        name: "TAG",
      },
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "指定した要素名の要素を取得"
  },
  // {
  //   type: "js_addEventListener",
  //   message0: 'id="%1" にイベント %2 が発生したとき %3 %4',
  //   args0: [
  //     {
  //       type: "field_input",
  //       name: "ID",
  //     },
  //     {
  //       type: "field_dropdown",
  //       name: "EVENT",
  //       options: [
  //         ["クリック", "click"],
  //         ["マウスオーバー", "mouseover"],
  //         ["マウスアウト", "mouseout"],
  //         ["フォーカス", "focus"],
  //         ["フォーカスアウト", "blur"],
  //         ["キーダウン", "keydown"],
  //         ["キーアップ", "keyup"],
  //         ["キープレス", "keypress"],
  //       ],
  //     },
  //     {
  //       type: "input_dummy",
  //     },
  //     {
  //       type: "input_statement",
  //       name: "CONTENT",
  //       check: "Javascript",
  //     },
  //   ],
  //   previousStatement: null,
  //   nextStatement: null,
  //   style: "javascript_blocks",
  // },
  {
    type: "js_addEventListener",
    message0: '%1 にイベント %2 が発生したとき %3 %4',
    args0: [
      {
        type: "input_value",
        name: "ID",
        check: "variable",
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
        tooltip: ""
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "javascript_blocks",
    tooltip: "指定した要素に特定の操作が生じたらステートメントを実行"
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
    style: "javascript_blocks",
    tooltip: "ポップアップを表示",
  },
  {
    type: "js_textContent",
    message0: "要素 %1 の文章",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      }
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "指定した要素名の文章を取得"
  },
  {
    type: "js_value",
    message0: "要素 %1 の値",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      }
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "指定した要素名の値を取得"
  },
  {
    type: "js_createElement",
    message0: "要素名 %1 の要素を新規作成",
    args0: [
      {
        type: "field_input",
        name: "TAG",
      }
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "HTML要素の作成"
  },
  {
    type: "js_appendChild",
    message0: "要素 %1 内の末尾に要素 %2 を追加",
    args0: [
      {
        type: "input_value",
        name: "PARENT",
      },
      {
        type: "input_value",
        name: "CHILD",
      }
    ],
    previousStatement: null, 
    nextStatement: null,
    style: "javascript_blocks",
    tooltip: "一つ目に指定した要素内の末尾に要素を追加"
  },
  {
    type: "js_prompt",
    message0: "プロンプト %1 初期値 %2",
    args0: [
      {
        type: "input_value",
        name: "CONTENT",
      },
      {
        type: "input_value",
        name: "DEFAULT",
      },
    ],
    output: null,
    style: "javascript_blocks",
  },
  {
    type: "js_setter",
    message0: "%1に%2を代入",
    args0: [
      {
        type: "input_value",
        name: "VARIABLE",
      },
      {
        type: "input_value",
        name: "CONTENT",
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "javascript_blocks",
    tooltip: "一つ目に指定した要素に二つ目に指定したものを代入",
  },
  {
    type: "js_cast",
    message0: "%1 を %2 に変換",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["文字列", "String"],
          ["数値", "Number"],
          ["真偽値", "Boolean"],
        ],
      },
    ],
    output: null,
    style: "javascript_blocks",
    tooltip: "指定した要素の値を変換"
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
      style: "htmlelement_blocks",
      tooltip: "ウェブサイトの見出しを表す要素。数字の値が小さいほど大きな見出しになる。",
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
  }
};