# forge-sample-app-v2

An alternative implementation of [learnforge.autodesk.io](http://learnforge.autodesk.io/)'s
Node.js [sample code](https://github.com/Autodesk-Forge/learn.forge.viewmodels/tree/nodejs),
focusing on a couple of things:

- using fewer dependencies, removing unused dependencies
- using [ES6](http://es6-features.org) features such as `let`/`const`,
fat arrow functions, destructuring, and promises
- using `async`/`await`

> The code currently focuses on the server-side, so the front-end is very rudimentary.

## Quick Start

- get your [Forge](https://developer.autodesk.com/) credentials: [tutorial](http://learnforge.autodesk.io/#/account/)
- clone the git repo
- install dependencies: `npm install`
- run the server
    - using Visual Studio Code:
        - add the following launch configuration
        ```json
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Launch Program",
                    "program": "${workspaceFolder}/server.js",
                    "env": {
                        "DEBUG": "express:*",
                        "FORGE_CLIENT_ID": "<your-client-id>",
                        "FORGE_CLIENT_SECRET": "<your-client-secret>"
                    }
                }
        ```
        - run the server via *Debug* > *Start Debugging*
    - using command line
        - `FORGE_CLIENT_ID=<your-client-id> FORGE_CLIENT_SECRET=<your-client-secret> npm run start`
- go to [localhost:3000](http://localhost:3000)