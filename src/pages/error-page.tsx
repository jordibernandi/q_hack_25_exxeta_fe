import { AlertCircle, Home } from 'lucide-react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || error.data?.message || 'An unexpected error occurred';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unexpected error occurred';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">{statusCode ? `Error ${statusCode}` : 'Error'}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{errorMessage}</p>
      <Link to="/">
        <Button className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
