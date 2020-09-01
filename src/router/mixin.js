import { RouteType } from './constant';
import dialog from '../../docs/mixins/dialog.md';
import dialogForm from '../../docs/mixins/dialog-form.md';

export default [
    {
        title: 'dialog 对话框',
        type: RouteType.Mixin,
        doc: dialog,
        name: 'dialog',
        section: [],
    },
    {
        title: 'dialogForm 带表单的对话框',
        type: RouteType.Mixin,
        doc: dialogForm,
        name: 'dialog-form',
        section: [],
    },
    {
        title: 'resize 调整大小',
        type: RouteType.Mixin,
        doc: 'todo',
        name: 'resize',
        section: [],
    },
    {
        title: 'drag 拖拽位置',
        type: RouteType.Mixin,
        doc: 'todo',
        name: 'drag',
        section: [],
    },
];
