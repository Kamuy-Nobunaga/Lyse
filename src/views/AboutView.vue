<template>
  <div class="about">
    <h1>About Lyse</h1>
    <p>{{ $t('aboutUs') }} </p>
    <img src="https://thisthingofours.co.uk/cdn/shop/files/CMFxTTOO.2.png?v=1705933537" alt="about page image">
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    text-align: center;
    color: var(--font);
    > h1 {
      font-size: 3rem;
    }
    > p {
      margin: 0 auto;
      margin-bottom: 1rem;
      text-align: left;
      width: 50%;
      line-height: 3rem;
      font-size: 1.5rem;
    }
    > img {
      width: 100%;
    }
  }
}
</style>
