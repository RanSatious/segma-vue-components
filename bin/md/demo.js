const path = require('path');
const fs = require('fs-extra');
const lodash = require('lodash');

module.exports = (component, category, name) => {
    const demoDir = path.resolve('src', 'views', category, name);
    fs.ensureDirSync(demoDir);
    const files = fs.readdirSync(demoDir);

    const codes = [];
    files
        .filter(d => d.startsWith('Demo'))
        .forEach(file => {
            let content = fs.readFileSync(path.resolve(demoDir, file), { encoding: 'utf-8' });
            content = content.replace(/\r\n/g, '\n');

            let firstLine = content.substring(0, content.indexOf('\n'));
            let matches = firstLine.match(/^\<\!--(.*)--\>$/);

            let title = file.replace('Demo', '').replace('.vue', '');
            let id = `${name}-${lodash.kebabCase(title)}`;
            if (matches) {
                content = content.substring(content.indexOf('\n') + 1);
                title = matches[1].trim();
            }
            codes.push(`## ${id} [${title}](#${title})`);

            codes.push(['```vue', content, '```'].join('\n'));
        });
    return codes.join('\n\n');
};
