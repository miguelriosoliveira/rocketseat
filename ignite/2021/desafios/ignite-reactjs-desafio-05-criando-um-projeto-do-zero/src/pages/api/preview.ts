import { Document } from '@prismicio/client/types/documents';
import { NextApiRequest, NextApiResponse } from 'next';

import { getPrismicClient } from '../../services/prismic';

function linkResolver(doc: Document): string {
  if (doc.type === 'posts') {
    return `/post/${doc.uid}`;
  }
  return '/';
}

interface RequestQuery {
  token: string;
  documentId: string;
}

export default async function previewHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { token: ref, documentId } = request.query as unknown as RequestQuery;

  const redirectUrl = await getPrismicClient(request)
    .getPreviewResolver(ref, documentId)
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    response.status(401).json({ message: 'Invalid token' });
    return;
  }

  response.setPreviewData({ ref });
  response.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
  );
  response.end();
}
