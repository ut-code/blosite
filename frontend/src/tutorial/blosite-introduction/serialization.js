/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// キャッシュの保存先を決定
const storageKey = 'tutorialBlositeIntroductionWorkspace';

// 初期状態のブロックをXMLで定義
const xml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable>buttonId</variable>
    <variable>divId</variable>
  </variables>
  <block type="html_html-head-body" x="142" y="-118">
    <value name="HEAD">
      <block type="html_title">
        <field name="CONTENT">ようこそ</field>
      </block>
    </value>
    <value name="BODY">
      <block type="html_hn">
        <field name="HN">1</field>
        <value name="ATTRIBUTE">
          <block type="html_style">
            <mutation items="1"></mutation>
            <value name="ADD0">
              <block type="css_color">
                <field name="FIELD">red</field>
              </block>
            </value>
          </block>
        </value>
        <value name="CONTENT">
          <block type="html_text">
            <field name="TEXT">Welcome to Blosite!</field>
          </block>
        </value>
        <next>
          <block type="html_p">
            <value name="CONTENT">
              <block type="html_text">
                <field name="TEXT">Blositeへようこそ！</field>
                <next>
                  <block type="html_text">
                    <field name="TEXT"></field>
                  </block>
                </next>
              </block>
            </value>
            <next>
              <block type="html_button">
                <value name="ATTRIBUTE">
                  <block type="html_id">
                    <field name="FIELD">button-id</field>
                  </block>
                </value>
                <value name="CONTENT">
                  <block type="html_text">
                    <field name="TEXT">押してください</field>
                  </block>
                </value>
                <next>
                  <block type="html_div">
                    <value name="ATTRIBUTE">
                      <block type="html_id">
                        <field name="FIELD">div-id</field>
                      </block>
                    </value>
                    <next>
                      <block type="html_script">
                        <value name="CONTENT">
                          <block type="variables_set">
                            <field name="VAR">buttonId</field>
                            <value name="VALUE">
                              <block type="js_getElementById">
                                <field name="ID">button-id</field>
                              </block>
                            </value>
                            <next>
                              <block type="variables_set">
                                <field name="VAR">divId</field>
                                <value name="VALUE">
                                  <block type="js_getElementById">
                                    <field name="ID">div-id</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="js_addEventListener">
                                    <field name="EVENT">click</field>
                                    <value name="ID">
                                      <block type="variables_get">
                                        <field name="VAR">buttonId</field>
                                      </block>
                                    </value>
                                    <value name="CONTENT">
                                      <block type="js_setter">
                                        <value name="VARIABLE">
                                          <block type="js_textContent">
                                            <value name="VALUE">
                                              <block type="variables_get">
                                                <field name="VAR">divId</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <value name="CONTENT">
                                          <block type="text_join">
                                            <mutation items="2"></mutation>
                                            <value name="ADD0">
                                              <block type="js_textContent">
                                                <value name="VALUE">
                                                  <block type="variables_get">
                                                    <field name="VAR">divId</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <value name="ADD1">
                                              <block type="text">
                                                <field name="TEXT">わ～い</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </value>
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
  window.sessionStorage?.setItem(storageKey, JSON.stringify(data));
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const load = function (workspace) {
  const data = window.sessionStorage?.getItem(storageKey);
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

