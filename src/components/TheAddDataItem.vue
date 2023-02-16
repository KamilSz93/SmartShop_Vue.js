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
 import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
 

 const storage = getStorage();

 const imagesRef = ref(storage , 'images/');
 
// const storageRef = ref(storage, smartfonRef);
 // Pobieranie
 const pathReference = ref(storage, 'images/smartfon');
 const gsReference = ref(storage, 'gs://bucket/images/smartfon');

/*Upload file*/

 window.addEventListener('load', function(){
     document.getElementById('upload-form').addEventListener('submit', function(event){
        event.preventDefault();
 
        var form = event.target;
          console.log(form.file)
        var file = form.file.files[0];
          console.log(file.name);
          //Path to picture in folder
        const smartfonRef = ref(storage, `images/${file.name}`)
        uploadBytes(smartfonRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
     })
 })
 

 </script>

<style scoped>

</style>