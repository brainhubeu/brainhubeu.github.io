const fs = require('fs');
const markTwain = require('mark-twain');
const jsonML = markTwain(fs.readFileSync('README.md').toString());
const { parseJsonMLFactory } = require('../../tools/build');

const data = {
  slider: [
    {
      src: 'assets/img/carousel/carousel-image-2.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-3.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-4.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-5.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-6.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-7.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-9.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-2.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-3.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-4.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-5.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-6.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-7.jpg',
      alt: '',
    },
    {
      src: 'assets/img/carousel/carousel-image-9.jpg',
      alt: '',
    },
  ],
  company: [
    {
      href: 'https://brainhub.eu/blog',
      name: 'Blog',
    },
    {
      href: 'https://brainhub.eu/portfolio',
      name: 'Portfolio',
    },
    {
      href: 'https://brainhub.eu/about-us',
      name: 'About us',
    },
    {
      href: 'https://brainhub.eu/labs/all',
      name: 'Brainhub Labs',
    },
    {
      href: 'https://brainhub.eu/career',
      name: 'Career',
    },
    {
      href: 'https://brainhub.eu/services',
      name: 'Services',
    },
    {
      href: 'https://brainhub.eu/terms-of-use',
      name: 'Terms of use',
    },
    {
      href: 'https://brainhub.eu/contact',
      name: 'Contact',
    }
  ],
  services: [
    {
      href: 'https://brainhub.eu/technology/node-js-development',
      name: 'Node.js Development',
    },
    {
      href: 'https://brainhub.eu/technology/react-js-development',
      name: 'React Development',
    },
    {
      href: 'https://brainhub.eu/technology/electron-js-development',
      name: 'Electron Development',
    },
    {
      href: 'https://brainhub.eu/technology/react-native-development',
      name: 'React Native Development',
    },
    {
      href: 'https://brainhub.eu/services/it-team-augmentation',
      name: 'Team Augmentation',
    },
    {
      href: 'https://brainhub.eu/services/digital-product-development',
      name: 'Digital Product Development',
    },
  ],
  offices: [
    {
      name: 'Brainhub Sp. z. o. o. [HQ]',
      address: 'Górnych Wałów 26',
      city: '44-100 Gliwice',
    },
    {
      name: 'Brainhub Sp. z. o. o.',
      address: 'Jasna 10/202',
      city: '00-013 Warszawa',
    }
  ],
  tabsContent: parseJsonMLFactory({ username: 'brainhubeu' })(jsonML.content),
};

module.exports = {
  data,
};
