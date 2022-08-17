<script setup>
import { formatTime } from "@/methods/format.js";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  isTimeLine: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const emit = defineEmits(["openModal"]);

const listTheme = {
  resolved: {
    icon: "done",
    iconColor: "bg-green-500",
  },
  rejected: {
    icon: "search",
    iconColor: "bg-red-600",
    borderColor: "border-red-500",
  },
  processing: {
    icon: "schedule",
    iconColor: "bg-yellow-500",
    borderColor: "border-yellow-500",
  },
};
</script>
<template>
  <div class="mb-5 flex select-none text-sm 2xl:text-base">
    <div class="relative mr-8 mt-2" :class="isTimeLine && 'time-line'">
      <div
        class="flex h-9 w-9 items-center justify-center rounded-full text-white"
        :class="listTheme[data?.status].iconColor"
      >
        <span class="material-icons font-bold">
          {{ listTheme[data?.status].icon }}</span
        >
      </div>
    </div>
    <div class="w-full" v-if="data?.status === 'resolved'">
      <div
        class="relative mb-1 w-full rounded-md bg-green-500 p-2 text-white shadow-md before:absolute before:top-1/2 before:-left-4 before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-green-500"
      >
        <h3 class="text-base 2xl:text-xl">{{ data.name }}</h3>
      </div>
      <p class="text-sm text-gray-500">{{ formatTime(data.publish) }}</p>
    </div>
    <div class="w-full rounded-md bg-white p-2 shadow-md" v-else>
      <h3
        class="before:border-r-wt relative mb-2 border-b-2 pb-2 text-base font-semibold before:absolute before:top-1/2 before:-left-6 before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-white 2xl:text-xl"
        :class="listTheme[data?.status].borderColor"
      >
        {{ data.name }}
      </h3>
      <div class="mb-2 flex px-2">
        <p class="mr-auto text-gray-500">{{ data.duration }} minutes</p>
        <p>Score: {{ data.score }}</p>
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          class="px-2 text-sm font-bold text-gray-300 hover:text-gray-500"
          @click="emit('openModal', data)"
        >
          Read more
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.time-line {
  @apply before:absolute before:bottom-0 before:top-9 before:left-1/2 before:h-full before:w-1 before:-translate-x-1/2 before:bg-gray-300;
}
</style>
