export interface ErrorViewProps { 
    message: string;
}

export const ErrorView = ({message}: ErrorViewProps) => {

    return <p>Error: {message}</p>;
}