import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface StatusPillProps {
  status: string;
  variant?: StatusVariant;
}

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  default: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20'
};

function getDefaultVariant(status: string): StatusVariant {
  const lower = status.toLowerCase();
  
  if (lower.includes('complete') || lower.includes('approved') || lower.includes('success') || lower === 'won' || lower === 'settled') {
    return 'success';
  }
  if (lower.includes('pending') || lower.includes('progress') || lower.includes('contacted')) {
    return 'warning';
  }
  if (lower.includes('failed') || lower.includes('rejected') || lower.includes('blocked') || lower === 'lost') {
    return 'danger';
  }
  if (lower.includes('new') || lower.includes('open') || lower.includes('active')) {
    return 'info';
  }
  return 'default';
}

export function StatusPill({ status, variant }: StatusPillProps) {
  const effectiveVariant = variant || getDefaultVariant(status);
  
  return (
    <Badge 
      variant="outline" 
      className={cn('border', variantStyles[effectiveVariant])}
    >
      {status}
    </Badge>
  );
}