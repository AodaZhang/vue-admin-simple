# vue-admin-simple

[![vue@next](https://img.shields.io/badge/vue%40next-3.0.0-green)](https://github.com/vuejs/vue-next)
[![ant-design-vue](https://img.shields.io/badge/ant--design--vue-2.0.1-brightgreen)](https://github.com/vueComponent/ant-design-vue)
[![license](https://img.shields.io/badge/License-MIT-blue)](https://github.com/AodaZhang/vue-admin-simple/blob/master/LICENSE)

## 一.简介

[vue-admin-simple](https://github.com/AodaZhang/vue-admin-simple) 是一个基于 [vue3.0](https://github.com/vuejs/vue-next)，[TypeScript](https://github.com/microsoft/TypeScript) 以及 [ant-design-vue](https://github.com/vueComponent/ant-design-vue) 实现的后端管理系统，它设计思路来源于 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)，旨在提供一个包含后台必要功能最小集合的模板，你可以在此基础上任意扩充功能。

## 二.相关项目

[PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) (全功能的 vue admin 管理后台)

[PanJiaChen/vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) （一个极简的 vue admin 管理后台）

[vueComponent/ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro) （开箱即用的中台前端/设计解决方案）

## 三.线上地址

- [ ] 待完善

## 四.功能

- 权限
  - [x] 登录/注销
  - [x] 页面级权限
  - [x] dom 级权限
- 路由
  - [x] 根据权限动态挂载路由
  - [x] 路由卸载
- 全局
  - [x] 国际化多语言
  - [x] 动态路由（支持无限嵌套）
  - [x] 动态面包屑（根据路由自动生成）
  - [x] 使用 webpack-dev-server 内置 express mock
  - [x] 支持 JSX
  - [ ] 多标签页切换
  - [ ] 移动端适配
- 工程化
  - [x] dev/uat/prod 多环境配置
  - [x] ant-design-vue 支持按需加载
  - [x] 更换 ant-design-vue 内置 moment.js 为 day.js
  - [x] 静态资源支持 gzip 压缩
- 其他
  - [ ] 未完待续...

## 五.目录结构

```bash
├── mock                       # dev环境mock模拟数据
├── public
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src
│   ├── api                    # 网络请求相关
│   ├── assets                 # 静态资源
│   ├── components             # 全局组件
│   ├── hooks                  # 自定义hooks
│   ├── layout                 # 基础页面布局
│   ├── locale                 # 国际化语言配置
│   ├── plugins                # vue初始加载插件、指令、组件
│   ├── router                 # vue-router
│   ├── store                  # vuex
│   ├── style                  # less mixin以及全局样式
│   ├── types                  # 全局.d.ts定义
│   ├── utils                  # 工具函数
│   ├── views                  # 业务页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口ts
│   └── shims.d.ts             # 资源类文件shims
├── tests                      # jest测试文件
├── .browserslistrc            # browserslistrc配置
├── .env.*                     # 环境变量配置
├── .eslintignore              # eslint忽略文件
├── .eslintrc.js               # eslint配置
├── .gitignore                 # git忽略文件
├── babel.config.js            # babel-loader配置
├── commitlint.config.js       # @commitlint/cli配置
├── jest.config.js             # jest单元测试配置
├── package.json               # package.json依赖
├── postcss.config.js          # postcss配置
├── prettier.config.js         # prettier配置
├── project.config.js          # 项目配置
├── tsconfig.json              # typescript配置
├── vue.config.js              # @vue/cli配置
└── yarn.lock                  # yarn
```

## 六.环境

- [node](http://nodejs.org/)
- [git](https://git-scm.com/)

## 七.npm 指令

```shell
# 启动本地测试环境
npm start
# 打包uat环境
npm run build:uat
# 打包生产环境
npm run build:prod
# 运行eslint检查并修复代码
npm run lint:fix
# 运行jest单元测试并挂起
npm run test:unit
# 运行 commitizen 提交符合 Angluar 规范的 git commit 信息
npm run commit
# 更新 npm version 并生成 changelog
npm run changelog
```
