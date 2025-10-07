import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Trophy, 
  Coins, 
  Target, 
  TrendingUp, 
  Clock,
  CheckCircle
} from "lucide-react";

interface UserStatsProps {
  stats: {
    totalEarned: string;
    totalParticipations: number;
    successfulClaims: number;
    pendingAirdrops: number;
    successRate: number;
    rank: number;
    totalUsers: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Coins className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Earned</span>
              </div>
              <p className="font-medium">{stats.totalEarned}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Participations</span>
              </div>
              <p className="font-medium">{stats.totalParticipations}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Successful</span>
              </div>
              <p className="font-medium">{stats.successfulClaims}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-medium">{stats.pendingAirdrops}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="text-sm font-medium">{stats.successRate}%</span>
            </div>
            <Progress value={stats.successRate} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Global Rank</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              #{stats.rank.toLocaleString()} of {stats.totalUsers.toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}