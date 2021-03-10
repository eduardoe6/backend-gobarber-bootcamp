// Overrides type declaration
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
