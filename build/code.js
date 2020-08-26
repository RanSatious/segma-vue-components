var visit = require('unist-util-visit');

let id = [];
function transformer(ast) {
    visit(ast, 'heading', headVisitor);
    visit(ast, 'code', codeVisitor);

    function headVisitor(node) {
        if (node.children.length > 1) {
            id.push(node.children[0].value.trim());
            node.children.splice(0, 1);
        }
    }

    function codeVisitor(node) {
        var data = node.data || (node.data = {});
        var props = data.hProperties || (data.hProperties = {});

        if (id.length > 0) {
            let value = id.shift();
            data.id = value;
            props.id = value;
        }
    }
}

module.exports = function code() {
    return transformer;
};
