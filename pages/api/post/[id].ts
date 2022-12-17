import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse)
 {
  if (req.method === 'GET') {
    const { id } = req.query;

    // Check for id post store in database
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
    
  } else if (req.method === 'PUT') {
    const {comment, userId} = req.body;
    const { id }:any = req.query;

    const data =  await client
    // patch: change sth in the client
     .patch(id)
    // If no likes array, then create one
     .setIfMissing({comments: []})
    // insert after last element in array
     .insert('after', 'comments[-1]', [
      {
        comment,
        _key: uuid(),
        postedBy: { _type: 'postedBy', _ref: userId }
      }
     ])
     // commit: to save it
     .commit()

    res.status(200).json(data);
  }
}
