const { validationResult } = require('express-validator');



const validarCampos = (req, res, next) => {
  const validations = validationResult(req);
  if (!validations.isEmpty()) {
    return res.status(400).json(validations);
  }

  next();
}

module.exports = {
  validarCampos
}