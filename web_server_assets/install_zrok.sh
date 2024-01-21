#!/bin/sh

# Get latest version of zrok
ZROK_VERSION=$(curl -sSf https://api.github.com/repos/openziti/zrok/releases/latest | jq -r '.tag_name')

# Get architecture
case "$(uname -m)" in
  x86_64) ZROK_ARCH=amd64 ;;
  aarch64|arm64) ZROK_ARCH=arm64 ;;
  armv7|armfh|arm) ZROK_ARCH=armv7 ;;
  *) echo >&2 "error: unsupported architecture $(uname -m)"; exit 1 ;;
esac

# Download and extract zrok
curl -sSfL "https://github.com/openziti/zrok/releases/download/${ZROK_VERSION}/zrok_${ZROK_VERSION#v}_linux_${ZROK_ARCH}.tar.gz" |
  tar -xzf - zrok