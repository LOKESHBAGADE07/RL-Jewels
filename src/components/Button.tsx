import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export const Button = ({ children, variant='primary', onClick, className='', type='button', disabled=false }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold tracking-wide transition-colors text-sm md:text-base';
  const styles = variant === 'primary'
    ? 'bg-brand-red text-white shadow hover:bg-brand-red-dark'
    : 'border border-accent-gold text-brand-red relative overflow-hidden hover:bg-accent-gold/10';
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${base} ${styles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {variant === 'secondary' && (
        <span className="absolute inset-0 bg-accent-gold/10 opacity-0 hover:opacity-100 transition-opacity" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
export default Button;
