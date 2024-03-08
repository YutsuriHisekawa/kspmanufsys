<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const firstname = ref("");
const lastname = ref("");
const image = ref("");

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Assuming the response contains firstName, lastName, and imageUrl fields
      firstname.value = data.firstName;
      lastname.value = data.lastName;
      image.value = data.image; // Set the user's image source
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
});
</script>
<template>
  <!--sidenav -->
  <nav class="fixed top-0 z-50 w-full bg-red-600 border-b border-black">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex ms-2 md:me-24">
          <img src="/koprasi.png" class="h-8 me-3" alt="FlowBite Logo" />
          <span
            class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white"
            >KSPManufSys</span
          >
        </div>
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div class="flex ms-2 md:me-24 space-x-5">
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white"
            >
              Selamat datang {{ firstname }} {{ lastname }}
            </span>
            <div
              class="rounded-full h-[3rem] w-[3rem] flex justify-center items-center border-2 border-white"
            >
              <img :src="image" class="h-9" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-slate-200 border-r sm:translate-x-0 border-red-600 shadow-2xl shadow-black"
    aria-label="Sidebar"
    x-show="isSidebarOpen"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-slate-200">
      <ul class="space-y-2 font-medium">
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-red-600 rounded-lg hover:bg-red-600 hover:text-white border-2 border-red-600"
          >
            <svg
              class="w-5 h-5 transition group"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path
                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
              />
              <path
                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
              />
            </svg>
            <span class="ms-3">Master Costumer</span>
          </a>
        </li>
        <li>
          <button
            @click="handleLogout"
            class="flex items-center p-2 text-red-600 rounded-lg hover:bg-red-600 hover:text-white border-2 border-red-600 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
            <span class="ms-3">LogOut</span>
          </button>
        </li>
      </ul>
      <h1 class="text-center text-black pt-5 font-semibold">
        Fahrizal Julian Adam
      </h1>
    </div>
  </aside>

  <!-- end sidenav -->
</template>
