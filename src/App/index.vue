<template>
    <div id="nav">
        <router-link to="/home">
            Home
        </router-link> |
        <router-link to="/about">
            About
        </router-link>
    </div>
    <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'App',
    setup() {
        return {
            text: '123'
        };
    }
});
</script>
<style lang="less">
</style>
