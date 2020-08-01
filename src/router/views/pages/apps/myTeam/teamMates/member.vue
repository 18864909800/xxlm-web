<script>
/**
 * Member UI component. Renders a nice member summary having image, name and description
 */
export default {
  props: {
    image: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: null,
    },
  },
}
</script>
<template>
  <div>
    <div class="media mt-1 border-top pt-3" :class="{ isSelected: isSelected }">
      <img :src="`${image}`" class="avatar rounded mr-3" alt="头像" style="color: gray" />
      <div class="media-body">
        <h6 class="mt-1 mb-0 font-size-15 title">{{ name }}</h6>
        <h6 class="text-muted font-weight-normal mt-1 mb-3">{{ gender }}</h6>
      </div>
    </div>
  </div>
</template>
