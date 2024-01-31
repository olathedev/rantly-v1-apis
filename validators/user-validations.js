const Joi = require('joi')

const schema = Joi.object({

    firstname: Joi.string().required().min(2).max(20),
    lastname: Joi.string().required().min(2).max(20),
    username: Joi.string().required().min(2).max(20),
    password: Joi.string().required().min(6).max(8),

})

const validate = (data) => {
    return schema.validate(data)
}

module.exports = validate