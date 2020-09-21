var express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');

const user = [
    {id:1,name:'1',age:'1'},
    {id:2,name:'2',age:'2'},
    {id:3,name:'3',age:'3'},
    {id:4,name:'4',age:'4'}
]

var schema = buildSchema(`
  type Cat {
    id:Int!
    name:String!
  }

  type Query {
    hello: String,
    user : [Cat],
    findCat(id: ID!): Cat
  }

  input CreateCat {
    name: String!
  }

  type Mutation {
    createCat(cat: CreateCat): [Cat]
    updateCat(id: ID!, name: String!): [Cat]
  }

`);
//查询数据
/* {
  findCat(id:2){
    id name
  }
} */
//增加数据
/* mutation {
  createCat(cat:{name: "qqq"}) {
    name id
  }
} */
//修改数据
/* mutation {
  updateCat(id: 2, name: "new name") {
    name id
  }
} */





var root = {
   hello: () => "Hello world 233!",
  user: () => user,
  findCat({id}) {
    return user.find( (item) =>{return item.id == id} )
},
createCat({ cat }) {
  user.push({ id: user.length + 1, name: cat.name });
  return user;
},
updateCat({ id, name }) {
  user.find(el => el.id == id).name = name;
  return user;
}
}


var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));