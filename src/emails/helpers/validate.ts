import { Schema, ZodError, z } from "zod";
import ValidationError from "./validation-error";

type ValidateParams<TSchema extends Schema> = {
  schema: TSchema;
  data: Record<string, unknown>;
};

export const validate = <TSchema extends Schema = Schema>(
  params: ValidateParams<TSchema>
): z.infer<TSchema> => {
  const { schema, data } = params;

  try {
    const result = schema.parse(data);

    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = error.issues.map((issue) => {
        return {
          key: issue.path.join(".") || issue.code,
          message: issue.message,
        };
      });

      throw new ValidationError(errorDetails);
    }
    throw error;
  }
};
