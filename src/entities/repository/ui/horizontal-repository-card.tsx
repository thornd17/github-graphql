import { Route } from "@shared/routing/routes";
import GithubIcon from "@shared/ui-kit/icons/github";
import { ComponentProps, ElementType } from "react";
import { Link } from "react-router";

// todo: infer from gql shema
export type HorizontalRepositoryCardModel = {
    name: string;
    owner: string;
    stargazerCount: string | number;
    lastCommitText?: string | null;
    repoUrl: string;
};

export type HorizontalRepositoryCardProps<T extends ElementType> = {
    model: HorizontalRepositoryCardModel;
    isOwn?: boolean
    component?: T;
} & ComponentProps<T>;

export const HorizontalRepositoryCard = <T extends ElementType>(
    props: HorizontalRepositoryCardProps<T>
) => {
    const { component, model, isOwn = false, ...rest } = props;
    const { name, owner, stargazerCount, lastCommitText, repoUrl } = model;

    const Comp = component ?? "div";

    return (
        <Comp
            className="group flex justify-between bg-secondary border-2 border-border p-2 rounded-md"
            {...rest}
        >
            <div className="flex gap-4 items-center">
                <Link
                    to={Route.Repository.detail({
                        name: name,
                        owner: owner,
                    })}
                    className="flex gap-2 hover:text-accent"
                >
                    <h2 className="text-3xl">{name}</h2>
                    <span className="text-md text-secondary-foreground-muted self-end">
                        by {isOwn ? <span className="text-accent">YOU</span> : owner}
                    </span>
                </Link>
                | <span>⭐ {stargazerCount}</span>
                {!!lastCommitText && <span>{lastCommitText}</span>}
            </div>
            <Link
                to={repoUrl}
                title="Repo on github"
                className="hover:opacity-55 transition-opacity duration-200"
            >
                <GithubIcon className="size-10" />
            </Link>
        </Comp>
    );
};
