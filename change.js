const fs = require('fs');

setInterval(() => {
  fs.writeFileSync('./src/dynamic-dep.js', getContents(), 'utf-8');
}, 2000)

function getContents() {
  return `
export default function () {
  console.log('dynamic dep called - ${+new Date()}');
}
`;
}
