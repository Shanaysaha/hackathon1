import { useThemeStore } from '@/state/themeStore'
import { colors } from '@/styles/tokens'

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore()

  return {
    theme,
    toggleTheme,
    setTheme,
    colors: colors[theme],
  }
}
