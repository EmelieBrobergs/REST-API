const { check, body, validationResult, oneOf } = require('express-validator');


// used by validation object below
function checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
}

// validation objects, (product requirement)
const saveProductValidation = [
    body('name').notEmpty(),
    body('type').notEmpty().isString(),
    //body('price').isFloat({min: 0}),
    oneOf([
        check('type').equals('license'),
        check('type').equals('lifeTime')
    ], 'Invalid: Type can be either "license" or "lifeTime"'),
    checkValidation
];

// validations to export for endpoints
module.exports = {
    saveProductValidation
};