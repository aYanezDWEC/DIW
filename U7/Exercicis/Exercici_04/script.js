import HeaderPost from "./Components/Header.js";
import FooterPost from "./Components/Footer.js";
import BlogPost from "./Components/Post.js";
import Post from "./Components/Post.js";
import router from "./router.js";

//Aconseguim el darrer id que hi ha guardat enel localstorage i si no hi ha cap guardat possará 0
var id = JSON.parse(localStorage.getItem('lastId')) || 0;

const { createApp } = Vue;

var app = createApp({
    data() {
        return {
            form: { //creem les variables que necessitem guardar info
                idPost: '',
                title: '',
                summary: '',
                content: '',
                author: '',
                date: '',
                //src_image: '',
                isEdit: 'false'
            },
            posts: [] // Array per guardar els posts creats
        };
    }, 
    components:{
        HeaderPost,
        FooterPost,
        BlogPost, 
        Post
    },
    methods: {
        /* The `sendForm()` method in the provided JavaScript code is responsible for handling the form
        submission in the Vue.js application. Here is a breakdown of what the method does: */
        sendForm() { //Guardem la información dins de l'array
            const date = new Date();
            const fomattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);   
          // Mostramos la fecha y hora en la consola                                   
            //console.log('ENTRA sendForm()');
           //console.log(this.form.title);
           // Creem un objecte amb les dades que hem agafat del formulari, comprovem si ja existia o no
            var newPost = {
                idPost : id,
                title: this.form.title,
                summary: this.form.summary,
                content: this.form.content,
                author: this.form.author,
                author: this.form.author,
                //src_image: this.form.src_image,
                date: fomattedDate
        };
        //Afegim el objecte dins de l'array
        this.posts.push(newPost);

        // Llevam tot el que hi ha en el formulari
        this.form.title = '';
        this.form.summary = '';
        this.form.content = '';
        this.form.author = '';
        //this.$refs.fileInput.value = null;

        //Aumentem el id per al següent post
        id++;
        

        // S'actualitza el darrer ID del local storage
        localStorage.setItem('lastId', id.toString());

        /* The line `localStorage.setItem('posts', JSON.stringify(this.posts));` is storing the `posts`
        array data in the browser's `localStorage`. */
        localStorage.setItem('posts', JSON.stringify(this.posts));
        
        },
        /* The `deletePost` method in the provided JavaScript code is responsible for deleting a
        specific post from the `posts` array in the Vue.js application. Here is a breakdown of what
        the method does: */
        deletePost: function(idPost){
            // console.log('id->');
            this.posts.splice(this.posts.indexOf(idPost), 1);


            localStorage.setItem('posts', JSON.stringify(this.posts));

        },
        /* The `editPost` method in the provided JavaScript code is responsible for editing a specific
        post in the Vue.js application. Here is a breakdown of what the method does: */
        editPost: function(post){
            // console.log(post);
            //Per a que no fagi dues còpies del mateix post, quan pitjem el botó de editar eliminarem el post de l'array de posts
            this.form.title = post.title;
            this.form.summary = post.summary;
            this.form.content = post.content;
            //this.form.src_image = file;
            this.form.author = post.author;


            localStorage.setItem('posts', JSON.stringify(this.posts));


            // //Eliminem el post
            this.posts.splice(this.posts.indexOf(post.idPost), 1);

            localStorage.setItem('posts', JSON.stringify(this.posts));
        },
    }, 

    mounted(){
        this.$router.push({ name: 'home' });


        if(localStorage.getItem('posts')){
            this.posts = JSON.parse(localStorage.getItem('posts'));
        }
    }
}).use(router).mount('#app');
