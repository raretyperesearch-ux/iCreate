import React from 'react';
import { Bell, Clock, Users, Zap } from 'lucide-react';

interface UpcomingProject {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  launchTime: string;
  waitingCount: number;
}

const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    id: 'p1',
    name: 'Nebula AI',
    ticker: 'NEB',
    description: 'DeFi aggregated through neural networks. The last trading bot you will ever need.',
    imageUrl: 'https://picsum.photos/seed/nebula/400/300',
    launchTime: '04:23:12',
    waitingCount: 1420
  },
  {
    id: 'p2',
    name: 'EcoChain',
    ticker: 'LEAF',
    description: 'Carbon credits on-chain. Save the planet while you ape.',
    imageUrl: 'https://picsum.photos/seed/leaf/400/300',
    launchTime: '08:45:00',
    waitingCount: 890
  },
  {
    id: 'p3',
    name: 'SoundWave',
    ticker: 'WAVE',
    description: 'Decentralized music streaming where artists actually get paid.',
    imageUrl: 'https://picsum.photos/seed/wave/400/300',
    launchTime: '12:00:00',
    waitingCount: 2300
  }
];

export const PreStartup: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-4">
          <Zap size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Daily Drops</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-dark mb-4">
          Tomorrow's Unicorns.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Get exclusive early access to the three most anticipated startups launching in the next 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {UPCOMING_PROJECTS.map((project, index) => (
          <div 
            key={project.id}
            className="group relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Clock size={12} />
                {project.launchTime}
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                 <h3 className="text-white text-2xl font-bold tracking-tight">{project.name}</h3>
                 <span className="text-white/80 font-mono text-xs bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">${project.ticker}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users size={16} className="text-apple-blue" />
                    {project.waitingCount} waiting
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-400">
                    Coming Soon
                  </span>
                </div>

                <button className="w-full py-3 bg-apple-dark text-white rounded-2xl font-semibold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95">
                  <Bell size={16} /> Notify Me
                </button>
              </div>
            </div>
            
            {/* Index Badge */}
            <div className="absolute top-0 left-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-6xl font-bold text-white/10 select-none">0{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
         <p className="text-sm text-gray-400">Launches refresh daily at 00:00 UTC</p>
      </div>
    </div>
  );
};
