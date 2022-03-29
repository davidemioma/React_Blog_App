import { request, gql, GraphQLClient } from "graphql-request";

const graphQlApi =
  "https://api-eu-west-2.graphcms.com/v2/cl17uppnoix4r01zahjhscs4t/master";

const graphCmsToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDg1NjcwOTgsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NsMTd1cHBub2l4NHIwMXphaGpoc2NzNHQvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiY2EwNzgzNWMtMGQ2OS00N2Y0LTkwNGEtNmIzNjIyMjAyZWUwIiwianRpIjoiY2wxY2FhYWZwMzVycjAxeG0yOHhxOTltaCJ9.X1w-9hDqtvyu2bDeI4uYBL7jJNAnK91yKIhwUA-_ID5GjAswWYt4-aXfeq93wb-jMwBcVJTZlPuBLWZ-GAwa_lS2b6JjgPbLT4kWZtl26CBeDqKGA46DC5RBzZg55SiO98yZtCh-cltwtdGdfhDEKydkDQmDj16xvuOIKIFJkuYI2xJ5Nuq6iMKECIHZvx9Qq4Lv7obupC6qc7nwhxt3v1UggUMDEhDF_OSR3GjAcobjT5T50t3bTp2aM4-TQD3DODO0GXyvPtObMWm30q69MJQCRvkm5hf4Paya2uzYWhGpi1yXatWjBYX-4mw3km0RY7iiAfcIX2qs3ARh1rUycBUYuELw3zrFF8QEAETkJgAt9VOLuFyVf4VvSGmMETj_C_oizJPYPcOJ-16ogkxVzjWzBxBV3NjLK-61cWExZJ5r_k-uR7k8wT6T9xg3nKEGHLC3VatcaYLkooydvtzBvi8AZ-B6BQtlAzqc2K9PZVbBcL-9rMWzH-32MJGJppzv26yMVlmRLnKsT2xb59MpVH6yIWpM5tLvegFgKG6LQavfHGygEwVFugPDYwif1VJeSZhgsjPTs18PTwC_nvQzNBCnD8VIoJcLOJAidm_Jr49F5or-0Ycdo2alEKmc7hyvGm6LfmG1jSiDeAGlCjWR9HGYLV2-Vowg4W9Z0lRUM9Q";

export const getPost = async () => {
  const query = gql`
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
            excerp
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
  `;

  const result = await request(graphQlApi, query);

  return result.postsConnection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphQlApi, query);

  return result.categories;
};

export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(orderBy: id_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphQlApi, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphQlApi, query, { slug, categories });

  return result.posts;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerp
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        content {
          raw
        }
        slug
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphQlApi, query, { slug });

  return result.post;
};

export const getAdjacentPost = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        slug
        createdAt
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphQlApi, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const submitComment = async (obj) => {
  const graphQLClient = new GraphQLClient(graphQlApi, {
    headers: {
      authorization: `Bearer ${graphCmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  const { name, email, comment, slug } = obj;

  const result = await graphQLClient.request(query, {
    name,
    email,
    comment,
    slug,
  });

  return result;
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphQlApi, query, { slug });

  return result.comments;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
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
            excerp
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
  `;

  const result = await request(graphQlApi, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
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

  const result = await request(graphQlApi, query);

  return result.posts;
};
