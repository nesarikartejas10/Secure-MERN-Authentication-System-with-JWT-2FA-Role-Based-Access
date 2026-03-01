import sanitize from "mongo-sanitize";

const validate = (schema) => (req, res, next) => {
  const sanitizedBody = sanitize(req.body);

  const validation = schema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;
    let firstErrorMessage = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "Validation Error",
        code: issue.code,
      }));

      firstErrorMessage = allErrors[0]?.message || "Validation Error";
    }

    return res.status(400).json({
      success: false,
      message: firstErrorMessage,
      errors: allErrors,
    });
  }

  req.validatedData = validation.data;
  next();
};

export default validate;
