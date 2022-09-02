import React from 'react'

function Header(props: { title: string }) {
    return (
        <header className="bg-neutral max-w-7xl mx-auto my-10 rounded-md shadow-black shadow-sm px-2 py-6 sm:px-6 lg:px-8">
            <h1 className='font-["Kumbh_Sans"] text-3xl font-bold tracking-tight text-primary'>{props.title}</h1>
        </header>
    )
}

export default Header