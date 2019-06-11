# @naughty/githook-vcm

用于验证 `git-commit-msg`，支持 `husky`、`yorkie` 设置的 githook

## 如何使用？

安装
```sh
$ npm install -D @naughty/githook-vcm
```

命令
```sh
githook-vcm [options]
```

格式
```
<type>(<scope>): <subject>
```

验证规则
```
/^(revert: )?(feat|fix|docs|style|refactor|perf|opt|test|workflow|ci|release|chore|types)(\(.+\)): .{1,50}/
```

选项

* `--allow-merge`: 允许合并，默认禁用合并
* `--ignore-type`: 忽略 `type` 的验证
* `--ignore-scope`: 忽略 `scope` 的验证
* `--max`: `commit-msg`的最大长度，默认为50

与 `husky` 一起使用，在 `package.json` 中添加：
```json
"config": {
    "hooks": {
        "commit-msg": "githook-vcm"
    }
}
```

与 `yorkie` 一起使用，在 `package.json` 中添加：
```json
"gitHooks": {
    "commit-msg": "githook-vcm"
}
```
