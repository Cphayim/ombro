# @ombro/tsconfig

> Shared TypeScript [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for projects

## Install

```sh
npm install --save-dev @ombro/ts-config
```

## Usage

Add `extends` to your project `tsconfig.json`

**Use ESM**

```json
{
  "extends": "@ombro/ts-config/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

**Use Commonjs**

```json
{
  "extends": "@ombro/ts-config/tsconfig.cjs.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```
