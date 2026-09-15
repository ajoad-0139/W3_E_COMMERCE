import FeaturedCardContainer from "./featured_card_container"

const getFeaturedProducts = async()=>{
     try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products?offset=8&limit=15")
        const products = await response.json();
        console.log(products)
        return products;
    } catch (error) {

        console.error("Failed to fetch hero products:", error);
        throw error;
    }
}


const Featured = async() => {
    const products = await getFeaturedProducts();
  return (
    <div className="w-full h-[450px] bg-[#ffae66] rounded-xl mt-12 flex">
        <div className="flex-1 h-full flex pl-[10%] flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Featured Products</h1>
            <p className="max-w-[60%]">Take a look at some inspiring tips and ideas to make play, study and work spaces really work for everyone in the family – big or small!</p>
        </div>
        <div className="flex-3 min-w-0  h-full flex items-center justify-center pr-[80px]">
            <FeaturedCardContainer Products={products}/>
        </div>
    </div>
  )
}

export default Featured