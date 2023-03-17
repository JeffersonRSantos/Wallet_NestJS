import { z } from 'zod'

const cancellationProductSchema = async (props: Object) => {
  const obj: any = z.object({
    code_transaction: z.string().min(36, { message: "Field {code_transaction} must contain to min 36 characters." })
    .max(36, { message: "Field {code_transaction} must contain to max 36 characters." })
  }).safeParse(props);

  if (!obj.success) {
    obj.error.issues;
  }

  return obj

}

export { cancellationProductSchema }