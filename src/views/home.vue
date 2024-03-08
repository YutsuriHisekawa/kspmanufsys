<script setup>
import { onMounted, ref, nextTick } from "vue";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables
import sidebar from "@/layouts/sidebar.vue";

const users = ref([]);

onMounted(async () => {
  try {
    // Fetch data from API
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    users.value = data.users;

    // Initialize DataTable after DOM is ready
    await nextTick();
    $("#datatable").DataTable();
  } catch (error) {
    console.error("Error fetching or initializing DataTable:", error);
  }
});

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Remove the user from the local array
      users.value = users.value.filter((user) => user.id !== userId);
    } else {
      console.error("Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const editUser = async (userId) => {
  // You can implement your edit functionality here
  console.log("Edit user with ID:", userId);
};
</script>

<template data-theme="light">
  <sidebar></sidebar>
  <div class="p-4 sm:ml-64 bg-white pt-10">
    <div class="p-4 bg-white rounded-lg mt-14 h-full space-y-10">
      <h1 class="text-4xl text-black font-semibold">List Of Costumer</h1>
      <button
        class="btn bg-red-600 text-white hover:bg-red-900 w-[10rem] rounded-2xl h-10 duration-200"
      >
        <RouterLink to="#"> Add Data </RouterLink>
      </button>
      <table id="datatable" class="table-auto w-full text-black">
        <thead>
          <tr>
            <th class="!text-start">ID</th>
            <th class="!text-start">Nama</th>
            <th class="!text-start">Alamat</th>
            <th class="!text-start">Kota</th>
            <th class="!text-start">Tanggal Lahir</th>
            <th class="!text-start">Phone</th>
            <th class="!text-start">Email</th>
            <th class="!text-start">Catatan</th>
            <th class="!text-start">Setting</th>
            <!-- Tambah kolom Setting -->
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
              <!-- Tombol Edit -->
              <button
                @click="editUser(user.id)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <!-- Tombol View -->
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                View
              </button>
              <!-- Tombol Delete -->
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

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
</style>
