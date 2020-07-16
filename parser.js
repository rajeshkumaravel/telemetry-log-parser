'use strict';

const fs    = require('fs');
const path  = require('path');
const _     = require('lodash');

const dataPath = process.argv[2];

// Check file arguments path exists
if (!fs.existsSync(process.argv[2])) {
  throw new Error('File path doesn\'t exists. Please check the file path provided.');
}

// Create output folder under data folder
if (!fs.existsSync(dataPath + '/output/')) {
  fs.mkdirSync(path.resolve(dataPath + '/output/'), { recursive: true }, (err, ok) => {
    if (err) {
      throw new Error('Error while creating output folder under directory [ ' + dataPath + ' ]');
    }
  });
}

try {
  // Read folder for list of file(s)
  fs.readdir(dataPath, (err, files) => {
    files.forEach(file => {
      if (fs.statSync(dataPath + '/' + file).isFile()) {
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(dataPath + '/' + file)
        });
        var i = 0;
        var imp_array = '';
        function writeToFile(fileName, data) {
          fs.writeFile(fileName, data, function (err) {
            if (err) return console.log(err);
          });
        }

        lineReader.on('line', function (line) {
          if (line) {
            var json;
            try {
              json = JSON.parse(line);
            } catch (error) {
              throw new Error('Parsing error for file ==> [ ' + file + ' ]');
            }
            i++;
            // *****************************************
            //  Change the condition accordingly
            // *****************************************
            if (_.get(json, "context.pdata.pid") === "sunbird-portal.contentplayer") {
              imp_array += line + '\n';
            }
          }
        });
  
        lineReader.on('close', () => {
          const _fileToSave = 'output' + '/' + file;
          console.log('DONE...[ ' + dataPath + '/' + _fileToSave + ' ]');
          writeToFile(dataPath + '/' + _fileToSave, imp_array);
        });
      }
    });
  });
} catch (error) {
  throw new Error('File parsing failed. Error => ', error);
}