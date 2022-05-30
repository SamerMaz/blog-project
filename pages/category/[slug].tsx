import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { Categories, Loader, PostCard } from '../../components';
import { getCategories, getCategoryPost, getPosts } from '../../services';

type Props= {
  posts: any;
  params: {
    slug: string[]
  },
  
}

const CategoryPost:React.FC<Props> = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback){
    return <Loader/>
  }
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          {posts.map((post:any, index:number) =>(
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPost

// Fetch data at build time
export const getStaticProps: GetStaticProps= async({params})=>{
  const posts = await getCategoryPost(params?.slug as string);

  return {
    props: {posts}
  }
}

export const getStaticPaths: GetStaticPaths = async()=>{
  const categories= await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug }})),
    fallback: true,
  };
}
