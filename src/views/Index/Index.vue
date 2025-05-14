<template>
    <div class="table-container">

    


        <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :timeout="snackbar.timeout">
            {{ snackbar.message }}

            <!-- <v-btn size="small" variant="flat" @click="snackbar.visible = false">
                Cerrar
            </v-btn> -->
        </v-snackbar>
        <v-snackbar v-model="snackbar_error.visible" :color="snackbar_error.color" :timeout="snackbar_error.timeout">
            {{ snackbar_error.message }}

            <!-- <v-btn size="small" variant="flat" @click="snackbar.visible = false">
                Cerrar
            </v-btn> -->
        </v-snackbar>

        <!-- <v-row>
            <v-col cols="12">
                <div class="d-flex justify-center">
                    <v-parallax
                        src="https://th.bing.com/th/id/R.480e7ff90cad44ba04285304ceb99066?rik=KwhvHe1B%2bur5OA&riu=http%3a%2f%2fwww.carmaxrentacar.com%2fimages%2ffotos-guayaquil%2fguayaquil19-g.jpg&ehk=jwDOv1tq2Z%2bKcE11oSdiq%2bq%2bTR4J5VXW%2fTqC23cRjV8%3d&risl=&pid=ImgRaw&r=0"
                        height="400" max-width="500">
                        <v-container class="fill-height">
                            <v-row class="justify-center align-center flex-column-reverse flex-md-row">
                                <v-col cols="12" md="6">
                                    <h1 class="text-h2 mb-1 text-white font-pacifico">
                                        {{ $t('Guayas like you have never seen it before') }}
                                    </h1>
                                </v-col>
                                <v-col class="text-center" cols="12" md="6">
                                </v-col>
                            </v-row>
                        </v-container>

                    </v-parallax>
                    <v-parallax
                        src="https://cdn.goconqr.com/uploads/media/image/16277028/desktop_e4a95f17-43a8-40c0-bdd6-90e0aafa7c7c.jpg"
                        height="400" max-width="600">
                    </v-parallax>
                </div>

                <v-parallax
                    src="https://th.bing.com/th/id/R.a80a180e0e514f391e963c45500ec8eb?rik=2MO0LUhWvwP75g&riu=http%3a%2f%2fwww.argenettravel.com%2fimages%2fdestinos%2fecuador%2flugares%2fguayaquil%2f04.jpg&ehk=U8BRP6d%2f06Y0735BNgTWbed7LGmvZMsjns5u7zv0ll8%3d&risl=&pid=ImgRaw&r=0">
                    <v-container class="fill-height">
                        <v-row class="justify-center align-center flex-column-reverse flex-md-row">
                            <v-col cols="12" md="6">
                                <h1 class="text-h1 mb-8 text-white">{{ $t('TOURIST ROUTE') }}</h1>
                                <h3 class="text-h3 mb-8 font-weight-thin text-white">
                                    {{ $t('Review all the generalities, useful data, cultural information, demographics, and more to make your visit to Guayas more unforgettable.') }}</h3>
                                <v-btn class="elevation-4 rounded-xl mb-4" color="primary" @click="IrRuta()">
                                    {{ $t('Review route') }}
                                </v-btn>
                            </v-col>
                            <v-col class="text-center" cols="12" md="6">
                            </v-col>
                        </v-row>
                    </v-container>
                </v-parallax>
            </v-col>
        </v-row> -->

        <v-row>
            <v-col cols="12">
            <v-card class="mx-auto" prepend-icon="mdi-home-circle" color="#0230ba" elevation="10">
                <template v-slot:title>
                <span class="font-weight-black">{{ $t('Home') }}</span>
                </template>
            </v-card>
            <div class="pl-11 mt-3">
                <h2 class="font-weight-black">
                {{ $t('FROM POET TO PATRIOT: THE PATH OF A HERO') }}
                </h2>
                {{ $t('Tourist Route About the Character: José Joaquín de Olmedo') }}
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes"
            :key="img.id"
            cols="12"
            sm="6"
            :md="img.id === 1 ? 8 : 4"
            class="d-flex child-flex"
            >
            <router-link :to="img.route" class="image-link">
                <div class="image-wrapper hover-scale">
                <v-img
                    :src="img.src"
                    :alt="img.alt"
                    :height="img.id === 1 ? '290px' : '290px'"
                    cover
                    
                >
                    <template v-slot:placeholder>
                    <v-row
                        align="center"
                        class="fill-height ma-0"
                        justify="center"
                    >
                        <v-progress-circular color="grey-lighten-5" indeterminate />
                    </v-row>
                    </template>
                </v-img>
                <div class="overlay">
                    <div class="overlay-text">{{ translate(img.texto) }}</div>
                </div>
                </div>
            </router-link>
            </v-col>
        </v-row>

        <v-row>
            <v-divider></v-divider>
            <v-col cols="12">
                <v-card variant="text">
                    <template v-slot:title>
                        <!-- <v-row>
                            <v-col cols="12">
                                <v-text-field prepend-icon="mdi-message-text-outline" v-model="first" color="primary"
                                    label="Comentar..." variant="underlined"></v-text-field>
                            </v-col>
                        </v-row> -->

                        <v-row>
                            <v-col cols="12">
                                <v-card class="mx-auto" prepend-icon="mdi-comment" color="#0230ba" elevation="5">
                                    <template v-slot:title>
                                        <span class="font-weight-black">{{ $t('Comments') }}</span>
                                    </template>
                                </v-card>
                                <v-row>
                                    <v-col cols="11" class="mt-5 mx-10">
                                        
                                            <v-rating
                                            v-model="comentarios_testimonios.rating"
                                            active-color="blue"
                                            color="orange-lighten-1"
                                            ></v-rating>

                                            <h6>{{ $t('Rate how your experience has been!') }}</h6>
                                        
                                    </v-col>
                                    <v-col cols="11">
                                        <v-text-field prepend-icon="mdi-message-text-outline" color="primary"
                                            :label="$t('Comment')" variant="outlined"
                                            v-model="comentarios_testimonios.contenido"
                                            :error-messages="form.errorGuardar.contenido"
                                            :error="!!form.errorGuardar.contenido"
                                            ></v-text-field>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-btn @click="guardarComentario()" :loading="loadingButton" class="mt-4"
                                            color="#0230ba" density="compact" variant="plain" icon="mdi-arrow-collapse-right">
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <v-dialog persistent v-model="dialogDelete" max-width="600" transition="dialog-top-transition">
                                            <v-card>
                                                <v-card-title class="text-h5">{{ $t('Are you sure you want to delete this comment?') }}</v-card-title>
                                                <v-card-text class="bg-surface-light pt-4">
                                                <span>
                                                    {{ $t('The comment will be completely removed.') }}
                                                </span>
                                                </v-card-text>
                                                <v-card-actions>
                                                <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                                    @click="dialogDelete = false">{{ $t('Cancel') }}</v-btn>
                                                <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingDelete"
                                                    @click="BorrarComentario(comentarioSeleccionadoId)">{{ $t('Confirm') }}</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>


                                <v-card elevation="10" class="mt-2">
                                    <v-list-item-content v-for="(item, index) in items" :key="index">
                                        <!-- <pre>{{ authStore }}</pre> -->

                                        <v-dialog persistent v-model="dialogEdit" max-width="800" transition="dialog-top-transition">
                                            <v-card>
                                                <v-card-title class="text-h5">{{ $t('Edit comment') }}</v-card-title>
                                                <v-card-text class="bg-surface-light pt-4">
                                                <div class="d-flex align-center">
                                                    <v-avatar class="mt-3" v-if="comentarios_testimonios2.usuario?.foto_path" size="50"
                                                        style="cursor: pointer">
                                                    <img :src="comentarios_testimonios2.usuario.foto_path" alt="Foto de perfil"
                                                        style="object-fit: cover; width: 100%; height: 100%;" />
                                                    </v-avatar>
                                                    <v-col cols="12">
                                                    <v-list-item-title>
                                                        <div class="pl-3">
                                                        {{ comentarios_testimonios2.usuario?.primer_nombre }} {{ comentarios_testimonios2.usuario?.primer_apellido }}
                                                        </div>
                                                    </v-list-item-title>

                                                    <v-list-item-subtitle>
                                                        <v-col cols="11">
                                                            <v-rating
                                                            v-model="comentarios_testimonios2.rating"
                                                            density="compact"
                                                            active-color="blue"
                                                            color="orange-lighten-1"
                                                            ></v-rating>
                                                            <v-text-field color="primary" class="mt-2"
                                                                :label="$t('Comment')" variant="outlined"
                                                                v-model="comentarios_testimonios2.contenido"
                                                                :error-messages="form.errorEditar.contenido"
                                                                :error="!!form.errorEditar.contenido"
                                                                >
                                                                <!-- {{ comentarios_testimonios2.contenido }} -->
                                                            </v-text-field>
                                                        </v-col>
                                                    </v-list-item-subtitle>
                                                    </v-col>
                                                </div>
                                                </v-card-text>
                                                <v-card-actions>
                                                <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                                    @click="dialogEdit = false">{{ $t('Cancel') }}</v-btn>
                                                <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingEdit"
                                                    @click="editarComentario(comentarios_testimonios2.id)">{{ $t('Confirm') }}</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>

                                        <div class="d-flex align-center">
                                            <v-avatar class="mt-3" v-if="item.usuario?.foto_path" size="50"
                                                style="cursor: pointer">
                                                <img :src="item.usuario.foto_path" alt="Foto de perfil"
                                                    style="object-fit: cover; width: 100%; height: 100%;" />
                                            </v-avatar>
                                            <v-col cols="12">
                                                <v-list-item-title>
                                                    <div class="d-flex justify-space-between w-100 pr-12">
                                                    <!-- Nombre -->
                                                    <div>
                                                        {{ item.usuario?.primer_nombre }} {{ item.usuario?.primer_apellido }}
                                                    </div>

                                                    <!-- Fecha, hora y menú alineados -->
                                                    <div class="d-flex align-center gap-2">
                                                        <!-- <span>{{ item.fecha }} - {{ item.hora }}</span> -->
                                                         <v-rating
                                                            :model-value="item.rating"
                                                            readonly
                                                            
                                                            density="compact"
                                                            active-color="blue"
                                                            color="orange-lighten-1"
                                                        ></v-rating>
                                                        <span>{{ item.fecha }} - {{ item.hora }}</span>
                                                        <v-menu v-if="authStore.getUserId === item.usuario?.id">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                            density="compact"
                                                            icon="mdi-dots-vertical"
                                                            variant="text"
                                                            v-bind="props"
                                                            ></v-btn>
                                                        </template>
                                                        <v-list v-if="authStore.getUserId === item.usuario?.id" >
                                                            <v-list-item
                                                            prepend-icon="mdi-pencil" @click="obtenerParaEditarComentario(item.id)">
                                                                <v-list-item-title>
                                                                    {{ $t('Edit') }}
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item
                                                                prepend-icon="mdi-delete-circle"
                                                                @click="abrirDialogoEliminar(item.id)"
                                                                >
                                                                <v-list-item-title>
                                                                    {{ $t('Delete') }}
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                        </v-menu>
                                                    </div>
                                                    </div>
                                                </v-list-item-title>

                                                <v-list-item-subtitle>
                                                    {{ item.contenido }}
                                                </v-list-item-subtitle>
                                            </v-col>
                                        </div>
                                        <v-divider class="mt-2"></v-divider>
                                    </v-list-item-content>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-card>
            </v-col>
        </v-row>
        <br>
        <v-footer class="text-center d-flex flex-column ga-2 py-4" color="#0230ba">
            <div class="d-flex ga-3">
                <v-btn
                    v-for="item in icons"
                    :key="item.icon"
                    :icon="item.icon"
                    :href="item.url"
                    target="_blank"
                    density="comfortable"
                    variant="text"
                    class="mt-1"
                    />
                    <!-- <v-btn icon href="https://www.tiktok.com/tu_usuario" target="_blank" density="comfortable"
                    variant="text">
                    <v-img src="/logo_proyecto/tiktok.png" alt="TikTok" max-width="24"></v-img>
                    </v-btn> -->

                    <a href="https://www.tiktok.com/@rutadeunheroe?_t=ZM-8wKVNp3lCoY&_r=1" target="_blank" rel="noopener noreferrer">
                        <v-avatar size="32" style="cursor: pointer" class="mx-2">
                            <v-img
                            alt="Logo del proyecto"
                            src="/logo_proyecto/tiktok.png"
                            ></v-img>
                        </v-avatar>
                    </a>
            </div>

            <v-divider class="my-2" thickness="2" width="50"></v-divider>

            <div class="text-caption font-weight-regular opacity-60">
                {{ $t('Discover Guayaquil through history with ´From Poet to Patriot, the Route of a Hero´, the essential tour about José Joaquín de Olmedo. The best way to get to know Olmedo and his legacy, experience history in the heart of Guayaquil.') }}
                
            </div>

            <div >

                <v-card prepend-icon="mdi-phone" variant="text">
                    <template v-slot:title>
                        <span class="font-weight-black">+593 967029667</span>
                        <br><span class="font-weight-black">+593 959987977</span>
                    </template>
                </v-card>
                <!-- <v-text-field
                   
                    
                    variant="plain"
                ></v-text-field>                 -->
            </div>

            <v-divider></v-divider>

            <div>
                {{ new Date().getFullYear() }} - <strong>{{ $t('Cultural and Heritage Tour Route of Guayaquil') }}</strong>
            </div>
        </v-footer>
    </div>
</template>

<script src="./Index.js"></script>
<style lang="css" src="./Index.css"></style>