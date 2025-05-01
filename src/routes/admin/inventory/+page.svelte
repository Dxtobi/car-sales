<script>
    import { onMount } from 'svelte';
  
    let cars = [];
    let loading = true;
    let error = null;
  
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        cars = await response.json();
        console.log(cars)
      } catch (err) {
        error = 'Failed to load inventory';
      } finally {
        loading = false;
      }
    };
  
    onMount(() => {
      fetchCars();
    });
  </script>
  
  {#if loading}
    <div class="p-4 text-center">Loading inventory...</div>
  {:else if error}
    <div class="p-4 text-red-500 text-center">{error}</div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {#each cars as car}
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={car.image}
            alt={car.model}
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2">{car.model}</h3>
            <div class="text-gray-600 mb-4">
              <span class="mr-4">{car.year}</span>
              <span>{car.mileage.toLocaleString()} miles</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-xl font-bold text-green-600">
                ${car?.salePrice?.toLocaleString()}
              </div>
              <div class="text-sm text-gray-500">
                {car?.transmission}
              </div>
            </div>
            {#if car.badge}
              <div class="mt-4 bg-blue-100 text-blue-800 px-2 py-1 rounded w-fit">
                {car.badge}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}