<template>
   <div class="product-item"> 
      <div class="product-image">
        <img :src='url[1]'  alt="product-image"/>
      </div>
      <div class="product-name">Sony</div>
      <div class="product-description">screen ram processor</div>
      <div class="product-price">price</div>
      <div class="product-add-to-basket">
        <button class="product-add-to-basket-btn">Dodaj do koszyka</button>
      </div>
   </div>
</template>

<script setup>

import { onMounted, computed } from 'vue';
import { useGetItemStore,  } from '../stores/items';

const store = useGetItemStore()

 onMounted (async ()=>{
   await store.downloadUrlImages()
})

let url = computed(()=> store.urlImage.map(el=> el.obj));

</script>

<style>
  .product-item{
    position: relative;
    width: 26rem;
    height: 39rem;
    box-shadow: var(--shadowSearchInputHover);
    background-color: white;
    margin: 0 1.5rem 3rem 1.5rem;
    padding: 2rem;
    border-radius: .5rem;
  }
  .product-image{
    display: flex;
    justify-content: center;
  }
  .product-image img{
    width: 22rem;
  }
  .product-name{
    margin-top: 1rem;
    font-size: 2.4rem;
  }
  .product-description{
    margin-top: 1rem;
    font-size: 1.5rem;
  }
  .product-add-to-basket{
    position: absolute;
    bottom: 2rem;
    width: 22rem;
    margin-left: auto;
    margin-right: auto;
  }
  .product-add-to-basket-btn{
    width: 100%;
    height: 3.5rem;
    background-color: transparent;
    border: .1rem solid var(--mainColor);
    border-radius: 4rem;
    transition: .4s;
  }
  .product-add-to-basket-btn:hover{
    color: white;
    background-color: var(--mainColor);
  }
</style>