import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  badge?: string;
}

export function StatsCard({ title, value, description, icon, trend, badge }: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <span className="text-xl">{icon}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className={`text-2xl font-bold ${getTrendColor()}`}>
            {value}
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <CardDescription className="mt-1 text-xs">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}