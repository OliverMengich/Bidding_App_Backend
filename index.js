const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema/schema.graphql.js');
const graphqlResolvers = require('./graphql/resolvers/resolvers.graphql.js');
const sequelize = require('./database/db.js');
const app = express();
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const Auction = require('./models/auction.model.js');
const Bid = require('./models/bid.model.js');
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
Bid.belongsTo(Auction);
Auction.hasMany(Bid, { constraints: true, onDelete: 'CASCADE' })
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