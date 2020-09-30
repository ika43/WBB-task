import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'WBB TASK REST API',
    version: '1.0.0',
  },
  host: `localhost:${process.env.SERVER_PORT}`,
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./src/docs/**/*.yaml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);