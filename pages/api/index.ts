import type { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandler } from '@utils/with-error-handler';
import multer from 'multer';

import { ObjectId } from 'mongodb';

declare global {
  interface RequestWithUserId extends NextApiRequest {
    userId: ObjectId;
  }

  interface RequestWithFile extends RequestWithUserId {
    files: any[];
    file: any;
  }

  interface CustomError extends Error {
    code?: number;
    additionalInfo?: any;
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware: (req: NextApiRequest, res: NextApiResponse, fn: any) => Promise<unknown> = (
  req,
  res,
  fn,
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

const handler = async (req: RequestWithFile, res: NextApiResponse) => {
  await runMiddleware(req, res, upload.single('file'));

  return res.json({ buffer: req.file.buffer });
};

export default handler;
