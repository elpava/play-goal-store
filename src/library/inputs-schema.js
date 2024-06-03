import { z } from 'zod'
import { isOnlyAlphabet } from './helper-functions'

export const VALUES_WITHOUT_TRIMMING = ['firstName', 'lastName']
export const NUMBERS_LENGTH = { nationalId: 10, mobile: 11 }
export const PASSWORD_LENGTH = { min: 4, max: 32 }
export const ON_FOCUS_HIDDEN_ERRORS = {
  nationalId: true,
  email: true,
  mobile: true,
}

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'ایمیل ضروری است' })
    .email({ message: 'ایمیل نامعتبر است' }),
  password: z
    .string({ required_error: 'رمز عبور ضروری است' })
    .min(PASSWORD_LENGTH.min, { message: `حداقل ${PASSWORD_LENGTH.min} حرف` })
    .max(PASSWORD_LENGTH.max, { message: `حداکثر ${PASSWORD_LENGTH.max} حرف` }),
})

const passwordSchema = z
  .object({
    password: z
      .string({ required_error: 'رمز عبور ضروری است' })
      .min(PASSWORD_LENGTH.min, { message: `حداقل ${PASSWORD_LENGTH.min} حرف` })
      .max(PASSWORD_LENGTH.max, {
        message: `حداکثر ${PASSWORD_LENGTH.max} حرف`,
      }),
    confirmPassword: z
      .string({ required_error: 'تکرار رمز عبور ضروری است' })
      .min(PASSWORD_LENGTH.min, { message: `حداقل ${PASSWORD_LENGTH.min} حرف` })
      .max(PASSWORD_LENGTH.max, {
        message: `حداکثر ${PASSWORD_LENGTH.max} حرف`,
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'با رمز عبور مطابقت ندارد',
    path: ['confirmPassword'],
  })

const formSchema = z.object({
  firstName: z
    .string({ required_error: 'نام ضروری است' })
    .refine(value => isOnlyAlphabet(value), { message: 'عدد غیرمجاز است' }),
  lastName: z
    .string({ required_error: 'نام خانوادگی ضروری است' })
    .refine(value => isOnlyAlphabet(value), { message: 'عدد غیرمجاز است' }),
  nationalId: z
    .string({ required_error: 'کد ملی ضروری است' })
    .refine(value => value.length === NUMBERS_LENGTH.nationalId, {
      message: 'کد ملی نامعتبر است',
    }),
  email: z
    .string({ required_error: 'ایمیل ضروری است' })
    .email({ message: 'ایمیل نامعتبر است' }),
  mobile: z
    .string({ required_error: 'موبایل ضروری است' })
    .refine(value => value.length === NUMBERS_LENGTH.mobile, {
      message: 'شماره موبایل نامعتبر است',
    }),
})

export const signUpFormSchema = z.intersection(passwordSchema, formSchema)

const editFormSchema = z.object({
  firstName: z
    .string()
    .refine(value => isOnlyAlphabet(value), { message: 'عدد غیرمجاز است' }),
  lastName: z
    .string()
    .refine(value => isOnlyAlphabet(value), { message: 'عدد غیرمجاز است' }),
  mobile: z.string().refine(value => value.length === NUMBERS_LENGTH.mobile, {
    message: 'شماره موبایل نامعتبر است',
  }),
})

export const editProfileFormSchema = z.intersection(
  passwordSchema,
  editFormSchema,
)
