const state = () => ({
    filter: {
        start: null,
        end: null,
        ambassador: null,
        parent: null,
        email: null,
    }
});

const mutations = {
    setFilter(state, filter) {
        state.filter.start = filter.start;
        state.filter.end = filter.end;
        state.filter.ambassador = filter.ambassador;
        state.filter.parent = filter.parent;
        state.filter.email = filter.email;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
