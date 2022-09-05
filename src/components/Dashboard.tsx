import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../styles/style'
import Content from "../helpers/Content"


function Dashboard() {
    const schema = yup.object({}).shape({
        fullname: yup.string().required('your full name is required'),
        email: yup.string().email('wrong email'),
        age: yup.number().max(100).positive().integer().min(18).required('your age is required').typeError('a number is required'),
        password: yup.string().min(4).max(20).required('your password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords don\'t match').required('your password confirmation is required'),
        haveEmail: yup.bool()
    })


    type IFormInput = yup.InferType<typeof schema>

    const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        await new Promise(async (resolve) => {
            await setTimeout(() => {
                if (data.haveEmail) {
                    console.log(data)
                } else {
                    console.log(data)
                }
                resolve(undefined)
            }, 3000)
        })
    }

    const haveEmail = watch('haveEmail')

    return (
        <Content title={'Dashboard'} >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle.form}>
                <div className="col-span-4">
                    <label className={styles.formStyle.label}>Full name</label>
                    <input className={styles.formStyle.input} type="text" placeholder='Full name...' {...register('fullname')} disabled={isSubmitting} />
                    <p className={styles.formStyle.p}>{errors.fullname?.message}</p>
                </div>
                <div className="col-span-2">
                    <label className={styles.formStyle.label}>Age</label>
                    <input className={styles.formStyle.input} type="number" placeholder='Age...' {...register('age')} disabled={isSubmitting} />
                    <p className={styles.formStyle.p}>{errors.age?.message}</p>
                </div>
                <div className="col-span-6 flex items-center gap-1">
                    <input className={styles.formStyle.checkbox} type="checkbox" {...register('haveEmail')} disabled={isSubmitting} />
                    <label className={styles.formStyle.label}>Have an email?</label>
                </div>
                {haveEmail &&
                    <div className="col-span-6">
                        <label className={styles.formStyle.label}>Email</label>
                        <input className={styles.formStyle.input} type="text" placeholder='Email...'
                            {...register('email', { shouldUnregister: true })} disabled={isSubmitting} />
                        <p className={styles.formStyle.p}>{errors.email?.message}</p>
                    </div>
                }
                <div className="col-span-6">
                    <label className={styles.formStyle.label}>Password</label>
                    <input className={styles.formStyle.input} type="password" placeholder='Password...' {...register('password')} disabled={isSubmitting} />
                    <p className={styles.formStyle.p}>{errors.password?.message}</p>
                </div>
                <div className="col-span-6">
                    <label className={styles.formStyle.label}>Confirm password</label>
                    <input className={styles.formStyle.input} type="password" placeholder='Confirm password...' {...register('confirmPassword')} disabled={isSubmitting} />
                    <p className={styles.formStyle.p}>{errors.confirmPassword?.message}</p>
                </div>
                <button type="submit" className={styles.formStyle.button}>Send</button>
            </form>
        </Content>
    )
}

export default Dashboard