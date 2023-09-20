import { Schema, model, ObjectId } from 'mongoose';
import User from './user.model'
import ProjectModel from './project.model'
import { ProjectRole } from '../types/Jira'

const projectRoleSchema = new Schema<ProjectRole>({
  role: {
    type: String,
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: ProjectModel,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
  }
},
{
  timestamps: true,
  'toJSON': {
    transform: (_doc: ProjectRole, ret: any, _options): ProjectRole => {
      const { _id, createdAt, updatedAt, __v, ...rest } = ret
      ret = rest
      ret.id = _id
      return ret
    }
  },
  'toObject': {
    transform: (_doc: ProjectRole, ret: any, _options): ProjectRole => {
      const { _id, createdAt, updatedAt, __v, ...rest } = ret
      ret = rest
      ret.id = _id
      return ret
    }
  }
})

const ProjectRole = model<ProjectRole>('projectRole', projectRoleSchema)

export default ProjectRole

