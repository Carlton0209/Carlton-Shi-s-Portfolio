import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'
import manifest from '../content/daymark/manifest.json'
import welcomeHtml from '../content/daymark/welcome.html?raw'
import productHtml from '../content/daymark/product.html?raw'
import preferencesHtml from '../content/daymark/preferences.html?raw'
import './daymark-email.css'

const figmaUrl = 'https://www.figma.com/design/RoctkyFhNcQ8G35C7NfQV2/?node-id=25-271'
const htmlById: Record<string, string> = { welcome: welcomeHtml, product: productHtml, preferences: preferencesHtml }
const image = (name: string) => withBase(`images/daymark/${name}.webp`)
const download = (name: string) => withBase(`downloads/daymark/${name}`)

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>
}

function DesignFigure({ name, title, alt, children }: { name: string; title: string; alt: string; children: ReactNode }) {
  const src = image(`figma-${name}`)
  return (
    <figure className="dm-case-figure">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${title}`}>
        <img src={src} alt={alt} width={1600} height={name === 'modes' ? 1747 : 816} loading="lazy" decoding="async" />
      </a>
      <figcaption><strong>{title}</strong><span>{children}</span><a href={src} target="_blank" rel="noopener noreferrer">Open full view <ArrowUpRight size={14} aria-hidden="true" /></a></figcaption>
    </figure>
  )
}

function EmailPreview() {
  const [index, setIndex] = useState(0)
  const [compact, setCompact] = useState(false)
  const [dark, setDark] = useState(false)
  const [imagesOff, setImagesOff] = useState(false)
  const email = manifest.emails[index]
  const bodyClasses = `dm-body${dark ? ' dm-force-dark' : ''}${imagesOff ? ' dm-images-off' : ''}`
  const srcDoc = htmlById[email.id]
    .replace('<head>', `<head><base href="${withBase('email/daymark/')}">`)
    .replace('class="dm-body"', `class="${bodyClasses}"`)
    // Keep the preview controls deterministic even when the visitor's OS is dark.
    .replace('@media(prefers-color-scheme:dark)', '@media not all')

  return (
    <div className="dm-case-preview">
      <div className="dm-case-email-picker" role="group" aria-label="Select an email">
        {manifest.emails.map((item, i) => <button type="button" key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}><span>0{i + 1}</span>{item.name}</button>)}
      </div>
      <div className="dm-case-preview-layout">
        <aside className="dm-case-preview-details" aria-live="polite" aria-atomic="true">
          <p className="dm-case-label">{email.stage}</p>
          <h3>{email.name}</h3>
          <dl>
            <div><dt>Subject</dt><dd>{email.subject}</dd></div>
            <div><dt>Preview text</dt><dd>{email.preheader}</dd></div>
            <div><dt>Purpose</dt><dd>{email.goal}</dd></div>
          </dl>
          <p className="dm-case-source-size">{(email.htmlBytes / 1000).toFixed(2)} KB HTML source · images separate</p>
          <ExternalLink href={withBase(`email/daymark/${email.id}.html`)}>Open HTML preview</ExternalLink>
        </aside>
        <div className="dm-case-preview-main">
          <div className="dm-case-preview-controls">
            <div role="group" aria-label="Preview width"><button type="button" aria-pressed={!compact} onClick={() => setCompact(false)}>Wide</button><button type="button" aria-pressed={compact} onClick={() => setCompact(true)}>Compact</button></div>
            <div role="group" aria-label="Preview appearance"><button type="button" aria-pressed={!dark} onClick={() => setDark(false)}>Light</button><button type="button" aria-pressed={dark} onClick={() => setDark(true)}>Dark</button></div>
            <button type="button" className="dm-case-images-control" aria-pressed={imagesOff} onClick={() => setImagesOff(value => !value)}>Images {imagesOff ? 'off' : 'on'}</button>
          </div>
          <div className={`dm-case-inbox ${dark ? 'dm-case-inbox-dark' : ''}`}>
            <div className="dm-case-inbox-label"><span>DAYMARK / Browser review</span><span>{compact ? 'Max. 375 px' : 'Max. 640 px'}</span></div>
            <iframe key={`${email.id}-${compact}-${dark}-${imagesOff}`} title={`${email.name} email · ${compact ? 'compact' : 'wide'} · ${dark ? 'dark' : 'light'} · images ${imagesOff ? 'off' : 'on'}`} srcDoc={srcDoc} sandbox="allow-popups allow-popups-to-escape-sandbox" style={{ maxWidth: compact ? 375 : 640 }} />
          </div>
          <p className="dm-case-small">Scroll inside the email to explore. Width adapts to the available space. Dark and images-off controls simulate review states; email clients may render them differently.</p>
        </div>
      </div>
    </div>
  )
}

export default function DaymarkEmailCaseStudy() {
  useEffect(() => {
    const previous = document.title
    document.title = 'DAYMARK — Email design · Carlton Shi'
    const anchor = document.getElementById(window.location.hash.slice(1))
    if (anchor) anchor.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { document.title = previous }
  }, [])

  return (
    <main className="dm-case">
      <nav className="dm-case-nav" aria-label="Project navigation">
        <Link to="/works/product-design"><ArrowLeft size={16} aria-hidden="true" /> Product Design</Link>
        <Link to="/">Carlton Shi</Link>
      </nav>
      <header className="dm-case-hero dm-case-wrap">
        <div className="dm-case-hero-copy">
          <p className="dm-case-label">Independent concept / Email design</p>
          <h1>DAYMARK</h1>
          <p className="dm-case-hero-line">A little more room<br />for a morning ritual.</p>
          <p className="dm-case-intro">A three-email journey for an imagined coffee brand. One recognizable voice, reshaped for a first hello, a product introduction, and a quieter inbox.</p>
          <div className="dm-case-actions"><a href="#email-lab" className="dm-case-button">Explore the emails <ArrowUpRight size={17} aria-hidden="true" /></a><ExternalLink href={figmaUrl}>View in Figma</ExternalLink></div>
        </div>
        <img className="dm-case-hero-image" src={image('product')} alt="DAYMARK House Blend concept packaging: a cobalt blue coffee pouch beside an ivory cup." width={1440} height={960} fetchPriority="high" />
        <dl className="dm-case-facts"><div><dt>Focus</dt><dd>Content, visual hierarchy, responsive email</dd></div><div><dt>Deliverables</dt><dd>Figma system, 3 HTML emails, plain text</dd></div><div><dt>Project status</dt><dd>Self-initiated concept · No campaign sent</dd></div></dl>
      </header>

      <section className="dm-case-wrap dm-case-section dm-case-brief" aria-labelledby="brief-title">
        <div><p className="dm-case-label">01 / The brief</p><h2 id="brief-title">Make each email<br />earn its place.</h2></div>
        <div className="dm-case-prose"><p>A new subscriber needs a reason to care before they need another promotion. DAYMARK’s emails introduce the brand, make one product easy to understand, and give an inactive reader control over what comes next.</p><p>The design uses a cobalt wordmark, warm paper tones, real text, and one primary action per message. The welcome email leads with a ritual; the product email brings the packaging forward; the preference email shifts to a blue field and an invitation to choose.</p><p className="dm-case-small">Fictional brand and product. Product and lifestyle imagery were created with AI assistance. The flow, copy, and test ideas are proposals; no audience research or campaign results are represented.</p></div>
      </section>

      <figure className="dm-case-overview dm-case-wrap"><img src={image('email-overview')} alt="The three DAYMARK HTML email designs shown together, with consistent colors and different content hierarchies." width={1600} height={1250} loading="lazy" decoding="async" /><figcaption>One brand, three reading priorities. These are renders of the delivered HTML templates.</figcaption></figure>

      <section id="email-lab" className="dm-case-wrap dm-case-section" aria-labelledby="emails-title">
        <div className="dm-case-section-heading"><div><p className="dm-case-label">02 / Explore the execution</p><h2 id="emails-title">From the inbox<br />to the small screen.</h2></div><p>Switch the message and review conditions. Titles, body copy, and buttons remain live HTML text; the layout becomes a single column on smaller screens.</p></div>
        <EmailPreview />
      </section>

      <section id="sequence" className="dm-case-sequence" aria-labelledby="sequence-title">
        <div className="dm-case-wrap dm-case-section">
          <div className="dm-case-section-heading"><div><p className="dm-case-label">03 / Lifecycle thinking</p><h2 id="sequence-title">A sequence with<br />a way out.</h2></div><p>Proposed rules connect the messages to subscriber behavior. Purchase or unsubscribe exits the sequence; inactive readers receive one preference invitation.</p></div>
          <ol className="dm-case-journey">{manifest.emails.map((email, index) => <li key={email.id}><span className="dm-case-step">0{index + 1}</span><p className="dm-case-label">{email.stage}</p><h3>{email.name}</h3><p>{email.goal}</p><p className="dm-case-rule">{email.rule}</p></li>)}</ol>
          <p className="dm-case-sequence-note">No click or purchase after a further 14 days → suppress future promotional messages. Timing is a starting hypothesis to validate with real subscriber data.</p>
          <div className="dm-case-test"><p className="dm-case-label">A test worth running / Not yet tested</p><h3>Does a morning benefit earn a first visit?</h3><div><p><span>Subject A</span>A better morning starts here.</p><p><span>Subject B</span>Your first DAYMARK coffee awaits.</p></div><p className="dm-case-small">Keep sender, content, and timing constant. Compare unique product clicks and first purchases per delivered email, with unsubscribe rate as a guardrail. Set a sample-size plan before sending; no result is claimed here.</p></div>
        </div>
      </section>

      <section className="dm-case-wrap dm-case-section" aria-labelledby="system-title">
        <div className="dm-case-section-heading"><div><p className="dm-case-label">04 / Figma system</p><h2 id="system-title">Shared parts.<br />Distinct messages.</h2></div><p>Native Auto Layout frames and component variants carry the design across six desktop and mobile layouts. Shared headers, footers, buttons, and feature blocks keep edits consistent.</p></div>
        <div className="dm-case-system-stats"><p><strong>6</strong>Email variants</p><p><strong>62</strong>Color & spacing variables</p><p><strong>8</strong>Text styles</p></div>
        <DesignFigure name="modules" title="Reusable email modules" alt="Figma handoff board showing DAYMARK header, footer, CTA and feature components with design and HTML delivery notes.">Named components, editable CTA labels, and shared spacing make the layouts easier to maintain.</DesignFigure>
        <DesignFigure name="modes" title="Light and dark review" alt="The same DAYMARK mobile Welcome email in light and dark Figma variable modes.">Semantic color aliases define the mode change. Arimo and Tinos in Figma map to Arial and Times system-font stacks in HTML.</DesignFigure>
        <ExternalLink href={figmaUrl} className="dm-case-text-link">Inspect the native Figma file</ExternalLink>
      </section>

      <section id="handoff" className="dm-case-handoff" aria-labelledby="handoff-title">
        <div className="dm-case-wrap dm-case-section">
          <div className="dm-case-section-heading"><div><p className="dm-case-label">05 / Handoff & validation</p><h2 id="handoff-title">Designed to read.<br />Packaged to build on.</h2></div><p>Three script-free HTML files, image assets, plain-text alternatives, copy, and a merge-field example travel together. The source is ready for ESP integration and client validation.</p></div>
          <div className="dm-case-handoff-grid"><div><h3>What is included</h3><ul><li>Table-based layouts with inline styles and system-font fallbacks.</li><li>A hidden preheader, descriptive image alt text, and a 48 px primary CTA.</li><li>Outlook conditional wrappers and VML button markup, awaiting Outlook validation.</li><li>Merge fields for first name, destinations, preference center, unsubscribe, and sender address.</li></ul></div><div><h3>What was checked</h3><ul><li>Chromium browser renders at 320, 375, and 640 px.</li><li>No horizontal overflow; images load and live text remains readable.</li><li>Dark-mode CSS and an images-off simulation across all three emails.</li><li>Native Figma text bounds and a CTA label override.</li></ul><p className="dm-case-small">Gmail, Apple Mail, Outlook, screen-reader testing, ESP processing, and actual sends are outside the current verification. Preview links return to this case and do not change a subscription.</p></div></div>
          <div className="dm-case-actions"><a className="dm-case-button" href={download('DAYMARK_Email_Source.zip')} download><Download size={17} aria-hidden="true" /> Download HTML source</a><a href={download('DAYMARK_Email_Design.pdf')} download className="dm-case-download-link"><Download size={16} aria-hidden="true" /> Design review PDF</a><ExternalLink href={figmaUrl}>Figma project</ExternalLink></div>
          <details className="dm-case-references"><summary>Compatibility notes & references</summary><p>Dark-mode support varies by email client. The preview demonstrates intended CSS behavior. Final markup size can change after an ESP adds tracking and substitutions.</p><p><a href="https://templates.mailchimp.com/development/css/client-specific-styles/" target="_blank" rel="noopener noreferrer">Mailchimp: client-specific styles</a> · <a href="https://mailchimp.com/help/gmail-is-clipping-my-email/" target="_blank" rel="noopener noreferrer">Mailchimp: Gmail clipping</a> · <a href="https://www.caniemail.com/features/css-at-media-prefers-color-scheme/" target="_blank" rel="noopener noreferrer">Can I Email: dark-mode media query</a></p></details>
        </div>
      </section>
      <footer className="dm-case-wrap dm-case-footer"><p>DAYMARK / Coffee for your everyday.</p><Link to="/works/product-design"><ArrowLeft size={16} aria-hidden="true" /> Back to Product Design</Link></footer>
    </main>
  )
}
