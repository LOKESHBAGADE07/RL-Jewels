import { useEffect, useState } from 'react';
import { FaSync } from 'react-icons/fa';
import { useGoldRate } from '../stores/goldRate';

type Rates = { gold24K: number; gold22K: number; updatedAt: string };

const mockFetchRates = async (): Promise<Rates> => {
  // Placeholder: replace with real API call later
  await new Promise(r => setTimeout(r, 400));
  const now = new Date();
  return {
    gold24K: 7325, // per gram (mock)
    gold22K: 6710,
    updatedAt: now.toISOString()
  };
};

export const MetalRateTicker = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(false);
  const setRate = useGoldRate(s => s.setRate);
  const refresh = async () => {
    setLoading(true);
    const r = await mockFetchRates();
    setRates(r);
    // Use 22K for pricing breakdown across PDP by default
    setRate(r.gold22K);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);
  return (
    <div className="w-full bg-black/60 backdrop-blur text-[11px] md:text-xs text-text-secondary flex items-center gap-4 px-4 h-8 border-b border-white/10">
      <div className="flex items-center gap-3 whitespace-nowrap overflow-x-auto scrollbar-none">
        {rates ? (
          <>
            <span className="text-accent-gold font-medium">24K ₹{rates.gold24K}/g</span>
            <span>22K ₹{rates.gold22K}/g</span>
            <span className="opacity-70">Updated {new Date(rates.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </>
        ) : (
          <span>Loading metal rates…</span>
        )}
      </div>
      <button
        onClick={refresh}
        aria-label="Refresh rates"
  className="ml-auto flex items-center gap-1 text-accent-gold hover:text-white transition disabled:opacity-40"
        disabled={loading}
      >
        <FaSync className={loading ? 'animate-spin' : ''} />
        Refresh
      </button>
    </div>
  );
};

export default MetalRateTicker;