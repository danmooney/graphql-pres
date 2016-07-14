import express from 'express';
import graphQLHTTP from 'express-graphql';
import clean from 'require-clean';
import chokidar from 'chokidar';

const GRAPHQL_PORT = 3000;
const watcher = chokidar.watch('./data/{database,schema}.js');

let graphQLServer;
let graphQLApp = express();

watcher.on('change', path => {
	console.log(`${path} changed. Restarting.`);
    
    graphQLServer.close();
    clean('./data/schema');
	startGraphQLServer();
});

function startGraphQLServer () {
    let {schema} = require('./data/schema');

    graphQLApp.use('/', graphQLHTTP({
        graphiql: true,
        pretty: true,
        schema
    }));

    graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
        console.log(
            `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
        );
    });
}

startGraphQLServer();
