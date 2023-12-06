<template>
    <div>
        <form @submit.prevent="addTodo()">
            <div class="author">
                <label for="author">Auteur</label>
                <input v-model="newTodo.author" type="text">
            </div>
            <div class="todo">
                <label for="todo">Todo</label>
                <input v-model="newTodo.todo" type="text">
            </div>
            <input type="submit" value="Enregistrer">
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type typeTodo from "../types/typeTodo";

const newTodo = ref<typeTodo[]>([]);

const addTodo = async () => {
    let response = await fetch('http://localhost:2100/api/addTodo',{
        method : "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body : JSON.stringify({
            todo : newTodo.value.todo,
            author : newTodo.value.author
        }),
    },).then((res) => res.json())
    .catch((err) => {
        console.log(err);
    });

    newTodo.value.author = '';
    newTodo.value.todo = '';
}


</script>

<style scoped>

form , form .author, form .todo{
    display: flex;
    flex-direction: column;
    max-width: 300px;
}

form input{
    padding: 7px;
    border-radius: 5px;
} 

form div{
    padding: 15px;
}

form input[type='submit']{
    cursor: pointer;
    margin: auto;
}

</style>