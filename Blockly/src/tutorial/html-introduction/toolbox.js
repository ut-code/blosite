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
        {
          kind: "block",
          type: "logic_operation",
        },
        {
          kind: "block",
          type: "logic_negate",
        },
        {
          kind: "block",
          type: "logic_boolean",
        },
        {
          kind: "block",
          type: "logic_null",
        },
        {
          kind: "block",
          type: "logic_ternary",
        },
      ],
    },
    {
      kind: "category",
      name: "Loops",
      categorystyle: "loop_category",
      contents: [
        {
          kind: "block",
          type: "controls_repeat_ext",
          inputs: {
            TIMES: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "controls_whileUntil",
        },
        {
          kind: "block",
          type: "controls_for",
          inputs: {
            FROM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 10,
                },
              },
            },
            BY: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "controls_forEach",
        },
        {
          kind: "block",
          type: "controls_flow_statements",
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
        {
          kind: "block",
          type: "math_single",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 9,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_trig",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 45,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_constant",
        },
        {
          kind: "block",
          type: "math_number_property",
          inputs: {
            NUMBER_TO_CHECK: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_round",
          fields: {
            OP: "ROUND",
          },
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 3.1,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_on_list",
          fields: {
            OP: "SUM",
          },
        },
        {
          kind: "block",
          type: "math_modulo",
          inputs: {
            DIVIDEND: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 64,
                },
              },
            },
            DIVISOR: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_constrain",
          inputs: {
            VALUE: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 50,
                },
              },
            },
            LOW: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
            HIGH: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_random_int",
          inputs: {
            FROM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "math_random_float",
        },
        {
          kind: "block",
          type: "math_atan2",
          inputs: {
            X: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 1,
                },
              },
            },
            Y: {
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
      name: "Text",
      categorystyle: "text_category",
      contents: [
        {
          kind: "block",
          type: "text",
        },
        {
          kind: "block",
          type: "text_join",
        },
        {
          kind: "block",
          type: "text_append",
          inputs: {
            TEXT: {
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
          type: "text_length",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_isEmpty",
          inputs: {
            VALUE: {
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
          type: "text_indexOf",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
              },
            },
            FIND: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_charAt",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_getSubstring",
          inputs: {
            STRING: {
              block: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_changeCase",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_trim",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_count",
          inputs: {
            SUB: {
              shadow: {
                type: "text",
              },
            },
            TEXT: {
              shadow: {
                type: "text",
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_replace",
          inputs: {
            FROM: {
              shadow: {
                type: "text",
              },
            },
            TO: {
              shadow: {
                type: "text",
              },
            },
            TEXT: {
              shadow: {
                type: "text",
              },
            },
          },
        },
        {
          kind: "block",
          type: "text_reverse",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
              },
            },
          },
        },
        // {
        //   kind: 'block',
        //   type: 'add_text',
        //   inputs: {
        //     TEXT: {
        //       shadow: {
        //         type: 'text',
        //         fields: {
        //           TEXT: 'abc',
        //         },
        //       },
        //     },
        //   },
        // },
      ],
    },
    {
      kind: "category",
      name: "Lists",
      categorystyle: "list_category",
      contents: [
        {
          kind: "block",
          type: "lists_create_with",
        },
        {
          kind: "block",
          type: "lists_create_with",
        },
        {
          kind: "block",
          type: "lists_repeat",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 5,
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "lists_length",
        },
        {
          kind: "block",
          type: "lists_isEmpty",
        },
        {
          kind: "block",
          type: "lists_indexOf",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "block",
          type: "lists_getIndex",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "block",
          type: "lists_setIndex",
          inputs: {
            LIST: {
              block: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "block",
          type: "lists_getSublist",
          inputs: {
            LIST: {
              block: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "block",
          type: "lists_split",
          inputs: {
            DELIM: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ",",
                },
              },
            },
          },
        },
        {
          kind: "block",
          type: "lists_sort",
        },
        {
          kind: "block",
          type: "lists_reverse",
        },
      ],
    },
    {
      kind: "sep", // 間を開ける
    },
    {
      kind: "category",
      name: "Variables",
      categorystyle: "variable_category",
      custom: "VARIABLE",
    },
    {
      kind: "category",
      name: "Functions",
      categorystyle: "procedure_category",
      custom: "PROCEDURE",
    },
    {
      kind: "sep", // 間を開ける
    },
    {
      kind: "category",
      name: "template",
      contents: [
        // ul, li
        {
          kind: "block",
          type: "html_ul",
          inputs: {
            CONTENT: {
              block: {
                type: "html_li",
                next: {
                  block: {
                    type: "html_li",
                    next: {
                      block: {
                        type: "html_li",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        // ol, li
        {
          kind: "block",
          type: "html_ol",
          inputs: {
            CONTENT: {
              block: {
                type: "html_li",
                next: {
                  block: {
                    type: "html_li",
                    next: {
                      block: {
                        type: "html_li",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        // table
        {
          "kind": "block",
          "type": "html_table",
          "inputs": {
            "CONTENT": {
              "block": {
                "type": "html_tr",
                "inputs": {
                  "CONTENT": {
                    "block": {
                      "type": "html_td",
                      "next": {
                        "block": {
                          "type": "html_td"
                        }
                      }
                    }
                  }
                },
                "next": {
                  "block": {
                    "type": "html_tr",
                    "inputs": {
                      "CONTENT": {
                        "block": {
                          "type": "html_td",
                          "next": {
                            "block": {
                              "type": "html_td"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        // table with caption, thead, tbody, tfoot
        {
          "kind": "block",
          "type": "html_table",
          "inputs": {
            "CONTENT": {
              "block": {
                "type": "html_caption",
                "fields": {
                  "CONTENT": "Table Caption"
                },
                "next": {
                  "block": {
                    "type": "html_thead",
                    "inputs": {
                      "CONTENT": {
                        "block": {
                          "type": "html_tr",
                          "inputs": {
                            "CONTENT": {
                              "block": {
                                "type": "html_th",
                                "next": {
                                  "block": {
                                    "type": "html_th"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "next": {
                      "block": {
                        "type": "html_tbody",
                        "inputs": {
                          "CONTENT": {
                            "block": {
                              "type": "html_tr",
                              "inputs": {
                                "CONTENT": {
                                  "block": {
                                    "type": "html_td",
                                    "next": {
                                      "block": {
                                        "type": "html_td"
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "next": {
                              "block": {
                                "type": "html_tr",
                                "inputs": {
                                  "CONTENT": {
                                    "block": {
                                      "type": "html_td",
                                      "next": {
                                        "block": {
                                          "type": "html_td"
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "next": {
                          "block": {
                            "type": "html_tfoot",
                            "inputs": {
                              "CONTENT": {
                                "block": {
                                  "type": "html_tr",
                                  "inputs": {
                                    "CONTENT": {
                                      "block": {
                                        "type": "html_td",
                                        "next": {
                                          "block": {
                                            "type": "html_td"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        // select
        {
          "kind": "block",
          "type": "html_select",
          "inputs": {
            "CONTENT": {
              "block": {
                "type": "html_optgroup",
                "inputs": {
                  "CONTENT": {
                    "block": {
                      "type": "html_option",
                      "fields": {
                        "CONTENT": "Apple",
                      },
                      "next": {
                        "block": {
                          "type": "html_option",
                          "fields": {
                            "CONTENT": "Banana",
                          },
                          "next": {
                            "block": {
                              "type": "html_option",
                              "fields": {
                                "CONTENT": "Cherry",
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "next": {
                  "block": {
                    "type": "html_optgroup",
                    "inputs": {
                      "CONTENT": {
                        "block": {
                          "type": "html_option",
                          "fields": {
                            "CONTENT": "Carrot",
                          },
                          "next": {
                            "block": {
                              "type": "html_option",
                              "fields": {
                                "CONTENT": "Broccoli",
                              },
                              "next": {
                                "block": {
                                  "type": "html_option",
                                  "fields": {
                                    "CONTENT": "Spinach",
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        // form
        {
          "kind": "block",
          "type": "html_form",
          "inputs": {
            "CONTENT": {
              "block": {
                "type": "html_input",
                "inputs": {
                  "ATTRIBUTE": {
                    "block": {
                      "type": "html_type",
                      "fields": {
                        "FIELD": "date"
                      }
                    }
                  },
                },
                "next": {
                  "block": {
                    "type": "html_input",
                    "inputs": {
                      "ATTRIBUTE": {
                        "block": {
                          "type": "html_type",
                          "fields": {
                            "FIELD": "checkbox"
                          }
                        }
                      },
                    },
                    "next": {
                      "block": {
                        "type": "html_button",
                        "inputs": {
                          "CONTENT": {
                            "block": {
                              "type": "html_text",
                              "fields": {
                                "TEXT": "Submit"
                              }
                            }
                          }
                        }
                      },
                    }
                  }
                }
              }
            }
          }
        },
        // footer
        {
          "kind": "block",
          "type": "html_footer",
          "inputs": {
            "CONTENT": {
              "block": {
                "type": "html_p",
                "inputs": {
                  "CONTENT": {
                    "block": {
                      "type": "html_text" ,
                      "fields": {
                        "TEXT": "© 2024 Example.com"
                      }
                    }
                  }
                },
                "next": {
                  "block": {
                    "type": "html_a",
                    "inputs": {
                      "CONTENT": {
                        "block": {
                          "type": "html_text" ,
                          "fields": {
                            "TEXT": "Privacy Policy"
                          }
                        }
                      },
                      "ATTRIBUTE": {
                        "block": {
                          "type": "html_href" ,
                          "fields": {
                            "FIELD": "https://example.com"
                          }
                        }
                      }
                    },
                  }
                }
              }
            }
          }
        },
        {
          "kind": "block",
          "type": "html_blockquote",
          "inputs": {
            "CONTENT": {
              "block": {
                "type": "html_text",
                "fields": {
                  "TEXT": "This is a blockquote."
                },
                "next": {
                  "block": {
                    "type": "html_cite",
                    "fields": {
                      "CONTENT": "Source: Example"
                    }
                  }
                }
              }
            },
          },
        },
      ],
    }
  ],
};
