const renderTable = require('./table');

module.exports = ({ slots }) => {
    return renderTable(
        slots,
        '插槽(Slots)',
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
};
