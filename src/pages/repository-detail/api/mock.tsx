export const repo1 = {
    data: {
        repository: {
            __typename: "Repository",
            name: "react",
            stargazerCount: 3439,
            owner: {
                __typename: "Organization",
                avatarUrl:
                    "https://avatars.githubusercontent.com/u/7143434?v=4",
                login: "primer",
                url: "https://github.com/primer",
            },
            description:
                "An implementation of GitHub's Primer Design System using React",
            languages: {
                __typename: "LanguageConnection",
                edges: [
                    {
                        __typename: "LanguageEdge",
                        node: {
                            __typename: "Language",
                            name: "JavaScript",
                        },
                    },
                    {
                        __typename: "LanguageEdge",
                        node: {
                            __typename: "Language",
                            name: "TypeScript",
                        },
                    },
                    {
                        __typename: "LanguageEdge",
                        node: {
                            __typename: "Language",
                            name: "Shell",
                        },
                    },
                    {
                        __typename: "LanguageEdge",
                        node: {
                            __typename: "Language",
                            name: "Ruby",
                        },
                    },
                    {
                        __typename: "LanguageEdge",
                        node: {
                            __typename: "Language",
                            name: "CSS",
                        },
                    },
                    {
                        __typename: "LanguageEdge",
                        node: {
                            __typename: "Language",
                            name: "HTML",
                        },
                    },
                ],
            },
            defaultBranchRef: {
                __typename: "Ref",
                target: {
                    __typename: "Commit",
                    committedDate: "2025-03-07T15:36:50Z",
                },
            },
        },
    },
};
