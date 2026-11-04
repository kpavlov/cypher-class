PORT ?= 8000

.PHONY: start
start:
	(sleep 1; open http://localhost:$(PORT)) &
	PORT=$(PORT) pnpm start
