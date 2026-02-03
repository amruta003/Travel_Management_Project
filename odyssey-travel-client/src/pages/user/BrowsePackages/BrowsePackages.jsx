import React from "react";
import useBrowsePackages from "./useBrowsePackages";
import { useNavigate } from "react-router-dom";
export default function BrowsePackages() {
    const {
        packages,
        loading
    } = useBrowsePackages();

    const location = useNavigate();
    const toBookingPage = (pkg) => {
        location(`/user/book-package/${pkg.packageId}`, { state: { package: pkg } });
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                        Discover Your Next <span className="text-blue-600">Adventure</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose from our hand-picked selection of premium holiday packages approved by our experts.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium">Finding best deals for you...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.length > 0 ? (
                            packages.map((pkg) => (
                                <div
                                    key={pkg.packageId}
                                    className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={`http://localhost:8080${pkg.imageUrl}`}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Explore+More' }}
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                {pkg.duration} Days
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body Section */}
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                            {pkg.destination}
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {pkg.title}
                                        </h2>

                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
                                            {pkg.description}
                                        </p>

                                        {/* Footer Section */}
                                        <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase">Starting from</span>
                                                <span className="text-2xl font-black text-gray-900 dark:text-white">₹{pkg.price}</span>
                                            </div>
                                            <button
                                                onClick={() => toBookingPage(pkg)}
                                                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:px-8"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full bg-white dark:bg-gray-800 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Packages Found</h2>
                                <p className="text-gray-500 dark:text-gray-400">We couldn't find any approved holiday packages at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
