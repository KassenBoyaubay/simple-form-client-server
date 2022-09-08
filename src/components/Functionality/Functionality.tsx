import Content from '../../helpers/Content'

const Functionality = () => {
    return (
        <Content title={'Functionality'} >
            <div className='bg-neutral w-full rounded-md p-4 shadow-black shadow-sm grid grid-cols-6 gap-6 col-span-6 font-["Kumbh_Sans"]'>
                <div className="col-span-6 grid gap-3">
                    <h1 className='text-primary text-2xl'>Dashboard</h1>
                    <ul className='text-info text-xl grid gap-2'>
                        <li>Fill up the form. If you enter invalid input, it will show requirements for inputs.</li>
                        <li>After submitting the data will be stored in database and if successful, it will grab the data from back-end and show the table of what you entered. While data is being redirected inputs are disabled.</li>
                    </ul>
                </div>
                <div className="col-span-6 grid gap-3">
                    <h1 className='text-primary text-2xl'>Payment Tier</h1>
                    <ul className='text-info text-xl grid gap-2'>
                        <li>Same as Dashboard, choose a Payment Tier. Depending on the sale value it will show the percentage and price.</li>
                    </ul>
                </div>
                <div className="col-span-6 grid gap-3">
                    <h1 className='text-primary text-2xl'>Tasks</h1>
                    <ul className='text-info text-xl grid gap-2'>
                        <li>ToDo functionality. You can add a task by typing it in the input field. After, it will store in the database and then fetch the updated task and finally show it.</li>
                        <li>You can delete tasks, it will be deleted from the database.</li>
                        <li>You can drag and drop tasks. In order to mark task as a complete, simply drag task from left to right and vice versa.</li>
                    </ul>
                </div>
                <div className="col-span-6 grid gap-3">
                    <h1 className='text-primary text-2xl'>* You can also toggle theme by pressing button in the navigation menu on top</h1>
                </div>
            </div>
        </Content>
    )
}

export default Functionality