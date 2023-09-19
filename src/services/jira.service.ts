import { customService } from './custom.service'

import { Issue, List, Project } from '../types/Jira'

import ProjectModel from '../models/project.model'
import ListModel from '../models/list.model'
import IssueModel from '../models/issue.model'


export const ProjectService = customService<Project>(ProjectModel)
export const ListService = customService<List>(ListModel)
export const IssueService = customService<Issue>(IssueModel)



