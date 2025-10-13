import { RotatingTriangles, ThreeDots } from 'react-loader-spinner';

interface LoadingSpinnerProps {
  type?: 'fullPage' | 'page';
}

export const LoadingSpinner = ({ type = 'page' }: LoadingSpinnerProps) => {
  if (type === 'fullPage') {
    return (
      <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <RotatingTriangles ariaLabel="rotating-triangles-loading" />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center">
      <ThreeDots ariaLabel="threedots-loading" />
    </div>
  );
};
