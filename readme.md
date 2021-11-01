## vite + vue3 + ts 项目

### 用法

npm run dev

npm run build

### 使用tsx还是template模板方式
    1、请在App/  pages/About pages/Home 自由选择文件，并删除多于文件
    2、router/  引入页面文件 .tsx 或.vue 文件
    3、src/maint.ts 修改引入App/ 文件为.tsx 还是.vue文件

#### 修改访问路径   vite.config.js => base

#### 设置vue组件库全局样式   vite.config.js => modifyVars

#### vuex使用  vuex的ts提示封装好了
    1、参考pages/About路径
    2、参考 hooks/useStore ts封装成自动提示
    3、ts封装 store/helper.ts 文件封装ts

#### eslint使用
    1、vscode安装Eslint插件
    2、引入eslint-config-vue-mkscanner

#### 移动端项目使用
    1、删除 antd-design-vue依赖包
    2、更改vite-config.js 依赖包按钮加载
    3、设置vite-config.js isMobile与mobileUnit变量值即可

#### 移动端1px 解决方案
```css
.test {
    border-bottom: 1Px solid #ddd;
}
[data-dpr="2"] .test {
    border-bottom: 0.5Px solid #ddd;
}

[data-dpr="3"] .test {
    border-bottom: 0.33Px solid #ddd;
}
```

