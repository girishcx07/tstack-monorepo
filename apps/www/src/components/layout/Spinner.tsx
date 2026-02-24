import { Settings } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

function Spinner({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn('inline-block animate-spin duration-500', className)}>
      <Settings />
    </div>
  );
}

export default Spinner;
