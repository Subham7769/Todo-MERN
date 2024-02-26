const validator = require('validator');

const userDataValidation = ({ name, email, username, password }) => {
  return new Promise((resolve, reject) => {
    console.log(name, email, username, password );

    if (!name || !email || !username || !password) 
        reject("Missing Credentials");
        
    if(typeof name !== 'string')reject("Name is not a string");
    if(typeof email !== 'string')reject("Email is not a string");
    if(typeof username !== 'string')reject("Username is not a string");
    if(typeof password !== 'string')reject("Password is not a string");

    if (username.length <=2 || username.length >=20 ) 
      reject("Username length must be between 2 and 20 characters");

    if (password.length <=2 || password.length >=20 ) 
      reject("Password length must be between 2 and 20 characters");

    if(validator.isAlphanumeric(password))
      reject("Password must be alphanumeric i.e. a-z, A-Z and 0-9");

    if(validator.isEmail(email))
      reject("Email format is incorrect");


    resolve();
  });
};

module.exports = { userDataValidation };
