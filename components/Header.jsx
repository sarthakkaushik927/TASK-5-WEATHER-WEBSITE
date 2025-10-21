import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronDown, User, LogOut } from 'lucide-react';

const Header = ({ onSearch, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            onSearch(searchInput.trim());
            setSearchInput('');
        }
    };

    return (
        <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for a city..."
                    className="bg-[#1E213A]/80 backdrop-blur-sm border border-white/10 w-full pl-10 pr-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
            <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 bg-[#1E213A]/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                    <span className="text-white hidden sm:block">User Name</span>
                    <ChevronDown className="w-5 h-5 text-white" />
                </button>
                {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-2 w-48 bg-[#1E213A]/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-10">
                        <button onClick={onLogout} className="w-full flex items-center px-4 py-2 text-white hover:bg-white/10"><LogOut className="w-5 h-5 mr-2" /> Logout</button>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

export default Header;
