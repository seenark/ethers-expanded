clean:
	rm -rf dist

compile:
	make clean; \
	node build.config.js;

pub:
	npm version patch; \
	npm publish --access public

libs-compile-publish:
	make clean; \
	make compile; \
	make pub;