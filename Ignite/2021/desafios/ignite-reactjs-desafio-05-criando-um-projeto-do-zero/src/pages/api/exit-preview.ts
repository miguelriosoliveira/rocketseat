import { NextApiRequest, NextApiResponse } from 'next';

export default async function exitPreviewHandler(
  _: NextApiRequest,
  res: NextApiResponse
) {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
