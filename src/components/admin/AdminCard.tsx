import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function AdminCard({ title, description, icon: Icon, children, className }: AdminCardProps) {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className || ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}