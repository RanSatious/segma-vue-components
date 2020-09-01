const getComments = require('./comment');

module.exports = (node, raw) => {
    if (!node) {
        return;
    }

    let result = [];
    node.value.properties.forEach(item => {
        // todo: 展开运算符
        if (item.type === 'ObjectProperty') {
            let prop = { name: item.key.name, type: null, default: '', description: '' };
            let comment = getComments(item.leadingComments, raw);

            prop.description = comment.description;
            let tag = comment.tags.find(d => d.tag === 'type');
            if (tag) {
                prop.type = tag.type;
            }
            tag = comment.tags.find(d => d.tag === 'default');
            if (tag) {
                prop.default = tag.name;
            }

            result.push(prop);
        }
    });
    return result;
};
