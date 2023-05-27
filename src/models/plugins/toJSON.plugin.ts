export const transform = (_doc, ret, _opt) => {
  delete ret['password']
  delete ret['__v']
  return ret
}

export const toJSON = (schema) => {
  schema.set('toJSON', {
    transform: transform
  })
}