const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema/schema.graphql.js');
const graphqlResolvers = require('./graphql/resolvers/resolvers.graphql.js');
const sequelize = require('./database/db.js');
const app = express();
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
}));
sequelize
    .sync() 
    .then(() => {
    app.listen(4000, () => {
        console.log('Server running at port 4000')
    });
}).catch(err => {
    console.log(err);
})