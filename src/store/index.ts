import { createStore, createLogger } from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import common, { commonState } from './modules/common';

const debug = process.env.NODE_ENV !== 'production';

export interface State {
    common: commonState;
}

export const modules = {
    common,
};

export default createStore<State>({
    modules,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});

// 以下支持数据持久化
/*
const options = {
    key: 'mk-site-vuex',
    storage: window.sessionStorage
};

export default createStore<State>({
    modules,
    strict: debug,
    plugins: debug ? [createLogger(), createPersistedState(options)] : [createPersistedState(options)]
});
*/
