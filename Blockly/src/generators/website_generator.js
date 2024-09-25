import {Block} from 'blockly';
import {JavascriptGenerator, javascriptGenerator} from 'blockly/javascript';
import {Order} from 'blockly/javascript';

class WebsiteGenerator extends JavascriptGenerator {
  // Empty constructor.
  constructor() {
    super();
  }

  // Add your generator functions here.
}

export const websiteGenerator = new WebsiteGenerator();

Object.assign(websiteGenerator, javascriptGenerator);