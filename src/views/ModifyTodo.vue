<template>
    <div>
        <form @submit.prevent="modifyTodo()">
            <div class="author">
                <label for="author">Auteur</label>
                <input v-model="infoTodo.author" type="text">
            </div>
            <div class="todo">
                <label for="todo">Todo</label>
                <input v-model="infoTodo.todo" type="text">
            </div>
            <input type="submit" value="Enregistrer">
        </form>
    </div>
</template>

<script setup lang="ts">
import useTodo from '../composables/useTodo';
import { onMounted } from 'vue';

const props = defineProps( {
    idTodo: {
        type: String,
        required: true,
      }
});


const {
    modifyTodo,
    getTodo,
    infoTodo
} = useTodo();
onMounted(async() => {
    let id = props.idTodo;
    await getTodo(id);
})

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