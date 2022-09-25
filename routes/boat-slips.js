const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    let boatSlips = JSON.parse(fs.readFileSync('boat-slips.json'));
    res.status(200).json(boatSlips);    
    })
    .post('/', (req, res) => {
    let boatSlips = JSON.parse(fs.readFileSync('boat-slips.json'));
    let vesselName = req.body.vesselName;
    let found = false;
    boatSlips.forEach(element => {
        if (element.vacant == true && !found) {
            element.vesselName = vesselName;
            element.vacant = false;
            fs.writeFileSync('./boat-slips.json', JSON.stringify(boatSlips, 2, null), 'utf-8');
            res.status(200);
            res.json({
                "slipNumber": element['slipNumber']
            });
            found = true;
        }
    });
    if (!found) {
        res.status(409);
        res.json({
            'Message': 'There are no available boat slips.'
        });
    }
    })
    .put('/:slipNumber/vacate', (req, res) => {
    let boatSlips = JSON.parse(fs.readFileSync('boat-slips.json'));
    let slipNumber = req.params.slipNumber;

    if (boatSlips[slipNumber - 1].vacant == false) {
        boatSlips[slipNumber - 1].vacant = true;
        delete boatSlips[slipNumber - 1].vesselName;
        fs.writeFileSync('./boat-slips.json', JSON.stringify(boatSlips, 2, null), 'utf-8');
        res.status(204);
        res.json();
    } else {
        res.status(409);
        res.json({
            'Message': `Boat slip ${slipNumber} is currently vacant`
        });
    }
    });

module.exports = router;