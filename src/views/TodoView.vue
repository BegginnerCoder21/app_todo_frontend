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
import { onMounted} from 'vue';
import useTodo from '../composables/useTodo';

const { 
    destroyTodo,
    getAllTodo,
    getUrl,
    todo
} = useTodo();


onMounted(async() => {
    getAllTodo();
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