type ErrorDetails = {
  key?: string | number;
  message: string;
};

export default class ValidationError extends Error {
  public details: ErrorDetails[];

  constructor(details: ErrorDetails[]) {
    super();
    this.name = "ValidationError";
    this.message = "Invalid request payload.";
    this.details = details;
  }
}
