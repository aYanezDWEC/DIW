import { createApp } from 'vue';

// Creamos nuestra aplicación Vue
const app = createApp({
    data() {
        return {
            // Definimos nuestros datos iniciales
            count: 0,
            message: 'Haz clic en el botón para incrementar el contador'
        };
    },
    methods: {
        // Método para incrementar el contador
        increment() {
            this.count++; // Incrementamos el valor de count en 1
            this.message = 'Contador incrementado: ' + this.count; // Actualizamos el mensaje
        }
    }
});

// Montamos nuestra aplicación en el div con el id "app"
app.mount('#app');
