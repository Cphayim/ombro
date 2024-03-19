# @ombro/cli-chat

[![npm package](https://badgen.net/npm/v/@ombro/cli-chat)](https://npmjs.com/package/@ombro/cli-chat)

English | [简体中文](./README_zh.md)

Ochat is a command line interface chat tool. With the help of OpenAI services, it can answer any question you have.

![guide](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2024/03/20/010945Yxy2YJ.gif)

> GPT-4 is already supported and can be initialized using the `--gpt-4` parameter.

## Install

```sh
$ npm i -g @ombro/cli-chat
```

## Usage

Before using it, you need to configure the `baseURL` and `apiKey` by executing the following command:

```sh
$ ochat config set
```

It will start an interactive interface to guide you through the setup process:

- `baseURL` is the address of the API, the default is: https://api.openai.com/v1
  - If you are using a third-party API or proxy, you need to make modifications accordingly.
- `apiKey` is your OpenAI apiKey

Great, now you are all set and ready to have a delightful conversation!

```sh
# Let's start the conversation using the default GPT-3.5 model.
$ ochat

# Using the GPT-4 model.
# Please make sure to monitor your API consumption while using the service.
$ ochat --gpt-4
```

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## LICENSE

MIT
