import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Filter {
  type: string;
  value: string;
  label: string;
}

interface AirdropFiltersProps {
  activeFilters: Filter[];
  onFilterChange: (filters: Filter[]) => void;
}

export function AirdropFilters({ activeFilters, onFilterChange }: AirdropFiltersProps) {
  const toggleFilter = (type: string, value: string, label: string) => {
    const exists = activeFilters.some(f => f.type === type && f.value === value);
    if (exists) {
      // Remove filter if it's already active
      onFilterChange([]);
    } else {
      // Replace any existing filter with the new one (only one filter at a time)
      onFilterChange([{ type, value, label }]);
    }
  };

  const isFilterActive = (type: string, value: string) => {
    return activeFilters.some(f => f.type === type && f.value === value);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={isFilterActive('quest_type', 'easy') ? 'default' : 'outline'}
            onClick={() => toggleFilter('quest_type', 'easy', '🎮 EASY QUESTS')}
            className="h-auto py-3 px-4"
          >
            🎮 EASY QUESTS
          </Button>
          
          <Button
            variant={isFilterActive('quest_type', 'passive') ? 'default' : 'outline'}
            onClick={() => toggleFilter('quest_type', 'passive', '💰 PASSIVE FARM')}
            className="h-auto py-3 px-4"
          >
            💰 PASSIVE FARM
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}