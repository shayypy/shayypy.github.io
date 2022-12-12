import { useState } from 'react';
import DiscordLogoColor from './Discord-Logo-Color.svg';
import TwitterLogoColor from './Twitter-Logo-Blue.svg';
import DiscordLogoWhite from './Discord-Logo-White.svg';

const linkStyle = "text-[#CBCBDF] hover:italic hover:after:content-['~'] hover:before:content-['~']"

const projects = [
  {
    name: 'bearger',
    summary: 'free & easy to use bot with no arbitrary limitations',
    bgColor: '#ffd89e',
    textColor: '#9E5500',
    link: 'https://bearger.app',
    image: 'https://bearger.app/i/the_boy.png',
    type: 'discord',
    svg: DiscordLogoColor,
    created: new Date(2019, 6, 1),
  },
  {
    name: 'Discohook Utils',
    summary: 'utilities for discohook.app',
    bgColor: '#172025',
    textColor: '#dff1ff',
    link: 'https://dutils.shay.cat',
    image: 'https://cdn.discordapp.com/avatars/792842038332358656/da056550fd65a4d7e4636cb1707ca801.png?size=128',
    type: 'discord',
    svg: DiscordLogoWhite,
    created: new Date(2020, 9, 12),
  },
  {
    name: 'Statuspage',
    summary: 'posts statuspage.io incidents and maintenance updates to discord channels',
    bgColor: '#fff',
    textColor: '#000',
    link: 'https://sp.shay.cat',
    image: 'https://cdn.discordapp.com/avatars/778802790843678740/ed61e86bf594afc4bebbddda231f2e1a.png?size=128',
    type: 'discord',
    svg: DiscordLogoColor,
    created: new Date(2020, 10, 18),
  },
  {
    name: 'Tabletop Hat',
    summary: 'a collection of fun tabletop games for the whole family',
    bgColor: '#198fe4',
    textColor: '#fff',
    link: 'https://tth.shay.cat',
    image: 'https://cdn.discordapp.com/avatars/855292122017169420/937a52ca31fe88f21b9d436235a49e6c.png?size=128',
    type: 'discord',
    svg: DiscordLogoWhite,
    created: new Date(2021, 5, 17),
  },
  {
    name: 'pollr',
    summary: 'pollr tweets a poll every day',
    bgColor: '#000',
    textColor: '#f91880',
    link: 'https://pollr.shay.cat',
    image: '/images/pollr.png',
    type: 'twitter',
    svg: TwitterLogoColor,
    created: new Date(2022, 0, 31),
  },
  //{
  //  name: 'shay.cat',
  //  summary: 'this website is shay.cat',
  //  bgColor: '#eae6cd',
  //  textColor: '#000',
  //  link: 'https://shay.cat',
  //  image: '/cats/hayches_catshay.png',
  //  type: 'website',
  //  created: new Date(2022, 2, 14),
  //},
  {
    name: 'jerso',
    summary: 'fun little hockey jersey game 🏒',
    bgColor: '#e2e8f0',
    textColor: '#000',
    link: 'https://jerso.fun',
    image: 'https://jerso.fun/images/jerso.png',
    type: 'website',
    created: new Date(2022, 5, 7),
  },
  {
    name: 'NHL Scorebug',
    summary: 'a scorebug for NHL games 🏒 (goals + shots), intended for display on a dedicated ~4" screen',
    bgColor: '#ccfbf1',
    textColor: '#000',
    link: 'https://github.com/shayypy/nhl-scorebug',
    image: '/images/scorebug-sm.png',
    created: new Date(2022, 10, 5),
  },
]

function App() {
  const [hollerOpen, setHollerOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState(null)

  return (
    <div className='max-w-3xl mx-auto h-full'>
      <div className={`bg-shay-teal p-5 rounded-xl ${!hollerOpen ? 'rounded-br-none' : ''} flex`}>
        <div>
          <h1 className='font-bold text-xl'>👋 hey, i'm shay</h1>
          <p className='mt-1'>displayed below are some projects that i make &amp; maintain.</p>
        </div>
      </div>
      {hollerOpen ? (
        <div className='bg-shay-teal px-5 py-3 rounded-xl mt-6'>
          <div className='flex'>
            <h1 className='font-bold text-xl'>📣 holler</h1>
            <div className='ml-auto mr-3 -mt-3'>
              <button
                className='text-4xl opacity-70 hover:opacity-100 transition-opacity select-none absolute'
                onClick={() => {setHollerOpen(false)}}
                title='Minimize'
              >
                -
              </button>
            </div>
          </div>
          <ul className='mt-1'>
            <li>email @ <a href='mailto:meow@shay.cat' className={linkStyle}>meow@shay.cat</a></li>
            <li>discord @ <a href='discord://-/users/115238234778370049' className={linkStyle}>shay#0038</a></li>
          </ul>
        </div>
      ) : (
        <div className='w-full flex'>
          <button
            className='bg-shay-teal font-bold rounded-b-xl ml-auto px-2 pb-1 -mt-1 hover:translate-y-1 hover:opacity-70 transition'
            onClick={() => {setHollerOpen(!hollerOpen)}}
          >
            📣 holler
          </button>
        </div>
      )}
      <div className='bg-shay-teal px-5 py-3 rounded-t-xl mt-6'>
        <h1 className='font-bold text-xl'>🔧 what i'm working on</h1>
      </div>
      {selectedApp === null ? (
        <div className='flex bg-shay-teal rounded-b-xl px-5 flex-wrap'>
          {projects.map(project => {
            return (
              <button
                key={project.name}
                onClick={() => {setSelectedApp(project)}}
                className='mx-auto hover:-translate-y-1 transition-transform'
              >
                <img
                  src={project.image}
                  className='rounded-xl h-24 mb-5'
                  alt={project.name}
                  title={project.name} 
                />
              </button>
            )
          })}
        </div>
      ) : (
        <div
          className='bg-shay-teal rounded-b-xl flex'
          style={{
            backgroundColor: selectedApp.bgColor,
            color: selectedApp.textColor
          }}
        >
          <img
            className='rounded-b-xl my-auto max-h-32 max-w-[30%]'
            src={selectedApp.image}
            alt={selectedApp.name}
          />
          <div className='py-5 px-8'>
            <p>{selectedApp.summary}</p>
            <div className='mt-4 text-sm'>
              <button
                className='px-2 py-1 rounded-lg font-bold mr-2 hover:opacity-90 transition-opacity text-base'
                style={{
                  backgroundColor: selectedApp.textColor,
                  color: selectedApp.bgColor,
                }}
              >
                <a href={selectedApp.link}>i wanna see!</a>
              </button>
              <button
                className='px-2 py-1 mt-2 rounded-lg font-bold opacity-80 hover:opacity-90 transition-opacity text-base'
                onClick={() => {setSelectedApp(null)}}
                style={{
                  backgroundColor: selectedApp.textColor,
                  color: selectedApp.bgColor,
                }}
              >
                nevermind, go back
              </button>
            </div>
          </div>
          {selectedApp.svg && (
            <div className='ml-auto mt-auto mr-3 mb-3'>
              <img src={selectedApp.svg} className='w-8' alt='Platform icon' />
            </div>
          )}
        </div>
      )}
      <div className='max-w-3xl mx-auto h-full mt-6'>
        <div className='bg-shay-teal p-5 rounded-xl'>
          <h1 className='font-bold text-xl'>💰 support me</h1>
          <p className='mt-1'>
            if you like what i make, you can throw some cash my way with <a href='https://paypal.com/paypalme/shaywantsmoney' className={linkStyle}>paypal</a> or <a href='https://ko-fi.com/shayypy' className={linkStyle}>ko-fi</a>.
            merci beaucoup mon ami 🎩
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
