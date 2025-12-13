"use client";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { LanguageContext } from "@/app/context/LanguageContext";
import { translations } from "@/translations/Translations";
import type { SupportedLanguage } from "@/@types/app.types";
import { useSingleType, useCollectionType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  article?: any; // Rich text blocks for RichTextRenderer
  publishedAt: string;
  readingTime?: number;
  image?: {
    url: string;
    alt?: string;
  };
  author?: string;
  category?: string;
};

export default function BlogPage() {
  const language = (useContext(LanguageContext) || "it") as SupportedLanguage;
  const t = (translations[language] as any)?.blog ||
    (translations.en as any)?.blog || {
      title: "Blog",
      subtitle: "Latest articles and insights",
      readMore: "Read More",
      noPosts: "No blog posts available yet.",
      allPosts: "All Posts",
    };

  const locale = language === "it" ? "it" : "en";

  // Fetch blog page data from Strapi
  const {
    data: pageData,
    isLoading: isPageLoading,
    error: pageError,
  } = useSingleType("blog-page", {
    locale,
    populate: ["hero"],
  });

  // Fetch blog posts from Strapi
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
  } = useCollectionType("blog-post", {
    locale,
    populate: ["Image", "author", "author.avatar", "Article"],
    sort: ["publishedAt:desc"],
    pagination: {
      page: 1,
      pageSize: 12,
    },
    publicationState: "live",
  });

  const isLoading = isPageLoading || isPostsLoading;
  const error = pageError || postsError;

  // Extract hero data
  const hero =
    pageData?.data &&
    typeof pageData.data === "object" &&
    "hero" in pageData.data
      ? (pageData.data as any).hero ?? null
      : null;

  // Helper function to get image URL from Strapi
  const getImageUrl = (image: any): string | null => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image.url) return image.url;
    if (image.data?.attributes?.url) return image.data.attributes.url;
    if (image.attributes?.url) return image.attributes.url;
    if (Array.isArray(image.data) && image.data[0]?.attributes?.url) {
      return image.data[0].attributes.url;
    }
    return null;
  };

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Dummy blog posts for fallback
  const dummyPosts: BlogPost[] = [
    {
      id: "1",
      title:
        language === "it"
          ? "L'Importanza di una Nutrizione Personalizzata"
          : "The Importance of Personalized Nutrition",
      slug: "importance-of-personalized-nutrition",
      description:
        language === "it"
          ? "Scopri come una dieta personalizzata può trasformare la tua salute e il tuo benessere. Ogni persona ha esigenze nutrizionali uniche che richiedono un approccio su misura."
          : "Discover how a personalized diet can transform your health and well-being. Each person has unique nutritional needs that require a tailored approach.",
      article:
        language === "it"
          ? `<p>La nutrizione personalizzata rappresenta il futuro del benessere. Non esiste una dieta universale che funzioni per tutti. Le nostre esigenze nutrizionali variano in base a molti fattori, tra cui:</p>
        
        <ul>
          <li><strong>Età e sesso</strong>: Le esigenze nutrizionali cambiano nel corso della vita</li>
          <li><strong>Livello di attività fisica</strong>: Gli atleti hanno bisogno di più calorie e proteine</li>
          <li><strong>Condizioni di salute</strong>: Malattie croniche richiedono approcci specifici</li>
          <li><strong>Stile di vita</strong>: Stress, sonno e lavoro influenzano il metabolismo</li>
          <li><strong>Preferenze e restrizioni alimentari</strong>: Allergie, intolleranze e scelte etiche</li>
        </ul>

        <h2>I Vantaggi di un Approccio Personalizzato</h2>
        <p>Quando la nutrizione è adattata alle tue esigenze specifiche, puoi aspettarti:</p>
        <ul>
          <li>Migliore digestione e assorbimento dei nutrienti</li>
          <li>Maggiore energia e vitalità</li>
          <li>Gestione del peso più efficace</li>
          <li>Supporto per condizioni di salute specifiche</li>
          <li>Migliore qualità del sonno</li>
        </ul>

        <h2>Come Iniziare</h2>
        <p>Il primo passo verso una nutrizione personalizzata è una valutazione completa. Durante la consultazione iniziale, analizzeremo il tuo stile di vita, le tue abitudini alimentari e i tuoi obiettivi di salute per creare un piano su misura.</p>`
          : `<p>Personalized nutrition represents the future of wellness. There is no one-size-fits-all diet that works for everyone. Our nutritional needs vary based on many factors, including:</p>
        
        <ul>
          <li><strong>Age and gender</strong>: Nutritional needs change throughout life</li>
          <li><strong>Physical activity level</strong>: Athletes need more calories and protein</li>
          <li><strong>Health conditions</strong>: Chronic diseases require specific approaches</li>
          <li><strong>Lifestyle</strong>: Stress, sleep, and work affect metabolism</li>
          <li><strong>Food preferences and restrictions</strong>: Allergies, intolerances, and ethical choices</li>
        </ul>

        <h2>The Benefits of a Personalized Approach</h2>
        <p>When nutrition is tailored to your specific needs, you can expect:</p>
        <ul>
          <li>Better digestion and nutrient absorption</li>
          <li>Increased energy and vitality</li>
          <li>More effective weight management</li>
          <li>Support for specific health conditions</li>
          <li>Better sleep quality</li>
        </ul>

        <h2>How to Get Started</h2>
        <p>The first step toward personalized nutrition is a comprehensive assessment. During the initial consultation, we'll analyze your lifestyle, eating habits, and health goals to create a customized plan.</p>`,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      readingTime: 5,
      category: language === "it" ? "Nutrizione" : "Nutrition",
    },
    {
      id: "2",
      title:
        language === "it"
          ? "Omeopatia e Medicina Integrativa: Un Approccio Olistico"
          : "Homeopathy and Integrative Medicine: A Holistic Approach",
      slug: "homeopathy-integrative-medicine-holistic-approach",
      description:
        language === "it"
          ? "Esplora come l'omeopatia si integra con la medicina tradizionale per offrire un approccio completo alla cura della salute. Scopri i principi fondamentali e i benefici."
          : "Explore how homeopathy integrates with traditional medicine to offer a comprehensive approach to health care. Discover the fundamental principles and benefits.",
      article:
        language === "it"
          ? `<p>L'omeopatia è un sistema di medicina naturale che esiste da oltre 200 anni, fondato sul principio del "simile cura simile". Questo approccio olistico considera la persona nella sua totalità, non solo i sintomi della malattia.</p>

        <h2>Principi Fondamentali dell'Omeopatia</h2>
        <p>L'omeopatia si basa su tre principi fondamentali:</p>
        
        <h3>1. Legge dei Simili</h3>
        <p>Questa legge afferma che una sostanza che può causare sintomi in una persona sana può anche curare sintomi simili in una persona malata quando somministrata in dosi molto diluite.</p>

        <h3>2. Potenziamento</h3>
        <p>I rimedi omeopatici vengono diluiti e "dinamizzati" (agitati) in un processo chiamato potenziamento. Questo processo aumenta l'efficacia energetica del rimedio pur riducendo gli effetti collaterali.</p>

        <h3>3. Approccio Olistico</h3>
        <p>L'omeopatia considera l'intera persona - fisica, emotiva e mentale - piuttosto che trattare solo i sintomi isolati. Questo approccio mira a ripristinare l'equilibrio naturale del corpo.</p>

        <h2>Integrazione con la Medicina Tradizionale</h2>
        <p>L'omeopatia può essere utilizzata insieme alla medicina convenzionale per:</p>
        <ul>
          <li>Supportare i trattamenti medici esistenti</li>
          <li>Ridurre gli effetti collaterali dei farmaci</li>
          <li>Migliorare la qualità della vita</li>
          <li>Prevenire le malattie rafforzando il sistema immunitario</li>
        </ul>

        <h2>Quando è Utile</h2>
        <p>L'omeopatia può essere particolarmente efficace per:</p>
        <ul>
          <li>Malattie croniche e ricorrenti</li>
          <li>Problemi allergici e respiratori</li>
          <li>Disturbi della pelle</li>
          <li>Problemi digestivi</li>
          <li>Disturbi del sonno e dell'umore</li>
        </ul>

        <p>È importante consultare un professionista qualificato per determinare se l'omeopatia è appropriata per la tua situazione specifica.</p>`
          : `<p>Homeopathy is a system of natural medicine that has existed for over 200 years, founded on the principle of "like cures like." This holistic approach considers the person in their entirety, not just the symptoms of disease.</p>

        <h2>Fundamental Principles of Homeopathy</h2>
        <p>Homeopathy is based on three fundamental principles:</p>
        
        <h3>1. Law of Similars</h3>
        <p>This law states that a substance that can cause symptoms in a healthy person can also cure similar symptoms in a sick person when administered in very diluted doses.</p>

        <h3>2. Potentization</h3>
        <p>Homeopathic remedies are diluted and "succussed" (shaken) in a process called potentization. This process increases the energetic effectiveness of the remedy while reducing side effects.</p>

        <h3>3. Holistic Approach</h3>
        <p>Homeopathy considers the whole person - physical, emotional, and mental - rather than treating only isolated symptoms. This approach aims to restore the body's natural balance.</p>

        <h2>Integration with Traditional Medicine</h2>
        <p>Homeopathy can be used alongside conventional medicine to:</p>
        <ul>
          <li>Support existing medical treatments</li>
          <li>Reduce medication side effects</li>
          <li>Improve quality of life</li>
          <li>Prevent illness by strengthening the immune system</li>
        </ul>

        <h2>When It's Useful</h2>
        <p>Homeopathy can be particularly effective for:</p>
        <ul>
          <li>Chronic and recurring conditions</li>
          <li>Allergic and respiratory problems</li>
          <li>Skin disorders</li>
          <li>Digestive issues</li>
          <li>Sleep and mood disorders</li>
        </ul>

        <p>It's important to consult a qualified professional to determine if homeopathy is appropriate for your specific situation.</p>`,
      publishedAt: new Date(
        Date.now() - 14 * 24 * 60 * 60 * 1000
      ).toISOString(), // 14 days ago
      readingTime: 7,
      category: language === "it" ? "Omeopatia" : "Homeopathy",
    },
    {
      id: "3",
      title:
        language === "it"
          ? "Fitoterapia: Il Potere Curativo delle Piante"
          : "Phytotherapy: The Healing Power of Plants",
      slug: "phytotherapy-healing-power-of-plants",
      description:
        language === "it"
          ? "Scopri come le piante medicinali possono supportare la tua salute naturale. Dalle erbe tradizionali agli estratti moderni, la fitoterapia offre soluzioni efficaci per molti disturbi comuni."
          : "Discover how medicinal plants can support your natural health. From traditional herbs to modern extracts, phytotherapy offers effective solutions for many common ailments.",
      article:
        language === "it"
          ? `<p>La fitoterapia, o medicina a base di erbe, è una delle forme più antiche di guarigione. Per migliaia di anni, le persone hanno utilizzato le piante per trattare vari disturbi e mantenere la salute.</p>

        <h2>Cos'è la Fitoterapia</h2>
        <p>La fitoterapia è la scienza che utilizza piante medicinali per prevenire e trattare le malattie. A differenza dei farmaci sintetici, i rimedi fitoterapici contengono complessi di sostanze naturali che lavorano in sinergia per produrre effetti terapeutici.</p>

        <h2>Forme di Preparazione</h2>
        <p>Le piante medicinali possono essere preparate in diverse forme:</p>
        
        <h3>Tisane e Infusi</h3>
        <p>Le tisane sono preparazioni acquose ottenute per infusione o decozione delle parti delle piante (foglie, fiori, radici). Sono ideali per uso quotidiano e benessere generale.</p>

        <h3>Tinture Madri</h3>
        <p>Le tinture sono estratti alcolici che concentrano i principi attivi delle piante. Sono più potenti delle tisane e vengono utilizzate per trattamenti specifici.</p>

        <h3>Estratti Standardizzati</h3>
        <p>Gli estratti in capsule o compresse contengono quantità standardizzate di principi attivi, garantendo dosaggi precisi e costanti.</p>

        <h3>Oli Essenziali</h3>
        <p>Gli oli essenziali sono concentrati volatili estratti dalle piante aromatiche, utilizzati per aromaterapia e applicazioni topiche.</p>

        <h2>Piante Medicinali Comuni</h2>
        <p>Alcune delle piante più utilizzate includono:</p>
        <ul>
          <li><strong>Camomilla</strong>: Calmante e antinfiammatoria</li>
          <li><strong>Ginseng</strong>: Energizzante e adattogena</li>
          <li><strong>Echinacea</strong>: Supporto immunitario</li>
          <li><strong>Ginkgo Biloba</strong>: Migliora la circolazione e la memoria</li>
          <li><strong>Valeriana</strong>: Promuove il sonno e riduce l'ansia</li>
          <li><strong>Curcuma</strong>: Potente antinfiammatorio naturale</li>
        </ul>

        <h2>Vantaggi della Fitoterapia</h2>
        <ul>
          <li>Minori effetti collaterali rispetto ai farmaci sintetici</li>
          <li>Approccio naturale e sostenibile</li>
          <li>Può essere usata preventivamente</li>
          <li>Spesso più economica</li>
          <li>Combinabile con altri trattamenti</li>
        </ul>

        <h2>Importanza della Consultazione Professionale</h2>
        <p>Sebbene le piante medicinali siano naturali, non sono sempre sicure. È importante:</p>
        <ul>
          <li>Consultare un professionista qualificato</li>
          <li>Informare il medico di eventuali integratori a base di erbe</li>
          <li>Essere consapevoli delle possibili interazioni con i farmaci</li>
          <li>Acquistare da fonti affidabili e certificate</li>
        </ul>

        <p>La fitoterapia, quando usata correttamente, può essere un potente alleato per la tua salute e il tuo benessere.</p>`
          : `<p>Phytotherapy, or herbal medicine, is one of the oldest forms of healing. For thousands of years, people have used plants to treat various ailments and maintain health.</p>

        <h2>What is Phytotherapy</h2>
        <p>Phytotherapy is the science that uses medicinal plants to prevent and treat diseases. Unlike synthetic drugs, phytotherapeutic remedies contain complexes of natural substances that work synergistically to produce therapeutic effects.</p>

        <h2>Forms of Preparation</h2>
        <p>Medicinal plants can be prepared in different forms:</p>
        
        <h3>Herbal Teas and Infusions</h3>
        <p>Herbal teas are aqueous preparations obtained by infusion or decoction of plant parts (leaves, flowers, roots). They are ideal for daily use and general wellness.</p>

        <h3>Mother Tinctures</h3>
        <p>Tinctures are alcohol extracts that concentrate the active principles of plants. They are more potent than teas and are used for specific treatments.</p>

        <h3>Standardized Extracts</h3>
        <p>Extracts in capsules or tablets contain standardized amounts of active principles, ensuring precise and consistent dosages.</p>

        <h3>Essential Oils</h3>
        <p>Essential oils are volatile concentrates extracted from aromatic plants, used for aromatherapy and topical applications.</p>

        <h2>Common Medicinal Plants</h2>
        <p>Some of the most commonly used plants include:</p>
        <ul>
          <li><strong>Chamomile</strong>: Calming and anti-inflammatory</li>
          <li><strong>Ginseng</strong>: Energizing and adaptogenic</li>
          <li><strong>Echinacea</strong>: Immune support</li>
          <li><strong>Ginkgo Biloba</strong>: Improves circulation and memory</li>
          <li><strong>Valerian</strong>: Promotes sleep and reduces anxiety</li>
          <li><strong>Turmeric</strong>: Powerful natural anti-inflammatory</li>
        </ul>

        <h2>Benefits of Phytotherapy</h2>
        <ul>
          <li>Fewer side effects than synthetic drugs</li>
          <li>Natural and sustainable approach</li>
          <li>Can be used preventively</li>
          <li>Often more economical</li>
          <li>Can be combined with other treatments</li>
        </ul>

        <h2>Importance of Professional Consultation</h2>
        <p>Although medicinal plants are natural, they are not always safe. It's important to:</p>
        <ul>
          <li>Consult a qualified professional</li>
          <li>Inform your doctor of any herbal supplements</li>
          <li>Be aware of possible drug interactions</li>
          <li>Purchase from reliable and certified sources</li>
        </ul>

        <p>Phytotherapy, when used correctly, can be a powerful ally for your health and well-being.</p>`,
      publishedAt: new Date(
        Date.now() - 21 * 24 * 60 * 60 * 1000
      ).toISOString(), // 21 days ago
      readingTime: 6,
      category: language === "it" ? "Fitoterapia" : "Phytotherapy",
    },
  ];

  // Map blog posts
  const posts: BlogPost[] =
    Array.isArray(postsData?.data) && postsData.data.length > 0
      ? postsData.data.map((item: any): BlogPost => {
          const imageUrl = getImageUrl(item.Image || item.image);
          const publishedDate =
            item.publishedAt || item.createdAt || new Date().toISOString();
          const article = item.Article || item.article;

          return {
            id: item.id?.toString() || String(item.slug),
            title: item.title || "",
            slug: item.slug || "",
            description: item.description || "",
            article: article,
            publishedAt: publishedDate,
            readingTime:
              item.readingTime ||
              (article
                ? Math.ceil((JSON.stringify(article).length || 500) / 200)
                : 5),
            image: imageUrl
              ? {
                  url: imageUrl.startsWith("http")
                    ? imageUrl
                    : `${strapiUrl}${imageUrl}`,
                  alt: (item.Image || item.image)?.alt || item.title || "",
                }
              : undefined,
            author:
              typeof item.author === "string"
                ? item.author
                : item.author?.name || item.author?.username || undefined,
            category: item.category || undefined,
          };
        })
      : dummyPosts;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4 animate-pulse">
            <div className="mx-auto h-12 w-64 bg-gray-200 rounded" />
            <div className="mx-auto h-6 w-96 bg-gray-200 rounded" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Log error but continue to render
  if (error) {
    console.error("Error fetching blog data:", error);
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {hero?.title || t.title || "Blog"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {hero?.description || t.subtitle || "Latest articles and insights"}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Post Image */}
                  {post.image ? (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={post.image.url}
                        alt={post.image.alt || post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-emerald-300" />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Category */}
                    {post.category && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-3">
                        {post.category}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Description */}
                    {post.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.description}
                      </p>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min</span>
                          </div>
                        )}
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.author}</span>
                        </div>
                      )}
                    </div>

                    {/* Read More Link */}
                    <div className="mt-4 flex items-center text-emerald-600 font-semibold group">
                      <span>{t.readMore || "Read More"}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              {t.noPosts || "No blog posts available yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
