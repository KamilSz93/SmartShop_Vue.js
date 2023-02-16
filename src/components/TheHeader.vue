<template>
    <header>
        <div class="logo">
         <img src="../assets/main-logo.png" alt="main-logo"/>
        </div>
     <div class="search-bar">
      <input type="text" class="search-bar-input" placeholder="Czego szukasz?">
    </div>  
    <ul class="categories" :class="{active: isActive}">
      <li>Smartfony</li>
      <li>Smartwatche</li>
      <li>Laptopy</li>
      <li>Desktopy</li>
      <li>Akcesoria</li>
    </ul> 
      <div class="menu-container">
        <img src="../components/icons/logoPeople.svg" alt="logo-account" class="logo-account">
        <img src="../components/icons/logoBasket.svg" alt="logo-basket" class="logo-basket">
        <button class="burger-categories" @click="clickBurger" :class="{active: isActive}" >
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  
    let isActive = ref(false)
  
    function clickBurger() {
       isActive.value = !isActive.value
      console.log(isActive.value)
    }
  </script>
  
  <style scoped>
  
  header{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    padding: .5rem;
    box-shadow: var(--shadowNav);
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: white;
  }
  .logo{
    width: 10.1rem;
    height: 4.0rem;
    padding-left: 2rem;
  }
  img{
    height: 100%;
  }
  .search-bar{
    width: calc(100% - 90rem);
    min-width: 20rem;
  }
  .search-bar-input{
    height: 3.4rem;
    width: 100%;
    max-width: 58rem;
    padding: 1rem;
    border-radius: 2rem;
    border: .1rem solid var(--textLightColor); 
    }
  .search-bar-input:focus {
    outline: none;
    box-shadow: var(--shadowSearchInputHover);
  }
  .menu-container{
    display: flex;
  }
  .logo-basket{
    height: 2.9rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  .logo-account{
    height: 2.8rem;
    cursor: pointer;
  }
  .categories{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 45rem;
    list-style: none;
    font-size: 1.4rem;
  }
  .categories li {
    cursor: pointer;
    position: relative;
    padding-bottom: .2rem;
    transform: translate(0%);
  }
  .categories li::after {
    content: '';
    position: absolute;
    bottom: -.2rem;
    left: 0rem;
    height: .4rem;
    width: 0%;
    border-radius: 2.5rem;
    background-image: var(--mainHover);
    transition: .3s ease-in-out;
  }
  .categories li:hover::after {
    width: 100%;
  }
  .burger-categories{
    display: none;
  }
     
  @media only screen and (max-width: 1080px){
    header {
      flex-wrap: wrap;
      justify-content: space-between;
      height: 11vh;
      padding-left: 2rem;
      padding-right: 2rem;  
    }
    .search-bar{
      order: 4;
      width: 100vw;
      margin-top: .5rem;
      margin-bottom: .2rem;
    }
    .search-bar-input{
      max-width: none;
    }
    .logo{
      margin-left: -1.9rem;
    }
    .menu-container{
      margin-right: .5rem;
    }
    .categories {
      position: absolute;
      left: 0;
      top: 11vh;
      background-color: white;
      width: 100vw;
      height: 90vh;
      padding: 2rem;
      flex-direction: column;
      align-items:flex-start;
      justify-content: flex-start;
      transform: translate(-100%);
      transition: .3s ease-in-out;
    }
    .categories.active{
      transform: translate(0%);    
    } 
    .categories li{
      font-size: 2.3rem;
      margin:2rem;    
    }
    .burger-categories{
      display: block;
      height: 2.9rem;
      margin-left: 2.9rem;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }
    .line{
      background-color: black;
      width: 3.5rem;
      height: .5rem;
      margin: .5rem;
      border-radius: 3.7rem;
      transition:  .3s linear ;
    }
    .burger-categories.active .line:nth-child(2){
      background-color: transparent;
    }
    .burger-categories.active .line:nth-child(1){
      transform: rotate(45deg) translateY(9px) translateX(5px)
    }
    .burger-categories.active .line:nth-child(3){
      transform: rotate(-45deg) translateY(-9px) translateX(5px)
    }    
  }
  </style>
  