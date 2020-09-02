const lodash = require('lodash');
const renderTable = require('./table');

module.exports = ({ props = [] }) => {
    return renderTable(
        props,
        '属性(Props)',
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
                if (prop.sync) {
                    result += ' **sync**';
                }
            }
            return lodash.isNil(result) ? '-' : result.toString();
        }
    );
};
