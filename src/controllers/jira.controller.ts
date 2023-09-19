import { customController } from './custom.controller'

import { Issue, List, Project } from '../types/Jira'

import { projectService, listService, issueService } from '../services/jira.service'

export const projectController = customController<Project>(projectService)
export const listController = customController<List>(listService)
export const issueController = customController<Issue>(issueService)
