module.exports = ({ name, description }) => {
    description = (description || '').split('\n');
    return [`# ${name}`, ...description].filter(d => d).join('\n\n');
};
