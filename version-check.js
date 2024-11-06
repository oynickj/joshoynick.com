const semver = require('semver');
const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson;

try {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  packageJson = JSON.parse(packageJsonContent);
} catch (error) {
  console.error('Error reading package.json:', error.message);
  process.exit(1);
}

const nodeVersion = process.version;
const requiredVersion = packageJson.engines && packageJson.engines.node;

console.log(`Current Node.js version: ${nodeVersion}`);
console.log(`Required Node.js version: ${requiredVersion || 'Not specified'}`);

if (requiredVersion) {
  if (semver.satisfies(nodeVersion, requiredVersion)) {
    console.log('Your Node.js version meets the requirement.');
  } else {
    console.log('EBADENGINE: Your Node.js version does not meet the requirement.');
    console.log('Please update your Node.js version or modify the engines field in package.json.');
  }
} else {
  console.log('No Node.js version requirement specified in package.json.');
}