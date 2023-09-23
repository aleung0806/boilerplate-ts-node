import { customController } from './custom.controller'

import { Issue, List, Project, ProjectRole } from '../types/Jira'

import { projectService, listService, issueService, projectRoleService, commentService } from '../services/jira.service'

export const projectController = customController<Project>(projectService)
export const listController = customController<List>(listService)
export const issueController = customController<Issue>(issueService)
export const projectRoleController = customController<ProjectRole>(projectRoleService)
export const commentController = customController<ProjectRole>(commentService)
