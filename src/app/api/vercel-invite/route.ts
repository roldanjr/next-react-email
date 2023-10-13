import { NextResponse } from "next/server";
import { render } from "@react-email/render";

import VercelInviteUserEmail from "@/emails/templates/vercel-invite-user";

export async function GET(req: Request) {
  const template = VercelInviteUserEmail({
    username: "roldanjr",
    invitedByUsername: "kingdavidmartins",
    invitedByEmail: "kingdavidmartins@example.com",
    teamName: "PDAX Email Templates",
    inviteLink: "https://vercel.com/teams/invite/foo",
    inviteFromIp: "204.13.186.218",
    inviteFromLocation: "Davao City, Philippines",
  });

  const text = render(template, {
    plainText: true,
  });
  const html = render(template);

  return NextResponse.json({ text, html });
}
