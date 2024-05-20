# @ombro/cli-chat

[![npm package](https://badgen.net/npm/v/@ombro/cli-chat)](https://npmjs.com/package/@ombro/cli-chat)

[English](./README.md) | 简体中文

OChat 是一个命令行界面聊天工具。通过 OpenAI 服务的帮助，它可以回答你的任何问题。

![guide](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2024/03/20/010945Yxy2YJ.gif)

> 已经支持 GPT-4，使用 `--gpt-4` 或 `--gpt-4o` 参数启动

## 安装

```sh
$ npm install @ombro/cli-chat
```

## 使用

在使用之前，你需要先配置 `baseURL` 和 `apiKey`，执行以下命令

```sh
$ ochat config set
```

它将启动一个交互式界面引导你完成设置：

- `baseURL` 是 API 服务的地址, 默认值为: https://api.openai.com/v1
  - 如果你使用第三方 API 或者代理，需要作相应修改
- `apiKey` 是你的 OpenAI apiKey

完成，接下来就可以愉快的对话了！

```sh
# 开始对话，默认使用 GPT-3.5 模型
$ ochat

# 使用 GPT-4 模型
# 请留意在使用服务时您的 API 消费情况
$ ochat --gpt-4

# 使用 GPT-4o 模型
# 请留意在使用服务时您的 API 消费情况
$ ochat --gpt-4o
```

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## LICENSE

MIT
