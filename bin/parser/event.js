const traverse = require('@babel/traverse').default;
const getComments = require('./comment');

module.exports = (script, raw) => {
    let result = [];
    traverse(script, {
        CallExpression(path) {
            const { arguments: args, callee } = path.node;
            if (callee.object && callee.object.type === 'ThisExpression' && callee.property.name === '$emit') {
                let name = args[0].value;
                let event = result.find(d => d.name === name);

                let comment = getComments(path.parent.leadingComments, raw);
                let ignore = comment.tags.find(d => d.tag === 'ignore');
                if (ignore) {
                    return;
                }

                if (!event) {
                    event = { name: args[0].value, description: '', param: [] };
                    result.push(event);
                }
                if (!event.description) {
                    if (comment) {
                        event.description = comment.description;
                        event.param = comment.tags.filter(d => d.tag === 'param');
                    }
                }
            }
        },
    });

    return result;
};
