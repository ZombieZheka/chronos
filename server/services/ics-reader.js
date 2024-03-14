// server/services/ics-reader.service.js

"use strict"
const fs = require('fs');

class IcsReader {
    // err = null;
    events = [];
    constructor(file) {
        const icsString = fs.readFileSync(file)
        .then(data => {
            return data;
        }).catch(err => {
            // this.err = err;
            return null;
        });

        if (!icsString) {
            this.events = null;
            return;
        }

        const lines = icsString.split('\n');
        let event;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === 'BEGIN:VEVENT') {
                event = {};
            } else if (line === 'END:VEVENT') {
                events.push(event);
            } else if (event) {
                const match = /^([A-Z]+):(.*)$/.exec(line);
                if (match) {
                    const [, key, value] = match; event[key] = value;
                }
            }
        }
    }

    getEvents() {
        return this.events;
    }
}
