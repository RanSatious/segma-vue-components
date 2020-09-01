import component from './component';
import directive from './directive';
import highlight from './highlight';
import event from './event';
import ui from './ui';

export default {
    install(Vue) {
        [component, directive, highlight, event, ui].forEach(item => {
            Vue.use(item);
        });
    },
};
