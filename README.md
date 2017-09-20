# jasmine-filename-results
---

## Install

```bash
npm install jasmine-filename-results --save-dev
```

## Code

Add the following code somewhere within your Jasmine test configs

```javascript
const jfr = require('jasmine-filename-results');
jasmine.getEnv().it = jfr(jasmine.getEnv().it, '.spec.js');
```

When creating a custom report you can use the new information to print out the filename and linenumber

```
    specDone: (result) => {
        let fn = result['_specFile'].filename;
        let ln = result['_specFile'].line;
        console.log(`${fn}:${ln}`);
    }
```
