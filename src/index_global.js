import app from './scroll-padding/scroll-padding.vue';

const install = (Vue, conf) => {
    Vue.component(app.name, app);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

//module.exports = {
//    install
//};
export default {
    install,
};
