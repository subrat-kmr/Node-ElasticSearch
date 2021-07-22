const express = require('express');
const app = express();

app.use(express.urlencoded());
app.listen(3000, (req, res) => {
    console.log('Express API is running in the port 3000')
});
var elasticsearch = require('elasticsearch'),
    fs = require('fs'),
    jsonRecord = JSON.parse(fs.readFileSync(__dirname + '/pubs.json')), // name of my first file to parse
    csvRecord = fs.readFileSync(__dirname + '/csvRecord.csv'); // and the second set 
var client = new elasticsearch.Client({ // default is fine for me, change as you see fit
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({ //Check if ElasticSearch is Down
    requestTimeout: 1000
}, function(error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is running well');
    }
});


// For Uploading JSON File
for (var i = 0; i < jsonRecord.length; i++) {
    client.create({
        index: "epub", // name your index
        // type: "pub", // describe the data thats getting created
        id: i,
        body: jsonRecord[i]
    }, function(error, response) {
        if (error) {
            console.error('errrrr', error);
            return;
        } else {
            console.log('resssss', response);
        }
    });
}

// async function run() {

//     const { body } = await client.search({
//         index: 'epub',
//         body: {
//             query: {
//                 match: {
//                     BP_FirstName: 'Subrat'
//                 }
//             }
//         }
//     })

//     console.log(body)
// }
// run().catch(console.log)

// for (var a = 0; a < csvRecord.length; a++) { // Same stuff here, just slight changes in type and variables
//     client.create({
//         index: "form",
//         type: "csv",
//         id: a,
//         body: csvRecord[a]
//     }, function(error, response) {
//         if (error) {
//             console.error(error);
//             return;
//         } else {
//             console.log(response);
//         }
//     });
// }