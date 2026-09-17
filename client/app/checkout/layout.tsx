const CheckoutLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-screen h-screen bg-background/10  pt-[130px] overflow-x-hidden">
        {children}
    </div>
  )
}

export default CheckoutLayout