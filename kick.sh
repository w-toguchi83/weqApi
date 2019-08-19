#!/bin/bash

function fn_test() {
    sudo docker-compose run -d weq
    echo "wait for stating database"
    sleep 20
    sudo docker-compose run jsunit
    sudo docker-compose down
}

if [ "test" = "${1}" ]; then
    fn_test
else
    sudo docker run -it --rm -v $(pwd):/app -w /app -p 3000:3000 node:12.7.0-buster ${@}
fi

