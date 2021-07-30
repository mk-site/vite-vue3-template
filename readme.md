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

#### vuex使用
    1、参考pages/About路径
    2、参考 hooks/useStore ts封装成自动提示

#### eslint使用
    1、vscode安装Eslint插件
    2、引入eslint-config-vue-mkscanner

#### 移动端项目使用
    1、删除 antd-design-vue依赖包
    2、更改vite-config.js 依赖包按钮加载
    3、设置以rem为单位还是vw为单位简单更改配置即可