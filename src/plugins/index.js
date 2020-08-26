import component from './component';
import highlight from './highlight';
import event from './event';
import ui from './ui';

export default {
    install(Vue) {
        [component, highlight, event, ui].forEach(item => {
            Vue.use(item);
        });
    },
};
