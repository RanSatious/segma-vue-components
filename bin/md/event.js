const renderTable = require('./table');
const lodash = require('lodash');

module.exports = ({ events }) => {
    return renderTable(
        events,
        '事件(Events)',
        [
            { name: 'name', text: '名称' },
            { name: 'description', text: '说明' },
            { name: 'param', text: '参数' },
        ],
        (prop, key) => {
            let result = prop[key.name];
            if (key.name === 'param') {
                result = prop.param.map(d => `\`${d.name}: ${d.type}\` ${d.description}`).join('\n');
            }
            return lodash.isNil(result) ? '-' : result.toString();
        }
    );
};
