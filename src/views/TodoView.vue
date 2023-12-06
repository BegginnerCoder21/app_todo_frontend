<template>
    <div class="todo" v-for="item in todo" :key="item._id">
        <h3>{{ item.author }}</h3>
        <p>{{ item.todo }}</p>
        <div >
            <a :href="getUrl(item._id)">
                <button class="modify" type="button">Modifier</button>
            </a>
            
            <button type="button" @click="destroyTodo(item._id)">Supprimer </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';


const todo = ref([]);

const destroyTodo = async(idTodo : string) => {

    let response = await fetch('http://localhost:2100/api/deleteTodo/' + idTodo,{
        method : 'DELETE',
    }).then((res) => res.json())
    .then(() => window.location.href = '/todo')
    .catch((err) => {
        console.log(err);
        
    });
    
}

const getUrl = (id : string) => {
    return "/" + id + "/modifyTodo"
}

onMounted(async() => {
    let response = await fetch('http://localhost:2100/api/getTodo')
    .then((res) => res.json())
    .catch((err) =>{
        console.log(err);
    });
    todo.value = response;
    
});

</script>

<style scoped>
.todo{
    margin-top: 50px;
}
.todo .modify{
    margin-right: 15px;
}
.todo button{
    padding: 5px;
    cursor: pointer;
}
</style>