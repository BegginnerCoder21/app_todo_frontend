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

import useTodo from '@/composables/useTodo';

const {
    addTodo,
    newTodo
} = useTodo();


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