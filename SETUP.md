# Setting up Development Environment

Recommended environment: Ubuntu 21.04, macOS

## Install Nodejs

On Ubuntu/Debian:

```sh
sudo apt-get autoremove --purge nodejs yarn
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

On macos (Homebrew):

```sh
brew install node
```

## Install yarn

```sh
npm install --global yarn
```

## Install nodejs deps

```sh
yarn install
```

## Live reloading

> Live reloading is slow on WSL. Use at your own risk!

```sh
yarn run start
```
