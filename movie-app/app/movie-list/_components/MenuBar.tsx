import React from 'react'

const MenuBar = () => {
  return (
    <div className="font-suit text-2xl font-bold ">
      <button className="text-gray-04 hover:text-blue-01">Movie List</button>
      <button className="text-gray-04 hover:text-blue-01">
        My Favorite List
      </button>
    </div>
  )
}

export default MenuBar