
const { db } = require('..');
const { User } = db.models;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { jwtOptions } = require('../../passport')
const RegisterUser = (data) => {
  return new Promise(async (resolve, reject) => {
    await bcrypt.hash(data.password, saltRounds, function (err, hash) {
      data.password = hash
      console.log(data)
      const user = User.create(data);
      resolve(user)
    });

  });
}
const login = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("here", data)
    const { email, password } = data
    if (email && password) {
      // we get the user with the name and save the resolved promise
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        reject({ msg: "No such user found", user });
      }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err)
        reject(err)
        else{
          if (!result) {
            reject({ msg: "Password is incorrect" });
          }
          else{
            
            // from now on we’ll identify the user by the id and the id is
            // the only personalized value that goes into our token
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            resolve({ msg: "ok", token: token });
          } 
        }
      });
      
    }
  })
}

const allUsers = () => {
  console.log("test")
  return new Promise(async (resolve, reject) => {
    const users = User.findAll();
    resolve(users)
  });
}

module.exports = { RegisterUser, allUsers, login }