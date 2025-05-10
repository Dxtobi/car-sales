
<script>
    import { createEventDispatcher } from 'svelte';
    import { uploadImage } from '$lib/cloudinary';
  
    export let car = null;
    export let isOpen = false;
  
    // Create a deep copy of the car object to prevent direct mutations
    let editedCar = car ? { ...car } : null;
    let imageFile = null;
    let loading = false;
    let uploadingImage = false;
    
    const dispatch = createEventDispatcher();
  
    $: if (car && !editedCar) {
      editedCar = { ...car };
    }
  
    // When car prop changes, update the editedCar
    $: if (car && isOpen) {
      editedCar = { ...car };
    }
  
    const handleImageUpload = async () => {
      if (!imageFile) return;
      uploadingImage = true;
      try {
        const url = await uploadImage(imageFile);
        editedCar.image = url;
      } catch (error) {
        alert('Image upload failed');
      } finally {
        uploadingImage = false;
      }
    };
  
    const handleSubmit = async () => {
      if (!editedCar.image) {
        alert('Please upload an image first');
        return;
      }
      
      loading = true;
      try {
        dispatch('update', editedCar);
        closeModal();
      } catch (error) {
        alert('Error updating car');
      } finally {
        loading = false;
      }
    };
  
    const closeModal = () => {
      dispatch('close');
      isOpen = false;
    };
  </script>
  
  {#if isOpen && editedCar}
    <!-- Modal Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Edit Vehicle</h2>
            <button 
              on:click={closeModal}
              class="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <!-- Image Upload Section -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Vehicle Image</label>
            <div class="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                on:change={(e) => imageFile = e.target.files[0]}
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={uploadingImage || loading}
              />
              <button
                on:click={handleImageUpload}
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                disabled={!imageFile || uploadingImage || loading}
              >
                {uploadingImage ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {#if editedCar.image}
              <div class="mt-4">
                <img src={editedCar.image} alt="Car Preview" class="w-full h-48 object-cover rounded-lg" />
              </div>
            {/if}
          </div>
  
          <!-- Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Model -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                bind:value={editedCar.model}
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
  
            <!-- Year -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                bind:value={editedCar.year}
                min="1900"
                max={new Date().getFullYear()}
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
  
            <!-- Sale Price -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  bind:value={editedCar.salePrice}
                  step="100"
                  class="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
  
            <!-- Mileage -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  type="number"
                  bind:value={editedCar.mileage}
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">miles</span>
                </div>
              </div>
            </div>
  
            <!-- Transmission -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                bind:value={editedCar.transmission}
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Automatic</option>
                <option>Manual</option>
                <option>Electric</option>
              </select>
            </div>
  
            <!-- Category -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                bind:value={editedCar.category}
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="electric">Electric</option>
                <option value="luxury">Luxury</option>
                <option value="coupe">Coupe</option>
              </select>
            </div>
  
            <!-- Badge -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Badge</label>
              <input
                type="text"
                bind:value={editedCar.badge}
                placeholder="e.g. Certified Pre-Owned"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div class="col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of sits</label>
                <input
                  type="number"
                  bind:value={editedCar.noOfSeats}
                  placeholder="e.g. 2"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
          </div>
  
          <!-- Submit Button -->
          <div class="mt-8 flex justify-end space-x-3">
            <button
              on:click={closeModal}
              class="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              on:click={handleSubmit}
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Update Vehicle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}