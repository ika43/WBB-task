import fs from 'fs';
import { IPerson } from '../endpoint/person.interface';
import Person from '../endpoint/person.model';
import logger from '../lib/logger';

const mapName = new Map();

export function parseNamesAndCreateMap (): void {
    const namesReadStream = fs.createReadStream('src/data/first-names.txt', { encoding: 'utf8'});
    
    namesReadStream.on('data', function(chunk) {
        chunk.toString().split('\n').map(item => mapName.set(item.trim(), 0));
    });
    namesReadStream.on('end',function() {
        parseNovelAndCountNames();
    });

    namesReadStream.on('error', function(err) {
       logger.error(err.stack);
    });
}

function parseNovelAndCountNames (): void {
    const novelReadStream = fs.createReadStream('src/data/oliver-twist.txt', { encoding: 'utf8' });

    novelReadStream.on('data', function(chunk) {
       const array = chunk.toString().split(/\s+/); // split text on new line and empty spaces
       array.map(item => {
           const el = item.replace(/[^a-zA-Z ]/g, ''); // remove all special characters
           if (mapName.has(el)) {
               mapName.set(el, mapName.get(el) + 1);
           }
       });
    });

    novelReadStream.on('end',function() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const helperArray: any = [];
        mapName.forEach((value, key) => helperArray.push({ name: key, count: value}));
        helperArray.sort((a: IPerson, b: IPerson) => b.count - a.count);
        writeResultToFile(helperArray);
    });

    novelReadStream.on('error', function(err) {
       logger.error(err.stack);
    });
}

function writeResultToFile (array: [IPerson]): void {
    if (!fs.existsSync('src/data/output.txt')) Person.insertMany(array); // only for REST API purpose
    const writerStream = fs.createWriteStream('src/data/output.txt');
    
    array.map(item => writerStream.write(`${item.name}: ${item.count}\n`,'utf8'));
    writerStream.end();
    
    writerStream.on('finish', function() {
       logger.info('Write completed');
    });
    
    writerStream.on('error', function(err) {
        logger.error(err.stack);
    });
}

// function getSortedIndex(array: [IPerson], value: IPerson) {
//     let low = 0;
//     let high: number = array.length;
//     while (low < high) {
//         const mid = (low + high) >>> 1;
//         if (array[mid].count > value.count) low = mid + 1;
//         else high = mid;
//     }
//     return low;
// }

