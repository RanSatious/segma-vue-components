import '@segma/segma-ui';
import { Button, ButtonGroup, Dialog, Table, TableColumn } from 'element-ui';

export default {
    install(vue) {
        vue.use(Button);
        vue.use(ButtonGroup);
        vue.use(Dialog);
        vue.use(Table);
        vue.use(TableColumn);
    },
};
