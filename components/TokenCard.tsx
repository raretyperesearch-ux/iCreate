import React from 'react';
import { Token } from '../types';
import { User, ShoppingBag } from 'lucide-react';

interface TokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
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

export const TokenCard: React.FC<TokenCardProps> = ({ token, onClick }) => {
  return (
    <div 
      onClick={() => onClick(token)}
      className="group bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-3xl p-5 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex flex-col justify-between h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <img 
            src={token.imageUrl} 
            alt={token.name} 
            className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-gray-100"
          />
          <div className="absolute -bottom-2 -right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {token.ticker}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Market Cap</p>
          <p className="text-sm font-semibold text-apple-dark">${token.marketCap.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-lg font-semibold text-apple-dark leading-tight group-hover:text-apple-blue transition-colors">
          {token.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {token.description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="mt-4 bg-gray-50/80 rounded-2xl p-3 flex items-center justify-between border border-gray-100/50">
          <div>
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Monthly Rev</p>
             <p className="text-sm font-bold text-apple-dark">${formatCompactNumber(token.monthlyRevenue || 0)}</p>
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          <div className="text-right">
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Yearly Rev</p>
             <p className="text-sm font-bold text-apple-dark">${formatCompactNumber(token.yearlyRevenue || 0)}</p>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-end text-[10px] text-gray-400">
           <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
              <ShoppingBag size={10} /> Verified
           </div>
            <div className="text-right">
               <span className="flex items-center justify-end gap-1">
                 <User size={10} /> by {token.creator.substring(0, 6)}
               </span>
               <span className="block text-[9px] text-green-600 font-bold mt-0.5">
                 uProfits: ${formatCompactNumber(token.creatorUProfits)}
               </span>
            </div>
        </div>
      </div>
    </div>
  );
};