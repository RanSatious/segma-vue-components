import button from '../../docs/components/button.md';
import helloWorld from '../../docs/components/hello-world.md';
import progressBar from '../../docs/components/progress-bar.md';
import icon from '../../docs/components/icon.md';
import iconFont from '../../docs/components/icon-font.md';
import tableAction from '../../docs/components/table-action.md';
import { RouteType } from './constant';

export default [
    {
        title: 'Hello World',
        type: RouteType.Component,
        doc: helloWorld,
        name: 'hello-world',
        section: ['basic', 'test'],
    },
    {
        title: 'Icon 图标',
        type: RouteType.Component,
        doc: icon,
        name: 'icon',
        section: ['basic', 'list'],
    },
    {
        title: 'IconFont SVG图标',
        type: RouteType.Component,
        doc: iconFont,
        name: 'icon-font',
        section: ['basic'],
    },
    {
        title: 'Button 按钮',
        type: RouteType.Component,
        doc: button,
        name: 'button',
        section: ['basic', 'disable', 'group', 'icon', 'loading', 'text'],
    },
    {
        title: 'TableAction 表格操作列',
        type: RouteType.Component,
        doc: tableAction,
        name: 'table-action',
        section: ['basic', 'icon', 'show', 'disable', 'slot'],
    },
    {
        title: 'ProgressBar 进度条',
        type: RouteType.Component,
        doc: progressBar,
        name: 'progress-bar',
        section: ['basic'],
    },
];
