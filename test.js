const remark = require('remark');
const html = require('remark-html');
const code = require('./build/code');
const fs = require('fs-extra');
const path = require('path');

let doc = fs.readFileSync(path.resolve('docs', 'hello-world.md'), { encoding: 'utf-8' });

var tree = remark().use(html).use(code).process(doc);
console.log(tree);

// // .use(rehype)
// // .use(html)
// // .process('# a', (err, file) => {
// //     console.log(file);
// // });
