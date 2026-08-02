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

/* Message flows (find-help + partner inquiry).
   FORM_ENDPOINT is intentionally null: no delivery service exists yet, and the
   confirmation copy on both pages states that nothing is sent. Before the
   forms can deliver for real, set this to a form backend URL (e.g. Formspree)
   — until then the flow only validates and shows the confirmation panel. */
const FORM_ENDPOINT = null

const wireMessageFlow = ({ fieldsSel, submitSel, thanksSel, resetSel, contactSel, consentSel, formSel, errorText }) => {
  const fields = document.querySelector(fieldsSel)
  const submit = document.querySelector(submitSel)
  const thanks = document.querySelector(thanksSel)
  if (!fields || !submit || !thanks) return

  const contact = document.querySelector(contactSel)
  const consent = document.querySelector(consentSel)
  const resetBtn = thanks.querySelector(resetSel)
  let errorEl = null

  const clearError = () => {
    if (errorEl) errorEl.remove()
    errorEl = null
  }

  const showError = () => {
    if (!errorEl) {
      errorEl = document.createElement('p')
      errorEl.className = 'form-error'
      errorEl.setAttribute('role', 'alert')
      errorEl.textContent = errorText
      submit.before(errorEl)
    }
  }

  const trySubmit = (e) => {
    if (e) e.preventDefault()
    const missing = []
    if (contact && !contact.value.trim()) missing.push(contact)
    if (consent && !consent.checked) missing.push(consent)
    if (missing.length) {
      showError()
      missing[0].focus()
      return
    }
    clearError()
    if (FORM_ENDPOINT) {
      const data = new FormData()
      fields.querySelectorAll('input, select, textarea').forEach((el) => {
        if (el.type === 'checkbox') data.append(el.name, el.checked ? 'yes' : 'no')
        else data.append(el.name, el.value)
      })
      fetch(FORM_ENDPOINT, { method: 'POST', body: data }).catch(() => {})
    }
    fields.hidden = true
    thanks.hidden = false
    thanks.setAttribute('tabindex', '-1')
    thanks.focus()
  }

  submit.addEventListener('click', trySubmit)
  if (formSel) document.querySelector(formSel)?.addEventListener('submit', trySubmit)

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      fields.querySelectorAll('input, textarea').forEach((el) => {
        if (el.type === 'checkbox') el.checked = false
        else el.value = ''
      })
      thanks.hidden = true
      fields.hidden = false
      fields.querySelector('input, select, textarea')?.focus()
    })
  }
}

wireMessageFlow({
  fieldsSel: '.fh-form',
  submitSel: '.fh-submit',
  thanksSel: '.fh-thanks',
  resetSel: '.fh-thanks__reset',
  contactSel: '#fh-contact-detail',
  consentSel: '#fh-consent',
  errorText: 'Please add a way to reach you and check the consent box so we can respond.',
})

wireMessageFlow({
  fieldsSel: '.pw-form',
  submitSel: '.pw-form__submit',
  thanksSel: '.pw-form__success',
  resetSel: '.pw-form__reset',
  contactSel: '#pw-contact',
  consentSel: '#pw-consent',
  formSel: '.pw-form',
  errorText: 'Please add a way to reach you and check the consent box so we can respond.',
})
