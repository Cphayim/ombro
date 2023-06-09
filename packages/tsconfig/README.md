# @ombro/tsconfig

![npm package](https://badgen.net/npm/v/@ombro/tsconfig)

> Shared TypeScript [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for projects

## Install

```sh
npm install -D @ombro/tsconfig

# pnpm
pnpm add -D @ombro/tsconfig
```

> Since version 2.0.0, TypeScript 5.0+ is required.
>
> If you are using TypeScript 4, you need to install `@ombro/tsconfig@1.4.3`.

## Usage

Add `extends` to your project `tsconfig.json`

```json
{
  "extends": "@ombro/tsconfig"
}
```

### Use ESM

This is actually the default configuration

`@ombro/tsconfig@^2.0.0`:

```json
{
  "extends": "@ombro/tsconfig/esm"
}
```

`@ombro/tsconfig@^1.0.0`:

```json
{
  "extends": "@ombro/tsconfig/tsconfig.esm.json"
}
```

### Use Commonjs

`@ombro/tsconfig@^2.0.0`:

```json
{
  "extends": "@ombro/tsconfig/cjs"
}
```

`@ombro/tsconfig@^1.0.0`:

```json
{
  "extends": "@ombro/tsconfig/tsconfig.cjs.json"
}
```

## Change log

[CHANGELOG.md](./CHANGELOG.md)
