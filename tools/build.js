const fs = require('fs');
const markTwain = require('mark-twain');

const jsonML = markTwain(fs.readFileSync('README.md').toString());

function parseJsonMLFactory(config) {
  const internalPattern = new RegExp(`^https?://github.com/${config.username}/.+$`);
  const externalPattern = /^https?:\/\/github.com\/[A-Za-z0-9-_]+\/.+$/;

  const parseJsonML = (jsonML, result = { internal: [], external: [] }) => {
    const [tag, ...rest] = jsonML;
    if (tag === 'a') {
      if (rest[0].href.match(internalPattern)) {
        result.internal = [...result.internal, rest[0].href];
      } else if (rest[0].href.match(externalPattern)) {
        result.external = [...result.external, rest[0].href];
      }
      return result;
    } else {
      return Object.assign(
        result,
        ...(rest.map(element => Array.isArray(element) ? parseJsonML(element, result) : {}))
      );
    }
  };
  return parseJsonML;
}

// const projects = jsonML.content.reduce((accumulator, element) => ({}), { internals: [], externals: [] });

// console.log(JSON.stringify(jsonML.content, null, 2));

console.log(parseJsonMLFactory({ username: 'brainhubeu' })(jsonML.content));

module.exports = {
  parseJsonMLFactory,
};
