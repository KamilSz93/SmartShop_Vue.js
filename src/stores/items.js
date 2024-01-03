import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from "axios";

export const useGetItemStore = defineStore("items", () => {
  /**State **/
  let storeData;

  const noPicture = reactive({
    item: "https://firebasestorage.googleapis.com/v0/b/gamer-7db00.appspot.com/o/images%2Fno-picture.jpg?alt=media&token=3955b1cd-7d91-4c83-b323-2ef952074875",
  });

  /*Getters */
  let compStoreData = computed(() => storeData);

  /**Actions **/
  // dowlands url picture with firebase cloud storage
  async function downloadUrlImages(fileName) {
    let urlPicture = "";

    const storage = getStorage();

    await getDownloadURL(ref(storage, `images/${fileName}`)).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
      urlPicture = url;
    });
    return urlPicture;
  }

  //post data objects with firebase realtime database using axios
  async function postDataItems(payload) {
    try {
      await axios.post(
        "https://gamer-7db00-default-rtdb.firebaseio.com/smartfons.json",
        payload
      );
    } catch (error) {
      console.log(error);
    }
    await getDataItems();
  }

  // getDataItems using axios with realtime database
  async function getDataItems() {
    try {
      let { data } = await axios.get(
        "https://gamer-7db00-default-rtdb.firebaseio.com/smartfons.json"
      );

      let items = [];

      Object.keys(data).forEach((key) => {
        items.push({ id: key, ...data[key] });
      });
      storeData = items;
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    noPicture,
    compStoreData,
    storeData,
    downloadUrlImages,
    getDataItems,
    postDataItems,
  };
});
