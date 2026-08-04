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
   Delivery via FormSubmit.co's AJAX endpoint (account-free). Activation is
   per email + site: the inbox owner clicks the link in the activation email
   FormSubmit sends on the first submission from a given site — once for
   localhost (dev) and once more after the first submission from the
   production domain. If several activation emails stack up, only the NEWEST
   link is valid. After activating, the same email contains a "random-like
   string" alias that can replace the address below to keep it out of the
   public bundle. */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/barcliffassociates@gmail.com'

const wireMessageFlow = ({ fieldsSel, submitSel, thanksSel, resetSel, contactSel, consentSel, formSel, subject, errorText }) => {
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

  const showError = (text) => {
    clearError()
    errorEl = document.createElement('p')
    errorEl.className = 'form-error'
    errorEl.setAttribute('role', 'alert')
    errorEl.textContent = text
    submit.before(errorEl)
  }

  const trySubmit = async (e) => {
    if (e) e.preventDefault()
    const missing = []
    if (contact && !contact.value.trim()) missing.push(contact)
    if (consent && !consent.checked) missing.push(consent)
    if (missing.length) {
      showError(errorText)
      missing[0].focus()
      return
    }
    clearError()
    if (FORM_ENDPOINT) {
      submit.disabled = true
      const sending = submit.textContent
      submit.textContent = 'Sending…'
      try {
        const data = new FormData()
        fields.querySelectorAll('input, select, textarea').forEach((el) => {
          if (!el.name) return
          if (el.type === 'checkbox') data.append(el.name, el.checked ? 'yes' : 'no')
          else data.append(el.name, el.value)
        })
        data.append('_subject', subject)
        data.append('_template', 'table')
        data.append('_captcha', 'false')
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        })
        /* FormSubmit answers 200 with success:"false" (e.g. unactivated form),
           so the body must be checked, not just the status */
        const out = await res.json().catch(() => null)
        if (!res.ok || !out || String(out.success) !== 'true') throw new Error('send failed')
      } catch {
        showError('Something went wrong and your message was not sent. Please try again in a moment.')
        return
      } finally {
        submit.disabled = false
        submit.textContent = sending
      }
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
  subject: 'Find Help message — barcliffimpactsolutions.com',
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
  subject: 'Partnership inquiry — barcliffimpactsolutions.com',
  errorText: 'Please add a way to reach you and check the consent box so we can respond.',
})
