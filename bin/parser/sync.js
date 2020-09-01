module.exports = component => {
    let syncEvents = component.events.filter(d => d.name.startsWith('update:'));
    syncEvents.forEach(event => {
        let propName = event.name.replace('update:', '');
        let prop = component.props.find(d => d.name === propName);
        if (prop) {
            prop.sync = true;
        }
    });
    component.events = component.events.filter(d => !d.name.startsWith('update:'));
};
