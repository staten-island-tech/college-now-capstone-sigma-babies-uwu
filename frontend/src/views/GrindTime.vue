<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue'
let notes = ref([])
async function getNote() {
    let res = await fetch('http://localhost:3000/note/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    })
    let data = await res.json(); 
    notes.value = data;
    console.log(notes.value)
}
getNote();
</script>
<template>
    <NavBar/>
    <div class="con">
        <div class="leftCon">
        <div class="left" v-for="note in notes" :key="note.id" @click="selected(data, id, title, note, owner, user)">
            <h2>{{note.note}}</h2>
        </div>
    </div>
    <div class="right">
        <h2>{{ title }}</h2>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            selected: [
                {
                    data: null,
                    id: null,
                    title: null,
                    note: null,
                    owner: null,
                    user: null,

                }
            ]
        }
    },
    methods:{
        select(data, id, title, note, owner, user){
            this.selected.data=data
            this.selected.id=id
            this.selected.title=title
            this.selected.owner = owner;
            this.selected.note=note
            this.selected.user=user
        }
    }
}
</script>
<style scoped>
@font-face {
  font-family: comicSans;
  src: url(comicsans.ttf);
}
.noteDisplay{
    width: 60vw;
}
h2{
    text-align: center;
    padding: 1vw;
    font-family: comicSans;
    color: rgb(219, 138, 138);
    font-size: 1.2vw;
}
.left{
    margin-top: 2vw;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    width: 20vw;
    border-radius: 3vw;
    margin: 3vw;
}
.right{
    width: 50vw;
    border-radius: 3vw;
    background-color: rgb(255, 255, 255);
    height: 70vh;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.leftCon{
    height: 90vh;

}
.con{
    display: flex;  
    justify-content: center;
    margin-top: 3vw;
}
</style>