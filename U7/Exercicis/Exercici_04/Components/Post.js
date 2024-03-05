export default {
    name: 'Post',
    props:['posts'],
    mounted() {
        // Obtenemos el ID del post de la ruta
        const postId = this.$route.params.id;
        // Buscamos el post correspondiente en el localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        this.post = posts.find(post => post.idPost === postId);
    },
    template: `
  
    <div v-if="posts">
        <div v-for="post in posts">
            <h2>{{ post.title }}</h2>
            <p><strong>Summary:</strong> {{ post.summary }}</p>
            <p><strong>Content:</strong> {{ post.content }}</p>
            <p><strong>Author:</strong> {{ post.author }}</p>
            <p><strong>Date:</strong> {{ post.date }}</p>
            <button class="btn_delete" @click="deletePost(post.idPost)">DELETE</button>
            <button class="btn_edit" @click="editPost(post)">EDIT</button>
        </div>
    </div>
    `,
    methods: {
        deletePost(idPost) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = posts.filter(post => post.idPost !== idPost);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            // Redirigir a la página principal después de eliminar el post
            this.$router.push('/');
        },
        editPost(post) {
        }
    }
}



