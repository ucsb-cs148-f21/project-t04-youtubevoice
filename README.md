# project-t04-youtubevoice

Attemping to answer the question: What if Prof H. had a russian female accent...?

## Setting up Development Environment

Recommended environment: Ubuntu 21.04, macOS

### Prerequisite

* Nodejs 12
* Yarn
* Parcel
* Chrome
* Internet access

### Install Nodejs

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

### Install yarn

```sh
npm install --global yarn
```

## Building package

### Install nodejs deps

```sh
yarn install
```

### Development: Live reloading

> Live reloading is slow on WSL. Use at your own risk!

```sh
yarn run start
```

### Build extension bundle

```sh
yarn run build
```

## Dependencies

* fast-xml-parser: Parsing XML data from Youtube API.

## Current Tasks

Bisman Sodhi, Kaleb Guo - Binary search

Lauren Daniel - Gone

Hunter Massey - .md jenga

Haolan Li - Speech synthesis

Aditya Gupta - Speed stuff

## Things to do

Bisman Sodhi - Everything

Lauren Daniel - Nothing

Hunter Massey - Something

Kaleb Guo - Everything else

Haolan Li - Nothing else

Aditya Gupta - Something else

## Tech Stack

We are using Javascript with Google Chrome web APIs, HTML, and CSS.

## Functionality

* Giving Prof Höllerer a russian female accent

## Known problems

* Javascript is a hot pile of garbage
* Chrome asychrounous APIs are a hot pile of garbage too
* Message passing between content script and background is messy
* Background code not structured

## Contributing

Contributions are welcomed!

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D
