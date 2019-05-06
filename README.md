# TB Editor

基于 react 和 slate.js 的所见即所得富文本编辑器, 支持文本、图片、链接、emoji 等元素插入

## 在线演示

https://durianicecream.github.io/TBEditor/example/dist/index

## 安装

```
npm install tb-editor --save

cd tb-editor

npm install

npm start
```

### 依赖版本

react ^16.3

slate ~0.33

## 配置项

| 配置项      | 类型     | 必填项 | 默认值 | 说明                                              |
| ----------- | -------- | ------ | ------ | ------------------------------------------------- |
| onChange    | function | true   | null   | 钩子函数,监听输入并获取实时 html 值 (value) => {} |
| uploadProps | object   | false  | {}     | 如果不填则无法开启图片上传功能,                   |

## 组件方法

**reset(html:string)=>void** 数据重置接口,如果有异步数据可用

| API 请参考 [Antd.Upload](https://ant.design/components/upload-cn/) |
