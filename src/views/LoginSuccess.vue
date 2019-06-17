<template>
  <div></div>
</template>

<script>

export default {
  mounted() {
    const { email, name, picture } = this.$route.query;

    this.$store.dispatch('login', { email, name, picture });

    this.$router.push('/user-home');
  },
};
</script>


<style scoped>
</style>
