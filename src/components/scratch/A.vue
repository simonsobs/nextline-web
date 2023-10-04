<template>
  <div>
    <h1>Scratch A</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
async function fetch() {
  await new Promise((resolve) => setTimeout(resolve, 2000));	
  // throw new Error("This is an error");
  return "Do eiusmod reprehenderit voluptate do labore veniam voluptate anim. ";
}

const text = await fetch();
</script>
