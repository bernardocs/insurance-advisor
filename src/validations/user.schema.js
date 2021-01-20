import Joi from "joi";

export default Joi.object().keys({
  age: Joi.number().positive().allow(0),
  dependents: Joi.number().positive().allow(0),
  house: Joi.object().keys({
    ownership_status: Joi.string().valid("owned", "mortgaged")
  }),
  income: Joi.number().positive().allow(0),
  marital_status: Joi.string().valid("single", "married"),
  risk_questions: Joi.array().length(3).items(
    Joi.number().allow(0, 1)
  ),
  vehicle: Joi.object().keys({
    year: Joi.number().positive()
  })
}).options({ presence: "required" });