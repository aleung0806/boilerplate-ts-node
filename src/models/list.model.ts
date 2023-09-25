import { Schema, Model, Document, model } from 'mongoose';

import { List }from '../types/Jira'
import ProjectModel from './project.model'
import IssueModel from './issue.model'

interface ListMethods {}
interface ListModel extends Model<List, {}, ListMethods> {}

const listSchema = new Schema<List, ListModel, ListMethods>(
    {
     title: {
        type: String, 
        required: true,
        trim: true,
      },
      projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: ProjectModel,
      }

    },

    {
      timestamps: true,
      'toJSON': {
        transform: (_doc: List, ret: any, _options): List => {
          const { _id, createdAt, updatedAt, __v, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      },
      'toObject': {
        transform: (_doc: List, ret: any, _options): List => {
          const { _id, createdAt, updatedAt, __v, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      }
    }
)


const List = model<List, ListModel>('List', listSchema)

export default List;

