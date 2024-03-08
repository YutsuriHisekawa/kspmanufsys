<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

async function login() {
  try {
    if (!username.value || !password.value) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Harap isi username dan password",
      });
      return;
    }

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Simpan token ke localStorage
      localStorage.setItem("token", data.token);
      // Redirect to /home route
      router.push("home");
    } else {
      const data = await response.json();
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Username Atau Password Salah Silahkan coba lagi!",
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<template>
  <section class="h-screen bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-black"
      >
        <img class="w-[3rem] h-auto mr-2" src="/koprasi.png" alt="logo" />
        KSPManufSys
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Selamat Datang Kembali
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                type="text"
                name="username"
                id="username"
                v-model="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              class="bg-black text-white h-[3rem] hover:bg-slate-800 duration-200 rounded-2xl w-full"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-black">
              Don’t have an account yet?
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
