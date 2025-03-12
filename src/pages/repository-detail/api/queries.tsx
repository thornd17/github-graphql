import { gql } from "@shared/api/graphql/apollo";

export const GET_REPOSITORY_BY_OWNER_AND_NAME = gql(`
    query GetRepositoryByOwnerAndName($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            name
            stargazerCount
            owner {
                avatarUrl
                login
                url
            }
            description
            languages(first: 10) {
                edges {
                    node {
                        name
                    }
                }
            }
            defaultBranchRef {
                target {
                    ... on Commit {
                        committedDate
                    }
                }
            }
        }
    }
`);