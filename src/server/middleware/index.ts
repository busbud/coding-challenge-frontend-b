import { Express } from 'express';
import { redirectMiddleware } from './redirect';

export const applyMiddleware = (app: Express) => {
  [redirectMiddleware].forEach((middleware) => {
    app.use(middleware);
  });
};
