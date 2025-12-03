import React, { useState } from 'react';
import { Token } from '../types';
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, DollarSign, Lightbulb, ExternalLink, Users, Twitter, Cast } from 'lucide-react';

interface ProfileDashboardProps {
  userAddress: string;
  userTokens: Token[];
  onBack: () => void;
  onTokenClick: (token: Token) => void;
}

const formatCompactNumber = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number.toString();
  };

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ userAddress, userTokens, onBack, onTokenClick }) => {
  const [xConnected, setXConnected] = useState(false);
  const [farcasterConnected, setFarcasterConnected] = useState(false);
  
  // Calculate stats
  const totalMarketCap = userTokens.reduce((acc, token) => acc + token.marketCap, 0);
  const totalEarnings = totalMarketCap * 0.05; // Mock: Creator owns 5%
  const uProfits = totalMarketCap * 0.42; // Mock: Traders made 42% of the value (uProfits)
  const activeProjects = userTokens.length;
  const bestPerformingToken = [...userTokens].sort((a, b) => b.marketCap - a.marketCap)[0];
  
  // Mock Portfolio 24h Change (weighted average or simple sum)
  const portfolioChange = userTokens.length > 0 
    ? userTokens.reduce((acc, t) => acc + t.change24h, 0) / userTokens.length 
    : 0;

  const isPortfolioPositive = portfolioChange >= 0;

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-4 md:p-6 animate-[fadeIn_0.5s_ease-out]">
      <button 
        onClick={onBack} 
        className="self-start mb-8 flex items-center gap-2 text-gray-500 hover:text-apple-dark transition-colors px-4 py-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm"
      >
        <ArrowLeft size={18} /> <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity & Main Stats */}
        <div className="space-y-6">
           {/* Profile Card */}
           <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AA6F08] to-[#6C3A07]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-white text-2xl shadow-lg">
                   <Wallet size={28} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-apple-dark">My Startup</h2>
                   <p className="text-sm text-gray-500 font-mono bg-gray-100/50 px-2 py-1 rounded-md inline-block mt-1">{userAddress}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-white/20">
                    <span className="text-gray-500 text-sm font-medium">Total Balance</span>
                    <span className="text-xl font-bold text-apple-dark">24,500 USDC</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-white/20">
                    <span className="text-gray-500 text-sm font-medium">Creator Rank</span>
                    <span className="text-sm font-bold text-apple-blue bg-[#AA6F08]/10 px-3 py-1 rounded-full">#42 Global</span>
                 </div>
                 
                 {/* Social Connections */}
                 <div className="pt-2 space-y-2">
                    {/* X Button */}
                    {!xConnected ? (
                      <button 
                        onClick={() => setXConnected(true)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-black text-white rounded-2xl font-medium text-sm hover:opacity-80 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                      >
                        <Twitter size={16} fill="white" /> Connect X Account
                      </button>
                    ) : (
                      <button 
                        onClick={() => setXConnected(false)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-500 text-white rounded-2xl font-medium text-sm hover:bg-blue-600 transition-all shadow-sm"
                      >
                         <Twitter size={16} fill="white" className="text-white" /> @MyStartup
                      </button>
                    )}

                    {/* Farcaster Button */}
                    {!farcasterConnected ? (
                      <button 
                        onClick={() => setFarcasterConnected(true)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#855DCD] text-white rounded-2xl font-medium text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                      >
                        <Cast size={16} /> Connect Farcaster
                      </button>
                    ) : (
                      <button 
                        onClick={() => setFarcasterConnected(false)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#855DCD]/80 text-white rounded-2xl font-medium text-sm hover:bg-[#855DCD] transition-all shadow-sm"
                      >
                         <Cast size={16} className="text-white" /> @mystartup
                      </button>
                    )}
                 </div>
              </div>
           </div>

           {/* Total Equity Card */}
           <div className="bg-apple-dark text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <DollarSign size={120} />
              </div>
              <p className="text-gray-400 font-medium mb-1 uppercase tracking-wider text-xs">Total Equity Value</p>
              <h3 className="text-4xl font-bold mb-4">${totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Estimated value of your 5% creator allocation across all launched projects.
              </p>
           </div>

           {/* uProfits Card */}
           <div className="bg-white/70 backdrop-blur-xl border border-green-100 rounded-[32px] p-8 shadow-sm relative overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Users size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-apple-dark">uProfits</h3>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-green-600 tracking-tight">
                  ${uProfits.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Total profits generated for traders from your startup launches.
              </p>
           </div>
        </div>

        {/* Middle/Right Column: Analytics & Projects */}
        <div className="lg:col-span-2 space-y-6">
           {/* 24h Change Card (Replaces Chart) */}
           <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-xl font-bold text-apple-dark flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-apple-blue" /> 24h Portfolio Change
              </h3>
              
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${isPortfolioPositive ? 'bg-green-100/50' : 'bg-red-100/50'}`}>
                    {isPortfolioPositive 
                        ? <TrendingUp size={48} className="text-green-600" />
                        : <TrendingDown size={48} className="text-red-500" />
                    }
                </div>
                <div>
                    <span className={`text-5xl font-bold tracking-tight ${isPortfolioPositive ? 'text-green-600' : 'text-red-500'}`}>
                        {isPortfolioPositive ? '+' : ''}{portfolioChange.toFixed(2)}%
                    </span>
                    <p className="text-gray-500 mt-1 font-medium">Weighted average performance across all your projects in the last 24 hours.</p>
                </div>
              </div>
           </div>

           {/* Projects List */}
           <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-[32px] p-8 shadow-sm min-h-[300px]">
              <div className="flex justify-between items-end mb-6">
                 <div>
                    <h3 className="text-xl font-bold text-apple-dark flex items-center gap-2">
                       <Lightbulb size={20} className="text-yellow-500" /> Your Projects
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">You have launched {activeProjects} startups.</p>
                 </div>
                 {bestPerformingToken && (
                    <div className="text-right hidden sm:block">
                       <p className="text-xs text-gray-400 uppercase font-bold">Best Performer</p>
                       <p className="text-sm font-bold text-green-600">+{Math.floor(bestPerformingToken.change24h)}% ({bestPerformingToken.ticker})</p>
                    </div>
                 )}
              </div>

              <div className="space-y-3">
                 {userTokens.length === 0 ? (
                    <div className="text-center py-12 bg-white/30 rounded-2xl border border-dashed border-gray-300">
                       <p className="text-gray-400 mb-4">You haven't launched any projects yet.</p>
                       <button onClick={onBack} className="text-apple-blue font-bold text-sm hover:underline">Launch your first startup</button>
                    </div>
                 ) : (
                    userTokens.map(token => (
                       <div 
                         key={token.id}
                         onClick={() => onTokenClick(token)}
                         className="group flex items-center justify-between p-4 bg-white/70 hover:bg-white rounded-2xl border border-transparent hover:border-[#AA6F08]/20 transition-all cursor-pointer shadow-sm hover:shadow-md"
                       >
                          <div className="flex items-center gap-4">
                             <img src={token.imageUrl} alt={token.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                             <div>
                                <h4 className="font-bold text-apple-dark group-hover:text-apple-blue transition-colors">{token.name}</h4>
                                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">${token.ticker}</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-6 md:gap-12">
                             <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400 font-medium">Market Cap</p>
                                <p className="font-semibold text-gray-800">${token.marketCap.toLocaleString()}</p>
                             </div>
                             <div className="text-right min-w-[60px]">
                                <p className="text-xs text-gray-400 font-medium">Monthly Rev</p>
                                <div className="flex items-center gap-2 justify-end">
                                   <span className="font-bold text-apple-blue">${formatCompactNumber(token.monthlyRevenue || 0)}</span>
                                   <ExternalLink size={14} className="text-gray-300 group-hover:text-apple-blue transition-colors" />
                                </div>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};