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
      ],
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
          type: "js_getElementByClassName",
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
          type: "js_createElement",
        },
        {
          kind: "block",
          type: "js_alert",
          inputs: {
            CONTENT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "",
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "js_setter",
        },
        {
          kind: "block",
          type: "text",
        },
      ],
    },
    {
      kind: "sep", // 間を開ける
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
    {
      kind: "sep", // 間を開ける
    },
    //   {
    //     kind: "category",
    //     name: "テンプレート",
    //     contents: [
    //       // ul, li
    //       {
    //         kind: "block",
    //         type: "html_ul",
    //         inputs: {
    //           CONTENT: {
    //             block: {
    //               type: "html_li",
    //               next: {
    //                 block: {
    //                   type: "html_li",
    //                   next: {
    //                     block: {
    //                       type: "html_li",
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       // ol, li
    //       {
    //         kind: "block",
    //         type: "html_ol",
    //         inputs: {
    //           CONTENT: {
    //             block: {
    //               type: "html_li",
    //               next: {
    //                 block: {
    //                   type: "html_li",
    //                   next: {
    //                     block: {
    //                       type: "html_li",
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       // table
    //       {
    //         "kind": "block",
    //         "type": "html_table",
    //         "inputs": {
    //           "CONTENT": {
    //             "block": {
    //               "type": "html_tr",
    //               "inputs": {
    //                 "CONTENT": {
    //                   "block": {
    //                     "type": "html_td",
    //                     "next": {
    //                       "block": {
    //                         "type": "html_td"
    //                       }
    //                     }
    //                   }
    //                 }
    //               },
    //               "next": {
    //                 "block": {
    //                   "type": "html_tr",
    //                   "inputs": {
    //                     "CONTENT": {
    //                       "block": {
    //                         "type": "html_td",
    //                         "next": {
    //                           "block": {
    //                             "type": "html_td"
    //                           }
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       // table with caption, thead, tbody, tfoot
    //       {
    //         "kind": "block",
    //         "type": "html_table",
    //         "inputs": {
    //           "CONTENT": {
    //             "block": {
    //               "type": "html_caption",
    //               "fields": {
    //                 "CONTENT": "Table Caption"
    //               },
    //               "next": {
    //                 "block": {
    //                   "type": "html_thead",
    //                   "inputs": {
    //                     "CONTENT": {
    //                       "block": {
    //                         "type": "html_tr",
    //                         "inputs": {
    //                           "CONTENT": {
    //                             "block": {
    //                               "type": "html_th",
    //                               "next": {
    //                                 "block": {
    //                                   "type": "html_th"
    //                                 }
    //                               }
    //                             }
    //                           }
    //                         }
    //                       }
    //                     }
    //                   },
    //                   "next": {
    //                     "block": {
    //                       "type": "html_tbody",
    //                       "inputs": {
    //                         "CONTENT": {
    //                           "block": {
    //                             "type": "html_tr",
    //                             "inputs": {
    //                               "CONTENT": {
    //                                 "block": {
    //                                   "type": "html_td",
    //                                   "next": {
    //                                     "block": {
    //                                       "type": "html_td"
    //                                     }
    //                                   }
    //                                 }
    //                               }
    //                             }
    //                           },
    //                           "next": {
    //                             "block": {
    //                               "type": "html_tr",
    //                               "inputs": {
    //                                 "CONTENT": {
    //                                   "block": {
    //                                     "type": "html_td",
    //                                     "next": {
    //                                       "block": {
    //                                         "type": "html_td"
    //                                       }
    //                                     }
    //                                   }
    //                                 }
    //                               }
    //                             }
    //                           }
    //                         }
    //                       },
    //                       "next": {
    //                         "block": {
    //                           "type": "html_tfoot",
    //                           "inputs": {
    //                             "CONTENT": {
    //                               "block": {
    //                                 "type": "html_tr",
    //                                 "inputs": {
    //                                   "CONTENT": {
    //                                     "block": {
    //                                       "type": "html_td",
    //                                       "next": {
    //                                         "block": {
    //                                           "type": "html_td"
    //                                         }
    //                                       }
    //                                     }
    //                                   }
    //                                 }
    //                               }
    //                             }
    //                           }
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       // select
    //       {
    //         "kind": "block",
    //         "type": "html_select",
    //         "inputs": {
    //           "CONTENT": {
    //             "block": {
    //               "type": "html_optgroup",
    //               "inputs": {
    //                 "CONTENT": {
    //                   "block": {
    //                     "type": "html_option",
    //                     "fields": {
    //                       "CONTENT": "Apple",
    //                     },
    //                     "next": {
    //                       "block": {
    //                         "type": "html_option",
    //                         "fields": {
    //                           "CONTENT": "Banana",
    //                         },
    //                         "next": {
    //                           "block": {
    //                             "type": "html_option",
    //                             "fields": {
    //                               "CONTENT": "Cherry",
    //                             }
    //                           }
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               },
    //               "next": {
    //                 "block": {
    //                   "type": "html_optgroup",
    //                   "inputs": {
    //                     "CONTENT": {
    //                       "block": {
    //                         "type": "html_option",
    //                         "fields": {
    //                           "CONTENT": "Carrot",
    //                         },
    //                         "next": {
    //                           "block": {
    //                             "type": "html_option",
    //                             "fields": {
    //                               "CONTENT": "Broccoli",
    //                             },
    //                             "next": {
    //                               "block": {
    //                                 "type": "html_option",
    //                                 "fields": {
    //                                   "CONTENT": "Spinach",
    //                                 }
    //                               }
    //                             }
    //                           }
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       // form
    //       {
    //         "kind": "block",
    //         "type": "html_form",
    //         "inputs": {
    //           "CONTENT": {
    //             "block": {
    //               "type": "html_input",
    //               "inputs": {
    //                 "ATTRIBUTE": {
    //                   "block": {
    //                     "type": "html_type",
    //                     "fields": {
    //                       "FIELD": "date"
    //                     }
    //                   }
    //                 },
    //               },
    //               "next": {
    //                 "block": {
    //                   "type": "html_input",
    //                   "inputs": {
    //                     "ATTRIBUTE": {
    //                       "block": {
    //                         "type": "html_type",
    //                         "fields": {
    //                           "FIELD": "checkbox"
    //                         }
    //                       }
    //                     },
    //                   },
    //                   "next": {
    //                     "block": {
    //                       "type": "html_button",
    //                       "inputs": {
    //                         "CONTENT": {
    //                           "block": {
    //                             "type": "html_text",
    //                             "fields": {
    //                               "TEXT": "Submit"
    //                             }
    //                           }
    //                         }
    //                       }
    //                     },
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       // footer
    //       {
    //         "kind": "block",
    //         "type": "html_footer",
    //         "inputs": {
    //           "CONTENT": {
    //             "block": {
    //               "type": "html_p",
    //               "inputs": {
    //                 "CONTENT": {
    //                   "block": {
    //                     "type": "html_text" ,
    //                     "fields": {
    //                       "TEXT": "© 2024 Example.com"
    //                     }
    //                   }
    //                 }
    //               },
    //               "next": {
    //                 "block": {
    //                   "type": "html_a",
    //                   "inputs": {
    //                     "CONTENT": {
    //                       "block": {
    //                         "type": "html_text" ,
    //                         "fields": {
    //                           "TEXT": "Privacy Policy"
    //                         }
    //                       }
    //                     },
    //                     "ATTRIBUTE": {
    //                       "block": {
    //                         "type": "html_href" ,
    //                         "fields": {
    //                           "FIELD": "https://example.com"
    //                         }
    //                       }
    //                     }
    //                   },
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       {
    //         "kind": "block",
    //         "type": "html_blockquote",
    //         "inputs": {
    //           "CONTENT": {
    //             "block": {
    //               "type": "html_text",
    //               "fields": {
    //                 "TEXT": "This is a blockquote."
    //               },
    //               "next": {
    //                 "block": {
    //                   "type": "html_cite",
    //                   "fields": {
    //                     "CONTENT": "Source: Example"
    //                   }
    //                 }
    //               }
    //             }
    //           },
    //         },
    //       },
    //     ],
    //   }
  ],
};
