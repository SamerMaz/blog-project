import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PostCard, Categories, PostWidget, FeaturedPostCard } from '../components'
import { FeaturedPosts } from '../sections'

import { getPosts } from '../services'

// const posts = [
//   { title: 'React Testing', except: 'Learn React Testing' },
//   { title: 'React with Tailwind', except: 'Learn React with Tailwind' },
// ]

interface Props {
  posts: any[];
}
const Home: NextPage<Props> = ({ posts }) => {
  // console.log("POPSOSTOPSOTS", posts);
  return (
    <div className="container mx-auto mb-8 px-10">
      <FeaturedPosts/>
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>

        <div className=" col-span-1 lg:col-span-4 ">
          <div className="relative top-8 lg:sticky">
            <PostWidget categories={''} slug={''} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}

export default Home
