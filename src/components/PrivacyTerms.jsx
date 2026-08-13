export default function PrivacyTerms() {
  const s = {
    page: {
      minHeight: '100vh', background: 'var(--cream)',
      fontFamily: "'Geist', sans-serif", color: 'var(--ink)',
      padding: 'clamp(24px, 5%, 80px)',
    },
    inner: { maxWidth: 720, margin: '0 auto', paddingTop: 100, paddingBottom: 80 },
    h1: {
      fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)',
      textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 8,
    },
    h2: {
      fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.25rem',
      textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: 48, marginBottom: 16,
      color: 'var(--ink)',
    },
    p: {
      fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink)',
      marginBottom: 16, opacity: 0.85,
    },
    link: {
      color: 'var(--ink)', textDecoration: 'none',
    },
    back: {
      fontFamily: "'Geist Mono', monospace", fontSize: 12,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--ink)', textDecoration: 'none',
      display: 'inline-block', marginBottom: 40,
    },
    hr: {
      border: 'none', borderTop: '1px solid var(--sienna)',
      opacity: 0.3, margin: '48px 0',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <a href="#/" style={s.back}>&#8592; Back to site</a>

        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 40 }}>
          Last updated: July 17, 2026
        </p>

        <p style={s.p}>
          MillionPixels.DEV ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
        </p>

        <h2 style={s.h2}>Information We Collect</h2>
        <p style={s.p}>
          When you submit a booking request, we collect your project description and contact information (email or Telegram handle). We also use Google Authentication to verify your identity when you sign in to the admin panel.
        </p>

        <h2 style={s.h2}>How We Use Your Information</h2>
        <p style={s.p}>
          We use your information solely to review your project request and communicate with you about your potential engagement. We do not sell, trade, or transfer your personal information to third parties.
        </p>

        <h2 style={s.h2}>Data Storage</h2>
        <p style={s.p}>
          Your data is stored locally in your browser (localStorage) and, when configured, sent to our Telegram bot for internal order management. We do not operate persistent databases or cloud storage for client data.
        </p>

        <h2 style={s.h2}>Cookies</h2>
        <p style={s.p}>
          Our website uses essential cookies to maintain your session and preferences. We do not use advertising or tracking cookies.
        </p>

        <h2 style={s.h2}>Third-Party Services</h2>
        <p style={s.p}>
          We use Google Authentication for sign-in and Telegram Bot API for order notifications. These services are governed by their own privacy policies.
        </p>

        <h2 style={s.h2}>Data Security</h2>
        <p style={s.p}>
          We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 style={s.h2}>Your Rights</h2>
        <p style={s.p}>
          You may request access to, correction of, or deletion of your personal data at any time by contacting us at the email below.
        </p>

        <h2 style={s.h2}>Changes to This Policy</h2>
        <p style={s.p}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
        </p>

        <h2 style={s.h2}>Contact</h2>
        <p style={s.p}>
          If you have questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:hello@millionpixels.dev" style={s.link}>hello@millionpixels.dev</a>.
        </p>

        <hr style={s.hr} />

        <h1 style={s.h1}>Terms of Service</h1>
        <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 40 }}>
          Last updated: July 17, 2026
        </p>

        <p style={s.p}>
          By using the MillionPixels.DEV website and services, you agree to the following terms and conditions.
        </p>

        <h2 style={s.h2}>Services</h2>
        <p style={s.p}>
          MillionPixels.DEV provides a 7-day website development and SEO service. We build and deliver a working website with SEO set up, live on the internet, within seven calendar days of engagement.
        </p>

        <h2 style={s.h2}>Booking and Payment</h2>
        <p style={s.p}>
          Submitting a booking request does not guarantee availability. All engagements are subject to mutual agreement and payment confirmation.
        </p>

        <h2 style={s.h2}>Deliverables</h2>
        <p style={s.p}>
          Upon completion, you receive a deployed, working website and full ownership of the source code. The deliverables include the codebase, deployment, and any configured integrations as agreed during the booking process.
        </p>

        <h2 style={s.h2}>Intellectual Property</h2>
        <p style={s.p}>
          Upon full payment, all intellectual property rights for the delivered product transfer to you. MillionPixels.DEV retains the right to showcase the project in its portfolio unless otherwise agreed in writing.
        </p>

        <h2 style={s.h2}>Limitation of Liability</h2>
        <p style={s.p}>
          MillionPixels.DEV shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the service.
        </p>

        <h2 style={s.h2}>Modifications</h2>
        <p style={s.p}>
          We reserve the right to modify these Terms of Service at any time. Continued use of our services constitutes acceptance of the updated terms.
        </p>

        <h2 style={s.h2}>Contact</h2>
        <p style={s.p}>
          For questions about these Terms, contact us at{' '}
          <a href="mailto:hello@millionpixels.dev" style={s.link}>hello@millionpixels.dev</a>.
        </p>
      </div>
    </div>
  );
}
