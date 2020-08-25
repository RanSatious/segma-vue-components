// 将解析好的组件信息转换成markdown文档
function renderName({ name, description }) {
    description = (description || '').split('\n');
    return [`# ${name}`, ...description].filter(d => d).join('\n\n');
}

function renderTable(data, title, columns) {
    if (!data.length) {
        return;
    }

    title = `## ${title}\n`;

    // header
    let header = columns.reduce((total, current, index) => {
        if (index === 0) {
            total += '|';
        }
        total += ` ${current} |`;
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

            let content = (prop[current] || '-').replace(/\n/g, '<br/>');
            total += ` ${content} |`;
            return total;
        }, '');
    });

    return [title, header, divider, ...rows].join('\n');
}

function renderProps({ props }) {
    return renderTable(props, '属性', ['name', 'type', 'default', 'description']);
}

function renderEvents({ events }) {
    return renderTable(events, '事件', ['name', 'description']);
}

function renderSlots({ slots }) {
    return renderTable(slots, '插槽', ['name', 'description']);
}

function render(component) {
    return [renderName, renderProps, renderEvents, renderSlots]
        .map(d => d(component))
        .filter(d => d)
        .join('\n\n');
}

module.exports = {
    render,
};
