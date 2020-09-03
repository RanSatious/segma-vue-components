# Segma Vue 组件库

一组在不同项目中重复使用的组件、指令、混入、服务的集合。

## [安装](#安装)

```bash
# 设置仓库
npm config set registry http://npm.segma.tech/
# 安装
npm i @segma/vue-components
```

## [使用](#使用)

```javascript
import {} from '@segma/vue-components';
```

## [按需加载](#按需加载)

使用`babel-plugin-import`插件来实现按需加载。

```bash
# 安装插件
npm i babel-plugin-import --save-dev
```

配置`babel`：

```javascript
// babel.config.js
module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: '@segma/vue-components',
            },
        ],
    ],
};
```
