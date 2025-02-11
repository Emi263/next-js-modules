export const validateAgreementBody = (body: AgreementBody) => {
    const schema = Joi.object()
      .keys({
        agreed: Joi.boolean().required(),
      })
      .required();
  
    const { error } = schema.validate(body);
  
    if (error)
      throw new BadRequest(error?.details[0].message || api.GENERAL.BAD_REQUEST);
  };