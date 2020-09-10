#!/bin/bash

if [[ $# -eq 0 ]]
then
  echo "Please provide the version number as an argument"
  exit 1
fi

docker-compose run --rm npm run build
docker build --tag sfitemlevels:$1 .
docker save -o sfitemlevels-$1.tar sfitemlevels:$1
docker rmi sfitemlevels:$1