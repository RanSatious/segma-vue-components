const getComments = require('./comment');

module.exports = (node, raw) => {
    if (!node) {
        return;
    }
    let result = node.body.body.find(d => d.type === 'ReturnStatement');
    if (!result) {
        return;
    }

    return result.argument.properties.map(d => {
        let value = eval(`(${raw.substring(d.value.start, d.value.end)})`);
        return {
            name: d.key.name,
            description: getComments(d.leadingComments, raw).description,
            type: typeof value,
            default: value,
        };
    });
};
