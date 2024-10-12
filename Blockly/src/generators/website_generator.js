import {Block} from 'blockly';
import {JavascriptGenerator, javascriptGenerator} from 'blockly/javascript';
import {Order} from 'blockly/javascript';

class WebsiteGenerator extends JavascriptGenerator {
  
  // constructor() {
  //   super();
  // }

  static INDENT = '    ';

  // 定義が<script>タグ内の先頭に追加されるようにオーバーライド 
  // workspaceToCodeの最後で呼び出される
  finish(code) {
    
    // 定義を取得
    const definitions = Object.values(this.definitions_).join('\n\n');

    // 定義を初期化
    this.definitions_ = Object.create(null);
    this.functionNames_ = Object.create(null);

    // <script> タグの位置を見つける
    const scriptTagIndex = code.indexOf('<script>');
    
    if (scriptTagIndex < 0 && definitions.length > 0) {
      console.warn('No <script> tag found in the generated code.');
      return code; // 定義したいが<script> タグがない場合は変更なし
    }

    if (scriptTagIndex < 0 || definitions.length === 0) {
      return code; // <script> タグがないまたは定義がない場合は変更なし
    }

    // <script> タグ内のインデントを数える
    const precedingLines = code.slice(0, scriptTagIndex).split('\n');
    let scriptIndent = '';

    // 最後の行をチェックして、インデントを取得
    if (precedingLines.length > 0) {
      const lastLine = precedingLines[precedingLines.length - 1];
      // インデントの数を数える
      const match = lastLine.match(/^(\s*)/);
      if (match) {
          scriptIndent = match[1]; // インデントを取得
      }
    }

    // <script> タグ内の先頭に定義を追加
    const codeWithDefinitions = 
      code.slice(0, scriptTagIndex + 8/*<script>の直後*/)
      + (definitions ? '\n' : '')
      + ((scriptIndent.length > 0 && definitions) ? this.prefixLines(definitions,  scriptIndent + WebsiteGenerator.INDENT) : '')
      + (definitions ? '\n' : '')
      + (scriptIndent ? scriptIndent : '')
      + code.slice(scriptTagIndex + 8);

    return codeWithDefinitions;
  }
}

export const websiteGenerator = new WebsiteGenerator();

// 定義済みのブロック，ジェネレータを登録
Object.assign(websiteGenerator, javascriptGenerator);