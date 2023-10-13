import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { validate } from "@/emails/helpers/validate";
import PlaidVerifyIdentityEmail from "@/emails/templates/plaid-verify-identity";
import queryParamTypeSchema from "@/emails/schemas/query-param-type.schema";
import plaidVerifyIdentitySchema from "@/emails/schemas/plaid-verify-identity.schema";
import ValidationError from "@/emails/helpers/validation-error";

const searchParamsSchema = queryParamTypeSchema.merge(
  plaidVerifyIdentitySchema
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const params = validate({
      schema: searchParamsSchema,
      data: Object.fromEntries(searchParams),
    });

    const template = PlaidVerifyIdentityEmail({
      code: params.code,
    });

    const text = render(template, {
      plainText: true,
    });
    const html = render(template);

    switch (params.type) {
      case "preview":
        return new Response(html, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      case "html":
        return new Response(html, {
          headers: {
            "Content-Disposition":
              "attachment; filename=plaid-verify-identity.html",
          },
        });
      case "json":
      default:
        return NextResponse.json({ text, html });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          error: {
            code: error.name,
            message: error.message,
            details: error.details,
          },
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: {
          code: "UNKNOWN_ERROR",
          message: "An unknown error occurred.",
        },
      },
      { status: 500 }
    );
  }
}
