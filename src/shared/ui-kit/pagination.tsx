import { cn } from "@shared/utils/cn";

export interface PaginationProps {
    pagesShowLimit?: number;
    pagesCount: number;
    currentPage?: number;
    onChange?: (page: number) => void;
    className?: string;
}

export const Pagination = (props: PaginationProps) => {
    const {
        pagesCount,
        pagesShowLimit = 10,
        currentPage = 1,
        onChange,
        className,
    } = props;

    return (
        <div className={cn("flex gap-2", className)}>
            {Array.from({ length: pagesCount }, (_, i) => i + 1).map((page) => {
                const isCurrent = page === currentPage;
                const isNear = Math.abs(page - currentPage) <= pagesShowLimit;

                if (isCurrent || isNear) {
                    return (
                        <button
                            key={page}
                            className={cn(
                                `h-8 w-8 font-medium text-md border cursor-pointer py-1 px-2 transition-colors duration-200 rounded-md border-border`,
                                isCurrent
                                    ? "bg-accent hover:opacity-75 text-accent-foreground"
                                    : "hover:border-accent"
                            )}
                            onClick={() => onChange?.(page)}
                        >
                            {page}
                        </button>
                    );
                }
            })}
        </div>
    );
};
