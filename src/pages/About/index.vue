<template>
    <div>
        about页面2 - {{ String(state.common.loading) }}
        <Button type="primary">
            测试按钮
        </Button>
        <div
            class="test"
            @click="clickTest"
        >
            测试
        </div>
        <Counter />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import useStore from 'hooks/useStore';
export default defineComponent({
    name: 'About',
    components: {
        Button,
    },
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
