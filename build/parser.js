// 解析vue文件，得到组件的name，props，events, slots 信息。
const fs = require('fs');
const compiler = require('vue-template-compiler');
const { parse: vueParse, compileTemplate } = require('@vue/component-compiler-utils');
const { parse: babelParse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function parseSfcFile(path, options) {
    const source = fs.readFileSync(path, { encoding: 'utf-8' });
    return vueParse({
        source,
        compiler,
        needMap: false,
    });
}

function parseTemplate(source) {
    const result = compileTemplate({
        source,
        compiler,
    });

    const slots = [];

    const loop = node => {
        if (node.tag === 'slot') {
            let title = node.attrsList.find(d => d.name === 'title');
            // todo: 作用域插槽
            slots.push({
                name: (node.slotName || 'default').replace(/"/g, ''),
                description: title ? title.value : '',
            });
        }
        if (node.children) {
            node.children.forEach(loop);
        }
    };
    loop(result.ast);

    // 遍历 template.ast.children 可以得到 slot
    // 条件：tag = slot
    // 插槽名称： slotName，默认插槽的slotName为undefined

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
