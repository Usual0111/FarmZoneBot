import { useState, useMemo } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { AirdropCard } from './components/AirdropCard';
import { AirdropFilters } from './components/AirdropFilters';
import { AirdropDetails } from './components/AirdropDetails';
import { UserStats } from './components/UserStats';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Calendar, 
  Target,
  Menu,
  Bell
} from 'lucide-react';

interface Airdrop {
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
}

interface Filter {
  type: string;
  value: string;
  label: string;
}

const mockAirdrops: Airdrop[] = [
  {
    id: '1',
    name: 'LayerZero',
    description: 'Omnichain interoperability protocol connecting different blockchains',
    longDescription: 'LayerZero is an omnichain interoperability protocol designed to facilitate the seamless movement of data and value across different blockchain networks. By participating in this airdrop, users can earn LZO tokens by using the protocol for cross-chain transactions.',
    logo: '',
    blockchain: 'Ethereum',
    reward: '500-2000 LZO',
    totalReward: '10M LZO',
    endDate: 'Dec 31, 2024',
    startDate: 'Jan 1, 2024',
    requirements: ['Bridge tokens', 'Use 3+ chains', 'Hold $100+'],
    steps: [
      'Connect your wallet to LayerZero protocol',
      'Bridge tokens between at least 3 different chains',
      'Maintain a minimum balance of $100 across chains',
      'Complete at least 5 cross-chain transactions',
      'Wait for snapshot and airdrop distribution'
    ],
    status: 'active',
    questType: 'passive',
    verified: true,
    website: 'https://layerzero.network',
    social: {
      twitter: '@LayerZero_Labs',
      discord: 'layerzero'
    }
  },
  {
    id: '2',
    name: 'zkSync Era',
    description: 'Layer 2 scaling solution for Ethereum with zero-knowledge proofs',
    longDescription: 'zkSync Era is a layer 2 scaling solution that uses zero-knowledge rollups to scale Ethereum. Users can earn ZK tokens by actively using the network for transactions, providing liquidity, and engaging with dApps.',
    logo: '',
    blockchain: 'Ethereum',
    reward: '100-1000 ZK',
    totalReward: '50M ZK',
    endDate: 'Jan 15, 2025',
    startDate: 'Mar 1, 2024',
    requirements: ['Bridge to zkSync', 'Use DeFi', '$50+ volume'],
    steps: [
      'Bridge ETH to zkSync Era network',
      'Interact with at least 3 different dApps',
      'Provide liquidity to DEX pools',
      'Complete transactions worth at least $50',
      'Hold assets on zkSync for minimum 30 days'
    ],
    status: 'active',
    questType: 'easy',
    verified: true,
    website: 'https://zksync.io',
    social: {
      twitter: '@zksync',
      discord: 'zksync'
    }
  },
  {
    id: '3',
    name: 'Scroll',
    description: 'zkEVM Layer 2 solution for Ethereum ecosystem',
    longDescription: 'Scroll is a zkEVM-based zkRollup on Ethereum that enables native compatibility for existing Ethereum applications and tools. Users can earn SCR tokens by using the network and participating in various activities.',
    logo: '',
    blockchain: 'Ethereum',
    reward: '200-800 SCR',
    totalReward: '15M SCR',
    endDate: 'Feb 28, 2025',
    startDate: 'Jun 1, 2024',
    requirements: ['Bridge assets', 'Mint NFT', 'Vote on governance'],
    steps: [
      'Bridge assets to Scroll network',
      'Mint NFTs on Scroll ecosystem',
      'Participate in governance voting',
      'Use decentralized exchanges',
      'Complete social media tasks'
    ],
    status: 'upcoming',
    questType: 'easy',
    verified: true,
    website: 'https://scroll.io',
    social: {
      twitter: '@Scroll_ZKP'
    }
  },
  {
    id: '4',
    name: 'Starknet',
    description: 'Decentralized ZK-Rollup operating as L2 network over Ethereum',
    longDescription: 'Starknet is a permissionless decentralized Validity-Rollup (also known as a "ZK-Rollup"). It operates as an L2 network over Ethereum, enabling any dApp to achieve unlimited scale.',
    logo: '',
    blockchain: 'Ethereum',
    reward: '1000-5000 STRK',
    totalReward: '100M STRK',
    endDate: 'Mar 15, 2025',
    startDate: 'Feb 1, 2024',
    requirements: ['Deploy contract', 'Use DeFi', 'Hold tokens'],
    steps: [
      'Deploy a smart contract on Starknet',
      'Use DeFi protocols like Jediswap',
      'Hold STRK tokens for governance',
      'Complete identity verification',
      'Participate in community activities'
    ],
    status: 'active',
    questType: 'passive',
    verified: true,
    website: 'https://starknet.io',
    social: {
      twitter: '@Starknet'
    }
  },
  {
    id: '5',
    name: 'Arbitrum Stylus',
    description: 'Next-generation programming environment for Arbitrum',
    longDescription: 'Arbitrum Stylus allows developers to write smart contracts in Rust, C, and C++ while maintaining full interoperability with Solidity contracts.',
    logo: '',
    blockchain: 'Arbitrum',
    reward: '50-500 ARB',
    totalReward: '5M ARB',
    endDate: 'Completed',
    startDate: 'Aug 1, 2024',
    requirements: ['Deploy Stylus contract', 'Use Rust/C++', 'Test mainnet'],
    steps: [
      'Deploy a contract using Stylus',
      'Write code in Rust or C++',
      'Test on Arbitrum mainnet',
      'Submit to verification',
      'Wait for distribution'
    ],
    status: 'completed',
    questType: 'easy',
    verified: true,
    website: 'https://arbitrum.io',
    social: {
      twitter: '@arbitrum'
    }
  }
];

const userStats = {
  totalEarned: '$2,450',
  totalParticipations: 12,
  successfulClaims: 8,
  pendingAirdrops: 4,
  successRate: 67,
  rank: 15420,
  totalUsers: 245890
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'stats'>('list');

  const filteredAirdrops = useMemo(() => {
    let filtered = mockAirdrops.filter(airdrop => {
      // Filter by status/tab
      if (activeTab !== 'all' && airdrop.status !== activeTab) {
        return false;
      }

      // Filter by search query
      if (searchQuery && !airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !airdrop.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !airdrop.blockchain.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Apply active filters
      for (const filter of activeFilters) {
        if (filter.type === 'quest_type') {
          if (filter.value === 'easy' && airdrop.questType !== 'easy') {
            return false;
          }
          if (filter.value === 'passive' && airdrop.questType !== 'passive') {
            return false;
          }
        }
      }

      return true;
    });

    return filtered;
  }, [searchQuery, activeTab, activeFilters]);

  const handleAirdropClick = (airdrop: Airdrop) => {
    setSelectedAirdrop(airdrop);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedAirdrop(null);
  };

  const getTabCounts = () => {
    const active = mockAirdrops.filter(a => a.status === 'active').length;
    const upcoming = mockAirdrops.filter(a => a.status === 'upcoming').length;
    const completed = mockAirdrops.filter(a => a.status === 'completed').length;
    return { active, upcoming, completed, all: mockAirdrops.length };
  };

  const tabCounts = getTabCounts();

  if (currentView === 'details' && selectedAirdrop) {
    return (
      <div className="min-h-screen bg-background p-4">
        <AirdropDetails 
          airdrop={selectedAirdrop} 
          onBack={handleBackToList}
        />
      </div>
    );
  }

  if (currentView === 'stats') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Your Stats</h1>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentView('list')}
            >
              Back to Airdrops
            </Button>
          </div>
          <UserStats stats={userStats} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Airdrop Hunter</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView('stats')}
              >
                <TrendingUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search airdrops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-4">
              <AirdropFilters
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </div>
          )}

          {/* Active Filter Badge */}
          {activeFilters.length > 0 && (
            <div className="flex justify-center mb-4">
              <Badge 
                variant="secondary" 
                className="rounded-full px-3 py-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => setActiveFilters([])}
              >
                {activeFilters[0].label}
              </Badge>
            </div>
          )}

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-1 text-xs">
                {tabCounts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              <Badge variant="secondary" className="ml-1 text-xs">
                {tabCounts.active}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming
              <Badge variant="secondary" className="ml-1 text-xs">
                {tabCounts.upcoming}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Done
              <Badge variant="secondary" className="ml-1 text-xs">
                {tabCounts.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredAirdrops.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium mb-2">No airdrops found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAirdrops.map((airdrop) => (
                <AirdropCard
                  key={airdrop.id}
                  {...airdrop}
                  onClick={() => handleAirdropClick(airdrop)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}