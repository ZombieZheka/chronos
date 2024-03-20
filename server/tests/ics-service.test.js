// server/tests/ics-service.test.js

const path = require('path');
const {
    readIcs,
    writeIcs
} = require('../services/ics.service');
const file = path.resolve('public/files/interview.ics');

async function readTest() {
    console.log('| readTest |');
    const events = await readIcs(file);
    console.log('------------------------------------------------');
    events.forEach((event, index) => {
        console.log(`Подія ${index + 1}:`);
        Object.entries(event).forEach(([key, value]) => {
            console.log(`\t${key}: ${value}`);
        });
        console.log('------------------------------------------------');
    });
}

async function writeTest() {
    console.log('| writeTest |');
    console.log('------------------------------------------------');
    console.log('NOT IMPLEMENTED: writeTest');
    console.log('------------------------------------------------');
}

async function icsServiceTest() {
    console.log('------------------------------------------------');
    await readTest();
    await writeTest();
}

// icsServiceTest();

module.exports = {
    icsServiceTest
}
