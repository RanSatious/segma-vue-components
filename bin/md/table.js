module.exports = (data, title, columns, callback = (data, key) => data[key.name]) => {
    if (!data.length) {
        return;
    }

    title = `## [${title}](#${title})\n`;

    // header
    let header = columns.reduce((total, current, index) => {
        if (index === 0) {
            total += '|';
        }
        total += ` ${current.text} |`;
        return total;
    }, '');

    // divider
    let divider = new Array(columns.length + 1).fill('|').join('---');

    // rows
    let rows = data.map(prop => {
        return columns.reduce((total, current, index) => {
            if (index === 0) {
                total += '|';
            }

            let content = (callback(prop, current) || '-').toString().replace(/\n/g, '<br/>');
            total += ` ${content} |`;
            return total;
        }, '');
    });

    return [title, header, divider, ...rows].join('\n');
};
