export default {
    name: 'Post',
    data() {
        return {
            post: null
        };
    },
    mounted() {
        // Obtenemos el ID del post de la ruta
        const postId = this.$route.params.id;
        // Buscamos el post correspondiente en el localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        this.post = posts.find(post => post.idPost === postId);
    },
    template: `
    <div v-if="post">
        <h2>{{ post.title }}</h2>
        <p><strong>Summary:</strong> {{ post.summary }}</p>
        <p><strong>Content:</strong> {{ post.content }}</p>
        <p><strong>Author:</strong> {{ post.author }}</p>
        <p><strong>Date:</strong> {{ post.date }}</p>
        <button class="btn_delete" v-on:click="deletePost(post.idPost)"> DELETE </button>
        <button class="btn_edit" v-on:click="editPost(post)"> EDIT </button>
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
            // Implementa la lógica de edición si es necesario
        }
    }
}
