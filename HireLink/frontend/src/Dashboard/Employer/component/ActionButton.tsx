import React from 'react'


const ActionButton = ({className, label} : {className: string, label: string}) => {
  return (
    <button className={`${className} px-5 py-2 rounded-md cursor-pointer`}>{label}</button>
  )
}

export default ActionButton