<template>
    <div class="modal-mask" v-show="productStore.showAlert">
      <div class="modal-wrapper">
        <div class="modal-container">
            <slot name="modal-header">
            </slot>

            <slot name="modal-body">
            </slot>
            <slot name="modal-footer">
            </slot>
        </div>
      </div>
    </div>
  </template>
<script setup lang="ts">
  import { useProductStore } from '@/stores/product'; 

  const productStore = useProductStore()
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
        .modal-container {
            width: 300px;
            margin: 0px auto;
            padding: 20px 30px;
            border-radius: 5px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
            background: var(--light);
        }
    }
}
/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>