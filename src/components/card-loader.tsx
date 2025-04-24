import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner" // Import your spinner component

interface CardLoaderProps {
    title?: string;       // Optional title for the card
    description?: string; // Optional description for the card
    isLoading: boolean;    // Boolean to control when to show the loader
    children?: React.ReactNode; // Optional children to render when not loading
    count?: number;      // Number of loading skeletons to show - not used with centered spinner
}

const CardLoader: React.FC<CardLoaderProps> = ({
    title,
    description,
    isLoading,
    children,
    count, // Removed default value here
}) => {
    if (!isLoading) {
        return <>{children}</>; // Render the actual content when not loading
    }

    //  Render a centered spinner
    return (
        <Card className='w-full'>
            {title && <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>}
            <CardContent>
                <div className="flex flex-col items-center justify-center p-6 h-full">
                    <Spinner size="large" />
                    <p>Loading...</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardLoader;
