<template>
    <div class="todo" v-for="item in todo" :key="todo._id">
        <h3>{{ item.author }}</h3>
        <p>{{ item.todo }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const todo = ref([]);

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
</style>