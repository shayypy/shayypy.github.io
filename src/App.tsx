import { useCallback, useEffect, useMemo, useState } from 'react';
import DiscordLogoColor from './Discord-Logo-Color.svg';
import TwitterLogoColor from './Twitter-Logo-Blue.svg';
import DiscordLogoWhite from './Discord-Logo-White.svg';
import React from 'react';

// todo
// - play acnh/ww music (from youtube?) in background depending on time of day
//   - jukebox app?
// - ACNH background image on bigger screens

interface ProjectApp {
  id: number;
  name: string;
  image: string;
  summary?: string;
  links?: { name?: string; url: string }[];
  type?: 'discord' | 'twitter' | 'website';
  svg?: string;
  createdAt?: Date;
  defunctAt?: Date;
  themeColor?: string;
  themeTextColor?: string;
}

const metaApps: ProjectApp[] = [
  {
    id: 0,
    name: 'shay.cat',
    summary: 'This website is shay.cat, and I made it. Design is based on the Nook Phone interface from Animal Crossing: New Horizons',
    themeColor: '#eae6cd',
    themeTextColor: '#000',
    links: [
      { name: 'You are here', url: '/' },
      { name: 'GitHub', url: 'https://github.com/shayypy/shayypy.github.io' },
      { name: 'Email', url: 'mailto:meow@shay.cat' },
      { name: 'Discord', url: 'discord://-/users/115238234778370049' }
    ],
    image: '/cats/hayches_catshay.png',
    type: 'website',
    createdAt: new Date(2022, 2, 14),
  },
  {
    id: -1,
    name: 'test1',
    image: '/cats/hayches_catshay.png',
  },
  {
    id: -2,
    name: 'test2',
    image: '/cats/hayches_catshay.png',
  }
];

const apps: ProjectApp[] = [
  {
    id: 1,
    name: 'bearger',
    summary: 'Free & easy-to-use Discord bot with no arbitrary limitations',
    themeColor: '#ffd89d',
    themeTextColor: '#9E5500',
    links: [{ url: 'https://bearger.app'}],
    image: 'https://bearger.app/i/the_boy.png',
    type: 'discord',
    svg: DiscordLogoColor,
    createdAt: new Date(2019, 6, 1),
  },
  {
    id: 2,
    name: 'Discohook Utils',
    summary: 'Suite of utilities for discohook.app',
    themeColor: '#172025',
    themeTextColor: '#dff1ff',
    links: [{ url: 'https://dutils.shay.cat'}],
    image: 'https://cdn.discordapp.com/avatars/792842038332358656/da056550fd65a4d7e4636cb1707ca801.png?size=128',
    type: 'discord',
    svg: DiscordLogoWhite,
    createdAt: new Date(2020, 9, 12),
  },
  {
    id: 3,
    name: 'Statuspage',
    summary: 'Posts statuspage.io incidents and maintenance updates to Discord channels',
    themeColor: '#fff',
    themeTextColor: '#000',
    links: [{ url: 'https://sp.shay.cat'}],
    image: 'https://cdn.discordapp.com/avatars/778802790843678740/ed61e86bf594afc4bebbddda231f2e1a.png?size=128',
    type: 'discord',
    svg: DiscordLogoColor,
    createdAt: new Date(2020, 10, 18),
  },
  {
    id: 4,
    name: 'Tabletop Hat',
    summary: 'A collection of fun tabletop games for the whole family',
    themeColor: '#198fe4',
    themeTextColor: '#fff',
    links: [{ url: 'https://tth.shay.cat'}],
    image: 'https://cdn.discordapp.com/avatars/855292122017169420/937a52ca31fe88f21b9d436235a49e6c.png?size=128',
    type: 'discord',
    svg: DiscordLogoWhite,
    createdAt: new Date(2021, 5, 17),
  },
  {
    id: 5,
    name: 'pollr',
    summary: 'Pollr tweets a poll every day. Follow for polls',
    themeColor: '#000',
    themeTextColor: '#f91880',
    links: [{ url: 'https://pollr.shay.cat' }, { name: 'GitHub', url: 'https://github.com/shayypy/pollr' }],
    image: '/images/pollr.png',
    type: 'twitter',
    svg: TwitterLogoColor,
    createdAt: new Date(2022, 0, 31),
  },
  {
    id: 6,
    name: 'jerso',
    summary: 'Fun little hockey jersey spotting game 🏒',
    themeColor: '#e2e8f0',
    themeTextColor: '#000',
    links: [{ url: 'https://jerso.fun' }],
    image: 'https://jerso.fun/images/jerso.png',
    type: 'website',
    createdAt: new Date(2022, 5, 7),
  },
  {
    id: 7,
    name: 'NHL Scorebug',
    summary: 'A self-hosted scorebug for NHL games 🏒 (goals + shots), intended for display on a dedicated ~4" screen. Also features an in-app player browser for active games',
    themeColor: '#ccfbf1',
    themeTextColor: '#000',
    links: [{name: 'GitHub (screenshots!)', url: 'https://github.com/shayypy/nhl-scorebug'}],
    image: '/images/scorebug-sm.png',
    createdAt: new Date(2022, 10, 5),
  },
];

export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => {
      setNow(new Date());
    }, 50);

    return () => clearInterval(i);
  }, [])

  const pages = useMemo<ProjectApp[][]>(() => {
    // https://stackoverflow.com/a/11318797
    const apps_ = [
      ...metaApps,
      ...apps,
    ];
    const result: ProjectApp[][] = [];
    while (apps_.length > 0) {
      result.push(apps_.splice(0, 9));
    }
    return result;
  }, []);

  const [page, setPage] = useState(0);
  const [hoveredApp, setHoveredApp_] = useState<ProjectApp | undefined>(pages[page][0]);
  const [selectedApp, setSelectedApp] = useState<ProjectApp | undefined>(undefined);

  const setHoveredApp = useCallback(
    (value: ProjectApp | undefined) => {
      if (value) {
        const pageWithApp = pages.find((p) => p.map((a) => a.id).includes(value.id))
        if (pageWithApp) {
          const index = pages.indexOf(pageWithApp)
          setPage(index);
          scrollToPage(index);
        };
      }
      setHoveredApp_(value);
    },
    [pages]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const pageIds = pages[page].map((app) => app.id);
      const indexOnPage = hoveredApp ? pageIds.indexOf(hoveredApp.id) : -1;
      const row = Math.max(Math.ceil(indexOnPage / 3) - 1, 0);
      const column = indexOnPage % 3;

      const getAppAt = (r: number, c: number, pageIndex?: number) => {
        const app = pages[pageIndex ?? page][(Math.max(r, 0) * 3) + Math.max(c, 0)]
        return app;
      }

      const code = e.code;
      switch (code) {
        case 'KeyW':
        case 'ArrowUp': {
          const app = getAppAt(row - 1, column);
          if (app) setHoveredApp(app);
          break;
        }
        case 'KeyS':
        case 'ArrowDown': {
          const app = getAppAt(row + 1, column);
          if (app) setHoveredApp(app);
          break;
        }
        case 'KeyA':
        case 'ArrowLeft':
          if (column === 0 && page > 0) {
            const app = getAppAt(row, 2, page - 1) ?? getAppAt(1, 2, page - 1) ?? getAppAt(0, 2, page - 1);
            if (app) setHoveredApp(app);
          } else {
            const app = getAppAt(row, column - 1);
            if (app) setHoveredApp(app);
          }
          break;
        case 'KeyD':
        case 'ArrowRight':
          if (column === 2 && page < pages.length - 1) {
            const app = getAppAt(row, 0, page + 1) ?? getAppAt(1, 0, page + 1) ?? getAppAt(0, 0, page + 1);
            if (app) setHoveredApp(app);
          } else {
            const app = getAppAt(row, column + 1);
            if (app) setHoveredApp(app);
          }
          break;
        case 'Space':
        case 'Enter':
          setSelectedApp(hoveredApp)
          break;
        case 'Escape':
          setSelectedApp(undefined);
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [page, pages, hoveredApp, setHoveredApp, selectedApp])

  const scrollToPage = (num: number) => {
    const element = document.querySelector(`#page-${num}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='bg-ac-beige h-screen pt-8 sm:bg-inherit sm:p-12 sm:flex'>
      <div className='w-80 m-auto sm:mx-0 sm:w-72 sm:min-w-[18rem] rounded-[3.5rem] bg-ac-beige select-none px-8 pt-7 pb-12 h-fit'>
        <div className='flex text-ac-beige-dark'>
          <div className='grid grid-cols-3 grid-rows-3 mr-auto'>
            <div /><div /><SignalHump />
            <div /><SignalHump /><SignalHump />
            <SignalHump /><SignalHump /><SignalHump />
          </div>
          {/* Cat icon */}
          <p className='mx-auto font-semibold tracking-wider'>{now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</p>
          <div className='ml-auto w-4'></div>
        </div>
        <div className='my-4 font-bold text-center text-2xl'>
          {hoveredApp?.name ?? 'Shay Phone'}
        </div>
        <div className='overflow-x-hidden flex max-w-[20rem] sm:max-w-[18rem]'>
          {pages.map((p, i) => {
            return (
              <div
                key={i}
                id={`page-${i}`}
                className='min-w-[14rem]'
              >
                <div className='grid grid-cols-3 grid-rows-3 gap-4 my-2 mx-4'>
                  {p.map((app) => {
                    return (
                      <AppIcon
                        key={app.id}
                        app={app}
                        hoverState={[hoveredApp, setHoveredApp]}
                        selectState={[selectedApp, setSelectedApp]}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        {pages.length > 1 && (
          <div className='mt-6 -mb-4 w-full flex'>
            <div className='mx-auto flex space-x-2'>
              {pages.map((_, i) => (
                <button
                  key={`page-${i}`}
                  onClick={() => {
                    scrollToPage(i);
                    setHoveredApp(pages[i][0]);
                  }}
                  className={`rounded-full bg-ac-beige-dark w-2 h-2 transition-all outline ${page === i ? 'outline-4 outline-offset-1 outline-teal-500' : 'outline-transparent'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={`absolute top-0 left-0 sm:relative sm:ml-12 bg-ac-beige h-full w-full sm:w-auto sm:grow ${selectedApp ? 'scale-100 rounded-[3.5rem] brightness-100' : 'scale-0 rounded-[8rem] brightness-90'} transition-all`}>
        <div className='relative h-full'>
          {selectedApp && (
            <div className='p-12 overflow-y-scroll'>
              <div className='flex'>
                <div>
                  <p className='font-black text-4xl'>
                    {selectedApp.name}
                  </p>
                  {selectedApp.createdAt && (
                    <p
                      className='opacity-80 text-xl font-bold'
                      title={`First released ${selectedApp.createdAt.toLocaleDateString()}`}
                    >
                      {selectedApp.defunctAt
                        ? <>{selectedApp.createdAt.getFullYear()} &#x2014; {selectedApp.defunctAt.getFullYear()}</>
                        : <>Since {selectedApp.createdAt.getFullYear()}</>}
                    </p>
                  )}
                </div>
                <img
                  className='rounded-3xl w-16 h-16 ml-auto sm:hidden md:block'
                  src={selectedApp.image}
                  alt={selectedApp.name}
                />
              </div>
              <hr className='my-4 border border-ac-beige-dark' />
              <p>{selectedApp.summary}</p>
              {selectedApp.links && (
                <>
                  <hr className='my-4 border border-ac-beige-dark' />
                  <p className='font-black text-2xl'>Links</p>
                  <ul>
                    {[
                      ...selectedApp.links,
                      { name: 'Donate', url: 'https://paypal.com/paypalme/shaywantsmoney' },
                    ].map((link) => {
                      return (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            className={`text-teal-600 group`}
                          >
                            &#x1f517;{' '}
                            <span className={`group-hover:italic group-hover:after:content-['_~'] group-hover:before:content-['~_']`}>
                              {link.name ?? 'Check it out!'}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </>
              )}
            </div>
          )}
          <div className='absolute bottom-0 flex w-full p-8 bg-ac-beige-dark/10 border-t-2 border-t-ac-beige-dark rounded-b-[3.5rem]'>
            <button
              className='rounded-full flex mx-auto border-2 border-t-4 hover:bg-ac-beige-dark/30 transition-colors border-ac-beige-dark w-12 h-12'
              onClick={() => setSelectedApp(undefined)}
              title='Close App'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const SignalHump = () => (
  <div className='w-3 h-2 ml-0.5 mb-0.5 relative'>
    <div className='absolute bg-ac-beige w-full h-2 -bottom-[5px] left-0' />
    <div className='border-4 border-ac-beige-dark rounded-full h-3 w-3' />
  </div>
)

const AppIcon = (
  {
    app,
    hoverState,
    selectState,
  }: {
    app: ProjectApp,
    hoverState: [ProjectApp | undefined, (value: ProjectApp | undefined) => void],
    selectState: [ProjectApp | undefined, React.Dispatch<React.SetStateAction<ProjectApp | undefined>>],
  }
) => {
  const [hoveredApp, setHoveredApp] = hoverState;
  const [selectedApp, setSelectedApp] = selectState;

  return (
    <button
      className={`block h-auto rounded-3xl transition-all outline outline-2 outline-offset-[1.5px] cursor-ac ${selectedApp?.id === app.id ? 'scale-110 outline-teal-500' : hoveredApp?.id === app.id ? 'scale-110 outline-teal-500' : 'outline-transparent'}`}
      onMouseOver={() => setHoveredApp(app)}
      onFocus={() => setHoveredApp(app)}
      onClick={() => selectedApp?.id === app.id ? setSelectedApp(undefined) : setSelectedApp(app)}
    >
      <img
        className='rounded-3xl aspect-square'
        src={app.image}
        alt={app.name}
      />
    </button>
  );
}
