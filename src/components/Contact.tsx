'use client'

import { Mail, Send } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

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
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2997ff] px-[22px] text-[17px] text-[#2997ff] transition-transform active:scale-95"
          >
            <Mail className="h-4 w-4" />
            sjc2213968315@gmail.com
          </a>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[18px] border border-white/10 bg-white p-6 text-[#1d1d1f] sm:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold leading-[1.29]">Name</span>
              <input
                type="text"
                value={formData.name}
                onChange={event => setFormData(previous => ({ ...previous, name: event.target.value }))}
                className="h-11 w-full rounded-full border border-[#e0e0e0] bg-white px-5 text-[17px] outline-none transition-colors focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold leading-[1.29]">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={event => setFormData(previous => ({ ...previous, email: event.target.value }))}
                className="h-11 w-full rounded-full border border-[#e0e0e0] bg-white px-5 text-[17px] outline-none transition-colors focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold leading-[1.29]">Message</span>
            <textarea
              value={formData.message}
              onChange={event => setFormData(previous => ({ ...previous, message: event.target.value }))}
              rows={6}
              className="w-full resize-none rounded-[18px] border border-[#e0e0e0] bg-white px-5 py-4 text-[17px] leading-[1.47] outline-none transition-colors focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
              placeholder="Tell me about your project..."
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] px-[22px] text-[17px] text-white transition-transform active:scale-95"
          >
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
