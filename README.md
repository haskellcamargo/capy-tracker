# CapyTracker

[![npm version](https://badge.fury.io/js/capy-tracker.svg)](https://badge.fury.io/js/capy-tracker)
[![Code Climate](https://codeclimate.com/github/haskellcamargo/capy-tracker/badges/gpa.svg)](https://codeclimate.com/github/haskellcamargo/capy-tracker)
[![Issue Count](https://codeclimate.com/github/haskellcamargo/capy-tracker/badges/issue_count.svg)](https://codeclimate.com/github/haskellcamargo/capy-tracker)

A Node-compliant user tracking library made with <img src='https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-128.png' width='16' height='16' alt='love' /> and JS.

CapyTracker is a session tracker. It'll fetch informations like visited pages, browser name and version, date and session durations and send over your customized API.

## Installation

You can install the library directly via [`npm`](https://www.npmjs.com/package/capy-tracker) and add it as a dependency for your project:

`npm install --save capy-tracker`

If you are a power user, you may want to compile from sources. It is also quite simple!

```shell
sudo npm install -g webpack
git clone --depth=1 https://github.com/haskellcamargo/capy-tracker.git
cd capy-tracker/
npm install
webpack
webpack --minify
```

The source files `capy-tracker.js` and `capy-tracker.min.js` will be generate inside `dist/` directory.
If you want to run the tests, do `npm test`:

![npm test](http://i.imgur.com/VXz0vjl.png)

## Usage

Include `capy-tracker.min.js` in every page you want to track. The library has no autoload, you must initialize it (believe, side-effects aren't cool). The library exports the `CapyTracker` object-class.

Example:
```javascript
const definitelyNotATracker = new CapyTracker({ target: window, api: apiUrl });
definitelyNotATracker.start();
```

`.start()` will trigger the initialization. If a user session already exists, CapyTracker will take it; otherwise, a session will be created.

The tracker receives in its constructor an object containing the `target` (`window`, unless you are on Node) and the the `api` (URL). It'll touch the API everytime an interaction happens.

## Prototype

The following methods are exposed:

```haskell
getCurrentSession :: Maybe string -- Returns a monad containing "Just" the current session or "Nothing"
start :: () -- Initializes a session or reuses the current one
trackTime :: () -- Call this after `start` if you want to log when user quits your page
stop :: () -- Kills the current session permanently
collectData :: {
  url :: { hostname :: string, pathname :: string },
  date :: number,
  browser :: { name :: string, version :: string }
} -- Purely gives the current information
```

## API

The API should be compliant with the following

- Signals will be sent over **POST**
- The request body will contain a JSON with a `type` entry (`SESSION` or `DURATION`)
- When `SESSION`, `data` will contain the content of calling `collectData`
- When `DURATION`, `data` will contain the number representation of the time interval
