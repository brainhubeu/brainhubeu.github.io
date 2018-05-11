const markTwain = require('mark-twain');
const jsonML = markTwain(fs.readFileSync('README.md').toString());
const { parseJsonMLFactory } = require('./js/build');
const axios = require('axios');

function getBrainhubProjects() {
    return axios.get('https://api.github.com/users/brainhubeu/repos')
        .then(response =>
            response.data.map(repo => ({
                    category: 'bh',
                    name: repo.name,
                    href: repo.html_url,
                    desc: repo.description,
                })
            )
        )
        .catch(function (error) {
            console.log(error);
        });
}

function githubProjectsLoader() {
    const teammatesProjects = parseJsonMLFactory({ username: 'brainhubeu' })(jsonML.content);

    getBrainhubProjects()
        .then(data => {
            console.log(data);
            console.log(teammatesProjects);
            return [];
        });
};

module.exports = {
    githubProjectsLoader,
};