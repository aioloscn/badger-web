# badger-web

## 项目说明

- 该项目是从 `live-web` 抽离出的登录前端，包含短信验证码登录迁移能力
- 可作为独立登录中心，被其他系统通过 URL 参数跳转接入

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
- `redirectAllowHosts`：登录成功后允许重定向的目标域名列表，留空表示不限制

## 独立登录中心接入

- 业务系统跳转到登录中心时，可携带参数：`redirect` / `redirectUrl` / `redirect_uri`
- 示例：`http://localhost:5502/?redirect=https%3A%2F%2Fbiz.example.com%2Fcallback`
- 登录成功后会跳转回目标地址，并追加：
- `loginStatus=success`
- `from=badger-web`
- 若后端返回 `userId` / `token` / `ticket`，也会透传到回跳地址参数中

## 运行方式

使用任意静态服务启动当前目录后访问 `index.html`。

示例：

```bash
python -m http.server 5501
```
