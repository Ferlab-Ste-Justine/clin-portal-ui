.ONESHELL:

# Install
local_env:
	cp -p env-qa .env

install: local_env git_submodules js_install

# Git Submodules
git_submodules:
	git submodule update --init --recursive
	git submodule update --remote

git_submodules_fix:
	git submodule deinit -f .
	git submodule update --init

git_submodules_update:
	git submodule deinit -f .
	git submodule update --init --recursive

# JS
js_install:
	npm i

js_clean:
	rm -f package-lock.json
	rm -rf node_modules/${m}
	npm i

js_clean_install: js_clean js_install

# Docker
start:
	docker-compose up -d

stop: 
	docker-compose down


