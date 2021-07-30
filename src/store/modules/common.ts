import { ActionContext } from '@/store/helper';

const createState = () => {
    const store = {
        loading: true,
        obj: {
            a: 1,
            b: '2'
        },
        token: '123'
    };
    return store;
};
export type commonState = ReturnType<typeof createState>;

const getters = {
    isLogin: (state: commonState): string => {
        return `${state.loading}`;
    },
    outLogin: (state: commonState): string => {
        return `${state.loading}`;
    },
};

const mutations = {
    set_loading: (state: commonState, payload: boolean): void => {
        console.log('数据', payload);
        state.loading = payload;
    },
    set_obj: (state: commonState, payload: { a: number, b: string }): void => {
        console.log('数据', payload);
        state.obj = payload;
    },
};

const actions = {
    get_data: ({ commit, state }: ActionContext<commonState>, payload: boolean): void => {
        console.log('action执行成功', payload);
        // setTimeout(function () {
        //     const payload = false;
        //     commit('set_loading', payload);
        // }, 2000);
    },
};

export default {
    namespaced: true,
    state: createState(),
    getters,
    mutations,
    actions,
};
