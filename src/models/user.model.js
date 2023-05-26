const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const config = require('../config/config');
const { redis } = require('../config/config');

const userSchema = mongoose.Schema(
    {
      username: {
        type: String, 
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
      },
      roles: {
        type: [ {type: String }],
        default: ['user']
      }
    },
    {
      timestamps: true,
      'toJSON': {
        transform: (doc, ret, options) => {
          return {
            id: ret._id,
            username: ret.username,
            email: ret.email,
            roles: ret.roles
          }
        }
      }
    }
)

userSchema.statics.emailExists = async function (email) {
  const user = await this.findOne({email: email})
  return !!user
}

userSchema.methods.passwordMatches = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
  //hash password
  let user = this;
  if (user.isModified('password')) {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
  }

  //make email all lowercase
  user.email = user.email.toLowerCase()
})

const User = mongoose.model('User', userSchema)


module.exports = User;

