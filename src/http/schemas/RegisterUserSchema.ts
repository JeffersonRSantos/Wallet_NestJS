import { z } from 'zod'

const registerUserSchema = async (props: Object) => {
  const obj: any = z.object({
    name: z.string().min(2, {message: "Field {name} must contain to min 2 caracters."}),
    email: z.string().min(1, { message: "Field {email} with format invalid." }).email("E-mail invalid."),
    password: z.string().min(6, {message: "Field {password} must contain to min 6 caracters"}),
    cpf: z.string().min(11, {message: "Field {cpf} must contain to min 11 caracters"}).optional(),
    cnpj: z.string().min(11, {message: "Field {cpf} must contain to min 14 caracters"}).optional()
  }).safeParse(props);

  if (!obj.success) {
    obj.error.issues;
  }

  return obj

}

export { registerUserSchema }