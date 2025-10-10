import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from '@/types/SharedComponent';

const SharedButton: React.FC<ButtonProps> = ({ children, type = 'submit', onClick, variant, isLoading = false, className, ...props }) => {
  return (
    <Button type={type} className={cn('relative', className)} disabled={isLoading || props.disabled} {...props} onClick={onClick} variant={variant}>
      {isLoading && <Loader2 data-testid="loader-icon" className="absolute size-4 animate-spin" />}
      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </Button>
  );
};

export default SharedButton;
