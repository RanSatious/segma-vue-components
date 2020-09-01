// 将解析好的组件信息转换成markdown文档
const name = require('./name');
const demo = require('./demo');
const prop = require('./prop');
const event = require('./event');
const slot = require('./slot');
const computed = require('./computed');
const mixin = require('./mixin');
const data = require('./data');

function render(component, title) {
    return [name, demo, prop, mixin, data, computed, event, slot]
        .map(d => d(component, title))
        .filter(d => d)
        .join('\n\n');
}

module.exports = {
    render,
};
