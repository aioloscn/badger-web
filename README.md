# badger-web

## 项目说明

- 该项目是从 `live-web` 抽离出的登录前端，包含短信验证码登录迁移能力

## 目录结构

- `index.html` 登录页面入口
- `src/js/config.js` 后端地址与接口配置
- `src/js/request.js` 请求封装
- `src/js/app.js` 短信登录业务逻辑
- `src/styles/app.css` 页面样式

## 配置方式

在 `src/js/config.js` 中修改：

- `serverAddr`：后端域名
- `smsPath`：短信发送接口
- `loginPath`：短信登录接口

## 运行方式

使用任意静态服务启动当前目录后访问 `index.html`。

示例：

```bash
python -m http.server 5501
```
