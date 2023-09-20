import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { catchDbError } from '../utils/catchDbError'
import { customService } from './custom.service'

import { Issue, List, Project, ProjectRole } from '../types/Jira'

import ProjectModel from '../models/project.model'
import ListModel from '../models/list.model'
import IssueModel from '../models/issue.model'
import ProjectRoleModel from '../models/projectRole.model'


const getProject = async (id: string): Promise<Project> => {
  const project = await catchDbError(ProjectModel.findById(id))
  if (!project){
    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
  }
  const lists = await catchDbError(ListModel.find({projectId: project.id}))
  const usersDoc = await catchDbError(ProjectRoleModel.find({projectId: project.id}).populate('userId').select('role userId'))
  const users = usersDoc.map((user) => {
    const {role, userId, id} = user.toObject()
    return {
      role, 
      roleId: id, 
      user: {
        username: userId.username,
        email: userId.email,
        id: userId.id
      }
    }
  })

  return {...project.toObject(), lists, users}
}


export const projectService = customService<Project>(ProjectModel)
projectService.get = getProject
export const listService = customService<List>(ListModel)
export const issueService = customService<Issue>(IssueModel)
export const projectRoleService = customService<ProjectRole>(ProjectRoleModel)


