/**
 * securityAlerts.ts
 * ─────────────────────────────────────────────────────────────────
 * Sends breach notifications via:
 *   1. Email  — EmailJS (free, browser-native, no backend needed)
 *   2. SMS    — Africa's Talking free sandbox (Kenya numbers, no credit needed for sandbox)
 *              swap endpoint for prod Twilio/AT when ready
 *
 * Both calls are fire-and-forget; failures are logged but never
 * crash the security lockout itself.
 * ─────────────────────────────────────────────────────────────────
 */

export interface AlertPayload {
  attemptedUsername: string
  timestamp: string          // ISO string
  userAgent: string
  ipHint: string             // best-effort from public IP service
}

// ─── Contact details (yours) ─────────────────────────────────────────────────
const ALERT_EMAIL = 'bernadkarina75@gmail.com'
const ALERT_PHONE = '+254783479432'          // 0783479432 → E.164 for Kenya

// ─── EmailJS config ───────────────────────────────────────────────────────────
// After creating a free EmailJS account these come from:
//   Dashboard → Email Services → (your service) → Service ID
//   Dashboard → Email Templates  → (your template) → Template ID
//   Dashboard → Account → API Keys → Public Key
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? 'YOUR_PUBLIC_KEY'

// ─── Africa's Talking (SMS) config ───────────────────────────────────────────
// Free sandbox at https://account.africastalking.com/  (works with Kenyan numbers)
// In sandbox mode, username = 'sandbox', apiKey = your sandbox key
const AT_USERNAME = import.meta.env.VITE_AT_USERNAME ?? 'sandbox'
const AT_API_KEY  = import.meta.env.VITE_AT_API_KEY  ?? 'YOUR_AT_SANDBOX_KEY'

// ─── Try to get the visitor's approximate public IP ──────────────────────────
async function fetchPublicIp(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const { ip } = await res.json() as { ip: string }
    return ip
  } catch {
    return 'unknown'
  }
}

// ─── Build the payload ───────────────────────────────────────────────────────
export async function buildAlertPayload(username: string): Promise<AlertPayload> {
  const ip = await fetchPublicIp()
  return {
    attemptedUsername: username || '(blank)',
    timestamp: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    userAgent: navigator.userAgent,
    ipHint: ip,
  }
}

// ─── Send email via EmailJS ───────────────────────────────────────────────────
export async function sendEmailAlert(payload: AlertPayload): Promise<void> {
  const body = {
    service_id:  EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id:     EMAILJS_PUBLIC_KEY,
    template_params: {
      to_email:   ALERT_EMAIL,
      to_name:    'Bernad Karina',
      subject:    '🚨 SECURITY ALERT — Admin Login Blocked',
      event_type: 'Failed Login Lockout',
      username:   payload.attemptedUsername,
      timestamp:  payload.timestamp,
      ip:         payload.ipHint,
      user_agent: payload.userAgent,
      site_url:   window.location.origin,
    },
  }

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`EmailJS ${res.status}`)
    console.log('[SECURITY] Email alert sent ✓')
  } catch (err) {
    console.warn('[SECURITY] Email alert failed:', err)
  }
}

// ─── Send SMS via Africa's Talking ───────────────────────────────────────────
export async function sendSmsAlert(payload: AlertPayload): Promise<void> {
  const message =
    `🚨 SECURITY ALERT — Yvonne Admin\n` +
    `Login BLOCKED after 2 failed attempts.\n` +
    `Username tried: ${payload.attemptedUsername}\n` +
    `Time: ${payload.timestamp}\n` +
    `IP: ${payload.ipHint}\n` +
    `If this was you, dismiss. Otherwise change your password immediately.`

  const params = new URLSearchParams({
    username: AT_USERNAME,
    to:       ALERT_PHONE,
    message,
    from:     'YVONNE_ADM',
  })

  try {
    const res = await fetch('https://api.sandbox.africastalking.com/version1/messaging', {
      method:  'POST',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey':       AT_API_KEY,
      },
      body: params.toString(),
    })
    if (!res.ok) throw new Error(`AT ${res.status}`)
    console.log('[SECURITY] SMS alert sent ✓')
  } catch (err) {
    console.warn('[SECURITY] SMS alert failed:', err)
  }
}

// ─── Master alert dispatcher ─────────────────────────────────────────────────
export async function dispatchSecurityAlert(username: string): Promise<void> {
  const payload = await buildAlertPayload(username)
  // Fire both in parallel — neither blocks the lockout
  await Promise.allSettled([
    sendEmailAlert(payload),
    sendSmsAlert(payload),
  ])
}
