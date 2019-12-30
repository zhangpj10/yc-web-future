# yc-web-future

> 基于vue-cli3的多页面项目，支持单模块/多模块开发和编译

## 1 项目构建

克隆项目后，执行以下命令，进行依赖包安装

```js
yarn 或者 npm install
```

## 2 项目启动

### 2.1 单模块启动，执行以下命令

```js
// test为模块名
yarn dev --env.m=test
```

### 2.2 多模块启动，执行以下命令

```js
// test，test1为两个模块名
yarn dev --env.m=test,test1
```

### 2.3 全量启动,执行以下命令

```js
yarn dev
```

## 3 项目打包编译

### 3.1 单模块打包，执行以下命令

```js
yarn build test
```

### 3.2 多模块打包，执行以下命令

```js
yarn build test,test1
```

### 3.3全量打包，执行以下命令

```js
yarn build
```

## 4 自动修复eslint格式，执行以下命令

```js
yarn lint
```

***如果您觉得可以的话，欢迎给小星星哦***

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
