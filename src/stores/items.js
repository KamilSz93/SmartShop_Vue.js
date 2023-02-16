import { defineStore } from "pinia";
import { getStorage, ref, getDownloadURL} from 'firebase/storage'
import { computed, reactive } from 'vue'

export const useGetItemStore = defineStore('cos', () => {
    /*State */
    var urlImage = reactive([{obj: 'xxx'}]);
    /*Getters */
   var urlComp = computed(()=> urlImage)
    /*Actions */
    
    async function downloadUrlImages() {
        const storage = getStorage()
        const pathReference = ref(storage, 'images/smartfon')

        await getDownloadURL(ref(storage, 'images/smartfon'))
          .then((url) => {
             const xhr = new XMLHttpRequest();
             xhr.responseType = 'blob';
             xhr.onload = (event) => {
             const blob = xhr.response;
         };
            xhr.open('GET', url);
            xhr.send();

            urlImage.push({obj: url})
            console.log('z storage '+ urlImage[1].obj)
          })  
    }
    
    return  { urlImage , urlComp, downloadUrlImages  }   
});