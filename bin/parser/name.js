module.exports = (nameNode, raw) => {
    if (!nameNode) {
        return;
    }

    let name = eval(`(${raw.substring(nameNode.value.start, nameNode.value.end)})`);
    let description = nameNode.leadingComments && nameNode.leadingComments.map(d => d.value.trim()).join('\n');

    return { name, description };
};
