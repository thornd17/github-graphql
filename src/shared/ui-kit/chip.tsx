export interface ChipProps {
    children: React.ReactNode;
}
export const Chip = ({children}: ChipProps) => {
    return <li
        className="border py-1 px-2 rounded-md text-sm border-border"
    >
        {children}
    </li>;
};
