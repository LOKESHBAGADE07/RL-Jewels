export type Language = 'en' | 'hi' | 'mr';

export interface Translation {
  // Navigation
  nav_home: string;
  nav_collections: string;
  nav_occasions: string;
  nav_savings: string;
  nav_heritage: string;
  nav_reviews: string;
  nav_faq: string;
  nav_blog: string;
  nav_contact: string;
  
  // Hero Section
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_browse_btn: string;
  hero_contact_btn: string;
  
  // Collections
  collections_title: string;
  collections_subtitle: string;
  view_all: string;
  
  // Products
  product_enquire_whatsapp: string;
  product_add_wishlist: string;
  product_remove_wishlist: string;
  product_out_of_stock: string;
  product_purity: string;
  product_weight: string;
  product_available: string;
  product_share: string;
  
  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  contact_visit_showroom: string;
  contact_address: string;
  contact_hours: string;
  
  // Footer
  footer_tagline: string;
  footer_about: string;
  footer_customer_service: string;
  footer_policies: string;
  footer_copyright: string;
  
  // Common
  search_placeholder: string;
  loading: string;
  error: string;
  learn_more: string;
  read_more: string;
  
  // Occasions
  occasions_wedding: string;
  occasions_festive: string;
  occasions_daily: string;
  occasions_office: string;
  occasions_gifting: string;
  
  // Messaging
  no_online_sales: string;
  visit_store_pricing: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_collections: 'Collections',
    nav_occasions: 'Occasions',
    nav_savings: 'Savings Plan',
    nav_heritage: 'Heritage',
    nav_reviews: 'Reviews',
    nav_faq: 'FAQ',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    
    // Hero
    hero_title: 'RL Jewels',
    hero_subtitle: 'Purity • Transparency • Craftsmanship',
    hero_description: 'Showcasing exquisite jewelry since 1984. Visit our showroom in Jalgaon for pricing and purchase.',
    hero_browse_btn: 'Browse Collections',
    hero_contact_btn: 'Contact Us',
    
    // Collections
    collections_title: 'Our Collections',
    collections_subtitle: 'Discover our curated jewelry collections',
    view_all: 'View All',
    
    // Products
    product_enquire_whatsapp: 'Enquire on WhatsApp',
    product_add_wishlist: 'Add to Wishlist',
    product_remove_wishlist: 'Remove from Wishlist',
    product_out_of_stock: 'Out of Stock',
    product_purity: 'Purity',
    product_weight: 'Weight',
    product_available: 'Available',
    product_share: 'Share',
    
    // Contact
    contact_title: 'Visit Our Showroom',
    contact_subtitle: 'Experience our jewelry in person',
    contact_phone: 'Phone',
    contact_whatsapp: 'WhatsApp',
    contact_email: 'Email',
    contact_visit_showroom: 'Visit Showroom',
    contact_address: 'Address',
    contact_hours: 'Business Hours',
    
    // Footer
    footer_tagline: 'Jewelry Since 1984',
    footer_about: 'About',
    footer_customer_service: 'Customer Service',
    footer_policies: 'Policies',
    footer_copyright: '© 2024 RL Jewels. All rights reserved.',
    
    // Common
    search_placeholder: 'Search jewelry...',
    loading: 'Loading...',
    error: 'Error',
    learn_more: 'Learn More',
    read_more: 'Read More',
    
    // Occasions
    occasions_wedding: 'Wedding',
    occasions_festive: 'Festive',
    occasions_daily: 'Daily Wear',
    occasions_office: 'Office',
    occasions_gifting: 'Gifting',
    
    // Messaging
    no_online_sales: 'We don\'t sell online',
    visit_store_pricing: 'Visit our showroom or contact us for pricing and purchase',
  },
  
  hi: {
    // Navigation
    nav_home: 'होम',
    nav_collections: 'संग्रह',
    nav_occasions: 'अवसर',
    nav_savings: 'बचत योजना',
    nav_heritage: 'विरासत',
    nav_reviews: 'समीक्षा',
    nav_faq: 'सामान्य प्रश्न',
    nav_blog: 'ब्लॉग',
    nav_contact: 'संपर्क करें',
    
    // Hero
    hero_title: 'आरएल ज्वेल्स',
    hero_subtitle: 'शुद्धता • पारदर्शिता • कारीगरी',
    hero_description: '1984 से उत्कृष्ट आभूषणों का प्रदर्शन। मूल्य और खरीदारी के लिए जलगांव में हमारे शोरूम पर जाएं।',
    hero_browse_btn: 'संग्रह देखें',
    hero_contact_btn: 'संपर्क करें',
    
    // Collections
    collections_title: 'हमारे संग्रह',
    collections_subtitle: 'हमारे चयनित आभूषण संग्रह खोजें',
    view_all: 'सभी देखें',
    
    // Products
    product_enquire_whatsapp: 'WhatsApp पर पूछताछ करें',
    product_add_wishlist: 'पसंदीदा में जोड़ें',
    product_remove_wishlist: 'पसंदीदा से हटाएं',
    product_out_of_stock: 'स्टॉक में नहीं',
    product_purity: 'शुद्धता',
    product_weight: 'वज़न',
    product_available: 'उपलब्ध',
    product_share: 'साझा करें',
    
    // Contact
    contact_title: 'हमारे शोरूम पर जाएं',
    contact_subtitle: 'व्यक्तिगत रूप से हमारे आभूषणों का अनुभव करें',
    contact_phone: 'फोन',
    contact_whatsapp: 'WhatsApp',
    contact_email: 'ईमेल',
    contact_visit_showroom: 'शोरूम पर जाएं',
    contact_address: 'पता',
    contact_hours: 'व्यावसायिक घंटे',
    
    // Footer
    footer_tagline: '1984 से आभूषण',
    footer_about: 'हमारे बारे में',
    footer_customer_service: 'ग्राहक सेवा',
    footer_policies: 'नीतियां',
    footer_copyright: '© 2024 आरएल ज्वेल्स। सर्वाधिकार सुरक्षित।',
    
    // Common
    search_placeholder: 'आभूषण खोजें...',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    learn_more: 'और जानें',
    read_more: 'और पढ़ें',
    
    // Occasions
    occasions_wedding: 'शादी',
    occasions_festive: 'त्योहार',
    occasions_daily: 'दैनिक पहनावा',
    occasions_office: 'कार्यालय',
    occasions_gifting: 'उपहार',
    
    // Messaging
    no_online_sales: 'हम ऑनलाइन नहीं बेचते',
    visit_store_pricing: 'मूल्य और खरीदारी के लिए हमारे शोरूम पर जाएं या संपर्क करें',
  },
  
  mr: {
    // Navigation
    nav_home: 'मुख्यपृष्ठ',
    nav_collections: 'संग्रह',
    nav_occasions: 'प्रसंग',
    nav_savings: 'बचत योजना',
    nav_heritage: 'वारसा',
    nav_reviews: 'पुनरावलोकने',
    nav_faq: 'सामान्य प्रश्न',
    nav_blog: 'ब्लॉग',
    nav_contact: 'संपर्क',
    
    // Hero
    hero_title: 'आरएल ज्वेल्स',
    hero_subtitle: 'शुद्धता • पारदर्शकता • कारागिरी',
    hero_description: '1984 पासून उत्कृष्ट दागिन्यांचे प्रदर्शन. किंमत आणि खरेदीसाठी जळगाव येथील आमच्या शोरूमला भेट द्या.',
    hero_browse_btn: 'संग्रह पहा',
    hero_contact_btn: 'संपर्क करा',
    
    // Collections
    collections_title: 'आमचे संग्रह',
    collections_subtitle: 'आमचे निवडक दागिने संग्रह शोधा',
    view_all: 'सर्व पहा',
    
    // Products
    product_enquire_whatsapp: 'WhatsApp वर चौकशी करा',
    product_add_wishlist: 'आवडीच्या यादीत जोडा',
    product_remove_wishlist: 'आवडीच्या यादीतून काढा',
    product_out_of_stock: 'स्टॉक नाही',
    product_purity: 'शुद्धता',
    product_weight: 'वजन',
    product_available: 'उपलब्ध',
    product_share: 'शेअर करा',
    
    // Contact
    contact_title: 'आमच्या शोरूमला भेट द्या',
    contact_subtitle: 'आमचे दागिने प्रत्यक्ष अनुभवा',
    contact_phone: 'फोन',
    contact_whatsapp: 'WhatsApp',
    contact_email: 'ईमेल',
    contact_visit_showroom: 'शोरूम भेट द्या',
    contact_address: 'पत्ता',
    contact_hours: 'व्यवसाय वेळ',
    
    // Footer
    footer_tagline: '1984 पासून दागिने',
    footer_about: 'आमच्याबद्दल',
    footer_customer_service: 'ग्राहक सेवा',
    footer_policies: 'धोरणे',
    footer_copyright: '© 2024 आरएल ज्वेल्स. सर्व हक्क राखीव.',
    
    // Common
    search_placeholder: 'दागिने शोधा...',
    loading: 'लोड होत आहे...',
    error: 'त्रुटी',
    learn_more: 'अधिक जाणून घ्या',
    read_more: 'अधिक वाचा',
    
    // Occasions
    occasions_wedding: 'लग्न',
    occasions_festive: 'सण',
    occasions_daily: 'दैनंदिन',
    occasions_office: 'कार्यालय',
    occasions_gifting: 'भेटवस्तू',
    
    // Messaging
    no_online_sales: 'आम्ही ऑनलाइन विक्री करत नाही',
    visit_store_pricing: 'किंमत आणि खरेदीसाठी आमच्या शोरूमला भेट द्या किंवा संपर्क साधा',
  },
};
