import React from 'react'
import Theme from '../hooks/Theme'

function Nav() {
    return (
        <nav className="bg-neutral mx-auto w-full px-2 sm:px-6 lg:px-8 py-4 shadow-md shadow-primary">
            <div className='max-w-7xl flex justify-between items-center mx-auto'>
                <h1 className='font-["Lobster"] text-5xl text-secondary'>Form</h1>
                <h2 className='font-["Kumbh_Sans"] text-2xl text-primary'>simple-form-client-server</h2>
                <Theme />
            </div>
        </nav>

    )
}

export default Nav