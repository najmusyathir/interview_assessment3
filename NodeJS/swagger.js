const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const main = require('./main');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 
}));

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./main.js'],
};

const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', main);

app.use('/queue', main);
app.use('/insertQueue', main);
app.use('/deleteQueue', main);

app.use('/counterQueue', main);
app.use('/insertQueueInCounter', main);
app.use('/removeQueueFromCounter', main);
app.use('/counterActiveStatus', main);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
