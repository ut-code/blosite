import * as Blockly from 'blockly';
import DOMPurify from 'dompurify';
import { websiteGenerator } from './website_generator';
import { Order } from 'blockly/javascript';

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
websiteGenerator.forBlock['html_html-head-body'] = function(block, generator) {
    const headContent = generator.statementToCode(block, 'HEAD');
    const bodyContent = generator.statementToCode(block, 'BODY');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startBodyTag = attribute ? `<body ${attribute}>` : `<body>`;
    const code = `<html>\n<head>\n${headContent}</head>\n${startBodyTag}\n${bodyContent}</body>\n</html>\n`;
    return code;
};

websiteGenerator.forBlock['html_comment'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const code = `<!-- ${content} --->\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['html_title'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const code = `<title>${content}</title>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['html_div'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<div ${attribute}>` : `<div>`;
    const code = content ? `${startTag}\n${content}</div>\n` : `${startTag}</div>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};
websiteGenerator.forBlock['html_ul'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<ul ${attribute}>` : `<ul>`;
    const code = content ? `${startTag}\n${content}</ul>\n` : `${startTag}</ul>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};
websiteGenerator.forBlock['html_li'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const sanitizedContent = DOMPurify.sanitize(content);
    const startTag = attribute ? `<li ${attribute}>` : `<li>`;
    const code =  `${startTag}${sanitizedContent}</li>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['html_button'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<button ${attribute}>` : `<button>`;
    const code = content ? `${startTag}\n${content}</button>\n` : `${startTag}</button>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['html_script'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<script ${attribute}>` : `<script>`;
    const code = content ? `${startTag}\n${content}</script>\n` : `${startTag}</script>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['html_id'] = function(block, generator) {
    const field = block.getFieldValue('FIELD');
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    const code = value ? `id="${field}" ${value}` : `id="${field}"`;
    return [code, Order.ATOMIC]; // valueは配列で返す
};

websiteGenerator.forBlock['html_color'] = function(block, generator) {
    const field = block.getFieldValue('FIELD');
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    const code = value ? `style= "color:${field}" ${value}` : `style="color:${field}"`;
    return [code, Order.ATOMIC];
};

websiteGenerator.forBlock['html_text'] = function(block, generator) {
    const content = block.getFieldValue('TEXT');
    const sanitizedContent = DOMPurify.sanitize(content);
    const code = `${sanitizedContent}\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['js_getElementById'] = function(block, generator) {
    const id = block.getFieldValue('ID');
    const name = block.getFieldValue('NAME');
    const sanitizedId = DOMPurify.sanitize(id);
    const sanitizedName = DOMPurify.sanitize(name);
    const code = (sanitizedId && sanitizedName) ? `const ${sanitizedName} = document.getElementById("${sanitizedId}");\n` : "\n";
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['js_addEventListener'] = function(block, generator) {
    const id = block.getFieldValue('ID');
    const event = block.getFieldValue('EVENT');
    const content = generator.statementToCode(block, 'CONTENT');
    const sanitizedId = DOMPurify.sanitize(id);
    const code = `${sanitizedId}.addEventListener("${event}", () => {\n${content}});\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

websiteGenerator.forBlock['js_alert'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const code = `alert(${content.trimEnd()});\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};
websiteGenerator.forBlock['js_string'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const sanitizedContent = DOMPurify.sanitize(content);
    const code = `"${sanitizedContent}"\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

export { websiteGenerator };
