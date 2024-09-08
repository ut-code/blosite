import * as Blockly from 'blockly';

export const htmlBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
    'type': 'html_html-head-body',
    'message0': '<html> %1 <head> %2 %3 </head> %4 <body> %5 %6 </body> %7 </html>',
    'args0': [
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_statement',
            'name': 'HEAD'
        },
        {
            'type': 'input_dummy'
        },
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'BODY'
        },
        {
            'type': 'input_dummy'
        },
    ],
},
{
    'type': 'html_comment',
    'message0': '<!-- %1 --->',
    'args0': [
        {
            'type': 'field_input',
            'name': 'CONTENT',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_title',
    'message0': '<title> %1 %2 </title>',
    'args0': [
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'CONTENT'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_div',
    'message0': '<div> %1 %2 </div>',
    'args0': [
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'CONTENT'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_script',
    'message0': '<script> %1 %2 </script>',
    'args0': [
        {
            'type': 'input_value',
            'name': 'ATTRIBUTE'
        },
        {
            'type': 'input_statement',
            'name': 'CONTENT'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
},
{
    'type': 'html_id',
    'message0': 'id = "%1" %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'FIELD',
        },
        {
            'type': 'input_value',
            'name': 'VALUE'
        }
    ],
    'output': null,
},
{
    'type': 'html_color',
    'message0': 'color = %1 %2',
    'args0': [
        {
            'type': 'field_input',
            'name': 'FIELD',
            'text': '#000000'
        },
        {
            'type': 'input_value',
            'name': 'VALUE'
        }
    ],
    'output': null,
},
{
    'type': 'html_text',
    'message0': '"%1"',
    'args0': [
        {
            'type': 'field_input',
            'name': 'CONTENT',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
}]);
