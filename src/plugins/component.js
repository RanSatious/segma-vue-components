import * as components from '../components';

export default {
    install(Vue) {
        Object.values(components).forEach(component => {
            Vue.use(component);
        });
    },
};
