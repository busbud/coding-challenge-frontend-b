import { Handler } from 'express';

export const redirectMiddleware: Handler = (req, res, next) => {
  console.log(`redirect from "${req.url}" to "/"`);
  if (req.url !== '/') {
    return res.redirect(307, '/');
  }
  next();
};
