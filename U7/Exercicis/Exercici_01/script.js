const { createApp } = Vue;

var app = createApp({
    data() {
        return {
            form: { //creem les variables que necessitem guardar info
                title: '',
                summary: '',
                content: '',
                author: '',
                date: '',
                src_image: '',
                isEdit: 'false'
            },
            posts: [] // Array per guardar els posts creats
        };
    },
    methods: {
        sendForm() { //Guardem la información dins de l'array
            const date = new Date();
            const fomattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);   
          // Mostramos la fecha y hora en la consola                                   
            //console.log('ENTRA sendForm()');
           //console.log(this.form.title);
           // Creem un objecte amb les dades que hem agafat del formulari, comprovem si ja existia o no
            var newPost = {
                title: this.form.title,
                summary: this.form.summary,
                content: this.form.content,
                author: this.form.author,
                author: this.form.author,
                src_image: this.form.src_image,
                date: fomattedDate
        };
        //Afegim el objecte dins de l'array
        this.posts.push(newPost);

        // Llevam tot el que hi ha en el formulari
        this.form.title = '';
        this.form.summary = '';
        this.form.content = '';
        this.form.author = '';
        this.$refs.fileInput.value = null;
        
        
        },
        deletePost: function(index){
            this.posts.splice(index, 1);
        },
        editPost: function(post, index){
            //Per a que no fagi dues còpies del mateix post, quan pitjem el botó de editar eliminarem el post de l'array de posts
            this.form.title = post.title;
            this.form.summary = post.summary;
            this.form.content = post.content;
            this.form.src_image = file;
            this.form.author = post.author;

            //Eliminem el post
            this.posts.splice(index, 1);
        },
        handleFileChange(event) {
            this.form.src_image = URL.createObjectURL(file[0]); 
            console.log(file[0]);
        }
    }
}).mount('#app');
