const Users = require('../../models/user.model.js');
const Product = require('../../models/product.model.js');
const Auction = require('../../models/auction.model.js');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const Bid = require('../../models/bid.model.js');

module.exports = {
    login: ({ }) => {
        return {
            userId: '3453fvfeg445',
            token: 'fdgvf45645gfvee45y4bgvrt',
            tokenExpiration: 5
        }
    },
    createUser: async ({ userInput }) => {
        const email = userInput.email;
        const userExists = await Users.findOne({ email });
        if (userExists) {
            throw new Error("Users exists");
        }
        const hashedPassword = await bcryptjs.hash(userInput.password, 12);
        const user = await Users.create({
            id: uuid.v4(),
            ...userInput,
            password: hashedPassword
        });
        // console.log(user);
        return user;
    },
    createProduct: async ({ productInput }) => {
        const productExists = await Product.findOne({ imageUrl: productInput.imageUrl })
        if (productExists) {
            throw new Error("Product exits");
        }
        const product = await Product.create({
            ...productInput,
            UserId: productInput.creator
        });
        console.log(product);
        return product;
    },
    updateProduct: async ({ id, productInput }) => { 
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error("Product doesn't exist");
        }
        await product.update({
            ...productInput
        });
        await product.save();
        return product;
    },
    deleteProduct:async ({ id}) => {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error("Product doesn't exist");
        }
        return product
        .destroy()
        .then(() => {
            return true
        })
        .catch(err => {
            console.log(err);
            return false;
        })
    },
    products: async () => {
        try {
            const products = await Product.findAll();
            return products.map(prod => {
                prod = prod.toJSON();
                return {
                    ...prod,
                    creator: () => {
                        return Users.findByPk(prod.UserId)
                        .then(user=>{return user.toJSON()})
                        .then(user => {
                            console.log(user);
                            return {
                                ...user,
                                password: null
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    product: async ({ id }) => {
        let product = await Product.findByPk(id);
        if (!product) {
            throw new Error("Product doesn't exist");
        }
        // console.log(product);
        product = product.toJSON();
        return {
            ...product,
            creator: () => {
                return Users.findByPk(product.UserId)
                .then(result => { return result.toJSON() })
                .then(user => {
                    console.log(typeof user);
                    return {
                        ...user,
                        password: null
                    };
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    },
    createAuction: ({ auctionInput }) => {
        // first find product. if no product throw error
        const product = Product.findByPk(auctionInput.productID);
        if (!product) {
            throw new Error("Product doesn't exist");
        }
        const newAuction = Auction.create({
            id: uuid.v4(),
            product: product.id,
            bids: [],
            auctionWinner: '',
            auctionStartTime: new Date(auctionInput.auctionStartTime),
            auctionEndTime: new Date(auctionInput.auctionEndTime),
            auctionCurrentPrice: 0,
            auctionIncrementPrice: 0,
            auctionIncrementTime: 0, // changes wth changes in time
            auctionStatus: false,
            ...auctionInput,
        });
        return newAuction;
    },
    auctions: async () => {
        const auctions = await Auction.findAll();
        return auctions.map(auction => {
            return Product.findByPk(auction.productID)
            .then(prod => { return prod.toJSON() })
            .then(product => {
                return {
                ...product
                }
            })
        })
    },
    auction: async ({ id }) => {
        const auction = await Auction.findByPk(id);
        if (!auction) {
            throw new Error("Auction doesn't exist");
        }
        auction = auction.toJSON();
        return {
            ...auction,
            product: () => {
                return Product.findByPk(auction.UserId)
                .then(result => { return result.toJSON() })
                .then(auction => {
                    return {
                        ...auction,
                    };
                })
                .catch(err => {
                    console.log(err);
                })
            },
            bids: bids.forEach(bid => {
                return Bid.findByPk(bid.UserId)
                .then(res => { return res.toJSON() })
                .then(res => {
                    return {
                        ...res
                    }
                })
            })
        }
    },
    bids: async () => {
        const bids = await Bid.findAll();
        return bids.map(bid => {
            bid = bid.toJSON();
            return {
                ...bid,
                user: () => {
                    return Users.findByPk(prod.UserId)
                    .then(user=>{return user.toJSON()})
                    .then(user => {
                        console.log(user);
                        return {
                            ...user,
                            password: null
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                },
                product: () => {
                    return Product.findByPk(bid.product)
                    .then(prod=>{return prod.toJSON()})
                    .then(prod => {
                        console.log(prod);
                        return {
                            ...prod,
                            password: null
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            }
        })
    },
    bid: async ({ id }) => {
        const bid = await Bid.findByPk(id);
        if (!bid) {
            throw new Error("Bid doesn't exist");
        }
        bid = bid.toJSON();
        return {
            ...bid,
            user: () => {
                return Users.findByPk(prod.UserId)
                .then(user => { return user.toJSON() })
                .then(user => {
                    console.log(user);
                    return {
                        ...user,
                        password: null
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            },
            product: () => {
                return Product.findByPk(bid.product)
                .then(prod=>{return prod.toJSON()})
                .then(prod => {
                    console.log(prod);
                    return {
                        ...prod,
                        password: null
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    },
    search: async ({ text }) => {
        const products = await Product.findOne({
            where: {
                title: text
            }
        });
        const bids = await Bid.findOne({
            where: {
                product: text
            }
        });
        const auctions = await Auction.findAll();
        const result = [...products, ...bids, ...auctions];
        console.log(result);
        return result;
    }
}