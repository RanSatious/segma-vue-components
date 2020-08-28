// 解析vue文件，得到组件的name，props，events, slots 信息。
const fs = require('fs');
const compiler = require('vue-template-compiler');
const { parse: vueParse } = require('@vue/component-compiler-utils');
const { parse: babelParse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const parse5 = require('parse5');

function parseSfcFile(path, options) {
    const source = fs.readFileSync(path, { encoding: 'utf-8' });
    return vueParse({
        source,
        compiler,
        needMap: false,
    });
}

function parseTemplate(source) {
    const slots = [];
    const html = parse5.parse(source.replace(/\n\s*/g, ''));

    const loop = node => {
        if (node.tagName === 'slot') {
            let slot = { name: '', description: '' };
            let nameAttr = node.attrs.find(d => ['name', ':name'].includes(d.name));
            let title = nameAttr ? nameAttr.value : 'default';
            slot.name = title.replace(/["']/g, '');
            if (nameAttr && nameAttr.name.includes(':')) {
                try {
                    // todo: is this dangerous?
                    eval(title);
                    slot.dynamic = false;
                } catch (e) {
                    slot.dynamic = true;
                    slot.name = `[${slot.name}]`;
                }
            } else {
                slot.dynamic = false;
            }

            // 说明
            let index = node.parentNode.childNodes.indexOf(node);
            while (index > 0) {
                let prev = node.parentNode.childNodes[index - 1];
                if (prev.nodeName !== '#comment') {
                    break;
                }
                if (slot.description) {
                    slot.description = '\n' + slot.description;
                }
                slot.description = prev.data.trim() + slot.description;
                index--;
            }

            const getScopeProp = name => {
                name = name.replace(':', '');
                if (['class', 'name', 'style'].includes(name)) {
                    return '';
                }
                if (['@', 'v-'].some(d => name.startsWith(d))) {
                    return '';
                }
                return `\`${name}\``;
            };
            let attrs = node.attrs.map(d => getScopeProp(d.name)).filter(d => d);
            slot.scope = attrs.join(', ');

            slots.push(slot);
        }
        if (node.childNodes) {
            node.childNodes.forEach(loop);
        }
        if (node.content && node.content.childNodes) {
            node.content.childNodes.forEach(loop);
        }
    };
    loop(html);
    return slots;
}

function parseComponent(rawContent) {
    const script = babelParse(rawContent, {
        sourceType: 'module',
    });

    const component = {
        name: '',
        description: '',
        props: [],
        events: [],
    };

    let componentNode;
    traverse(script, {
        ExportDefaultDeclaration(path) {
            componentNode = path.node;
        },
        CallExpression(path) {
            const { arguments: args, callee } = path.node;
            if (callee.object && callee.object.type === 'ThisExpression' && callee.property.name === '$emit') {
                let name = args[0].value;
                let event = component.events.find(d => d.name === name);
                if (!event) {
                    event = { name: args[0].value };
                    component.events.push(event);
                }
                if (!event.description) {
                    event.description = (path.parent.leadingComments || []).map(d => d.value).join('\n');
                }
            }
        },
    });

    if (!componentNode) {
        throw new Error('invalid vue component without a default export');
    }

    // name
    const nameNode = componentNode.declaration.properties.find(d => d.key.name === 'name');
    if (nameNode) {
        component.name = eval(`(${rawContent.substring(nameNode.value.start, nameNode.value.end)})`);
        component.description = nameNode.leadingComments && nameNode.leadingComments.map(d => d.value.trim()).join('\n');
    }

    // props
    const propNode = componentNode.declaration.properties.find(d => d.key.name === 'props');
    if (propNode) {
        propNode.value.properties.forEach(node => {
            // todo: 展开运算符
            if (node.type === 'ObjectProperty') {
                let prop = { name: node.key.name, type: null, default: '', description: '' };
                // todo: 从其他文件引入的属性
                if (node.value.type === 'ObjectExpression') {
                    let info = eval(`(${rawContent.substring(node.value.start, node.value.end)})`);
                    prop.type = Array.isArray(info.type) ? info.type.map(d => d.name).join() : info.type.name;
                    prop.default = typeof info.default === 'function' ? info.default() : info.default;
                }
                if (node.leadingComments) {
                    prop.description = node.leadingComments.map(d => d.value.trim()).join('\n');
                }
                component.props.push(prop);
            }
        });
    }

    return component;
}

function parse(path, options) {
    const { template, script } = parseSfcFile(path);

    // slot信息
    const slots = parseTemplate(template.content);

    // 组件信息
    const component = parseComponent(script.content);

    component.slots = slots;

    return component;
}

module.exports = {
    parse,
};
