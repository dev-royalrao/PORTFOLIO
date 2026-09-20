/**
 * Contact form backend — Google Apps Script.
 * Appends each submission to a Google Sheet and emails you a copy. Free, no limits
 * worth worrying about (Gmail allows 100 emails/day; the Sheet is unlimited).
 *
 * SETUP
 *  1. Create a Google Sheet. Extensions -> Apps Script.
 *  2. Delete the placeholder code, paste this file in, and set NOTIFY_EMAIL below.
 *  3. Deploy -> New deployment -> type "Web app".
 *       Execute as:          Me
 *       Who has access:      Anyone          <- must be "Anyone", not "Anyone with Google account"
 *  4. Authorise when prompted (the "unverified app" warning is expected for your own
 *     script: Advanced -> Go to <project> (unsafe)).
 *  5. Copy the /exec URL it gives you into VITE_FORM_ENDPOINT.
 *
 * Re-deploy after any edit: Deploy -> Manage deployments -> pencil -> Version "New".
 * Editing the code alone does NOT update the live URL.
 */

const NOTIFY_EMAIL = 'royalrao.edu@gmail.com'
const SHEET_NAME = 'Enquiries'

function doPost(e) {
  try {
    const p = (e && e.parameter) || {}

    // Honeypot: real people never see this field, bots fill everything in.
    // Return ok so the bot thinks it worked and does not retry.
    if (p.company) return json({ ok: true })

    const name = String(p.name || '').trim()
    const email = String(p.email || '').trim()
    const message = String(p.message || '').trim()

    if (!name || !email || !message) {
      return json({ ok: false, error: 'Name, email and message are all required.' })
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'That email address does not look valid.' })
    }
    if (message.length > 5000) {
      return json({ ok: false, error: 'Message is too long.' })
    }

    sheet().appendRow([new Date(), name, email, message])

    // A failed notification must not lose the submission — the row is already saved.
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'Portfolio enquiry from ' + name,
        replyTo: email,
        body: name + ' <' + email + '>\n\n' + message,
      })
    } catch (mailErr) {
      console.error('notification failed: ' + mailErr)
    }

    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Something went wrong. Please email me instead.' })
  }
}

/** Visiting the /exec URL in a browser should not look broken. */
function doGet() {
  return json({ ok: true, info: 'Contact endpoint is live. POST to submit.' })
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let s = ss.getSheetByName(SHEET_NAME)
  if (!s) {
    s = ss.insertSheet(SHEET_NAME)
    s.appendRow(['Received', 'Name', 'Email', 'Message'])
    s.setFrozenRows(1)
  }
  return s
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

/** Run this once from the editor to check the Sheet write works before deploying. */
function selfTest() {
  const res = doPost({ parameter: { name: 'Test', email: 'test@example.com', message: 'Hello' } })
  const out = JSON.parse(res.getContent())
  if (!out.ok) throw new Error('selfTest failed: ' + out.error)
  console.log('OK — check the ' + SHEET_NAME + ' sheet for a "Test" row, then delete it.')
}
