import fs from 'fs';

const __unit__ = {
  path: './apps/$APP/test/jest.json',
  config: {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '../../..',
    testRegex: 'apps/$APP/test/.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
    moduleNameMapper: {},
  },
};

const __e2e__ = {
  path: './apps/$APP/test/jest-e2e.json',
  config: {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '../../..',
    testRegex: 'apps/$APP/test/.*\\.e2e-spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
    moduleNameMapper: {},
  },
};

const prepare = () => {
  const ts = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8').toString());
  const alias = Object.entries(ts.compilerOptions.paths);

  for (const [k, v] of alias) {
    const key = `^${k.replace('/*', '')}(|/.*)$`;
    const value = `<rootDir>/${v.shift().replace('/*', '')}/$1`;

    __unit__.config.moduleNameMapper[key] = value;
    __e2e__.config.moduleNameMapper[key] = value;
  }
};

const overwrite = (app) => {
  const unit = { ...__unit__ };
  unit.path = unit.path.replace('$APP', app);
  unit.config.testRegex = unit.config.testRegex.replace('$APP', app);

  const e2e = { ...__e2e__ };
  e2e.path = e2e.path.replace('$APP', app);
  e2e.config.testRegex = e2e.config.testRegex.replace('$APP', app);

  fs.writeFileSync(unit.path, JSON.stringify(unit.config, null, 2), 'utf-8');
  fs.writeFileSync(e2e.path, JSON.stringify(e2e.config, null, 2), 'utf-8');
};

const create = () => {
  const apps = fs.readdirSync('./apps');

  for (const app of apps) {
    overwrite(app);
  }
};

prepare();
create();
