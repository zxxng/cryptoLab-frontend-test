import React from 'react'

interface MenuBarProps {
  selectedMenu: string
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>
}

const MenuBar = ({ selectedMenu, setSelectedMenu }: MenuBarProps) => {
  const handleSelectedMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault
    const target = e.target as HTMLButtonElement
    setSelectedMenu(target.textContent as string)
  }

  return (
    <div className="font-suit text-2xl font-bold mt-9 mb-8">
      <button
        onClick={(e) => handleSelectedMenu(e)}
        className={`${selectedMenu === 'Movie List' ? 'text-blue-01' : 'text-gray-04'} hover:text-blue-01 mr-8`}
      >
        Movie List
      </button>
      <button
        onClick={(e) => handleSelectedMenu(e)}
        className={`${selectedMenu === 'My Favorite List' ? 'text-blue-01' : 'text-gray-04'} hover:text-blue-01`}
      >
        My Favorite List
      </button>
    </div>
  )
}

export default MenuBar
