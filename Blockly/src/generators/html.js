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
  const sanitizedContent = DOMPurify.sanitize(content);
  const code = `${sanitizedContent}\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
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
  const sanitizedContent = DOMPurify.sanitize(content);
  const startTag = attribute ? `<li ${attribute}>` : `<li>`;
  const code = `${startTag}${sanitizedContent}</li>\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock['html_ol'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<ol ${attribute}>` : `<ol>`;
    const code = content ? `${startTag}\n${content}</ol>\n` : `${startTag}</ol>\n`;
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

websiteGenerator.forBlock['html_input'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    const code = value ? `<input type= ${content} ${value}>\n` : `<input type="${content}">\n`;
    return code;
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
  const code = value ? `id="${field}" ${value}` : `id="${field}"`;
  return [code, Order.ATOMIC]; // valueは配列で返す
};

websiteGenerator.forBlock["html_style"] = function (block, generator) {
  let elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    let element =
      generator.valueToCode(block, "ADD" + i, Order.ATOMIC) || "null";
    elements.push(element);
  }
  let code = block.itemCount_ ? 'style="' + elements.join("; ") + ';"' : 'style=""';
  return [code, Order.ATOMIC];
};

//html_styleブロックのミューテーター
Blockly.Extensions.registerMutator(
  "html_style_mutator",
  {
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

websiteGenerator.forBlock["css_color"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `color:${field}; ${value}` : `color:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_font-size"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `font-size:${field}; ${value}` : `font-size:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_font-weight"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `font-weight:${field}; ${value}` : `font-weight:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_line-weight"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `line-weight:${field}; ${value}` : `line-weight:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_background-color"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `background-color:${field}; ${value}` : `background-color:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_margin"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `margin:${field}; ${value}` : `margin:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_padding"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `padding:${field}; ${value}` : `padding:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_border"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `border:${field}; ${value}` : `border:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_border-radius"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `border-radius:${field}; ${value}` : `border-radius:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_display"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `display:${field}; ${value}` : `display:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_position"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `position:${field}; ${value}` : `position:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_top"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `top:${field}; ${value}` : `top:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_left"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `left:${field}; ${value}` : `left:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_right"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `right:${field}; ${value}` : `right:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["css_bottom"] = function (block, generator) {
  const field = block.getFieldValue("FIELD");
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = value ? `bottom:${field}; ${value}` : `bottom:${field}`;
  return [code, Order.ATOMIC];
};

websiteGenerator.forBlock["js_getElementById"] = function (block, generator) {
  const id = block.getFieldValue("ID");
  const name = block.getFieldValue("NAME");
  const sanitizedId = DOMPurify.sanitize(id);
  const sanitizedName = DOMPurify.sanitize(name);
  const code =
    sanitizedId && sanitizedName
      ? `const ${sanitizedName} = document.getElementById("${sanitizedId}");\n`
      : "\n";
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["js_addEventListener"] = function (block, generator) {
  const id = block.getFieldValue("ID");
  const event = block.getFieldValue("EVENT");
  const content = generator.statementToCode(block, "CONTENT");
  const sanitizedId = DOMPurify.sanitize(id);
  const code = `${sanitizedId}.addEventListener("${event}", () => {\n${content}});\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};

websiteGenerator.forBlock["js_alert"] = function (block, generator) {
  const content = generator.valueToCode(block, "CONTENT", Order.ATOMIC);
  const code = `alert(${content});\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;
};
websiteGenerator.forBlock["js_string"] = function (block, generator) {
  const content = block.getFieldValue("CONTENT");
  const sanitizedContent = DOMPurify.sanitize(content);
  const code = `"${sanitizedContent}"\n`;
  const indentedCode = generator.prefixLines(code, generator.INDENT);
  return indentedCode;

websiteGenerator.forBlock['html_font-size'] = function(block, generator) {
    const field = block.getFieldValue('FIELD');
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    const code = value ? `style= "font-size:${field}px;" ${value}` : `style="font-size:${field}px;"`;
    return [code, Order.ATOMIC];
};

websiteGenerator.forBlock['html_strong'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<strong ${attribute}>` : `<strong>`;
    const code = content ? `${startTag}\n${content}</strong>\n` : `${startTag}</strong>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

export { websiteGenerator };
