import Vue from 'vue';
import Index from './Index.vue';

const Component = Vue.extend(Index);

function Message(options) {
    let { title, message, buttons, className, align, onClose, onOpen, callback = {}, width = 300 } = options;
    const data = Vue.observable({
        title,
        message,
        buttons,
        align,
        className,
        callback,
        width,
    });
    const instance = new Component({
        data,
    });
    instance.$mount();
    instance.$on('open', () => {
        onOpen && onOpen();
    });
    document.body.appendChild(instance.$el);
    instance.visible = true;

    return new Promise((resolve, reject) => {
        instance.$once('close', confirm => {
            onClose && onClose(confirm);
            if (confirm) {
                resolve();
            } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('cancel');
            }
            instance.$destroy();
            instance.$el.remove();
        });
    });
}

function normalizeArgs(args) {
    let [message = '', title = '', options = {}] = args;
    if (message && typeof message === 'object') {
        return message;
    }

    if (title && typeof title === 'object') {
        title.message = message;
        return title;
    }

    if (options && typeof options === 'object') {
        options.message = message;
        options.title = title;
        return options;
    }

    return {
        message,
        title,
    };
}

// 基于 el-dialog 的消息对话框服务
export default {
    /**
     * 警告对话框
     * @param {string} message 消息
     * @param {string} title 标题
     * @param {IMessageOption} options 其他参数
     * @returns {Promise}
     */
    alert(...args) {
        let options = normalizeArgs(args);
        options.title = options.title || '提示';
        if (!options.buttons) {
            options.buttons = [
                {
                    type: 'primary',
                    text: '确定',
                    action: 'confirm',
                },
            ];
        }
        if (!options.align) {
            options.align = 'center';
        }
        return Message(options);
    },
    /**
     * 确认对话框
     * @param {string} message 消息
     * @param {string} title 标题
     * @param {IMessageOption} options 其他参数
     * @returns {Promise}
     */
    confirm(...args) {
        let options = normalizeArgs(args);
        options.title = options.title || '确认';
        if (!options.buttons) {
            options.buttons = [
                {
                    type: 'info',
                    text: '取消',
                    action: 'cancel',
                },
                {
                    type: 'primary',
                    text: '确定',
                    action: 'confirm',
                },
            ];
        }
        if (!options.align) {
            options.align = 'right';
        }
        return Message(options);
    },
};
