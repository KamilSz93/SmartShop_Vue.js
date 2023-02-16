<template>
   <form id="upload-form">
     <input type="file" name="file" required>
     <input type="submit" value="Upload"/>
   </form>
   <button @click="download">Pobierz na szybko</button>
   <button @click="showImage">Pokaz na szybko</button>
   <img id="myImg"/>
</template>

<script setup>

//import { getStorage, ref as stRef, uploadBytes } from  "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
//import { getDatabase, ref as dbRef, push, set } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

let file = '';

let urlImage = '';



const storage = getStorage(app);

const imagesRef = ref(storage , 'images');

const smartfonRef = ref(storage, 'images/smartfon')

const storageRef = ref(storage, smartfonRef);
// Pobieranie
const pathReference = ref(storage, 'images/smartfon');
const gsReference = ref(storage, 'gs://bucket/images/smartfon');
 



//const database = getDatabase();
//const databaseReference = dbRef(database, "files");


window.addEventListener('load', function(){
    document.getElementById('upload-form').addEventListener('submit', function(event){
        event.preventDefault();

        var form = event.target;
         console.log(form.file)
        var file = form.file.files[0];
        console.log(file);

        uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
});
    })
})

//const storageRef = stRef(storage, "files/" + file.name);
 function download (){
    getDownloadURL(ref(storage, 'images/smartfon'))
  .then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event ) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
     console.log(url)
     urlImage = url
    
  })
  .catch((error) => {
    /////
  })
  
 }

 function showImage (){
    const img = document.getElementById('myImg');
    img.setAttribute('src', urlImage);
 }

</script>