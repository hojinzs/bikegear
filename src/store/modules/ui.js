const ui = {
    namespaced: true,
    state: {
        show_menu: false,
    },
    mutations: {
        show_menu(state, _bool) {
            state.show_menu = _bool
        },
    }
};

export default ui;