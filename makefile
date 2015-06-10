serve:
	make jekyll & make webpack & wait

install:
	npm install
	bower install

jekyll:
	@docker run --rm -v "$$PWD:/src" -p 4000:4000 grahamc/jekyll serve -H 0.0.0.0

webpack:
	@./node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --colors --host=0.0.0.0

deploy: install
	NODE_ENV=production ./node_modules/webpack/bin/webpack.js -p --optimize-minimize --optimize-occurence-order --optimize-dedupe --progress
	docker run --rm -v "$$PWD:/src" grahamc/jekyll build --config _config_prod.yml
	aws s3 sync _site/ s3://misocell.io
	rm -Rf build fonts
