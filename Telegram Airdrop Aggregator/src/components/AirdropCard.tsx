import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Clock, Users, Coins, ExternalLink, Star } from "lucide-react";

interface AirdropCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  blockchain: string;
  reward: string;
  endDate: string;
  requirements: string[];
  status: 'active' | 'upcoming' | 'completed';
  questType: 'easy' | 'passive';
  verified: boolean;
  onClick: () => void;
}

export function AirdropCard({
  name,
  description,
  logo,
  blockchain,
  reward,
  endDate,
  requirements,
  status,
  questType,
  verified,
  onClick
}: AirdropCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    upcoming: 'bg-blue-500',
    completed: 'bg-gray-500'
  };

  const questTypeLabels = {
    easy: '🎮 EASY QUESTS',
    passive: '💰 PASSIVE FARM'
  };

  const questTypeColors = {
    easy: 'bg-blue-100 text-blue-800',
    passive: 'bg-green-100 text-green-800'
  };

  return (
    <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
              {name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{name}</h3>
                {verified && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
              </div>
              <p className="text-sm text-muted-foreground">{blockchain}</p>
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-sm">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{reward}</span>
          </div>
          <Badge variant="outline" className={questTypeColors[questType]}>
            {questTypeLabels[questType]}
          </Badge>
        </div>

        <div className="flex items-center justify-start text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{endDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {requirements.slice(0, 2).map((req, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {req}
            </Badge>
          ))}
          {requirements.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{requirements.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}