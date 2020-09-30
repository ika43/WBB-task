import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../src/app';
import Person from '../src/endpoint/person.model';

chai.use(chaiHttp);

describe('WBB REST API TEST', () => {
    before(async () => Person.create({ name: 'Test', count: 10}));
    after(async () => {
        await Person.deleteMany({});
        fs.unlinkSync('src/data/output.txt');
    });
    it('should have GET /', async function () {
        const res = await chai.request(app).get('/');
        expect(res.status).to.equal(200);
    });
    it('should have GET /name-count', async function () {
        const res = await chai.request(app).get('/name-count').query({ name: 'Test'});
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body).to.haveOwnProperty('name');
        expect(res.body).to.haveOwnProperty('count');
    });
    it('should return 400 GET /name-count without params', async function() {
        const res = await chai.request(app).get('/name-count');
        expect(res.status).to.equal(400);
    });
    it('should not have GET /random-route', async function() {
        const res = await chai.request(app).get('/random-route');
        expect(res.status).to.equal(404);
    });
});