import * as directives from '../directives';

export default {
    install(Vue) {
        Object.values(directives).forEach(item => {
            Vue.directive(item.name, item.directive);
        });
    },
};
