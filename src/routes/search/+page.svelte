<script>
  import cars_ from '$lib/demos/cacrsdemo';
  import { onMount } from 'svelte';
  
  // Vehicle categories for dealership
  let vehicleCategories = [
    { id: 'sedan', name: 'Sedan', checked: true },
    { id: 'suv', name: 'SUV', checked: true },
    { id: 'truck', name: 'Truck', checked: false },
    { id: 'electric', name: 'Electric', checked: false },
    { id: 'luxury', name: 'Luxury', checked: false }
  ];

  // Price ranges for dealership inventory
  let priceRanges = [
    { id: '20k-30k', min: 20000, max: 30000, checked: false },
    { id: '30k-40k', min: 30000, max: 40000, checked: true },
    { id: '40k-50k', min: 40000, max: 50000, checked: false },
    { id: '50k+', min: 50000, max: Infinity, checked: false }
  ];

  let cars = cars_
  // Inventory data
 

  // Filtering logic
  $: filteredCars = cars.filter(car => {
    const priceMatch = priceRanges.some(range =>
      range.checked && car.salePrice >= range.min && car.salePrice <= range.max
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
    { id: 'year-new', name: 'Newest Year' }
  ];
  let selectedSort = 'year-new';

  $: {
    if (selectedSort === 'price-low') {
      filteredCars = [...filteredCars].sort((a, b) => a.salePrice - b.salePrice);
    } else if (selectedSort === 'price-high') {
      filteredCars = [...filteredCars].sort((a, b) => b.salePrice - a.salePrice);
    } else if (selectedSort === 'year-new') {
      filteredCars = [...filteredCars].sort((a, b) => b.year - a.year);
    }
  }

  function clearFilters() {
    priceRanges = priceRanges.map(range => ({ ...range, checked: false }));
    vehicleCategories = vehicleCategories.map(cat => ({ ...cat, checked: false }));
  }

  let showFilters = false;
</script>

<main class="bg-white text-gray-800 min-h-screen">
  <div class="container mx-auto px-4 py-6">
    <!-- Mobile Header -->
    <div class="flex justify-between items-center mb-6 md:hidden">
      <h2 class="text-lg font-bold">Find Your Car</h2>
      <button
        class="text-blue-500 text-sm"
        on:click={() => showFilters = !showFilters}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>

    <div class="flex flex-col md:flex-row">
      <!-- Filters Sidebar -->
      <div class="w-full md:w-1/4 pr-6 mb-6 md:mb-0">
        <div class="{showFilters ? 'block' : 'hidden'} md:block">
          <h2 class="text-lg font-bold mb-4">Filter</h2>
          <button class="text-blue-500 text-sm mb-4" on:click={clearFilters}>
            CLEAR ALL FILTERS
          </button>

          <!-- Price Filter -->
          <div class="mb-6">
            <h3 class="font-bold text-sm mb-2">PRICE RANGE</h3>
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
                    ${range.min.toLocaleString()}+
                  {:else}
                    ${range.min.toLocaleString()} - ${range.max.toLocaleString()}
                  {/if}
                </label>
              </div>
            {/each}
          </div>

          <!-- Category Filter -->
          <div class="mb-6">
            <h3 class="font-bold text-sm mb-2">VEHICLE TYPE</h3>
            {#each vehicleCategories as category (category.id)}
              <div class="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category.id}
                  class="mr-2 h-4 w-4"
                  bind:checked={category.checked}
                />
                <label for={category.id} class="text-sm">
                  {category.name}
                </label>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Car Listings -->
      <div class="w-full md:w-3/4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold hidden md:block">Available Inventory <span class="text-sm text-gray-500">({filteredCars.length} vehicles)</span></h2>
          <div class="flex items-center w-full md:w-fit justify-between">
            <div class="text-sm mr-2 w-fit ">Sort by:</div>
            <select
              bind:value={selectedSort}
              class="border border-gray-300 rounded p-1 text-sm w-fit"
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
                <img src={car.image} alt={car.model} class="w-full h-48 object-cover" />
                {#if car.badge}
                  <div class="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {car.badge}
                  </div>
                {/if}
              </div>
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2">{car.year} {car.model}</h3>
                <div class="flex justify-between items-end mb-4">
                  <div>
                    <div class="text-xl font-bold">${car.salePrice.toLocaleString()}</div>
                    <div class="text-xs text-gray-500">SALE PRICE</div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="mr-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span>{car.mileage.toLocaleString()} mi</span>
                    </div>
                    <div class="mr-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      {car.transmission}
                    </div>
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