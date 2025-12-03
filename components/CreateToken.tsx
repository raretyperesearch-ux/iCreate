import React, { useState } from 'react';
import { generateStartupPitch } from '../services/geminiService';
import { Sparkles, X, Upload, ShoppingBag, Check, Wallet, FileText, CreditCard } from 'lucide-react';
import { Token } from '../types';

interface CreateTokenProps {
  onClose: () => void;
  onCreate: (token: Token) => void;
}

export const CreateToken: React.FC<CreateTokenProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [isConnectingShopify, setIsConnectingShopify] = useState(false);

  // New states
  const [paypalConnected, setPaypalConnected] = useState(false);
  const [quickbooksConnected, setQuickbooksConnected] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);

  const handleGeneratePitch = async () => {
    if (!name || !ticker) return;
    setIsGenerating(true);
    const pitch = await generateStartupPitch(name, ticker);
    setDescription(pitch);
    setIsGenerating(false);
  };

  const handleConnectShopify = () => {
    setIsConnectingShopify(true);
    setTimeout(() => {
        setShopifyConnected(true);
        setIsConnectingShopify(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Revenue simulation: Base random + bonus for each connection
    let revenueBase = 0;
    if (shopifyConnected) revenueBase += Math.floor(Math.random() * 30000) + 5000;
    if (paypalConnected) revenueBase += Math.floor(Math.random() * 10000) + 1000;
    if (stripeConnected) revenueBase += Math.floor(Math.random() * 20000) + 2000;
    if (quickbooksConnected) revenueBase += Math.floor(Math.random() * 15000) + 1000;

    const monthlyRev = revenueBase;
    
    const newToken: Token = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      ticker: ticker.toUpperCase(),
      description,
      imageUrl: `https://picsum.photos/seed/${ticker}/200/200`,
      marketCap: 5000,
      bondingCurveProgress: 0,
      creator: 'You',
      creatorUProfits: 0, // New creators start with 0 history
      createdAt: Date.now(),
      monthlyRevenue: monthlyRev,
      yearlyRevenue: monthlyRev * 12,
      change24h: 0
    };
    onCreate(newToken);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-md p-8 overflow-hidden animate-[fadeIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Warm Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#AA6F08] via-[#945D07] to-[#6C3A07] opacity-80" />
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-apple-dark">Create Pre Startup</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">Business Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Online Store"
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-apple-blue/20 outline-none transition-all text-lg font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">Ticker</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400 font-bold">$</span>
              <input 
                type="text" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="STORE"
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-apple-blue/20 outline-none transition-all text-lg font-bold uppercase"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">Data Integrations</label>
             
             {/* Shopify */}
             {!shopifyConnected ? (
                <button 
                  type="button"
                  onClick={handleConnectShopify}
                  disabled={isConnectingShopify}
                  className="w-full py-3 px-4 bg-[#95BF47] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#85AB3F] transition-all shadow-sm active:scale-[0.98]"
                >
                  {isConnectingShopify ? (
                     <span>Verifying Store...</span>
                  ) : (
                     <>
                        <ShoppingBag size={18} /> Connect Shopify
                     </>
                  )}
                </button>
             ) : (
                <div className="w-full py-3 px-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-semibold flex items-center justify-center gap-2">
                   <Check size={18} /> Shopify Connected
                </div>
             )}

             {/* Additional Integrations */}
             <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                    type="button"
                    onClick={() => setPaypalConnected(!paypalConnected)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all border border-b-2 ${
                        paypalConnected 
                        ? 'bg-[#003087]/10 border-[#003087] text-[#003087]' 
                        : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                    }`}
                >
                    {paypalConnected ? <Check size={16} /> : <Wallet size={16} />}
                    PayPal
                </button>
                <button
                    type="button"
                    onClick={() => setQuickbooksConnected(!quickbooksConnected)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all border border-b-2 ${
                        quickbooksConnected 
                        ? 'bg-[#2CA01C]/10 border-[#2CA01C] text-[#2CA01C]' 
                        : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                    }`}
                >
                     {quickbooksConnected ? <Check size={16} /> : <FileText size={16} />}
                    QuickBooks
                </button>
                <button
                    type="button"
                    onClick={() => setStripeConnected(!stripeConnected)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all border border-b-2 ${
                        stripeConnected 
                        ? 'bg-[#635BFF]/10 border-[#635BFF] text-[#635BFF]' 
                        : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                    }`}
                >
                    {stripeConnected ? <Check size={16} /> : <CreditCard size={16} />}
                    Stripe
                </button>
             </div>

             <p className="text-[10px] text-gray-400 text-center mt-1">Connect sources to verify revenue on your token card.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">The Pitch</label>
              <button 
                type="button"
                onClick={handleGeneratePitch}
                disabled={!name || !ticker || isGenerating}
                className="flex items-center gap-1.5 text-[10px] font-bold text-apple-blue bg-[#AA6F08]/10 px-2 py-1 rounded-full hover:bg-[#AA6F08]/20 disabled:opacity-50 transition-colors"
              >
                <Sparkles size={12} />
                {isGenerating ? 'Thinking...' : 'Auto-Generate'}
              </button>
            </div>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your brand and vision..."
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-apple-blue/20 outline-none transition-all resize-none h-24 text-sm leading-relaxed"
              required
            />
          </div>

          <div className="pt-2">
             <div className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <Upload size={20} />
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-semibold text-apple-blue">Click to upload</span> logo
                </div>
             </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-apple-dark text-white rounded-2xl font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
          >
            Launch Token
          </button>
        </form>
      </div>
    </div>
  );
};