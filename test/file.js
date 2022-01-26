//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Files', () => {
    beforeEach((done) => { //Before each test
        done();
    });
    // Test the /GET /api/files/list
    describe('/GET list file names', () => {
        it('it should GET all the file names', (done) => {
        chai.request(server)
            .get('/files/list')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
    });

    // Test the /GET /api/files/list
    describe('/GET list file names', () => {
        it('it should GET all the file names', (done) => {
        chai.request(server)
            .get('/files/list')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
    });

});