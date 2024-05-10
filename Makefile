docker-build:
	docker-compose build

docker-stop:
	docker-compose stop

docker-up:
	docker-compose up -d

composer-install:
	docker-compose run --rm php-cli composer install

manager-test-unit:
	docker-compose run --rm php-cli php bin/phpunit --testsuite=unit

manager-assets-install:
	docker-compose run --rm manager-node yarn install
	docker-compose run --rm manager-node npm rebuild node-sass

manager-assets-dev:
    docker-compose run --rm manager-node yarn encore dev
	docker-compose run --rm manager-node npm run dev