import { createStore, createEvent, sample } from "effector";
import { createGate } from "effector-react";
import { useSearchParams, SetURLSearchParams } from "react-router";

const SearchParamsGate = createGate<{
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}>();

export const updateSearchParams = createEvent<URLSearchParams>();

export const $searchParams = createStore<URLSearchParams>(
    new URLSearchParams(window.location.search)
);

$searchParams.on(updateSearchParams, (_, params) => params);

export const EffectorReactRouterSearchParamsBinding = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <SearchParamsGate
            searchParams={searchParams}
            setSearchParams={setSearchParams}
        />
    );
};

sample({
    clock: updateSearchParams,
    source: SearchParamsGate.state,
    fn: (gateState, newParams) => {
        gateState.setSearchParams(newParams);
        return newParams;
    },
    target: $searchParams,
});

export const createSearchParamApi = ({
    key,
    defaultValue /* before = String, after = String */,
}: {
    key: string;
    defaultValue: string | null;
}) => {
    const updateSpecificSearchParam = createEvent<string | null>();
    const $specificSearchParam = $searchParams.map(
        (params) => params.get(key) ?? defaultValue ?? ''
    );

    sample({
        clock: updateSpecificSearchParam,
        source: $searchParams,
        fn: (params, value) => {
            const newParams = new URLSearchParams(params);
            if (value === null) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
            return newParams;
        },
        target: updateSearchParams,
    });

    return { $store: $specificSearchParam, event: updateSpecificSearchParam };
};
