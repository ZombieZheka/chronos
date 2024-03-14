// server/services/ics-writer.service.js

"use strict"
const fs = require('fs');

class IcsWriter {
    events = [];
    constructor(file) {
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

    out(folder, filename) {
        return this.events;
    }
}