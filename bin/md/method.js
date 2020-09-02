const lodash = require('lodash');
const renderTable = require('./table');

module.exports = ({ methods = [] }) => {
    return renderTable(
        methods,
        '方法(Methods)',
        [
            { name: 'name', text: '参数' },
            { name: 'description', text: '说明' },
            { name: 'param', text: '参数' },
            { name: 'result', text: '返回值' },
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
