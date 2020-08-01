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
    text: {
      type: String,
      default: null,
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
    <div class="media mt-1 border-top pt-3">
      <img :src="`${image}`" class="avatar rounded mr-3" alt="shreyu" />
      <div class="media-body">
        <h6 class="mt-1 mb-0 font-size-15">{{ name }}</h6>
        <h6 class="text-muted font-weight-normal mt-1 mb-3">{{ gender }}</h6>
      </div>
      <b-dropdown
        variant="black"
        right
        toggle-class="arrow-none text-muted pr-0"
      >
        <template v-slot:button-content>
          <i class="uil uil-ellipsis-v"></i>
        </template>
        <b-dropdown-item href="javascript:void(0);" variant="danger">
          <i class="uil uil-trash mr-2"></i>Delete
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>
