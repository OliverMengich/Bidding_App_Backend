const {buildSchema} = require('graphql');
module.exports = buildSchema(`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String
    }
    type Product {
        id: ID!
        title: String!
        category: String!
        imageUrl: String!
        creator: User
        regularPrice: Float!
        auctionPrice: Float!
        auctionStatus: Boolean!
        auctionStartTime: String!
        auctionEndTime: String!
        createdAt: String!
        updatedAt: String!
    }
    type Bid {
        id: ID!
        user: User!
        product: Product!
        bidPrice: Float!
        bidTime: String!
        createdAt: String!
        updatedAt: String
    }
    type Auction {
        id: ID!
        product: Product!
        bids: [Bid!]!
        auctionStatus: Boolean!
        auctionWinner: User!
        auctionStartTime: String!
        auctionEndTime: String!
        auctionStartPrice: Float!
        auctionCurrentPrice: Float!
        auctionIncrement: Float!
        auctionIncrementTime: Float!
        auctionIncrementPrice: Float!
        createdAt: String!
        updatedAt: String!
    }
    input AuctionInput {
        productID: ID!
        auctionStatus: Boolean!
        auctionStartTime: String!
        auctionEndTime: String!
        auctionStartPrice: Float!
    }
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    input ProductInputData {
        title: String!
        category: String!
        creator: ID!
        imageUrl: String!
        regularPrice: Float!
        auctionPrice: Float!
        auctionStatus: Boolean!
        auctionStartTime: String!
        auctionEndTime: String!
    }
    type RootQuery {
        login(email: String!, password: String!): AuthData!
        products: [Product!]
        product(id: ID!): Product!
        auctions: [Auction!]!
        auction(id: ID!): Auction!
        bids: [Bid!]!
        bid(id: ID!): Bid!
        
    }
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createProduct(productInput: ProductInputData): Product!
        updateProduct(id: ID!, productInput: ProductInputData): Product!
        deleteProduct(id: ID!): Boolean!
        createAuction(auctionInput: AuctionInput): Auction
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
