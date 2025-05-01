<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';

    let { children } = $props();
    let currentPath = $state('');
    let sidebarWidth = $state('')
    let mainMargin = $state('')
    let showMobileSidebar =$state(false)

    let isSidebarOpen = $state(true);
    let isMobile = false;

    const links = [
        { href: '/admin', text: 'Dashboard', match: 'exact' },
        { href: '/admin/inventory', text: 'Inventory', match: 'start' },
        { href: '/admin/add-car', text: 'Add Car', match: 'exact' },
        { href: '/admin/users', text: 'Users', match: 'exact' }
    ];

    const checkScreenSize = () => {
        if (browser) {
            isMobile = window.innerWidth < 768;
            isSidebarOpen = !isMobile;
        }
    };

    const toggleSidebar = () => {
        isSidebarOpen = !isSidebarOpen;
    };

    $effect(() => {
        currentPath = $page.url.pathname;
    });

    onMount(() => {
        if (browser) {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            
            return () => {
                window.removeEventListener('resize', checkScreenSize);
            };
        }
    });

    // Reactive width calculations
    $effect(() => {
        sidebarWidth = isMobile
            ? (isSidebarOpen ? 'w-64' : 'w-0')
            : (isSidebarOpen ? 'w-64' : 'w-20');
    });

    $effect(() => {
        mainMargin = isMobile
            ? 'ml-0'
            : (isSidebarOpen ? 'ml-64' : 'ml-20');
    });
</script>

<!-- Mobile Toggle Button -->


<!-- Main Layout -->
<div class="flex h-screen relative">
        <button class="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 mr-2 fixed top-[10%]" onclick={toggleSidebar} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5h12M4 12h16M4 19h8" color="#000" />
            </svg>
        </button>
   
     <!-- Sidebar (Desktop) -->
     <aside class="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm p-5">
        {#each links as link}
                <a
                    href={link.href}
                    class={`
                        sidebar-link
                        p-2
                        rounded-2xl
                        font-bold transition-all
                        
                        ${currentPath === link.href || (link.match === 'start' && currentPath.startsWith(link.href)) 
                            ? 'bg-blue-500 px-[10%] ' 
                            : ''}
                    `}
                >
                   <span> {isSidebarOpen ? link.text : link.text.slice(0, 1)}</span>
                </a>
        {/each}
      </aside>
      
      <!-- Mobile Sidebar (Overlay) -->
      {#if showMobileSidebar}
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 z-20" role="button" tabindex="0" onclick={toggleSidebar}></div>
        <aside class="fixed inset-y-0 left-0 w-64 bg-white z-30 transform transition-transform duration-300 ease-in-out border-r border-gray-200 shadow-lg">
            {#each links as link}
            <a
                href={link.href}
                class={`
                    sidebar-link
                    p-2
                    rounded-2xl
                    font-bold transition-all
                    
                    ${currentPath === link.href || (link.match === 'start' && currentPath.startsWith(link.href)) 
                        ? 'bg-blue-500 px-[10%] ' 
                        : ''}
                `}
            >
               <span> {isSidebarOpen ? link.text : link.text.slice(0, 1)}</span>
            </a>
        {/each}
        </aside>
      {/if}

    <!-- Main Content -->
    <main class=" 
        flex-1 p-6 md:p-10
        transition-all duration-300">
        <div class=" mx-auto">
            {@render children()}
        </div>
    </main>
</div>

<style>

</style>



