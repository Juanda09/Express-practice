const { body } = require('express-validator');

// Validaciones del usuario para la creación
exports.validateUserCreate = [
    // Validación del nombre: debe estar presente y no vacío
    body('name').notEmpty().withMessage('El nombre es requerido'),

    // Validación del apellido: debe estar presente y no vacío
    body('last_name').notEmpty().withMessage('El apellido es requerido'),

    // Validación de la edad: debe estar presente, ser un número entero y no vacío
    body('age').notEmpty().withMessage('La edad es requerida').isInt().withMessage('La edad debe ser un número entero'),

    // Validación del correo electrónico: debe estar presente, ser un correo electrónico válido y no vacío
    body('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('Formato de correo electrónico inválido'),

    // Validación de la contraseña: debe estar presente, tener al menos 8 caracteres y cumplir con ciertos requisitos de complejidad
    body('password').notEmpty().withMessage('La contraseña es requerida').isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres y contener al menos un dígito, una letra minúscula, una letra mayúscula y un carácter especial')

];

// Validaciones del usuario para la actualización
exports.validateUserUpdate = [
    // Validación del nombre: opcional, pero si se proporciona, no debe estar vacío
    body('name').optional().notEmpty().withMessage('El nombre es requerido'),

    // Validación del apellido: opcional, pero si se proporciona, no debe estar vacío
    body('last_name').optional().notEmpty().withMessage('El apellido es requerido'),

    // Validación de la edad: opcional, pero si se proporciona, debe ser un número entero y no vacío
    body('age').optional().notEmpty().withMessage('La edad es requerida').isInt().withMessage('La edad debe ser un número entero'),

    // Validación del correo electrónico: opcional, pero si se proporciona, debe ser un correo electrónico válido y no vacío
    body('email').optional().notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('Formato de correo electrónico inválido'),

    // Validación de la contraseña: opcional, pero si se proporciona, debe cumplir con ciertos requisitos de complejidad
    body('password').optional().notEmpty().withMessage('La contraseña es requerida').isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres y contener al menos un dígito, una letra minúscula, una letra mayúscula y un carácter especial')
];
// Validaciones del usuario para login
exports.validateLogin = [
    body('email').notEmpty().withMessage('Correo electronico es obligatorio').isEmail().withMessage('Correo electronico no valido'),
    body("password").notEmpty().withMessage('La contraseña es obligatoria')
]