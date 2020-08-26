const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { parse } = require('./parser');
const { render } = require('./md');

const docDir = path.join('docs');
const componentDir = path.resolve('src', 'components');

async function build() {
    await fs.ensureDir(docDir);
    // await fs.emptyDir(docDir);

    const components = await fs.readdir(componentDir);

    for (const component of components) {
        let stat = await fs.stat(path.join(componentDir, component));
        if (!stat.isDirectory()) {
            continue;
        }

        let list = await fs.readdir(path.join(componentDir, component));

        let content = '';
        for (const name of list.filter(d => d.endsWith('.vue'))) {
            content += render(parse(path.join(componentDir, component, name)), component);
            content += '\n';

            console.log(`generating document of ${path.join(component, name)}`);
        }

        await fs.writeFile(path.join(docDir, `${component}.md`), content.replace(/\n/g, os.EOL));
    }
}

build();
