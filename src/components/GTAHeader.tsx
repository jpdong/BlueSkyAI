import React from "react";

export const GTAHeader = () => {
    return <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-xl font-bold">GTA AI</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Price</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
        </div>

        <button
            className="bg-linear-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            Register
        </button>
    </nav>
}