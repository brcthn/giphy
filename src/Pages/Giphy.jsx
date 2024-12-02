import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEvents } from '../util/http.js';
import Header from '../Pages/Header.jsx';
import Box from '@mui/material/Box';
import React from 'react';
import LoadingIndicator from "../Components/LoadingIndicator.jsx";
import Error from '../Components/Error.jsx';
import { useCallback, useMemo, useRef } from "react";

export default function Giphy() {
    const observer = useRef();
    let content;
    const { data, isError, error, fetchNextPage, hasNextPage, isFetching, isPending } = useInfiniteQuery({
        queryKey: ["todos"],
        initialPageParam: 0,
        queryFn: fetchEvents,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined
            }
            return lastPageParam + 1
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined
            }
            return firstPageParam - 1
        },


    });

    const todos = useMemo(() => {
        if (!data || !data.pages) return [];

        return data?.pages.reduce((acc, page) => {
            return [...acc, ...page.events];
        }, []);
    }, [data]);


    const lastElementRef = useCallback(
        (node) => {
            if (isPending) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                    fetchNextPage();
                }
            }, { threshold: 0.1 });

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetching, isPending]
    );
    if (isPending || isFetching) {
        content = <LoadingIndicator />
    }

    else if (isError) {
        content = (
            <Error title="An error occurred" message={error.info?.message || "Failed to fetch events"} />
        );
    }
    else {
        content = <Box sx={{
            display: 'flex', justifyContent: 'center', width: '100%', minHeight: 1029,
        }} >
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {todos &&
                    todos.map((item, index) => (
                        <div key={`${item.id}-${index}`} ref={index === todos.length - 1 ? lastElementRef : null} className="mb-2 break-inside-avoid">
                            <img
                                srcSet={`${item.images.original.url}?w=162&auto=format&dpr=2 2x`}
                                src={`${item.images.original.url}?w=162&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                }}

                            />
                        </div>
                    ))}

            </div>
        </Box >
    }

    return (
        <div>
            <Header></Header>
            {content}
        </div >
    );
};
