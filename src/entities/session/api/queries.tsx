import { useQuery } from "@apollo/client";
import { gql } from "@shared/api/graphql/apollo";

export const CHECK_TOKEN_VALIDITY = gql(`
    query CheckTokenValidity {
        viewer {
            login
        }
    }
`);

// todo: add ssr
export const useIsAuthorized = () => {
    const { data, error } = useQuery(CHECK_TOKEN_VALIDITY);

    if (error) return false;    
    if (data?.viewer?.login) return true
    
    return false;
}
