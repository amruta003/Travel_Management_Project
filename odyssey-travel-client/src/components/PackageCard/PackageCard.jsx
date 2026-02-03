import React from 'react'

function PackageCard({ title, price, desc, img }) {
  return (
    <>
      <div
        // key={index}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
      >
        {/* Image */}
        <div className="h-56 w-full overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-blue-600 text-lg font-bold mt-2">{price}</p>

          <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">
            {desc}
          </p>

          <button className="mt-5 w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition">
            Book Now
          </button>
        </div>
      </div>
    </>
  )
}

export default PackageCard