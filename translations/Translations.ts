import { phoneNumber } from "better-auth/plugins";

// Complete translations for the entire NutriWell website - ALL LANGUAGES
export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      specializations: "Specializations",
      faq: "FAQ",
      contact: "Contact",
      blog: "Blog",
      myDashboard: "My Dashboard",
      adminDashboard: "Admin Dashboard",
      signIn: "Sign In",
      logout: "Logout",
    },

    login: {
      title: "Sign In",
      description: "Enter your credentials to access your account",
      email: "Email Address",
      emailPlaceholder: "your.email@example.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      submit: "Sign In",
      loading: "Signing in...",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      error: "Invalid email or password. Please try again.",
      signInWithGoogle: "Sign in with Google",
      orContinueWith: "Or continue with",
    },

    signup: {
      title: "Create Account",
      description: "Sign up to get started with your health journey",
      fullName: "Full Name",
      fullNamePlaceholder: "John Doe",
      email: "Email Address",
      emailPlaceholder: "your.email@example.com",
      password: "Password",
      passwordPlaceholder: "Create a password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      submit: "Sign Up",
      loading: "Creating account...",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
      error: "An error occurred. Please try again.",
      passwordMismatch: "Passwords do not match",
      signUpWithGoogle: "Sign up with Google",
      orContinueWith: "Or continue with",
    },

    footer: {
      tagline: "Professional nutrition care for a healthier you",
      quickLinks: "Quick Links",
      location: "Outpatient Clinic Headquarters",
      appointments: "Open by appointment",
      openinghours: "Opening Hours",
      book: "347 8990959 (SMS, VOICE, or ANSWERING MACHINE)",
      address: "Via 25 Aprile 7/a",
      city: "31053 PIEVE DI SOLIGO (TV)",
      phonenumber: "Phone Number: 347 8990959",
      activetimes:
        "The cell phone is active Monday through Friday, mainly in the morning.",
      whatsapp: "WhatsApp",
      phone: "Phone",
      copyright: "All rights reserved",
      privacyPolicy: "Privacy Policy",
    },

    home: {
      badge: "Professional Nutrition Care",
      title1: "Transform Your",
      title2: "Health Journey",
      description:
        "Expert nutritionist guidance tailored to your unique needs. Start your personalized wellness journey today.",
      getStarted: "Get Started - Sign Up Free",
      learnMore: "Learn More",
      secure: "100% Secure:",
      secureText:
        "Sign up with Google or create an account with email - Your health data is encrypted and protected",
      statsClients: "Happy Clients",
      statsSuccess: "Success Rate",
      statsExperience: "Years Experience",
      servicesTitle: "Our Services",
      servicesSubtitle:
        "Comprehensive nutrition solutions designed for your success",
      service1Title: "Homeopathy",
      service1Desc:
        "This section concerns therapeutic remedies associated with little matter but supreme energy: homeopathic remedies, isotherapics, Schuessler salts, flower essences, etc.",
      service2Title: "Neural Therapy",
      service2Desc:
        "The discovery of Neural Therapy was accidental but fundamental, it allowed to connect traditional medicine, so-called allopathic, with holistic medicine.",
      service3Title: "Phytotherapy",
      service3Desc:
        "Interest in phytotherapy derives from a passion for nature and in particular for plants, not only medicinal ones.",
      testimonialsTitle: "Client Success Stories",
      testimonialsSubtitle: "Real results from real people",
      testimonial1Result: "Lost 15kg in 3 months",
      testimonial1Text:
        "The personalized meal plans were exactly what I needed. I feel healthier and more energetic than ever!",
      testimonial2Result: "Improved athletic performance",
      testimonial2Text:
        "Sports nutrition guidance helped me achieve my fitness goals. Highly recommend!",
      testimonial3Result: "Managed diabetes effectively",
      testimonial3Text:
        "Professional advice and constant support made all the difference in my health journey.",
      ctaTitle: "Ready to Start Your Health Journey?",
      ctaSubtitle:
        "Create your free account and book your first consultation today",
      ctaButton: "Create Free Account",
      ctaNote:
        "No credit card required • Sign up with Google or Email • 100% Secure",
    },

    about: {
      title: "About Our Practice",
      subtitle:
        "Dedicated to transforming lives through evidence-based nutrition and compassionate care",
      ourStory: "Our Story",
      story1:
        "Founded with a passion for helping people achieve optimal health, our practice combines cutting-edge nutritional science with personalized care. We believe that proper nutrition is the foundation of wellness, and we're committed to guiding you on your journey to better health.",
      story2:
        "With over a decade of experience, we've helped hundreds of clients achieve their health goals through customized nutrition plans, ongoing support, and evidence-based strategies.",
      connectWith: "Connect With Us",
      coreValues: "Our Core Values",
      value1Title: "Compassionate Care",
      value1Desc:
        "We treat every client with empathy, respect, and individualized attention",
      value2Title: "Results-Driven",
      value2Desc:
        "Focused on helping you achieve measurable, sustainable health outcomes",
      value3Title: "Evidence-Based",
      value3Desc:
        "All recommendations backed by the latest nutritional science and research",
      value4Title: "Client-Centered",
      value4Desc:
        "Your unique needs, preferences, and goals guide everything we do",
      value5Title: "Professional Excellence",
      value5Desc:
        "Committed to the highest standards of nutritional care and ethics",
      value6Title: "Innovative Approach",
      value6Desc:
        "Combining traditional wisdom with modern technology for optimal results",
      qualifications: "Qualifications & Expertise",
      trusted: "Trusted by healthcare professionals and clients alike",
      boardCertified: "Board Certified",
      experience: "Experience",
      clientsHelped: "Clients Helped",
      successRate: "Success Rate",
    },

    contact: {
      title: "Get In Touch",
      subtitle:
        "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      sendMessage: "Send us a Message",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      message: "Message",
      messagePlaceholder: "Tell us how we can help you...",
      sendButton: "Send Message",
      contactInfo: "Contact Information",
      phone: "Phone",
      email: "Email",
      address: "Address",
      officeHours: "Office Hours",
      monday: "Monday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 10:00 AM - 2:00 PM",
      sunday: "Sunday: Closed",
      successMessage: "Message sent successfully! We'll get back to you soon.",
    },

    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      stillQuestions: "Still have questions?",
      stillQuestionsText:
        "We're here to help! Contact us through chat or email.",
      q1: "How do I book my first appointment?",
      a1: 'Simply create a free account, go to your dashboard, and click on "Book Appointment". Select your preferred date and time, and you\'ll receive a confirmation email.',
      q2: "How much does the initial consultation cost?",
      a2: "The first consultation costs €100. This includes a comprehensive health assessment and personalized nutrition plan. Follow-up visits are priced differently based on your needs.",
      q3: "Can I cancel or reschedule my appointment?",
      a3: "Yes, you can request to reschedule by contacting us through the chat feature in your dashboard. Please provide at least 24 hours notice for cancellations.",
      q4: "Do you offer virtual consultations?",
      a4: "Yes! All our consultations can be conducted via video call. You'll receive a video link in your appointment confirmation.",
      q5: "What should I prepare for my first appointment?",
      a5: "Please complete the health questionnaire in your dashboard before your first appointment. This helps us understand your needs better and provide personalized guidance.",
      q6: "How long are the consultation sessions?",
      a6: "Initial consultations typically last 60 minutes, while follow-up sessions are usually 30-45 minutes.",
      q7: "Will I receive a meal plan?",
      a7: "Yes, after your initial consultation, you'll receive a personalized meal plan tailored to your goals, preferences, and any dietary restrictions.",
      q8: "How often should I schedule follow-up appointments?",
      a8: "This depends on your individual goals. Typically, we recommend follow-ups every 2-4 weeks to track progress and adjust your plan as needed.",
      q9: "Can I chat with the nutritionist between appointments?",
      a9: "Yes! Use the chat feature in your dashboard to ask questions or share updates. We typically respond within 24 hours.",
      q10: "Do you accept insurance?",
      a10: "We provide detailed invoices that you can submit to your insurance provider for possible reimbursement. Please check with your insurance company about coverage.",
      q11: "What if I have food allergies or dietary restrictions?",
      a11: "All our meal plans are fully customized to accommodate your allergies, intolerances, and dietary preferences (vegetarian, vegan, gluten-free, etc.).",
      q12: "How do I access my prescriptions and meal plans?",
      a12: 'All your prescriptions, meal plans, and health records are securely stored in your dashboard under the "Prescriptions" tab.',
    },

    blog: {
      title: "Blog",
      subtitle: "Latest articles and insights",
      readMore: "Read More",
      noPosts: "No blog posts available yet.",
      allPosts: "All Posts",
    },

    dashboard: {
      welcome: "Welcome back",
      subtitle: "Manage your nutrition journey all in one place",
      overview: "Overview",
      appointments: "Appointments",
      prescriptions: "Prescriptions",
      healthProfile: "Health Profile",
      messages: "Messages",
      totalAppointments: "Total Appointments",
      upcoming: "upcoming",
      activePlans: "Active nutrition plans",
      completed: "Completed",
      notCompleted: "Not completed",
      quickActions: "Quick Actions",
      bookAppointment: "Book Appointment",
      chatWithUs: "Chat with Us",
      updateProfile: "Update Profile",
      viewPlans: "View Plans",
      upcomingAppointments: "Upcoming Appointments",
      joinCall: "Join Call",
      at: "at",
    },

    admin: {
      title: "Admin Dashboard",
      subtitle: "Manage patients, appointments, and prescriptions",
      welcome: "Welcome",
      overview: "Overview",
      patients: "Patients",
      appointments: "Appointments",
      prescriptions: "Prescriptions",
      invoices: "Invoices",
      messages: "Messages",
      totalPatients: "Total Patients",
      todayAppointments: "Today's Appointments",
      activePresc: "Active Prescriptions",
      totalRevenue: "Total Revenue",
      pending: "pending",
      thisMonth: "This month",
    },

    specialization: {
      title: "Areas of Specialization",
      subtitle: "Holistic therapeutic approaches for complete wellness",
      homeopathy: {
        title: "Homeopathy",
        intro:
          "This section concerns therapeutic remedies associated with little matter but supreme energy: homeopathic remedies, isotherapics, Schuessler salts, flower essences, etc.",
        description:
          "The created world is almost a book in which the trinity that built the universe shines, presents itself and is grasped according to a threefold degree of manifestations: by way of trace, image and likeness.",
        listItems: [
          {
            title: "Homeopathic remedies and isotherapics",
            description:
              "Individualized homeopathic treatments using highly diluted substances to stimulate the body's natural healing response. Isotherapics use the patient's own pathological substances to promote recovery.",
          },
          {
            title: "Schuessler mineral salts",
            description:
              "Twelve essential mineral salts identified by Dr. Wilhelm Schuessler that support cellular function and restore biochemical balance in the body.",
          },
          {
            title: "Flower essences and their mechanism",
            description:
              "Bach flower remedies and other flower essences work on an energetic level to address emotional and psychological imbalances, supporting overall well-being.",
          },
          {
            title: "Homeopathic constitutions",
            description:
              "Constitutional treatment identifies the patient's fundamental type and temperament to prescribe remedies that address the whole person, not just symptoms.",
          },
          {
            title: "Treatment of allergies and pollinosis",
            description:
              "Homeopathic approaches to desensitize the body to allergens, reducing hypersensitivity reactions and seasonal allergy symptoms naturally.",
          },
          {
            title: "Skin problems",
            description:
              "Topical and systemic homeopathic remedies for various dermatological conditions including eczema, psoriasis, acne, and other skin disorders.",
          },
        ],
      },
      neuralTherapy: {
        title: "Neural Therapy",
        intro:
          "The discovery of Neural Therapy was accidental but fundamental, it allowed to connect traditional medicine, so-called allopathic, with holistic medicine.",
        description:
          "Neural Therapy is a regulatory treatment method that uses local anesthetics to interrupt interference fields in the autonomic nervous system, restoring normal function and allowing the body to heal itself.",
        listItems: [
          {
            title: "Neuralgia, headaches, migraines",
            description:
              "Treatment of nerve pain and various types of headaches through neural therapy injections that interrupt pain pathways and restore proper neural function.",
          },
          {
            title: "Pathological sensitive scars",
            description:
              "Scars that act as interference fields can disrupt autonomic nervous system function. Neural therapy can neutralize these interference fields to restore proper regulation.",
          },
          {
            title:
          "Rheumatism, district pain without apparent causes (myalgia, cervicalgia...)",
            description:
              "Treatment of rheumatic conditions and localized pain syndromes by identifying and treating interference fields that may be causing referred pain.",
          },
          {
            title: "Neurovegetative dystonias",
            description:
              "Disorders of the autonomic nervous system that affect organ function can be regulated through neural therapy interventions targeting specific ganglia or interference fields.",
          },
          {
            title:
          "Asthma, allergies, functional regulation of deep organs through skin-visceral reflex",
            description:
              "Through the skin-visceral reflex, neural therapy can influence internal organ function, helping to regulate conditions like asthma and allergic reactions.",
          },
          {
            title: "Aromatherapy",
            description:
              "The therapeutic use of essential oils extracted from plants to support physical, emotional, and mental well-being through aromatherapy and topical application.",
          },
          {
            title: "Detoxification treatments",
            description:
              "Therapeutic protocols designed to support the body's natural detoxification processes, eliminating toxins and restoring optimal cellular function.",
          },
          {
            title: "Osteoporosis prevention",
            description:
              "Holistic approaches to bone health including nutritional support, lifestyle modifications, and complementary therapies to maintain bone density and prevent osteoporosis.",
          },
        ],
      },
      phytotherapy: {
        title: "Phytotherapy",
        intro:
          "Interest in phytotherapy derives from a passion for nature and in particular for plants, not only medicinal ones.",
        description:
          "Phytotherapy is the therapeutic method that uses medicinal plants as remedies in extracts (liquid forms: macerates, tinctures, essential oils) or micronized (forms in tablets or capsules) or chopped/whole (herbal teas/decoctions).",
        listItems: [
          {
            title: "Medicinal plant extracts",
            description:
              "Concentrated preparations from medicinal plants available in various forms including liquid extracts, tinctures, and standardized preparations for therapeutic use.",
          },
          {
            title: "Herbal supplements",
            description:
              "Carefully selected herbal supplements that support various aspects of health including digestion, immunity, stress management, and overall wellness.",
          },
          {
            title: "Essential oils and aromatherapy",
            description:
              "Therapeutic use of essential oils extracted from aromatic plants for their healing properties, applied through inhalation, topical application, or internal use when appropriate.",
          },
          {
            title: "Drug-herb interactions",
            description:
              "Expert knowledge of potential interactions between pharmaceutical medications and herbal preparations to ensure safe and effective combined therapy.",
          },
          {
            title: "Natural treatments for skin problems",
            description:
              "Herbal preparations and plant-based remedies for various dermatological conditions, utilizing the anti-inflammatory, antimicrobial, and healing properties of medicinal plants.",
          },
          {
            title: "Detoxifying herbal teas",
            description:
              "Customized herbal tea blends designed to support the body's natural detoxification pathways, promoting elimination of toxins and improving overall metabolic function.",
          },
        ],
      },
    },
  },

  it: {
    nav: {
      home: "Home",
      about: "Chi Sono",
      specializations: "Specializzazioni",
      faq: "FAQ",
      contact: "Contatti",
      blog: "Blog",
      myDashboard: "La Mia Area",
      adminDashboard: "Dashboard Admin",
      signIn: "Accedi",
      logout: "Esci",
    },

    login: {
      title: "Accedi",
      description: "Inserisci le tue credenziali per accedere al tuo account",
      email: "Indirizzo Email",
      emailPlaceholder: "tua.email@esempio.com",
      password: "Password",
      passwordPlaceholder: "Inserisci la tua password",
      rememberMe: "Ricordami",
      forgotPassword: "Password dimenticata?",
      submit: "Accedi",
      loading: "Accesso in corso...",
      noAccount: "Non hai un account?",
      signUp: "Registrati",
      error: "Email o password non valide. Riprova.",
      signInWithGoogle: "Accedi con Google",
      orContinueWith: "Oppure continua con",
    },

    signup: {
      title: "Crea Account",
      description: "Registrati per iniziare il tuo percorso di salute",
      fullName: "Nome Completo",
      fullNamePlaceholder: "Mario Rossi",
      email: "Indirizzo Email",
      emailPlaceholder: "tua.email@esempio.com",
      password: "Password",
      passwordPlaceholder: "Crea una password",
      confirmPassword: "Conferma Password",
      confirmPasswordPlaceholder: "Conferma la tua password",
      submit: "Registrati",
      loading: "Creazione account in corso...",
      hasAccount: "Hai già un account?",
      signIn: "Accedi",
      error: "Si è verificato un errore. Riprova.",
      passwordMismatch: "Le password non corrispondono",
      signUpWithGoogle: "Registrati con Google",
      orContinueWith: "Oppure continua con",
    },

    footer: {
      tagline: "Cura nutrizionale professionale per una vita più sana",
      quickLinks: "Link Rapidi",
      location: "Sede Ambulatorio",
      address: "Via 25 Aprile 7/a",
      city: "31053 PIEVE DI SOLIGO (TV)",
      book: "347 8990959 (SMS, VOCE o SEGRETERIA)",
      appointments: "Apertura su appuntamento",
      contact: "Contatti",
      openinghours: "Orari di Apertura",
      phonenumber: "Telefono 347 8990959",
      activetimes:
        "il cellulare è attivo dal lunedì al venerdì prevalentemente di mattina",
      phone: "Telefono",
      copyright: "Tutti i diritti riservati",
      privacyPolicy: "Privacy Policy",
    },

    home: {
      badge: "Cura Nutrizionale Professionale",
      title1: "Trasforma il Tuo",
      title2: "Percorso di Salute",
      description:
        "Guida nutrizionale esperta su misura per le tue esigenze uniche. Inizia oggi il tuo percorso di benessere personalizzato.",
      getStarted: "Inizia - Registrati Gratis",
      learnMore: "Scopri di Più",
      secure: "100% Sicuro:",
      secureText:
        "Registrati con Google o crea un account con email - I tuoi dati sanitari sono crittografati e protetti",
      statsClients: "Clienti Soddisfatti",
      statsSuccess: "Tasso di Successo",
      statsExperience: "Anni di Esperienza",
      servicesTitle: "I Nostri Servizi",
      servicesSubtitle:
        "Soluzioni nutrizionali complete progettate per il tuo successo",
      service1Title: "Omeopatia",
      service1Desc:
        "Questa sezione riguarda i rimedi terapeutici ai quali è associata poca materia ma sopraffina energia: rimedi omeopatici, isoterapici, sali di Schuessler, essenze floreali etc…",
      service2Title: "Neuralterapia",
      service2Desc:
        "La scoperta della Terapia Neurale è stata casuale ma fondamentale, ha permesso di collegare la medicina tradizionale, così detta allopatica, con la medicina olistica",
      service3Title: "Fitoterapia",
      service3Desc:
        "L'interesse per la fitoterapia deriva dalla passione per la natura ed in particolare per le piante, non solo quelle medicinali.",
      testimonialsTitle: "Storie di Successo dei Clienti",
      testimonialsSubtitle: "Risultati reali da persone reali",
      testimonial1Result: "Persi 15kg in 3 mesi",
      testimonial1Text:
        "I piani alimentari personalizzati erano esattamente ciò di cui avevo bisogno. Mi sento più sana e più energica che mai!",
      testimonial2Result: "Prestazioni atletiche migliorate",
      testimonial2Text:
        "La guida nutrizionale sportiva mi ha aiutato a raggiungere i miei obiettivi di fitness. Altamente raccomandato!",
      testimonial3Result: "Gestito il diabete efficacemente",
      testimonial3Text:
        "Consigli professionali e supporto costante hanno fatto tutta la differenza nel mio percorso di salute.",
      ctaTitle: "Pronto a Iniziare il Tuo Percorso di Salute?",
      ctaSubtitle:
        "Crea il tuo account gratuito e prenota la tua prima consulenza oggi",
      ctaButton: "Crea Account Gratuito",
      ctaNote:
        "Nessuna carta di credito richiesta • Registrati con Google o Email • 100% Sicuro",
    },

    about: {
      title: "Chi Siamo",
      subtitle:
        "Dedicati a trasformare le vite attraverso la nutrizione basata sull'evidenza e la cura compassionevole",
      ourStory: "La Nostra Storia",
      story1:
        "Fondata con la passione di aiutare le persone a raggiungere una salute ottimale, la nostra pratica combina la scienza nutrizionale all'avanguardia con cure personalizzate. Crediamo che una corretta nutrizione sia il fondamento del benessere e ci impegniamo a guidarti nel tuo viaggio verso una salute migliore.",
      story2:
        "Con oltre un decennio di esperienza, abbiamo aiutato centinaia di clienti a raggiungere i loro obiettivi di salute attraverso piani nutrizionali personalizzati, supporto continuo e strategie basate sull'evidenza.",
      connectWith: "Connettiti con Noi",
      coreValues: "I Nostri Valori Fondamentali",
      value1Title: "Cura Compassionevole",
      value1Desc:
        "Trattiamo ogni cliente con empatia, rispetto e attenzione individualizzata",
      value2Title: "Orientati ai Risultati",
      value2Desc:
        "Concentrati ad aiutarti a raggiungere risultati di salute misurabili e sostenibili",
      value3Title: "Basato sull'Evidenza",
      value3Desc:
        "Tutte le raccomandazioni supportate dalla scienza nutrizionale e dalla ricerca più recenti",
      value4Title: "Centrato sul Cliente",
      value4Desc:
        "Le tue esigenze, preferenze e obiettivi unici guidano tutto ciò che facciamo",
      value5Title: "Eccellenza Professionale",
      value5Desc: "Impegnati ai massimi standard di cura nutrizionale ed etica",
      value6Title: "Approccio Innovativo",
      value6Desc:
        "Combinando la saggezza tradizionale con la tecnologia moderna per risultati ottimali",
      qualifications: "Qualifiche e Competenze",
      trusted: "Di fiducia da professionisti sanitari e clienti",
      boardCertified: "Certificato",
      experience: "Esperienza",
      clientsHelped: "Clienti Aiutati",
      successRate: "Tasso di Successo",
    },

    contact: {
      title: "Contattaci",
      subtitle:
        "Hai domande? Ci piacerebbe sentirti. Inviaci un messaggio e ti risponderemo il prima possibile.",
      sendMessage: "Inviaci un Messaggio",
      fullName: "Nome Completo",
      emailAddress: "Indirizzo Email",
      phoneNumber: "Numero di Telefono",
      message: "Messaggio",
      messagePlaceholder: "Dicci come possiamo aiutarti...",
      sendButton: "Invia Messaggio",
      contactInfo: "Informazioni di Contatto",
      phone: "Telefono",
      email: "Email",
      address: "Indirizzo",
      officeHours: "Orari d'Ufficio",
      monday: "Lunedì - Venerdì: 9:00 - 18:00",
      saturday: "Sabato: 10:00 - 14:00",
      sunday: "Domenica: Chiuso",
      successMessage: "Messaggio inviato con successo! Ti risponderemo presto.",
    },

    faq: {
      title: "Domande Frequenti",
      subtitle: "Trova risposte alle domande comuni sui nostri servizi",
      stillQuestions: "Hai ancora domande?",
      stillQuestionsText:
        "Siamo qui per aiutarti! Contattaci tramite chat o email.",
      q1: "Come prenoto il mio primo appuntamento?",
      a1: 'Basta creare un account gratuito, andare nel tuo dashboard e cliccare su "Prenota Appuntamento". Seleziona la tua data e ora preferite e riceverai un\'email di conferma.',
      q2: "Quanto costa la consultazione iniziale?",
      a2: "La prima consultazione costa €100. Include una valutazione sanitaria completa e un piano nutrizionale personalizzato. Le visite di follow-up hanno prezzi diversi in base alle tue esigenze.",
      q3: "Posso cancellare o riprogrammare il mio appuntamento?",
      a3: "Sì, puoi richiedere di riprogrammare contattandoci tramite la funzione chat nel tuo dashboard. Ti preghiamo di fornire almeno 24 ore di preavviso per le cancellazioni.",
      q4: "Offrite consultazioni virtuali?",
      a4: "Sì! Tutte le nostre consultazioni possono essere condotte tramite videochiamata. Riceverai un link video nella conferma del tuo appuntamento.",
      q5: "Cosa devo preparare per il mio primo appuntamento?",
      a5: "Ti preghiamo di completare il questionario sanitario nel tuo dashboard prima del tuo primo appuntamento. Questo ci aiuta a capire meglio le tue esigenze e fornire una guida personalizzata.",
      q6: "Quanto durano le sessioni di consultazione?",
      a6: "Le consultazioni iniziali durano tipicamente 60 minuti, mentre le sessioni di follow-up sono solitamente di 30-45 minuti.",
      q7: "Riceverò un piano alimentare?",
      a7: "Sì, dopo la tua consultazione iniziale, riceverai un piano alimentare personalizzato su misura per i tuoi obiettivi, preferenze e eventuali restrizioni dietetiche.",
      q8: "Con quale frequenza dovrei programmare appuntamenti di follow-up?",
      a8: "Dipende dai tuoi obiettivi individuali. Tipicamente, raccomandiamo follow-up ogni 2-4 settimane per monitorare i progressi e adeguare il tuo piano secondo necessità.",
      q9: "Posso chattare con la nutrizionista tra gli appuntamenti?",
      a9: "Sì! Usa la funzione chat nel tuo dashboard per fare domande o condividere aggiornamenti. Rispondiamo tipicamente entro 24 ore.",
      q10: "Accettate assicurazioni?",
      a10: "Forniamo fatture dettagliate che puoi presentare al tuo fornitore di assicurazione per un possibile rimborso. Ti preghiamo di verificare con la tua compagnia assicurativa per la copertura.",
      q11: "E se ho allergie alimentari o restrizioni dietetiche?",
      a11: "Tutti i nostri piani alimentari sono completamente personalizzati per accogliere le tue allergie, intolleranze e preferenze dietetiche (vegetariane, vegane, senza glutine, ecc.).",
      q12: "Come accedo alle mie prescrizioni e piani alimentari?",
      a12: 'Tutte le tue prescrizioni, piani alimentari e cartelle cliniche sono archiviate in modo sicuro nel tuo dashboard nella scheda "Prescrizioni".',
    },

    blog: {
      title: "Blog",
      subtitle: "Ultimi articoli e approfondimenti",
      readMore: "Leggi di più",
      noPosts: "Nessun articolo disponibile al momento.",
      allPosts: "Tutti gli Articoli",
    },

    dashboard: {
      welcome: "Bentornato",
      subtitle: "Gestisci il tuo percorso nutrizionale tutto in un unico posto",
      overview: "Panoramica",
      appointments: "Appuntamenti",
      prescriptions: "Prescrizioni",
      healthProfile: "Profilo Sanitario",
      messages: "Messaggi",
      totalAppointments: "Appuntamenti Totali",
      upcoming: "prossimi",
      activePlans: "Piani nutrizionali attivi",
      completed: "Completato",
      notCompleted: "Non completato",
      quickActions: "Azioni Rapide",
      bookAppointment: "Prenota Appuntamento",
      chatWithUs: "Chatta con Noi",
      updateProfile: "Aggiorna Profilo",
      viewPlans: "Visualizza Piani",
      upcomingAppointments: "Prossimi Appuntamenti",
      joinCall: "Unisciti alla Chiamata",
      at: "alle",
    },

    admin: {
      title: "Dashboard Amministratore",
      subtitle: "Gestisci pazienti, appuntamenti e prescrizioni",
      welcome: "Benvenuto",
      overview: "Panoramica",
      patients: "Pazienti",
      appointments: "Appuntamenti",
      prescriptions: "Prescrizioni",
      invoices: "Fatture",
      messages: "Messaggi",
      totalPatients: "Pazienti Totali",
      todayAppointments: "Appuntamenti di Oggi",
      activePresc: "Prescrizioni Attive",
      totalRevenue: "Entrate Totali",
      pending: "in sospeso",
      thisMonth: "Questo mese",
    },

    specialization: {
      title: "Ambiti di Specializzazione",
      subtitle: "Approcci terapeutici olistici per il benessere completo",
      homeopathy: {
        title: "Omeopatia",
        intro:
          "Questa sezione riguarda i rimedi terapeutici ai quali è associata poca materia ma sopraffina energia: rimedi omeopatici, isoterapici, sali di Schuessler, essenze floreali etc…",
        description:
          "Il mondo creato è quasi un libro nel quale riluce, si presenta e si coglie la trinità che ha costruito l'universo secondo un triplice grado di manifestazioni: per modo di vestigio, immagine e similitudine.",
        listItems: [
          {
            title: "Rimedi omeopatici e isoterapici",
            description:
              "Trattamenti omeopatici individualizzati che utilizzano sostanze altamente diluite per stimolare la risposta di guarigione naturale del corpo. Gli isoterapici utilizzano le sostanze patologiche del paziente stesso per promuovere il recupero.",
          },
          {
            title: "Sali minerali di Schuessler",
            description:
              "Dodici sali minerali essenziali identificati dal Dr. Wilhelm Schuessler che supportano la funzione cellulare e ripristinano l'equilibrio biochimico nel corpo.",
          },
          {
            title: "Essenze floreali e loro meccanismo",
            description:
              "I rimedi floreali di Bach e altre essenze floreali agiscono a livello energetico per affrontare gli squilibri emotivi e psicologici, sostenendo il benessere generale.",
          },
          {
            title: "Costituzioni omeopatiche",
            description:
              "Il trattamento costituzionale identifica il tipo e il temperamento fondamentale del paziente per prescrivere rimedi che affrontano la persona nella sua totalità, non solo i sintomi.",
          },
          {
            title: "Trattamento di allergie e pollinosi",
            description:
              "Approcci omeopatici per desensibilizzare il corpo agli allergeni, riducendo le reazioni di ipersensibilità e i sintomi delle allergie stagionali in modo naturale.",
          },
          {
            title: "Problemi della pelle",
            description:
              "Rimedi omeopatici topici e sistemici per varie condizioni dermatologiche tra cui eczema, psoriasi, acne e altri disturbi della pelle.",
          },
        ],
      },
      neuralTherapy: {
        title: "Neuralterapia",
        intro:
          "La scoperta della Terapia Neurale è stata casuale ma fondamentale, ha permesso di collegare la medicina tradizionale, così detta allopatica, con la medicina olistica.",
        description:
          "La Terapia Neurale è un metodo di trattamento regolatorio che utilizza anestetici locali per interrompere i campi di interferenza nel sistema nervoso autonomo, ripristinando la funzione normale e permettendo al corpo di guarire se stesso.",
        listItems: [
          {
            title: "Nevralgie, cefalee, emicranie",
            description:
              "Trattamento del dolore nervoso e vari tipi di mal di testa attraverso iniezioni di terapia neurale che interrompono le vie del dolore e ripristinano la corretta funzione neurale.",
          },
          {
            title: "Cicatrici patologiche sensibili",
            description:
              "Le cicatrici che agiscono come campi di interferenza possono disturbare la funzione del sistema nervoso autonomo. La terapia neurale può neutralizzare questi campi di interferenza per ripristinare la corretta regolazione.",
          },
          {
            title:
          "Reumatismi, dolori distrettuali senza cause apparenti (mialgie, cervicalgie…)",
            description:
              "Trattamento delle condizioni reumatiche e delle sindromi dolorose localizzate identificando e trattando i campi di interferenza che possono causare dolore riferito.",
          },
          {
            title: "Distonie neurovegetative",
            description:
              "I disturbi del sistema nervoso autonomo che influenzano la funzione degli organi possono essere regolati attraverso interventi di terapia neurale che mirano a specifici gangli o campi di interferenza.",
          },
          {
            title:
          "Asma, allergie, regolazione funzionale di organi profondi attraverso il riflesso cute-viscere",
            description:
              "Attraverso il riflesso cute-viscere, la terapia neurale può influenzare la funzione degli organi interni, aiutando a regolare condizioni come asma e reazioni allergiche.",
          },
          {
            title: "Aromaterapia",
            description:
              "L'uso terapeutico di oli essenziali estratti dalle piante per supportare il benessere fisico, emotivo e mentale attraverso aromaterapia e applicazione topica.",
          },
          {
            title: "Depurazione",
            description:
              "Protocolli terapeutici progettati per supportare i processi naturali di disintossicazione del corpo, eliminando le tossine e ripristinando la funzione cellulare ottimale.",
          },
          {
            title: "Prevenzione osteoporosi",
            description:
              "Approcci olistici alla salute delle ossa inclusi supporto nutrizionale, modifiche dello stile di vita e terapie complementari per mantenere la densità ossea e prevenire l'osteoporosi.",
          },
        ],
      },
      phytotherapy: {
        title: "Fitoterapia",
        intro:
          "L'interesse per la fitoterapia deriva dalla passione per la natura ed in particolare per le piante, non solo quelle medicinali.",
        description:
          "La fitoterapia è il metodo terapeutico che utilizza come rimedi proprio le piante medicinali in estratti (forme liquide: macerati, tinture, oli essenziali) o micronizzate (forme in compresse o capsule) o sminuzzate/intere (tisane/decotti).",
        listItems: [
          {
            title: "Estratti di piante medicinali",
            description:
              "Preparazioni concentrate da piante medicinali disponibili in varie forme tra cui estratti liquidi, tinture e preparazioni standardizzate per uso terapeutico.",
          },
          {
            title: "Integratori erboristici",
            description:
              "Integratori erboristici selezionati con cura che supportano vari aspetti della salute inclusi digestione, immunità, gestione dello stress e benessere generale.",
          },
          {
            title: "Oli essenziali e aromaterapia",
            description:
              "Uso terapeutico di oli essenziali estratti da piante aromatiche per le loro proprietà curative, applicati attraverso inalazione, applicazione topica o uso interno quando appropriato.",
          },
          {
            title: "Interazioni farmaci-erbe",
            description:
              "Conoscenza esperta delle potenziali interazioni tra farmaci e preparazioni erboristiche per garantire una terapia combinata sicura ed efficace.",
          },
          {
            title: "Trattamenti naturali per la pelle",
            description:
              "Preparazioni erboristiche e rimedi a base di piante per varie condizioni dermatologiche, utilizzando le proprietà antinfiammatorie, antimicrobiche e curative delle piante medicinali.",
          },
          {
            title: "Tisane depurative",
            description:
              "Blend di tisane erboristiche personalizzati progettati per supportare i percorsi naturali di disintossicazione del corpo, promuovendo l'eliminazione delle tossine e migliorando la funzione metabolica generale.",
          },
        ],
      },
    },
  },
};
