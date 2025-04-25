<script>
    import { onMount } from 'svelte';
  
    // State for rental information
    let pickupDate = "Wed, Feb 07, 11:00 AM";
    let returnDate = "Wed, Feb 14, 10:00 AM";
    let pickupLocation = "Munich Airport";
    let returnLocation = "Hamburg Eppendorf";
    let additionalProducts = "Choose";
    let totalPrice = "00,00 €";
  
    // State for filtering
    let priceRanges = [
      { id: '0-50', min: 0, max: 50, checked: false },
      { id: '50-100', min: 50, max: 100, checked: true },
      { id: '100-150', min: 100, max: 150, checked: false },
      { id: '150-200', min: 150, max: 200, checked: true },
      { id: '200+', min: 200, max: Infinity, checked: false },
    ];
  
    let vehicleCategories = [
      { id: 'limousine', name: 'Limousine', checked: true },
      { id: 'suv', name: 'SUV', checked: true },
      { id: 'coupe', name: 'Coupe', checked: false },
      { id: 'cabriolet', name: 'Cabriolet', checked: false },
      { id: 'family-car', name: 'Family Car', checked: false },
      { id: 'electric-vehicle', name: 'Electric vehicle', checked: false },
    ];
  
    // Available cars data
    let cars = [
      {
        id: 1,
        model: "BMW M440 Coupe",
        image: "/audi.jpeg",
        pricePerDay: 159.89,
        totalPrice: 1439.54,
        seats: 5,
        doors: 2,
        transmission: "AUTOMATIC",
        tag: "OR SIMILAR COUPE",
        badge: "ADVICE OF THE DAY",
        category: "coupe"
      },
      {
        id: 2,
        model: "VW T-Roc",
        image: "/benz.jpeg",
        pricePerDay: 58.74,
        totalPrice: 793.54,
        seats: 5,
        doors: 4,
        transmission: "MANUAL",
        tag: "OR SIMILAR SUV",
        badge: "EARLY BIRD SPECIAL",
        category: "suv"
      },
      {
        id: 3,
        model: "BMW X3 30",
        image: "/BMW.jpeg",
        pricePerDay: 70.30,
        totalPrice: 1000.39,
        seats: 5,
        doors: 5,
        transmission: "AUTOMATIC",
        tag: "OR SIMILAR SUV",
        badge: "EARLY BIRD SPECIAL",
        category: "suv"
      },
      {
        id: 4,
        model: "BMW X3 30",
        image: "/bently.jpeg",
        pricePerDay: 72.80,
        totalPrice: 1050.20,
        seats: 5,
        doors: 5,
        transmission: "AUTOMATIC",
        tag: "OR SIMILAR SUV",
        badge: "EARLY BIRD SPECIAL",
        category: "suv"
      },
      {
        id: 5,
        model: "BMW 520",
        image: "/bmd-hero.png",
        pricePerDay: 85.60,
        totalPrice: 1200.40,
        seats: 5,
        doors: 4,
        transmission: "AUTOMATIC",
        tag: "OR SIMILAR SUV",
        badge: "ADVICE OF THE DAY",
        category: "limousine"
      },
      {
        id: 6,
        model: "MERCEDES-AMG GT 63 S",
        image: "/toyota-cam.jpeg",
        pricePerDay: 180.00,
        totalPrice: 2520.00,
        seats: 2,
        doors: 2,
        transmission: "AUTOMATIC",
        tag: "OR SIMILAR COUPE",
        badge: "EARLY BIRD SPECIAL",
        category: "coupe"
      }
    ];
  
    // Filtered cars based on selection
    $: filteredCars = cars.filter(car => {
      const priceMatch = priceRanges.some(range =>
        range.checked && car.pricePerDay >= range.min && car.pricePerDay <= range.max
      );
      const categoryMatch = vehicleCategories.some(category =>
        category.checked && car.category === category.id
      );
      return priceMatch && categoryMatch;
    });
  
    // Sorting options
    let sortOptions = [
      { id: 'price-low', name: 'Price (Low to High)' },
      { id: 'price-high', name: 'Price (High to Low)' },
      { id: 'most-popular', name: 'Most Popular First' }
    ];
    let selectedSort = 'most-popular';
  
    // Handle sorting
    $: {
      if (selectedSort === 'price-low') {
        filteredCars = [...filteredCars].sort((a, b) => a.pricePerDay - b.pricePerDay);
      } else if (selectedSort === 'price-high') {
        filteredCars = [...filteredCars].sort((a, b) => b.pricePerDay - a.pricePerDay);
      }
    }
  
    function clearFilters() {
      priceRanges = priceRanges.map(range => ({ ...range, checked: false }));
      vehicleCategories = vehicleCategories.map(cat => ({ ...cat, checked: false }));
    }
  
    // State for mobile filters
    let showFilters = false;
  </script>
  
  <main class="bg-white text-gray-800 min-h-screen">
    <div class="container mx-auto px-4 py-6">
      <!-- Mobile Header -->
      <div class="flex justify-between items-center mb-6 md:hidden">
        <h2 class="text-lg font-bold">Choose your vehicle</h2>
        <button
          class="text-blue-500 text-sm"
          on:click={() => showFilters = !showFilters}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
  
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar with filters (Collapsible on mobile) -->
        <div class="w-full md:w-1/4 pr-6 mb-6 md:mb-0">
          <div class="{showFilters ? 'block' : 'hidden'} md:block">
            <h2 class="text-lg font-bold mb-4">Filter</h2>
            <button class="text-blue-500 text-sm mb-4" on:click={clearFilters}>CLEAR ALL FILTERS</button>
  
            <!-- Price Range Filter -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-sm">PRICE RANGE</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </div>
              {#each priceRanges as range (range.id)}
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={range.id}
                    class="mr-2 h-4 w-4"
                    bind:checked={range.checked}
                  />
                  <label for={range.id} class="text-sm">
                    {#if range.max === Infinity}
                      €{range.min}+
                    {:else}
                      €{range.min} - €{range.max}
                    {/if}
                  </label>
                </div>
              {/each}
            </div>
  
            <!-- Vehicle Category Filter -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-sm">VEHICLE CATEGORY</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </div>
              {#each vehicleCategories as category (category.id)}
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category.id}
                    class="mr-2 h-4 w-4"
                    bind:checked={category.checked}
                  />
                  <label for={category.id} class="text-sm flex items-center">
                    {category.name}
                  </label>
                </div>
              {/each}
            </div>
          </div>
        </div>
  
        <!-- Main content area with car listings -->
        <div class="w-full md:w-3/4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold hidden md:block">Choose your vehicle <span class="text-sm text-gray-500">{filteredCars.length} AVAILABLE</span></h2>
            <div class="flex items-center">
              <span class="text-sm mr-2">SORT BY:</span>
              <select
                bind:value={selectedSort}
                class="border border-gray-300 rounded p-1 text-sm"
              >
                {#each sortOptions as option}
                  <option value={option.id}>{option.name}</option>
                {/each}
              </select>
            </div>
          </div>
  
          <!-- Car Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredCars as car (car.id)}
              <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div class="relative">
                  <img src={car.image} alt={car.model} class="w-full h-40 object-cover" />
                  <div class="absolute top-2 left-2 bg-gray-100 text-xs p-1 rounded">
                    {car.tag}
                  </div>
                  {#if car.badge}
                    <div class="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs p-1 rounded">
                      {car.badge}
                    </div>
                  {/if}
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-lg mb-2">{car.model}</h3>
                  <div class="flex justify-between items-end mb-4">
                    <div>
                      <div class="text-xl font-bold">{car.totalPrice.toFixed(2)} €</div>
                      <div class="text-xs text-gray-500">TOTAL PURCHASE PRICE</div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <span>{car.seats}</span>
                      </div>
                      <div class="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        <span>{car.doors}</span>
                      </div>
                    </div>
                    <div class="bg-gray-100 py-1 px-2 rounded text-xs">
                      {car.transmission}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <style>
    /* Responsive Styles */
    @media (max-width: 768px) {
      .grid-cols-1 {
        grid-template-columns: 1fr;
      }
      .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
      }
      .grid-cols-3 {
        grid-template-columns: 1fr;
      }
      select {
        width: 100%;
      }
      input[type="checkbox"] {
        width: 1.5rem;
        height: 1.5rem;
      }
      button {
        font-size: 1rem;
        padding: 0.5rem 1rem;
      }
    }
  </style>