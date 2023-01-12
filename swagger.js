const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Lesson 4 API',
    description: 'Lesson 4 API'
  },
  host: 'cse341-lesson4.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);