<template>
  <div class="sign-in-container">
    <div class="sign-in">
      <Form autocomplete="off" @submit="onSubmit" :validation-schema="schema">
        <h2>Psiadam konto</h2>
        <div class="form-field-container">
          <div class="form-field">
            <label for="email">Adres email</label>
            <Field name="email" type="text" />
            <ErrorMessage class="error" name="email" />
          </div>
          <div class="form-field">
            <label for="password">Hasło</label>
            <Field name="password" type="password" />
            <ErrorMessage class="error" name="password" />
          </div>
        </div>
        <span id="errorLogin" v-if="errorLogin"
          >Email lub hasło niepoprawne, sprobuj ponownie</span
        >
        <div class="sign-up-btn">
          <button>Zaloguj sie</button>
        </div>
      </Form>
    </div>
    <div class="sign-up">
      <h2>Zakładając konto zyskujesz</h2>
      <ul>
        <li>Dodawania własnych przedmiotów na sprzedarz</li>
        <li>Szybkie kupno przedmiotów innych sprzedających</li>
        <li>Historie swoich zakupów</li>
        <li>Nizsze ceny w róznych akcjach promocyjnych</li>
      </ul>
      <div class="sign-up-btn">
        <RouterLink to="/signUp">
          <button>Załóż konto</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { RouterLink, useRouter } from "vue-router";
import { useAccountStore } from "../stores/account";

let errorLogin = false;

const store = useAccountStore();

const router = useRouter();

async function onSubmit(values, { resetForm }) {
  await store.signIn({
    email: values.email,
    password: values.password,
    returnSecureToken: true,
  });

  if (store.isAuth) {
    errorLogin = false;
    router.push("/isSignIn");
  } else {
    errorLogin = true;
  }

  resetForm();
}

const schema = yup.object({
  email: yup
    .string()
    .required("Pole wymagane")
    .email("Nie poprawny adres email"),
  password: yup.string().required("Padaj hasło").min(6, "Minimum 6 znaków"),
});
</script>

<style scoped>
.sign-in-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  max-width: 120rem;
  height: 70vh;
  margin: 0 auto;
  padding-top: 4rem;
  color: var(--textLightColor);
}
h2 {
  color: black;
  font-weight: 400;
  font-size: 3rem;
  margin-bottom: 1rem;
}
input {
  outline: none;
  height: 4rem;
  border-radius: 3rem;
  border: 0.1rem solid var(--textLightColor);
  padding-left: 1rem;
  font-size: 1.5rem;
}
label {
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
}
.error {
  margin: 0.5rem 0 0.5rem 0;
  color: var(--redColor);
}
.sign-in {
  height: 30rem;
  width: 40rem;
}
.sign-up {
  width: 40rem;
}
.form-field {
  display: flex;
  flex-direction: column;
  height: 8rem;
}
#errorLogin {
  color: var(--redColor);
  font-size: 1.2rem;
  font-weight: 500;
}
button {
  width: 19rem;
  height: 4rem;
  margin-top: 1.5rem;
  background-color: transparent;
  border: 0.1rem solid var(--mainColor);
  border-radius: 3rem;
  transition: 0.4s;
}
button:hover {
  color: white;
  background-color: var(--mainColor);
}
ul > li {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  list-style: georgian inside url(../components/icons/iconListStyle.svg);
}

@media only screen and (max-width: 1200px) {
  .sign-in {
    height: 30rem;
    width: 30rem;
  }
  .sign-up {
    width: 30rem;
  }
}

@media only screen and (max-width: 650px) {
  .sign-in-container {
    grid-template-rows: 32rem 1fr;
    padding: 1rem;
    height: auto;
  }
  h2 {
    margin-bottom: 2.5rem;
  }
  .sign-in {
    grid-column: 1 / 3;
    width: 30rem;
    height: 100%;
  }
  .sign-up {
    grid-column: 1 / 3;
    margin: 1rem 0rem 1rem 3rem;
    margin: 0;
    width: 30rem;
  }
  .sign-up-btn {
    width: 19rem;
    margin: 0 auto;
  }
}
</style>
