import { ReactNode } from "react";

const Logo = () => (
    <div className="bg-gradient-to-r from-pink-400 to-violet-700 bg-clip-text text-transparent text-4xl font-bold">
        GIT-GQL
    </div>
);

export const Header = () => (
    <div className="fixed top-0 right-0 left-0 w-screen flex justify-between h-14">
        <Logo />
    </div>
);

export interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <div>
        <Header />
        {children}
    </div>
);
