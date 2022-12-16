import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client';
// Allow to attach a unique identifier to every single like
import  {uuid} from 'uuidv4';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse)
 {
  if (req.method === 'PUT') {
    const  {userId, postId, like } = req.body;
    
    // If like is true, then insert. false, then remove
    const data = 
    like ? await client
    // patch: change sth in the client
     .patch(postId)
    // If no likes array, then create one
     .setIfMissing({likes: []})
    // insert after last element in array
     .insert('after', 'likes[-1]', [
      {
        _key: uuid(),
        _ref: userId
      }
     ])
     // commit: to save it
     .commit()
    : await client
     .patch(postId)
    //  Remove like from userId
     .unset([`likes[_ref=="${userId}"]`])
     .commit();

    res.status(200).json(data);
  }
}
