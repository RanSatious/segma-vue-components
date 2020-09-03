import ProgressBar from './Index.vue';

ProgressBar.install = Vue => {
    Vue.component(ProgressBar.name, ProgressBar);
};

export default ProgressBar;
