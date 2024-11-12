/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// キャッシュの保存先を決定
const storageKey = 'tutorialDOMManipulationWorkspace';

// 初期状態のブロックをXMLで定義
const xml = `
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="html_html-head-body" x="20" y="20">
    <statement name="HEAD">
      <block type="html_title">
        <field name="CONTENT">DOM</field>
      </block>
    </statement>
    <statement name="BODY">
      <block type="html_button">
        <value name="ATTRIBUTE">
          <block type="html_id">
            <value name="VALUE">
              <block type="html_style">
              </block>
            </value>
          </block>
        </value>
        <statement name="CONTENT">
          <block type="html_text">
            <field name="TEXT">押してください</field>
          </block>
        </statement>
        <next>
          <block type="html_div">
            <value name="ATTRIBUTE">
              <block type="html_id">
              </block>
            </value>
            <statemant name="CONTENT">
            </statemant>
            <next>
              <block type="html_script">
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`;

// XMLを読み込んでブロックを配置
const xmlDom = Blockly.utils.xml.textToDom(xml);

/**
 * Saves the state of the workspace to browser's local storage.
 * @param {Blockly.Workspace} workspace Blockly workspace to save.
 */
export const save = function (workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const load = function (workspace) {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) {
    Blockly.Xml.domToWorkspace(xmlDom, workspace);
    return;
  };

  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);

  if(workspace.getAllBlocks().length === 0) {
    Blockly.Xml.domToWorkspace(xmlDom, workspace);
  }

  Blockly.Events.enable();
};

