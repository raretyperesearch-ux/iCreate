import React, { useState, useEffect, useRef } from 'react';
import { Token, Trade, Comment } from '../types';
import { ArrowLeft, Send, Sparkles, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { analyzeSentiment } from '../services/geminiService';

interface TokenDetailProps {
  token: Token;
  onBack: () => void;
  onTrade: (token: Token, amount: number, isBuy: boolean) => void;
}

export const TokenDetail: React.FC<TokenDetailProps> = ({ token, onBack, onTrade }) => {
  const [amount, setAmount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [sentiment, setSentiment] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onTrade(token, parseFloat(amount), activeTab === 'buy');
    setAmount('');
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    const comment: Comment = {
      id: Date.now().toString(),
      tokenId: token.id,
      user: 'You',
      text: newComment,
      timestamp: Date.now(),
      isAi: false
    };
    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleAnalyze = async () => {
    const texts = comments.map(c => c.text);
    if (texts.length === 0) return;
    setSentiment("Analyzing market chatter...");
    const result = await analyzeSentiment(texts);
    setSentiment(result);
  };

  const isPositive = token.change24h >= 0;

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto p-4 md:p-6 animate-[fadeIn_0.5s_ease-out]">
      <button 
        onClick={onBack} 
        className="self-start mb-6 flex items-center gap-2 text-gray-500 hover:text-apple-dark transition-colors px-4 py-2 bg-white rounded-full shadow-sm"
      >
        <ArrowLeft size={18} /> <span className="text-sm font-medium">Back to Launchpad</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Column: Info & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="flex items-center gap-6 mb-8">
                <img src={token.imageUrl} alt={token.name} className="w-24 h-24 rounded-3xl shadow-lg object-cover" />
                <div>
                   <h1 className="text-4xl font-bold tracking-tight text-apple-dark mb-1">{token.name}</h1>
                   <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-bold text-lg tracking-wide">${token.ticker}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">USDC</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Market Cap</p>
                    <p className="text-3xl font-bold text-apple-blue">${token.marketCap.toLocaleString()}</p>
                </div>
                <div className={`rounded-2xl p-6 border ${isPositive ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <p className={`text-xs uppercase font-bold tracking-wider mb-2 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>24h Change</p>
                    <div className="flex items-center gap-2">
                        {isPositive ? <TrendingUp size={32} className="text-green-600" /> : <TrendingDown size={32} className="text-red-500" />}
                        <p className={`text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                           {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                        </p>
                    </div>
                </div>
             </div>
             
             <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                   <div>
                      <p className="text-xs uppercase font-bold text-gray-300">Monthly Revenue</p>
                      <p className="text-lg font-bold text-gray-800">${(token.monthlyRevenue || 0).toLocaleString()}</p>
                   </div>
                   <div className="h-8 w-px bg-gray-200"></div>
                   <div>
                      <p className="text-xs uppercase font-bold text-gray-300">Yearly Revenue</p>
                      <p className="text-lg font-bold text-gray-800">${(token.yearlyRevenue || 0).toLocaleString()}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-apple-dark">About the Startup</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{token.description}</p>
          </div>
        </div>

        {/* Right Column: Trade & Chat */}
        <div className="space-y-6 flex flex-col">
          {/* Trading Interface */}
          <div className="bg-white rounded-[32px] p-6 shadow-md border border-gray-100">
            <div className="flex p-1 bg-gray-100 rounded-2xl mb-6">
               <button 
                 onClick={() => setActiveTab('buy')}
                 className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'buy' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Buy
               </button>
               <button 
                 onClick={() => setActiveTab('sell')}
                 className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'sell' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Sell
               </button>
            </div>

            <form onSubmit={handleTrade} className="space-y-4">
               <div className="relative">
                 <input 
                   type="number" 
                   step="0.01"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   placeholder="0.00"
                   className="w-full px-4 py-4 bg-gray-50 rounded-2xl text-2xl font-bold outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all text-center"
                 />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">USDC</span>
               </div>
               
               <div className="flex justify-between text-xs font-medium text-gray-400 px-2">
                 <span>Balance: 12,500 USDC</span>
                 <span>Slippage: Auto</span>
               </div>

               <button 
                 type="submit"
                 className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all transform active:scale-[0.98] ${activeTab === 'buy' ? 'bg-apple-dark hover:bg-black' : 'bg-red-500 hover:bg-red-600'}`}
               >
                 {activeTab === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
               </button>
            </form>
          </div>

          {/* Chat / Feed */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden min-h-[400px]">
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-md">
               <h3 className="font-bold text-gray-800">Live Comments</h3>
               <button 
                  onClick={handleAnalyze}
                  className="text-[10px] flex items-center gap-1 bg-[#AA6F08]/10 text-apple-blue px-2 py-1 rounded-full font-bold hover:bg-[#AA6F08]/20 transition"
               >
                 <Sparkles size={10} /> Analyze
               </button>
             </div>
             
             {sentiment && (
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100 text-xs text-yellow-800 font-medium">
                   AI Insight: {sentiment}
                </div>
             )}

             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {comments.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm mt-10">No comments yet. Be the first.</div>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="flex gap-2 animate-[fadeIn_0.2s_ease-out]">
                       <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0" />
                       <div className="bg-white p-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                          <p className="text-[10px] font-bold text-gray-400 mb-0.5">{c.user}</p>
                          <p className="text-sm text-gray-800 leading-tight">{c.text}</p>
                       </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
             </div>

             <div className="p-3 bg-white border-t border-gray-100">
                <form onSubmit={handleComment} className="relative">
                   <input 
                     type="text"
                     value={newComment}
                     onChange={(e) => setNewComment(e.target.value)}
                     placeholder="Say something..."
                     className="w-full pl-4 pr-10 py-3 bg-gray-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-apple-blue/20 transition-all"
                   />
                   <button 
                     type="submit"
                     disabled={!newComment}
                     className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-apple-dark text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black transition-all"
                   >
                     <Send size={14} />
                   </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};