import './style.css'
import './styles/services.css'
import './styles/level-seven.css'
import './styles/find-help.css'
import './styles/partner-with-us.css'

const toggle = document.querySelector('.menu-toggle')
const menu = document.querySelector('.nav-mobile')

if (toggle && menu) {
  const setOpen = (open) => {
    menu.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.textContent = open ? 'Close' : 'Menu'
  }

  toggle.addEventListener('click', () => {
    setOpen(!menu.classList.contains('is-open'))
  })

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false)
      toggle.focus()
    }
  })
}
