import expressSession from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
    };
  }
}

export const SessionMiddleware = expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
});
