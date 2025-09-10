SHELL := /bin/bash
BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
IMAGE_TAG=git-$(subst /,-,$(BRANCH))-$(shell git describe --always --dirty)
REPO_NAME=$(shell basename $(shell git rev-parse --show-toplevel))
IAMGE_REPO=d-x.cmstop.net
LOCAL_IAMGE_REPO=d.cmstop.xyz

push:
	NODE_OPTIONS=--max-old-space-size=4096 npm run build
	echo {\"data\":\"${IMAGE_TAG}\"} > ./dist/version.json
	docker build -t ${IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG} .
	docker push ${IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG}
	docker rmi ${IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG}

push_dev:
	NODE_OPTIONS=--max-old-space-size=4096 npm run build
	echo {\"data\":\"${IMAGE_TAG}\"} > ./dist/version.json
	docker build -t ${LOCAL_IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG} .
	docker push ${LOCAL_IAMGE_REPO}/${REPO_NAME}:dev-${IMAGE_TAG}
	docker rmi ${LOCAL_IAMGE_REPO}/${REPO_NAME}:dev-${IMAGE_TAG}

pushx:
	mkdir -p ./dist
	NODE_OPTIONS=--max-old-space-size=4096 npm run build
	echo {\"data\":\"${IMAGE_TAG}\"} > ./dist/version.json
	docker buildx build --platform=linux/amd64 -t ${IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG} .
	docker push ${IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG}
	docker rmi ${IAMGE_REPO}/${REPO_NAME}:${IMAGE_TAG}
