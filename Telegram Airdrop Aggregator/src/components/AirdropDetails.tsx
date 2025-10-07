import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Users, 
  Coins, 
  CheckCircle, 
  Star,
  Calendar,
  Target,
  Award
} from "lucide-react";

interface AirdropDetailsProps {
  airdrop: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    logo: string;
    blockchain: string;
    reward: string;
    totalReward: string;
    endDate: string;
    startDate: string;
    requirements: string[];
    steps: string[];
    status: 'active' | 'upcoming' | 'completed';
    questType: 'easy' | 'passive';
    verified: boolean;
    website: string;
    social: {
      twitter?: string;
      discord?: string;
      telegram?: string;
    };
  };
  onBack: () => void;
}

export function AirdropDetails({ airdrop, onBack }: AirdropDetailsProps) {
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
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                {airdrop.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle>{airdrop.name}</CardTitle>
                  {airdrop.verified && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                </div>
                <p className="text-muted-foreground">{airdrop.blockchain}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={questTypeColors[airdrop.questType]}>
                    {questTypeLabels[airdrop.questType]}
                  </Badge>
                  <div className={`w-3 h-3 rounded-full ${statusColors[airdrop.status]}`} />
                  <span className="text-sm text-muted-foreground capitalize">{airdrop.status}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-4">{airdrop.longDescription}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center text-center">
              <Award className="w-5 h-5 text-yellow-500 mb-2" />
              <p className="text-sm text-muted-foreground">Individual Reward</p>
              <p className="font-medium">{airdrop.reward}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Coins className="w-5 h-5 text-green-500 mb-2" />
              <p className="text-sm text-muted-foreground">Total Pool</p>
              <p className="font-medium">{airdrop.totalReward}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">{airdrop.endDate}</p>
            </div>
          </div>



          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="font-medium mb-3">Requirements</h3>
            <div className="flex flex-wrap gap-2">
              {airdrop.requirements.map((req, index) => (
                <Badge key={index} variant="secondary">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">How to Participate</h3>
            <div className="space-y-3">
              {airdrop.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="px-8">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}