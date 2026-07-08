export async function submitNetlifyForm(formName, fields) {
  const body = new URLSearchParams({ 'form-name': formName })
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue
    body.append(k, String(v))
  }
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}
