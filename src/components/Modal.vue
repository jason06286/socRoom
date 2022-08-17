<script setup>
import { VueFinalModal, $vfm } from "vue-final-modal";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const loginTime = ref("");
const ip = ref("");
const userName = ref("");

const isShowCancelModal = ref(false);

const inputs = [
  {
    type: "datetime-local",
    title: "Login Time",
    description: "success login time",
    bind: loginTime,
    id: "login",
  },
  {
    type: "text",
    title: "Attacker IP",
    description: "source ip address",
    bind: ip,
    id: "ip",
  },
  {
    type: "text",
    title: "User Name",
    description: "login username",
    bind: userName,
    id: "userName",
  },
];

const reStart = () => {
  loginTime.value = "";
  ip.value = "";
  userName.value = "";
  $vfm.hideAll();
};

const submit = () => {
  console.log("submit :>> ", {
    loginTime: loginTime.value,
    ip: ip.value,
    userName: userName.value,
  });
  reStart();
};
</script>

<template>
  <vue-final-modal
    :click-to-close="false"
    v-bind="$attrs"
    classes="flex justify-center items-center  rounded-lg"
    content-class="relative flex flex-col max-h-full mx-4 p-4 rounded-md  shadow-md w-[820px] bg-white"
    :overlay-style="['background-color: rgba(91, 112, 131, 0.4)']"
  >
    <button
      class="absolute right-3 top-2 text-gray-400 hover:text-gray-300"
      @click="isShowCancelModal = true"
    >
      <span class="material-icons"> close </span>
    </button>
    <h2 class="mb-2 text-center text-xl font-bold">Investigate Action</h2>
    <h3 class="mb-3 text-center text-xl font-bold">{{ data.name }}</h3>
    <div class="mb-3 flex justify-between">
      <div class="font-bold">
        <span class="text-gray-500">Duration:</span> {{ data.duration }} minutes
      </div>
      <div class="font-bold">
        <span class="text-gray-500">Score:</span> {{ data.score }} pts
      </div>
    </div>
    <div class="mb-3 flex justify-center">
      <div
        class="flex items-center rounded-full bg-blue-200 px-3 text-sm font-bold text-blue-900"
      >
        <div class="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
        {{ data.tags }}
      </div>
    </div>
    <div class="mb-3">
      <p>
        {{ data.description }}
      </p>
      <p class="my-3">Related dashboard: Web Access</p>
      <p class="border-b pb-2 text-sm text-gray-400">
        Notice There may be more than one answer. You can submit any of it.
      </p>
    </div>
    <div class="mb-3 grid grid-cols-2 gap-x-20 px-5">
      <div class="mb-3" v-for="(item, index) in inputs" :key="item.id">
        <label class="font-bold" :for="item.id">{{ item.title }}</label>
        <p class="mb-3 text-gray-400">{{ item.description }}</p>
        <input
          :type="item.type"
          class="w-full rounded-md border-2 py-1 px-1 focus:border-blue-400 focus:outline-none"
          :id="item.id"
          v-model.trim="item.bind.value"
        />
      </div>
    </div>
    <div class="mb-3 flex justify-end">
      <button
        type="button"
        class="rounded-md bg-gray-600 px-3 py-2 font-bold text-white hover:bg-gray-400"
        @click="submit"
      >
        Submit
      </button>
    </div>
  </vue-final-modal>
  <vue-final-modal
    v-model="isShowCancelModal"
    :click-to-close="false"
    :esc-to-close="true"
    classes="flex justify-center items-center "
    content-class="relative flex flex-col max-h-full mx-4 p-4 border  rounded bg-gray-200 "
    :overlay-style="['background-color: rgba(91, 112, 131, 0.4)']"
  >
    <span class="mr-8 text-center text-xl font-bold">
      Discard / Cancel Answer
    </span>

    <div
      class="flex w-[300px] flex-grow flex-col items-center justify-center overflow-y-auto border-b border-gray-600 py-5 text-gray-600"
    >
      <p>Are you sure you want to discard/cancel your answer?</p>
      <p class="text-sm text-gray-400">
        The system will not store your answers
      </p>
    </div>
    <div class="flex flex-shrink-0 items-center justify-end gap-x-5 pt-4">
      <button
        class="flex cursor-pointer items-center justify-center rounded-md border border-gray-400 bg-slate-200/50 px-1 py-1 text-sm font-bold text-blue-900 shadow-md shadow-slate-200 transition-all duration-200 hover:bg-slate-200/60 hover:shadow-black sm:px-3 sm:py-2 sm:text-base"
        @click="isShowCancelModal = false"
      >
        Cancel
      </button>
      <button
        class="flex cursor-pointer items-center justify-center rounded-md border border-gray-400 bg-red-900 px-1 py-1 text-sm font-bold text-gray-300 shadow-md shadow-red-900 transition-all duration-200 hover:bg-red-400/50 hover:text-red-600 hover:shadow-black sm:px-3 sm:py-2 sm:text-base"
        @click="reStart"
      >
        Confirm
      </button>
    </div>

    <button
      class="absolute top-0 right-0 mt-2 mr-2"
      @click="isShowCancelModal = false"
    >
      <span class="material-icons"> close </span>
    </button>
  </vue-final-modal>
</template>
<style></style>
