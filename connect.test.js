// const app = require('./test-server.js');
const request = require('supertest');
const {app, startApp} = require('./app.js');

beforeAll(async () => {await startApp();});
describe('GET /players', () => {
    

    it('should return an array of players', async () => {
    const res = await request(app).get('/players');
    // console.log(res)
    expect(res.statusCode).toBe(200);
    // done();
    });
});


describe('GET /teams', ()=> {
    // beforeAll(async () => {
    //     await startApp();
    // });

    it('should return an array of teams', async () => {
        const res = await request(app).get('/teams');
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /arenas', ()=> {
    // beforeAll(async () => {
    //     await startApp();
    // });

    it('should return an array of teams', async () => {
        const res = await request(app).get('/arenas');
        expect(res.statusCode).toBe(200);
    });
});
describe('GET /positions', ()=> {
    // beforeAll(async () => {
    //     await startApp();
    // });

    it('should return an array of teams', async () => {
        const res = await request(app).get('/positions');
        expect(res.statusCode).toBe(200);
    });
});