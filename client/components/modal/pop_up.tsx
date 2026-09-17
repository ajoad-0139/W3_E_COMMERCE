'use client'
import { Toaster } from "sonner"

const PopUp = () => {
  return (
    <>
      <Toaster richColors expand={false} visibleToasts={3} position='bottom-center'/>
    </>
  )
}

export default PopUp