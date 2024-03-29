"use strict";

const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mysqlPool = require("../../databases/mysql-pool");

const AccountNotActivatedError = require("./errors/account-not-activated-error");

async function validateData(payload) {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  };

  return Joi.validate(payload, schema);
}

async function login(req, res, next) {
  /**
   *Validate input data with Joi
   */
  const accountData = { ...req.body };
  try {
    await validateData(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  /**
   * Check if the user exists in the database
   */
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT
    id, uuid, email, password, activated_at
    FROM users
    WHERE email = '${accountData.email}'`;

    // const result = connecgtion.query(sqlQuery)[0]
    const [result] = await connection.query(sqlQuery);
    if (result.length === 1) {
      const userData = result[0];

      if (!userData.activated_at) {
        const accountNotActivated = new AccountNotActivatedError(
          "you need to confirm the verification link"
        );

        return next(accountNotActivated);
      }

      /**
       * Check if the key is valid
       */
      const laPasswordEstaOk = await bcrypt.compare(
        accountData.password,
        userData.password
      );
      if (laPasswordEstaOk === false) {
        return res.status(401).send();
      }

      /**
       * Generate JWT token with uuid + role admin associated to the token
       * The duration of the token is 1 minute       *
       */
      const payloadJwt = {
        uuid: userData.uuid,
        role: "admin"
      };

      const jwtTokenExpiration = parseInt(
        process.env.AUTH_ACCESS_TOKEN_TTL,
        10
      );
      const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
        expiresIn: jwtTokenExpiration
      });
      const response = {
        accessToken: token,
        expiresIn: jwtTokenExpiration
      };

      return res.status(200).json(response);
    }

    return res.status(404).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
}

module.exports = login;
