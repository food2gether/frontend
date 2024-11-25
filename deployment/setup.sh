#!/bin/env bash

export APPLICATION_COMPONENT="frontend"
curl --fail https://raw.githubusercontent.com/food2gether/flux-base/refs/heads/main/bin/minikube-setup.sh | eval

