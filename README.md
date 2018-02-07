# Callbag

Simple callbag implementation.

This system is using ES6 syntax. It works directly with NodeJS. 
But, in order to be used in browsers you will need to transpile the library [README.md#Development](see below).

There is 1 entry point: 
- [index.js]() <-> The library.


## Resources
Here is a list of websites where you'll find information about the main libraries we are using in this project :

- [Callbag](https://github.com/callbag/callbag) : the inspiration for this implementation

Quick access to a lot of documentation : [DevDocs](http://devdocs.io/)

## Development Setup

0. (Optional) Install NodeJS & yarn

1. Clone this repo

2. Install the dependencies
    
    ```
    yarn
    ```

3. (Optional) Build for browser

    ```
    yarn run build
    ```

## Usage

In NodeJS: 

```
const { createCallbag } = require('callbag');

const aCallBag = createCallbag();
```

In a browser:
```
<script type="text/javascript" charset="UTF-8" src="node_modules/callbag/callbag.browser.js"></script>
<script type="text/javascript">
  var aCallBag = createCallbag();

</script>
```

## Testing
The test are developed using **Mocha**. They are in the `test.js` file and can be run like so: 

```
yarn run test
```

## Documentation
Directly in the code !

## Cyclic call
The library relies on the JS engine to throw a Maximum call stack error in this case.


## Development flow

### **Commits**
This project uses [ESLint](https://eslint.org/) with the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). 

This means that we are running tests before each commit in order to maintain good code quality.

#### Commit Messages

Commits should be in the format `MESSAGE` where
- MESSAGE follows [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

When possible the commit message should begin with:

* `Create`, when creating a file or a new feature from scratch
* `Add`, when adding a feature to an existing file
* `Fix`, when fixing issues with an existing file
* `Remove`, when removing features
* `Update` or `Refactor`, when reworking files

The commit message should always complete the sentence `When applied this commit will... MESSAGE`

### **Versioning**
Each time **staging** is merged into **master** (to go live), a version tag is added following (Semantic Versioning)[http://semver.org/] : 

```
Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.
```
