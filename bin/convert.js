// 将markdown转换为html
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import u from 'unist-builder';
import all from 'mdast-util-to-hast/lib/all';

function collapse(value) {
    return String(value).replace(/\s+/g, ' ');
}

const id = [];
const handlers = {
    heading(h, node) {
        let section = '';
        if (node.children.length > 1) {
            section = node.children[0].value.trim();
            id.push(section);
            section = section.split('-').pop();
            node.children.splice(0, 1);
        }

        let url = node.children[0].url;
        let props = {};
        if (url) {
            props.id = url.replace('#', '').trim();
        }
        if (section) {
            props['data-section'] = section;
        }
        return h(node, 'h' + node.depth, props, all(h, node));
    },
    code(h, node) {
        let value = node.value || '';
        let lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
        let props = {};

        if (lang) {
            lang = lang[0];
            props.className = ['language-' + lang, 'hljs'];
        }

        if (lang === 'vue') {
            return h(node.position, 'section', { className: 'section-code' }, [
                h(node, 'div', { id: id.shift(), className: 'source' }),
                h(node, 'pre', { style: 'height: 0;' }, [h(node, 'code', props, [u('text', value)])]),
                h(node, 'div', { className: 'toggle' }, [h(node, 'i', { className: 'iconfont se-icon-arrow-down' })]),
            ]);
        }
        return h(node.position, 'pre', [h(node, 'code', props, [u('text', value)])]);
    },
    inlineCode(h, node) {
        return h(node, 'code', { className: 'inline-code' }, [u('text', collapse(node.value))]);
    },
    strong(h, node) {
        return h(node, 'strong', { className: 'strong-text' }, all(h, node));
    },
    html(h, node) {
        if (node.value === '<br/>') {
            return h.augment(node, u('text', '\n'));
        }
        return h.dangerous ? h.augment(node, u('raw', node.value)) : null;
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
