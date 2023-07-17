import Joi from 'joi'

export const searchHotelBodySchema = Joi.object({
    ski_site: Joi.number().required(),
    from_date: Joi.string().required(),
    to_date: Joi.string().required(),
    group_size: Joi.number().required()
  })
