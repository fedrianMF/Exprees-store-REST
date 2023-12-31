
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos')

const { usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y ams de 6 letras').isLength({ min: 6 }),
    check('correo', 'El formato del correo no es valido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async (rol = '') => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
      }
    }),
    validarCampos
  ],
  usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;