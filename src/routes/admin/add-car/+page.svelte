<script>
    import { onMount } from 'svelte';
    import { uploadImage } from '$lib/cloudinary';
    import { goto } from '$app/navigation';
  
    let car = {
      model: '',
      year: new Date().getFullYear(),
      salePrice: 0,
      mileage: 0,
      transmission: 'Automatic',
      category: 'sedan',
      image: '',
      badge: ''
    };
  
    let imageFile = null;
    let loading = false;
    let uploadingImage = false;
  
    const handleImageUpload = async () => {
      if (!imageFile) return;
      uploadingImage = true;
      try {
        const url = await uploadImage(imageFile);
        car.image = url;
      } catch (error) {
        alert('Image upload failed');
      }finally{
        uploadingImage = false;
      }
    };
  
    const handleSubmit = async () => {
      if (!car.image) {
        alert('Please upload an image first');
        return;
      }
      
      loading = true;
      try {
        const response = await fetch('/api/cars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(car)
        });
        
        if (response.ok) {
          alert('Car added successfully');
          goto('/admin/inventory');
        }
      } catch (error) {
        alert('Error saving car');
      } finally {
        loading = false;
      }
    };
  </script>
  
  <div class="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Add New Vehicle</h2>
    
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
      {#if car.image}
        <div class="mt-4">
          <img src={car.image} alt="Car Preview" class="w-full h-48 object-cover rounded-lg" />
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
          bind:value={car.model}
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
  
      <!-- Year -->
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
        <input
          type="number"
          bind:value={car.year}
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
            bind:value={car.salePrice}
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
            bind:value={car.mileage}
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
          bind:value={car.transmission}
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
          bind:value={car.category}
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
          bind:value={car.badge}
          placeholder="e.g. Certified Pre-Owned"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  
    <!-- Submit Button -->
    <div class="mt-8 flex justify-end">
      <button
        on:click={handleSubmit}
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Vehicle'}
      </button>
    </div>
  </div>