const Users = require('../../models/user.model.js');
const Product = require('../../models/product.model.js');
const Auction = require('../../models/auction.model.js');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const Bid = require('../../models/bid.model.js');
const actionCreate = (Model, params, callback) => {
    return Model.create({
        ...params
    }).then(res => {
        return res.toJSON()
    }).then(data => {
        return callback(undefined, {
            ...data
        })
    }).catch(err => {
        callback(err,undefined)
    })
}
const transformParam = async (Model, id,callback) => {
    return Model.findByPk(id)
        .then(res => {
            return res.toJSON()
        }).then(data => {
            return callback(undefined, {
                ...data,
            })
        }).catch(err => {
            return callback(err,undefined)
        })
}
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
        const data = await actionCreate(Users, { id: uuid.v4(), ...userInput, password: hashedPassword }, (err, response) => {
            if (err) {
                return err;
            }
            return {
                ...response,
                password: null,
            }
        })
        return data;
    },
    createProduct: async ({ productInput }) => {
       
        // you need to verify if the current user is confirming to add the same product 
        const data = await actionCreate(Product, { ...productInput }, (err, response) => {
            if (err) {
                return err;
            }
            return {
                ...response,
                creator: transformParam(Users, response.UserId, (err, res) => { 
                    if (err) {
                        return err
                    }
                    return res;
                })
            }
        })
        return data;
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
                    creator: transformParam(Users,prod.UserId,(err, res) => { 
                        if (err) {
                            return err
                        }
                        return res;
                    }),
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
            creator: transformParam(Users,product.UserId,(err, res) => { 
                if (err) {
                    return err
                }
                return res;
            })
        }
    },
    createAuction:async ({ auctionInput }) => {
        // first find product. if no product throw error
        const product = Product.findByPk(auctionInput.productID);
        if (!product) {
            throw new Error("Product doesn't exist");
        }
        const newAuction = await actionCreate(Auction, {
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
        }, (err, res) => {
            if (err) {
                return err
            }
            return {
                ...res,
                product: transformParam(Product, productId, (err, res) => {
                    if (err) {
                        return err;
                    }
                    return res;
                })
            }
        });
        console.log(newAuction);
        return newAuction;
    },
    updateAuction: async ({ id }) => {
        // require that the user who made the auction is the one updating the auction
        const auction = await Auction.findByPk(id);
        if (!auction) {
            throw new Error("Auction doesn't exist");
        }
        return auction;
    },
    auctions: async () => {
        const auctions = await Auction.findAll();
        return auctions.map(auction => {
            return {
                ...auction,
                prod: transformParam(Product, auction.productID, (err, res) => {
                    if (err) {
                        return err;
                    }
                    return {
                        ...res,
                        creator: transformParam(Users, creator, (err, res) => {
                            if (err) {
                                return err;
                            }
                            return res;
                        })
                    };
                }),
            }
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