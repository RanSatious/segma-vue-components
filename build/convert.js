// 将markdown转换为html
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import u from 'unist-builder';
import all from 'mdast-util-to-hast/lib/all';

const id = [];
const handlers = {
    heading(h, node) {
        if (node.children.length > 1) {
            id.push(node.children[0].value.trim());
            node.children.splice(0, 1);
        }
        return h(node, 'h' + node.depth, {}, all(h, node));
    },
    code(h, node) {
        let value = node.value || '';
        let lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
        let props = {};

        if (lang) {
            props.className = ['language-' + lang, 'hljs'];
        }

        return h(node.position, 'section', { className: 'section-code' }, [
            h(node, 'div', { id: id.shift(), className: 'source' }),
            h(node, 'pre', { style: 'height: 0;' }, [h(node, 'code', props, [u('text', value)])]),
            h(node, 'div', { className: 'toggle' }, [h(node, 'i', { className: 'iconfont se-icon-arrow-down' })]),
        ]);
    },
};

async function convert(content) {
    let result = await unified()
        .use(markdown)
        .use(remark2rehype, {
            handlers,
        })
        .use(stringify)
        .process(content);
    return result.contents;
}

export default convert;
