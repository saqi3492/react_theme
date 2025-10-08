import { HillClimb, ThreeDots } from 'react-loader-spinner';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: number;
  color?: string;
  variant?: 'hillclimb' | 'threedots';
}

export const LoadingSpinner = ({ fullPage = false, size = 80, color = '#6366f1', variant = 'threedots' }: LoadingSpinnerProps) => {
  const spinner = (
    <div className="flex items-center justify-center">
      {variant === 'hillclimb' ? (
        <HillClimb visible={true} height={size} width={size} color={color} ariaLabel="hillclimb-loading" />
      ) : (
        <ThreeDots visible={true} height={size} width={size} color={color} ariaLabel="threedots-loading" />
      )}
    </div>
  );

  if (fullPage) {
    return <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">{spinner}</div>;
  }

  return <div className="flex min-h-[400px] items-center justify-center">{spinner}</div>;
};
