<template>
  <div class="about">
    <h1>About Lyse</h1>
    <p>{{ $t('aboutUs') }} </p>
    <img src="https://thisthingofours.co.uk/cdn/shop/files/CMFxTTOO.2.png?v=1705933537" alt="about page image">
    <!-- <img src="https://thisthingofours.co.uk/cdn/shop/files/Archive-Web.png?v=1708689841" alt="another about page image"> -->
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
      position: relative;
    }
    > img {
      width: 100%;
    }
  }
  .about::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-image: url('https://thisthingofours.co.uk/cdn/shop/files/Archive-Web.png?v=1708689841');
    /* background-repeat: no-repeat; */
    /* background-position: 50% 0; */
    /* background-size: cover; */

  }
}
</style>
