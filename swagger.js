const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Team project',
    description: 'Team project'
  },
  host: 'team-project.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);