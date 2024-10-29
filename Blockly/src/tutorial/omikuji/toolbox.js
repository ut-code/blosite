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
      name: "HTML Elements",
      categorystyle: "htmlelement_category",
      contents: [
        {
          kind: "block",
          type: "html_html-head-body",
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
          type: "html_button",
        },
        {
          kind: "block",
          type: "html_script",
        },
      ],
    },
    {
      kind: "CATEGORY",
      name: "HTML Attributes",
      categorystyle: "htmlattribute_category",
      contents: [
        {
          kind: "block",
          type: "html_id",
        },
        {
          kind: "block",
          type: "html_class",
        },
        {
          kind: "block",
          type: "html_style",
        },
        {
          kind: "block",
          type: "html_autocapitalize",
        },
        {
          kind: "block",
          type: "html_checked",
        },
        {
          kind: "block",
          type: "html_cols",
        },
        {
          kind: "block",
          type: "html_rows",
        },
        {
          kind: "block",
          type: "html_contenteditable",
        },
        {
          kind: "block",
          type: "html_disabled",
        },
        {
          kind: "block",
          type: "html_hidden",
        },
        {
          kind: "block",
          type: "html_href",
        },
        {
          kind: "block",
          type: "html_label",
        },
        {
          kind: "block",
          type: "html_max",
        },
        {
          kind: "block",
          type: "html_min",
        },
        {
          kind: "block",
          type: "html_maxlength",
        },
        {
          kind: "block",
          type: "html_minlength",
        },
        {
          kind: "block",
          type: "html_pattern",
        },
        {
          kind: "block",
          type: "html_placeholder",
        },
        {
          kind: "block",
          type: "html_readonly",
        },
        {
          kind: "block",
          type: "html_selected",
        },
        {
          kind: "block",
          type: "html_size",
        },
        {
          kind: "block",
          type: "html_spellcheck",
        },
        {
          kind: "block",
          type: "html_src",
        },
        {
          kind: "block",
          type: "html_start",
        },
        {
          kind: "block",
          type: "html_step",
        },
        {
          kind: "block",
          type: "html_tabindex",
        },
        {
          kind: "block",
          type: "html_title_attr",
        },
        {
          kind: "block",
          type: "html_type",
        },
        {
          kind: "block",
          type: "html_value",
        },
        {
          kind: "block",
          type: "html_width",
        },
        {
          kind: "block",
          type: "html_wrap",
        },
      ]
    },
    {
      kind: "CATEGORY",
      name: "CSS",
      categorystyle: "css_category",
      contents: [
        {
          kind: "block",
          type: "css_color",
        },
        {
          kind: "block",
          type: "css_font-size",
        },
        {
          kind: "block",
          type: "css_font-weight",
        },
        {
          kind: "block",
          type: "css_line-height",
        },
        {
          kind: "block",
          type: "css_background-color",
        },
        {
          kind: "block",
          type: "css_margin",
        },
        {
          kind: "block",
          type: "css_padding",
        },
        {
          kind: "block",
          type: "css_border",
        },
        {
          kind: "block",
          type: "css_border-radius",
        },
        {
          kind: "block",
          type: "css_display",
        },
        {
          kind: "block",
          type: "css_position",
        },
        {
          kind: "block",
          type: "css_top",
        },
        {
          kind: "block",
          type: "css_left",
        },
        {
          kind: "block",
          type: "css_right",
        },
        {
          kind: "block",
          type: "css_bottom",
        },
        {
          kind: "block",
          type: "css_table-layout",
        },
      ]
    },
    {
      kind: "category",
      name: "JavaScript",
      categorystyle: "javascript_category",
      contents: [
        {
          kind: "block",
          type: "js_getElementById",
        },
        {
          kind: "block",
          type: "js_getElementByTagName",
        },
        {
          kind: "block",
          type: "js_addEventListener",
        },
        {
          kind: "block",
          type: "js_textContent",
        },
        {
          kind: "block",
          type: "text",
        },
      ],
    },
    {
      kind: "category",
      name: "Logic",
      categorystyle: "logic_category",
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
        {
          kind: "block",
          type: "logic_compare",
        },
      ],
    },
    {
      kind: "category",
      name: "Math",
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
          type: "math_random_float",
        },
      ],
    },
    {
      kind: "category",
      name: "Variables",
      categorystyle: "variable_category",
      custom: "VARIABLE",
    },
  ],
};
