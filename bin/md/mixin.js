module.exports = ({ mixins = [] }) => {
    if (!mixins.length) {
        return '';
    }

    let title = `## 混入(Mixins)`;
    let content = mixins
        .map(prop => {
            if (prop.linked) {
                return `- [${prop.name}](/mixin/${prop.name})`;
            }
            return `- ${prop.name}`;
        })
        .join('\n');
    return [title, content].join('\n\n');
};
