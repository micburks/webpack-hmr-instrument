
# webpack-hmr-instrument

`./MyPlugin.js` contains a plugin that looks at dynamic imports and add instrumentation to the promise based on the contents of the imported chunks.


## Reproduce

`yarn` to install

`yarn start` to run webpack-dev-server

`yarn change` to run script that updates the dynamically imported file every 2 seconds


## Expectations

Current result:

When the dynamically imported file is updated, the ImportDependencyTemplate plugin is not re-run.


Intended result:

When a dynamically imported file is updated
- the ImportDependencyTemplate is able to re-analyze the import
- the HMR update includes the new instrumentation on the promise
