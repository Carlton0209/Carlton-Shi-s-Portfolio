'use client'

import { Mail, Send } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder - would integrate with backend
    window.location.href = `mailto:sjc2213968315@gmail.com?subject=Portfolio Inquiry from ${formData.name}&body=${formData.message}`
  }

  return (
    <section id="contact" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Get in Touch</span>
              <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Let's Work<br />Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Drop me a message and let's create something extraordinary!
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-card clean-border rounded-3xl p-8 lg:p-12 subtle-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-background clean-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-background clean-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={5}
                className="w-full bg-background clean-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground text-background font-semibold py-4 rounded-xl hover:opacity-90 gentle-animation flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>

          {/* Alternative contact */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              Or reach me directly at{' '}
              <a href="mailto:sjc2213968315@gmail.com" className="text-accent-purple hover:underline font-medium">
                sjc2213968315@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
