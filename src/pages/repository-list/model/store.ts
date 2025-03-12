import { createSearchParamApi } from "@shared/lib/search-params";
import { createEffect, createEvent, sample } from "effector";

export const { $store: $cursor, event: updateCursor } = createSearchParamApi({
    key: "cursor",
    defaultValue: null,
});

export const { $store: $direction, event: updateDirection } = createSearchParamApi({
    key: "direction",
    defaultValue: "after",
});

export const { $store: $search, event: updateSearch } = createSearchParamApi({
    key: "search",
    defaultValue: "",
});

export const fetchUserRepositoriesFx = createEffect();

export const nextPage = createEvent<string>();
export const prevPage = createEvent<string>();

export const makeSearch = createEvent<string>();

sample({
    clock: [nextPage, prevPage],
    fn: (cursor) => cursor,
    target: updateCursor,
});

sample({
    clock: nextPage,
    fn: () => "after",
    target: updateDirection,
});

sample({
    clock: prevPage,
    fn: () => "before",
    target: updateDirection,
});

sample({
    clock: updateSearch,
    fn: () => null,
    target: [updateCursor, updateDirection],
});

