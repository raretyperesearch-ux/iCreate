import React, { useState, useEffect } from 'react';
import { View, Token } from './types';
import { TokenCard } from './components/TokenCard';
import { TokenDetail } from './components/TokenDetail';
import { CreateToken } from './components/CreateToken';
import { ProfileDashboard } from './components/ProfileDashboard';
import { PreStartup } from './components/PreStartup';
import { Plus, Search, Wallet, User } from 'lucide-react';

const MOCK_TOKENS: Token[] = [
  {
    id: '1',
    name: 'PureLife Organics',
    ticker: 'PURE',
    description: 'Certified organic supplements and wellness products. 15k+ monthly subscribers verified on Shopify.',
    imageUrl: 'https://picsum.photos/seed/pure/200/200',
    marketCap: 450000,
    bondingCurveProgress: 65,
    creator: '0xSarah',
    creatorUProfits: 125000,
    createdAt: Date.now(),
    monthlyRevenue: 85000,
    yearlyRevenue: 1020000,
    change24h: 12.5
  },
  {
    id: '2',
    name: 'Vision Pro Accessories',
    ticker: 'VPA',
    description: 'Premium aftermarket straps and cases for spatial computing headsets. High margin niche.',
    imageUrl: 'https://picsum.photos/seed/vpa/200/200',
    marketCap: 8900,
    bondingCurveProgress: 12,
    creator: 'TimC',
    creatorUProfits: 1200,
    createdAt: Date.now() - 100000,
    monthlyRevenue: 850,
    yearlyRevenue: 10200,
    change24h: -4.2
  },
  {
    id: '3',
    name: 'Nova Streetwear',
    ticker: 'NOVA',
    description: 'Limited edition urban fashion drops. 500k+ social following and sold-out inventory every month.',
    imageUrl: 'https://picsum.photos/seed/nova/200/200',
    marketCap: 890000,
    bondingCurveProgress: 92,
    creator: 'Jony',
    creatorUProfits: 340000,
    createdAt: Date.now() - 500000,
    monthlyRevenue: 145000,
    yearlyRevenue: 1740000,
    change24h: 24.8
  },
  // Add a token created by the current user "You" to demo the profile
  {
    id: '4',
    name: 'My Startup',
    ticker: 'MINE',
    description: 'This is a test project created by the user.',
    imageUrl: 'https://picsum.photos/seed/mine/200/200',
    marketCap: 50000,
    bondingCurveProgress: 25,
    creator: 'You',
    creatorUProfits: 21000,
    createdAt: Date.now() - 200000,
    monthlyRevenue: 2100,
    yearlyRevenue: 25200,
    change24h: 2.1
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress] = useState('0x847...F2A'); // Mock connected address

  // Filter tokens based on search
  const filteredTokens = tokens.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userTokens = tokens.filter(t => t.creator === 'You' || t.creator === userAddress);

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setCurrentView(View.DETAIL);
  };

  const handleCreateToken = (token: Token) => {
    // Ensure creator is set to 'You' for demo purposes so it shows in profile
    const tokenWithUser = { ...token, creator: 'You' };
    setTokens([tokenWithUser, ...tokens]);
    setShowCreateModal(false);
    // Optionally go straight to detail or stay on home
    handleTokenClick(tokenWithUser);
  };

  const handleBack = () => {
    setSelectedToken(null);
    setCurrentView(View.HOME);
  };

  const handleTrade = (token: Token, amount: number, isBuy: boolean) => {
    // Simulate trade logic updating local state
    const updatedTokens = tokens.map(t => {
      if (t.id === token.id) {
        const mcImpact = amount * 1000; // Mock price impact
        const curveImpact = amount * 0.5;
        // Mock 24h change impact
        const changeImpact = isBuy ? (amount / 10) : -(amount / 10);

        const newMc = isBuy ? t.marketCap + mcImpact : Math.max(0, t.marketCap - mcImpact);
        const newProgress = isBuy 
          ? Math.min(100, t.bondingCurveProgress + curveImpact) 
          : Math.max(0, t.bondingCurveProgress - curveImpact);
        
        return { 
          ...t, 
          marketCap: newMc, 
          bondingCurveProgress: newProgress,
          change24h: t.change24h + changeImpact
        };
      }
      return t;
    });
    setTokens(updatedTokens);
    if (selectedToken) {
        setSelectedToken(updatedTokens.find(t => t.id === selectedToken.id) || null);
    }
    alert(`Successfully ${isBuy ? 'bought' : 'sold'} ${amount} USDC worth of ${token.ticker}`);
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-apple-blue/20 overflow-x-hidden">
      {/* Background gradients for glass effect - Updated to Warm Gold/Brown tones */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#AA6F08]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#6C3A07]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-[#EDE8E2] rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-apple-gray/60 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-8">
          <div 
            className="cursor-pointer flex items-center gap-1 group"
            onClick={() => setCurrentView(View.HOME)}
          >
            <img 
              src="https://i.postimg.cc/jWcSbf47/glass-banana.png" 
              alt="iCreate Logo" 
              className="w-14 h-14 object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[10deg]" 
            />
            <span className="text-3xl font-bold tracking-tighter text-apple-dark" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.05em' }}>iCreate</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 p-1 bg-white/40 rounded-full backdrop-blur-sm border border-white/20">
            <button 
              onClick={() => setCurrentView(View.HOME)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentView === View.HOME || currentView === View.DETAIL 
                  ? 'bg-white shadow-sm text-apple-dark' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Live Startups
            </button>
            <button 
              onClick={() => setCurrentView(View.PRE_STARTUP)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentView === View.PRE_STARTUP 
                  ? 'bg-white shadow-sm text-apple-dark' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Pre-Startups
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (!walletConnected) {
                setWalletConnected(true);
              } else {
                setCurrentView(View.PROFILE);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              walletConnected 
                ? 'bg-white/50 border border-white/40 text-apple-dark hover:bg-white/80 backdrop-blur-md' 
                : 'bg-apple-dark text-white hover:bg-black shadow-lg hover:shadow-xl hover:scale-105'
            }`}
          >
            {walletConnected ? (
              <>
                 <User size={16} />
                 <span>{userAddress}</span>
              </>
            ) : (
              <>
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {currentView === View.HOME && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            {/* Hero Section */}
            <div className="text-center py-12 mb-8 relative">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-apple-dark to-[#6C3A07]">
                Launch different.
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-8">
                The premium launchpad for online businesses.
                Verify Shopify revenue, launch token, instant liquidity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
                <div className="relative w-full group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-apple-blue transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search for startups..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/20 bg-white/60 backdrop-blur-md shadow-sm focus:ring-2 focus:ring-apple-blue/20 outline-none transition-all text-lg"
                  />
                </div>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="group w-full sm:w-auto px-8 py-4 bg-apple-blue text-white rounded-2xl font-semibold text-lg hover:bg-apple-blue-hover transition-all duration-300 shadow-lg shadow-[#AA6F08]/20 hover:shadow-[#AA6F08]/40 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Plus size={20} className="transition-transform duration-300 group-hover:rotate-90" /> Create
                </button>
              </div>
            </div>

            {/* Token Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTokens.map(token => (
                <TokenCard key={token.id} token={token} onClick={handleTokenClick} />
              ))}
            </div>

            {filteredTokens.length === 0 && (
              <div className="text-center py-20 bg-white/30 rounded-[32px] border border-dashed border-gray-300 backdrop-blur-sm">
                <p className="text-gray-400 text-lg">No startups found. Be the first to launch one.</p>
              </div>
            )}
          </div>
        )}

        {currentView === View.DETAIL && selectedToken && (
          <TokenDetail 
            token={selectedToken} 
            onBack={handleBack}
            onTrade={handleTrade}
          />
        )}

        {currentView === View.PROFILE && (
          <ProfileDashboard 
            userAddress={userAddress}
            userTokens={userTokens}
            onBack={() => setCurrentView(View.HOME)}
            onTokenClick={handleTokenClick}
          />
        )}

        {currentView === View.PRE_STARTUP && (
          <PreStartup />
        )}
      </main>

      {/* Modals */}
      {showCreateModal && (
        <CreateToken 
          onClose={() => setShowCreateModal(false)} 
          onCreate={handleCreateToken}
        />
      )}

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm mt-12 border-t border-gray-200/50 backdrop-blur-sm">
        <p>© 2024 iCreate. Designed in California. Built on Solana.</p>
      </footer>
    </div>
  );
}