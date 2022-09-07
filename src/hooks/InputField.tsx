import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from "react-query";
import * as yup from 'yup'
import styles from "../styles/style"
import { postTodo } from '../api/helper';

const InputField = () => {
    const queryClient = useQueryClient()

    const schema = yup.object({}).shape({
        todo: yup.string().ensure().required('please enter a todo'),
    })


    type IToDo = yup.InferType<typeof schema>

    const { register, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm<IToDo>({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation(postTodo, {
        onSuccess: () => {
            reset()
            queryClient.invalidateQueries('todos')
        },
    })

    const onSubmit: SubmitHandler<IToDo> = async data => {
        await mutation.mutateAsync(data.todo)
    }

    return (
        <form className={styles.formStyle.form} onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-6">
                <label className={styles.formStyle.label}>Enter a task</label>
                <div className="w-full relative">
                    <input type="input" placeholder='Enter a task...' className={styles.formStyle.input} {...register('todo')} disabled={isSubmitting} />
                    <button type='submit' className='absolute min-h-0 h-full w-auto rounded-sm top-0 right-0 font-sans cursor-pointer btn btn-accent text-lg' disabled={isSubmitting}>Go</button>
                </div>
                <p className={styles.formStyle.p}>{errors.todo?.message}</p>
                {mutation.isError &&
                    <p className={styles.formStyle.p}>{mutation.error instanceof Error && mutation.error.message}</p>
                }
            </div>
        </form>
    )
}

export default InputField