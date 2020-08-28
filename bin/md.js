// 将解析好的组件信息转换成markdown文档
const path = require('path');
const fs = require('fs-extra');
const lodash = require('lodash');

function renderName({ name, description }) {
    description = (description || '').split('\n');
    return [`# ${name}`, ...description].filter(d => d).join('\n\n');
}

function renderTable(data, title, columns, callback = (data, key) => data[key.name]) {
    if (!data.length) {
        return;
    }

    title = `## [${title}](#${title})\n`;

    // header
    let header = columns.reduce((total, current, index) => {
        if (index === 0) {
            total += '|';
        }
        total += ` ${current.text} |`;
        return total;
    }, '');

    // divider
    let divider = new Array(columns.length + 1).fill('|').join('---');

    // rows
    let rows = data.map(prop => {
        return columns.reduce((total, current, index) => {
            if (index === 0) {
                total += '|';
            }

            let content = (callback(prop, current) || '-').toString().replace(/\n/g, '<br/>');
            total += ` ${content} |`;
            return total;
        }, '');
    });

    return [title, header, divider, ...rows].join('\n');
}

function renderProps({ props }) {
    return renderTable(
        props,
        '属性',
        [
            { name: 'name', text: '参数' },
            { name: 'description', text: '说明' },
            { name: 'type', text: '类型' },
            { name: 'default', text: '默认值' },
        ],
        (prop, key) => {
            let result = prop[key.name];
            if (key.name === 'default' && result && typeof result === 'object') {
                result = JSON.stringify(result);
            }
            if (key.name === 'name') {
                result = lodash.kebabCase(result);
            }
            return lodash.isNil(result) ? '-' : result.toString();
        }
    );
}

function renderEvents({ events }) {
    return renderTable(events, '事件', [
        { name: 'name', text: '名称' },
        { name: 'description', text: '说明' },
    ]);
}

function renderSlots({ slots }) {
    return renderTable(
        slots,
        '插槽',
        [
            { name: 'name', text: 'name' },
            { name: 'scope', text: 'scope' },
            { name: 'description', text: '说明' },
        ],
        (data, key) => {
            let result = data[key.name];
            if (key.name === 'name' && data.dynamic) {
                result += ' **动态**';
            }
            return result;
        }
    );
}

function renderDemos(component, name) {
    const demoDir = path.resolve('src', 'views', name);
    fs.ensureDirSync(demoDir);
    const files = fs.readdirSync(demoDir);

    const codes = [];
    files
        .filter(d => d.startsWith('Demo'))
        .forEach(file => {
            let content = fs.readFileSync(path.resolve(demoDir, file), { encoding: 'utf-8' });
            content = content.replace(/\r\n/g, '\n');

            let firstLine = content.substring(0, content.indexOf('\n'));
            let matches = firstLine.match(/^\<\!--(.*)--\>$/);

            let title = file.replace('Demo', '').replace('.vue', '');
            let id = `${name}-${lodash.kebabCase(title)}`;
            if (matches) {
                content = content.substring(content.indexOf('\n') + 1);
                title = matches[1].trim();
            }
            codes.push(`## ${id} [${title}](#${title})`);

            codes.push(['```vue', content, '```'].join('\n'));
        });
    return codes.join('\n\n');
}

function render(component, name) {
    return [renderName, renderDemos, renderProps, renderEvents, renderSlots]
        .map(d => d(component, name))
        .filter(d => d)
        .join('\n\n');
}

module.exports = {
    render,
};
