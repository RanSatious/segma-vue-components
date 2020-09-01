<template>
    <transition name="fade">
        <div v-if="show"
             class="se-title"
             :class="effect"
             :style="style"
             @click.stop
             @mousedown.stop
             @dragstart.stop
             @mousemove.stop="onOver"
             @mouseleave="onLeave">
            {{text}}
            <div class="caret"
                 :class="position"></div>
        </div>
    </transition>
</template>
<script>
import Placer from './placer';

export default {
    // 文字提示
    name: 'TitleDirective',
    data() {
        return {
            top: 0,
            left: 0,
            text: '',
            // always/overflow
            mode: 'always',
            show: false,
            timer: {
                show: null,
                hide: null,
            },
            // mouse/top/top-start/top-end/right/right-start/right-end/bottom/bottom-start/bottom-end/left/left-start/left-end
            position: 'top-start',
            gap: 10,
            mouse: {
                x: 0,
                y: 0,
            },
            // dark/light
            effect: 'dark',
            inside: false,
        };
    },
    computed: {
        style() {
            return {
                top: `${this.top}px`,
                left: `${this.left}px`,
            };
        },
        placer() {
            return new Placer(this.gap);
        },
    },
    watch: {
        text(val) {
            this.check();
        },
        gap(val) {
            this.placer.gap = val;
        },
        mouse: {
            deep: true,
            handler(val) {
                this.check();
            },
        },
    },
    mounted() {
        this.check();
    },
    methods: {
        check() {
            this.$nextTick(() => {
                let container = this.$container;
                let isOverflow = container.scrollWidth > container.offsetWidth || container.scrollHeight > container.offsetHeight;
                this.show = this.text && (this.mode === 'always' || isOverflow);

                this.$nextTick(() => {
                    if (this.show) {
                        let self = this.$el;
                        let rect = this.$container.getBoundingClientRect();

                        if (this.position === 'mouse') {
                            this.top = this.mouse.y + this.gap;
                            this.left = this.mouse.x + this.gap;
                        } else {
                            let { top, left } = this.placer[this.position](rect, self);
                            this.top = top;
                            this.left = left;
                        }
                    }
                });
            });
        },
        onOver() {
            clearTimeout(this.timer.hide);
            this.inside = true;
        },
        onLeave() {
            /**
             * @ignore
             */
            this.$emit('leave');
            this.inside = false;
        },
    },
};
</script>
<style lang="less"
       scoped>
.se-title {
    position: fixed;
    z-index: 10000;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    white-space: nowrap;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    box-shadow: 0 4px 12px rgba(82, 92, 108, 0.16);
    cursor: text;
    user-select: text;

    .caret-style(@color : rgba(0, 0, 0, 0.75)) {
        .caret[class*='top'] {
            border-top-color: @color;
        }

        .caret[class*='right'] {
            border-right-color: @color;
        }

        .caret[class*='bottom'] {
            border-bottom-color: @color;
        }

        .caret[class*='left'] {
            border-left-color: @color;
        }
    }

    &.light {
        color: rgba(93, 100, 112, 1);
        background: rgba(255, 255, 255, 1);
        .caret-style(rgba(255, 255, 255, 1));
    }

    .caret {
        position: absolute;
        border: 5px solid transparent;
        width: 0;
        height: 0;

        &.mouse {
            display: none;
        }

        &.top {
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
        }

        &.top-start {
            bottom: -10px;
            left: 10px;
        }

        &.top-end {
            right: 10px;
            bottom: -10px;
        }

        &.right {
            top: 50%;
            left: -10px;
            margin-top: -5px;
        }

        &.right-start {
            top: 10px;
            left: -10px;
        }

        &.right-end {
            bottom: 10px;
            left: -10px;
        }

        &.bottom {
            top: -10px;
            left: 50%;
            margin-left: -5px;
        }

        &.bottom-start {
            top: -10px;
            left: 10px;
        }

        &.bottom-end {
            top: -10px;
            right: 10px;
        }

        &.left {
            top: 50%;
            right: -10px;
            margin-top: -5px;
        }

        &.left-start {
            top: 10px;
            right: -10px;
        }

        &.left-end {
            right: -10px;
            bottom: 10px;
        }
    }

    .caret-style();
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
