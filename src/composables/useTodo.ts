import { ref } from "vue";
import type typeTodo from "@/types/typeTodo";
import type typeInfoTodo from "@/types/typeInfoTodo";

export default function useTodo(){
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

    const todo = ref();
    const getAllTodo = async() => {
        let response = await fetch('http://localhost:2100/api/getTodo')
    .then((res) => res.json())
    .catch((err) =>{
        console.log(err);
    });
    todo.value = response;
    }

    
    const newTodo = ref<typeTodo>({
    todo : "",
    author : ""
    });

    const addTodo = async () => {
    let response = await fetch('http://localhost:2100/api/addTodo',{
        method : "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body : JSON.stringify({
            todo : newTodo.value?.todo,
            author : newTodo.value?.author
        }),
    },).then((res) => res.json())
    .then((res) => {
        newTodo.value.author = '';
        newTodo.value.todo = '';
        window.location.href = "/todo"
    })
    .catch((err) => {
        console.log(err);
    });
}
    
    
const infoTodo = ref<typeInfoTodo>( 
    {
        id : '',
        author : '',
        todo : ''
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
    .then((res) => window.location.href = "/todo")
    .catch((err) => {
        console.log(err);
    });

}

const getTodo = async(id : string) => {
    
    let response =await fetch("http://127.0.0.1:2100/api/todo/" + id)
    .then((res) => res.json())
    .catch((err) => console.log(err)
    );
    infoTodo.value.author = response.author;
    infoTodo.value.todo = response.todo;
    infoTodo.value.id = response._id;
}



    return {
        destroyTodo,
        getAllTodo,
        getUrl,
        todo,
        addTodo,
        newTodo,
        modifyTodo,
        getTodo,
        infoTodo
    }
}