<script>  
    // @ts-nocheck
    import Navbar from "../../components/Navbar.svelte";
    import "../../app.css";
    import { getProducts } from "../../utility/shared";

    let products = {
        products : []
    };
    const productData = async () => {
        const data = await getProducts();
        console.log(data);
        products = data || { products : []};
        console.log(products, 'products')
    }

    $: productData()
  
    
</script>


<Navbar />
  
<div class="mt-40">
    <div class="flex">
        <div class="flex-grow text-4xl font-extrabold text-center">
            Best Qualities You Can Trust
        </div>
    </div>
    <div class="mx-auto h-full flex flex-wrap justify-center py-28 gap-10">
        {#if products}
            {#each products?.products as product, i}
            <div class="transform hover:scale-110 transition-transform cursor-pointer border-[1px] border-black hover:border-[#CFFA00]">
                    
                    <img class="w-[384px] h-[250px]" src={product.thumbnail} alt="" />
                    
                    <a href={`/products/${product.id}`} data-mdb-ripple="true" data-sveltekit-prefetch data-mdb-ripple-color="light" class=" z-[0] h-full w-full absolute top-0 opacity-0 hover:opacity-100 hover:bg-opacity-20 transition-opacity duration-300">
                        <div class="absolute bottom-0  bg-[#CFFA00] py-4 font-boldtext-[#6A7F00] text-xl w-full flex flex-col justify-center px-6">
                            <div class="">{product.title}</div>
                            <div class="">
                                &#8377; {product.variants[0].prices[0].amount / 100}
                            </div>
                        </div>						
                    </a>
            </div>
            {/each}
        {/if}
	</div>
</div>