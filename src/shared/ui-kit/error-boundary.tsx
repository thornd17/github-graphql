import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export interface ErrorBoundaryProps {
    children: React.ReactNode;
    renderFallback: (error: unknown) => React.ReactNode;
}
// //noop
export const ErrorBoundary = ({
    children,
    renderFallback,
}: ErrorBoundaryProps) => (
    <ReactErrorBoundary fallbackRender={({ error }) => renderFallback(error)}>
        {children}
    </ReactErrorBoundary>
);
