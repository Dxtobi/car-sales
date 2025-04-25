<script>
  import { carTypesWithSvgIcons } from "$lib/components/svgs/carTypes";

    // Car data for the most searched section
   const mostSearchedCars = {
  "In Stock": [
   
    {
      model: "T-Cross",
      year: "2023",
      specs: "4.0 Premium 5dr Automatic 5dr AWD",
      miles: "45 Miles",
      price: "$15,000",
      isGreatPrice: false,
      image: "/audi.jpeg",
    },
    {
      model: "C-Class",
      year: "2023",
      specs: "2.0 Eco Premium Maximum 5dr AWD",
      miles: "50 Miles",
      price: "$150,000",
      isGreatPrice: false,
      image: "/toyota-jeep.jpeg",
    },
    {
      model: "Ford Transit",
      year: "2021",
      specs: "4.0 V6 PowerPlus Maximum 5dr AWD",
      miles: "60 Miles",
      price: "$22,000",
      isGreatPrice: true,
      image: "/benz.jpeg",
    },
    {
      model: "Honda Civic",
      year: "2023",
      specs: "1.5 Turbo CVT 4dr Sedan",
      miles: "25 Miles",
      price: "$25,000",
      isGreatPrice: true,
      image: "/bently.jpeg",
    },
  ],
  Sedan: [
   
    {
      model: "Honda Accord",
      year: "2023",
      specs: "2.0 Turbo CVT 4dr Sedan",
      miles: "20 Miles",
      price: "$30,000",
      isGreatPrice: true,
      image: "/BMW (1).jpeg",
    },
    {
      model: "Nissan Altima",
      year: "2023",
      specs: "2.5 SR CVT 4dr Sedan",
      miles: "35 Miles",
      price: "$28,000",
      isGreatPrice: false,
      image: "/BMW X2_.jpeg",
    },
    {
      model: "Hyundai Elantra",
      year: "2023",
      specs: "2.0 SE CVT 4dr Sedan",
      miles: "40 Miles",
      price: "$22,000",
      isGreatPrice: true,
      image: "/BMW.jpeg",
    },
    {
      model: "Mazda 3",
      year: "2023",
      specs: "2.5 Sport CVT 4dr Sedan",
      miles: "25 Miles",
      price: "$27,000",
      isGreatPrice: false,
      image: "/toyota-jeep.jpeg",
    },
  ],
  SUV: [
   
    {
      model: "Honda CR-V",
      year: "2023",
      specs: "1.5 Turbo EX-L AWD",
      miles: "20 Miles",
      price: "$32,000",
      isGreatPrice: true,
      image: "/toyota-cam.jpeg",
    },
    {
      model: "Nissan Rogue",
      year: "2023",
      specs: "2.5 SL CVT AWD",
      miles: "25 Miles",
      price: "$30,000",
      isGreatPrice: false,
      image: "/toyota-jeep.jpeg",
    },
    {
      model: "Hyundai Tucson",
      year: "2023",
      specs: "1.6 T-GDi SEL AWD",
      miles: "30 Miles",
      price: "$28,000",
      isGreatPrice: true,
      image: "/audi.jpeg",
    },
    {
      model: "Mazda CX-5",
      year: "2023",
      specs: "2.5 Grand Touring AWD",
      miles: "22 Miles",
      price: "$33,000",
      isGreatPrice: false,
      image: "/BMW_X2_-removebg-preview.png",
    },
  ],
  Convertible: [
    {
      model: "Porsche 911",
      year: "2023",
      specs: "911 Carrera S Cabriolet",
      miles: "10 Miles",
      price: "$120,000",
      isGreatPrice: false,
      image: "/BMW_X2_-removebg-preview.png",
    },
    {
      model: "BMW M4",
      year: "2023",
      specs: "M4 Competition Convertible",
      miles: "15 Miles",
      price: "$100,000",
      isGreatPrice: true,
      image: "/BMW X2_.jpeg",
    },
    {
      model: "Audi TT",
      year: "2023",
      specs: "TT RS Roadster",
      miles: "20 Miles",
      price: "$65,000",
      isGreatPrice: false,
      image: "/benz.jpeg",
    },
    {
      model: "Mercedes-Benz SLK",
      year: "2023",
      specs: "SLK 350 Roadster",
      miles: "25 Miles",
      price: "$55,000",
      isGreatPrice: true,
      image: "/toyota-cam.jpeg",
    },
    
  ],
};
  
   
  
    // Benefits for why choose us section
    const benefits = [
      {
        title: "Special Financing Offers",
        icon: "⏱️",
        description:
          "Our stress-free finance department that can find financial solutions to save you money.",
      },
      {
        title: "Trusted Car Dealership",
        icon: "💎",
        description:
          "Our stress-free finance department that can find financial solutions to save you money.",
      },
      {
        title: "Transparent Pricing",
        icon: "🏷️",
        description:
          "Our stress-free finance department that can find financial solutions to save you money.",
      },
      {
        title: "Expert Car Service",
        icon: "🚗",
        description:
          "Our stress-free finance department that can find financial solutions to save you money.",
      },
    ];
  
    // Filter tabs for most searched cars
    const filterTabs = ["In Stock", "Sedan", "SUV", "Convertible"];
    let activeTab = "In Stock";
    const setActiveTab = (tab) => {
      activeTab = tab;
    };
  
    // Intersection Observer for scroll animations
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
  
    let observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    };
  
    import { onMount } from "svelte";

    let observer;

    
  
    // Lifecycle hook to observe elements
   
  
    onMount(() => {
    observer = new IntersectionObserver(observerCallback, observerOptions);
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
      });
    });


    
  </script>
  
  <style>
    /* First Load Animations */
    .hero-section {
      opacity: 0;
      transform: translateY(-50px);
      transition: opacity 0.3s ease, transform 1s ease;
    }
  
    .hero-section.animate {
      opacity: 1;
      transform: translateY(0);
    }
  
    .browse-types {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 0.9s ease, transform 1s ease;
    }
  
    .browse-types.animate {
      opacity: 1;
      transform: translateY(0);
    }
  
    /* Scroll Animations */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 0.9s ease, transform 1s ease;
    }
  
    .animate-on-scroll.animate {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
  
  <main class="font-sans ">
    <!-- Hero Section -->
    <section class=" mx-auto px-4 py-8 hero-section animate bg-[#c5d9e1]">
     
      <!-- Search Bar -->
      <div class="md:flex flex-wrap items-center justify-between gap-2 mb-16  bg-white md:w-fit w-[100%] m-auto p-4 md:rounded-full rounded grid grid-cols-2 ">
        <div class="relative inline-block">
          <select class="px-4 py-2 bg-white border-none rounded-md appearance-none pr-8 min-w-32">
            <option>Used Cars</option>
            <option>New Cars</option>
          </select>
         
        </div>
        <div class="relative inline-block">
          <select class="px-4 py-2 bg-white border-none  rounded-md appearance-none pr-8 min-w-32">
            <option>Any Makes</option>
          </select>
         
        </div>
        <div class="relative inline-block">
          <select class="px-4 py-2 bg-white border-none rounded-md appearance-none pr-8 min-w-32">
            <option>Any Models</option>
          </select>
         
        </div>
        <div class="relative inline-block">
          <select class="px-4 py-2 bg-white border-none rounded-md appearance-none pr-8 min-w-32">
            <option>All Prices</option>
          </select>
         
        </div>
        <a href="/search" aria-label="search" class="bg-blue-600 text-white p-2 rounded-full w-fit relative z-[300]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </a>
      </div>
      <!-- Hero Car Image -->
      <div class=" h-64 rounded-lg mb-16 flex items-center justify-center container m-auto">
        <img src={'/bmd-hero.png'} alt="" class="md:w-[50%]" />
      </div>
    </section>
  
    <!-- Browse by Type Section -->
    <section class="container mx-auto px-4 py-8 browse-types animate-on-scroll">
      <h2 class="text-2xl font-semibold text-center mb-8">Browse by Type</h2>
      <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mb-16">
        {#each carTypesWithSvgIcons as carType}
          <a href={`/search?type=${carType.type}`} class="flex flex-col items-center justify-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer transition border border-gray-200 text-gray-500">
            <div class="text-2xl mb-2 "><svelte:component this={carType.icon}></svelte:component></div>
            <span class="text-sm">{carType.type}</span>
          </a>
        {/each}
      </div>
    </section>
  
    <!-- Buy/Sell Section -->
    <section class="container mx-auto px-4 py-8 animate-on-scroll">
      <div class="grid md:grid-cols-2 gap-6 mb-16">
        <!-- Looking to Buy -->
        <div class="bg-blue-50 p-6 rounded-lg flex justify-between items-center">
          <div>
            <h3 class="text-xl font-semibold mb-2">Are You Looking For a Car?</h3>
            <p class="text-sm text-gray-600 mb-4">
              We are committed to providing our customers with exceptional service.
            </p>
            <a href="/search" class="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 cursor-pointer">
              Get Started
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
          <div class="bg-white p-4 rounded-full">
            <div class="text-blue-600 text-2xl">🚗</div>
          </div>
        </div>
        <!-- Looking to Sell -->
        <div class="bg-pink-50 p-6 rounded-lg flex justify-between items-center">
          <div>
            <h3 class="text-xl font-semibold mb-2">Do You Want to Sell a Car?</h3>
            <p class="text-sm text-gray-600 mb-4">
              We are committed to providing our customers with exceptional service.
            </p>
            <a href="/search" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center cursor-pointer">
              Get Started
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
          <div class="bg-white p-4 rounded-full">
            <div class="text-pink-600 text-2xl">💰</div>
          </div>
        </div>
      </div>
    </section>
  
   <!-- Most Searched Cars Section -->
<section class="container mx-auto px-4 py-8 animate-on-scroll">
  <h2 class="text-2xl font-semibold text-center mb-6">The Most Searched Cars</h2>
  <!-- Filter Tabs -->
  <div class="flex justify-center mb-8">
    <div class="border-b flex">
      {#each filterTabs as tab}
        <button
          class={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          on:click={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      {/each}
    </div>
  </div>
  <!-- Car Grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    {#each mostSearchedCars[activeTab] as car}
      <div class="bg-gray-100 rounded-lg overflow-hidden">
        <!-- Car Image Placeholder -->
        <div class="relative h-48">
          <img src={car.image} alt={car.model} class="w-full h-full object-cover" />
          {#if car.isGreatPrice}
            <div class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Great Price</div>
          {/if}
        </div>
        <!-- Car Details -->
        <div class="p-4 bg-white">
          <h3 class="font-semibold">{car.model} - {car.year}</h3>
          <p class="text-xs text-gray-500 mb-2">{car.specs}</p>
          <div class="flex justify-between text-xs text-gray-600 mb-4">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {car.miles}
            </div>
            <div>Petrol</div>
            <div>Automatic</div>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-bold text-lg">{car.price}</span>
            <button class="text-blue-600 flex items-center text-sm">
              View Details
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
  
    <!-- Why Choose Us Section -->
    <section class="container mx-auto px-4 py-16 animate-on-scroll">
      <h2 class="text-2xl font-semibold text-center mb-12">Why Choose Us?</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each benefits as benefit}
          <div class="flex flex-col items-center text-center">
            <div class="text-3xl mb-4">{benefit.icon}</div>
            <h3 class="text-lg font-semibold mb-2">{benefit.title}</h3>
            <p class="text-sm text-gray-600">{benefit.description}</p>
          </div>
        {/each}
      </div>
    </section>
    
     <!-- Latest Cars Section -->
  <section class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold text-center mb-8">Latest Cars</h2>
    
    <!-- Car grid would be here, but we'll just show a placeholder -->
    <div class="bg-gray-100 h-64 flex items-center justify-center rounded-lg">
      <span class="text-gray-500">Latest Cars Gallery</span>
    </div>
  </section>
  
 
</main>