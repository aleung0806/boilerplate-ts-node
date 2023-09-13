import { Schema, Model, Document, model } from 'mongoose';
import bcrypt from 'bcrypt'
import config from '../config/config';
// import { redis } from '../config/config';
import { UserDocument, User }from '../types/User'
import { uniqueId } from 'lodash';
import { redisClient } from 'src/db/redis';

interface UserMethods {
  passwordMatches(password:string):Promise<string>
}

//Model type parameters: DocType, QueryHelpers, Methods
//Statics do not have an explicit parameter
interface UserModel extends Model<UserDocument, {}, UserMethods> {
  emailExists(email:string):Promise<boolean>
}

//Schema type parameters: DocType, Mongoose model type, TInstanceMethods, TQueryHelpers
const userSchema = new Schema<UserDocument, UserModel, UserMethods>(
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
        default: ['owner']
      }
    },
    {
      timestamps: true,
      'toJSON': {
        transform: (_doc: UserDocument, ret: any, _options): User => {
          const { _id, createdAt, updatedAt, __v, password, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      },
      'toObject': {
        transform: (_doc: UserDocument, ret: any, _options): User => {
          const { _id, createdAt, updatedAt, __v, password, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      }
    }
)

userSchema.statics.emailExists = async function (email:string):Promise<boolean> {
  const user = await this.findOne({email: email})
  return !!user
}

userSchema.methods.passwordMatches = async function (password:string):Promise<string> {
  const user = this
  return await bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (_next) {
  //hash password
  let user = this;
  if (user.isModified('password')) {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
  }

  //make email all lowercase
  user.email = user.email.toLowerCase()
})


const User = model<UserDocument, UserModel>('User', userSchema)

export default User;

