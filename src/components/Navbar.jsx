import React from 'react'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-between
        w-full
        bg-gradient-to-r from-blue-900 via-purple-900 to-blue-800
        shadow-lg border-b border-purple-700
        px-8 py-4'>
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center'>
                    <span className='text-white font-bold text-lg'>P</span>
                </div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                    ProcterX
                </h1>
            </div>
            <div className='flex gap-8 text-gray-200'>
                <a href='#' className='hover:text-cyan-400 transition-colors duration-300 font-medium'>Home</a>
                <a href='#' className='hover:text-cyan-400 transition-colors duration-300 font-medium'>Demo</a>
                <a href='#' className='hover:text-cyan-400 transition-colors duration-300 font-medium'>About</a>
            </div>
        </nav>
    )
}
