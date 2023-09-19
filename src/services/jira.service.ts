import { customService } from './custom.service'

import { Issue, List, Project } from '../types/Jira'

import ProjectModel from '../models/project.model'
import ListModel from '../models/list.model'
import IssueModel from '../models/issue.model'


export const projectService = customService<Project>(ProjectModel)
export const listService = customService<List>(ListModel)
export const issueService = customService<Issue>(IssueModel)



