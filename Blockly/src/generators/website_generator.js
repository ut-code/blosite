import {Block} from 'blockly';
import {JavascriptGenerator, javascriptGenerator} from 'blockly/javascript';
import {Order} from 'blockly/javascript';

class WebsiteGenerator extends JavascriptGenerator {
  // Empty constructor.
  // constructor() {
  //   super();
  // }

  // Add your generator functions here.
}

export const websiteGenerator = new WebsiteGenerator();

// 定義済みのブロック，ジェネレータを登録
Object.assign(websiteGenerator, javascriptGenerator);