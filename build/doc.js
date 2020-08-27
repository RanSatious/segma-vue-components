const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { parse } = require('./parser');
const { render } = require('./md');
const external = require('../src/components/external');

const docDir = path.join('docs');
const componentDir = path.resolve('src', 'components');

async function build() {
    await fs.ensureDir(docDir);
    // await fs.emptyDir(docDir);

    const components = await (await fs.readdir(componentDir)).map(key => ({ key }));
    components.push(...external);

    for (const item of components) {
        const { key, external, ...component } = item;

        let content = '';
        if (external) {
            content += render(component, key);
            console.log(`[external] generating document of ${component.name}`);
        } else {
            let stat = await fs.stat(path.join(componentDir, key));
            if (!stat.isDirectory()) {
                continue;
            }

            let list = await fs.readdir(path.join(componentDir, key));

            for (const name of list.filter(d => d.endsWith('.vue'))) {
                content += render(parse(path.join(componentDir, key, name)), key);
                content += '\n';

                console.log(`generating document of ${path.join(key, name)}`);
            }
        }

        await fs.writeFile(path.join(docDir, `${key}.md`), content.replace(/\n/g, os.EOL));
    }
}

build();
