import { useContext, useLayoutEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import {
  chillIcon,
  jazzyIcon,
  searchIcon,
  sleepyIcon,
  volumeMaxIcon,
  volumeMinIcon,
} from '../../assets/icons'
import { CHILL_LINKS, JAZZY_LINKS, NOISE_ICONS, SLEEPY_LINKS } from '../../constants'
import {
  INITIAL_VOLUME_PERCENT,
  DEFAULT_AUDIO_VOLUME,
  VOLUME_SLIDER_MULTIPLIER,
  VOLUME_SLIDER_SCALE,
} from '../../constants/audio'
import { ThemeContext } from '../../context'
import { shuffle, randomAudio } from '../../utils/handleAudio'
import MoodItem from './MoodItem'

type MoodType = 'sleepy' | 'jazzy' | 'chill' | 'youtube'

const Mood = () => {
  const {
    setCurrentMood,
    setCurrentAudio,
    setPlaying,
    moodTab,
    setMoodTab,
    controlRef,
    noisesRefs,
  } = useContext(ThemeContext)

  const [volume, setVolume] = useState(INITIAL_VOLUME_PERCENT)
  const initialTab = { sleepy: false, jazzy: false, chill: false, youtube: false }

  useLayoutEffect(() => {
    setVolume((controlRef.current?.volume ?? DEFAULT_AUDIO_VOLUME) * VOLUME_SLIDER_MULTIPLIER)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- controlRef is a stable ref object, not a reactive value
  }, [])

  const handleMoodType = (type: MoodType) => {
    setPlaying(true)

    switch (type) {
      case 'sleepy': {
        const sleepy = shuffle(SLEEPY_LINKS)
        setMoodTab({ ...initialTab, sleepy: true })
        setCurrentMood(sleepy)
        setCurrentAudio(randomAudio(sleepy))
        break
      }
      case 'jazzy': {
        const jazzy = shuffle(JAZZY_LINKS)
        setMoodTab({ ...initialTab, jazzy: true })
        setCurrentMood(jazzy)
        setCurrentAudio(randomAudio(jazzy))
        break
      }
      case 'chill': {
        const chill = shuffle(CHILL_LINKS)
        setMoodTab({ ...initialTab, chill: true })
        setCurrentMood(chill)
        setCurrentAudio(randomAudio(chill))
        break
      }
      case 'youtube':
        setMoodTab({ ...moodTab, youtube: true })
        break
    }
  }

  return (
    <div className="absolute right-[88px] w-[345px] bg-bg-menu rounded-3xl p-6 z-20">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="font-bold mb-4 text-xl text-white">Mood</h4>
      </div>

      <div className="my-4 grid grid-cols-2 gap-y-2 gap-x-4 flex-wrap justify-between items-center text-white">
        <MoodItem
          isActive={moodTab.sleepy}
          iconSrc={sleepyIcon}
          label="Sleepy"
          className="-left-7 -top-12"
          handleClick={() => handleMoodType('sleepy')}
        />
        <MoodItem
          isActive={moodTab.jazzy}
          iconSrc={jazzyIcon}
          label="Jazzy"
          className="-left-7 -top-12"
          handleClick={() => handleMoodType('jazzy')}
        />
        <MoodItem
          isActive={moodTab.chill}
          iconSrc={chillIcon}
          label="Chill"
          className="-left-8 -top-12"
          handleClick={() => handleMoodType('chill')}
        />
        <MoodItem
          isActive={moodTab.youtube}
          iconSrc={searchIcon}
          label="Youtube"
          className="-left-7 -top-11"
          isSearch={true}
          handleClick={() => handleMoodType('youtube')}
        />
      </div>

      <div className="my-8 flex justify-between items-center">
        <img src={volumeMinIcon} alt="volume-min" className="relative -top-1 left-1" />
        <ReactSlider
          className="h-3 w-[200px] bg-bg-200 rounded-full"
          value={volume}
          onChange={(value: number) => {
            setVolume(value)
            if (controlRef.current) controlRef.current.volume = value / VOLUME_SLIDER_SCALE
          }}
          renderTrack={({ key, ...props }, state) => (
            <div
              key={key}
              {...props}
              className={`inset-y-0 rounded-full ${state.index === 0 ? 'bg-primary' : ''}`}
            />
          )}
          renderThumb={({ key, ...props }) => (
            <div
              key={key}
              {...props}
              className="-top-0.5 h-4 w-4 bg-white rounded-full cursor-pointer outline-none"
            />
          )}
        />
        <img src={volumeMaxIcon} alt="volume-max" className="relative -top-1 right-1" />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h4 className="font-bold mb-4 text-xl text-white">Background noises</h4>
      </div>

      <div className="max-h-[280px] border border-transparent-w-20 rounded-xl px-2 overflow-y-auto">
        {NOISE_ICONS.map((noise, index) => (
          <div key={index} className="my-4 flex justify-between items-center">
            <p className="text-sm opacity-40 text-white">{noise.label}</p>
            <ReactSlider
              className="h-6 w-[148px] bg-bg-200 rounded-full mr-1"
              defaultValue={0}
              onBeforeChange={() => {
                const audio = noisesRefs.current[index]
                if (!audio) return
                if (audio.paused) audio.play()
                if (audio.muted) audio.muted = false
              }}
              onChange={(value: number) => {
                const audio = noisesRefs.current[index]
                if (audio) audio.volume = value / VOLUME_SLIDER_SCALE
              }}
              renderTrack={({ key, ...props }, state) => (
                <div
                  key={key}
                  {...props}
                  className={`inset-y-0 rounded-full ${state.index === 0 ? 'bg-primary' : ''}`}
                />
              )}
              renderThumb={({ key, ...props }) => (
                <div
                  key={key}
                  {...props}
                  className="h-6 w-6 rounded-full cursor-pointer outline-none"
                >
                  <img src={noise.icon} alt="icon" />
                </div>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mood
