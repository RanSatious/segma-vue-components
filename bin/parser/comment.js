const parser = require('comment-parser');

module.exports = (comments, raw) => {
    if (!comments) {
        return {
            description: '',
            tags: [],
        };
    }

    for (const item of comments) {
        let result = parser(raw.substring(item.start, item.end))[0];
        if (result) {
            return result;
        }
    }

    return {
        description: comments.map(d => d.value.trim()).join('\n'),
        tags: [],
    };
};
