import { RouteType } from './constant';
import message from '../../docs/services/message.md';

export default [
    {
        title: 'Message 消息对话框',
        type: RouteType.Service,
        doc: message,
        name: 'message',
        section: ['basic', 'title', 'width', 'align', 'event', 'callback', 'button'],
    },
];
