import { PageContainer } from "@shared/ui-kit/page-container";
import { Input } from "@shared/ui-kit/input";
import { Button } from "@shared/ui-kit/button";
import { ErrorBoundary } from "@shared/ui-kit/error-boundary";
import { ErrorView } from "@shared/ui-kit/error-view";
import { $search, nextPage, prevPage, updateSearch } from "../model/store";
import { useUnit } from "effector-react";
import { ChangeEventHandler, memo, useMemo, useState } from "react";
import { useCurrentUserRepositories, useRepositoriesList } from "../lib/hooks";
import { LoadingView } from "@shared/ui-kit/loading-view";
import { EmptyView } from "@shared/ui-kit/empty-view";
import debounce from "lodash.debounce";
import dayjs from "dayjs";
import { HorizontalRepositoryCard } from "@entities/repository/ui/horizontal-repository-card";
import { useIsAuthorized } from "@entities/session/api/queries";

const Search = memo(() => {
    const [search, handleUpdateSearch] = useUnit([$search, updateSearch]);
    const [inputValue, setInputValue] = useState(search ?? "");

    const handleSearch: (value: string) => void = useMemo(
        () => debounce((value) => handleUpdateSearch(value), 300),
        []
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        handleSearch(e.target.value);
        setInputValue(e.target.value);
    };

    return (
        <Input
            value={inputValue}
            placeholder="Search..."
            className="mt-6"
            onChange={handleInputChange}
        />
    );
});

const Pagination = memo(() => {
    const [nextPageHandler, prevPageHandler] = useUnit([nextPage, prevPage]);
    const { data, error } = useRepositoriesList();

    const pageInfo = data?.search.pageInfo;
    const disabled = !!error || !pageInfo;

    const handleNextPage = () => {
        const cursor = pageInfo?.endCursor;
        cursor && nextPageHandler(cursor);
    };

    const handlePrevPage = () => {
        const cursor = pageInfo?.startCursor;
        cursor && prevPageHandler(cursor);
    };

    return (
        <div className="flex gap-4 mt-4">
            <Button
                onClick={handlePrevPage}
                disabled={disabled || !pageInfo.hasPreviousPage}
            >
                Prev
            </Button>
            <Button
                onClick={handleNextPage}
                disabled={disabled || !pageInfo.hasNextPage}
            >
                Next
            </Button>
        </div>
    );
});

const RepositoryListSearch = memo(() => {
    const { data } = useRepositoriesList();

    const repositories =
        data?.search.edges
            ?.map((edge) =>
                !!edge?.node && edge.node.__typename === "Repository"
                    ? edge.node
                    : null
            )
            .filter((v) => !!v) || [];

    return (
        <ul className="flex flex-col gap-2 mt-4">
            {repositories.map((node) => {
                const committedDate =
                    node.defaultBranchRef?.target?.__typename === "Commit"
                        ? node.defaultBranchRef.target.committedDate
                        : null;

                const lastCommitText = dayjs(committedDate).fromNow();

                return (
                    <HorizontalRepositoryCard
                        component="li"
                        key={node.id}
                        model={{
                            name: node.name,
                            owner: node.owner.login,
                            stargazerCount: node.stargazerCount,
                            lastCommitText,
                            repoUrl: node.url,
                        }}
                    />
                );
            })}
        </ul>
    );
});

const RepositoryListCurrentUser = memo(() => {
    const { data } = useCurrentUserRepositories();

    const repositories =
        data?.viewer?.repositories.edges
            ?.map((edge) =>
                !!edge?.node && edge.node.__typename === "Repository"
                    ? edge.node
                    : null
            )
            .filter((v) => !!v) || [];

    return (
        <ul className="flex flex-col gap-2 mt-4">
            {repositories.map((node) => {
                const committedDate =
                    node.defaultBranchRef?.target?.__typename === "Commit"
                        ? node.defaultBranchRef.target.committedDate
                        : null;

                const lastCommitText = dayjs(committedDate).fromNow();

                return (
                    <HorizontalRepositoryCard
                        component="li"
                        isOwn
                        key={node.id}
                        model={{
                            name: node.name,
                            owner: node.owner.login,
                            stargazerCount: node.stargazerCount,
                            lastCommitText,
                            repoUrl: node.url,
                        }}
                    />
                );
            })}
        </ul>
    );
});

interface RepositoryListFallbackProps {
    children: React.ReactNode;
}

const RepositoryListSearchFallback = ({
    children,
}: RepositoryListFallbackProps) => {
    const { data, loading, error } = useRepositoriesList();

    if (loading) return <LoadingView />;
    if (error) return <ErrorView message="Error rendering a list!" />;
    if (!data?.search.edges) return <EmptyView />;

    return children;
};

interface RepositoryListCurrentUserFallbackProps {
    children: React.ReactNode;
}

const RepositoryListCurrentUserFallback = ({
    children,
}: RepositoryListCurrentUserFallbackProps) => {
    const { data, loading, error } = useRepositoriesList();

    if (loading) return <LoadingView />;
    if (error) return <ErrorView message="Error rendering a list!" />;
    if (!data?.search.edges) return <EmptyView />;

    return children;
};

const RepositoryList = () => {
    const search = useUnit($search);
    const isAuthorized = useIsAuthorized();

    if (!search && isAuthorized)
        return (
            <RepositoryListCurrentUserFallback>
                <RepositoryListCurrentUser />
            </RepositoryListCurrentUserFallback>
        );

    return (
        <RepositoryListSearchFallback>
            <RepositoryListSearch />;
        </RepositoryListSearchFallback>
    );
};

export const RepositoryListPageContent = memo(() => {
    return (
        <div>
            <h1 className="mt-20">Repositories</h1>
            <Search />
            <RepositoryList />
            <Pagination />
        </div>
    );
});

export const RepositoryListPage = () => (
    <PageContainer>
        <ErrorBoundary renderFallback={() => <ErrorView message="Error!!!" />}>
            <RepositoryListPageContent />
        </ErrorBoundary>
    </PageContainer>
);
