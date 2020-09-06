const ip = require("ip");
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');

const app = express();
const PORT = 3005;

mongoose.connect(
    "mongodb+srv://graphql-tutorial:NB8HInhrtuOnDJ9D@somesoap.9a9oe.mongodb.net/graphql-tutorial?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', console.error);
dbConnection.once('open', ()=>console.log("Connected to DB"));


app.listen(PORT, (err) => {
    if(err) {
        console.error(err)
    } else {
        console.log(`App is launched at: http://${ip.address()}:${PORT}`);
    }
});
