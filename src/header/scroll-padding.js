export default {
    name: 'vue-scroll-padding',
    props: {},
    data() {
        return {
            hasPadding: true,
            content: '',
            height: '0px',
            scrollWrap: '',
            scrollPadding: '',
            scrollEelement: 'wrap',
        };
    },
    watch: {
        content(val) {
            console.log(val);
            if (val) {
                console.log(val.getBoundingClientRect());
                this.height = val.getBoundingClientRect().height + 'px';
            }
        },
    },
    methods: {
        update(content) {
            this.content = content;
        },
        down() {
            this.scrollEelement = 'padding';
            console.log('down');
        },
        up() {
            this.scrollEelement = 'wrap';
            console.log('up');
        },
        scroll(e) {
            if (this.scrollEelement === 'padding') {
                const top = e.target.scrollTop;
                this.scrollPadding.scrollTop = top;
            }
            e.stopPropagation();
            e.preventDefault();
        },
        parentScroll(e) {
            if (this.scrollEelement === 'wrap') {
                const top = e.target.scrollTop;
                this.scrollWrap.scrollTop = top;
            }
            e.stopPropagation();
            e.preventDefault();
        },
    },
    mounted() {
        this.scrollWrap = this.$refs['scroll-wrap'];
        this.scrollPadding = this.$refs['scroll-padding'];
    },
};
