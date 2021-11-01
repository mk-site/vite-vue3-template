<template>
    <div>
        about页面2 - {{ String(state.common.loading) }}
        <div
            class="test"
            @click="clickTest"
        >
            测试
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import useStore from 'hooks/useStore';
import './index.less';
export default defineComponent({
    name: 'About',
    setup() {
        const { state, dispatch, getters, commit } = useStore();
        const clickTest = () => {
            console.log('点击测试', state.common.obj);
            // dispatch('common/get_data', false);
            // getters['common/outLogin'];
            // dispatch('common/get_data', false);
            // commit('common/set_obj', { a: 1, b: ''});
        };
        return {
            state,
            clickTest
        };
    }
});
</script>
<style lang="less">
</style>
