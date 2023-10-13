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

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  switch (type) {
    case "html":
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    case "file":
      return new Response(html, {
        headers: {
          "Content-Disposition":
            "attachment; filename=vercel-invite-user.html",
        },
      });
    case "json":
      return NextResponse.json({ text, html });
  }
}
