import expressSession from 'express-session';

declare module 'express-session' {
  interface SessionData {
    x: number;
  }
}

export const SessionMiddleware = expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
});
