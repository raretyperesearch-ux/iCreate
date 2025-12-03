export interface Token {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  marketCap: number;
  bondingCurveProgress: number; // 0 to 100
  creator: string;
  creatorUProfits: number; // Total profits generated for traders by this creator
  createdAt: number;
  monthlyRevenue?: number;
  yearlyRevenue?: number;
  change24h: number; // Percentage change
}

export interface Trade {
  id: string;
  tokenId: string;
  type: 'buy' | 'sell';
  amount: number; // in USDC
  tokens: number; // count of tokens
  price: number;
  user: string;
  timestamp: number;
}

export interface Comment {
  id: string;
  tokenId: string;
  user: string;
  text: string;
  timestamp: number;
  isAi: boolean;
}

export enum View {
  HOME = 'HOME',
  CREATE = 'CREATE',
  DETAIL = 'DETAIL',
  PROFILE = 'PROFILE',
  PRE_STARTUP = 'PRE_STARTUP',
}