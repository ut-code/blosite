import * as Blockly from 'blockly';
import * as ja from 'blockly/msg/ja';

const customMsg = {
    // 既存の日本語メッセージ
    ...ja,

    // カスタムメッセージ
    // node_modules/blockly/msg/ja.js にあるメッセージを参考にしてください
    // "MATH_ATAN2_TITLE": "点 (%1, %2) の角度",
    "MATH_ATAN2_TOOLTIP": "アークタンジェントを用いて、点 (X, Y) と原点を結ぶ線分とx軸のなす角度を -180度から 180度で返します。",
};

export default customMsg;