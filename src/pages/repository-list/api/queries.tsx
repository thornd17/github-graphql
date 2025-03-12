import { gql } from "@shared/api/graphql/apollo";

export const SEARCH_REPOSITORIES_QUERY = gql(`
    query SearchRepositories($query: String!, $first: Int, $last: Int, $after: String, $before: String) {
        search(query: $query, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    ... on Repository {
                        id
                        name
                        owner {
                            login
                        }
                        description
                        url
                        stargazerCount
                        forkCount
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    committedDate
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);

export const GET_CURRENT_USER_REPOSITORIES = gql(`
    query GetCurrentUserRepositories($first: Int, $last: Int, $after: String, $before: String) {
        viewer {
            repositories(first: $first, last: $last, after: $after, before: $before) {
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        id
                        name
                        owner {
                            login
                        }
                        description
                        url
                        stargazerCount
                        forkCount
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    committedDate
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);