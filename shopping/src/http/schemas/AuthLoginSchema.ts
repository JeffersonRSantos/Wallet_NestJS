import { z } from 'zod'

const authLoginSchema = async (props: Object) => {
  const obj: any = z.object({
    email: z.string().min(1, { message: "Field {email} with format invalid." }).email("E-mail invalid."),
    password: z.string().min(6, {message: "Field {password} must contain to min 6 caracters"})
  }).safeParse(props);

  if (!obj.success) {
    obj.error.issues;
  }

  return obj

}

export { authLoginSchema }