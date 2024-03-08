#!/bin/bash

npm ci
npm run build

tar -czvf docker/build.tar.gz .env.public dist package*

cp docker/build.tar.gz docker/admin/build.tar.gz
cp docker/build.tar.gz docker/student/build.tar.gz

rm docker/build.tar.gz

cd docker

docker-compose up --build -d

exit 0