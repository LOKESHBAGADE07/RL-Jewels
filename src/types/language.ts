export type Language = 'en' | 'hi' | 'mr';

export interface Translation {
  // Navigation
  nav_home: string;
  nav_about: string;
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
  
  // Sections
  about_title: string;
  about_subtitle: string;
  about_description: string;
  about_more_btn: string;
  testimonials_title: string;
  testimonials_subtitle: string;
  view_all_reviews: string;
  occasions_title: string;
  occasions_subtitle: string;
  view_all_occasions: string;
  why_choose_title: string;
  why_choose_subtitle: string;
  faq_title: string;
  faq_subtitle: string;
  
  // Footer
  footer_quick_links: string;
  footer_information: string;
  footer_certifications: string;
  footer_connect: string;
  footer_stay_updated: string;
  footer_newsletter_desc: string;
  footer_visit_store: string;
  footer_visit_store_desc: string;
  footer_store_name: string;
  footer_store_location: string;
  footer_store_since: string;
  subscribe: string;
  enter_email: string;
  
  // Trust Badges
  badge_bis_hallmark: string;
  badge_certified: string;
  badge_purity: string;
  badge_transparent_pricing: string;
  
  // Links
  about_us: string;
  terms_conditions: string;
  privacy_policy: string;
  faqs: string;
  explore: string;
  products: string;
  items: string;
  
  // Stores Section
  stores_title: string;
  stores_note: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_about: 'About Us',
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
    
    // Sections
    about_title: 'About RL Jewels',
    about_subtitle: 'Heritage & Trust',
    about_description: 'Since 1854, Rajmal Lakhichand Jewellers (RL Jewels) has been a name synonymous with purity, trust, and craftsmanship. Born in Jalgaon and now proudly serving customers across Nashik and Thane, we have been pioneers of India\'s jewellery industry for over 170 years.\n\nLong before hallmarking became an official standard, RL Jewels was already ensuring purity through its own hallmark practices, setting the foundation for the trust we continue to uphold today. Our visionary Gold Deposit Scheme was so impactful that it was appreciated by then Finance Minister, Dr. Manmohan Singh, who later introduced a similar initiative as a national gold savings scheme.\n\nWith the same spirit of innovation, we now bring you RL Jewels Digital Gold – a modern way to buy, sell, and save real 22K gold and silver online, safely and conveniently. Every purchase is 100% pure, insured, and stored securely, with the option to redeem your holdings for physical jewellery or coins at any time.\n\nAt our stores in Jalgaon, Nashik, and Thane, we continue to offer a curated selection of gold, silver, diamond jewellery, and certified gemstones, crafted with the heritage of five generations and the artistry of today\'s finest designers.\n\nAt RL Jewels, we blend tradition with technology – preserving our legacy of purity while embracing the digital future of gold.\n\nRL Jewels Digital Gold – A Legacy of Purity. A Future of Trust.',
    about_more_btn: 'More About Us',
    testimonials_title: 'What Our Customers Say',
    testimonials_subtitle: 'Real experiences from happy customers',
    view_all_reviews: 'View All Reviews',
    occasions_title: 'Shop By Occasion',
    occasions_subtitle: 'Curated picks',
    view_all_occasions: 'View All Occasions',
    why_choose_title: 'Why Choose Us',
    why_choose_subtitle: 'Trusted Jeweler Since 1984',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Support',
    
    // Footer
    footer_quick_links: 'Quick Links',
    footer_information: 'Information',
    footer_certifications: 'Certifications',
    footer_connect: 'Connect With Us',
    footer_stay_updated: 'Stay Updated',
    footer_newsletter_desc: 'Subscribe to our newsletter for the latest collections and offers',
    footer_visit_store: 'Visit Our Store',
    footer_visit_store_desc: 'Experience our exquisite jewelry collection in person',
    footer_store_name: 'RL Jewels',
    footer_store_location: 'Jalgaon, Maharashtra',
    footer_store_since: 'Since 1984',
    subscribe: 'Subscribe',
    enter_email: 'Enter your email',
    
    // Trust Badges
    badge_bis_hallmark: 'BIS Hallmark',
    badge_certified: 'Certified Jewelry',
    badge_purity: '100% Purity',
    badge_transparent_pricing: 'Transparent Pricing',
    
    // Links
    about_us: 'About Us',
    terms_conditions: 'Terms & Conditions',
    privacy_policy: 'Privacy Policy',
    faqs: 'FAQs',
    explore: 'Explore',
    products: 'products',
    items: 'items',
    
    // Stores Section
    stores_title: 'Our Stores',
    stores_note: 'Visit any of our three branches to explore our exclusive collection of gold, diamond, and bridal jewelry. Our expert staff is ready to assist you in finding the perfect piece.',
  },
  
  hi: {
    // Navigation
    nav_home: 'होम',
    nav_about: 'हमारे बारे में',
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
    
    // Sections
    about_title: 'आरएल ज्वेल्स के बारे में',
    about_subtitle: 'विरासत और विश्वास',
    about_description: 'शुद्धता, पारदर्शिता और कारीगरी के साथ जलगांव की सेवा करना। हमारी विरासत परंपरा और आधुनिक डिजाइन को मिश्रित करती है ताकि आपको विश्वास और शान का आभूषण मिल सके।',
    about_more_btn: 'हमारे बारे में और जानें',
    testimonials_title: 'हमारे ग्राहक क्या कहते हैं',
    testimonials_subtitle: 'खुश ग्राहकों के वास्तविक अनुभव',
    view_all_reviews: 'सभी समीक्षाएँ देखें',
    occasions_title: 'अवसर के अनुसार खरीदें',
    occasions_subtitle: 'चयनित संग्रह',
    view_all_occasions: 'सभी अवसर देखें',
    why_choose_title: 'हमें क्यों चुनें',
    why_choose_subtitle: '1984 से विश्वसनीय ज्वेलर',
    faq_title: 'अक्सर पूछे जाने वाले प्रश्न',
    faq_subtitle: 'सहायता',
    
    // Footer
    footer_quick_links: 'त्वरित लिंक',
    footer_information: 'जानकारी',
    footer_certifications: 'प्रमाणपत्र',
    footer_connect: 'हमसे जुड़ें',
    footer_stay_updated: 'अपडेट रहें',
    footer_newsletter_desc: 'नवीनतम संग्रह और ऑफ़र के लिए हमारे न्यूज़लेटर की सदस्यता लें',
    footer_visit_store: 'हमारे स्टोर पर जाएं',
    footer_visit_store_desc: 'हमारे उत्कृष्ट आभूषण संग्रह का व्यक्तिगत रूप से अनुभव करें',
    footer_store_name: 'आरएल ज्वेल्स',
    footer_store_location: 'जलगांव, महाराष्ट्र',
    footer_store_since: '1984 से',
    subscribe: 'सदस्यता लें',
    enter_email: 'अपना ईमेल दर्ज करें',
    
    // Trust Badges
    badge_bis_hallmark: 'BIS हॉलमार्क',
    badge_certified: 'प्रमाणित आभूषण',
    badge_purity: '100% शुद्धता',
    badge_transparent_pricing: 'पारदर्शी मूल्य निर्धारण',
    
    // Links
    about_us: 'हमारे बारे में',
    terms_conditions: 'नियम और शर्तें',
    privacy_policy: 'गोपनीयता नीति',
    faqs: 'सामान्य प्रश्न',
    explore: 'खोजें',
    products: 'उत्पाद',
    items: 'वस्तुएं',
    
    // Stores Section
    stores_title: 'हमारे स्टोर',
    stores_note: 'सोना, हीरे और दुल्हन के आभूषणों के हमारे विशेष संग्रह को देखने के लिए हमारी तीन शाखाओं में से किसी एक पर जाएँ। हमारे विशेषज्ञ कर्मचारी आपको सही आभूषण खोजने में मदद करने के लिए तैयार हैं।',
  },
  
  mr: {
    // Navigation
    nav_home: 'मुख्यपृष्ठ',
    nav_about: 'आमच्याबद्दल',
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
    
    // Sections
    about_title: 'आरएल ज्वेल्स बद्दल',
    about_subtitle: 'वारसा आणि विश्वास',
    about_description: 'शुद्धता, पारदर्शकता आणि कारागिरी सह जळगाव ला सेवा देणे. आमचा वारसा परंपरा आणि आधुनिक डिझाइन एकत्र करतो जेणेकरून तुम्हाला विश्वास आणि सुंदरतेचे दागिने मिळतील.',
    about_more_btn: 'आमच्याबद्दल अधिक जाणून घ्या',
    testimonials_title: 'आमचे ग्राहक काय म्हणतात',
    testimonials_subtitle: 'आनंदी ग्राहकांचे वास्तविक अनुभव',
    view_all_reviews: 'सर्व पुनरावलोकने पहा',
    occasions_title: 'प्रसंगानुसार खरेदी करा',
    occasions_subtitle: 'निवडक संग्रह',
    view_all_occasions: 'सर्व प्रसंग पहा',
    why_choose_title: 'आम्हाला का निवडा',
    why_choose_subtitle: '1984 पासून विश्वसनीय ज्वेलर',
    faq_title: 'वारंवार विचारले जाणारे प्रश्न',
    faq_subtitle: 'मदत',
    
    // Footer
    footer_quick_links: 'द्रुत दुवे',
    footer_information: 'माहिती',
    footer_certifications: 'प्रमाणपत्रे',
    footer_connect: 'आमच्याशी जोडा',
    footer_stay_updated: 'अद्ययावत रहा',
    footer_newsletter_desc: 'नवीनतम संग्रह आणि ऑफरसाठी आमच्या वृत्तपत्राची सदस्यता घ्या',
    footer_visit_store: 'आमच्या स्टोअरला भेट द्या',
    footer_visit_store_desc: 'आमच्या उत्कृष्ट दागिन्यांच्या संग्रहाचा वैयक्तिकरित्या अनुभव घ्या',
    footer_store_name: 'आरएल ज्वेल्स',
    footer_store_location: 'जळगाव, महाराष्ट्र',
    footer_store_since: '1984 पासून',
    subscribe: 'सदस्यता घ्या',
    enter_email: 'आपला ईमेल प्रविष्ट करा',
    
    // Trust Badges
    badge_bis_hallmark: 'BIS हॉलमार्क',
    badge_certified: 'प्रमाणित दागिने',
    badge_purity: '100% शुद्धता',
    badge_transparent_pricing: 'पारदर्शक किंमत',
    
    // Links
    about_us: 'आमच्याबद्दल',
    terms_conditions: 'अटी आणि शर्ती',
    privacy_policy: 'गोपनीयता धोरण',
    faqs: 'सामान्य प्रश्न',
    explore: 'अन्वेषण करा',
    products: 'उत्पादने',
    items: 'वस्तू',
    
    // Stores Section
    stores_title: 'आमची दुकाने',
    stores_note: 'सोने, हिरे आणि वधूच्या दागिन्यांच्या आमच्या विशेष संग्रहाचे अन्वेषण करण्यासाठी आमच्या तिन्ही शाखांना भेट द्या। योग्य दागिना शोधण्यात आपल्याला मदत करण्यासाठी आमचे तज्ञ कर्मचारी तयार आहेत।',
  },
};
