<template>
  <div>
    Detail
    <div class="new">
      <svg>
        <use xlink:href="#icon-edit"></use>
      </svg>
      记一笔
    </div>
  </div>

</template>

<script lang="ts">
import '@/assets/icons/edit.svg';

export default {
  name: 'Detail',
};
</script>
<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.new {
  position: absolute;
  top: 83%;
  left: 50%;
  font-weight: bold;
  color: $color-font;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
  border: 2px solid $color-font;
  width: 80px;
  height: 80px;
  cursor: pointer;

  svg {
    width: 50px;
    height: 50px;
    margin-bottom: -5px;
    margin-top: -5px;

  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>