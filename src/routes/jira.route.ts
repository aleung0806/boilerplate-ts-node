import { customRouter } from './custom.route'

import { Issue, List, Project, ProjectRole } from '../types/Jira'

import { projectController, listController, issueController, projectRoleController } from '../controllers/jira.controller'

export const projectRouter = customRouter<Project>('/project', projectController)
export const listRouter = customRouter<List>('/list', listController)
export const issueRouter = customRouter<Issue>('/issue', issueController)

export const projectRoleRouter = customRouter<ProjectRole>('/projectRole', projectRoleController)

