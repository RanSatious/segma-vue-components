const lodash = require('lodash');
const renderTable = require('./table');

module.exports = ({ computed = [] }) => {
    return renderTable(
        computed,
        '计算属性(Computed)',
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
            return lodash.isNil(result) ? '-' : result.toString();
        }
    );
};
