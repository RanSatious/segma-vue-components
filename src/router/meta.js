import button from '../../docs/button.md';
import helloWorld from '../../docs/hello-world.md';
import progressBar from '../../docs/progress-bar.md';
import icon from '../../docs/icon.md';

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
        title: 'Button 按钮',
        doc: button,
        name: 'button',
        section: ['basic', 'disable', 'group', 'icon', 'loading', 'text'],
    },
];
