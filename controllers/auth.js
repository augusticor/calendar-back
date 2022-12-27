const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'One user exists with that email',
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
      msg: 'New user created',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal error',
    });
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'The user does not exist',
      });
    }

    // Check passwords
    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect password',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
      msg: 'User logged in',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal error',
    });
  }
};

const renewToken = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: '',
  });
};

module.exports = { createUser, login, renewToken };
