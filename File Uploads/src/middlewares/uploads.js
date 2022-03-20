const path = require("path");

const multer = require("multer");

// storage function from multer npm by default

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads")); //path.join(__dirname,"../uploads")  for path
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now(); //Date.now = give you the date and time from 1st jan 1970 till now in m/s, after Date.now() it was present in original multer npm file (+ '-' + Math.round(Math.random() * 1E9))
    callback(null, uniquePrefix + "-" + file.originalname); //fieldname replace by originalname and file.originalname + '-' + uniqueSuffix replace by uniquePrefix + '-' + file.originalname
  },
});

// file fliter from multer npm
const fileFilter = (req, file, callback) => {
  // console.log({file});
  // The function should call `callback` with a boolean
  // to indicate if the file should be accepted

  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // To accept the file pass `true`, like so:
    callback(null, true);
  } else {
    // To reject this file pass `false`, like so:
    callback(null, false);
  }

  // You can always pass an error if something goes wrong:
  // callback(new Error('I don\'t have a clue!'))
};

// multer option object by default

const options = {
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //1024 byte * 1024 mb =1mb* 5 === 5mb
  },
};

// multer is function and every function in js is an object ,every array in js is an object
const uploads = multer(options);

module.exports = uploads;
