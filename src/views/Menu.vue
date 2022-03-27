<template>
  <div>
    <div>
      <router-link id="CurrentMenuLink" to="current">CurrentMenu</router-link> |
      <router-link id="ArchiveMenuLink" to="archive">ArchiveMenu</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>
