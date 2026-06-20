SHELL := /bin/bash

BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
BUILD_HOUR := $(shell date +%Y%m%d%H)
IMAGE_TAG := git-$(subst /,-,$(BRANCH))-$(BUILD_HOUR)-$(shell git describe --always --dirty)
REPO_NAME := $(shell basename $(shell git rev-parse --show-toplevel))
IMAGE_REPO ?= d-x.cmstop.net
LOCAL_IMAGE_REPO ?= d.cmstop.xyz
PLATFORM ?= linux/amd64

.PHONY: build-tailwind docker-build push push_dev pushx

build-tailwind:
	npm run build:tailwind

docker-build: build-tailwind
	docker build --build-arg IMAGE_TAG=$(IMAGE_TAG) -t $(IMAGE_REPO)/$(REPO_NAME):$(IMAGE_TAG) .

push: docker-build
	docker push $(IMAGE_REPO)/$(REPO_NAME):$(IMAGE_TAG)
	docker rmi $(IMAGE_REPO)/$(REPO_NAME):$(IMAGE_TAG)
	@echo $(IMAGE_REPO)/$(REPO_NAME):$(IMAGE_TAG)

push_dev: build-tailwind
	docker build --build-arg IMAGE_TAG=dev-$(IMAGE_TAG) -t $(LOCAL_IMAGE_REPO)/$(REPO_NAME):dev-$(IMAGE_TAG) .
	docker push $(LOCAL_IMAGE_REPO)/$(REPO_NAME):dev-$(IMAGE_TAG)
	docker rmi $(LOCAL_IMAGE_REPO)/$(REPO_NAME):dev-$(IMAGE_TAG)
	@echo $(LOCAL_IMAGE_REPO)/$(REPO_NAME):dev-$(IMAGE_TAG)

pushx: build-tailwind
	docker buildx build --platform=$(PLATFORM) --build-arg IMAGE_TAG=$(IMAGE_TAG) -t $(IMAGE_REPO)/$(REPO_NAME):$(IMAGE_TAG) --push .
	@echo $(IMAGE_REPO)/$(REPO_NAME):$(IMAGE_TAG)
