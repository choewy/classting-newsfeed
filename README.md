# Classting NewsFeed

- OS : MacOS(M2)
- Node: v20.11.1
- npm : v10.2.4
- MySQL : 8.0
- Docker : v23.0.5
- docker-compose : v2.17.3

## 설정

```bash
git clone https://github.com/choewy/classting-newsfeed.git

cd classting-newsfeed

npm ci
npm run env
```

아래 명령어를 통해 mysql 및 모든 애플리케이션(initializer, admin, student)을 Docker로 실행시킬 수 있습니다.

```bash
npm run docker
```

또는, 아래 명령어로 mysql 컨테이너만 실행시킬 수 있습니다.

```bash
npm run docker:mysql
```

- host : 127.0.0.1
- port : 3307
- username : root
- password : newsfeed
- database : newsfeed

## 구성

해당 프로젝트는 NestJS Monorepo로 구성되어 있습니다.

### apps/admin

관리자용 API 서버 애플리케이션입니다.

- baseURL : http://localhost:4000
- Health : http://localhost:4000/health
- Swagger : http://localhost:4000/swagger

```bash
npm run admin
npm run admin:dev
npm run admin:test
npm run admin:test:watch
npm run admin:test:cov
npm run admin:test:e2e
```

### apps/student

학생용 API 서버 애플리케이션입니다.

- baseURL : http://localhost:4001
- Health : http://localhost:4001/health
- Swagger : http://localhost:4001/swagger

```bash
npm run student
npm run student:dev
npm run student:test
npm run student:test:watch
npm run student:test:cov
npm run student:test:e2e
```

### apps/initializer

DB 스키마 초기화 및 임시 데이터를 생성하기 위한 컨텍스트 애플리케이션입니다.
아래 명령어를 실행하면 DB 스키마 재구성 및 임시 데이터 생성 후 즉시 종료됩니다.

```bash
npm run initializer
```
