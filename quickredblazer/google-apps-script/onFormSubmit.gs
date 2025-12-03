/**
 * Apps Script for Google Form: onFormSubmit handler that emails the owner
 * and sends an acknowledgement to the respondent when possible.
 *
 * Usage:
 * 1. Open your Google Form while signed in as the account you want to send mail from
 *    (recommended: quickredtech@gmail.com).
 * 2. Extensions → Apps Script → create a new script file and paste this code.
 * 3. Save, authorize, then add a trigger: onFormSubmit -> From form -> On form submit.
 */

const OWNER_EMAIL = 'quickredtech@gmail.com';

function onFormSubmit(e) {
  const named = (e && e.namedValues) ? e.namedValues : {};

  // Determine respondent email.
  // If the form collects email addresses, try to use the response's respondent email.
  let respondentEmail = null;
  try {
    if (e && e.response && typeof e.response.getRespondentEmail === 'function') {
      respondentEmail = e.response.getRespondentEmail();
    }
  } catch (err) {
    // ignore
  }
  // Fallbacks for common field names in the form
  if (!respondentEmail && named['Email Address']) respondentEmail = named['Email Address'][0];
  if (!respondentEmail && named['Email']) respondentEmail = named['Email'][0];

  // Build plain-text and HTML summaries
  let bodyText = 'New form submission:\n\n';
  let bodyHtml = '<h2>New form submission</h2><ul>';
  for (let key in named) {
    const val = (named[key] || []).join(', ');
    bodyText += `${key}: ${val}\n`;
    bodyHtml += `<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(val)}</li>`;
  }
  bodyHtml += '</ul>';

  // Send notification to owner (replyTo set to respondent if available)
  const mailOptions = { htmlBody: bodyHtml };
  if (respondentEmail) mailOptions.replyTo = respondentEmail;

  GmailApp.sendEmail(OWNER_EMAIL, 'QuickRedTech — New form response', bodyText, mailOptions);

  // Send acknowledgement to respondent (if we have an email)
  if (respondentEmail) {
    const subj = 'QuickRedTech — We received your request';
    const respText = 'Thanks for contacting Quick Red Tech. We received your submission:\n\n' + bodyText;
    const respHtml = '<p>Thanks for contacting Quick Red Tech. We received your submission:</p>' + bodyHtml + '<p>We will respond shortly.</p>';
    GmailApp.sendEmail(respondentEmail, subj, respText, { htmlBody: respHtml });
  }
}

/** Simple HTML escaper */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
