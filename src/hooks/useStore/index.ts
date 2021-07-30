import { useStore as originUseStore, Store } from 'vuex';
import { State } from '@/store';
import { Getters, Dispatch, Commit } from '@/store/helper';

interface IuseStore extends Store<State> {
    state: State;
    getters: Getters;
    dispatch: Dispatch,
    commit: Commit
}

const useStore = (): IuseStore => {
    return originUseStore<State>();
};
export { useStore };
export default useStore;
