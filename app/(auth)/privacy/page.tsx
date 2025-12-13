"use client";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-10"
        >
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Informativa in Italiano
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Chi siamo</strong>
              </p>
              <p>
                L’indirizzo del nostro sito web è: http://www.pavanvalentina.it.
              </p>
              <p>
                <strong>Quali dati personali raccogliamo e perché</strong>
              </p>
              <p>
                <strong>Commenti.</strong> Quando i visitatori lasciano
                commenti, raccogliamo i dati inseriti nel modulo, l’indirizzo IP
                e la stringa user agent del browser per il rilevamento dello
                spam. Una stringa anonimizzata (hash) dal tuo indirizzo email
                può essere inviata a Gravatar per verificare l’uso del servizio.
                La privacy policy di Gravatar è qui:
                https://automattic.com/privacy/. Dopo l’approvazione, la tua
                immagine profilo è visibile insieme al commento.
              </p>
              <p>
                <strong>Media.</strong> Se carichi immagini, evita file con dati
                di posizione (EXIF GPS), perché i visitatori possono estrarre
                tali dati.
              </p>
              <p>
                <strong>Modulo di contatto.</strong> Riceviamo solo l’email con
                i dati inseriti e un timestamp. Non inserire dati sensibili nel
                messaggio: condividili telefonicamente o in ambulatorio.
              </p>
              <p>
                <strong>Cookie.</strong> Se lasci un commento puoi salvare nome,
                email e sito in cookie per comodità (durata: 1 anno). Se hai un
                account, impostiamo un cookie temporaneo per verificare l’uso
                dei cookie (eliminato alla chiusura del browser). Al login
                creiamo cookie per credenziali (2 giorni) e preferenze schermo
                (1 anno). Con “Ricordami” il login dura 2 settimane. Uscendo, i
                cookie di login vengono rimossi. Se modifichi/pubblichi un
                articolo, un cookie aggiuntivo memorizza l’ID dell’articolo
                (scade dopo 1 giorno).
              </p>
              <p>
                <strong>Contenuti incorporati.</strong> I contenuti embedded
                (video, immagini, articoli) si comportano come se visitassi il
                sito di origine, che può raccogliere dati, usare cookie e
                tracciamenti di terze parti.
              </p>
              <p>
                <strong>Conservazione dei dati.</strong> Commenti e metadati
                sono conservati a tempo indeterminato per riconoscere e
                approvare commenti successivi. Per gli utenti registrati,
                memorizziamo i dati del profilo (modificabili, tranne lo
                username).
              </p>
              <p>
                <strong>Diritti sui tuoi dati.</strong> Se hai un account o hai
                lasciato commenti, puoi chiedere l’esportazione o la
                cancellazione dei tuoi dati personali, salvo obblighi di legge.
              </p>
              <p>
                <strong>Dove spediamo i dati.</strong> I commenti possono essere
                controllati da un servizio antispam automatico.
              </p>
              <p>
                <strong>Informativa completa e aggiornata</strong>
              </p>
              <p>
                INFORMATIVA E CONSENSO AL TRATTAMENTO DEI DATI PERSONALI E
                SENSIBILI — Regolamento UE 2016/679
              </p>
              <p>
                Studio Medico Dott. Pavan Valentina — sede a Pieve di Soligo
                (TV) in Via 25 aprile 7/a — tel: +39 3478990959 — mail:
                info@pavanvalentina.it
              </p>
              <p>
                <strong>Titolare del trattamento.</strong> Dott. Pavan
                Valentina, C.F. PVNVNT69E67H823N, tel. 00393478990959.
              </p>
              <p>
                <strong>Tipi di dati.</strong> Dati personali ex art. 4(1) e
                9(1) Regolamento (es. nome, cognome, telefono, email) e
                categorie particolari (dati relativi alla salute).
              </p>
              <p>
                <strong>Finalità e base giuridica.</strong> (a) Erogare i
                servizi richiesti (prestazioni, riscontri, prescrizioni,
                consulenze, attività amministrativo-contabili); (b) Assolvere
                obblighi di legge; (c) Comunicare i dati al medico curante
                (previo consenso). Il conferimento per (a) e (b) è facoltativo
                ma necessario per la prestazione; per (c) è facoltativo.
              </p>
              <p>
                <strong>Modalità.</strong> Trattamento con strumenti manuali,
                informatici e telematici idonei a garantire sicurezza e
                riservatezza.
              </p>
              <p>
                <strong>Destinatari.</strong> Persone autorizzate (medici
                sostituti, laboratori/odontotecnici, specialisti, farmacisti,
                strutture sanitarie, fiscalisti); soggetti/enti/autorità per
                obbligo di legge; medico curante (con consenso). Nessun
                trasferimento fuori dallo SEE.
              </p>
              <p>
                <strong>Conservazione.</strong> Per la finalità (a), per il
                tempo necessario all’esecuzione delle prestazioni e secondo gli
                obblighi di legge (es. art. 2946 c.c.). Per (b), per il tempo
                previsto dalla norma applicabile. Per (c), fino a revoca del
                consenso, salvo ulteriori obblighi di conservazione.
              </p>
              <p>
                <strong>Diritti.</strong> Accesso, rettifica, cancellazione,
                limitazione, opposizione, portabilità, revoca del consenso. Le
                richieste vanno inviate a info@pavanvalentina.it. Diritto di
                reclamo al Garante (art. 77 Regolamento).
              </p>
              <p>
                <strong>Consenso in ambulatorio.</strong> Al momento
                dell’accesso, verrà firmato un consenso in forma breve e
                concisa.
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              English Version
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Who we are.</strong> Our website address is
                http://www.pavanvalentina.it.
              </p>
              <p>
                <strong>What we collect and why.</strong> Comments: we collect
                the data shown in the form, plus IP and browser user agent for
                spam detection. An anonymized hash of your email may be sent to
                Gravatar (policy: https://automattic.com/privacy/). After
                approval, your profile image is public with your comment. Media:
                avoid uploading images with embedded location data (EXIF GPS).
                Contact form: we receive only the entered data and a
                timestamp—please avoid sensitive details; share them by phone or
                in person.
              </p>
              <p>
                <strong>Cookies.</strong> Comment convenience cookies last 1
                year. For logged-in users we set a temporary cookie to check
                cookie support (deleted on close). Login cookies last 2 days;
                screen preference cookies last 1 year; “Remember me” keeps login
                for 2 weeks. An extra cookie for edited posts stores the post ID
                (1 day).
              </p>
              <p>
                <strong>Embedded content.</strong> Third-party embeds may
                collect data, use cookies, and track you as if you visited their
                site.
              </p>
              <p>
                <strong>Retention.</strong> Comments and metadata are kept
                indefinitely to auto-approve future comments. Registered users’
                profile data is stored and can be edited/deleted (username
                excluded).
              </p>
              <p>
                <strong>Your rights.</strong> You may request export or erasure
                of your personal data (subject to legal obligations).
              </p>
              <p>
                <strong>Where data goes.</strong> Visitor comments may be
                checked via automated spam detection.
              </p>
              <p>
                <strong>Full notice.</strong> Data controller: Dr. Valentina
                Pavan, Via 25 aprile 7/a, 31053 Pieve di Soligo (TV), Italy, tel
                +39 3478990959, email info@pavanvalentina.it.
              </p>
              <p>
                <strong>Data types.</strong> Personal data (name, surname,
                phone, email) and special categories (health data).
              </p>
              <p>
                <strong>Purposes/legal basis.</strong> (a) Deliver requested
                services (medical care, prescriptions, consultations, admin/
                accounting); (b) Legal obligations; (c) Share data with your GP
                (with consent). Providing data for (a)/(b) is optional but
                necessary; (c) is optional.
              </p>
              <p>
                <strong>Methods.</strong> Manual/IT/telecom tools ensuring
                security and confidentiality.
              </p>
              <p>
                <strong>Recipients.</strong> Authorized staff (locum doctors,
                labs/technicians, specialists, pharmacists, hospitals/clinics,
                accountants); subjects required by law/regulation/orders; your
                GP (with consent). No transfers outside the EEA.
              </p>
              <p>
                <strong>Retention.</strong> For (a): for the duration needed to
                provide services and per legal limits (e.g., art. 2946 c.c.).
                For (b): per the specific legal obligation. For (c): until
                consent is withdrawn, subject to legal retention.
              </p>
              <p>
                <strong>Rights.</strong> Access, rectification, erasure,
                restriction, objection, portability, consent withdrawal.
                Requests: info@pavanvalentina.it. Right to complain to the Data
                Protection Authority.
              </p>
              <p>
                <strong>On-site consent.</strong> A concise consent form will be
                signed at the clinic before service delivery.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            By using our services, you acknowledge that you have read and
            understood this Privacy Policy.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
