import { Request, Response } from 'express';

export type HTTPMetadata = { req: Request; res: Response };
