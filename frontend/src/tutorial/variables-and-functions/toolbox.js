/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

// ツールボックスの構成
export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "CATEGORY",
      name: "HTML要素",
      categorystyle: "htmlelement_category",
      contents: [
        {
          kind: "block",
          type: "html_html-head-body",
        },
        {
          kind: "block",
          type: "html_comment",
        },
        {
          kind: "block",
          type: "html_text",
        },
        {
          kind: "block",
          type: "html_title",
        },
        {
          kind: "block",
          type: "html_div",
        },

        {
          kind: "block",
          type: "html_script",
        },
      ],
    },
    {
      kind: "CATEGORY",
      name: "HTML属性",
      categorystyle: "htmlattribute_category",
      contents: [
        {
          kind: "block",
          type: "html_id",
        },
      ],
    },
    {
      kind: "category",
      name: "制御",
      categorystyle: "javascript_category",
      contents: [
        {
          kind: "block",
          type: "js_getElementById",
        },
        {
          kind: "block",
          type: "js_textContent",
        },
        {
          kind: "block",
          type: "js_setter",
        },
      ],
    },
    {
      kind: "category",
      name: "数式",
      categorystyle: "math_category",
      contents: [
        {
          kind: "block",
          type: "math_number",
          fields: {
            NUM: 123,
          },
        },
        {
          kind: "block",
          type: "math_arithmetic",
          inputs: {
            A: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
            B: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: "category",
      name: "変数",
      categorystyle: "variable_category",
      custom: "VARIABLE",
    },
    {
      kind: "category",
      name: "関数",
      categorystyle: "procedure_category",
      custom: "PROCEDURE",
    },
  ],
};
