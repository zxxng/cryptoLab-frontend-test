import React from 'react'

const MenuBar = () => {
  return (
    <div className="font-suit text-2xl font-bold mt-9 mb-8">
      <button className="text-gray-04 hover:text-blue-01 mr-8">
        Movie List
      </button>
      <button className="text-gray-04 hover:text-blue-01">
        My Favorite List
      </button>
    </div>
  )
}

export default MenuBar
