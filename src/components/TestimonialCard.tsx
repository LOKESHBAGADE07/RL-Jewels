import { motion } from 'framer-motion';

type Props = { name: string; text: string; avatar: string };
export const TestimonialCard = ({ name, text, avatar }: Props) => (
  <motion.div
    initial={{ opacity:0, y:20 }}
    whileInView={{ opacity:1, y:0 }}
    viewport={{ once:true }}
    transition={{ duration:0.5 }}
    className="bg-white border border-surface-300 p-6 rounded-xl shadow-sm flex flex-col gap-4"
  >
    <div className="flex items-center gap-4">
  <img src={avatar} alt={name} className="h-14 w-14 rounded-full object-cover border border-accent-gold/40" />
      <h4 className="font-semibold">{name}</h4>
    </div>
    <p className="text-sm text-ink-700 italic">“{text}”</p>
  </motion.div>
);
export default TestimonialCard;
