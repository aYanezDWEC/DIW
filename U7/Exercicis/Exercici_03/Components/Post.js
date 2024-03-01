export default{
    name: 'BlogPost',
    props: ['post'],
    methods:{},
    template: `
    <div class="blog-post">
        <h2>{{ post.title }}</h2>
        <p><strong>Summary:</strong> {{ post.summary }}</p>
        <p><strong>Content:</strong> {{ post.content }}</p>
        <p><strong>Author:</strong> {{ post.author }}</p>
        <p><strong>Date:</strong> {{ post.date }}</p>
        <button class="btn_delete" v-on:click = "$emit('delete-post', post.idPost)"> DELETE </button>
        <button class="btn_edit" v-on:click = "$emit('edit-post', post)"> EDIT </button>       
    </div>`,
}