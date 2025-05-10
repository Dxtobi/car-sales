<script>
  import { onMount } from 'svelte';
  import EditCarModal from './EditModel.svelte';
  
  let cars = [];
  let loading = true;
  let error = null;
  let selectedCar = null;
  let isEditModalOpen = false;
  
  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      cars = await response.json();
      console.log(cars);
    } catch (err) {
      error = 'Failed to load inventory';
    } finally {
      loading = false;
    }
  };
  
  const deleteCar = async (id) => {
    try {
      const response = await fetch(`/api/cars`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:id}),
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      cars = cars.filter(car => car.id !== id);
      fetchCars();
    } catch (err) {
      error = 'Failed to delete car';
    }
  };
  
  const updateCar = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/cars/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, ...updatedData}),
      });
      if (!response.ok) {
        throw new Error('Failed to update car');
      }
      const updatedCar = await response.json();
      fetchCars()
    } catch (err) {
      error = 'Failed to update car';
    }
  };
  
  const openEditModal = (car) => {
    selectedCar = car;
    isEditModalOpen = true;
  };
  
  const handleUpdateCar = (event) => {
    const updatedCarData = event.detail;
    updateCar(updatedCarData.id || updatedCarData._id, updatedCarData);
  };
  
  onMount(() => {
    fetchCars();
  });
</script>

<EditCarModal 
  car={selectedCar} 
  isOpen={isEditModalOpen} 
  on:update={handleUpdateCar}
  on:close={() => isEditModalOpen = false}
/>

{#if loading}
  <div class="p-4 text-center">Loading inventory...</div>
{:else if error}
  <div class="p-4 text-red-500 text-center">{error}</div>
{:else}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {#each cars as car}
      <div class="bg-white rounded-lg shadow-md overflow-hidden capitalize">
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
              <div class="text-sm text-gray-500">
                {car?.transmission}
              </div>
              <div class="text-sm text-gray-500 flex gap-2 items-center my-2">
                <iconify-icon icon="mdi:car-seat" width="24" height="24"  style="color: #000"></iconify-icon>
                <span>{car?.noOfSeats}</span>
              </div>
            </div>
          </div>
          
          {#if car.badge}
            <div class="mt-4 bg-blue-100 text-blue-800 px-2 py-1 rounded w-fit">
              {car.badge}
            </div>
          {/if}
          <div class="p-2 bg-gray-100 rounded-3xl my-3 flex justify-between">
            <button 
              aria-label='delete' 
              class="flex justify-center gap-2 bg-white text-red-600 hover:bg-red-200 rounded-full p-3 py-2" 
              on:click={() => deleteCar(car._id)}
            >
              <iconify-icon icon="material-symbols:delete-rounded" width="24" height="24" style="color: red"></iconify-icon>
              <span>Delete</span>
            </button>
            <button 
              aria-label='edit' 
              class="flex justify-center gap-2 bg-white text-green-600 hover:bg-green-200 rounded-full p-3 py-2" 
              on:click={() => openEditModal(car)}
            >
              <iconify-icon icon="mage:edit-fill" width="24" height="24" style="color: green"></iconify-icon>
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}