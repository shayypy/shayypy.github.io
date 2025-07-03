import { useCallback, useEffect, useMemo, useState } from "react";
// @ts-ignore
import DiscordLogoColor from "./Discord-Logo-Color.svg";
// @ts-ignore
import TwitterLogoColor from "./Twitter-Logo-Blue.svg";
import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
//import YouTubePlayer from 'youtube-player';
// @ts-ignore
//import { GameAbbreviation, tracks } from './music.ts';
//import { YouTubePlayer as YouTubePlayerT } from 'youtube-player/dist/types';
//import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

// todo
// - play acnh/ww music in background depending on time of day
//   - kk slider jukebox app for controlling playback/game to use soundtrack from
// - ACNH background image on bigger screens

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        summaries: {
          0: "This website is shay.cat, and I made it. Design is based on the Nook Phone interface from Animal Crossing: New Horizons",
          9: "Hockey bot for non-NHL leagues, including live game notifications, player info, and pickems",
          5: "Pollr tweeted a poll every day, but had to stop due to Twitter's API changes.",
          2: "Webhook message designer for Discord, plus a suite of tools for managing servers.",
          3: "Posts statuspage.io incidents and maintenance updates to Discord channels",
          8: "A collection of user-focused tools for Horse Reality, a web-based horse genetics game. This project was recognized by the game's creators and had over 1,500 monthly active users before its deprecation.",
          10: "FxTwitter-type worker for fixing GoComics embeds in Discord (and other compatible platforms)",
          1: "Free & easy-to-use bot with no arbitrary limitations",
          4: "A collection of fun tabletop games for the whole family",
          6: "Fun little hockey jersey spotting game 🏒",
        },
        released: "First released {{ date }}",
        since: "Since {{ year }}",
        sincePlatform: "Since {{ year }} on <icon/> <platform/>",
        defunct: "{{ year }} — {{ end }}",
        defunctPlatform: "{{ year }} — {{ end }} on <icon/> <platform/>",
      },
    },
    ca: {
      translation: {
        summaries: {
          0: "Aquest lloc web és shay.cat, i l'he fet jo. El disseny es basa en la interfície Nook Phone d'Animal Crossing: New Horizons",
          9: 'Bot d\'hoquei per a lligues que no són de la NHL, que inclou notificacions de partits en directe, informació dels jugadors i un joc automatitzat de "pickems".',
          5: "Pollr era un bot que tuitejava una enquesta cada dia, però es va aturar a causa dels canvis a l'API de Twitter.",
          2: "Dissenyador de missatges Webhook per a Discord, a més d'un conjunt d'eines per a la gestió de servidors.",
          3: "Publica incidents de statuspage.io i actualitzacions de manteniment als canals de Discord.",
          8: "Una col·lecció d'eines per a Horse Reality, un joc de genètica de cavalls basat en web. Aquest projecte va ser reconegut pels creadors del joc i tenia més de 1.500 usuaris actius mensuals abans de la seva obsolescència.",
          10: "Treballador similar a FxTwitter per arreglar incrustacions de GoComics a Discord (i altres plataformes compatibles)",
          1: "Bot gratuït i fàcil d'utilitzar sense limitacions arbitràries",
          4: "Una col·lecció de divertits jocs de taula i cartes per a tota la família",
          6: "Un divertit joc on l'objectiu és detectar samarretes de la NHL entre la multitud 🏒",
        },
        Links: "Visita",
        "You are here": "Tu estàs aquí",
        Email: "Correu electrònic",
        "Close App": "Tanca l'aplicació",
        Donate: "Donar",
        "Check it out!": "Fes-hi una ullada!",
        Subscribe: "Subscriu-te",
        released: "Publicat per primera vegada el {{ date }}",
        since: "Des del {{ year }}",
        sincePlatform: "Des del {{ year }} a <icon/> <platform/>",
        defunct: "{{ year }} — {{ end }}",
        defunctPlatform: "{{ year }} — {{ end }} a <icon/> <platform/>",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

interface ProjectApp {
  id: number;
  name: string;
  image: string;
  links?: { name?: string; url: string }[];
  type?: "discord" | "twitter" | "website";
  createdAt?: Date;
  defunctAt?: Date;
  themeColor?: string;
  themeTextColor?: string;
}

const typeSvgs: Record<string, string> = {
  discord: DiscordLogoColor,
  twitter: TwitterLogoColor,
};

const metaApps: ProjectApp[] = [
  {
    id: 0,
    name: "shay.cat",
    themeColor: "#eae6cd",
    themeTextColor: "#000",
    links: [
      { name: "You are here", url: "/" },
      { name: "GitHub", url: "https://github.com/shayypy/shayypy.github.io" },
      { name: "Email", url: "mailto:meow@shay.cat" },
      { name: "Discord", url: "discord://-/users/115238234778370049" },
    ],
    image: "/cats/hayches_catshay.png",
    type: "website",
    createdAt: new Date(2022, 2, 14),
  },
];

const apps: ProjectApp[] = [
  {
    id: 9,
    name: "Puckway",
    themeColor: "#412777",
    themeTextColor: "#fff",
    links: [
      { url: "https://puckway.shay.cat" },
      {
        name: "GitHub",
        url: "https://github.com/puckway/bot",
      },
    ],
    image: "https://puckway.shay.cat/logos/logo.svg",
    createdAt: new Date(2024, 0, 11),
    type: "discord",
  },
  {
    id: 2,
    name: "Discohook",
    themeColor: "#172025",
    themeTextColor: "#dff1ff",
    links: [
      { url: "https://discohook.app" },
      { name: "Subscribe", url: "https://discohook.app/donate" },
    ],
    image: "https://discohook.app/logos/discohook_padding.svg",
    type: "discord",
    createdAt: new Date(2020, 9, 12),
  },
  {
    id: 1,
    name: "bearger",
    themeColor: "#ffd89d",
    themeTextColor: "#9E5500",
    links: [{ url: "https://bearger.app" }],
    image: "https://bearger.app/i/the_boy.png",
    type: "discord",
    createdAt: new Date(2019, 6, 1),
  },
  {
    id: 3,
    name: "Statuspage",
    themeColor: "#fff",
    themeTextColor: "#000",
    links: [{ url: "https://sp.shay.cat" }],
    image:
      "https://cdn.discordapp.com/avatars/778802790843678740/ed61e86bf594afc4bebbddda231f2e1a.png?size=128",
    type: "discord",
    createdAt: new Date(2020, 10, 18),
  },
  {
    id: 8,
    name: "Realtools",
    links: [
      { url: "https://realtools.shay.cat" },
      { url: "https://github.com/hr-tools", name: "GitHub" },
    ],
    image: "/images/realtools.png",
    type: "website",
    createdAt: new Date(2021, 5, 7),
    defunctAt: new Date(2023, 1, 18),
  },
  {
    id: 4,
    name: "Tabletop Hat",
    themeColor: "#198fe4",
    themeTextColor: "#fff",
    links: [{ url: "https://tth.shay.cat" }],
    image:
      "https://cdn.discordapp.com/avatars/855292122017169420/937a52ca31fe88f21b9d436235a49e6c.png?size=128",
    type: "discord",
    createdAt: new Date(2021, 5, 17),
  },
  {
    id: 10,
    name: "FxGoComics",
    themeColor: "#2F46AB",
    themeTextColor: "#D8DFFD",
    links: [{ url: "https://www.fxgocomics.com" }],
    image: "https://www.fxgocomics.com/assets/fxgocomics-256w.png",
    type: "discord",
    createdAt: new Date(2025, 3, 7),
  },
  {
    id: 6,
    name: "jerso",
    themeColor: "#e2e8f0",
    themeTextColor: "#000",
    links: [{ url: "https://jerso.fun" }],
    image: "https://jerso.fun/images/jerso.png",
    type: "website",
    createdAt: new Date(2022, 5, 7),
  },
  {
    id: 5,
    name: "pollr",
    themeColor: "#000",
    themeTextColor: "#f91880",
    links: [
      { url: "https://pollr.shay.cat" },
      { name: "GitHub", url: "https://github.com/shayypy/pollr" },
    ],
    image: "/images/pollr.png",
    type: "twitter",
    createdAt: new Date(2022, 0, 31),
    defunctAt: new Date(2023, 5, 19),
  },
];

export default function App() {
  const { t } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang !== null) i18n.changeLanguage(lang);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setNow(new Date());
    }, 500);

    return () => clearInterval(i);
  }, []);

  const pages = useMemo<ProjectApp[][]>(() => {
    // https://stackoverflow.com/a/11318797
    const apps_ = [...metaApps, ...apps];
    const result: ProjectApp[][] = [];
    while (apps_.length > 0) {
      result.push(apps_.splice(0, 9));
    }
    return result;
  }, []);

  const queryAppId = new URLSearchParams(window.location.search).get("app");

  const [page, setPage] = useState(0);
  const [hoveredApp, setHoveredApp_] = useState<ProjectApp | undefined>(
    pages[page][0],
  );
  const [selectedApp, setSelectedApp_] = useState<ProjectApp | undefined>(
    queryAppId || window.innerWidth >= 640
      ? [...metaApps, ...apps].find(
          (a) => a.id === Number.parseInt(queryAppId ?? "0"),
        )
      : undefined,
  );
  const [matrixPos, setMatrixPos_] = useState<[number, number]>([0, 0]);

  const setHoveredApp = useCallback(
    (value: ProjectApp | undefined) => {
      if (value) {
        const pageWithApp = pages.find((p) =>
          p.map((a) => a.id).includes(value.id),
        );
        if (pageWithApp) {
          const index = pages.indexOf(pageWithApp);
          setPage(index);
          scrollToPage(index);
        }
      }
      setHoveredApp_(value);
    },
    [pages],
  );

  const setSelectedApp = useCallback((value: ProjectApp | undefined) => {
    setSelectedApp_(undefined); // Trigger closing animation regardless of new value
    setTimeout(() => setSelectedApp_(value), 50);
  }, []);

  const setMatrixPos = useCallback((value: [number, number]) => {
    const [row, col] = value;
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      setMatrixPos_(value);
    }
  }, []);

  // Navigate phone UI with arrow keys + enter
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const [row, column] = matrixPos;

      const getAppAt = (r: number, c: number, pageIndex?: number) => {
        const app =
          pages[pageIndex ?? page][Math.max(r, 0) * 3 + Math.max(c, 0)];
        console.log(r, c, app?.id);
        return app;
      };

      const code = e.code;
      console.log("current", row, column, code);
      switch (code) {
        case "KeyW":
        case "ArrowUp": {
          const app = getAppAt(row - 1, column);
          if (app) {
            setHoveredApp(app);
            setMatrixPos([row - 1, column]);
          }
          break;
        }
        case "KeyS":
        case "ArrowDown": {
          const app = getAppAt(row + 1, column);
          if (app) {
            setHoveredApp(app);
            setMatrixPos([row + 1, column]);
          }
          break;
        }
        case "KeyA":
        case "ArrowLeft":
          if (column === 0 && page > 0) {
            const app = getAppAt(0, 2, page - 1);
            if (app) {
              setHoveredApp(app);
              setMatrixPos([0, 2]);
            }
          } else {
            const app = getAppAt(row, column - 1);
            if (app) {
              setHoveredApp(app);
              setMatrixPos([row, column - 1]);
            }
          }
          break;
        case "KeyD":
        case "ArrowRight":
          if (column === 2 && page < pages.length - 1) {
            const app = getAppAt(0, 0, page + 1);
            if (app) {
              setHoveredApp(app);
              setMatrixPos([0, 0]);
            }
          } else {
            const app = getAppAt(row, column + 1);
            if (app) {
              setHoveredApp(app);
              setMatrixPos([row, column + 1]);
            }
          }
          break;
        case "Space":
        case "Enter":
          if (selectedApp?.id === hoveredApp?.id) setSelectedApp(undefined);
          else setSelectedApp(hoveredApp);
          break;
        case "Escape":
          setSelectedApp(undefined);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    page,
    pages,
    hoveredApp,
    setHoveredApp,
    selectedApp,
    setSelectedApp,
    matrixPos,
    setMatrixPos,
  ]);

  const scrollToPage = (num: number) => {
    const element = document.querySelector(`#page-${num}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-ac-beige h-screen pt-8 sm:bg-inherit sm:p-12 sm:flex">
      <div className="absolute -top-5 -left-5 w-0 h-0" id="player" />
      <div className="w-80 m-auto sm:mx-0 sm:w-72 sm:min-w-[18rem] rounded-[3.5rem] bg-ac-beige select-none px-8 pt-7 pb-12 h-fit">
        <div className="flex text-ac-beige-dark">
          <div className="grid grid-cols-3 grid-rows-3 mr-auto">
            <div />
            <div />
            <SignalHump />
            <div />
            <SignalHump />
            <SignalHump />
            <SignalHump />
            <SignalHump />
            <SignalHump />
          </div>
          {/* Cat icon */}
          <p className="mx-auto font-semibold tracking-wider">
            {now.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <button
            type="button"
            className="ml-auto self-center opacity-60 hover:opacity-100 transition"
            onClick={() => {
              const code = i18n.language === "en" ? "ca" : "en";
              i18n.changeLanguage(code);
              localStorage.setItem("lang", code);
            }}
          >
            <img
              src={`/icons/flag-${i18n.language === "en" ? "us" : "ca"}.svg`}
              className="object-cover object-left rounded h-5 w-7"
              alt=""
            />
          </button>
        </div>
        <div className="my-4 font-bold text-center text-2xl">
          {hoveredApp?.name ?? "Shay Phone"}
        </div>
        <div className="overflow-x-hidden flex max-w-[20rem] sm:max-w-[18rem]">
          {pages.map((p, i) => {
            return (
              <div key={i} id={`page-${i}`} className="min-w-[14rem]">
                <div className="grid grid-cols-3 grid-rows-3 gap-4 my-2 mx-4">
                  {p.map((app) => (
                    <AppIcon
                      key={app.id}
                      app={app}
                      hoverState={[hoveredApp, setHoveredApp]}
                      selectState={[selectedApp, setSelectedApp]}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {pages.length > 1 && (
          <div className="mt-6 -mb-4 w-full flex">
            <div className="mx-auto flex space-x-2">
              {pages.map((_, i) => (
                <button
                  type="button"
                  key={`page-${i}`}
                  onClick={() => {
                    scrollToPage(i);
                    setHoveredApp(pages[i][0]);
                  }}
                  className={`rounded-full bg-ac-beige-dark w-2 h-2 transition-all outline ${
                    page === i
                      ? "outline-4 outline-offset-1 outline-teal-500"
                      : "outline-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className={`absolute top-0 left-0 sm:relative sm:ml-12 bg-ac-beige h-full w-full sm:w-auto sm:grow ${
          selectedApp
            ? "scale-100 rounded-[3.5rem] brightness-100"
            : "scale-0 rounded-[8rem] brightness-90"
        } transition-all`}
      >
        <div className="relative h-full">
          {selectedApp && (
            <div className="p-12 overflow-y-auto overflow-x-hidden">
              <div className="flex">
                <div>
                  <p className="font-black text-4xl">{selectedApp.name}</p>
                  {selectedApp.createdAt && (
                    <div
                      className="opacity-80 text-lg font-medium"
                      title={t("released", {
                        replace: {
                          date: selectedApp.createdAt.toLocaleDateString(),
                        },
                      })}
                    >
                      <Trans
                        i18nKey={
                          selectedApp.type && typeSvgs[selectedApp.type]
                            ? selectedApp.defunctAt
                              ? "defunctPlatform"
                              : "sincePlatform"
                            : selectedApp.defunctAt
                              ? "defunct"
                              : "since"
                        }
                        values={{
                          year: selectedApp.createdAt.getFullYear(),
                          end: selectedApp.defunctAt?.getFullYear(),
                        }}
                        components={{
                          icon: selectedApp.type ? (
                            <img
                              src={typeSvgs[selectedApp.type]}
                              className="w-6 h-6 inline"
                              alt={selectedApp.type}
                            />
                          ) : (
                            <></>
                          ),
                          platform: (
                            <span className="capitalize">
                              {selectedApp.type}
                            </span>
                          ),
                        }}
                      />
                    </div>
                  )}
                </div>
                <img
                  className="rounded-3xl w-16 h-16 ml-auto sm:hidden md:block"
                  src={selectedApp.image}
                  alt={selectedApp.name}
                />
              </div>
              <hr className="my-4 border border-ac-beige-dark" />
              <p>{t(`summaries.${selectedApp.id}`)}</p>
              {selectedApp.links && (
                <>
                  <hr className="my-4 border border-ac-beige-dark" />
                  <p className="font-black text-2xl">{t("Links")}</p>
                  <ul>
                    {[
                      ...selectedApp.links.map((link) => ({
                        ...link,
                        name: link.name ? t(link.name) : undefined,
                      })),
                      { name: t("Donate"), url: "https://pay.shay.cat" },
                    ].map((link) => (
                      <li key={link.url}>
                        <a href={link.url} className="text-teal-600 group">
                          &#x1f517;{" "}
                          <span
                            className={`group-hover:italic group-hover:after:content-['_~'] group-hover:before:content-['~_']`}
                          >
                            {link.name ?? t("Check it out!")}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          <div className="absolute bottom-0 flex w-full p-8 bg-ac-beige-dark/10 border-t-2 border-t-ac-beige-dark rounded-b-[3.5rem]">
            <button
              type="button"
              className="rounded-full flex mx-auto border-2 border-t-4 hover:bg-ac-beige-dark/30 transition-colors border-ac-beige-dark w-12 h-12"
              onClick={() => setSelectedApp(undefined)}
              title={t("Close App")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const SignalHump = () => (
  <div className="w-3 h-2 ml-0.5 mb-0.5 relative">
    <div className="absolute bg-ac-beige w-full h-2 -bottom-[5px] left-0" />
    <div className="border-4 border-ac-beige-dark rounded-full h-3 w-3" />
  </div>
);

const AppIcon = ({
  app,
  hoverState,
  selectState,
}: {
  app: ProjectApp;
  hoverState: [ProjectApp | undefined, (value: ProjectApp | undefined) => void];
  selectState: [
    ProjectApp | undefined,
    (value: ProjectApp | undefined) => void,
  ];
}) => {
  const [hoveredApp, setHoveredApp] = hoverState;
  const [selectedApp, setSelectedApp] = selectState;

  return (
    <button
      type="button"
      className={`block h-auto rounded-3xl transition-all outline outline-2 outline-offset-[1.5px] cursor-ac ${
        selectedApp?.id === app.id
          ? "scale-110 outline-teal-500"
          : hoveredApp?.id === app.id
            ? "scale-110 outline-teal-500"
            : "outline-transparent"
      }`}
      onMouseOver={() => setHoveredApp(app)}
      onFocus={() => setHoveredApp(app)}
      onClick={() =>
        selectedApp?.id === app.id
          ? setSelectedApp(undefined)
          : setSelectedApp(app)
      }
      // Prevent accessibility features from doubling the custom Space/Enter handler we have above
      // It might be preferable to navigate the grid with accessibility shortcuts instead of using a custom implementation
      onKeyDown={(e) => e.preventDefault()}
    >
      <img
        className="rounded-3xl aspect-square"
        src={app.image}
        alt={app.name}
      />
    </button>
  );
};
