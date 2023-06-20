<template>
  <div class="emptyPageContainer">
    <h1>Ta strona jest w trakcie pracy za utrudnienia przepraszamy : /</h1>
    <div class="box-picture">
      <img
        src="../assets/empty-page.svg"
        alt="picture-empty-page"
        class="empty-picture"
      />
    </div>
    <h2>Przejdz do zakładki Smartfony</h2>
    <RouterLink to="/smartphones">
      <button class="go-to-smartfons-btn">Przejdz</button>
    </RouterLink>
  </div>
</template>

<script setup></script>

<style scoped>
.emptyPageContainer {
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  margin: 3rem 3rem;
  font-weight: 400;
  color: var(--textLightColor);
}
h2 {
  margin: 2rem 3rem;
}
.empty-picture {
  max-width: 50rem;
  object-fit: contain;
}
.go-to-smartfons-btn {
  width: 20rem;
  height: 3.5rem;
  background-color: transparent;
  border: 0.1rem solid var(--mainColor);
  border-radius: 4rem;
  transition: 0.4s;
}
.go-to-smartfons-btn:hover {
  color: white;
  background-color: var(--mainColor);
}
@media only screen and (max-width: 700px) {
  .empty-picture {
    max-width: calc(100vw - 4rem);
    object-fit: contain;
  }
}
</style>
