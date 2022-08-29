# @ombro/tsconfig

> Shared TypeScript [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for projects

## Install

```sh
npm install --save-dev @ombro/tsconfig
```

## Usage

Add `extends` to your project `tsconfig.json`

**Use ESM**

```json
{
  "extends": "@ombro/tsconfig/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

**Use Commonjs**

```json
{
  "extends": "@ombro/tsconfig/tsconfig.cjs.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```
