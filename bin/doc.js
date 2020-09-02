const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { parse } = require('./parser');
const { render } = require('./md');

const categories = ['components', 'directives', 'services', 'mixins'];
const fileMap = {
    components: ['vue'],
    directives: ['index.js'],
    mixins: ['index.js'],
    services: ['index.js'],
};
const docDir = path.join('docs');

async function build() {
    await fs.ensureDir(docDir);

    for (const category of categories) {
        await fs.ensureDir(path.resolve(docDir, category));

        const dir = path.resolve('src', category);
        const items = (await fs.readdir(dir)).map(key => ({ key }));

        if (fs.existsSync(path.resolve('src', category, 'external.js'))) {
            const external = require(`../src/${category}/external`);
            items.push(...external);
        }

        if (items.length > 0) {
            console.log(`generating document of ${category}`);
            console.log(`----------------------------------`);
        }

        for (const item of items) {
            const { key, external, ...component } = item;

            let content = '';
            if (external) {
                content += render(component, category, key);
                console.log(`[external] ${component.name}`);
            } else {
                let stat = await fs.stat(path.join(dir, key));
                if (!stat.isDirectory()) {
                    continue;
                }

                let list = await fs.readdir(path.join(dir, key));

                list = list.filter(d => fileMap[category].some(ext => d.endsWith(ext)));
                if (list.length > 0) {
                    console.log(key);
                }
                for (const name of list) {
                    content += render(
                        parse(path.join(dir, key, name), {
                            category,
                        }),
                        category,
                        key
                    );
                    content += '\n';

                    console.log(`  ${name}`);
                }
            }

            await fs.writeFile(path.join(docDir, category, `${key}.md`), content.replace(/\n/g, os.EOL));
        }

        if (items.length > 0) {
            console.log(`----------------------------------\n`);
        }
    }
}

build();
