// server/services/ics.service.js

const fs = require('fs').promises;

module.exports = {
    /**
     * 
     * @param {string} file path to file,
     * for example '/Users/user/calendar.ics'
     * @returns promise of events array with properties from file
     */
    readIcs: async (file) => {
        let events = [];
        const icsString = await fs.readFile(file, 'utf-8');
        // console.log(` ics-reader.js | icsString ${icsString}`);
        const lines = icsString.split('\n');
        let event;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === 'BEGIN:VEVENT') {
                event = {};
            } else if (line === 'END:VEVENT') {
                events.push(event);
                event = {};
            } else if (event) {
                const match = /^([A-Z]+):(.*)$/.exec(line);
                if (match) {
                    const [, key, value] = match; event[key] = value;
                }
            }
        }
        // console.log(` ics-reader.js | events ${events}`);
        return events;
    },

    writeIcs: async (events) => {
        return 'NOT IMPLEMENTED: writeIcs';
    }
};
