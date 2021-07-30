<template>
    <div>
        Home页面 {{ text }}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Home',
    setup() {
        return {
            text: 'template'
        };
    }
});
</script>
<style lang="less">
</style>
