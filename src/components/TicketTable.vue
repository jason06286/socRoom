<script setup>
import { calcTimes } from "@/methods/format.js";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const tableTheme = {
  resolved: "bg-green-600",
  rejected: "bg-red-500",
  pending: "bg-blue-500",
  processing: "bg-yellow-500",
};

const calcRemainMinutes = (remain) => {
  const minutes = Math.floor(remain / 60);
  const sec = remain % 60;
  let result = "";
  if (minutes < 10) {
    result = `0${minutes}:`;
  } else {
    result = `${minutes}:`;
  }
  if (sec < 10) {
    result += `0${sec}`;
  } else {
    result += sec;
  }
  return result;
};

const calcProgressbar = (duration, remain) => {
  const percent = Math.floor((remain / (duration * 60)) * 100);
  return `width:${percent}%`;
};

const formatTimes = (time) => {
  if (props.data.status === "resolved") {
    return `Resolved ${calcTimes(time)}`;
  }
  if (props.data.status === "rejected") {
    return `Rejected ${calcTimes(time)}`;
  }
  if (props.data.status === "processing") {
    return `Started ${calcTimes(time)}`;
  }
  if (props.data.status === "pending") {
    return `Start in ${calcTimes(time)}`;
  }
};
</script>
<template>
  <tr
    class="mb-2 flex cursor-pointer select-none items-center gap-x-8 rounded-sm border-b-2 py-1 px-5 text-sm text-gray-400 hover:bg-blue-200 2xl:text-base"
  >
    <td class="flex w-16 justify-start xl:w-24">
      <div
        class="rounded-md py-1 px-1 capitalize text-white xl:px-3"
        :class="tableTheme[data.status]"
      >
        {{ data.status }}
      </div>
    </td>
    <td class="mr-auto">
      <h3 class="font-bold text-gray-500">{{ data.name }}</h3>
      <p class="text-sm">
        {{ data.tags }}
        <span class="text-xs text-green-400" v-if="data.status === 'resolved'"
          >+{{ data.score }}pts</span
        >
      </p>
    </td>
    <td class="self-end">
      <template v-if="data.status === 'processing'">
        <div
          class="relative h-1 w-24 rounded-full bg-gray-200 before:absolute 2xl:w-48"
        >
          <div
            class="absolute top-0 left-0 h-1 w-full bg-gray-500"
            :style="calcProgressbar(data.duration, data.remain)"
          ></div>
        </div>
        <p class="mt-1 text-center text-sm">
          {{ calcRemainMinutes(data.remain) }} remain
        </p>
      </template>
    </td>
    <td class="flex w-40 justify-start 2xl:w-48">
      {{ formatTimes(data.publish) }}
    </td>
    <td class="flex w-4 justify-end">#{{ data.id }}</td>
    <td class="w-3">
      <span
        class="material-icons align-middle"
        :class="data.status === 'pending' ? 'block' : 'hidden'"
      >
        menu
      </span>
    </td>
  </tr>
</template>
<style></style>
