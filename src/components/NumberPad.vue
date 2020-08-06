<template>
  <div id="numberPad">
    numberpad
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul></div>
</template>

<script lang="ts">
export default {
name: "NumberPad"
}
</script>

<style scoped lang="scss">
#numberPad{
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 33.3333%;

    }
  }
}
</style>