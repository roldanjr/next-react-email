import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { QueryParamTypeProps } from "../schemas/query-param-type.schema";
import ValidationError from "./validation-error";
import { Schema } from "zod";
import { validate } from "./validate";

type WithResponseTypesParams = {
  template: {
    JSX: any;
    props: unknown;
  };
  schema: Schema;
} & QueryParamTypeProps;

export const withResponseTypes = (
  req: Request,
  { schema, type, template: { JSX, props } }: WithResponseTypesParams
) => {
  try {
    const { searchParams } = new URL(req.url);

    const params = validate({
      schema,
      data: Object.fromEntries(searchParams),
    });

    const template = JSX(props);

    const text = render(template, {
      plainText: true,
    });
    const html = render(template);

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
};
