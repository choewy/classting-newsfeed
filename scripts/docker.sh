#!/bin/bash

if [ ! -d "node_modules" ]; then
  npm ci
fi

npm run build

tar -czvf docker/build.tar.gz dist package*

cd docker

docker-compose up --build -d mysql
docker-compose up --build initializer admin student 

exit 0