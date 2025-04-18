/**
 * MedPharm Hospital Website Scripts
 * Contains functionality for:
 * - Language translation (English, Hindi, Gujarati)
 * - Animation of page sections
 * - Emergency protocols tab functionality
 * - Appointment form validation and submission
 * - Other interactive elements
 */

// Translation dictionaries for different languages
const translations = {
    // English (Default)
    en: {
        // Navigation
        nav_home: "Home",
        nav_doctors: "Doctors",
        nav_appointment: "Appointment",
        nav_updates: "Medical Updates",
        nav_services: "Services",
        nav_testimonials: "Testimonials",
        nav_health_tips: "Health Tips",
        nav_insurance: "Insurance",
        nav_emergency: "Emergency",
        nav_contact: "Contact",
        language: "English",
        login: "Login",
        register: "Register",
        
        // Hero Section
        hero_heading: "We Are Here For Your Care",
        hero_text: "Your health is our top priority. Book an appointment today to get expert care and personalized attention from our experienced medical team. Whether it's a routine checkup or a specialized consultation, we're here to serve you. Don't wait schedule your visit now!",
        book_appointment: "Book Your Appointment Now",
        
        // Facilities Section
        facilities_heading: "We Provide Facilities like",
        facility1_heading: "Expert Medical Care & Oxygen Bed Facility",
        facility1_text: "We provide top-quality healthcare with experienced medical professionals and specialist doctors available for consultations and treatments. Our hospital is equipped with oxygen beds to ensure critical care and emergency support when needed.",
        facility2_heading: "You can get your Lab report at your home",
        facility2_text: "We offer convenient lab test check-ups both at home and in hospital laboratories. Our at-home service ensures hassle-free sample collection by trained professionals at your doorstep, providing accurate and timely results. For those who prefer in-hospital testing, our state-of-the-art laboratory ensures precise diagnostics with expert supervision.",
        facility3_heading: "We Are Here For Your Care",
        facility3_text: "You can conveniently buy medicine online through our platform or visit our hospital pharmacy for in-person purchases. Enjoy safe, fast, and reliable access to essential medications.",
        book_now: "Book yours now!",
        shop_now: "Shop Now",
        
        // Appointment Section
        appointment_heading: "Appointment Here",
        form_heading: "Fill The Form To Book Your Appointment Slot",
        appointment_name: "Name:",
        appointment_phone: "Phone:",
        appointment_diseases: "Diseases:",
        appointment_history: "History:",
        appointment_medicine: "Medicine:",
        appointment_labreport: "Lab Report:",
        appointment_doctor: "Doctor:",
        appointment_time: "Appointment Time:",
        appointment_success: "Appointment Booked Successfully!",
        
        // Doctors Section
        doctors_heading: "Our Specialist Doctors",
        doctors_subtitle: "Meet our experienced and qualified team of medical specialists",
        
        // Medical Updates Section
        medical_updates_heading: "Medical Updates",
        medical_updates_subtitle: "Stay informed with the latest medical news and updates",
        
        // Services Section
        services_heading: "Services",
        services_subtitle: "Comprehensive healthcare services for all your needs",
        learn_more: "Learn More",
        
        // Testimonials Section
        testimonials_heading: "Patient Testimonials",
        testimonials_subtitle: "What our patients say about us",
        
        // Health Tips Section
        health_tips_heading: "Health Tips & Articles",
        health_tips_subtitle: "Stay informed with the latest health advice and medical insights from our experts.",
        
        // Insurance Section
        insurance_heading: "Insurance Information",
        insurance_subtitle: "We work with most major insurance providers",
        
        // Emergency Protocols Section
        emergency_heading: "Emergency Protocols",
        emergency_desc: "Know what to do in medical emergencies",
        emergency_alert: "Medical Emergency Guidance",
        cardiac_arrest: "Cardiac Arrest",
        stroke: "Stroke",
        severe_bleeding: "Severe Bleeding",
        choking: "Choking",
        warning: "Warning",
        steps: "Steps to Follow",
        
        // Waitlist Section
        waitlist_heading: "Join Our Waitlist",
        waitlist_text: "Want to be notified when appointments become available with your preferred doctor? Join our waitlist and we'll contact you as soon as there's an opening.",
        waitlist_point1: "Receive priority notifications",
        waitlist_point2: "Choose your preferred time slots",
        waitlist_point3: "No obligation to book",
        waitlist_form_heading: "Waitlist Registration",
        waitlist_name: "Full Name",
        waitlist_email: "Email Address",
        waitlist_phone: "Phone Number",
        waitlist_doctor: "Preferred Doctor",
        waitlist_timeframe: "Preferred Timeframe",
        waitlist_submit: "Join Waitlist",
        
        // Contact Section
        contact_heading: "Contact Us",
        contact_subtitle: "Get in touch with our team",
        contact_form_heading: "Send us a Message",
        contact_name: "Full Name",
        contact_email: "Email Address",
        contact_subject: "Subject",
        contact_message: "Message",
        contact_submit: "Send Message",
        contact_info_heading: "Contact Information",
        contact_address: "Address",
        contact_phone: "Phone",
        contact_hours: "Working Hours",
        contact_find_us: "Find Us",
        
        // Call to Action
        cta_heading: "Ready to Experience Quality Healthcare?",
        cta_text: "Book an appointment today and take the first step towards better health.",
        
        // Footer
        footer_about: "About MedPharm",
        footer_about_text: "MedPharm Hospital is a comprehensive healthcare facility providing quality medical services since 2005. We are committed to excellence in patient care and innovative treatments.",
        footer_quick_links: "Quick Links",
        footer_contact: "Contact Us",
        footer_hours: "Working Hours",
        footer_weekdays: "Monday - Sunday:",
        footer_24_7: "24/7 Services:",
        footer_emergency: "Emergency",
        footer_icu: "ICU",
        footer_pharmacy: "Pharmacy",
        footer_copyright: "© 2025 MedPharm Hospital. All rights reserved."
    },
    
    // Hindi
    hi: {
        // Navigation
        nav_home: "होम",
        nav_doctors: "डॉक्टर्स",
        nav_appointment: "अपॉइंटमेंट",
        nav_updates: "मेडिकल अपडेट्स",
        nav_services: "सेवाएँ",
        nav_testimonials: "प्रशंसापत्र",
        nav_health_tips: "स्वास्थ्य टिप्स",
        nav_insurance: "बीमा",
        nav_emergency: "आपातकालीन",
        nav_contact: "संपर्क",
        language: "हिंदी",
        login: "लॉगिन",
        register: "रजिस्टर",
        
        // Hero Section
        hero_heading: "हम आपकी देखभाल के लिए यहां हैं",
        hero_text: "आपका स्वास्थ्य हमारी सर्वोच्च प्राथमिकता है। हमारी अनुभवी मेडिकल टीम से विशेषज्ञ देखभाल और व्यक्तिगत ध्यान पाने के लिए आज ही अपॉइंटमेंट बुक करें। चाहे यह नियमित चेकअप हो या विशेषज्ञ परामर्श, हम आपकी सेवा के लिए यहां हैं। इंतजार न करें, अभी अपनी विजिट शेड्यूल करें!",
        book_appointment: "अभी अपॉइंटमेंट बुक करें",
        
        // Facilities Section
        facilities_heading: "हम इस प्रकार की सुविधाएं प्रदान करते हैं",
        facility1_heading: "विशेषज्ञ चिकित्सा देखभाल और ऑक्सीजन बेड सुविधा",
        facility1_text: "हम परामर्श और उपचार के लिए अनुभवी चिकित्सा पेशेवरों और विशेषज्ञ डॉक्टरों के साथ उच्च गुणवत्ता वाली स्वास्थ्य सेवा प्रदान करते हैं। हमारा अस्पताल जरूरत पड़ने पर गंभीर देखभाल और आपातकालीन सहायता सुनिश्चित करने के लिए ऑक्सीजन बेड से सुसज्जित है।",
        facility2_heading: "आप अपनी लैब रिपोर्ट घर पर प्राप्त कर सकते हैं",
        facility2_text: "हम घर और अस्पताल प्रयोगशालाओं दोनों में सुविधाजनक लैब टेस्ट चेक-अप प्रदान करते हैं। हमारी घर पर सेवा आपके घर पर प्रशिक्षित पेशेवरों द्वारा परेशानी मुक्त नमूना संग्रह सुनिश्चित करती है, जो सटीक और समय पर परिणाम प्रदान करती है। जो लोग अस्पताल में परीक्षण पसंद करते हैं, उनके लिए हमारी अत्याधुनिक प्रयोगशाला विशेषज्ञ पर्यवेक्षण के साथ सटीक नैदानिक सुनिश्चित करती है।",
        facility3_heading: "हम आपकी देखभाल के लिए यहां हैं",
        facility3_text: "आप हमारे प्लेटफॉर्म के माध्यम से ऑनलाइन दवा खरीद सकते हैं या व्यक्तिगत खरीदारी के लिए हमारे अस्पताल फार्मेसी पर जा सकते हैं। आवश्यक दवाओं तक सुरक्षित, तेज़ और विश्वसनीय पहुंच का आनंद लें।",
        book_now: "अभी बुक करें!",
        shop_now: "अभी खरीदें",
        
        // Appointment Section
        appointment_heading: "यहां अपॉइंटमेंट लें",
        form_heading: "अपनी अपॉइंटमेंट स्लॉट बुक करने के लिए फॉर्म भरें",
        appointment_name: "नाम:",
        appointment_phone: "फोन:",
        appointment_diseases: "बीमारियां:",
        appointment_history: "इतिहास:",
        appointment_medicine: "दवा:",
        appointment_labreport: "लैब रिपोर्ट:",
        appointment_doctor: "डॉक्टर:",
        appointment_time: "अपॉइंटमेंट का समय:",
        appointment_success: "अपॉइंटमेंट सफलतापूर्वक बुक की गई!",
        
        // Doctors Section
        doctors_heading: "हमारे विशेषज्ञ डॉक्टर",
        doctors_subtitle: "हमारी अनुभवी और योग्य चिकित्सा विशेषज्ञों की टीम से मिलें",
        
        // Medical Updates Section
        medical_updates_heading: "मेडिकल अपडेट्स",
        medical_updates_subtitle: "नवीनतम चिकित्सा समाचारों और अपडेट से अवगत रहें",
        
        // Services Section
        services_heading: "सेवाएँ",
        services_subtitle: "आपकी सभी जरूरतों के लिए व्यापक स्वास्थ्य सेवाएं",
        learn_more: "और जानें",
        
        // Testimonials Section
        testimonials_heading: "रोगियों के प्रशंसापत्र",
        testimonials_subtitle: "हमारे रोगी हमारे बारे में क्या कहते हैं",
        
        // Health Tips Section
        health_tips_heading: "स्वास्थ्य टिप्स और लेख",
        health_tips_subtitle: "हमारे विशेषज्ञों से नवीनतम स्वास्थ्य सलाह और चिकित्सा अंतर्दृष्टि से अवगत रहें।",
        
        // Insurance Section
        insurance_heading: "बीमा जानकारी",
        insurance_subtitle: "हम अधिकांश प्रमुख बीमा प्रदाताओं के साथ काम करते हैं",
        
        // Emergency Protocols Section
        emergency_heading: "आपातकालीन प्रोटोकॉल",
        emergency_desc: "चिकित्सा आपात स्थिति में क्या करना है, यह जानें",
        emergency_alert: "चिकित्सा आपातकालीन मार्गदर्शन",
        cardiac_arrest: "कार्डिएक अरेस्ट",
        stroke: "स्ट्रोक",
        severe_bleeding: "गंभीर रक्तस्राव",
        choking: "दम घुटना",
        warning: "चेतावनी",
        steps: "अनुसरण करने के लिए कदम",
        
        // Waitlist Section
        waitlist_heading: "हमारी वेटलिस्ट में शामिल हों",
        waitlist_text: "क्या आप सूचित किए जाना चाहते हैं जब आपके पसंदीदा डॉक्टर के साथ अपॉइंटमेंट उपलब्ध हों? हमारी वेटलिस्ट में शामिल हों और जैसे ही कोई स्लॉट खाली होगा, हम आपसे संपर्क करेंगे।",
        waitlist_point1: "प्राथमिकता सूचनाएं प्राप्त करें",
        waitlist_point2: "अपने पसंदीदा समय स्लॉट चुनें",
        waitlist_point3: "बुक करने की कोई बाध्यता नहीं",
        waitlist_form_heading: "वेटलिस्ट पंजीकरण",
        waitlist_name: "पूरा नाम",
        waitlist_email: "ईमेल पता",
        waitlist_phone: "फोन नंबर",
        waitlist_doctor: "पसंदीदा डॉक्टर",
        waitlist_timeframe: "पसंदीदा समय",
        waitlist_submit: "वेटलिस्ट में शामिल हों",
        
        // Contact Section
        contact_heading: "संपर्क करें",
        contact_subtitle: "हमारी टीम से संपर्क करें",
        contact_form_heading: "हमें संदेश भेजें",
        contact_name: "पूरा नाम",
        contact_email: "ईमेल पता",
        contact_subject: "विषय",
        contact_message: "संदेश",
        contact_submit: "संदेश भेजें",
        contact_info_heading: "संपर्क जानकारी",
        contact_address: "पता",
        contact_phone: "फोन",
        contact_hours: "कार्य घंटे",
        contact_find_us: "हमें ढूंढें",
        
        // Call to Action
        cta_heading: "गुणवत्तापूर्ण स्वास्थ्य सेवा का अनुभव करने के लिए तैयार हैं?",
        cta_text: "आज ही अपॉइंटमेंट बुक करें और बेहतर स्वास्थ्य की दिशा में पहला कदम उठाएं।",
        
        // Footer
        footer_about: "मेडफार्म के बारे में",
        footer_about_text: "मेडफार्म अस्पताल एक व्यापक स्वास्थ्य सेवा सुविधा है जो 2005 से गुणवत्तापूर्ण चिकित्सा सेवाएं प्रदान कर रहा है। हम रोगी देखभाल और नवीन उपचारों में उत्कृष्टता के लिए प्रतिबद्ध हैं।",
        footer_quick_links: "त्वरित लिंक्स",
        footer_contact: "संपर्क करें",
        footer_hours: "कार्य घंटे",
        footer_weekdays: "सोमवार - रविवार:",
        footer_24_7: "24/7 सेवाएँ:",
        footer_emergency: "आपातकालीन",
        footer_icu: "आईसीयू",
        footer_pharmacy: "फार्मेसी",
        footer_copyright: "© 2025 मेडफार्म अस्पताल। सर्वाधिकार सुरक्षित।"
    },
    
    // Gujarati
    gu: {
        // Navigation
        nav_home: "હોમ",
        nav_doctors: "ડૉક્ટર્સ",
        nav_appointment: "એપોઇન્ટમેન્ટ",
        nav_updates: "મેડિકલ અપડેટ્સ",
        nav_services: "સેવાઓ",
        nav_testimonials: "પ્રશંસાપત્રો",
        nav_health_tips: "સ્વાસ્થ્ય ટિપ્સ",
        nav_insurance: "વીમા",
        nav_emergency: "ઇમરજન્સી",
        nav_contact: "સંપર્ક",
        language: "ગુજરાતી",
        login: "લોગિન",
        register: "રજિસ્ટર",
        
        // Hero Section
        hero_heading: "અમે તમારી સંભાળ માટે અહીં છીએ",
        hero_text: "તમારું સ્વાસ્થ્ય અમારી સર્વોચ્ચ પ્રાથમિકતા છે. અમારી અનુભવી મેડિકલ ટીમ પાસેથી નિષ્ણાત સંભાળ અને વ્યક્તિગત ધ્યાન મેળવવા માટે આજે જ એપોઇન્ટમેન્ટ બુક કરો. પછી ભલે તે નિયમિત ચેકઅપ હોય કે વિશેષ પરામર્શ, અમે તમારી સેવા કરવા માટે અહીં છીએ. રાહ ન જુઓ, અત્યારે જ તમારી મુલાકાત શેડ્યૂલ કરો!",
        book_appointment: "હમણાં જ એપોઇન્ટમેન્ટ બુક કરો",
        
        // Facilities Section
        facilities_heading: "અમે આવી સુવિધાઓ પ્રદાન કરીએ છીએ",
        facility1_heading: "નિષ્ણાત તબીબી સંભાળ અને ઓક્સિજન બેડ સુવિધા",
        facility1_text: "અમે પરામર્શ અને સારવાર માટે અનુભવી તબીબી વ્યાવસાયિકો અને નિષ્ણાત ડૉક્ટરો સાથે ઉચ્ચ ગુણવત્તાની હેલ્થકેર સેવાઓ પ્રદાન કરીએ છીએ. જરૂર પડે ત્યારે ગંભીર સંભાળ અને ઇમરજન્સી સપોર્ટ સુનિશ્ચિત કરવા માટે અમારી હોસ્પિટલ ઓક્સિજન બેડથી સજ્જ છે.",
        facility2_heading: "તમે તમારો લેબ રિપોર્ટ તમારા ઘરે મેળવી શકો છો",
        facility2_text: "અમે ઘરે અને હોસ્પિટલની લેબોરેટરીઓમાં સરળ લેબ ટેસ્ટ ચેક-અપ ઓફર કરીએ છીએ. અમારી ઘરે સેવા તમારા ઘરે પ્રશિક્ષિત વ્યાવસાયિકો દ્વારા સરળ સેમ્પલ કલેક્શન સુનિશ્ચિત કરે છે, જે સચોટ અને સમયસર પરિણામો પ્રદાન કરે છે. જેઓ હોસ્પિટલમાં પરીક્ષણ પસંદ કરે છે તેમના માટે, અમારી અત્યાધુનિક લેબોરેટરી નિષ્ણાત દેખરેખ સાથે સચોટ નિદાન સુનિશ્ચિત કરે છે.",
        facility3_heading: "અમે તમારી સંભાળ માટે અહીં છીએ",
        facility3_text: "તમે અમારા પ્લેટફોર્મ દ્વારા ઓનલાઈન દવા ખરીદી શકો છો અથવા વ્યક્તિગત ખરીદી માટે અમારી હોસ્પિટલ ફાર્મસી પર જઈ શકો છો. જરૂરી દવાઓ માટે સુરક્ષિત, ઝડપી અને વિશ્વસનીય એક્સેસનો આનંદ માણો.",
        book_now: "હમણાં જ બુક કરો!",
        shop_now: "હમણાં ખરીદો",
        
        // Appointment Section
        appointment_heading: "અહીં એપોઇન્ટમેન્ટ લો",
        form_heading: "તમારી એપોઇન્ટમેન્ટ સ્લોટ બુક કરવા માટે ફોર્મ ભરો",
        appointment_name: "નામ:",
        appointment_phone: "ફોન:",
        appointment_diseases: "રોગો:",
        appointment_history: "ઇતિહાસ:",
        appointment_medicine: "દવા:",
        appointment_labreport: "લેબ રિપોર્ટ:",
        appointment_doctor: "ડૉક્ટર:",
        appointment_time: "એપોઇન્ટમેન્ટનો સમય:",
        appointment_success: "એપોઇન્ટમેન્ટ સફળતાપૂર્વક બુક કરવામાં આવી!",
        
        // Doctors Section
        doctors_heading: "અમારા નિષ્ણાત ડૉક્ટર્સ",
        doctors_subtitle: "અમારી અનુભવી અને લાયક તબીબી નિષ્ણાતોની ટીમને મળો",
        
        // Medical Updates Section
        medical_updates_heading: "મેડિકલ અપડેટ્સ",
        medical_updates_subtitle: "નવીનતમ તબીબી સમાચાર અને અપડેટ્સથી માહિતગાર રહો",
        
        // Services Section
        services_heading: "સેવાઓ",
        services_subtitle: "તમારી બધી જરૂરિયાતો માટે વ્યાપક હેલ્થકેર સેવાઓ",
        learn_more: "વધુ જાણો",
        
        // Testimonials Section
        testimonials_heading: "દર્દીઓના પ્રશંસાપત્રો",
        testimonials_subtitle: "અમારા દર્દીઓ અમારા વિશે શું કહે છે",
        
        // Health Tips Section
        health_tips_heading: "સ્વાસ્થ્ય ટિપ્સ અને લેખો",
        health_tips_subtitle: "અમારા નિષ્ણાતો પાસેથી નવીનતમ સ્વાસ્થ્ય સલાહ અને તબીબી જાણકારીથી માહિતગાર રહો.",
        
        // Insurance Section
        insurance_heading: "વીમા માહિતી",
        insurance_subtitle: "અમે મોટાભાગના મુખ્ય વીમા પ્રદાતાઓ સાથે કામ કરીએ છીએ",
        
        // Emergency Protocols Section
        emergency_heading: "ઇમરજન્સી પ્રોટોકોલ્સ",
        emergency_desc: "તબીબી કટોકટીમાં શું કરવું તે જાણો",
        emergency_alert: "તબીબી કટોકટી માર્ગદર્શન",
        cardiac_arrest: "હૃદય હુમલો",
        stroke: "સ્ટ્રોક",
        severe_bleeding: "ગંભીર રક્તસ્રાવ",
        choking: "શ્વાસ રોકાવો",
        warning: "ચેતવણી",
        steps: "અનુસરવાના પગલાં",
        
        // Waitlist Section
        waitlist_heading: "અમારી વેઈટલિસ્ટમાં જોડાઓ",
        waitlist_text: "શું તમે જાણવા માંગો છો કે જ્યારે તમારા પસંદગીના ડૉક્ટર સાથે એપોઇન્ટમેન્ટ ઉપલબ્ધ થાય ત્યારે? અમારી વેઈટલિસ્ટમાં જોડાઓ અને જ્યારે સ્લોટ ખાલી થાય ત્યારે અમે તમારો સંપર્ક કરીશું.",
        waitlist_point1: "પ્રાથમિકતા સૂચનાઓ મેળવો",
        waitlist_point2: "તમારા પસંદગીના સમય સ્લોટ્સ પસંદ કરો",
        waitlist_point3: "બુક કરવા માટે કોઈ જવાબદારી નથી",
        waitlist_form_heading: "વેઈટલિસ્ટ રજિસ્ટ્રેશન",
        waitlist_name: "પૂરું નામ",
        waitlist_email: "ઈમેલ એડ્રેસ",
        waitlist_phone: "ફોન નંબર",
        waitlist_doctor: "પસંદગીના ડૉક્ટર",
        waitlist_timeframe: "પસંદગીનો સમયગાળો",
        waitlist_submit: "વેઈટલિસ્ટમાં જોડાઓ",
        
        // Contact Section
        contact_heading: "અમારો સંપર્ક કરો",
        contact_subtitle: "અમારી ટીમ સાથે સંપર્કમાં રહો",
        contact_form_heading: "અમને સંદેશ મોકલો",
        contact_name: "પૂરું નામ",
        contact_email: "ઈમેલ એડ્રેસ",
        contact_subject: "વિષય",
        contact_message: "સંદેશ",
        contact_submit: "સંદેશ મોકલો",
        contact_info_heading: "સંપર્ક માહિતી",
        contact_address: "સરનામું",
        contact_phone: "ફોન",
        contact_hours: "કામકાજના કલાકો",
        contact_find_us: "અમને શોધો",
        
        // Call to Action
        cta_heading: "ગુણવત્તાયુક્ત હેલ્થકેર અનુભવવા માટે તૈયાર છો?",
        cta_text: "આજે જ એપોઇન્ટમેન્ટ બુક કરો અને સારા સ્વાસ્થ્ય તરફ પ્રથમ પગલું ભરો.",
        
        // Footer
        footer_about: "મેડફાર્મ વિશે",
        footer_about_text: "મેડફાર્મ હોસ્પિટલ એક વ્યાપક હેલ્થકેર સુવિધા છે જે 2005થી ગુણવત્તાયુક્ત તબીબી સેવાઓ પૂરી પાડી રહી છે. અમે દર્દીની સંભાળ અને નવીનતમ સારવારોમાં શ્રેષ્ઠતા માટે પ્રતિબદ્ધ છીએ.",
        footer_quick_links: "ઝડપી લિંક્સ",
        footer_contact: "અમારો સંપર્ક કરો",
        footer_hours: "કામકાજના કલાકો",
        footer_weekdays: "સોમવાર - રવિવાર:",
        footer_24_7: "24/7 સેવાઓ:",
        footer_emergency: "ઇમરજન્સી",
        footer_icu: "આઈસીયુ",
        footer_pharmacy: "ફાર્મસી",
        footer_copyright: "© 2025 મેડફાર્મ હોસ્પિટલ. બધા અધિકારો સુરક્ષિત."
    }
};

// Current language selection (default is English)
let currentLanguage = 'en';

/**
 * Translate the entire website to the selected language
 * @param {string} lang - Language code ('en', 'hi', or 'gu')
 */
function translatePage(lang) {
    try {
        // Set current language
        currentLanguage = lang;
        
        // Update the current language display in the dropdown
        $('#currentLanguage').text(translations[lang].language);
        
        // Find all elements with data-i18n attribute and translate them
        $('[data-i18n]').each(function() {
            const key = $(this).attr('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                $(this).html(translations[lang][key]);
            }
        });
        
        // Store language preference in localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // Log successful translation
        console.log(`Website translated to ${translations[lang].language}`);
        
    } catch (error) {
        console.error('Error translating page:', error);
    }
}

/**
 * Setup language selector functionality
 */
function setupLanguage() {
    try {
        // Get saved language preference from localStorage, default to English
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        
        // Apply saved language
        translatePage(savedLang);
        
        // Set up language selector clicks
        $('.dropdown-item[data-lang]').on('click', function(e) {
            e.preventDefault();
            const lang = $(this).data('lang');
            translatePage(lang);
        });
        
    } catch (error) {
        console.error('Error setting up language functionality:', error);
    }
}

/**
 * Initialize the emergency protocol tabs
 */
function initializeEmergencyTabs() {
    try {
        // Set the first tab as active by default if none is active
        if ($('.emergency-nav .nav-link.active').length === 0) {
            $('.emergency-nav .nav-link:first').addClass('active');
            $('.emergency-tab-content:first').addClass('active show');
        }
        
        // Set up tab click events without page scrolling
        $('.emergency-nav .nav-link').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Stop event from bubbling up
            
            // Get the target tab content ID
            const targetTabId = $(this).attr('href');
            
            // Remove active class from all tabs and contents
            $('.emergency-nav .nav-link').removeClass('active');
            $('.emergency-tab-content').removeClass('active show');
            
            // Add active class to clicked tab and its content
            $(this).addClass('active');
            $(targetTabId).addClass('active show');
            
            // Stay on the same section (avoid scrolling)
            return false;
        });
        
        // Initialize the first tab as active
        const firstTabLink = $('.emergency-nav .nav-link:first');
        if (firstTabLink.length && !$('.emergency-tab-content.active').length) {
            firstTabLink.addClass('active');
            $(firstTabLink.attr('href')).addClass('active show');
        }
        
    } catch (error) {
        console.error('Error initializing emergency tabs:', error);
    }
}

/**
 * Setup animation for website sections
 */
function animateSections() {
    try {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Animate sections when they come into view
        function checkAnimations() {
            $('.animated-section').each(function() {
                if (isInViewport(this) && !$(this).hasClass('animated')) {
                    $(this).addClass('animated fadeInUp');
                }
            });
        }
        
        // Run on scroll and on page load
        $(window).on('scroll resize', checkAnimations);
        checkAnimations();
        
    } catch (error) {
        console.error('Error setting up animations:', error);
    }
}

// Initialize User Profile/Login functionality
function initializeUserProfile() {
    try {
        // Check if user is logged in (in a real app, this would check a session or token)
        const isLoggedIn = sessionStorage.getItem("userName");
        
        if (isLoggedIn) {
            // Update UI for logged in user
            $('#userName').text(isLoggedIn);
            $('.logged-in-only').show();
            
            // Hide login/register options when logged in
            $('a[href="/Account/Login"]').hide();
            $('a[href="/Account/Register"]').hide();
            
            // Handle logout
            $('#logoutBtn').on('click', function(e) {
                e.preventDefault();
                sessionStorage.removeItem("userName");
                location.reload();
            });
        } else {
            // Update UI for logged out user
            $('#userName').text("My Account");
            $('.logged-in-only').hide();
        }
    } catch (error) {
        console.error('Error initializing user profile:', error);
    }
}

// Handle Appointment Form Submission
$(document).ready(function() {
    // Initialize user profile
    initializeUserProfile();
    
    // Initialize language
    setupLanguage();
    
    // Initialize emergency protocols tabs
    initializeEmergencyTabs();
    
    // Set up animations
    animateSections();
    
    // Fix emergency tabs panel heights
    const emergencyPanels = $('.emergency-tab-content');
    let maxHeight = 0;
    
    // Find the tallest panel
    emergencyPanels.each(function() {
        $(this).css('display', 'block');
        const panelHeight = $(this).outerHeight();
        if (panelHeight > maxHeight) {
            maxHeight = panelHeight;
        }
        $(this).css('display', '');
    });
    
    // Set all panels to the same height
    if (maxHeight > 0) {
        emergencyPanels.css('min-height', maxHeight + 'px');
    }
    
    // Make sure all sections have proper spacing
    $('section').css({
        'clear': 'both',
        'overflow': 'hidden'
    });
    
    // Add back-to-top button functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    $('#appointmentForm').submit(function(e) {
        e.preventDefault();
        
        // Form validation
        const name = $('#Name').val();
        const phone = $('#Phone').val();
        const doctor = $('#Doctor').val();
        const appointmentTime = $('#AppointmentTime').val();
        
        if (!name || !phone || !doctor || !appointmentTime) {
            alert(translations[currentLanguage].required_fields || 'Please fill in all required fields');
            return;
        }
        
        // Check if user is logged in
        if (!sessionStorage.getItem("userName")) {
            // Show login prompt
            alert("Please log in to book an appointment.");
            return;
        }
        
        // Simulate form submission (in a real application, this would be an AJAX call)
        setTimeout(function() {
            // Show success popup
            $('#successPopup').fadeIn().delay(3000).fadeOut();
            
            // Reset form
            $('#appointmentForm')[0].reset();
        }, 1000);
    });
    
    // Handle Waitlist Form Submission
    $('#waitlistForm').submit(function(e) {
        e.preventDefault();
        
        // Form validation
        const name = $('#waitlistName').val();
        const email = $('#waitlistEmail').val();
        const phone = $('#waitlistPhone').val();
        
        if (!name || !email || !phone) {
            alert(translations[currentLanguage].required_fields || 'Please fill in all required fields');
            return;
        }
        
        // Simulate form submission
        setTimeout(function() {
            alert(translations[currentLanguage].waitlist_success || 'You have been added to our waitlist!');
            $('#waitlistForm')[0].reset();
        }, 1000);
    });
    
    // Handle Contact Form Submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Form validation
        const name = $('#contactName').val();
        const email = $('#contactEmail').val();
        const message = $('#contactMessage').val();
        
        if (!name || !email || !message) {
            alert(translations[currentLanguage].required_fields || 'Please fill in all required fields');
            return;
        }
        
        // Simulate form submission
        setTimeout(function() {
            alert(translations[currentLanguage].contact_success || 'Your message has been sent successfully!');
            $('#contactForm')[0].reset();
        }, 1000);
    });
});