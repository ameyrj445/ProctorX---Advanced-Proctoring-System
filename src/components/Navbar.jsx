import React from 'react'

export default function Navbar() {
    return (                  
        <nav className='flex items-center justify-between
        w-full
        bg-gradient-to-r from-blue-900 via-purple-900 to-blue-800
        shadow-lg border-b border-purple-700
        px-4 sm:px-6 md:px-8 py-3 md:py-4
        flex-wrap gap-4 sm:gap-6'>
            <div className='flex items-center gap-2 sm:gap-3'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <span className='text-white font-bold text-sm sm:text-lg'>P</span>
                </div>
                <h1 className='text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent truncate'>
                    ProcterX 
                </h1>     
            </div>                                                           
            <div className='flex gap-4 sm:gap-8 text-gray-200 text-xs sm:text-sm md:text-base'>
                <a href='#' className='hover:text-cyan-400 transition-colors duration-300 font-medium whitespace-nowrap'>Home</a>
                <a href='#' className='hover:text-cyan-400 transition-colors duration-300 font-medium whitespace-nowrap'>Demo</a>
                <a href='#' className='hover:text-cyan-400 transition-colors duration-300 font-medium whitespace-nowrap'>About</a>
            </div>
        </nav>
    )
}
