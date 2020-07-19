# semo-plugin-dingtalk

A Semo plugin to provide ability to send message to DingTalk

## Installation

```
npm i -g @semo/cli semo-plugin-dingtalk
```

## Usage

Support 5 types of DingTalk: `Text`, `Markdown`, `Link`, `FeedCard`, `ActionCard`, and each type has options.

```
semo dingtalk text help
semo dingtalk markdown help
semo dingtalk link help
semo dingtalk feed-card help
semo dingtalk action-card help
```

## Programmability

```js
import { getToken, getSecret, DingBot } from 'semo-plugin-dingtalk'
```

or 

```js
const { dingbot } = await Utils.invokeHook('component')
```

The second way, the object has been initialized.

## License

MIT