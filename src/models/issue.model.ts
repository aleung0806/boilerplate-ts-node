import { Schema, Model, Document, model } from 'mongoose';

import { Issue }from '../types/Jira'

import ProjectModel from './project.model'
import ListModel from './list.model'
import UserModel from './user.model'

interface IssueMethods {}
interface IssueModel extends Model<Issue, {}, IssueMethods> {}

const issueSchema = new Schema<Issue, IssueModel, IssueMethods>(
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
      },
      listId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: ListModel,
      },
      description: {
        type: String, 
        trim: true,
      },
      type: {
        type: String, 
      },
      status: {
        type: String, 
      },
      priority: {
        type: String, 
      },
      dateDue: {
        type: Date, 
      },
      assigneeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
      },
      creatorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
      },
    },
    {
      timestamps: true,
      'toJSON': {
        transform: (_doc: Issue, ret: any, _options): Issue => {
          const { _id, createdAt, updatedAt, __v, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      },
      'toObject': {
        transform: (_doc: Issue, ret: any, _options): Issue => {
          const { _id, createdAt, updatedAt, __v, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      }
    }
)


const Issue = model<Issue, IssueModel>('Issue', issueSchema)

export default Issue;

