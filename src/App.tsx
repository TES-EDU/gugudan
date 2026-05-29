import { useGameStore } from './stores/gameStore'
import { useOrientation } from './hooks/useOrientation'
import PortraitWarning from './components/screens/PortraitWarning'
import StartScreen from './components/screens/StartScreen'
import ModeSelectScreen from './components/screens/ModeSelectScreen'
import LevelSelectScreen from './components/screens/LevelSelectScreen'
import GameScreen from './components/screens/GameScreen'
import ResultScreen from './components/screens/ResultScreen'
import SettingsScreen from './components/screens/SettingsScreen'

function App() {
  const screen = useGameStore((s) => s.screen)
  const { isPortrait } = useOrientation()

  if (isPortrait) {
    return <PortraitWarning />
  }

  return (
    <div className="w-full h-full">
      {screen === 'start' && <StartScreen />}
      {screen === 'modeSelect' && <ModeSelectScreen />}
      {screen === 'levelSelect' && <LevelSelectScreen />}
      {screen === 'game' && <GameScreen />}
      {screen === 'result' && <ResultScreen />}
      {screen === 'settings' && <SettingsScreen />}
    </div>
  )
}

export default App
