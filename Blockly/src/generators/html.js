import * as Blockly from 'blockly';
import DOMPurify from 'dompurify';

export const htmlGenerator = new Blockly.Generator('HTML');

// 演算子の優先順位を定義（現状は優先なし）
const Order = {
    ATOMIC: 0,
};

// input_statement内のstatementブロックを再帰的に読み取る
// statementブロックが複数個の場合はこれが必要
htmlGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return code + htmlGenerator.blockToCode(nextBlock);
    }
    return code;
};

// ブロックの生成するコードを定義
htmlGenerator.forBlock['html_html-head-body'] = function(block, generator) {
    const headContent = generator.statementToCode(block, 'HEAD');
    const bodyContent = generator.statementToCode(block, 'BODY');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startBodyTag = attribute ? `<body ${attribute}>` : `<body>`;
    const code = `<html>\n<head>\n${headContent}</head>\n${startBodyTag}\n${bodyContent}</body>\n</html>\n`;
    return code;
};

htmlGenerator.forBlock['html_comment'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const code = `<!-- ${content} --->\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['html_title'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const code = `<title>${content}</title>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['html_div'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<div ${attribute}>` : `<div>`;
    const code = content ? `${startTag}\n${content}</div>\n` : `${startTag}</div>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['html_button'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<button ${attribute}>` : `<button>`;
    const code = content ? `${startTag}\n${content}</button>\n` : `${startTag}</button>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['html_script'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<script ${attribute}>` : `<script>`;
    const code = content ? `${startTag}\n${content}</script>\n` : `${startTag}</script>\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['html_id'] = function(block, generator) {
    const field = block.getFieldValue('FIELD');
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    const code = value ? `id="${field}" ${value}` : `id="${field}"`;
    return [code, Order.ATOMIC]; // valueは配列で返す
};

htmlGenerator.forBlock['html_color'] = function(block, generator) {
    const field = block.getFieldValue('FIELD');
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    const code = value ? `color=${field} ${value}` : `color=${field}`;
    return [code, Order.ATOMIC];
};

htmlGenerator.forBlock['html_text'] = function(block, generator) {
    const content = block.getFieldValue('CONTENT');
    const sanitizedContent = DOMPurify.sanitize(content);
    const code = `${sanitizedContent}\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['js_getElementById'] = function(block, generator) {
    const id = block.getFieldValue('ID');
    const name = block.getFieldValue('NAME');
    const sanitizedId = DOMPurify.sanitize(id);
    const sanitizedName = DOMPurify.sanitize(name);
    const code = (sanitizedId && sanitizedName) ? `const ${sanitizedName} = document.getElementById("${sanitizedId}");\n` : "\n";
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['js_addEventListener'] = function(block, generator) {
    const id = block.getFieldValue('ID');
    const event = block.getFieldValue('EVENT');
    const content = generator.statementToCode(block, 'CONTENT');
    const sanitizedId = DOMPurify.sanitize(id);
    const code = `${sanitizedId}.addEventListener("${event}", () => {\n${content}});\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};

htmlGenerator.forBlock['js_alert'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const code = `alert(${content.trimEnd()});\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};