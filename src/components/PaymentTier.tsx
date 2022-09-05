import Content from '../helpers/Content'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../styles/style'
import { useState } from 'react'

function PaymentTier() {
    const TIERS = [
        {
            id: 'BRONZE',
            name: 'Bronze',
            description: 'Get average points',
            price: 0.99,
            sale: {
                percent: 100
            }
        },
        {
            id: 'SILVER',
            name: 'Silver',
            description: 'Get extra points',
            price: 4.99,
            sale: {
                percent: 50
            }
        },
        {
            id: 'GOLD',
            name: 'Gold',
            description: 'Get exclusive points and bonuses',
            price: 19.99,
        }
    ]

    const [tiers, setTiers] = useState(TIERS)

    const schema = yup.object({}).shape({
        email: yup.string().email('wrong email').required('your email is required'),
        accept: yup.bool().oneOf([true], 'the Terms of Service must be accepted'),
        tier: yup.string().required('please choose a payment tier')
    })

    type IFormInput = yup.InferType<typeof schema>

    const { register, formState: { errors, isSubmitting }, setValue, getValues, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        await new Promise(async (resolve) => {
            await setTimeout(() => {
                console.log(data)
                resolve(undefined)
            }, 3000)
        })
    }


    return (
        <Content title='Payment Tier'>
            { //isSubmitter?
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle.form}>
                    <div className="px-1 flex flex-col col-span-6 gap-3">
                        <h2 className='font-["Kumbh_Sans"] text-2xl font-bold tracking-tight text-secondary'>Become a member</h2>
                        <h3 className='font-["Kumbh_Sans"] text-lg text-info'>Become a member in just three easy steps. You can always edit
                            your membership later.</h3>
                    </div>
                    <div className="col-span-6">
                        <label className={styles.formStyle.label}>Email</label>
                        <input className={styles.formStyle.input} type="text" placeholder='Email...'
                            {...register('email')} disabled={isSubmitting} />
                        <p className={styles.formStyle.p}>{errors.email?.message}</p>
                    </div>
                    <div className="col-span-6">
                        <div className="flex items-center gap-1">
                            <input className={styles.formStyle.checkbox} type="checkbox" {...register('accept')} disabled={isSubmitting} />
                            <label className={styles.formStyle.label}>I accept the Terms of Service</label>
                        </div>
                        <p className={styles.formStyle.p}>{errors.accept?.message}</p>
                    </div>
                    <div className="col-span-6">
                        <label className={styles.formStyle.label}>Payment Tier</label>
                        <div className="flex flex-col gap-3 mt-1">
                            {tiers.map((tier) =>
                                <div key={tier.id} className='flex justify-between items-center p-2 border-2 border-accent rounded-md'>
                                    <div className="">
                                        <h3 className='font-["Kumbh_Sans"] text-2xl text-primary'>{tier.name}</h3>
                                        <p className='font-["Kumbh_Sans"] text-lg text-info'>{tier.description}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {tier.sale ?
                                            tier.sale.percent === 100 ?
                                                <label className='px-1 text-lg font-medium'>
                                                    <span className='text-primary mr-2'>FREE</span>
                                                    <span className='text-secondary line-through'>${tier.price}</span>
                                                </label>
                                                :
                                                <label className='px-1 text-lg font-medium'>
                                                    <span className='text-primary mr-2'>-{tier.sale.percent}%</span>
                                                    <span className='text-secondary mr-2 line-through'>${tier.price}</span>
                                                    <span className='text-secondary'>${parseFloat((tier.price * tier.sale.percent * 0.01).toFixed(2)) - 0.01}</span>
                                                </label>
                                            :
                                            <label className={styles.formStyle.label}>${tier.price}</label>
                                        }
                                        <input className={styles.formStyle.checkbox} type="checkbox" value={tier.id}
                                            checked={getValues('tier') === tier.id}
                                            onChange={(e) => setValue('tier', e.target.value, { shouldValidate: true })} disabled={isSubmitting} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className={styles.formStyle.p}>{errors.tier?.message}</p>
                    </div>
                    <button type="submit" className={styles.formStyle.button}>Send</button>
                </form>
            }
        </Content>
    )
}

export default PaymentTier