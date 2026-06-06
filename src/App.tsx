import i18n, { type TFunction } from "i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import "./i18n.ts";

//import YouTubePlayer from 'youtube-player';
//import { GameAbbreviation, tracks } from './music.ts';
//import { YouTubePlayer as YouTubePlayerT } from 'youtube-player/dist/types';
//import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

// todo
// - play acnh/ww music in background depending on time of day
//   - kk slider jukebox app for controlling playback/game to use soundtrack from
// - ACNH background image on bigger screens

const Project = ({
  t,
  id,
  name,
  imageUrl,
  imageClassName,
  github,
  onlineAt,
  offlineAt,
  children,
}: React.PropsWithChildren<{
  t: TFunction;
  id: string;
  name: React.ReactNode;
  imageUrl: string;
  imageClassName?: string;
  github?: {
    stars?: number;
    url: string;
    glowing?: boolean;
  };
  onlineAt: Date;
  offlineAt?: Date;
}>) => {
  const initialFragment = useMemo(() => {
    try {
      return location.hash.replace(/^#/, "") || null;
    } catch {}
    return null;
  }, []);

  const [open, setOpen] = useState(initialFragment === id);
  useEffect(() => {
    if (open) {
      history.replaceState({}, "", `#${id}`);
    } else {
      // don't overwrite due to race condition
      setTimeout(() => {
        if (location.hash && location.hash !== `#${id}`) return;
        history.replaceState({}, "", location.pathname);
      }, 100);
    }
  }, [open, id]);

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  useEffect(() => {
    const callback = () => {
      if (open) {
        setPanelHeight(panelRef.current?.clientHeight ?? 0);
      } else {
        setTimeout(() => {
          setPanelHeight(0);
        }, 150);
      }
    };
    callback();
    addEventListener("resize", callback);
    return () => removeEventListener("resize", callback);
  }, [open]);

  return (
    <div className="flex gap-1 items-start" id={id}>
      <div className="shrink-0 flex flex-col gap-y-1 items-center">
        <button
          type="button"
          className={twMerge(
            "bg-emerald-700 border-2 border-emerald-950 border-t-emerald-800 border-l-emerald-800 cursor-pointer",
            imageClassName,
          )}
          onClick={() => setOpen((v) => !v)}
        >
          <img src={imageUrl} className="w-8" alt="" />
        </button>
        <div
          className={twMerge(
            "transition=[translate,opacity] duration-150 delay-150",
            open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
          )}
        >
          <img
            src="/softbank/pointing-right.gif"
            className={twMerge(
              "w-6 transition-[height] duration-150",
              open ? "h-6" : "h-0",
            )}
            alt=""
          />
        </div>
      </div>
      <div
        className={twMerge(
          "bg-emerald-500 border-2 border-emerald-700 border-t-emerald-400 border-l-emerald-400 relative grow",
        )}
      >
        <div
          className={twMerge(
            "flex transition-[padding] duration-150",
            open ? "pt-4 px-4 items-start" : "py-0.5 ps-4 pe-1 items-center",
          )}
        >
          <button
            type="button"
            className="grow h-full text-start cursor-pointer break-normal wrap-anywhere"
            onClick={() => setOpen((v) => !v)}
          >
            <p className="font-mono font-semibold text-lg">{name}</p>
          </button>
          <div className="ms-auto ps-0.5 flex gap-0.5 shrink-0">
            {offlineAt ? (
              <Badge
                icon="sunset"
                label={`${onlineAt.getFullYear()}-${offlineAt.getFullYear()}`}
              />
            ) : (
              <Badge
                icon="birthday-cake"
                label={`${onlineAt.getFullYear()}`}
                className="bg-pink-600"
                iconClassName="bg-pink-800"
              />
            )}
            {github?.stars ? (
              <StarsBadge
                t={t}
                url={github.url}
                stars={github.stars}
                glowing={github.glowing}
              />
            ) : github ? (
              <Badge
                url={github.url}
                className="bg-emerald-600"
                iconClassName="bg-emerald-700"
                label={t("star")}
                icon={github.glowing ? "star-glowing" : "star"}
              />
            ) : null}
          </div>
        </div>
        <div
          style={{
            maxHeight: open ? `${panelHeight}px` : "0px",
          }}
          className="transition-[max-height] duration-150 overflow-hidden"
        >
          <div ref={panelRef} className="p-4 pt-0">
            <p className="mt-1">
              <Trans t={t} i18nKey={`summaries.${id}`} />
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({
  url,
  newTab,
  label,
  className,
  icon,
  iconClassName,
  imgClassName,
}: {
  url?: string;
  newTab?: boolean;
  label: string;
  className?: string;
  icon: string;
  iconClassName?: string;
  imgClassName?: string;
}) => (
  <a
    href={url}
    target={newTab ? "_blank" : "_self"}
    className={twMerge(
      "flex items-center gap-1 bg-neutral-600 w-fit",
      className,
    )}
  >
    <div className={twMerge("bg-neutral-700 h-full p-1", iconClassName)}>
      <img
        src={icon.startsWith("/") ? icon : `/softbank/${icon}.gif`}
        className={twMerge("size-4", imgClassName)}
        alt=""
      />
    </div>
    <div className="ps-1 pe-1.5">
      <p className="text-xs font-mono">{label}</p>
    </div>
  </a>
);

const StarsBadge = ({
  t,
  url,
  stars,
  glowing,
  className,
}: {
  t: TFunction;
  url: string;
  stars: number;
  glowing?: boolean;
  className?: string;
}) => (
  <Badge
    url={url}
    className={twMerge("bg-emerald-600", className)}
    icon={glowing ? "glowing-star" : "star"}
    iconClassName="bg-emerald-700"
    label={t(glowing ? "starsMany" : "stars", { count: stars })}
  />
);

const SiteBadge = ({
  t,
  url,
  label,
  className,
}: {
  t: TFunction;
  url: string;
  label?: string;
  className?: string;
}) => (
  <Badge
    url={url}
    className={twMerge("bg-sky-600", className)}
    icon="fax-machine"
    iconClassName="bg-sky-700"
    label={label ?? t("visit")}
  />
);

const DonateBadge = ({
  t,
  url,
  label,
  className,
}: {
  t: TFunction;
  url: string;
  label?: string;
  className?: string;
}) => (
  <Badge
    url={url}
    className={twMerge("bg-green-600", className)}
    icon="money-bag"
    iconClassName="bg-green-700"
    label={label ?? t("donate")}
  />
);

export default function App() {
  const { t } = useTranslation();

  i18n.on("languageChanged", (lang) => {
    document.documentElement.lang = lang;
  });

  const [pathLang, setPathLang] = useState<string>();
  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === "/ca") {
      i18n.changeLanguage("ca");
      setPathLang("ca");
    } else {
      const lang = localStorage.getItem("lang");
      if (lang !== null) i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <div className="relative h-screen max-w-7xl mx-auto">
      <div className="p-4 pb-8 overflow-y-auto">
        <div className="flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-2">
          <div className="max-w-full lg:max-w-1/2 lg:grow">
            <div
              id="welcome"
              className="p-4 bg-emerald-500 border-2 border-emerald-700 border-t-emerald-400 border-l-emerald-400 truncate"
            >
              <div className="text-xl font-mono whitespace-pre-wrap">
                <img
                  src="/softbank/wave.gif"
                  className="inline-block size-10"
                  alt="animated waving hand emoji"
                />{" "}
                <p className="inline align-middle">
                  <Trans
                    t={t}
                    i18nKey="welcome"
                    components={{
                      underline: (
                        <span className="underline hover:no-underline underline-offset-2 decoration-2" />
                      ),
                    }}
                  />
                </p>
              </div>
              <p className="mt-2 whitespace-pre-wrap">{t("description")}</p>
              <div className="mt-2 truncate">
                <p className="text-sm opacity-90 truncate">
                  <Trans
                    t={t}
                    i18nKey="signature"
                    components={{ bolder: <span className="font-medium" /> }}
                  />
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1 text-xs">
              <div className="flex items-center gap-1.5 mr-0.5 px-1.5 h-9 bg-emerald-500 border-2 border-emerald-700/20 box-border">
                <button
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage("en");
                    localStorage.setItem("lang", "en");
                    if (pathLang !== undefined) {
                      window.location.pathname = "/";
                    }
                  }}
                  className="cursor-pointer contents"
                >
                  <img
                    src="/softbank/flag-usa.gif"
                    className="h-7"
                    alt="Flag of the United States"
                    title="English Version"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage("ca");
                    localStorage.setItem("lang", "ca");
                  }}
                  className="cursor-pointer contents"
                >
                  <img
                    src="/softbank/flag-catalonia.gif"
                    className="h-7"
                    alt="Flag of Catalonia"
                    title="Versió Català"
                  />
                </button>
              </div>
              <img
                src="/images/catstuff-wasted.gif"
                className="h-9 hover:h-16 transition-[height] delay-100 hover:delay-[0ms] duration-300"
                alt={
                  'Web badge with a calico cat on the left and text on the right. The text reads "No time spent with a cat is wasted."'
                }
              />
              <a
                href="https://user.xmission.com/~emailbox/catstuff.htm"
                className="contents"
              >
                <img
                  src="/images/catstuff.gif"
                  className="h-9 hover:h-16 transition-[height] delay-100 hover:delay-[0ms] duration-300"
                  alt="Web badge attributing CatStuff by Glenda Moore for the previous badge"
                />
              </a>
              <a
                href="https://emojipedia.org/softbank/2008"
                className={twMerge(
                  "h-9 w-26 hover:scale-[177.78%] transition-transform origin-top-left delay-100 hover:delay-[0ms] duration-300",
                  "bg-sky-200 text-black border border-black p-0.5",
                )}
              >
                <div className="border border-t-sky-50/90 border-l-sky-50/90 border-b-sky-900/80 border-r-sky-900/80 flex items-center">
                  <img
                    src="/softbank/office-building.gif"
                    className="h-7 ms-0.5 me-0.5"
                    alt=""
                  />
                  <div className="pt-0.5">
                    <p className="text-[0.6rem] leading-none">Icons by</p>
                    <p className="text-[0.8rem] font-bold leading-none">
                      SoftBank
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="max-w-full lg:max-w-1/2 lg:grow flex flex-col gap-y-2">
            <Project
              t={t}
              id="discohook"
              name="Discohook"
              imageUrl="/images/discohook.svg"
              github={{
                url: "https://github.com/discohook/discohook",
                stars: 160,
                glowing: true,
              }}
              imageClassName="bg-[#1B2126]"
              onlineAt={new Date(2020, 9, 12)}
            >
              <SiteBadge t={t} url="https://discohook.app" />
              <DonateBadge
                t={t}
                url="https://discohook.app/donate"
                label={t("subscribe")}
              />
            </Project>
            <Project
              t={t}
              id="puckway"
              name="Puckway"
              imageUrl="/images/puckway.svg"
              github={{ url: "https://github.com/puckway/bot" }}
              onlineAt={new Date(2024, 0, 11)}
            >
              <SiteBadge t={t} url="https://puckway.shay.cat" />
            </Project>
            <Project
              t={t}
              id="bearger"
              name="Bearger"
              imageUrl="/images/bearger.png"
              onlineAt={new Date(2019, 6, 1)}
            >
              <SiteBadge t={t} url="https://bearger.app" />
            </Project>
            <Project
              t={t}
              id="realtools"
              name="Realtools"
              imageUrl="/images/realtools.png"
              // github={{ url: "https://github.com/hr-tools" }}
              onlineAt={new Date(2021, 5, 7)}
              offlineAt={new Date(2023, 1, 18)}
            >
              <SiteBadge t={t} url="https://github.com/hr-tools" />
            </Project>
            <Project
              t={t}
              id="statuspage"
              name="Statuspage"
              imageUrl="/images/statuspage.png"
              onlineAt={new Date(2020, 10, 10)}
            >
              <SiteBadge t={t} url="https://sp.shay.cat" />
            </Project>
            <Project
              t={t}
              id="tabletop-hat"
              name="Tabletop Hat"
              imageUrl="/images/tabletop-hat.png"
              onlineAt={new Date(2021, 5, 17)}
            >
              <SiteBadge t={t} url="https://tth.shay.cat" />
            </Project>
            <Project
              t={t}
              id="jerso"
              name="Jerso"
              imageUrl="/images/jerso.png"
              onlineAt={new Date(2022, 5, 7)}
              imageClassName="rounded-full"
            >
              <SiteBadge t={t} url="https://jerso.fun" />
            </Project>
            <Project
              t={t}
              id="fxgocomics"
              name="FxGoComics"
              imageUrl="/images/fxgocomics.png"
              github={{ url: "https://github.com/shayypy/fxgocomics" }}
              onlineAt={new Date(2025, 3, 7)}
              imageClassName="bg-[#2747b2]"
            >
              <div>
                <img
                  src="/images/fxgocomics-example.png"
                  className="block w-full border-2 border-black"
                  alt="fxgocomics example"
                />
                <SiteBadge
                  t={t}
                  url="https://github.com/shayypy/fxgocomics#api"
                  label="API"
                  className="mt-2"
                />
              </div>
            </Project>
            <Project
              t={t}
              id="guilded"
              name={
                <>
                  guilded.py
                  <span className="hidden sm:inline"> & Guilded API</span>
                </>
              }
              imageUrl="/images/guildedpy.png"
              github={{
                stars: 130,
                url: "https://github.com/shayypy/guilded.py",
              }}
              onlineAt={new Date(2020, 6, 28)}
              offlineAt={new Date(2025, 8, 29)}
            >
              <SiteBadge
                t={t}
                url="https://github.com/GuildedAPI/docs"
                label="community docs"
              />
              <SiteBadge
                t={t}
                url="https://nico.engineer/blog/goodbye-guilded"
                label="nico's writeup"
              />
            </Project>
            <Project
              t={t}
              id="me"
              name="shay.cat"
              imageUrl="/softbank/eyes.gif"
              github={{ url: "https://github.com/shayypy/shayypy.github.io" }}
              onlineAt={new Date(2021, 2, 14)}
            >
              <Badge
                url={`mailto:meow@${location.host}`}
                label={t("email")}
                icon="postbox"
                className="bg-sky-600"
                iconClassName="bg-sky-700"
              />
              <DonateBadge t={t} url="https://ko-fi.com/shayypy" />
            </Project>
          </div>
        </div>
      </div>
    </div>
  );
}
