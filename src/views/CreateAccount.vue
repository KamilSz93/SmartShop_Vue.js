<template>
  <div class="container-create-account">
    <img src="../assets/create-account-picture.svg" alt="account-picture" />
    <Form autocomplete="off" @submit="onSubmit" :validation-schema="schema">
      <div class="form-header">Załóż konto</div>
      <div class="form-field-container">
        <div class="form-field">
          <label for="email">Twój email</label>
          <Field name="email" type="text" />
          <ErrorMessage class="error" name="email" />
        </div>
        <div class="form-field">
          <label for="password">Podaj hasło</label>
          <Field name="password" type="password" />
          <ErrorMessage class="error" name="password" />
        </div>
        <div class="form-field">
          <label for="repeat-password">Powtórz hasło</label>
          <Field name="repeat-password" type="password" />
          <ErrorMessage class="error" name="repeat-password" />
        </div>
      </div>
      <button>Zarejstruj</button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAccountStore } from "../stores/account";
import * as yup from "yup";

const store = useAccountStore();

function onSubmit(values, { resetForm }) {
  console.log(values);
  store.signUp({
    email: values.email,
    password: values.password,
    returnSecureToken: true,
  });
  resetForm();
}
//* Firebase want 6 chart for passwort  *//
const schema = yup.object({
  email: yup
    .string()
    .required("Pole wymagane")
    .email("Nie poprawny adres email"),
  password: yup.string().required("Padaj hasło").min(6, "Minimum 6 znaków"),
  "repeat-password": yup
    .string()
    .required("Padaj hasło")
    .oneOf([yup.ref("password"), null], "Hasło rozni sie od podanego"),
});
</script>

<style scoped>
.container-create-account {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100% 1fr;
  justify-items: center;
  align-items: start;
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem;
}
img {
  margin-top: 6rem;
  width: 35rem;
}
Form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0 0 0;
  width: 100%;
  height: 40rem;
}
.form-header {
  font-size: 3rem;
  color: var(--textLightColor);
}
.form-field {
  display: flex;
  flex-direction: column;

  height: 6.7rem;
}
label {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}
input {
  width: 28rem;
  height: 3rem;
  border-radius: 3rem;
  border: 0.1rem solid var(--textLightColor);
  padding: 1rem;
  outline: none;
}
input:hover {
  box-shadow: var(--shadowSearchInputHover);
}
.error {
  margin-top: 0.2rem;
  color: var(--redColor);
}
button {
  width: 15rem;
  height: 3.5rem;
  background-color: transparent;
  border: 0.1rem solid var(--mainColor);
  border-radius: 3rem;
  transition: 0.4s;
}
button:hover {
  color: white;
  background-color: var(--mainColor);
}
@media only screen and (max-width: 1200px) {
  .container-create-account {
    padding: 1rem;
  }
  img {
    width: 30rem;
  }
}
@media only screen and (max-width: 480px) {
  .container-create-account {
    grid-template-rows: [row-1-start] 1fr [row-2-start];
    padding: 0.6rem;
  }
  img {
    grid-column: 1 / 3;
    width: 100%;
  }
  Form {
    grid-column: 1 / 3;
  }
}
</style>
