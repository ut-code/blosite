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
          type: "html_hn",
        },
        {
          kind: "block",
          type: "html_p",
        },
        {
          kind: "block",
          type: "html_a",
        },
        {
          kind: "block",
          type: "html_br",
        },
        {
          kind: "block",
          type: "html_div",
        },
        {
          kind: "block",
          type: "html_blockquote",
        },
        {
          kind: "block",
          type: "html_strong",
        },
        {
          kind: "block",
          type: "html_i",
        },
        {
          kind: "block",
          type: "html_b",
        },
        {
          kind: "block",
          type: "html_u",
        },
        {
          kind: "block",
          type: "html_del",
        },
        {
          kind: "block",
          type: "html_ins",
        },
        {
          kind: "block",
          type: "html_small",
        },
        {
          kind: "block",
          type: "html_sub",
        },
        {
          kind: "block",
          type: "html_sup",
        },
        {
          kind: "block",
          type: "html_ul",
        },
        {
          kind: "block",
          type: "html_em",
        },
        {
          kind: "block",
          type: "html_code",
        },
        {
          kind: "block",
          type: "html_kbd",
        },
        {
          kind: "block",
          type: "html_var",
        },
        {
          kind: 'block',
          type: 'html_ol'
        },
        {
          kind: 'block',
          type: 'html_li'
        },
        {
          kind: "block",
          type: "html_cite",
        },
        {
          kind: "block",
          type: "html_table",
        },
        {
          kind: "block",
          type: "html_tr",
        },
        {
          kind: "block",
          type: "html_td",
        },
        {
          kind: "block",
          type: "html_th",
        },
        {
          kind: "block",
          type: "html_thead",
        },
        {
          kind: "block",
          type: "html_tbody",
        },
        {
          kind: "block",
          type: "html_tfoot",
        },
        {
          kind: "block",
          type: "html_caption",
        },
        {
          kind: "block",
          type: "html_header",
        },
        {
          kind: "block",
          type: "html_footer",
        },
        {
          kind: "block",
          type: "html_hgroup",
        },
        {
          kind: "block",
          type: "html_button",
        },
        {
          kind: "block",
          type: "html_form",
        },
        {
          kind: "block",
          type: "html_input",
        },
        {
          kind: "block",
          type: "html_textarea",
        },
        {
          kind: "block",
          type: "html_select",
        },
        {
          kind: "block",
          type: "html_optgroup",
        },
        {
          kind: "block",
          type: "html_option",
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
      name: "見た目",
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
          type: "css_text-align"
        },
        {
          kind: "block",
          type: "css_list-style-position"
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
          type: "css_border-collapse",
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
      kind: "sep", // 間を開ける
    },
    {
      kind: "search",
      name: "検索",
      contents: [],
    },
    // {
    //   kind: "category",
    //   name: "テンプレート",
    //   contents: [
    //     // ul, li
    //     {
    //       kind: "block",
    //       inputs: {
    //         CONTENT: {
    //           block: {
    //             type: "html_li",
    //             next: {
    //               block: {
    //                 type: "html_li",
    //                 next: {
    //                   block: {
    //                     type: "html_li",
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   ],
    // },
  ],
};
