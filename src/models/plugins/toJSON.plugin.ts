const transform = (doc, ret, opt) => {
  delete ret['password']
  delete ret['__v']
  return ret
}

const toJSON = (schema) => {
  schema.set('toJSON', {
    transform: transform
  })
}