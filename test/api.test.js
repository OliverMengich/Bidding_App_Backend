const app = require('../index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
describe("BID API tests",(done)=>{
    describe("Gets products in Database",(done)=>{
        it("it should GET Products",(done)=>{
            let requestBody = {
                query: `
                    query{
                        products{
                            title,
                            price
                        }
                    }
                `
            }
            chai.request(app)
            .get("/graphql")
            .send(requestBody)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.data.should.have.property("products")
                res.body.data.should.have.property("products").with.length(3);
                done();
            })
        })
    })
})