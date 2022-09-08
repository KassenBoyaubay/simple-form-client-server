import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import styles from '../styles/style'
import Content from "../helpers/Content"
import { IFormInput, schema } from "../interfaces/dashboard"
import { useMutation } from 'react-query'
import { deleteDashboard, submitDashboard } from '../api/dashboard'
import { useState } from "react"
import {
    ColumnDef,
    ColumnOrderState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const defaultColumns: ColumnDef<IFormInput>[] = [
    {
        header: 'Your submitted form info',
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: 'fullname',
                header: 'Full Name',
                cell: info => info.getValue()
            },
            {
                accessorKey: 'age',
                header: 'Age',
                cell: info => info.getValue()
            },
            {
                accessorKey: 'email',
                header: 'Email',
                cell: info => info.getValue()
            },
            {
                accessorKey: 'password',
                header: 'Password',
                cell: info => info.getValue()
            },
        ]
    }
]

function Dashboard() {
    const [showTable, setShowTable] = useState(false)
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch, reset } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState<IFormInput[]>([])
    const [columns] = useState(() => [...defaultColumns])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [formId, setFormId] = useState<number | null>(null)

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    const submitMutate = useMutation(submitDashboard, {
        onSuccess: (response) => {
            const { id, ...resData } = response.data
            setData([resData])
            setShowTable(true)
            setFormId(id)
            reset()
        },
    })

    const deleteMutate = useMutation(deleteDashboard, {
        onSuccess: () => {
            setShowTable(false)
            setData([])
            setFormId(null)
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        await submitMutate.mutate(data)
    }

    const goBack = async () => {
        formId && await deleteMutate.mutate(formId)
    }

    const haveEmail = watch('haveEmail')

    return (
        <Content title={'Dashboard'} >
            {!showTable ?
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
                :
                <form className={styles.formStyle.form}>
                    <div className="flex items-center gap-1 col-span-6">
                        <input className={styles.formStyle.checkbox}
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />
                        <label className={styles.formStyle.label}><span className="font-semibold">Toggle all</span></label>
                    </div>
                    {table.getAllLeafColumns().map(column =>
                        data[0].email ?
                            (
                                <div key={column.id} className="flex items-center gap-1 col-span-6">
                                    <input className={styles.formStyle.checkbox}
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />
                                    <label className={styles.formStyle.label}>{column.id}</label>
                                </div>
                            )
                            :
                            column.columnDef.header !== 'Email' &&
                            (
                                <div key={column.id} className="flex items-center gap-1 col-span-6">
                                    <input className={styles.formStyle.checkbox}
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />
                                    <label className={styles.formStyle.label}>{column.id}</label>
                                </div>
                            )

                    )}
                    <table className="col-span-6 border-2 border-primary text-center">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup, index) => (
                                <tr key={headerGroup.id} className={index == 0 ? 'text-primary text-2xl' : 'text-xl text-secondary'}>
                                    {headerGroup.headers.map(header =>
                                        data[0].email ? (
                                            <th key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        )
                                            :
                                            header.column.columnDef.header !== 'Email' &&
                                            (
                                                <th key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </th>
                                            )
                                    )}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="text-lg text-info">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell =>
                                        data[0].email ? (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ) :
                                            cell.column.columnDef.header !== 'Email' &&
                                            (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={goBack} className={styles.formStyle.button}>Go back</button>
                </form>
            }
        </Content>
    )
}

export default Dashboard