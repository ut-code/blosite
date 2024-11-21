/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// キャッシュの保存先を決定
const storageKey = 'tutorialTodoWorkspace';

// 初期状態のブロックをXMLで定義
const xml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="html_html-head-body" x="-270" y="-210">
    <value name="BODY">
      <block type="html_div">
        <value name="ATTRIBUTE">
          <block type="html_id">
            <field name="FIELD">launch</field>
          </block>
        </value>
        <next>
          <block type="html_button">
            <value name="ATTRIBUTE">
              <block type="html_id">
                <field name="FIELD">button</field>
              </block>
            </value>
            <value name="CONTENT">
              <block type="html_text">
                <field name="TEXT">発射ボタン</field>
              </block>
            </value>
            <next>
              <block type="html_script">
                <value name="CONTENT">
                  <block type="variables_set">
                    <field name="VAR">launch</field>
                    <value name="VALUE">
                      <block type="js_getElementById">
                        <field name="ID">launch</field>
                      </block>
                    </value>
                    <next>
                      <block type="variables_set">
                        <field name="VAR">button</field>
                        <value name="VALUE">
                          <block type="js_getElementById">
                            <field name="ID">button</field>
                          </block>
                        </value>
                        <next>
                          <block type="js_addEventListener">
                            <field name="EVENT">click</field>
                            <value name="ID">
                              <block type="variables_get">
                                <field name="VAR">button</field>
                              </block>
                            </value>
                            <value name="CONTENT">
                              <block type="variables_set">
                                <field name="VAR">countdown</field>
                                <value name="VALUE">
                                  <block type="math_number">
                                    <field name="NUM">10</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="controls_for">
                                    <field name="VAR">i</field>
                                    <value name="FROM">
                                      <block type="math_number">
                                        <field name="NUM">0</field>
                                      </block>
                                    </value>
                                    <value name="TO">
                                      <block type="variables_get">
                                        <field name="VAR">countdown</field>
                                      </block>
                                    </value>
                                    <value name="BY">
                                      <block type="math_number">
                                        <field name="NUM">1</field>
                                      </block>
                                    </value>
                                    <statement name="DO">
                                      <block type="variables_set">
                                        <field name="VAR">div</field>
                                        <value name="VALUE">
                                          <block type="js_createElement">
                                            <field name="TAG">div</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="controls_if" inline="false">
                                            <mutation else="1"></mutation>
                                            <value name="IF0">
                                              <block type="logic_compare">
                                                <field name="OP">LT</field>
                                                <value name="A">
                                                  <block type="variables_get">
                                                    <field name="VAR">i</field>
                                                  </block>
                                                </value>
                                                <value name="B">
                                                  <block type="variables_get">
                                                    <field name="VAR">countdown</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <statement name="DO0">
                                              <block type="js_setter">
                                                <value name="VARIABLE">
                                                  <block type="js_textContent">
                                                    <value name="VALUE">
                                                      <block type="variables_get">
                                                        <field name="VAR">div</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <value name="CONTENT">
                                                  <block type="math_arithmetic">
                                                    <field name="OP">MINUS</field>
                                                    <value name="A">
                                                      <block type="variables_get">
                                                        <field name="VAR">countdown</field>
                                                      </block>
                                                    </value>
                                                    <value name="B">
                                                      <block type="variables_get">
                                                        <field name="VAR">i</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="js_appendChild">
                                                    <value name="PARENT">
                                                      <block type="variables_get">
                                                        <field name="VAR">launch</field>
                                                      </block>
                                                    </value>
                                                    <value name="CHILD">
                                                      <block type="variables_get">
                                                        <field name="VAR">div</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </next>
                                              </block>
                                            </statement>
                                            <statement name="ELSE">
                                              <block type="js_setter">
                                                <value name="VARIABLE">
                                                  <block type="js_textContent">
                                                    <value name="VALUE">
                                                      <block type="variables_get">
                                                        <field name="VAR">div</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <value name="CONTENT">
                                                  <block type="text">
                                                    <field name="TEXT">発射！</field>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="js_appendChild">
                                                    <value name="PARENT">
                                                      <block type="variables_get">
                                                        <field name="VAR">launch</field>
                                                      </block>
                                                    </value>
                                                    <value name="CHILD">
                                                      <block type="variables_get">
                                                        <field name="VAR">div</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </next>
                                              </block>
                                            </statement>
                                          </block>
                                        </next>
                                      </block>
                                    </statement>
                                  </block>
                                </next>
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
    </value>
  </block>
</xml>
`;
//js_addEventlistenerのinput_dummy
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