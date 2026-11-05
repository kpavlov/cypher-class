PORT ?= 8000
.DEFAULT_GOAL := start

.PHONY: start
start:
	(sleep 1; open http://localhost:$(PORT)) &
	PORT=$(PORT) pnpm start
