#!/bin/env bash

export APPLICATION_COMPONENT="frontend"
# We are storing the curl result in a variable because otherwise the stdin would be closed and the eval would not work resulting in a "curl: (23) Failed writing body" error
setup_script=$(curl --fail https://raw.githubusercontent.com/food2gether/flux-base/refs/heads/main/bin/minikube-setup.sh)
eval "$setup_script"

