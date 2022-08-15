<script setup>
const getData = async () => {
  const res = await fetch("../../classData.json");
  const data = await res.json();
  console.log("res :>> ", res);
  console.log("data :>> ", data);
};

onMounted(() => {
  getData();
});
</script>
<template>
  <div class="font-serif">
    <Navbar />
  </div>
</template>
<style></style>
