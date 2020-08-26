function toggle(e) {
    let target = e.path.find(d => d.className === 'toggle');
    if (!target) {
        return;
    }
    let icon = target.children[0];
    let pre = target.previousElementSibling;
    if (!pre) {
        return;
    }

    let height = parseInt(pre.style.height, 10);
    pre.style.height = height ? '0px' : `${pre.scrollHeight}px`;
    icon.className = height ? 'iconfont se-icon-arrow-down' : 'iconfont se-icon-arrow-up';
}

export default {
    install() {
        window.addEventListener('click', toggle);
    },
};
