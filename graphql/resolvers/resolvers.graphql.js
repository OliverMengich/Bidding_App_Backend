const Users = require('../../models/user.model.js');
const Product = require('../../models/product.model.js');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
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
    }
}