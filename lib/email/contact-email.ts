function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: unknown) {
  const safeValue = escapeHtml(value);

  if (!safeValue) return "";

  return `
    <tr>
      <td style="
        padding:14px 0;
        width:145px;
        color:#737373;
        font-size:13px;
        vertical-align:top;
        border-bottom:1px solid #eeeeee;
      ">
        ${escapeHtml(label)}
      </td>

      <td style="
        padding:14px 0;
        color:#171717;
        font-size:14px;
        font-weight:600;
        vertical-align:top;
        border-bottom:1px solid #eeeeee;
      ">
        ${safeValue}
      </td>
    </tr>
  `;
}

export type ContactEmailData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt?: Date | string;
};

export function contactEnquiryEmail(
  data: ContactEmailData,
) {
  const date = data.createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(data.createdAt))
    : "Just now";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</head>

<body style="
  margin:0;
  padding:0;
  background:#f5f5f5;
  font-family:Arial,Helvetica,sans-serif;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="padding:40px 16px;"
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:640px;
    background:#ffffff;
    border-radius:22px;
    overflow:hidden;
    border:1px solid #e8e8e8;
  "
>

<!-- HEADER -->

<tr>
<td style="
  padding:30px 32px;
  background:#080808;
">

  <div style="
    font-size:21px;
    font-weight:700;
    color:#ffffff;
  ">
    Aman Digital Solutions
  </div>

  <div style="
    margin-top:7px;
    font-size:12px;
    color:#FFC400;
    letter-spacing:1px;
    text-transform:uppercase;
  ">
    New Contact Enquiry
  </div>

</td>
</tr>

<!-- CONTENT -->

<tr>
<td style="padding:32px;">

  <div style="
    display:inline-block;
    padding:7px 11px;
    border-radius:999px;
    background:#fff8d9;
    color:#8a6800;
    font-size:11px;
    font-weight:700;
  ">
    NEW LEAD
  </div>

  <h1 style="
    margin:18px 0 8px;
    font-size:25px;
    color:#111111;
  ">
    Someone wants to talk.
  </h1>

  <p style="
    margin:0 0 26px;
    color:#737373;
    font-size:14px;
    line-height:1.6;
  ">
    A new enquiry has been submitted through
    your website.
  </p>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
  >
    ${row("Name", data.name)}
    ${row("Email", data.email)}
    ${row("Phone / WhatsApp", data.phone)}
    ${row("Company", data.company)}
    ${row("Service", data.service)}
    ${row("Budget", data.budget)}
    ${row("Received", date)}
  </table>

  <div style="
    margin-top:28px;
    padding:20px;
    border-radius:16px;
    background:#fafafa;
    border:1px solid #eeeeee;
  ">

    <div style="
      font-size:10px;
      font-weight:700;
      color:#999999;
      text-transform:uppercase;
      letter-spacing:1.5px;
    ">
      Project message
    </div>

    <div style="
      margin-top:10px;
      color:#333333;
      font-size:14px;
      line-height:1.7;
      white-space:pre-wrap;
    ">
      ${escapeHtml(data.message)}
    </div>

  </div>

  ${
    data.email
      ? `
  <a
    href="mailto:${encodeURIComponent(data.email)}"
    style="
      display:inline-block;
      margin-top:28px;
      padding:13px 20px;
      border-radius:999px;
      background:#FFC400;
      color:#000000;
      text-decoration:none;
      font-size:13px;
      font-weight:700;
    "
  >
    Reply to ${escapeHtml(data.name)}
  </a>
  `
      : ""
  }

</td>
</tr>

<!-- FOOTER -->

<tr>
<td style="
  padding:22px 32px;
  background:#fafafa;
  border-top:1px solid #eeeeee;
  color:#999999;
  font-size:11px;
  line-height:1.6;
">
  Aman Digital Solutions<br />
  New website contact notification
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}