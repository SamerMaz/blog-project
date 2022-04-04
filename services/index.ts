import { graphql } from 'graphql'
import { request, gql } from 'graphql-request'

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string
console.log(graphqlAPI)

export const getPosts = async (): Promise<string> => {
  const query: string = gql`
    query MyQuery {
      postsConnection {
        edges {
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
          }
        }
      }
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges
}

export const getRecentPosts = async():Promise<String> =>{
  const query: string = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
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

export const getSimilarPosts = async():Promise<String>=>{
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
    const result = await request(graphqlAPI, query);
    return result.posts
}

export const getCategories = async ():Promise<String> =>{
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