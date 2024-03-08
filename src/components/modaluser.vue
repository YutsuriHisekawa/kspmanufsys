<script setup>
import { ref, defineProps, defineEmits } from "vue";
import EditUserForm from "@/components/EditUserForm.vue";

const { user } = defineProps();
const { emit } = defineEmits();

const closeModal = () => {
  emit("close");
};

const saveChanges = () => {
  // Save changes logic
  // You may use API calls here to update the user data
  // After saving changes, emit an event to close the modal
  emit("close");
};
</script>

<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit User</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Include your form component here -->
          <EditUserForm :user="currentUser" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveChanges">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
