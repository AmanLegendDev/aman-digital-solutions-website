function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: unknown) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "";
  }

  return `
    <tr>
      <td style="
        padding:13px 0;
        width:160px;
        color:#737373;
        font-size:12px;
        border-bottom:1px solid #eeeeee;
        vertical-align:top;
      ">
        ${escapeHtml(label)}
      </td>

      <td style="
        padding:13px 0;
        color:#171717;
        font-size:14px;
        font-weight:600;
        border-bottom:1px solid #eeeeee;
        vertical-align:top;
      ">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function listItems(
  items: string[],
) {
  if (!items?.length) {
    return `
      <span style="color:#999999;">
        None specified
      </span>
    `;
  }

  return items
    .map(
      (item) => `
        <span style="
          display:inline-block;
          margin:0 6px 6px 0;
          padding:7px 10px;
          border-radius:999px;
          background:#f5f5f5;
          border:1px solid #e8e8e8;
          color:#333333;
          font-size:11px;
        ">
          ${escapeHtml(item)}
        </span>
      `,
    )
    .join("");
}

export type ProjectRequestEmailData = {
  requestId: string;

  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  location: string;
  currentWebsite?: string;

  preferredContactMethod: string;

  projectType: string;
  projectDescription: string;

  serviceNames: string[];

  requiredPages: string[];
  requiredFeatures: string[];

  timeline: string;
  budgetRange: string;

  createdAt?: Date | string;
};

export function projectRequestEmail(
  data: ProjectRequestEmailData,
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
  background:#f4f4f4;
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
    max-width:680px;
    background:#ffffff;
    border:1px solid #e7e7e7;
    border-radius:22px;
    overflow:hidden;
  "
>

<tr>
<td style="
  padding:32px;
  background:#080808;
">

  <div style="
    color:#ffffff;
    font-size:21px;
    font-weight:700;
  ">
    Aman Digital Solutions
  </div>

  <div style="
    margin-top:7px;
    color:#FFC400;
    font-size:11px;
    font-weight:700;
    letter-spacing:1.4px;
    text-transform:uppercase;
  ">
    New Project Request
  </div>

</td>
</tr>

<tr>
<td style="padding:32px;">

  <div style="
    display:inline-block;
    padding:7px 11px;
    border-radius:999px;
    background:#fff8d9;
    color:#8a6800;
    font-size:10px;
    font-weight:700;
  ">
    NEW PROJECT
  </div>

  <h1 style="
    margin:18px 0 8px;
    color:#111111;
    font-size:26px;
  ">
    ${escapeHtml(data.fullName)}
    wants to build something.
  </h1>

  <p style="
    margin:0 0 25px;
    color:#777777;
    font-size:13px;
  ">
    Request ID:
    <strong style="color:#111111;">
      ${escapeHtml(data.requestId)}
    </strong>
  </p>

  <!-- CLIENT -->

  <div style="
    margin-bottom:26px;
    padding:20px;
    border-radius:16px;
    background:#fafafa;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Client details
    </div>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", data.fullName)}
      ${row("Company", data.companyName)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Location", data.location)}
      ${row("Website", data.currentWebsite)}
      ${row(
        "Preferred contact",
        data.preferredContactMethod,
      )}
    </table>

  </div>

  <!-- PROJECT -->

  <div style="
    margin-bottom:26px;
    padding:20px;
    border-radius:16px;
    background:#fafafa;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Project requirements
    </div>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${row(
        "Project type",
        data.projectType,
      )}

      ${row(
        "Timeline",
        data.timeline,
      )}

      ${row(
        "Budget",
        data.budgetRange,
      )}

      ${row(
        "Received",
        date,
      )}
    </table>

  </div>

  <!-- SERVICES -->

  <div style="
    margin-bottom:26px;
    padding:20px;
    border-radius:16px;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Selected services
    </div>

    ${listItems(data.serviceNames)}

  </div>

  <!-- PAGES -->

  <div style="
    margin-bottom:26px;
    padding:20px;
    border-radius:16px;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Required pages
    </div>

    ${listItems(data.requiredPages)}

  </div>

  <!-- FEATURES -->

  <div style="
    margin-bottom:26px;
    padding:20px;
    border-radius:16px;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Required features
    </div>

    ${listItems(data.requiredFeatures)}

  </div>

  <!-- DESCRIPTION -->

  <div style="
    padding:22px;
    border-radius:16px;
    background:#080808;
  ">

    <div style="
      color:#FFC400;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Project description
    </div>

    <div style="
      margin-top:12px;
      color:#dddddd;
      font-size:14px;
      line-height:1.8;
      white-space:pre-wrap;
    ">
      ${escapeHtml(data.projectDescription)}
    </div>

  </div>

  <div style="margin-top:28px;">

    <a
      href="mailto:${encodeURIComponent(data.email)}"
      style="
        display:inline-block;
        padding:13px 20px;
        border-radius:999px;
        background:#FFC400;
        color:#000000;
        text-decoration:none;
        font-size:13px;
        font-weight:700;
      "
    >
      Contact ${escapeHtml(data.fullName)}
    </a>

  </div>

</td>
</tr>

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
  Project request notification
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