import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse)
 {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    // Fetch data from SanityClient
    const data = await client.fetch(query);

    res.status(200).json(data);

    // Fetch video document to Sanity api
  } else if (req.method === 'POST') {
    const document = req.body;

    client.create(document)
    .then(() => res.status(201).json('Video Created'))
  }
}
