const fs = require('fs');

// log separator
const logSeparator = text => {
  text = text.split('')
          .join('-')
          .replace(' ', '--')
          .toUpperCase();

  console.log(
`
----------------${text}----------------
`
  );
};

// read file
const readFile = (fileName, cb) => {
  fs.readFile(fileName, 'utf8', (err, content) => {
    if(err) throw err;
    files = content.split(`\n`);
    cb(files);
  });
};

// create single file
const createSingleFile = (name, fileFormat) => {
  const resolvedFileName =
    `${name.split(` `).join(`_`)}${fileFormat === ''? '' : `.${fileFormat}`}`;

  fs.writeFile(resolvedFileName, '', err => {
    if(err)
      return console.error(`${name}: file can't be created! \n`);
    console.log(`${name} file created! \n`);
  });
};

// read file and then create all the files from the names given in that file
const createMultipleFiles = (fileName, fileFormat) => {
  readFile(fileName, files => {
    // log separator
    logSeparator("creating files");

    files.forEach(name => {
      if(name !== '')
        createSingleFile(name, fileFormat);
    });
  });
};

// delete file
const deleteSingleFile = name => {
  const resolvedFilePath = name;

  fs.unlink(resolvedFilePath, err => {
    if(err)
      return console.error(`${name}: file not found! \n`);
    console.log(`${name} file deleted! \n`);
  });
};

// delete multiple files whose name is given in the file
const deleteMultipleFiles = fileName => {
  readFile(fileName, files => {
    // log separator
    logSeparator("deleting files");

    files.forEach(name => {
      if(name !== '')
        deleteSingleFile(name);
    });
  });
};

const action = process.argv[2].toString().toUpperCase();

// read fileName from command line argument
const fileName = process.argv[3];

const fileFormat = process.argv[4];

switch (action) {
  case 'CREATE':
    createMultipleFiles(fileName, fileFormat === undefined ? '' : fileFormat);
    break;

  case 'DELETE':
    deleteMultipleFiles(fileName);
    break;

  case 'HELP':
  console.log(
`
VALID COMMANDS:

1. CREATE
ex - node fileManager create <file_name> <format>
2. DELETE
ex - node fileManager delete <file_name>
`
  );
  break;

  default:
    console.log(
`
PLEASE ENTER A VALID ARGUMENT FOR FILE ACTIONS!

VALID ARGUMENTS:

1. CREATE
ex - node fileManager <file_name> create <format>
2. DELETE
ex - node fileManager <file_name> delete <format>
`
    );
}
