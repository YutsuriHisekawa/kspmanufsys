<script setup>
// Import modul dan komponen yang diperlukan
import { onMounted, ref, nextTick } from "vue";
import $ from "jquery";
import "datatables.net";
import sidebar from "@/layouts/sidebar.vue";
import { useRouter } from "vue-router";

// Deklarasi variabel reaktif
const users = ref([]);
const router = useRouter();

// Kode yang dijalankan saat komponen dimounted
onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    users.value = data.users;
    await nextTick();
    $("#datatable").DataTable();
  } catch (error) {
    console.error("Error fetching or initializing DataTable:", error);
  }
});

// Fungsi untuk menghapus pengguna berdasarkan ID
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      users.value = users.value.filter((user) => user.id !== userId);
    } else {
      console.error("Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Fungsi untuk mengarahkan ke halaman edit pengguna
const editUser = (userId) => {
  router.push({ path: `/edit/${userId}` });
};
</script>

<template data-theme="light">
  <sidebar></sidebar>
  <div class="p-4 sm:ml-64 bg-white pt-10">
    <div class="p-4 bg-white rounded-lg mt-14 h-full space-y-10">
      <h1 class="text-4xl text-black font-semibold">List Of Costumers</h1>
      <button
        class="btn bg-red-600 text-white hover:bg-red-900 w-[10rem] rounded-2xl h-10 duration-200"
      >
        <router-link to="/add">Add Data</router-link>
      </button>
      <table id="datatable" class="table-auto w-full text-black">
        <thead>
          <tr>
            <th class="!text-start">ID</th>
            <th class="!text-start">Name</th>
            <th class="!text-start">Address</th>
            <th class="!text-start">City</th>
            <th class="!text-start">Date of Birth</th>
            <th class="!text-start">Phone</th>
            <th class="!text-start">Email</th>
            <th class="!text-start">Note</th>
            <th class="!text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="!text-start">{{ user.id }}</td>
            <td class="!text-start">
              {{ user.firstName }} {{ user.lastName }}
            </td>
            <td class="!text-start">{{ user.address.address }}</td>
            <td class="!text-start">{{ user.address.city }}</td>
            <td class="!text-start">{{ user.birthDate }}</td>
            <td class="!text-start">{{ user.phone }}</td>
            <td class="!text-start">{{ user.email }}</td>
            <td class="!text-start">{{ user.note }}</td>
            <td class="!text-start">
              <button
                @click="editUser(user.id)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                View
              </button>
              <button
                @click="deleteUser(user.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 640px) {
  /* Hide ID and Rating columns on small screens */
  #datatable th:nth-child(1),
  #datatable td:nth-child(1),
  #datatable th:nth-child(5),
  #datatable td:nth-child(5) {
    display: none;
  }

  /* Reduce padding and font size for small screens */
  #datatable th,
  #datatable td {
    padding: 8px 5px;
    font-size: 12px;
  }
}

@media screen and (max-width: 480px) {
  /* Hide Discount % and Brand columns on smaller screens */
  #datatable th:nth-child(4),
  #datatable td:nth-child(4),
  #datatable th:nth-child(7),
  #datatable td:nth-child(7) {
    display: none;
  }
}
</style>
