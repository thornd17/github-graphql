import { useSuspenseQuery } from "@apollo/client";
import { GET_REPOSITORY_BY_OWNER_AND_NAME } from "../api/queries";
import { useParams } from "react-router";

export const useRepositoryDetail = () => {
    const { name, owner } = useParams();

    return  useSuspenseQuery(
        GET_REPOSITORY_BY_OWNER_AND_NAME,
        {   
            // we have fallback view for no params values
            variables: { name: name!, owner: owner! },
        }
    );
}