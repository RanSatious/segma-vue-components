// 解析vue文件，得到组件的name，props，events, slots 等信息。
const fs = require('fs');
const path = require('path');
const compiler = require('vue-template-compiler');
const { parse: vueParse } = require('@vue/component-compiler-utils');
const { parse: babelParse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const parse5 = require('parse5');
const parseName = require('./name');
const parseProp = require('./prop');
const parseEvent = require('./event');
const parseComputed = require('./computed');
const parseSync = require('./sync');
const parseMixin = require('./mixin');
const parseData = require('./data');

function parseSfcFile(filePath, options) {
    const ext = path.extname(filePath);
    if (['.js'].includes(ext)) {
        let script = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return {
            script,
        };
    }

    const source = fs.readFileSync(filePath, { encoding: 'utf-8' });
    let { template, script, styles } = vueParse({
        source,
        compiler,
        needMap: false,
    });
    return {
        template: template.content,
        script: script.content,
        styles,
    };
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

function parseComponent(rawContent, { category }) {
    const script = babelParse(rawContent, {
        sourceType: 'module',
    });

    const component = {
        name: '',
        description: '',
        data: [],
        props: [],
        events: [],
        computed: [],
        mixins: [],
        slots: [],
        methods: [],
    };

    let declaration;
    traverse(script, {
        ExportDefaultDeclaration(path) {
            declaration = path.node.declaration;
        },
    });

    if (!declaration.properties) {
        traverse(script, {
            VariableDeclaration(path) {
                if (declaration.properties) {
                    return;
                }
                let item = path.node.declarations.find(d => d.id.name === declaration.name);
                if (item) {
                    declaration.properties = item.init.properties;
                }
            },
        });
    }

    if (!declaration.properties) {
        throw new Error('invalid vue component without a default export');
    }

    // name
    let result = parseName(
        declaration.properties.find(d => d.key.name === 'name'),
        rawContent
    );
    if (result) {
        component.name = result.name;
        component.description = result.description;
    }

    // props
    result = parseProp(
        declaration.properties.find(d => d.key.name === 'props'),
        rawContent
    );
    if (result) {
        component.props.push(...result);
    }

    if (category === 'mixins') {
        // data
        result = parseData(
            declaration.properties.find(d => d.key.name === 'data'),
            rawContent
        );
        if (result) {
            component.data.push(...result);
        }

        // computed
        result = parseComputed(
            declaration.properties.find(d => d.key.name === 'computed'),
            rawContent
        );
        if (result) {
            component.computed.push(...result);
        }

        // mixin
        result = parseMixin(
            declaration.properties.find(d => d.key.name === 'mixins'),
            rawContent
        );
        if (result) {
            component.mixins.push(...result);
        }

        // methods
    }

    // events
    result = parseEvent(script, rawContent);
    if (result) {
        component.events.push(...result);
    }

    // sync
    parseSync(component);

    return component;
}

function parse(path, options) {
    const { template, script } = parseSfcFile(path);

    // 组件信息
    const component = parseComponent(script, {
        path,
        ...options,
    });

    if (template) {
        // slot信息
        const slots = parseTemplate(template);
        component.slots = slots;
    }

    return component;
}

module.exports = {
    parse,
};
