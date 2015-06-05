serve:
	@docker run --rm -v "$$PWD:/src" -p 4000:4000 grahamc/jekyll serve -H 0.0.0.0

webpack:
	@./node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --colors --host=0.0.0.0
