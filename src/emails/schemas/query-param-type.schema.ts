import * as z from "zod";

const TYPES = ["json", "html", "preview"] as const;

const queryParamTypeSchema = z.object({
  type: z.enum(TYPES),
});

export type QueryParamTypeProps = z.infer<typeof queryParamTypeSchema>;

export default queryParamTypeSchema;
