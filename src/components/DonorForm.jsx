import { useState } from 'react'

export default function DonorForm({ values, onChange, includeMessage = false, idPrefix = 'donor' }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value })

  return (
    <div className="space-y-4">
      <Field id={`${idPrefix}-name`} label="Full name" required>
        <input
          id={`${idPrefix}-name`}
          type="text"
          value={values.name}
          onChange={set('name')}
          required
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <Field id={`${idPrefix}-email`} label="Email address" required>
        <input
          id={`${idPrefix}-email`}
          type="email"
          value={values.email}
          onChange={set('email')}
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <Field id={`${idPrefix}-phone`} label="Phone number" required>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          value={values.phone}
          onChange={set('phone')}
          required
          autoComplete="tel"
          className={inputClass}
        />
      </Field>

      {includeMessage && (
        <Field id={`${idPrefix}-message`} label="Message (optional)">
          <textarea
            id={`${idPrefix}-message`}
            rows={3}
            value={values.message}
            onChange={set('message')}
            className={`${inputClass} resize-y`}
            placeholder="Share a note with the planning committee"
          />
        </Field>
      )}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-body text-sm text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-150'

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-body font-semibold uppercase tracking-widest text-muted mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  )
}

export function donorFormValid(values, { requireMessage = false } = {}) {
  const { name, email, phone, message } = values
  if (!name?.trim() || !email?.trim() || !phone?.trim()) return false
  if (requireMessage && !message?.trim()) return false
  return /\S+@\S+\.\S+/.test(email)
}
