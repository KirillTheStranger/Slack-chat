install:
	npm ci && -C frontend npm ci

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npm run start

lint-frontend:
	make -C frontend lint