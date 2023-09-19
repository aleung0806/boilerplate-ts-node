import { customService } from './custom.service'

import { Issue, List, Project } from '../types/Jira'

import ProjectModel from '../models/project.model'
import ListModel from '../models/list.model'
import IssueModel from '../models/issue.model'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { catchDbError } from '../utils/catchDbError'

const getProject = async (id: string): Promise<Project> => {
  const project = await catchDbError(ProjectModel.findById(id))
  if (!project){
    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
  }
  const lists = await catchDbError(ListModel.find({projectId: project.id}))

  return {...project.toObject(), lists}
}

export const projectService = customService<Project>(ProjectModel)
projectService.get = getProject

export const listService = customService<List>(ListModel)
export const issueService = customService<Issue>(IssueModel)



