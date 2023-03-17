import { z } from 'zod'

const buyProductSchema = async (props: Object) => {
  const obj: any = z.object({
    code_product: z.string().min(25, { message: "Field {code_product} must contain to min 25 characters." })
    .max(25, { message: "Field {code_product} must contain to max 25 characters." }),
    amount: z.number().min(1, {message: "Field {amount} must contain to min 1 characters."})
  }).safeParse(props);

  if (!obj.success) {
    obj.error.issues;
  }

  return obj

}

export { buyProductSchema }