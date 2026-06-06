import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "welcome to <underline>shay.cat</underline>!",
        description:
          "This is my website that I lovingly crafted by hand. You will find that is a common theme among my projects. Please enjoy your stay.",
        signature:
          "<bolder>-- shay</bolder>, owner, founder, sole proprietor, developer, accounting, marketing, research and development, social media, assistant director, public relations, client development, systems engineer, president, shay.cat.",
        summaries: {
          me: "Here are some links!",
          puckway:
            "Hockey bot for non-NHL leagues, including live game notifications, player info, and pickems. It was adopted on launch day foremost by the community PWHL Discord server, instantly amassing a large reach that has grown with the league.",
          discohook:
            "Since 2024, I have been the primary developer of Discohook, a powerful tool used by several thousand Discord servers. Users can design messages & interactive flows with completely custom branding.",
          statuspage:
            "Posts statuspage.io incidents and maintenance updates to Discord channels.",
          realtools:
            "A collection of user-focused tools for Horse Reality, an online horse genetics game. This project was recognized by the game's creators and had over 1,500 monthly active users before its deprecation.",
          fxgocomics:
            "FxTwitter-type worker for fixing GoComics embeds in Discord (and other compatible platforms). Makes paramount use of web scraping to deliver a public API for the underlying service.",
          bearger: "Free & easy-to-use bot for small communities.",
          "tabletop-hat":
            "A collection of popular, fun tabletop games in an easy-to-use Discord bot.",
          jerso: "Fun little hockey jersey spotting game",
          guilded:
            "Guilded was a chat platform operating as a competitor to Discord since around 2016. I was one of the first people (with my friend Chixel) to reverse engineer, document, and publish a client library based on its API. These efforts grew into Guilded's designed-for-bots API, which my guilded.py library transitioned to supporting exclusively. Following Roblox's decision to mandate a linked Roblox account to use the platform, many users abandoned it, leading to its ultimate demise in 2025.",
        },
        stars_one: "{{ count }} star",
        stars_other: "{{ count }} stars",
        starsMany: "{{ count }}+ stars!",
      },
    },
    ca: {
      translation: {
        welcome: "Benvinguts a <underline>shay.cat</underline>!",
        description:
          "Aquest és el meu lloc web que he creat a mà amb molt d'afecte. Veureu que és un tema comú entre els meus projectes. Gaudiu de la vostra estada.",
        signature:
          "<bolder>-- shay</bolder>, propietari, fundador, propietari únic, desenvolupador, comptabilitat, màrqueting, recerca i desenvolupament, xarxes socials, director adjunt, relacions públiques, desenvolupament de clients, enginyer de sistemes, president, shay.cat.",
        summaries: {
          me: "Aquí teniu alguns enllaços!",
          puckway:
            'Bot d\'hoquei per a lligues no NHL, amb notificacions de partits en directe, informació de jugadors i "pickems". El dia del llançament va ser adoptat principalment pel servidor de Discord de la comunitat PWHL, acumulant immediatament un gran abast que ha crescut amb la lliga.',
          discohook:
            "Des del 2024, sóc el desenvolupador principal de Discohook, una eina potent utilitzada per diversos milers de servidors de Discord. Els usuaris poden dissenyar missatges i fluxos interactius amb una imatge de marca completament personalitzada.",
          statuspage:
            "Publica incidents de statuspage.io i actualitzacions de manteniment als canals de Discord.",
          realtools:
            "Una col·lecció d'eines centrades en l'usuari per a Horse Reality, un joc en línia de genètica equina. Aquest projecte va ser reconegut pels creadors del joc i tenia més de 1.500 usuaris actius mensuals abans de la seva obsolescència.",
          fxgocomics:
            "Un worker tipus FxTwitter per a arreglar les incrustacions de GoComics a Discord (i altres plataformes compatibles). Fa un ús intensiu de raspatge web per a oferir una API pública per al servei subjacent.",
          bearger: "Bot gratuït i fàcil d'utilitzar per a petites comunitats.",
          "tabletop-hat":
            "Una col·lecció de jocs de taula populars i divertits en un bot de Discord fàcil d'utilitzar.",
          jerso: "Un petit joc divertit per detectar samarretes de hockey",
          guilded:
            "Guilded era una plataforma de xat que funcionava com a competidora de Discord des de l'any 2016 aproximadament. Vaig ser una de les primeres persones (juntament amb el meu amic Chixel) a fer enginyeria inversa, documentar i publicar una biblioteca de client basada en la seva API. Aquests esforços es van convertir en l'API de Guilded dissenyada per a bots, a la qual la meva biblioteca guilded.py va passar a donar suport exclusivament. Després de la decisió de Roblox d'exigir un compte de Roblox vinculat per utilitzar la plataforma, molts usuaris la van abandonar, cosa que va conduir a la seva desaparició definitiva el 2025.",
        },
        star: "estrella",
        stars_one: "{{ count }} estrella",
        stars_other: "{{ count }} estrelles",
        starsMany: "{{ count }}+ estrelles!",
        visit: "visita",
        email: "correu electrònic",
        donate: "donar",
        subscribe: "subscriu-te",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
