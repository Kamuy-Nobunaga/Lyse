<template>
    <transition name="modal" class="modal">
      <dialog
        ref="modal"
        class="modal-container"
        v-show="productStore.itemAdded" 
      >
        <div class="cart-header">
          <slot name="header"><p>Item added!</p></slot>
          <!-- <el-icon @click="productStore.toggleItemAdded"><Close /></el-icon> -->
        </div>
  
        <div class="cart-body">
          <slot name="cart-body">
          </slot>
        </div>
  
        <div class="cart-footer">
          <slot name="cart-footer">
          </slot>
          <button class="btn" @click="keepShopping">Keep Shopping</button>
          <button class="btn" @click="checkout">Checkout</button>
        </div>
      </dialog>
    </transition>
  </template>
  
<script setup lang="ts">
    import { watchEffect, ref, onMounted } from 'vue';
    import { useProductStore } from '@/stores/product'
    import { useRoute, useRouter } from 'vue-router';
    import { Close } from '@element-plus/icons-vue';
    import { useI18n } from 'vue-i18n';


    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    const { locale } = useI18n()
    
    const modal = ref<HTMLDialogElement>()
    
    const keepShopping = () => {
      productStore.itemAdded  = false
      productStore.showCarAtNav = false
      router.push({ path: `/${locale.value}/ProductList` })

    }

    const checkout = () => {
      productStore.itemAdded  = false
      productStore.showCarAtNav = false
      router.push({ path: `/${locale.value}/checkout`})
    }

    watchEffect(() => {
        if (productStore.itemAdded) modal.value?.showModal()
        console.log(productStore.itemAdded);
    })

</script>
  
  <style scoped>
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-active {
    transition-timing-function: "ease-out";
  }
  
  .modal-leave-active {
    transition-timing-function: "ease-in";
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition-duration: 200ms;
  }
  
  .modal-enter-from.modal-container,
  .modal-leave-to.modal-container {
    transform: scale(0.9) translateY(-2rem);
  }
  
  .modal-container::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    color: var(--font);
    background: var(--light);
    border: none;
    font-size: 1.5rem;
    width: 80%;
    .cart-header {
      position: relative;
      > p {
        width: 20%;
        margin: 0 auto;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        background: var(--dark);
        color: var(--light);
      }
    }
    .cart-footer {
      text-align: center;
      > button {
        margin-top: 1rem;
        margin-right: 1rem;
        color: var(--dark);
        background: var(--light);
        border: 1px solid var(--dark);
        border-radius: 5px;
        font-size: 1.5rem;
      }
      .btn {
        cursor: pointer;
      }
      .btn:hover {
          color: var(--light);
          background: var(--dark);
      }
    }     
  }

@media (max-width: 767px) {
  .modal {
    font-size: 0.8rem;
    width: 90%;
    .cart-header {
      > p {
        width: 80%;
      }
    }
    .cart-footer {
      .btn {
        font-size: 0.8rem;
      }
    }     
  }
}
</style>

  <!-- https://thisthingofours.co.uk/cdn/shop/files/Archive-Web.png?v=1708689841 -->
  