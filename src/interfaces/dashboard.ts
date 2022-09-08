import * as yup from 'yup'

export const schema = yup.object({}).shape({
    fullname: yup.string().required('your full name is required'),
    email: yup.string().email('wrong email'),
    age: yup.number().max(100).positive().integer().min(18).required('your age is required').typeError('a number is required'),
    password: yup.string().min(4).max(20).required('your password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords don\'t match').required('your password confirmation is required'),
    haveEmail: yup.bool()
})


export type IFormInput = yup.InferType<typeof schema>