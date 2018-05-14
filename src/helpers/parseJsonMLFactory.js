function parseJsonMLFactory(config) {
    const internalPattern = new RegExp(`^https?://github.com/${config.username}/.+$`);
    const externalPattern = /^https?:\/\/github.com\/[A-Za-z0-9-_]+\/.+$/;

    const parseJsonML = (jsonML, result = []) => {
        const [tag, ...rest] = jsonML;

        if (tag === 'p' && rest[0][0] === 'a' && rest[1]) {
            if (!rest[0][1].href.match(internalPattern) && rest[0][1].href.match(externalPattern)) {
                const project = {
                    category: rest[0][1].href.match(internalPattern) ? 'bh' : 'teammates',
                    href: rest[0][1].href,
                    name: rest[0][2],
                    desc: rest[1].slice(3)
                };

                result = [project, ...result];
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

export default parseJsonMLFactory;