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
import { onMounted, ref } from 'vue';

const infoTodo = ref([
    {
        id : '',
        author : '',
        todo : ''
    }
]);
const props = defineProps( {
    idTodo: {
        type: String,
        required: true,
      }
});

const modifyTodo = async () => {
    let response = await fetch('http://127.0.0.1:2100/api/updatedTodo/' + infoTodo.value.id,{
        method : "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body : JSON.stringify({
            todo :infoTodo.value.todo,
            author : infoTodo.value.author
        }),
    },).then((res) => res.json())
    .catch((err) => {
        console.log(err);
    });

    console.log(response);
    

}

onMounted(async() => {
    let id = props.idTodo;
    let response =await fetch("http://127.0.0.1:2100/api/todo/" + id)
    .then((res) => res.json())
    .catch((err) => console.log(err)
    );
    infoTodo.value.author = response.author;
    infoTodo.value.todo = response.todo;
    infoTodo.value.id = response._id;
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