import { Link, useParams } from "react-router";
import { PageContainer } from "@shared/ui-kit/page-container";
import { Chip } from "@shared/ui-kit/chip";
import { Button } from "@shared/ui-kit/button";
import { Route } from "@shared/routing/routes";
import { ErrorView } from "@shared/ui-kit/error-view";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "@shared/ui-kit/error-boundary";
import { useRepositoryDetail } from "../lib/hooks";
import { LoadingView } from "@shared/ui-kit/loading-view";
import { EmptyView } from "@shared/ui-kit/empty-view";
import dayjs from "dayjs";

const RepositoryCard = () => {
    const { data } = useRepositoryDetail();

    // is should not be undefined hence we have fallback boundary
    if (!data?.repository) return null;

    const languages =
        data.repository.languages?.edges
            ?.map((edge) =>
                !!edge?.node && edge.node.__typename === "Language"
                    ? edge.node
                    : null
            )
            .filter((v) => !!v) || [];

    const lastCommit =
        data.repository.defaultBranchRef?.target?.__typename === "Commit"
            ? data.repository.defaultBranchRef.target.committedDate
            : null;

    const lastCommitText = lastCommit ? dayjs(lastCommit).fromNow() : "";

    return (
        <div>
            <h1 className="mt-20">Repository "{data.repository?.name}"</h1>
            <Link to={Route.Repository.list()} className="mt-6 block">
                <Button>Back</Button>
            </Link>
            <div className="bg-secondary border-2 border-border flex gap-2 p-2 rounded-xl mt-2">
                <div className="min-w-40 w-40">
                    <img
                        src={data.repository.owner.avatarUrl}
                        alt={`${data.repository.owner.login} avatar`}
                        className="w-full h-auto rounded-md aspect-square object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center">
                        <h2 className="text-3xl">{data.repository.name}</h2> |
                        <span>⭐ {data.repository.stargazerCount}</span>
                        {!!lastCommitText && <span>{lastCommitText}</span>}
                    </div>
                    <Link to={data.repository.owner.url}>
                        {data.repository.owner.login}
                    </Link>
                    {!!languages.length && (
                        <ul className="flex gap-2 flex-wrap">
                            {languages.map((node) => (
                                <Chip key={node.name}>{node.name}</Chip>
                            ))}
                        </ul>
                    )}

                    <p>{data.repository.description}</p>
                </div>
            </div>
        </div>
    );
};

interface ParamsFallbackBoundaryProps {
    children: ReactNode;
}

const ParamsFallbackBoundary = ({ children }: ParamsFallbackBoundaryProps) => {
    const { name, owner } = useParams();

    if (!name || !owner) {
        return <ErrorView message="404" />;
    }

    return children;
};

interface RepositoryCardFallbackBoundaryProps {
    children: ReactNode;
}

const RepositoryCardFallbackBoundary = ({
    children,
}: RepositoryCardFallbackBoundaryProps) => {
    const { data, error } = useRepositoryDetail();

    if (error) return <ErrorView message={error.message} />;
    if (!data?.repository) return <EmptyView />;

    return <Suspense fallback={<LoadingView />}>
        {children}
    </Suspense>;
};

export const RepositoryDetailPage = () => (
    <PageContainer>
        <ErrorBoundary
            renderFallback={() => <ErrorView message="Unexpected errir!" />}
        >
            <ParamsFallbackBoundary>
                <RepositoryCardFallbackBoundary>
                    <RepositoryCard />
                </RepositoryCardFallbackBoundary>
            </ParamsFallbackBoundary>
        </ErrorBoundary>
    </PageContainer>
);
