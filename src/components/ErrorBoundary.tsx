import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-600">Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
}