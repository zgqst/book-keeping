<template>
  <svg class="icon">
      <use :xlink:href="'#icon-'+name"></use>
    </svg>
</template>

<script lang="ts">
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().map(requireContext);
const req = require.context('../assets/icons', true, /\.svg$/);
try {
  requireAll(req);
} catch (error) {
  console.log(error);
}
export default {
  name: 'Icon',
  props:['name']
};
</script>

<style scoped lang="scss">
.icon {
  width: 1.6em;
  height: 1.6em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>