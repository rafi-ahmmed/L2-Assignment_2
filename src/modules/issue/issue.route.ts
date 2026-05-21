import { Router } from 'express';
import issueController from './issue.controller.js';
import auth from '../../middleware/auth.js';
import { userRole } from '../../types/index.js';

const routes = Router();

routes.post(
   '/',
   auth(userRole.MAINTAINER, userRole.CONTRIBUTOR),
   issueController.createIssue
);
routes.get('/', issueController.getAllIssues);
routes.get('/:id', issueController.getSingleIssue);
routes.patch(
   '/:id',
   auth(userRole.CONTRIBUTOR, userRole.MAINTAINER),
   issueController.updateIssue
);

const issueRouter = routes;
export default issueRouter;
