import { customController } from './custom.controller'

import { Issue, List, Project } from '../types/Jira'

import { ProjectService, ListService, IssueService } from '../services/jira.service'

export const ProjectController = customController<Project>(ProjectService)
export const ListController = customController<List>(ListService)
export const IssueController = customController<Issue>(IssueService)
