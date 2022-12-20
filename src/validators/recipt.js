import Joi from "joi";

const reciptSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      "string.base": `#title should be of type string`,
      "string.required": `#title is a required field`,
    }),
  cost: Joi.string()
    .min(1)
    .required()
    .pattern(/^[0-9\.]/)
    .messages({
        'string.base': `#cost should be of type string`,
        'string.min': `#cost should have a minimum length of 1`,
        'string.pattern.base': `#cost should be a valid number`,
    }),
  categoryId: Joi.number().required().messages({
    'number.base': `#categoryId should be of type number`,
    "number.required": `#categoryId is a required field`,
  }),
  time: Joi.string()
  .pattern(/(\d{4}-\d{2}-\d{2})[A-Z]+(\d{2}:\d{2}:\d{2}).([0-9+-:]+)/)
  .message({
    'string.base': `#cost should be of type string`,
    'string.pattern.base': `#cost should be a valid ISO8601 compliant date-time string`,
  })
});

export default reciptSchema
