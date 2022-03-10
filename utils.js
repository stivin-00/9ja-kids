import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'ekeleagbakwuru9@gmail.com',
      pass: 'vivian#2436'
  }
});

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};


export const newRegisterEmailTemplate = (createdUser) => {
  return `<h1>A new member just join us</h1>
  <h2>Hi ${createdUser.name}</h2>
  <h2>Your Account Details is.</h2>
  <hr/>
  <h3>ID:  ${createdUser._id}</h3>
  <h3>NAME:  ${createdUser.name}</h3>
  <h3>EMAIL:  ${createdUser.email}</h3>
  <br/>
  <br/>

  <div style="position: center; background: blue; color: white; width: 100px; height:25px; border-radius: 20px; text-align: center;">
  <a href="https://9ijakids.herokuapp.com/" style="position: center; background: blue; color: white; text-align: center; text-decoration: none;"><h4>Back to app</h4></a>
  </div>
  `;
};

