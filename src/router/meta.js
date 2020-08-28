import button from '../../docs/button.md';
import helloWorld from '../../docs/hello-world.md';
import progressBar from '../../docs/progress-bar.md';
import icon from '../../docs/icon.md';
import iconFont from '../../docs/icon-font.md';
import tableAction from '../../docs/table-action.md';

export default [
    {
        title: 'Hello World',
        doc: helloWorld,
        name: 'hello-world',
        section: ['basic', 'test'],
    },
    {
        title: 'Icon 图标',
        doc: icon,
        name: 'icon',
        section: ['basic', 'list'],
    },
    {
        title: 'IconFont SVG图标',
        doc: iconFont,
        name: 'icon-font',
        section: ['basic'],
    },
    {
        title: 'Button 按钮',
        doc: button,
        name: 'button',
        section: ['basic', 'disable', 'group', 'icon', 'loading', 'text'],
    },
    {
        title: 'TableAction 表格操作列',
        doc: tableAction,
        name: 'table-action',
        section: ['basic', 'icon', 'show', 'disable', 'slot'],
    },
    {
        title: 'ProgressBar 进度条',
        doc: progressBar,
        name: 'progress-bar',
        section: ['basic'],
    },
];
