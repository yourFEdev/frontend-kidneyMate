import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  const sidebarOpen = ref(true);
  const mobileSidebar = ref(false);

  function toggleSidebar() {
    if (window.innerWidth >= 1024) {
      sidebarOpen.value = !sidebarOpen.value;
    } else {
      mobileSidebar.value = !mobileSidebar.value;
    }
  }

  function closeMobileSidebar() {
    mobileSidebar.value = false;
  }

  return {
    sidebarOpen,
    mobileSidebar,

    toggleSidebar,
    closeMobileSidebar,
  };
});