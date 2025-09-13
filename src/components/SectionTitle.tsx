type SectionTitleProps = { subtitle?: string; title: string; align?: 'left' | 'center'; tone?: 'default' | 'light' };
export const SectionTitle = ({ subtitle, title, align='center', tone='default' }: SectionTitleProps) => {
  const accent = tone === 'light' ? 'text-accent-gold' : 'text-brand-red';
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {subtitle && <p className={`uppercase tracking-widest ${accent} text-[11px] font-medium mb-2`}>{subtitle}</p>}
      <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <div className={`mt-4 h-0.5 w-24 bg-accent-gold ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
};
export default SectionTitle;
