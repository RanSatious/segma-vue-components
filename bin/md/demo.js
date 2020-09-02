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

            let lines = content.split('\n');
            let comments = [];
            while (lines.length > 0) {
                let line = lines[0];
                let matches = line.match(/^\<\!--(.*)--\>$/);
                if (!matches) {
                    break;
                }
                comments.push(matches[1].trim());
                lines.shift();
            }
            content = lines.join('\n');

            let title = file.replace('Demo', '').replace('.vue', '');
            let id = `${name}-${lodash.kebabCase(title)}`;
            if (comments.length > 0) {
                title = comments.shift();
            }
            codes.push(`## ${id} [${title}](#${title})`);

            if (comments.length > 0) {
                codes.push(comments.map(d => `> ${d}`).join('\n'));
            }

            codes.push(['```vue', content, '```'].join('\n'));
        });
    return codes.join('\n\n');
};
