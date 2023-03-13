# vue-multi-page

活动页 h5 多页面配置，并结合`jenkins`和`nginx`实现，每次增加一个页面，只需要在`jenkins`的动态参数中增加一个参数

[具体详情可阅读说明文章](https://juejin.im/post/6869244807844364295)

## 使用说明

### 在 pages 下建立自己的页面

输入命令

```
  npm run new:page
```

### 项目启动和打包

```
npm install
```

```
npm run serve --page=pages/xxx
```

```
npm run build --page=pages/xxx
```

```
npm run lint --page=pages/xxx
```

**开发访问**

```
npm run serve --page=pages/xxxx
http://localhost:8888/page1.html#/home
```

### 测试环境和线上 jenkins 配置

1. **Choice Parameter**增加选项

```
demo
```

2. 访问地址

`http://www.bai.cn/demo/#/home`

`http://www.bai..cn/demo/#/home`

### 内置环境变量

| 标识 | 描述       |
| ---- | ---------- |
| DEV  | 开发环境   |
| TEST | 测试环境   |
| PRE  | 预发布环境 |
| PROD | 生产环境   |

### vue-cli 参考链接

See [Configuration Reference](https://cli.vuejs.org/config/).

--
