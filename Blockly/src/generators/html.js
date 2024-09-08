import * as Blockly from 'blockly';

export const htmlGenerator = new Blockly.Generator('HTML');

const Order = {
    ATOMIC: 0,
};

htmlGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return code + htmlGenerator.blockToCode(nextBlock);
    }
    return code;
};

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

htmlGenerator.forBlock['html_div'] = function(block, generator) {
    const content = generator.statementToCode(block, 'CONTENT');
    const attribute = generator.valueToCode(block, 'ATTRIBUTE', Order.ATOMIC);
    const startTag = attribute ? `<div ${attribute}>` : `<div>`;
    const code = content ? `${startTag}\n${content}</div>\n` : `${startTag}</div>\n`;
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
    const code = `${content}\n`;
    const indentedCode = generator.prefixLines(code, generator.INDENT);
    return indentedCode;
};
