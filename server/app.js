const ip = require("ip");
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');

const app = express();
const PORT = 3005;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(PORT, (err) => {
    if(err) {
        console.error(err)
    } else {
        console.log(`App is launched at: http://${ip.address()}:${PORT}`);
    }
});
