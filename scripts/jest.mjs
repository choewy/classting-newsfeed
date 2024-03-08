import fs from 'fs';

const unitConfig = (app, moduleNameMapper) => ({
  path: `./apps/${app}/test/jest.json`,
  config: {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '../../..',
    testRegex: `apps/${app}/test/.*\\.spec\\.ts$`,
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: [`<rootDir>/apps/${app}`, '<rootDir>/libs/'],
    moduleNameMapper,
  },
});

const e2eConfig = (app, moduleNameMapper) => ({
  path: `./apps/${app}/test/jest-e2e.json`,
  config: {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '../../..',
    testRegex: `apps/${app}/test/.*\\.e2e-spec\\.ts$`,
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: [`<rootDir>/apps/${app}`, '<rootDir>/libs/'],
    moduleNameMapper,
  },
});

const moduleNameMapper = {};

const ts = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8').toString());
const alias = Object.entries(ts.compilerOptions.paths);

for (const [k, v] of alias) {
  const key = `^${k.replace('/*', '')}(|/.*)$`;
  const value = `<rootDir>/${v.shift().replace('/*', '')}/$1`;

  moduleNameMapper[key] = value;
}

const overwrite = (app) => {
  const unit = unitConfig(app, moduleNameMapper);
  const e2e = e2eConfig(app, moduleNameMapper);

  fs.writeFileSync(unit.path, JSON.stringify(unit.config, null, 2), 'utf-8');
  fs.writeFileSync(e2e.path, JSON.stringify(e2e.config, null, 2), 'utf-8');
};

const create = () => {
  const apps = fs.readdirSync('./apps');

  for (const app of apps) {
    overwrite(app);
  }
};

create();
