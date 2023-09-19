import { Schema, Model, Document, model } from 'mongoose';

import { Project }from '../types/Jira'


interface ProjectMethods {}
interface ProjectModel extends Model<Project, {}, ProjectMethods> {}

const projectSchema = new Schema<Project, ProjectModel, ProjectMethods>(
    {
     title: {
        type: String, 
        required: true,
        trim: true,
      }
    },
    {
      timestamps: true,
      'toJSON': {
        transform: (_doc: Project, ret: any, _options): Project => {
          const { _id, createdAt, updatedAt, __v, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      },
      'toObject': {
        transform: (_doc: Project, ret: any, _options): Project => {
          const { _id, createdAt, updatedAt, __v, ...rest } = ret
          ret = rest
          ret.id = _id
          return ret
        }
      }
    }
)

const Project = model<Project, ProjectModel>('Project', projectSchema)

export default Project;

