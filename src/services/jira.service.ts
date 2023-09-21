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
  const listsDoc = await catchDbError(ListModel.find({projectId: project.id}).populate('issueOrder'))
  const lists = listsDoc.map((list) => {
      const {issueOrder, ...rest} = list.toObject()
      return {
        ...rest,
        issues: issueOrder
      }
  })

  const usersDoc = await catchDbError(ProjectRoleModel.find({projectId: project.id}).populate('userId').select('role userId'))
  const users = usersDoc.map((user) => {
    const {role, userId, id} = user.toObject()
    return {
      id: userId.id,
      username: userId.username,
      email: userId.email,
      role, 
      roleId: id, 
    }
  })

  return {...project.toObject(), lists, users}
}

const removeProject = async (id: string): Promise<void> => {
  const resource = await ProjectModel.findByIdAndRemove(id)
  if (!resource){
    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
  }
  await catchDbError(ProjectRoleModel.deleteMany({projectId: id}))
  await catchDbError(ListModel.deleteMany({projectId: id}))
  await catchDbError(IssueModel.deleteMany({projectId: id}))
}

export const projectService = customService<Project>(ProjectModel)
projectService.get = getProject
projectService.remove = removeProject

export const listService = customService<List>(ListModel)

export const issueService = customService<Issue>(IssueModel)
export const projectRoleService = customService<ProjectRole>(ProjectRoleModel)


