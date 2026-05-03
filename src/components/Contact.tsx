'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const completionItems = [
    { id: 'name', label: 'Name', complete: formData.name.trim().length > 0 },
    { id: 'email', label: 'Email', complete: formData.email.trim().length > 0 },
    { id: 'message', label: 'Brief', complete: formData.message.trim().length > 12 },
  ]
  const completion = completionItems.filter(item => item.complete).length / completionItems.length

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'a visitor'}`)
    const body = encodeURIComponent(`${formData.message}\n\nReply to: ${formData.email}`)
    window.location.href = `mailto:sjc2213968315@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="bg-[#272729] px-5 py-20 text-white sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-center lg:text-left">
          <p className="mb-3 text-[21px] font-semibold leading-[1.19]">Contact</p>
          <h2 className="text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-6xl">
            Let's build the next frame.
          </h2>
          <p className="mt-6 text-[22px] font-light leading-[1.45] text-[#cccccc] sm:text-[28px] sm:leading-[1.18]">
            Send a project note, collaboration idea, or production brief. I will route it straight into email.
          </p>
          <a
            href="mailto:sjc2213968315@gmail.com"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2997ff] px-[22px] text-[17px] text-[#2997ff] transition-all hover:-translate-y-0.5 hover:border-white/70 hover:text-white active:scale-95"
          >
            <Mail className="h-4 w-4" />
            sjc2213968315@gmail.com
          </a>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          className="rounded-[18px] border border-white/10 bg-white p-6 text-[#1d1d1f] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8"
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {completionItems.map(item => (
              <motion.span
                key={item.id}
                animate={{
                  backgroundColor: item.complete ? '#e8f3ff' : '#f5f5f7',
                  color: item.complete ? '#0066cc' : '#7a7a7a',
                }}
                className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-sm"
              >
                <CheckCircle2 className={`h-4 w-4 ${item.complete ? 'text-[#0066cc]' : 'text-[#b8b8bd]'}`} />
                {item.label}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold leading-[1.29]">Name</span>
              <input
                type="text"
                value={formData.name}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                onChange={event => setFormData(previous => ({ ...previous, name: event.target.value }))}
                className={`h-11 w-full rounded-full border bg-white px-5 text-[17px] outline-none transition-all ${
                  focusedField === 'name'
                    ? 'border-[#0071e3] ring-4 ring-[#0071e3]/15'
                    : 'border-[#e0e0e0] hover:border-[#b8b8bd]'
                }`}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold leading-[1.29]">Email</span>
              <input
                type="email"
                value={formData.email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={event => setFormData(previous => ({ ...previous, email: event.target.value }))}
                className={`h-11 w-full rounded-full border bg-white px-5 text-[17px] outline-none transition-all ${
                  focusedField === 'email'
                    ? 'border-[#0071e3] ring-4 ring-[#0071e3]/15'
                    : 'border-[#e0e0e0] hover:border-[#b8b8bd]'
                }`}
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold leading-[1.29]">Message</span>
            <textarea
              value={formData.message}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              onChange={event => setFormData(previous => ({ ...previous, message: event.target.value }))}
              rows={6}
              className={`w-full resize-none rounded-[18px] border bg-white px-5 py-4 text-[17px] leading-[1.47] outline-none transition-all ${
                focusedField === 'message'
                  ? 'border-[#0071e3] ring-4 ring-[#0071e3]/15'
                  : 'border-[#e0e0e0] hover:border-[#b8b8bd]'
              }`}
              placeholder="Tell me about your project..."
            />
          </label>

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#f5f5f7]">
            <motion.div
              className="h-full rounded-full bg-[#0066cc]"
              animate={{ width: `${completion * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] px-[22px] text-[17px] text-white transition-colors hover:bg-[#0071e3]"
          >
            <Send className="h-4 w-4" />
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
