import { ReactNode } from 'react';

type TrustBadgeProps = { icon: ReactNode; text: string; className?: string };
export const TrustBadge = ({ icon, text, className='' }: TrustBadgeProps) => (
  <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
    <div className="text-accent-gold text-3xl">{icon}</div>
    <p className="text-sm font-medium">{text}</p>
  </div>
);
export default TrustBadge;
