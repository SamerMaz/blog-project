import { graphql } from 'graphql'
import { request, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const graphqlAPI= process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string

export const getPosts = async (): Promise<string[]> => {
  const query: string = gql`
    query MyQuery {
      postsConnection(orderBy:createdAt_DESC) {
        edges {
          cursor
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
     
    }
  `
  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges
}

export const getPostDetails = async (slug:string): Promise<string> => {
  const query: string = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug}){
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
      
      categories {
        name
        slug
      }
      content {
        raw
      }
    }
  }
  `
  const result = await request(graphqlAPI, query, { slug })
  return result.post;
}


export const getRecentPosts = async():Promise<String> =>{
  const query: string = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_DESC
        last:3
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.posts;
}

export const getSimilarPosts = async(categories:string, slug:string):Promise<String>=>{
  const query: string = gql`
      query GetPostDetails($slug: String!, $categories: [String!]){
        posts(
          where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}}}
          last: 3
        ) {
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
      }
  `
    const result = await request(graphqlAPI, query, { categories, slug});
    return result.posts
}

export const getCategories = async ():Promise<any[]> =>{
  const query:string = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

    const result = await request(graphqlAPI, query);

    return result.categories;

}

//Creating our own api without having a separate node.js server
export const submitComment = async(obj:any):Promise<String> =>{
  const result:Response= await fetch('/api/comments', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })

  return result.json();
}


export const getComments = async (slug: string):Promise<String> => {
  const query:string = gql`
    query GetComments($slug: String!){
      comments(where: { post: { slug: $slug }}) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
}

export const getFeaturedPosts = async ():Promise<String> => {
  const query:string = gql`
  query GetCategoryPost() {
    posts(where: {featuredPost: true}) {
      author {
        name
        photo {
          url
        }
      }
      featuredImage {
        url
      }
      title
      slug
      createdAt
    }
  }
`;

  const result = await request(graphqlAPI, query);

  return result.posts
}

export const getCategoryPost = async (slug:string):Promise<String>=>{
  const query:string = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: {categories_some: {slug: $slug}}){
      edges {
        cursor
        node {
          author{
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
      }
    }
  }`;
  
  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
}