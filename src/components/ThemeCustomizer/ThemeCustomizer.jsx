import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FiCheck, FiMoon, FiSliders, FiSun, FiX } from 'react-icons/fi'
import './ThemeCustomizer.css'

const THEME_KEY = 'bookverse-theme'
const BACKGROUND_KEY = 'bookverse-background'

const THEMES = [
  { value: 'dark', label: 'Tối', icon: FiMoon },
  { value: 'light', label: 'Sáng', icon: FiSun }
]

const BACKGROUNDS = [
  { value: 'indigo', label: 'Chàm', colors: ['#0f172a', '#f8f7f4'] },
  { value: 'paper', label: 'Giấy ấm', colors: ['#201a17', '#fbf5e9'] },
  { value: 'ocean', label: 'Xanh dịu', colors: ['#071c28', '#eff8f8'] }
]

function storedValue(key, allowedValues, fallback) {
  const value = localStorage.getItem(key)
  return allowedValues.includes(value) ? value : fallback
}

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => storedValue(THEME_KEY, THEMES.map(item => item.value), 'dark'))
  const [background, setBackground] = useState(() => storedValue(BACKGROUND_KEY, BACKGROUNDS.map(item => item.value), 'indigo'))
  const customizerRef = useRef(null)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.background = background
    localStorage.setItem(THEME_KEY, theme)
    localStorage.setItem(BACKGROUND_KEY, background)
  }, [theme, background])

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (customizerRef.current && !customizerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', closeOnOutsideClick)
    }

    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [open])

  return (
    <div className="theme-customizer" ref={customizerRef}>
      {open && (
        <section className="theme-panel" aria-label="Tùy chỉnh giao diện">
          <div className="theme-panel-header">
            <div>
              <h2>Giao diện</h2>
              <p>Chọn chế độ và nền</p>
            </div>
            <button className="theme-close" onClick={() => setOpen(false)} aria-label="Đóng">
              <FiX />
            </button>
          </div>

          <span className="theme-label">Chế độ</span>
          <div className="theme-mode-options">
            {THEMES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                className={`theme-mode ${theme === value ? 'active' : ''}`}
                onClick={() => setTheme(value)}
                aria-pressed={theme === value}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

          <span className="theme-label">Màu nền</span>
          <div className="theme-background-options">
            {BACKGROUNDS.map(({ value, label, colors }) => (
              <button
                key={value}
                className={`theme-background ${background === value ? 'active' : ''}`}
                onClick={() => setBackground(value)}
                aria-pressed={background === value}
              >
                <span className="theme-swatches">
                  {colors.map(color => (
                    <span key={color} style={{ background: color }}></span>
                  ))}
                </span>
                <span>{label}</span>
                {background === value && <FiCheck className="theme-selected" />}
              </button>
            ))}
          </div>
        </section>
      )}

      <button
        className="theme-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Chọn giao diện và nền"
        aria-expanded={open}
      >
        <FiSliders />
        <span>Giao diện</span>
      </button>
    </div>
  )
}
