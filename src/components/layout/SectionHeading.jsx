import { Divider } from '@mui/material'
import React from 'react'

const SectionHeading = ({title,children,divider=true,mb}) => {
  return (
    <div className={mb}>
    <div className="w-full flex items-center justify-between gap-3 mb-3">
    <div
      className="font-semibold text-base text-[#262626] capitalize py-1 px-4 relative"
    >
      <div
        className="bg-[#0D3875] w-1 rounded-tr rounded-br absolute h-full top-0 left-0"
      ></div>
      {title}
    </div>
    <div className="flex gap-4 justify-end items-center">
      {children}
    </div>
  </div>
   {divider && (<Divider></Divider>) }

  </div>
  )
}

export default SectionHeading