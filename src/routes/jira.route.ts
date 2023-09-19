import { customRouter } from './custom.route'

import { Issue, List, Project } from '../types/Jira'

import { ProjectController, ListController, IssueController } from '../controllers/jira.controller'

export const ProjectRouter = customRouter<Project>('/project', ProjectController)
export const ListRouter = customRouter<List>('/list', ListController)
export const IssueRouter = customRouter<Issue>('/issue', IssueController)
