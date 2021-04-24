const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const BlueBird = require('bluebird');
const {defaultUser} = require('../config/setting');
chai.use(chaiHttp);
let token = "";

describe('product-cart-api', () => {

    before(async () => {
        chai.request(server).get('/')
    })

    beforeEach(async () => {
        //
    })

    afterEach(async () => {
        //
    })

    it('user login success :POSITIVE', async () => {
        const response = await chai.request(server).post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({"email":defaultUser[0].user_email,"password":"Test@1234"})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("data");
        response.body.data.should.have.property("token");
        response.body.data.user_email.should.eql(defaultUser[0].user_email);
        token = response.body.data.token;
    });

    it('user login fail :NEGATIVE', async () => {
        const response = await chai.request(server).post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({"email":defaultUser[1].user_email,"password":"Test@12345"})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Invalid credentials");
    });

    it('user login with user_status :NEGATIVE', async () => {
        const response = await chai.request(server).post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({"email":defaultUser[2].user_email,"password":"Test@1234"})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Seems like the account is inactive");
    });

    it('user login with user_block :NEGATIVE', async () => {
        const response = await chai.request(server).post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({"email":defaultUser[3].user_email,"password":"Test@1234"})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Seems like the account is blocked");
    });

    it('get products without Authorization :POSITIVE', async () => {
        const response = await chai.request(server).get('/products')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        response.should.have.status(401);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Invalid Token");
    });

    it('get products with Authorization :POSITIVE', async () => {
        const response = await chai.request(server).get('/products')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.data.should.be.a("array");
    });

    it('get cart for a specific user when on products in cart when cart is empty :NEGATIVE', async () => {
        const response = await chai.request(server).get('/products/cart')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property('data')
        expect(response.body.data).to.equal(null)
    });

    it('product add to cart count(1): product_id:1 exist in db :POSITIVE', async () => {
        const response = await chai.request(server).post('/products/cart/add')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send({"product_id":1})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Success");
    });

    it('product add to cart count(2): product_id:1 exist in db :POSITIVE', async () => {
        const response = await chai.request(server).post('/products/cart/add')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send({"product_id":1})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Success");
    });

    it('product add to cart count(0): product_id:11 ot exist in db :NEGATIVE', async () => {
        const response = await chai.request(server).post('/products/cart/add')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send({"product_id":11})
        response.should.have.status(400);
        response.body.should.be.a("object");
        response.body.msg.should.eql("ID not found");
    });

    it('user product to cart : product_id:2 exist in db :POSITIVE', async () => {
        const response = await chai.request(server).post('/products/cart/add')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send({"product_id":2})
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.msg.should.eql("Success");
    });

    it('get cart for a specific :POSITIVE', async () => {
        const response = await chai.request(server).get('/products/cart')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property('data')
        response.body.data.should.be.a("array");
        response.body.data[0].should.have.property('count')
    });
});
