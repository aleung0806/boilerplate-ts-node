// import authService from "../services/auth.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";

import { StatusCodes } from 'http-status-codes'
import logger from '../utils/logger'
import passport from 'passport';
// import LocalStrategy from 'passport-local'.Strategy;

export const register = async (req, res, next) => {
  const user = await userService.create(req.body)
  res.status(StatusCodes.CREATED).send({user})
};

export const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.verify(email, password);
  req.session.user = user
  res.status(StatusCodes.OK).send({user})
};

export const logout = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.verify(email, password);
  await req.session.destroy()
  res.status(StatusCodes.OK).send('user is logged out')
};

export const verify = async (req, res, next) => {
  if(req.session === null){
    res.status(StatusCodes.OK)
  }else{
    res.status(StatusCodes.OK).send(req.session.user)
  }
};


// const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send("fields are missing");
//   }

//   try {
//     const user = await service.login(email, password);

//     req.session.regenerate((err) => next(err));
//     req.session.user = user;
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).send("incorrect email or password");
//   }
// };

// const logout = async (req, res, next) => {
//   req.session.destroy((err) => next(err));
//   res.send("you are now logged out");
// };

// const verify = async (req, res, next) => {
//   console.log(req.session);
//   const user = req.session.user;
//   if (user !== null) {
//     console.log(user);
//     res.send(user);
//   } else {
//     res.send("not logged in");
//   }
// };

export default {
  register,
  login,
  logout,
  verify
}