const lodash = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const getComments = require('./comment');

function getMixins() {
    let mixins = fs.readdirSync(path.resolve('src', 'mixins'));
    return mixins.filter(name => {
        let stat = fs.statSync(path.resolve('src', 'mixins', name));
        return stat.isDirectory();
    });
}

module.exports = (node, raw) => {
    if (!node) {
        return;
    }

    if (node.value.type === 'ArrayExpression') {
        // todo: 展开运算符
        let mixins = getMixins();
        return node.value.elements.map(d => {
            let name = lodash.kebabCase(d.name).replace('-mixin', '');
            let result = getComments(d.leadingComments, raw);
            let tag = result.tags.find(d => mixins.includes(d.type));
            if (tag) {
                return {
                    name,
                    linked: true,
                };
            }

            if (mixins.includes(name)) {
                return {
                    name,
                    linked: true,
                };
            }

            return {
                name,
                linked: false,
            };
        });
    }

    return [];
};
