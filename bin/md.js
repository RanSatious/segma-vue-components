// 将解析好的组件信息转换成markdown文档
const path = require('path');
const fs = require('fs-extra');
const lodash = require('lodash');

const fieldMap = {
    name: '参数',
    type: '类型',
    default: '默认值',
    description: '说明',
};

function renderName({ name, description }) {
    description = (description || '').split('\n');
    return [`# ${name}`, ...description].filter(d => d).join('\n\n');
}

function renderTable(data, title, columns, callback = (data, key) => data[key]) {
    if (!data.length) {
        return;
    }

    title = `## [${title}](#${title})\n`;

    // header
    let header = columns.reduce((total, current, index) => {
        if (index === 0) {
            total += '|';
        }
        total += ` ${fieldMap[current] || current} |`;
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
    return renderTable(props, '属性', ['name', 'description', 'type', 'default'], (prop, key) => {
        let result = prop[key];
        if (key === 'default' && result && typeof result === 'object') {
            result = JSON.stringify(result);
        }
        return result;
    });
}

function renderEvents({ events }) {
    return renderTable(events, '事件', ['name', 'description']);
}

function renderSlots({ slots }) {
    return renderTable(slots, '插槽', ['name', 'description'], (data, key) => {
        let result = data[key];
        if (key === 'name' && data.dynamic) {
            result += ' `动态`';
        }
        return result;
    });
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
