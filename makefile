setup: initdb
	docker-compose run webpack npm install

initdb:
	docker-compose run database

run:
	docker-compose up

test:
	docker-compose run web npm test
