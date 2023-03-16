import { z } from 'zod'

const setMoneySchema = async (props: Object) => {
  const obj: any = z.object({
    value: z.string().min(1, { message: "Enter the minimum allowed value, ex: [1,00]." })
    .max(7, { message: "Value limit exceeded." })
    .regex(/\,/g, {message: "Field {value} with format invalid, enter the format valid, ex: [100,00], [231,99], [1,99]"})
  }).safeParse(props);

  if (!obj.success) {
    obj.error.issues;
  }

  return obj

}

export { setMoneySchema }