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
    <div id="featured-section" className="w-full h-auto lg:h-[450px] bg-[#ffae66] rounded-xl mt-12 flex flex-col lg:flex-row py-8 lg:py-0">
        <div className="w-full lg:flex-1 h-auto lg:h-full flex px-4 sm:px-8 lg:pl-[10%] flex-col items-start justify-center text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold mx-auto lg:mx-0 text-black">Featured Products</h1>
            <p className="max-w-full sm:max-w-[80%] lg:max-w-[60%] mt-2 lg:mt-0 mx-auto lg:mx-0 text-black">Take a look at some inspiring tips and ideas to make play, study and work spaces really work for everyone in the family – big or small!</p>
        </div>
        <div className="w-full lg:flex-3 min-w-0 h-auto lg:h-full flex items-center justify-center mt-6 lg:mt-0 px-4 sm:px-8 lg:pr-[80px] lg:pl-0">
            <FeaturedCardContainer Products={products}/>
        </div>
    </div>
  )
}

export default Featured