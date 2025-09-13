import { motion } from 'framer-motion';

type Props = { title: string; img: string };
export const CollectionCard = ({ title, img }: Props) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg"
  >
    <img src={img} alt={title} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105 brightness-95" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 p-4 w-full drop-shadow">
      <h3 className="font-semibold text-lg text-white">{title}</h3>
  <p className="text-accent-gold text-sm opacity-0 group-hover:opacity-100 transition">View More →</p>
    </div>
  </motion.div>
);
export default CollectionCard;
