var express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Music {
    name: String,
    type: String
  }

  type Query {
    hello: [Music]
  }
`);

 

var root = { hello : () => [{name:'Hello world! grasql', type:'mp3'}] };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));