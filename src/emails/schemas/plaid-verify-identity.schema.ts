import * as z from "zod";

const plaidVerifyIdentitySchema = z.object({
  code: z.string(),
});

export type PlaidVerifyIdentityProps = z.infer<
  typeof plaidVerifyIdentitySchema
>;

export default plaidVerifyIdentitySchema;
