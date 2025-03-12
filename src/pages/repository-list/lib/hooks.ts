import { useUnit } from "effector-react";
import { $cursor, $direction, $search } from "../model/store";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_REPOSITORIES, SEARCH_REPOSITORIES_QUERY } from "../api/queries";

export const useRepositoriesList = () => {
    const [cursor, direction, search] = useUnit([$cursor, $direction, $search]);

    const variables = {
        query: search,
        ...(direction === "after"
            ? { first: 10, after: cursor }
            : { last: 10, before: cursor }),
    };

    return useQuery(SEARCH_REPOSITORIES_QUERY, {
        variables,
    });
};

export const useCurrentUserRepositories = () => {
    const [cursor, direction] = useUnit([$cursor, $direction]);

    const variables = {
        ...(direction === "after"
            ? { first: 10, after: cursor }
            : { last: 10, before: cursor }),
    };

    return useQuery(GET_CURRENT_USER_REPOSITORIES, {
        variables,
    });
};