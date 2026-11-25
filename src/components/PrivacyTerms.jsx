import Logo from './Logo';
export default function PrivacyTerms({ page = 'privacy' }) {
  const s = {
    page: {
      minHeight: '100vh', background: 'var(--cream)',
      fontFamily: "var(--font-body)", color: 'var(--ink)',
      padding: 'clamp(24px, 5%, 80px)',
    },
    inner: { maxWidth: 720, margin: '0 auto', paddingTop: 100, paddingBottom: 80 },
    h1: {
      fontFamily: "var(--font-display)", fontSize: 'clamp(2rem, 5vw, 3rem)',
      letterSpacing: '-0.03em', fontWeight: 600, marginBottom: 8,
    },
    h2: {
      fontFamily: "var(--font-display)", fontSize: '1.25rem',
      letterSpacing: '-0.02em', fontWeight: 600, marginTop: 48, marginBottom: 16,
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
      fontFamily: "var(--font-mono)", fontSize: 12,
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
        <div style={{ marginBottom: 48 }}><Logo href="/" /></div>
        <a href="/" style={s.back}>&#8592; Back to site</a>

        {page === 'privacy' && (<>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 40 }}>
          Last updated: November 25, 2026
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
          Booking requests (project description and contact) are stored in our access-restricted database (Upstash Redis, via Vercel) and delivered to our Telegram for order management. Only the site owner can view them. We do not keep any other client data.
        </p>

        <h2 style={s.h2}>Cookies</h2>
        <p style={s.p}>
          We use one essential cookie to keep the site owner signed in to the admin panel, and your browser's local storage to remember your language and cookie choice. Anonymous, cookieless analytics (Vercel Analytics) help us understand traffic. We do not use advertising or tracking cookies.
        </p>

        <h2 style={s.h2}>Third-Party Services</h2>
        <p style={s.p}>
          We use Vercel (hosting and analytics), Upstash (order storage), Telegram Bot API (order notifications) and Google Sign-In (admin access only). These services are governed by their own privacy policies.
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
          <a href="mailto:dupcamen@gmail.com" style={s.link}>dupcamen@gmail.com</a>.
        </p>

        </>)}

        {page === 'terms' && (<>
        <h1 style={s.h1}>Terms of Service</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 40 }}>
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
          <a href="mailto:dupcamen@gmail.com" style={s.link}>dupcamen@gmail.com</a>.
        </p>
        </>)}

        <hr style={s.hr} />
        <p style={s.p}>
          {page === 'privacy' ? <a href="/terms" style={s.link}>Terms of Service →</a> : <a href="/privacy" style={s.link}>Privacy Policy →</a>}
        </p>
      </div>
    </div>
  );
}
