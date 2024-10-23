import * as React from 'react';
import NavBar from "@/components/navbar/page";
import Container from "@mui/material/Container";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
    return (
        <div>
            <NavBar/>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#fff',
                    gap: 2
                }}
            >
                {children}
            </Container>
        </div>
    )
}