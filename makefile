setup:
	docker-compose run webpack npm install

run:
	docker-compose up

test:
	docker-compose run web npm test
