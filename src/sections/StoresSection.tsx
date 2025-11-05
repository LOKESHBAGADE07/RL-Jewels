import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaMapPin } from 'react-icons/fa';
import { useLanguageStore } from '../stores/languageStore';
import SectionTitle from '../components/SectionTitle';

interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  latitude: number;
  longitude: number;
}

const stores: Store[] = [
  {
    id: 1,
    name: 'Jalgaon Branch',
    address: '169, Johari Bazar, BALAJI PETH, Jalgaon, Maharashtra 425001',
    phone: '0257-2226681',
    mapUrl: 'https://www.google.com/maps/place/RL+JEWELS+(RAJMAL+LAKHICHAND)/@21.0077241,75.5600329,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd90fa315b838d5:0x6e6ee75e2e6c18c1!8m2!3d21.0077241!4d75.5626078!16s%2Fg%2F1tg1_h15',
    latitude: 21.0077241,
    longitude: 75.5626078
  },
  {
    id: 2,
    name: 'Nashik Branch',
    address: 'City Plaza, Old Agra Rd, Opp Kalika Mandir, Nashik 422001',
    phone: '0253-2509991',
    mapUrl: 'https://www.google.com/maps/place/RL+Jewels+Nashik/@19.9975,73.7898,17z',
    latitude: 19.9975,
    longitude: 73.7898
  },
  {
    id: 3,
    name: 'Thane Branch',
    address: 'Opp Gaodevi, Shivaji Path Cross Rd, Naupada, Thane West 400602',
    phone: '022-25416121',
    mapUrl: 'https://www.google.com/maps/place/RL+Jewels+Thane/@19.1868,72.9669,17z',
    latitude: 19.1868,
    longitude: 72.9669
  }
];

export const StoresSection = () => {
  const { t } = useLanguageStore();

  return (
    <section id="stores" className="py-20 bg-gradient-to-b from-background-dark to-background-darker">
      <div className="max-content px-4">
        <SectionTitle 
          subtitle="Visit Us" 
          title={t.stores_title || "Our Stores"} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Mobile Layout: Horizontal Rectangle with 70% info + 30% map */}
              <div className="md:hidden bg-gradient-to-br from-brand-red to-brand-red-dark rounded-lg overflow-hidden shadow-lg transition-all duration-300 border border-brand-red/30">
                <div className="flex h-32">
                  {/* Left side: Store Info (70%) */}
                  <div className="w-[70%] p-3 flex flex-col">
                    <h3 className="text-sm font-serif font-bold text-white mb-1.5 tracking-wide">
                      {store.name}
                    </h3>
                    
                    {/* Address */}
                    <div className="flex items-start gap-1.5 mb-1.5">
                      <FaMapMarkerAlt className="text-white/90 text-xs mt-0.5 flex-shrink-0" />
                      <p className="text-white text-[10px] leading-tight line-clamp-2">
                        {store.address}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <FaPhone className="text-white/90 text-[10px] flex-shrink-0" />
                      <a 
                        href={`tel:${store.phone.replace(/[\s-]/g, '')}`}
                        className="text-white text-[10px] hover:text-brand-gold transition-colors font-medium"
                      >
                        {store.phone}
                      </a>
                    </div>

                    {/* Get Directions Button */}
                    <a
                      href={store.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto bg-white text-brand-red px-2 py-1.5 rounded-md font-semibold text-[10px] text-center hover:bg-brand-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <FaMapPin className="text-xs" />
                      Directions
                    </a>
                  </div>

                  {/* Right side: Map (30%) */}
                  <div className="w-[30%] relative bg-gray-100">
                    <iframe
                      src={`https://maps.google.com/maps?q=${store.latitude},${store.longitude}&hl=en&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                      title={`${store.name} Location`}
                    />
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet Layout: Original Vertical Card */}
              <div className="hidden md:block bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex-col border border-brand-red/30">
                {/* Map Preview - With Business Info Card */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <iframe
                    src={`https://maps.google.com/maps?q=${store.latitude},${store.longitude}&hl=en&z=16&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title={`${store.name} Location`}
                  />
                  {/* View larger map link */}
                  <a 
                    href={store.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute bottom-2 left-2 bg-white px-2.5 py-1 rounded text-xs text-blue-600 hover:text-blue-800 shadow-sm hover:shadow-md transition-all font-medium z-10"
                    aria-label={`View ${store.name} on Google Maps`}
                  >
                    View larger map
                  </a>
                </div>

                {/* Store Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 tracking-wide">
                    {store.name}
                  </h3>
                  
                  <div className="space-y-4 flex-1">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-white/90 text-xl mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                          Location
                        </p>
                        <p className="text-white text-sm leading-relaxed">
                          {store.address}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <FaPhone className="text-white/90 text-lg mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                          Phone
                        </p>
                        <a 
                          href={`tel:${store.phone.replace(/[\s-]/g, '')}`}
                          className="text-white text-sm hover:text-brand-gold transition-colors font-medium"
                        >
                          {store.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full bg-white text-brand-red px-6 py-3 rounded-lg font-semibold text-center hover:bg-brand-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                  >
                    <FaMapMarkerAlt />
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            {t.stores_note || "Visit any of our three branches to explore our exclusive collection of gold, diamond, and bridal jewelry. Our expert staff is ready to assist you in finding the perfect piece."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StoresSection;
