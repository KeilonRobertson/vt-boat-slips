const request = require("supertest");
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/boat-slips', require('../routes/boat-slips'));

const boatSlipsPayload = [[
        { "slipNumber": 1, "vacant": true },
        { "slipNumber": 2, "vacant": true },
        { "slipNumber": 3, "vacant": true }
    ],
    [
        { "slipNumber": 1, "vacant": false, "vesselName": "Enterprise"},
        { "slipNumber": 2, "vacant": false, "vesselName": "The Black Pearl"},
        { "slipNumber": 3, "vacant": false, "vesselName": "Millenium Falcon"}
    ],
    [
        { "slipNumber": 1, "vacant": true},
        { "slipNumber": 2, "vacant": false, "vesselName": "The Black Pearl"},
        { "slipNumber": 3, "vacant": false, "vesselName": "Millenium Falcon"}
    ]
]

const vesselNames = ["Enterprise", "The Black Pearl", "Millenium Falcon"]

const postBoatPayload = [{
        "slipNumber": 1
    },
    {
        "slipNumber": 2
    },
    {
        "slipNumber": 3
    }
]
const noBoatSlipsMessage = {
    'Message': 'There are no available boat slips.'
}

const vacantMessage = {
    'Message': 'Boat slip 1 is currently vacant'
}

describe('Set json file', () => {
    //reset file back to base values
    test("should have the initial values", () => {
        fs.writeFileSync('./boat-slips.json', JSON.stringify(boatSlipsPayload[0], 2, null), 'utf-8');
        let boatSlips = JSON.parse(fs.readFileSync('boat-slips.json'));
        expect(boatSlips).toEqual(boatSlipsPayload[0]);
    });
});

describe('GET Request for boat-slips at start', () => {
    test("should return a 200 status code and json Payload", async () => {
        const res = await request(app).get('/boat-slips');
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toEqual(boatSlipsPayload[0]);
    });
});

describe('POST Request for boat-slips', () => {
    test("should return a 200 status code and json Payload containing newly added vessel", async () => {
        const res = await request(app).post('/boat-slips').send({
            "vesselName": vesselNames[0]
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toEqual(postBoatPayload[0]);
    });
    test("should return a 200 status code and json Payload containing newly added vessel", async () => {
        const res = await request(app).post('/boat-slips').send({
            "vesselName": vesselNames[1]
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toEqual(postBoatPayload[1]);
    });
    test("should return a 200 status code and json Payload containing newly added vessel", async () => {
        const res = await request(app).post('/boat-slips').send({
            "vesselName": vesselNames[2]
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toEqual(postBoatPayload[2]);
    });
    test("should return a 409 status code and json Payload containing status code and message", async () => {
        const res = await request(app).post('/boat-slips').send({
            "vesselName": vesselNames[2]
        });
        expect(res.statusCode).toBe(409);
        const data = JSON.parse(res.text);
        expect(data).toEqual(noBoatSlipsMessage);
    });
});

describe('GET Request for boat-slips after adding vessels', () => {
    test("should return a 200 status code and json Payload", async () => {
        const res = await request(app).get('/boat-slips');
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toEqual(boatSlipsPayload[1]);
    });
});

describe('PUT Request for boat-slips after adding vessels', () => {
    test("should return a 204 status code with NO JSON payload", async () => {
        const res = await request(app).put('/boat-slips/1/vacate');
        expect(res.statusCode).toBe(204);
        expect(res.text).toEqual('');
    });

    test("should return a 409 status code and json Payload", async () => {
        const res = await request(app).put('/boat-slips/1/vacate');
        expect(res.statusCode).toBe(409);
        const data = JSON.parse(res.text);
        expect(data).toEqual(vacantMessage);
    });
});

describe('GET Request for boat-slips after updating', () => {
    test("should return a 200 status code and json Payload", async () => {
        const res = await request(app).get('/boat-slips');
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toEqual(boatSlipsPayload[2]);
    });
});

describe('Reset json file', () => {
    //reset file back to base values
    test("should have the initial values", () => {
        fs.writeFileSync('./boat-slips.json', JSON.stringify(boatSlipsPayload[0], 2, null), 'utf-8');
        let boatSlips = JSON.parse(fs.readFileSync('boat-slips.json'));
        expect(boatSlips).toEqual(boatSlipsPayload[0]);
    });
});
