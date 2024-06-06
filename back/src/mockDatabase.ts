const bcrypt = require("bcrypt");

// This is a password-hashing algorithm that allows to encrypt the data
//@ts-ignore
const cryptPassword = function (password, callback) {
  //@ts-ignore
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);
    //@ts-ignore
    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });
  });
};
//@ts-ignore
cryptPassword("EasyDemo123", (err, hash) => ({ err, hash }));
//@ts-ignore
cryptPassword("123DemoEasy", (err, hash) => ({ err, hash }));

export const allowedUsers = {
  richard: {
    email: "richard@gmail.com",
    password: "$2b$10$cknWjcOyfmF5oq2HKyF.x.ypOT5zEt.zrmJ990dy7fWMBaOq5cd9i", // EasyDemo123
  },
  lucy: {
    email: "lucy@gmail.com",
    password: "$2b$10$pCmgZQTs.BKoPrVI1AFSvu2LejXEn8UinWQIyGGbyKSwqeoMye5t6", // 123DemoEasy
  },
};
