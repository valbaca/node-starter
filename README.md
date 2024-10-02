# Node + TypeScript + Jest (Oct 2024)

## Intro

Recently I wanted to do some quick coding but spent more time getting a project setup with what I consider the absolute basics to code: type-checking and unit tests.

## Tooling

Current state-of-the-art / flavor-of-the-month tooling is:

- [mise](https://mise.jdx.dev/) for managing tooling and node versions
- Node v22: `mise install node@22 && mise use --global node@22`
- [pnpm](https://pnpm.io/) instead of `npm`
  - `mise install pnpm && mise use --global pnpm`

### Intro: decisions

Setting up a starter project template with:

1. Node without-DOM libraries
2. TypeScript for sanity
3. Jest for unit testing

Structure conventions:

- `src/` all source files `file.ts` and test files `file.test.ts` within
- `dist/` output `*.js` files within. Start file is `dist/index.js`

### npm and git

```sh
pnpm init
git init
mkdir dist src # dist=output, src=all files in here
```

Edit .gitignore

```.gitignore
node_modules
dist
coverage
```

### Install

Install basics, TypeScript, and Jest:

```sh
pnpm install --save-dev nodemon rimraf \
  typescript ts-node @types/node \
  jest ts-jest @types/jest
```

### Scripts

Edit `package.json`

```json
{
  "main": "dist/index.js",
  "scripts": {
    "build": "rimraf dist/ && tsc",
    "start": "node dist/index.js",
    "dev": "nodemon --watch 'src/**' --ext 'ts,json' --ignore 'src/**/*.test.ts' --exec 'ts-node --files --compilerHost --transpilerOnly src/index.ts'",
    "test": "jest",
  }
}
```

Mostly self explanatory: `dev` for development. `build` and `start` for production. `test` for testing.
The nodemon mouthful in `dev` is optimizing for speed.

### TypeScript configuration

Initialize:  `pnpm tsc --init`
Edit `tsconfig.json` to configure it to work with Node and our Structure Conventions

```json
{
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.test.ts"],
  "compilerOptions": {
    "target": "es2022",
    "module": "Node16",
    "rootDir": "./src",
    "outDir": "./dist",
    "lib": ["es2023"],
  }
}
```

These choices are:

- Look for source in `src` but don't output unit test files.
- `"target": "es2022"` , a target well supported by Node v18+
- `"module": "Node16"`, to use the modern `import` and keeping Node compatibility
- Sticking with the Structure Conventions of source in `src/` and output in `dist/`
- `"lib": ["es2023"]`, to exclude the DOM libraries like `document`
- [tsconfig documentation](https://www.typescriptlang.org/tsconfig)

### Jest configuration

Initialize: `pnpm jest --init`

Answer the init questionnaire:

- Typescript? Yes
- Test Environment? Node
- Coverage? Yes
- Provider? v8
- Auto clear mocks? Yes

Edit jest.config.ts for TypeScript compatability
`"preset": "ts-jest"`

HAPPY HACKING!!!

## TODO

- Prettier for formatting
- ESLint for linting
- husky for pre-commit hooks and thus enforce formatting and linting
