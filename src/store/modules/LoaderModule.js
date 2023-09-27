export default {
    namespaced: true,
    state: {
        ShowLoader: 0
    },
    mutations: {
        increment(state) {
            state.ShowLoader++;
        },
        decrement(state) {
            state.ShowLoader--;
        }
    }
}