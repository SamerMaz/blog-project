import React, {useState, useEffect, ReactNode} from 'react';
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services';

type Props = {
  slug: string
}
interface IComments {
  comment: string;
  name: string;
  createdAt: string,
  slug:string,
  comments: []
  
}

const Comments:React.FC<Props> = ({slug}) => {

  const [comments, setComments] = useState<IComments[] | null>(null);
  console.log(comments);
 //use effect here is didMOunt it will happen at the start 
  useEffect(()=>{
    getComments(slug)
      .then((result:any)=> setComments(result))
  })
  return (
    <>
    {/* {console.log(comments.length)} */}
      {(comments?.length || 0) > 0  && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments?.length}
            {' '}
            Comments
          </h3>
          {comments?.map((comment) => (
            <div key={comment.createdAt} className="border-b border-gray-100 mb-4 pb-4">
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span>
                {' '}
                on
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className='whitespace-pre-line text-gray-600 w-full'>
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments