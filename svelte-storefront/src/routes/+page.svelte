<script>
	//@ts-nocheck

	import Footer from "../components/Footer.svelte";
	import "../app.css";
	import Navbar from "../components/Navbar.svelte";
	import { writable, derived } from "svelte/store";
	import {onMount} from 'svelte';
  
	//export let data;
	import {getProducts} from '../utility/shared';
  
	let products;
	  const productData = async () => {
		  const data = await getProducts();
		  products = data;
		  console.log(products, 'products')
	  }
  
	$: productData()

	// for the image track. Any disadvantages of using onMount here?

	onMount(() => {
		// This code will run after the component has been mounted
		const track = document.getElementById("image-track");

		const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

		const handleOnUp = () => {
  			track.dataset.mouseDownAt = "0";  
  			track.dataset.prevPercentage = track.dataset.percentage;
		}
		
		const handleOnMove = e => {
			if(track.dataset.mouseDownAt === "0") return;
			
			const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
					maxDelta = window.innerWidth / 2;
			
			const percentage = (mouseDelta / maxDelta) * -100,
					nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
					nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
			
			track.dataset.percentage = nextPercentage;
			
			track.animate({
				transform: `translate(${nextPercentage}%, -50%)`
			}, { duration: 1200, fill: "forwards" });
			
			for(const image of track.getElementsByClassName("image")) {
				image.animate({
				objectPosition: `${100 + nextPercentage}% center`
				}, { duration: 1200, fill: "forwards" });
			}
		}

		window.onmousedown = e => handleOnDown(e);

		window.ontouchstart = e => handleOnDown(e.touches[0]);

		window.onmouseup = e => handleOnUp(e);

		window.ontouchend = e => handleOnUp(e.touches[0]);

		window.onmousemove = e => handleOnMove(e);

		window.ontouchmove = e => handleOnMove(e.touches[0]);

		// window.onmousedown = e => {
		// 	track.dataset.mouseDownAt = e.clientX;
		// }

		// window.onmouseup = () => {
		// 	track.dataset.mouseDownAt = "0";
		// 	track.dataset.prevPercentage = track.dataset.percentage;
		// }

		// window.onmousemove = e => {

		// 	if (track.dataset.mouseDownAt === 0) return;

		// 	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;
		// 	const percentage = (mouseDelta / maxDelta) * -100, nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

		// 	track.dataset.percentage = nextPercentage;

		// 	//track.style.transform = `translate(${nextPercentage}%, -50%)`;

		// 	track.animate({
		// 		transform: `translate(${nextPercentage}%, -50%)`
		// 	}, {duration: 1200, fill:"forwards"});
		// }

		// for(const image of track.getElementsByClassName("image")) {
		// 	//image.style.objectPosition = `${nextPercentage + 100}% 50%`;

		// 	image.animate({
		// 		objectPosition: `${100 + nextPercentage}% center`
		// 	}, {duration:1200, fill:"forwards"});

		// }
  	});

	//const track = document.getElementById("image-track");

	// window.onmousedown = e => {
	// 	track.dataset.mouseDownAt = e.clientX;
	// }

	// window.onmousemove = e => {
	// 	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;
	// 	const percentage = (mouseDelta / maxDelta) * 100;

	// 	track.style.transform = `translate(${percentage}%, -50%)`;
	// }

</script>

<style>
		body {
			height: 100vh;
  			width: 100vw;
			margin: 0rem;
			overflow: hidden;
		}
        .scrolling-container {
            white-space: nowrap; /* Prevent text from wrapping */
            overflow: hidden;    /* Hide overflowing content */
        }
        .scrolling-content {
            display: inline-block; /* Make the content inline so it scrolls horizontally */
            animation: marquee 18s linear infinite; /* Add an animation for scrolling */
        }
        @keyframes marquee {
            0% {
                transform: translateX(150%); /* Start offscreen to the right */
            }
            100% {
                transform: translateX(-100%); /* End offscreen to the left */
            }
        }

		#image-track {
			display: flex;
			gap: 4vmin;
			position: relative;
			left: 50%;
			right: 50%;
			transform: translate(0%, -50%);
			width: max-content;
			user-select: none;
		}

		#image-track > .image {
			width: 40vmin;
			height: 56vmin;
			object-fit: cover; /* aspect ratio fix */
			object-position: 0% center;
		}
		
</style>
  
<body class="bg-gray-100">

	<div>
		<Navbar />
	</div>

	<div class="pt-0 max-h-full flex flex-col">
		
		<div class="pt-[52px]">
        	<div class="scrolling-container bg-[#CFFA00] py-2 border-t-[1px] border-b-[1px] border-black">
            	<span class="scrolling-content text-[#6A7F00] font-bold"> The Fall Winter 2023 collection has arrived. Discover the latest styles and trends from X|S.         //       FREE SHIPPING &amp; EXPRESS DELIVERY ON ALL ORDERS  </span>
        	</div>
    	</div>

	  	<div class="flex mt-4">
			<div class="flex-grow text-4xl font-bold text-center">
		  		Checkout our premium collection
			</div>
	  	</div>
		
		<div class="flex transform hover:scale-105 transition-transform">
			<div class="flex-grow text-4xl mt-12 font-extrabold text-center">
				<a
					href="/products"
					class="bg-[#CFFA00] text-[#6A7F00] font-bold py-2 px-4 rounded "
					>Products</a
				>
			</div>
	  	</div>

		<div class="mt-[350px]" id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="1" src="https://images.unsplash.com/photo-1695755656490-74ddf32eeff5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="2" src="https://images.unsplash.com/photo-1696392322523-37379e6808ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="3" src="https://images.unsplash.com/photo-1501002138038-06806ed23bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="4" src="https://images.unsplash.com/photo-1684323750753-ddeb888f825a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="5" src="https://images.unsplash.com/photo-1668846538884-fc29cda36651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2646&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="6" src="https://images.unsplash.com/photo-1696202752800-e4771f9402a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="7" src="https://images.unsplash.com/photo-1490031781863-29b9bdbea131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="8" src="https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="9" src="https://images.unsplash.com/photo-1678801869049-15d5cb7dfff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="10" src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="11" src="https://images.unsplash.com/photo-1681554437813-efc656499bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="12" src="https://images.unsplash.com/photo-1459201062043-6f30fd792f08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" draggable="false" />
			<img class="image border-black hover:border-[#CFFA00] border-[1px]" alt="13" src="https://images.unsplash.com/photo-1691783592401-1b604f0449c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80" draggable="false" />
		</div>
	</div>

	<div>
		<Footer />
	</div>
	

</body>