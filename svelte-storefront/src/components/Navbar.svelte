<script>
    //@ts-nocheck
    export let productId;
    import Icon from 'svelte-icons-pack'
    import AiOutlineShoppingCart from "svelte-icons-pack/ai/AiOutlineShoppingCart";
    import AiOutlineHome from "svelte-icons-pack/ai/AiOutlineHome";
    import BsXLg from "svelte-icons-pack/bs/BsXLg";
</script>
  
<div class="">
    <div class="relative z-50 bg-white topNav w-full top-0 p-3">
        <div class="max-w-6xl relative flex mx-auto flex-col md:flex-row">
            <a href="#/" class="md:hidden absolute top-1 right-14">
                <div class="relative">
                    <div class="relative">
                        <Icon src="{AiOutlineShoppingCart}" />
                        {#if productId?.length >= 1}
                        <div
                        class="absolute px-1 bg-red-400 -top-1 -right-1 rounded-full border-2 border-white text-white"
                        id="cart"
                        style="font-size: 10px"
                        >
                        {productId?.length}
                        </div>
                        {/if}
                    </div>
                </div>
            </a>

            <div class="flex-grow hover:text-gray-700 font-bold text-xl">
                <a href="/">
                    <span>X Store</span>
                </a>
            </div>

            <div class="menu hidden items-center md:flex flex-col md:flex-row mt-5 md:mt-0 gap-16">
                <div class="flex flex-col md:flex-row gap-12 capitalize">                    
                    <div class="font-bold transform hover:scale-150 transition-transform cursor-pointer">
                        <a href="/products">
                            <Icon src="{BsXLg}" />
                        </a>
                    </div>
                    <div class="font-bold transform hover:scale-150 transition-transform cursor-pointer">
                        <a href="/">
                            <Icon src="{AiOutlineHome}" />
                        </a>
                    </div>
                    <div class="flex gap-12 transform hover:scale-150 transition-transform cursor-pointer">
                        <a href="#/" class="hidden md:block">
                            <div class="relative">
                                <Icon src="{AiOutlineShoppingCart}" />
                                {#if productId?.length >= 1}
                                    <div
                                        class="absolute px-1 bg-red-400 -top-1 -right-1 rounded-full border-2 border-white text-white"
                                        id="cart"
                                        style="font-size: 10px"
                                    >
                                        {productId?.length}
                                    </div>
                                {/if}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>