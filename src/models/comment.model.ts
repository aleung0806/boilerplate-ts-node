import { Schema, model, ObjectId } from 'mongoose';
import User from './user.model'
import ProjectModel from './project.model'
import ListModel from './list.model'
import IssueModel from './issue.model'

import { Comment } from '../types/Jira'

const commentSchema = new Schema<Comment>({

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
  issueId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: IssueModel,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  comment: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
  'toJSON': {
    transform: (_doc: Comment, ret: any, _options): Comment => {
      const { _id, __v, ...rest } = ret
      ret = rest
      ret.id = _id
      return ret
    }
  },
  'toObject': {
    transform: (_doc: Comment, ret: any, _options): Comment => {
      const { _id, __v, ...rest } = ret
      ret = rest
      ret.id = _id
      return ret
    }
  }
})

const Comment = model<Comment>('comment', commentSchema)

export default Comment

