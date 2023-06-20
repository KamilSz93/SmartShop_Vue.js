<template>
  <div class="container-my-account">
    <h1>Witaj, jesteś zalogowany</h1>
    <div class="container-add-new-sale-announcement">
      <h2>Dodaj nowy przedmiot w mgnieniu oka</h2>
      <Form autocomplete="off" @submit="onSubmit" :validation-schema="schema">
        <div class="form-field-container">
          <div class="form-field">
            <label for="name">Nazwa</label>
            <Field name="name" type="text" />
            <ErrorMessage class="error" name="name" />
          </div>
          <div class="form-field">
            <label for="screen">Wyświetlacz</label>
            <Field name="screen" type="text" />
            <ErrorMessage class="error" name="screen" />
          </div>
          <div class="form-field">
            <label for="ram">Pamięć ram</label>
            <Field name="ram" type="text" />
            <ErrorMessage class="error" name="ram" />
          </div>
          <div class="form-field">
            <label for="processor">Procesor</label>
            <Field name="processor" type="text" />
            <ErrorMessage class="error" name="processor" />
          </div>
          <div class="form-field">
            <label for="price">Cena</label>
            <Field name="price" type="number" />
            <ErrorMessage class="error" name="price" />
          </div>
          <div class="add-picture">
            <h3>
              Jeśli posiadasz zdjecie przedmiotu dodaj je, zwiekszy to szanse na
              sprzedaz produktu
            </h3>
            <form id="upload-form">
              <label for="uploadImage" class="custom-file-upload"
                >Wybierz zdjecie</label
              >
              <input
                id="uploadImage"
                type="file"
                name="file"
                @change="previewImage"
              />
              <img id="uploadPreview" src="../assets/no-picture.jpg" />
            </form>
          </div>
        </div>
        <div class="sign-up-btn">
          <button>Dodaj ogłoszenie</button>
        </div>
      </Form>
    </div>
    <div class="container-your-discounts">
      <h2>Twoje zniżki</h2>
      <ul class="your-discounts-list">
        <li>po zalogowaniu - 2% na akcesoria</li>
        <li>darmowa przesyłka powżej 2000zł</li>
        <li>bezpłatne dodanie ogłoszenia</li>
      </ul>
      <img
        class="discount-picture"
        src="../assets/discount-picture.svg"
        alt="discount-picture"
      />
      <button id="logout-btn" v-if="storeAccount.isAuth" @click="myLogout()">
        Wyloguj się
      </button>
    </div>
  </div>
  <Modal>
    <div class="modal-content">
      <h1>Informacja</h1>
      <p>
        Brawo, Twoje ogłoszenie zostało dodane, teraz wszyscy będą je mogli
        zobaczyć
      </p>
    </div>
  </Modal>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useGetItemStore } from "../stores/items";
import { useAccountStore } from "../stores/account";
import { useRouter } from "vue-router";
import Modal from "../components/TheModal.vue";
import { useInteractionStore } from "../stores/interaction";

const storeInteraction = useInteractionStore();

//* view of the loaded image *//
const previewImage = function () {
  let oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
  oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
  };
};

const storeItem = useGetItemStore();
const storeAccount = useAccountStore();

const router = useRouter();

async function onSubmit(values, { resetForm }) {
  let url = await addPictureHandl();

  const payload = {
    count: 1,
    urlPicture: url ? url : storeItem.noPicture.item,
    name: values.name,
    screen: values.screen,
    ram: values.ram,
    processor: values.processor,
    price: parseInt(values.price),
  };

  await storeItem.postDataItems(payload);

  storeInteraction.toggleCloseModalAddProduct();

  resetForm();
}

const addPictureHandl = async () => {
  const storage = getStorage();

  let form = document.getElementById("upload-form");
  let file = form.file.files[0];

  if (file) {
    //Path to picture in folder
    const smartfonRef = ref(storage, `images/${file.name}`);
    await uploadBytes(smartfonRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    return await storeItem.downloadUrlImages(file.name);
  }
};

const schema = yup.object({
  name: yup
    .string()
    .required("Pole wymagane")
    .min(6, "Minimum 6 znaków")
    .max(20, "Max 20 znaków"),
  screen: yup
    .string()
    .required("Podaj dane o wyświetlaczu")
    .min(3, "Minimum 3 znak")
    .max(25, "Max 25 znaków "),
  ram: yup
    .string()
    .required("Podaj ilość pamięci ram")
    .min(1, "Minimum 1 znak")
    .max(10, "Max 10 znaków"),
  processor: yup
    .string()
    .required("Podaj dane o precesorze")
    .min(5, "Minimum 5 znak")
    .max(25, "Max 25 znaków"),
  price: yup
    .number()
    .typeError("Please enter number value only")
    .moreThan(-1, "Ujemne wartości nie sa akceptowane")
    .max(100000, "Za duża kwota"),
});

const myLogout = () => {
  storeAccount.logout();
  router.push("/");
};
</script>

<style scoped>
.container-my-account {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 7rem 1fr;
  max-width: 120rem;
  margin: 0 auto;
}
h1 {
  grid-column: 1 / 3;
  width: 40rem;
  margin: auto 0 auto 10rem;
  font-size: 3rem;
  font-weight: 400;
  color: var(--textLightColor);
}
h2 {
  width: 40rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}
h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.container-add-new-sale-announcement {
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-field-container {
  width: 40rem;
}
.form-field {
  display: flex;
  flex-direction: column;
  height: 7.5rem;
}
label {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}
.error {
  color: var(--redColor);
  margin-top: 0.2rem;
}
.form-field input {
  width: 40rem;
  height: 4rem;
  border-radius: 4rem;
  outline: none;
  border: 0.1rem solid var(--textLightColor);
  font-size: 2rem;
  padding-left: 1rem;
}
/* Custom file upload style*/
input[type="file"] {
  display: none;
}
#upload-form {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.custom-file-upload {
  width: 17rem;
  height: 10rem;
  padding: 2rem 4rem 1rem 4rem;
  background-color: var(--mainColor);
  border: 0.1rem solid var(--mainColor);
  border-radius: 2rem;
  transition: 0.4s;
  text-align: center;
  line-height: 2.7rem;
  font-size: 2rem;
  color: white;
}
.custom-file-upload:hover {
  color: var(--textLightColor);
  background-color: transparent;
}
#uploadPreview {
  width: 17rem;
  height: 10rem;
  object-fit: contain;
  border: 0.2rem solid var(--textLightColor);
}
button {
  width: 22rem;
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
.container-your-discounts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
}
ul > li {
  font-size: 2rem;
  list-style: georgian inside url(../components/icons/iconListStyle.svg);
  margin-bottom: 1rem;
  margin-left: -4rem;
  color: rgb(150, 142, 142);
}
.discount-picture {
  margin-top: 5rem;
  margin-left: -3rem;
  width: 30rem;
}
#logout-btn {
  margin: auto 0 0 auto;
  border-color: var(--redColor);
  color: var(--redColor);
}
#logout-btn:hover {
  background-color: var(--redColor);
  color: white;
}
.modal-content {
  display: flex;
  flex-direction: column;
  background-color: white;
}
.modal-content > h1 {
  width: fit-content;
  margin: 0 auto 1rem 0;
  font-size: 1.7rem;
  color: black;
}
.modal-content > p {
  font-size: 1.4rem;
}
@media only screen and (max-width: 1200px) {
  .container-my-account {
    height: auto;
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 3.5rem;
  }
  h2 {
    width: 100%;
    font-size: 2rem;
    text-align: center;
  }
  .container-add-new-sale-announcement {
    grid-column: 1 / 3;
    width: 100%;
  }
  .container-your-discounts {
    grid-column: 1 / 3;
    width: 100%;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 0.2rem solid var(--textLightColor);
  }
  #logout-btn {
    margin: 3rem auto 0 auto;
  }
  .sign-up-btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 480px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  .form-field-container {
    width: 90%;
    margin: 0 auto;
  }
  .form-field {
    height: 6rem;
  }
  .form-field input {
    width: 100%;
    height: 3rem;
    border-radius: 3rem;
    font-size: 1.5rem;
  }
  label {
    font-size: 1.21rem;
  }
  /* Custom file upload style*/
  .custom-file-upload {
    width: 12rem;
    height: 7rem;
    padding: 1.2rem 3rem 1rem 3rem;
    border-radius: 1.5rem;
    line-height: 2.2rem;
    font-size: 1.6rem;
  }
  #uploadPreview {
    width: 12rem;
    height: 7rem;
  }
  .error {
    font-size: 0.9rem;
  }
  button {
    width: 20rem;
    height: 3rem;
  }
  .container-your-discounts {
    width: 100%;
  }
  ul > li {
    margin: 0.5rem 1rem;
  }
  .discount-picture {
    margin-top: 5rem;
    margin: 3rem auto;
    width: 30rem;
  }
}
</style>
