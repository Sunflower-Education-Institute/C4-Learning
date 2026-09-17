const SHEET_NAME = "Resource Suggestions";
const HEADERS = [
  "submission_id",
  "submitted_at_utc",
  "status",
  "locale",
  "resource_name",
  "resource_url",
  "recommendation",
  "age_group",
  "subject",
  "recommender_name",
  "contact_email",
  "editorial_consent",
  "editor_notes"
];

function doPost(event) {
  try {
    const payload = parsePayload_(event);
    validatePayload_(payload);
    rejectSpam_(payload);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSuggestionSheet_();
      ensureHeaders_(sheet);
      sheet.appendRow([
        Utilities.getUuid(),
        new Date().toISOString(),
        "new",
        safeText_(payload.locale, 12),
        safeText_(payload.resourceName, 120),
        safeText_(payload.resourceUrl, 500),
        safeText_(payload.recommendation, 1500),
        safeText_(payload.ageGroup, 80),
        safeText_(payload.subject, 100),
        safeText_(payload.recommenderName, 100),
        safeText_(payload.contactEmail, 254),
        payload.editorialConsent === true,
        ""
      ]);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function parsePayload_(event) {
  if (!event || !event.parameter || !event.parameter.payload) throw new Error("Missing payload");
  return JSON.parse(event.parameter.payload);
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== "object") throw new Error("Invalid payload");
  if (payload.schemaVersion !== 1) throw new Error("Unsupported schema version");
  if (!String(payload.resourceName || "").trim()) throw new Error("Resource name is required");
  if (!String(payload.recommendation || "").trim()) throw new Error("Recommendation is required");
  if (String(payload.resourceName).length > 120) throw new Error("Resource name is too long");
  if (String(payload.recommendation).length > 1500) throw new Error("Recommendation is too long");
  if (payload.editorialConsent !== true) throw new Error("Editorial consent is required");

  const resourceUrl = String(payload.resourceUrl || "").trim();
  if (resourceUrl && !/^https?:\/\/[^\s]+$/i.test(resourceUrl)) throw new Error("Invalid resource URL");
  const contactEmail = String(payload.contactEmail || "").trim();
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) throw new Error("Invalid contact email");
}

function rejectSpam_(payload) {
  if (String(payload.organizationWebsite || "").trim()) throw new Error("Submission rejected");
  const fingerprint = [payload.resourceName, payload.resourceUrl, payload.contactEmail].join("|").toLowerCase();
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, fingerprint);
  const key = Utilities.base64EncodeWebSafe(digest).slice(0, 32);
  const cache = CacheService.getScriptCache();
  if (cache.get(key)) throw new Error("Please wait before submitting the same suggestion again");
  cache.put(key, "1", 21600);
}

function getSuggestionSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) throw new Error("Submission storage is not configured");
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
}

function safeText_(value, maximumLength) {
  const text = String(value || "").trim().slice(0, maximumLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
