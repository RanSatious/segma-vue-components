// 解析vue文件，得到组件的name，props，events, slots 等信息。
const fs = require('fs');
const path = require('path');
const os = require('os');
const compiler = require('vue-template-compiler');
const { parse: vueParse } = require('@vue/component-compiler-utils');
const { parse: babelParse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const parse5 = require('parse5');
const lodash = require('lodash');
const getComments = require('./comment');
const parseName = require('./name');
const parseProp = require('./prop');
const parseEvent = require('./event');
const parseComputed = require('./computed');
const parseSync = require('./sync');
const parseMixin = require('./mixin');
const parseData = require('./data');
const parseMethod = require('./method');

function parseSourceFile(filePath, options) {
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

function parseDefaultExport(rawContent) {
    const script = babelParse(rawContent, {
        sourceType: 'module',
    });

    let declaration;
    let comments;
    traverse(script, {
        ExportDefaultDeclaration(path) {
            declaration = path.node.declaration;
            comments = path.node.leadingComments;
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
                    if (item.leadingComments) {
                        comments = item.leadingComments;
                    }
                }
            },
        });
    }

    if (!declaration.properties) {
        throw new Error('invalid source code without a default export');
    }

    return { script, declaration, comments };
}

function parseComponent(rawContent, { category }) {
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

    let { script, declaration } = parseDefaultExport(rawContent);

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

    // events
    result = parseEvent(script, rawContent);
    if (result) {
        component.events.push(...result);
    }

    // sync
    parseSync(component);

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

    return component;
}

function parseDirective(rawContent) {
    const directive = {
        name: '',
        description: '',
    };

    let { declaration } = parseDefaultExport(rawContent);

    // name
    let result = parseName(
        declaration.properties.find(d => d.key.name === 'name'),
        rawContent
    );
    if (result) {
        directive.name = result.name;
        directive.description = result.description;
    }

    return directive;
}

function parseService(rawContent, { path: filePath }) {
    const service = {
        name: '',
        description: '',
        methods: [],
        fields: [],
    };

    let { declaration, comments } = parseDefaultExport(rawContent);

    let comment = getComments(comments, rawContent);
    let tag = comment.tags.find(d => d.tag === 'name');
    if (tag) {
        service.name = tag.name;
    } else {
        const { camelCase, upperFirst } = lodash;
        const splitter = os.platform() === 'win32' ? '\\' : '/';
        service.name = upperFirst(camelCase(filePath.split(splitter).slice(-2)[0]));
    }
    service.description = comment.description;

    // fields

    // methods
    result = parseMethod(declaration.properties, rawContent);
    if (result) {
        service.methods.push(...result.methods);
        service.fields.push(...result.fields);
    }

    return service;
}

function parse(path, options) {
    const { category } = options;
    const { template, script } = parseSourceFile(path);
    let result;

    switch (category) {
        case 'components':
        case 'mixins':
            result = parseComponent(script, {
                path,
                ...options,
            });

            if (template) {
                const slots = parseTemplate(template);
                result.slots = slots;
            }
            return result;
        case 'directives':
            return parseDirective(script);
        case 'services':
            return parseService(script, {
                path,
                ...options,
            });
    }
}

module.exports = {
    parse,
};
