import * as Blockly from "blockly";
import DOMPurify from "dompurify";
import { websiteGenerator } from "./website_generator";
import { Order } from "blockly/javascript";

// export const htmlGenerator = new Blockly.Generator('HTML');

// 演算子の優先順位を定義（現状は優先なし）
// const Order = {
//     ATOMIC: 0,
// };

// // input_statement内のstatementブロックを再帰的に読み取る
// // statementブロックが複数個の場合はこれが必要
// websiteGenerator.scrub_ = function(block, code, thisOnly) {
//     const nextBlock =
//         block.nextConnection && block.nextConnection.targetBlock();
//     if (nextBlock && !thisOnly) {
//       return code + websiteGenerator.blockToCode(nextBlock);
//     }
//     return code;
// };

function sanitizeInput(input) {
  // エスケープ処理
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // エスケープされた文字列をDOMPurifyでさらにサニタイズ
  const escapedInput = escapeHtml(input);
  return DOMPurify.sanitize(escapedInput);
}

// 後続したときに\nがいらないブロックのリスト
const noLineBreakBlockList = [
  "html_strong",
  "html_i",
  "html_b",
  "html_u",
  "html_del",
  "html_ins",
  "html_small",
  "html_sub",
  "html_sup",
  "html_em",
  "html_kbd",
  "html_var",
];

// 前方のブロックを見て判断
function isAfterNoLineBreakBlock(block, code) {
  const previousBlock = block.getPreviousBlock();
  const previousType = previousBlock ? previousBlock.type : null;
  return noLineBreakBlockList.includes(previousType);
}

// 後続のブロックを見て判断
function isBeforeNoLineBreakBlock(block, code) {
  const nextBlock = block.getNextBlock();
  const nextType = nextBlock ? nextBlock.type : null;
  return noLineBreakBlockList.includes(nextType);
}

// ブロックの生成するコードを定義
websiteGenerator.forBlock["html_html-head-body"] = function (block, generator) {
  const headContent = generator.statementToCode(block, "HEAD");
  const bodyContent = generator.statementToCode(block, "BODY");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startBodyTag = attribute ? `<body ${attribute}>` : `<body>`;
  const code = `<html>\n<head>\n${headContent}</head>\n${startBodyTag}\n${bodyContent}</body>\n</html>\n`;
  return code;
};

websiteGenerator.forBlock["html_comment"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const code = `<!-- ${content} --->\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_text"] = function (block, generator) {
  const content = block.getFieldValue("TEXT");
  const nextBlock = block.getNextBlock();
  const sanitizedContent = sanitizeInput(content);

  // 下のブロックが存在する場合、そのtypeを取得
  let nextType = null;
  if (nextBlock) {
    nextType = nextBlock.type;
  }

  // 前のブロックがhtml_textの場合は改行を追加
  const code =
    nextType == "html_text"
      ? `${sanitizedContent}<br />`
      : `${sanitizedContent}`;
  const linedCode = isBeforeNoLineBreakBlock(block, code) ? code : code + "\n";
  const indentedCode = isAfterNoLineBreakBlock(block)
    ? generator.prefixLines(linedCode, generator.INDENT)
    : linedCode;
  return indentedCode;
};

websiteGenerator.forBlock["html_title"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const code = `<title>${content}</title>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_div"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<div ${attribute}>` : `<div>`;
  const code = content
    ? `${startTag}\n${content}</div>\n`
    : `${startTag}</div>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_hn"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const hn = block.getFieldValue("HN");
  const startTag = attribute ? `<h${hn} ${attribute}>` : `<h${hn}>`;
  const code = content
    ? `${startTag}\n${content}</h${hn}>\n`
    : `${startTag}</h${hn}>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_br"] = function (block, generator) {
  return "<br />\n";
};

websiteGenerator.forBlock["html_p"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<p ${attribute}>` : `<p>`;
  const code = content ? `${startTag}\n${content}</p>\n` : `${startTag}</p>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_a"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<a ${attribute}>` : `<a>`;
  const code = content ? `${startTag}\n${content}</a>\n` : `${startTag}</a>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_blockquote"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<blockquote ${attribute}>` : `<blockquote>`;
  const code = content
    ? `${startTag}\n${content}</blockquote>\n`
    : `${startTag}</blockquote>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_i"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<i ${attribute}>` : `<i>`;
  const code = `${startTag}${sanitizedContent}</i>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_b"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<b ${attribute}>` : `<b>`;
  const code = `${startTag}${sanitizedContent}</b>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_u"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<u ${attribute}>` : `<u>`;
  const code = `${startTag}${sanitizedContent}</u>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_del"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<del ${attribute}>` : `<del>`;
  const code = `${startTag}${sanitizedContent}</del>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_ins"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<ins ${attribute}>` : `<ins>`;
  const code = `${startTag}${sanitizedContent}</ins>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_small"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<small ${attribute}>` : `<small>`;
  const code = `${startTag}${sanitizedContent}</small>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_sub"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<sub ${attribute}>` : `<sub>`;
  const code = `${startTag}${sanitizedContent}</sub>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_sup"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<sup ${attribute}>` : `<sup>`;
  const code = `${startTag}${sanitizedContent}</sup>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_em"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<em ${attribute}>` : `<em>`;
  const code = `${startTag}${sanitizedContent}</em>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_strong"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<strong ${attribute}>` : `<strong>`;
  const code = content
    ? `${startTag}\n${content}\n</strong>\n`
    : `${startTag}</strong>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_code"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<code ${attribute}>` : `<code>`;
  const code = `${startTag}${sanitizedContent}</code>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_kbd"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<kbd ${attribute}>` : `<kbd>`;
  const code = `${startTag}${sanitizedContent}</kbd>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_var"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<var ${attribute}>` : `<var>`;
  const code = `${startTag}${sanitizedContent}</var>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_ul"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<ul ${attribute}>` : `<ul>`;
  const code = content
    ? `${startTag}\n${content}</ul>\n`
    : `${startTag}</ul>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_li"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<li ${attribute}>` : `<li>`;
  const code = `${startTag}${sanitizedContent}</li>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_ol"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<ol ${attribute}>` : `<ol>`;
  const code = content
    ? `${startTag}\n${content}</ol>\n`
    : `${startTag}</ol>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_cite"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<cite ${attribute}>` : `<cite>`;
  const code = `${startTag}${sanitizedContent}</cite>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_table"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<table ${attribute}>` : `<table>`;
  const code = content
    ? `${startTag}\n${content}</table>\n`
    : `${startTag}</table>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_thead"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<thead ${attribute}>` : `<thead>`;
  const code = content
    ? `${startTag}\n${content}</thead>\n`
    : `${startTag}</thead>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_tbody"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<tbody ${attribute}>` : `<tbody>`;
  const code = content
    ? `${startTag}\n${content}</tbody>\n`
    : `${startTag}</tbody>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_tfoot"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<tfoot ${attribute}>` : `<tfoot>`;
  const code = content
    ? `${startTag}\n${content}</tfoot>\n`
    : `${startTag}</tfoot>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_tr"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<tr ${attribute}>` : `<tr>`;
  const code = content
    ? `${startTag}\n${content}</tr>\n`
    : `${startTag}</tr>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_th"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<th ${attribute}>` : `<th>`;
  const code = `${startTag}${sanitizedContent}</th>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_td"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<td ${attribute}>` : `<td>`;
  const code = content
    ? `${startTag}\n${content}</td>\n`
    : `${startTag}</td>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_caption"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<caption ${attribute}>` : `<caption>`;
  const code = `${startTag}${sanitizedContent}</caption>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_header"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<header ${attribute}>` : `<header>`;
  const code = content
    ? `${startTag}\n${content}</header>\n`
    : `${startTag}</header>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_footer"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<footer ${attribute}>` : `<footer>`;
  const code = content
    ? `${startTag}\n${content}</footer>\n`
    : `${startTag}</footer>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_hgroup"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<hgroup ${attribute}>` : `<hgroup>`;
  const code = content
    ? `${startTag}\n${content}</hgroup>\n`
    : `${startTag}</hgroup>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_button"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<button ${attribute}>` : `<button>`;
  const code = content
    ? `${startTag}\n${content}</button>\n`
    : `${startTag}</button>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_form"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<form ${attribute}>` : `<form>`;
  const code = content
    ? `${startTag}\n${content}</form>\n`
    : `${startTag}</form>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_input"] = function (block, generator) {
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<input ${attribute}` : `<input`;
  const code = `${startTag} />\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_textarea"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<textarea ${attribute}>` : `<textarea>`;
  const code = content
    ? `${startTag}\n${content}</textarea>\n`
    : `${startTag}</textarea>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_select"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<select ${attribute}>` : `<select>`;
  const code = content
    ? `${startTag}\n${content}</select>\n`
    : `${startTag}</select>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_optgroup"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<optgroup ${attribute}>` : `<optgroup>`;
  const code = content
    ? `${startTag}\n${content}</optgroup>\n`
    : `${startTag}</optgroup>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_option"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const sanitizedContent = sanitizeInput(content);
  const startTag = attribute ? `<option ${attribute}>` : `<option>`;
  const code = `${startTag}${sanitizedContent}</option>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_script"] = function (block, generator) {
  const content = generator.statementToCode(block, "CONTENT");
  const attribute = generator.valueToCode(block, "ATTRIBUTE", Order.ATOMIC);
  const startTag = attribute ? `<script ${attribute}>` : `<script>`;
  const code = content
    ? `${startTag}\n${content}</script>\n`
    : `${startTag}</script>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["html_id"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `id="${sanitizedField}" ${value}`
    : `id="${sanitizedField}"`;
  return [code, Order.ATOMIC]; // valueは配列で返す
};

websiteGenerator.forBlock["html_class"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `class="${sanitizedField}" ${value}`
    : `class="${sanitizedField}"`;
  return [code, Order.ATOMIC]; // valueは配列で返す
};

websiteGenerator.forBlock["html_style"] = function (block, generator) {
  let elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    let element =
      generator.valueToCode(block, "ADD" + i, Order.ATOMIC) || "null";
    elements.push(element);
  }
  let code = block.itemCount_
    ? 'style="' + elements.join("; ") + ';"'
    : 'style=""';
  return [code, Order.ATOMIC];
};

// html_styleブロックのミューテーター
Blockly.Extensions.registerMutator(
  "html_style_mutator",
  {
    itemCount_: 2,

    mutationToDom: function () {
      const container = Blockly.utils.xml.createElement("mutation");
      container.setAttribute("items", this.itemCount_);
      return container;
    },

    domToMutation: function (xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
      this.updateShape_();
    },

    decompose: function (workspace) {
      const containerBlock = workspace.newBlock("html_style_container");
      containerBlock.initSvg();
      let connection = containerBlock.getInput("STACK").connection;
      for (let i = 0; i < this.itemCount_; i++) {
        const itemBlock = workspace.newBlock("html_style_item");
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },

    compose: function (containerBlock) {
      let itemBlock = containerBlock.getInputTargetBlock("STACK");
      const connections = [];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      for (let i = 0; i < this.itemCount_; i++) {
        const connection = this.getInput("ADD" + i).connection;
        if (connections[i]) {
          connection.connect(connections[i]);
        }
      }
    },

    updateShape_: function () {
      while (this.getInput("EMPTY")) {
        this.removeInput("EMPTY");
      }
      // Remove all inputs if no items.
      if (this.itemCount_ === 0) {
        while (this.getInput("EMPTY")) {
          this.removeInput("EMPTY");
        }
        // Remove unnecessary inputs.
        let i = 0;
        while (this.getInput("ADD" + i)) {
          this.removeInput("ADD" + i++);
        }
        this.appendDummyInput("EMPTY").appendField("style =");
      } else {
        // Add new inputs.
        for (let i = 0; i < this.itemCount_; i++) {
          if (!this.getInput("ADD" + i)) {
            if (i === 0) {
              this.appendValueInput("ADD" + i)
                .appendField("style = ")
                .setAlign(Blockly.inputs.Align.RIGHT);
            } else {
              const input = this.appendValueInput("ADD" + i).setAlign(
                Blockly.inputs.Align.RIGHT
              );
            }
          }
        }
        // Remove unnecessary inputs.
        while (this.getInput("ADD" + this.itemCount_)) {
          this.removeInput("ADD" + this.itemCount_);
        }
      }
    },
  },
  null,
  ["html_style_item"]
);

websiteGenerator.forBlock["html_hidden"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `hidden ${value}` : `hidden`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_spellcheck"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `spellcheck="${sanitizedField}" ${value}`
    : `spellcheck="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_autocapitalize"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `autocapitalize="${sanitizedField}" ${value}`
    : `autocapitalize="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_title_attr"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `title="${sanitizedField}" ${value}`
    : `title="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_checked"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `checked ${value}` : `checked`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_cols"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `cols="${sanitizedField}" ${value}`
    : `cols="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_rows"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `rows="${sanitizedField}" ${value}`
    : `rows="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_contenteditable"] = function (
  block,
  generator
) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `contenteditable="${sanitizedField}" ${value}`
    : `contenteditable="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_disabled"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `disabled ${value}` : `disabled`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_font-size"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value
    ? `style= "font-size:${field}px;" ${value}`
    : `style="font-size:${field}px;"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_href"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `href="${sanitizedField}" ${value}`
    : `href="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_label"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `label="${sanitizedField}" ${value}`
    : `label="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_max"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `max="${sanitizedField}" ${value}`
    : `max="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_min"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `min="${sanitizedField}" ${value}`
    : `min="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_maxlength"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `maxlength="${sanitizedField}" ${value}`
    : `maxlength="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_minlength"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `minlength="${sanitizedField}" ${value}`
    : `minlength="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_pattern"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `pattern="${sanitizedField}" ${value}`
    : `pattern="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_placeholder"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `placeholder="${sanitizedField}" ${value}`
    : `placeholder="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_readonly"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `readonly ${value}` : `readonly`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_selected"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `selected ${value}` : `selected`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_size"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `size="${sanitizedField}" ${value}`
    : `size="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_src"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `src="${sanitizedField}" ${value}`
    : `src="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_step"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `step="${sanitizedField}" ${value}`
    : `step="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_start"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `start="${sanitizedField}" ${value}`
    : `start="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_tabindex"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `tabindex="${sanitizedField}" ${value}`
    : `tabindex="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_type"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `type="${sanitizedField}" ${value}`
    : `type="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_value"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `value="${sanitizedField}" ${value}`
    : `value="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_width"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `width="${sanitizedField}" ${value}`
    : `width="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["html_wrap"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `wrap="${sanitizedField}" ${value}`
    : `wrap="${sanitizedField}"`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_color"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `color:${sanitizedField}; ${value}`
    : `color:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_font-size"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `font-size:${sanitizedField}; ${value}`
    : `font-size:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_font-weight"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `font-weight:${sanitizedField}; ${value}`
    : `font-weight:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_line-weight"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `line-weight:${sanitizedField}; ${value}`
    : `line-weight:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_background-color"] = function (
  block,
  generator
) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `background-color:${sanitizedField}; ${value}`
    : `background-color:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_margin"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `margin:${sanitizedField}; ${value}`
    : `margin:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_padding"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `padding:${sanitizedField}; ${value}`
    : `padding:${sanitizedField}`;
  return [code, Order.ATOMIC];
};
websiteGenerator.forBlock["css_text-align"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value ? `text-align:${sanitizedField}; ${value}` : `text-align:${sanitizedField}`;
  return [code, Order.ATOMIC];
};
websiteGenerator.forBlock["css_list-style-position"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value ? `list-style-position:${sanitizedField}; ${value}` : `list-style-position:${sanitizedField}`;
  return [code, Order.ATOMIC];
};


websiteGenerator.forBlock["css_border"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `border:${sanitizedField}; ${value}`
    : `border:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_border-radius"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `border-radius:${sanitizedField}; ${value}`
    : `border-radius:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_border-collapse"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `border-collapse:${sanitizedField}; ${value}`
    : `border-collapse:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_display"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `display:${sanitizedField}; ${value}`
    : `display:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_position"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `position:${sanitizedField}; ${value}`
    : `position:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_top"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `top:${sanitizedField}; ${value}`
    : `top:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_table-layout"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `table-layout:${sanitizedField}; ${value}`
    : `table-layout:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_left"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `left:${sanitizedField}; ${value}`
    : `left:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_right"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `right:${sanitizedField}; ${value}`
    : `right:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_bottom"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const sanitizedField = sanitizeInput(field);
  const code = value
    ? `bottom:${sanitizedField}; ${value}`
    : `bottom:${sanitizedField}`;
  return [code, Order.ATOMIC];
};

// websiteGenerator.forBlock["js_getElementById"] = function (block, generator) {
//   const id = block.getFieldValue("ID");
//   const name = block.getFieldValue("NAME");
//   const sanitizedId = DOMPurify.sanitize(id);
//   const sanitizedName = DOMPurify.sanitize(name);
//   const code =
//     sanitizedId && sanitizedName
//       ? `const ${sanitizedName} = document.getElementById("${sanitizedId}");\n`
//       : "\n";
//   const indentedCode = generator.prefixLines(code, generator.INDENT);
//   return indentedCode;
// };

websiteGenerator.forBlock["js_getElementById"] = function (block, generator) {
  const id = block.getFieldValue("ID");
  const sanitizedId = sanitizeInput(id);
  const code = sanitizedId ? `document.getElementById("${sanitizedId}")` : "";
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["js_getElementsByClassName"] = function (
  block,
  generator
) {
  const className = block.getFieldValue("CLASS");
  const sanitizedClassName = sanitizeInput(className);
  const code = sanitizedClassName
    ? `document.getElementsByClassName("${sanitizedClassName}")`
    : "";
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["js_getElementByTagName"] = function (
  block,
  generator
) {
  const tagName = block.getFieldValue("TAG");
  const sanitizedtagName = sanitizeInput(tagName);
  const code = sanitizedtagName
    ? `document.getElementById("${sanitizedtagName}")`
    : "";
  return [code, Order.ATOMIC];
};
websiteGenerator.forBlock["js_getElementStyle"] = function (block, generator) {
  const variable = generator.valueToCode(block, "VARIABLE", Order.ATOMIC);
  const content = generator.valueToCode(block, "CONTENT", Order.ATOMIC);
  const [propertyName,value] = content.split(':').map(s => s.trim());
  function toCamelCase(str) {
    return str
      .replace(/([-_][a-z])/gi, (match) => match.toUpperCase()
        .replace('-', '')
        .replace('_', ''));
  }
  const camelCaseProperty = toCamelCase(propertyName);
  const code = variable 
    ?  `${variable}.style.${camelCaseProperty} ="${value}";\n`
    : "\n"; 
    return code;
};


// websiteGenerator.forBlock["js_addEventListener"] = function (block, generator) {
//   const id = block.getFieldValue("ID");
//   const event = block.getFieldValue("EVENT");
//   const content = generator.statementToCode(block, "CONTENT");
//   const sanitizedId = DOMPurify.sanitize(id);
//   const code = `${sanitizedId}.addEventListener("${event}", () => {\n${content}});\n`;
//   const indentedCode = generator.prefixLines(code, generator.INDENT);
//   return indentedCode;
// };

websiteGenerator.forBlock["js_addEventListener"] = function (block, generator) {
  const id = generator.valueToCode(block, "ID", Order.ATOMIC);
  const event = block.getFieldValue("EVENT");
  const content = generator.statementToCode(block, "CONTENT");
  const code = id
    ? `${id}.addEventListener("${event}", () => {\n${content}});\n`
    : "\n";
  return code;
};

websiteGenerator.forBlock["js_textContent"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `${value}.textContent` : "";
  return [code, Order.ATOMIC];
};
websiteGenerator.forBlock["js_value"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `${value}.value` : "";
  return [code, Order.ATOMIC];
};
/*
websiteGenerator.forBlock["js_textContent"] = function (block, generator) {
  const variable = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  //const sanitizedText = sanitizeInput(text);
  const code = (variable) ? `${variable}.textContent` : "\n";
  //const indentedCode = generator.prefixLines(code, generator.INDENT);
  return code;
};
*/

websiteGenerator.forBlock["js_createElement"] = function (block, generator) {
  const tagName = block.getFieldValue("TAG");
  const sanitizedtagName = sanitizeInput(tagName);
  const code = sanitizedtagName
    ? `document.createElement("${sanitizedtagName}")`
    : "";
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["js_alert"] = function (block, generator) {
  const content = generator.valueToCode(block, "CONTENT", Order.ATOMIC);
  const code = `alert(${content});\n`;
  return code;
};

websiteGenerator.forBlock["js_appendChild"] = function (block, generator) {
  const parent = generator.valueToCode(block, "PARENT", Order.ATOMIC);
  const child = generator.valueToCode(block, "CHILD", Order.ATOMIC);
  const code = parent && child ? `${parent}.appendChild(${child});\n` : "\n";
  return code;
};

websiteGenerator.forBlock["js_removeChild"] = function (block, generator) {
  const parent = generator.valueToCode(block, "PARENT", Order.ATOMIC);
  const child = generator.valueToCode(block, "CHILD", Order.ATOMIC);
  const code = parent && child ? `${parent}.removeChild(${child});\n` : "\n";
  return code;
};

websiteGenerator.forBlock["js_prompt"] = function (block, generator) {
  const content = generator.valueToCode(block, "CONTENT", Order.ATOMIC);
  const defaultText = generator.valueToCode(block, "DEFAULT", Order.ATOMIC);
  if (content && defaultText) {
    const code = `prompt(${content}, ${defaultText});\n`;
    return code;
  }
  const code = content ? `prompt(${content});` : "";
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["js_setter"] = function (block, generator) {
  const variable = generator.valueToCode(block, "VARIABLE", Order.ATOMIC);
  const content = generator.valueToCode(block, "CONTENT", Order.ATOMIC);
  const code = variable && content ? `${variable} = ${content};\n` : "\n";
  return code;
};

websiteGenerator.forBlock["js_cast"] = function (block, generator) {
  const content = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const type = block.getFieldValue("TYPE");
  const code = content ? `${type}(${content})` : "";
  return [code, Order.ATOMIC];
};

export { websiteGenerator };
