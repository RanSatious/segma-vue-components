const getComments = require('./comment');

module.exports = (nodes, raw) => {
    if (!nodes) {
        return;
    }

    nodes = nodes.filter(d => d.type === 'ObjectMethod');
    if (!nodes.length) {
        return;
    }

    let result = {
        methods: [],
        fields: [],
    };

    nodes.forEach(node => {
        let comment = getComments(node.leadingComments, raw);
        let returns = comment.tags.find(d => d.tag === 'returns');
        let method = {
            name: node.key.name,
            description: comment.description,
            param: comment.tags.filter(d => d.tag === 'param'),
            result: returns ? returns.type : '',
        };
        result.methods.push(method);
    });

    return result;
};
