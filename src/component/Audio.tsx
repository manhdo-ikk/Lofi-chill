import { useContext, useEffect } from 'react'
import { clockIcon, nextIcon, pauseIcon, playIcon, prevIcon } from '../assets/icons'
import { ALARM_LINKS, NOISE_LINKS } from '../constants'
import { MUSIC_ATTRIBUTION } from '../constants/audio'
import { ThemeContext } from '../context'
import { convertTime, getActiveItemLabel } from '../utils/timer'

const Audio = () => {
  const {
    controlRef,
    currentAudio,
    setCurrentAudio,
    playing,
    setPlaying,
    buttonP,
    currentMood,
    noisesRefs,
    currentTime,
    activeItem,
    setVisibleFocusType,
    initVisibleFocusType,
    refAlarm,
  } = useContext(ThemeContext)

  const activeItemLabel = getActiveItemLabel(activeItem)

  const handleControl = () => {
    if (playing) {
      controlRef.current?.pause()
    } else {
      controlRef.current?.play()
    }
    setPlaying(!playing)
  }

  useEffect(() => {
    controlRef.current?.play().catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = controlRef.current
    if (!audio || !playing) return
    audio.play().catch(() => {})
  }, [currentAudio.currentAudio]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePrevAudio = () => {
    if (currentAudio.index > 0) {
      setCurrentAudio({
        ...currentAudio,
        index: currentAudio.index - 1,
        currentAudio: currentMood[currentAudio.index - 1],
      })
    } else {
      setCurrentAudio({
        ...currentAudio,
        index: currentMood.length - 1,
        currentAudio: currentMood[currentMood.length - 1],
      })
    }
    setPlaying(true)
  }

  const handleNextAudio = () => {
    if (currentAudio.index === currentMood.length - 1) {
      setCurrentAudio({ index: 0, currentAudio: currentMood[0] })
    } else {
      setCurrentAudio({
        index: currentAudio.index + 1,
        currentAudio: currentMood[currentAudio.index + 1],
      })
    }
    setPlaying(true)
  }

  return (
    <>
      <div className="fixed bottom-6 w-screen flex justify-center items-center">
        <p className="absolute left-20 opacity-50 text-sm">{MUSIC_ATTRIBUTION}</p>
        <div className="flex justify-center items-center">
          <img
            src={prevIcon}
            onClick={handlePrevAudio}
            alt="icon"
            className="mx-2 cursor-pointer"
          />
          <img
            ref={buttonP}
            src={playing ? pauseIcon : playIcon}
            alt="icon"
            className="mx-2 cursor-pointer"
            width={54}
            height={54}
            onClick={handleControl}
          />
          <img
            src={nextIcon}
            onClick={handleNextAudio}
            alt="icon"
            className="mx-2 cursor-pointer"
          />
        </div>
      </div>

      <audio src={currentAudio.currentAudio} onEnded={handleNextAudio} ref={controlRef} autoPlay />

      <div
        className="fixed bottom-6 right-6 flex items-center text-sm text-white italic
            bg-transparent-b-50 backdrop-blur-sm rounded-[20px] py-1.5 px-4 cursor-pointer text-[16px]"
        onClick={() => {
          setVisibleFocusType({ ...initVisibleFocusType, pomodoro: true })
        }}
      >
        <p className="opacity-50">{activeItemLabel}/</p>
        <img src={clockIcon} alt="clock" className="w-[18px] h-[18px] mx-2.5" />
        <p className="opacity-50">{convertTime(currentTime)}</p>
      </div>

      {NOISE_LINKS.map((link, i) => (
        <audio
          key={i}
          src={link}
          ref={el => {
            noisesRefs.current[i] = el
          }}
          autoPlay
          loop
          muted
        />
      ))}

      <audio src={ALARM_LINKS[0].link} ref={refAlarm} />
    </>
  )
}

export default Audio
