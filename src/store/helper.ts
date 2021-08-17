import { CommitOptions, DispatchOptions, Commit as OriginCommit } from 'vuex';
import { modules } from './index';

// 获取getters对象
type GetGetter<T> = T extends {getters:infer G} ? G : unknown;
type GetGetters<Modules> = {
    [K in keyof Modules]: GetGetter<Modules[K]>
}
type ModuleGettersObj = GetGetters<typeof modules>;

// 获取actions对象
type GetAction<T> = T extends {actions:infer G} ? G : unknown;
type GetActions<Modules> = {
    [K in keyof Modules]: GetAction<Modules[K]>
}
type ModuleActionsObj = GetActions<typeof modules>;

// 获取mutations
type GetMutation<T> = T extends {mutations:infer G} ? G : unknown;
type GetMutations<Modules> = {
    [K in keyof Modules]: GetMutation<Modules[K]>
}
type ModuleMutationsObj = GetMutations<typeof modules>;

type AddPrefix<Prefix, Key> = `${Prefix & string}/${Key & string}`
type GetSpliceKey<Module, K> = AddPrefix<K, keyof Module>;
type GetSpliceKeys<Modules> = {
    [K in keyof Modules]: GetSpliceKey<Modules[K], K>
}[keyof Modules]

// 提取对象字符串
type testObj = GetSpliceKeys<ModuleGettersObj>; // "common/isLogin" | "common/outLogin"
type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GetSpliceObj<T> = {
  [K in GetSpliceKeys<T>]:K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown
}

type MoudlesGetters = GetSpliceObj<ModuleGettersObj>;
type MoudlesActions = GetSpliceObj<ModuleActionsObj>;
type MoudlesMutations = GetSpliceObj<ModuleMutationsObj>;

type Getters = {
    [K in keyof MoudlesGetters]: ReturnType<MoudlesGetters[K]>
}

type Actions = keyof MoudlesActions;
type Mutations = keyof MoudlesMutations;

// 提取函数参数
type GetParameters<T extends (...args: any) => any> = T extends (A: infer PA, B: infer PB) => any ? PB : never;
type MutationsModuleFun<T> = {
    [K in keyof T]: GetParameters<T[K]>
}
// 获取Commit
type MutationsModules = MutationsModuleFun<MoudlesMutations>
interface Commit {
    <K extends keyof ActionsModules>(obj: { type: K, payload: ActionsModules[K] }, options?: CommitOptions): unknown;
    <K extends keyof MutationsModules>(type: K, payload?: MutationsModules[K], options?: CommitOptions): unknown;
}

// 获取Dispatch
type ActionsModules = MutationsModuleFun<MoudlesActions>
interface Dispatch {
    <K extends keyof ActionsModules>(obj: { type: K, payload: ActionsModules[K] }, options?: DispatchOptions): Promise<any>;
    <K extends keyof ActionsModules>(type: K, payload?: ActionsModules[K], options?: DispatchOptions): Promise<any>;
}

interface ActionContextCommit<Module> {
    <K extends keyof Module>(obj: { type: K, payload: GetParameters<Module[K]> }, options?: CommitOptions): unknown;
    <K extends keyof Module>(type: K, payload?: GetParameters<Module[K]>, options?: CommitOptions): unknown;
}

interface ActionContext<S, K, R = unknown> {
    dispatch: Dispatch;
    commit: ActionContextCommit<K>;
    state: S;
    getters: Getters;
    rootState: R;
    rootGetters: any;
}

export {
    Getters,
    Actions,
    ActionContextCommit,
    Mutations,
    Commit,
    Dispatch,
    ActionContext,
};

// interface GetDispatch<T> {
//     <K extends keyof T>(action: K): Promise<unknown>;
//   }
// type Dispatch = GetDispatch<MoudlesActions>;

// interface Commit extends originCommit {
//     (type: Mutations, payload?: any, options?: CommitOptions): void,
// }
// interface Dispatch extends originDispatch {
//     (type: Actions, payload?: any, options?: DispatchOptions): Promise<any>;
// }