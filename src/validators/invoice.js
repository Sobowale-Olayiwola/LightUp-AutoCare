const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER),
    clientId: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER),
    vehicleId: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER),
    billingAddress: Joi.object({
        repName: Joi.string().required().min(3).max(100),
        address: Joi.string().required().min(3).max(255),
        city: Joi.string().required().min(3).max(255),
        postalCode: Joi.number().required().min(1).max(Number.MAX_SAFE_INTEGER),
        state: Joi.string().required().min(3).max(100),
    }),
    items: Joi.array().items(
        Joi.object({
            item: Joi.string().required().min(1).max(30),
            unit: Joi.number().required().min(1).max(Number.MAX_SAFE_INTEGER),
            rate: Joi.number().required().min(1).max(Number.MAX_SAFE_INTEGER),
            amount: Joi.number().required().min(1).max(Number.MAX_SAFE_INTEGER),
        })
    ),
    totalAmount: Joi.number().required().min(1).max(Number.MAX_SAFE_INTEGER),
});
