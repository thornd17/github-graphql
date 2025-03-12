import { ApolloProvider } from "@apollo/client";
import { githubApolloClient } from "@shared/api/graphql/apollo";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Route as RouteConfig } from "@shared/routing/routes";
import { RepositoryListPage } from "@pages/repository-list/ui/repository-list-page";
import { RepositoryDetailPage } from "@pages/repository-detail/ui/repository-detail-page";
import { EffectorReactRouterSearchParamsBinding } from "@shared/lib/search-params";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Layout } from "@widgets/layout/header";

dayjs.extend(relativeTime);

export const App = () => (
    <ApolloProvider client={githubApolloClient}>
        <BrowserRouter>
            <EffectorReactRouterSearchParamsBinding />
                <Routes>
                    <Route
                        index
                        element={
                            <Navigate to={RouteConfig.Repository.list()} />
                        }
                    />
                    <Route path="repositories">
                        <Route index element={<RepositoryListPage />} />
                        <Route
                            path=":owner/:name"
                            element={<RepositoryDetailPage />}
                        />
                    </Route>
                </Routes>
        </BrowserRouter>
    </ApolloProvider>
);
