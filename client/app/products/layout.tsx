import React from 'react'

const ProductLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full h-full pt-[134px] bg-background flex items-center justify-end pr-10'>
        <div className="w-[85%] flex items-start justify-start  gap-2">
                {children}
        </div>
    </div>
  )
}

export default ProductLayout