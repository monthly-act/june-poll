<template>
  <div></div>
</template>

<script>

export default {
  mounted() {
    debugger; 
    const { email, name, picture } = this.$route.query;

    this.$store.dispatch('login', { email, name, picture });

    this.$router.push('/user-home');
  },
};
</script>
