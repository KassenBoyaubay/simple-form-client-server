import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Header from "../components/Header"

const formStyle = {
    label: 'pl-1 block text-lg font-medium text-secondary',
    input: 'mt-1 block w-full rounded-md shadow-sm focus:ring focus:outline-none focus:ring-accent text-2xl p-1 text-accent',
    p: 'text-md mt-1 text-warning'
}

function Form() {
    const schema = yup.object({}).shape({
        fullname: yup.string().required('your full name is required'),
        email: yup.string().email('wrong email').required('your email is required'),
        age: yup.number().max(100).positive().integer().min(18).required('your age is required').typeError('a number is required'),
        password: yup.string().min(4).max(20).required('your password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords don\'t match').required('your password confirmation is required'),
    })

    type IFormInput = yup.InferType<typeof schema>

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data)
    }

    return (
        <>
            <Header title={'Dashboard'} />
            <div className="grid justify-items-center w-full max-w-7xl mx-auto grid-cols-4">
                <form onSubmit={handleSubmit(onSubmit)} className='bg-neutral rounded-md p-4 shadow-black shadow-sm grid grid-cols-6 gap-6 col-start-2 col-span-2 font-["Kumbh_Sans"]'>
                    <div className="col-span-4">
                        <label className={formStyle.label}>Full name</label>
                        <input className={formStyle.input} type="text" placeholder='Full name...' {...register('fullname')} />
                        <p className={formStyle.p}>{errors.fullname?.message}</p>
                    </div>
                    <div className="col-span-2">
                        <label className={formStyle.label}>Age</label>
                        <input className={formStyle.input} type="number" placeholder='Age...' {...register('age')} />
                        <p className={formStyle.p}>{errors.age?.message}</p>
                    </div>
                    <div className="col-span-6">
                        <label className={formStyle.label}>Email</label>
                        <input className={formStyle.input} type="text" placeholder='Email...' {...register('email')} />
                        <p className={formStyle.p}>{errors.email?.message}</p>
                    </div>
                    <div className="col-span-6">
                        <label className={formStyle.label}>Password</label>
                        <input className={formStyle.input} type="password" placeholder='Password...' {...register('password')} />
                        <p className={formStyle.p}>{errors.password?.message}</p>
                    </div>
                    <div className="col-span-6">
                        <label className={formStyle.label}>Confirm password</label>
                        <input className={formStyle.input} type="password" placeholder='Confirm password...' {...register('confirmPassword')} />
                        <p className={formStyle.p}>{errors.confirmPassword?.message}</p>
                    </div>
                    <button type="submit" className="font-sans col-start-2 col-span-4 cursor-pointer btn btn-accent text-xl">Send</button>
                </form>
            </div>
        </>
    )
}

export default Form