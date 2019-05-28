async function render() {
  const promise = import('./dynamic-dep.js');

  // BUILD_TIME_DATA would be populated with metadata based on the file contents
  // But currently never gets recalculated
  console.log(promise.BUILD_TIME_DATA);

  const {default: module} = await promise;
  module();
}

render();
