import '@segma/segma-ui';
import { Button, ButtonGroup } from 'element-ui';

export default {
    install(vue) {
        vue.use(Button);
        vue.use(ButtonGroup);
    },
};
