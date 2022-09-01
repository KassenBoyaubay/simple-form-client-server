import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

function Form() {
    const schema = yup.object({}).shape({
        fullname: yup.string().required('Your full name is required'),
        email: yup.string().email('wrong email').required('Your email is required'),
        age: yup.number().max(100).positive().integer().min(18).required('Your age is required').typeError('a number is required'),
        password: yup.string().min(4).max(20).required('Your password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords don\'t match').required('Your password confirmation is required'),
    })

    type IFormInput = yup.InferType<typeof schema>

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Full name...' {...register('fullname')} />
            <p>{errors.fullname?.message}</p>
            <input type="text" placeholder='Email...' {...register('email')} />
            <p>{errors.email?.message}</p>
            <input type="number" placeholder='Age...' {...register('age')} />
            <p>{errors.age?.message}</p>
            <input type="password" placeholder='Password...' {...register('password')} />
            <p>{errors.password?.message}</p>
            <input type="password" placeholder='Confirm password...' {...register('confirmPassword')} />
            <p>{errors.confirmPassword?.message}</p>
            <input type="submit" />
        </form>
    )
}

export default Form