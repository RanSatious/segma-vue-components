module.exports = (propNode, raw) => {
    if (!propNode) {
        return;
    }

    let result = [];
    propNode.value.properties.forEach(node => {
        // todo: 展开运算符
        if (node.type === 'ObjectProperty') {
            let prop = { name: node.key.name, type: null, default: '', description: '', sync: false };
            // todo: 从其他文件引入的属性
            if (node.value.type === 'ObjectExpression') {
                let info = eval(`(${raw.substring(node.value.start, node.value.end)})`);
                prop.type = Array.isArray(info.type) ? info.type.map(d => d.name).join() : info.type.name;
                prop.default = typeof info.default === 'function' ? info.default() : info.default;
            }
            if (node.leadingComments) {
                prop.description = node.leadingComments.map(d => d.value.trim()).join('\n');
            }
            result.push(prop);
        }
    });
    return result;
};
