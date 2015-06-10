serve:
	make jekyll & make webpack & wait

install:
	npm install
	bower install
	cd lambda/SendBetaSubscription && npm install

jekyll:
	@docker run --rm -v "$$PWD:/src" -p 4000:4000 grahamc/jekyll serve -H 0.0.0.0

webpack:
	@./node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --colors --host=0.0.0.0

deploy: install
	NODE_ENV=production ./node_modules/webpack/bin/webpack.js -p --optimize-minimize --optimize-occurence-order --optimize-dedupe --progress
	docker run --rm -v "$$PWD:/src" grahamc/jekyll build --config _config_prod.yml
	rm -Rf build fonts
	sudo chown -R `whoami` _site # @TODO: find a way to get correct permissions from Docker
	aws s3 sync _site/ s3://misocell.io

deploy_lambda:
	@rm -Rf /tmp/Misocell*
	@mkdir /tmp/Misocell
	@cp -Rf lambda/SendBetaSubscription/* /tmp/Misocell
	@rm /tmp/Misocell/config.js
	@mv /tmp/Misocell/config_prod.js /tmp/Misocell/config.js
	@cd /tmp/Misocell/ && zip -rq /tmp/Misocell_SendBetaSubscription.zip *
	@aws lambda update-function-code --function-name Misocell_SendBetaSubscription --zip-file fileb:///tmp/Misocell_SendBetaSubscription.zip
	rm -Rf /tmp/Misocell_*
