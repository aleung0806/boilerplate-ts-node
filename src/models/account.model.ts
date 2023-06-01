import { Schema, Model, Document, model, ObjectId } from 'mongoose';
import User from './user.model'

export interface AccountDocument {
  _id: ObjectId;
  provider: string;
  providerId: string;
  userId: ObjectId;
}

const accountSchema = new Schema<AccountDocument>({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
  }
})

const Account = model<AccountDocument>('account', accountSchema)

export default Account

