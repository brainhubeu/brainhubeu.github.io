function parseJsonMLFactory(config) {
  const internalPattern = new RegExp(`^https?://github.com/${config.username}/.+$`);
  const externalPattern = /^https?:\/\/github.com\/[A-Za-z0-9-_]+\/.+$/;

  const projects = [];
  const parseJsonML = (jsonML, result = []) => {
    const [tag, ...rest] = jsonML;

    if (tag === 'li' && rest[0][0] === 'a' && rest[1]) {
      if (!rest[0][1].href.match(internalPattern) && rest[0][1].href.match(externalPattern)) {
        const project = {
          category: rest[0][1].href.match(internalPattern) ? 'bh' : 'teammates',
          href: rest[0][1].href,
          name: rest[0][2],
          desc: rest[1].slice(3),
        };

        result = [project, ...result];
      }
      projects.push(...result);
      return result;
    } else {
      return Object.assign(
        result,
        ...(rest.map(
          element => Array.isArray(element) ? parseJsonML(element, Array.from([...new Set(projects)])) : {},
        )),
      );
    }
  };
  return parseJsonML;
}

export default parseJsonMLFactory;
