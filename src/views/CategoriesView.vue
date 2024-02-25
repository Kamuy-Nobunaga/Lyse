<template>
    <h2>{{ $t('categories') }}</h2>
    <p>Pick an item in each to redefine your style.</p>
    <div class="categories">
        <h3>{{ $t('top') }}</h3>
        <div class="top">
            <img src="https://thisthingofours.co.uk/cdn/shop/files/VertexNXL.1.png?v=1706370172" alt="top image" @click="handleTop">

            
        </div>
        <h3>{{ $t('bottom') }}</h3>
        <div class="bottom">
            <img src="https://cafe24img.poxo.com/anglan/web/product/extra/small/202402/70e48c48d8e8f478276a688750f660e4.jpg" alt="bottom image" @click="handleBottom">
        </div>
    </div>
    
</template>
  
  <script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { useProductStore } from '@/stores/product';
    import { useI18n } from 'vue-i18n';

  
  
  
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    const { locale } = useI18n()
    
      
    onMounted(() => {
      productStore.fetchProducts()
    })
    
    const handleTop = () => {
        router.push({ path: `/${locale.value}/top` })
    }

    const handleBottom = () => {
        router.push({ path: `/${locale.value}/bottom` })
    }

  
  </script>
  
  <style lang="scss" scoped>
  h2, p {
    text-align: center;
  }
  h2 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
  }
  .categories {
    > h3 {
            color: var(--font);
            font-size: 2rem;
            margin-left: 0.5rem;
        }
    .top {
        margin-top: -18%;
        margin-bottom: -15%;
        clip-path: inset(30% 0);
        cursor: pointer;
        > img {
            width: 100%;            
        }
    }
    .bottom {
        clip-path: inset(40% 0);
        margin-top: -51%;
        cursor: pointer;
        > img {
            width: 100%;
            
        }
    }
  }
  </style>