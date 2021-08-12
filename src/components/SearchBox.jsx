import React, { useState, useEffect } from 'react'

function SearchBox(props) {
    return (
        <div className="container mx-auto flex justify-center items-center mt-8 p-2 md:p-0">
            <div className="border border-gray-300 p-6 grid grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl">
                <div className="flex flex-col md:flex-row bg-gray-300 rounded-full">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="flex items-center p-2 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-blue-800 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input type="text" placeholder="Québec"
                                    className="bg-gray-300 max-w-full focus:outline-none text-gray-700" disabled />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <div className="flex items-center p-2 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-blue-800 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input type="text" placeholder="Montréal"
                                    className="bg-gray-300 max-w-full focus:outline-none text-gray-700 pl-1" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row  ">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="flex items-center p-2 bg-gray-300 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-blue-800 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <input type="text" placeholder={props.departureDate}
                                    className="bg-gray-300 max-w-full focus:outline-none text-gray-700 mr-2 pl-1" disabled />
                            </div>
                            <div className="flex items-center p-2 bg-gray-300 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-blue-800 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input type="text" placeholder="1 Adult"
                                    className="bg-gray-300 max-w-full focus:outline-none text-gray-700 pl-1" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 bg-blue-500 rounded-full">
                    <button className="bg-blue-500 text-white hover:bg-blue-400 rounded-full px-4 py-2 mx-0 outline-none focus:shadow-outline">One way</button>
                    <button className="bg-blue-500 text-white hover:bg-blue-400 rounded-full px-4 py-2 mx-0 outline-none focus:shadow-outline">Round Trip</button>
                    <button className="bg-blue-500 text-white hover:bg-blue-400 rounded-full px-4 py-2 mx-0 outline-none focus:shadow-outline">Multi City</button>
                </div>
                <div className="flex flex-col md:flex-row  ">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="flex items-center p-2 bg-gray-300 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-blue-800 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                <input type="text" placeholder="First Class"
                                    className="bg-gray-300 max-w-full focus:outline-none text-gray-700 mr-2 pl-1" disabled />
                            </div>
                            <button onClick={props.handleSearch} className="p-2 w-full border rounded-full bg-blue-500 text-white hover:bg-blue-400">Search</button>
                        </div>
                    </div>

                </div>
                <p className="text-sm text-gray-500">Inputs are disabled for demo purposes</p>
            </div>
        </div>
    )
}
export default SearchBox