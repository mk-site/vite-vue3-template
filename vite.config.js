/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import styleImport from 'vite-plugin-style-import';
import path from 'path';

const nodeResolve = (dir) => {
    return path.resolve(process.cwd(), dir);
};

const viteConfig = ({ command }) => {
    console.log('starting...');
    const baseConfig = {
        base: '/site/',
        resolve: {
            alias: [
                { find: /^@\//, replacement: nodeResolve('src') + '/'},
                { find: /^hooks\//, replacement: nodeResolve('src/hooks') + '/' },
                { find: /^utils\//, replacement: nodeResolve('src/utils') + '/' },
                { find: /^pages\//, replacement: nodeResolve('src/pages') + '/' },
                { find: /^action\//, replacement: nodeResolve('src/action') + '/' },
                { find: /^store\//, replacement: nodeResolve('src/store') + '/' },
                { find: /^component\//, replacement: nodeResolve('src/component') + '/' },
                { find: /^router\//, replacement: nodeResolve('src/router') + '/' },
                { find: /^assets\//, replacement: nodeResolve('src/assets') + '/' },
            ]
        },
        css: {
            preprocessorOptions: {
                less: {
                    // 此处可设置antd变量
                    modifyVars: {
                        // hack: `true; @import (reference) "${resolve('src/style/global/config.less')}";`,
                    },
                    javascriptEnabled: true,
                }
            },
            postcss: {
                plugins: [
                    require('postcss-preset-env')({
                        stage: 3,
                        features: {
                            'color-mod-function': { unresolved: 'warn' },
                            'nesting-rules': true,
                        },
                        insertBefore: {},
                        autoprefixer: { grid: true },
                    }),
                    require('cssnano')({}),
                    require('autoprefixer')({
                        overrideBrowserslist: [
                            'Android 4.1',
                            'iOS 7.1',
                            'Chrome > 31',
                            'ff > 31',
                            'ie >= 8',
                            'last 10 versions',
                        ],
                        grid: true,
                    }),
                    // 移动端配置
                    // require('postcss-px-to-viewport')({
                    //     viewportWidth: 375, // 设计稿宽度
                    //     viewportHeight: 667, // 设计稿高度，可以不指定
                    //     unitPrecision: 3, // px to vw无法整除时，保留几位小数
                    //     viewportUnit: 'vw', // 转换成vw单位
                    //     selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
                    //     minPixelValue: 1, // 小于1px不转换
                    //     mediaQuery: false, // 允许媒体查询中转换
                    // })
                ]
            }
        },
    };
    const basePlugins = [
        vue(),
        vueJsx(),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        styleImport({
            libs: [{
                libraryName: 'ant-design-vue',
                esModule: true,
                resolveStyle: (name) => {
                    return `ant-design-vue/es/${name}/style/css`;
                },
            }]
        })
    ];
    if (command === 'serve') {  // serve 独有配置
        return {
            ...baseConfig,
            plugins: [
                ...basePlugins
            ],
            server: {
                host: '0.0.0.0',
                hmr: true,
            },
        };
    }
    // build 独有配置
    return {
        ...baseConfig,
        plugins: [
            ...basePlugins
        ],
        build: {
            target: 'es2015',
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: true,
                },
            },
        }
    };
};

export default viteConfig;
