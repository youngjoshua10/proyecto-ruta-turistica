<template>
    <div class="table-container">

        <v-dialog v-model="dialog" max-width="800px">
            <v-card>
                <v-img :src="selectedImage" height="500px" cover />
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialog = false">{{ $t('Close') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-image-multiple" color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Photo Gallery') }}</span>
                    </template>
                </v-card>
            </v-col>    
        </v-row>
        <v-row>
            <v-col cols="12">
                {{ $t('Photo album of guayaquil, tourist places mentioned in the tourist route, enjoy the images taken in each of the localities, guayaquil as you have never seen it before!') }}
            <div class="pl-11 mt-2">
                <h1 class="font-weight-black">
                {{ $t('Plaza Olmedo - Olmedo Monument') }}
                </h1>
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes1"
            :key="img.id"
            cols="12"
            sm="6"
            :md="[2, 3].includes(img.id) ? 8 : 4"
            class="d-flex child-flex"
            >
            <div class="image-link" @click="openDialog(img.src)">
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
            </div>
            </v-col>
        </v-row>

        <v-row>
            <v-divider></v-divider>
        </v-row>

        <v-row>
            <v-col cols="12">
            <div class="pl-11">
                <h1 class="font-weight-black">
                {{ $t('Municipal Museum - Works of Olmedo') }}
                </h1>
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes2"
            :key="img.id"
            cols="12"
            sm="6"
            :md="[2, 3].includes(img.id) ? 8 : 4"
            class="d-flex child-flex"
            >
            <div class="image-link" @click="openDialog(img.src)">
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
            </div>
            </v-col>
        </v-row>

        <v-row>
            <v-divider></v-divider>
        </v-row>

        <v-row>
            <v-col cols="12">
            <div class="pl-11">
                <h1 class="font-weight-black">
                {{ $t('Municipality of the Mayor´s Office of Guayaquil - Olmedo´s Armchair') }}
                </h1>
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes3"
            :key="img.id"
            cols="12"
            sm="6"
            :md="[2, 3].includes(img.id) ? 8 : 4"
            class="d-flex child-flex"
            >
            <div class="image-link" @click="openDialog(img.src)">
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
            </div>
            </v-col>
        </v-row>

        <v-row>
            <v-divider></v-divider>
        </v-row>

        <v-row>
            <v-col cols="12">
            <div class="pl-11">
                <h1 class="font-weight-black">
                {{ $t('Administration Position - Fragua Vulcano') }}
                </h1>
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes4"
            :key="img.id"
            cols="12"
            sm="6"
            :md="[2, 3].includes(img.id) ? 8 : 4"
            class="d-flex child-flex"
            >
            <div class="image-link" @click="openDialog(img.src)">
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
            </div>
            </v-col>
        </v-row>

        <v-row>
            <v-divider></v-divider>
        </v-row>

        <v-row>
            <v-col cols="12">
            <div class="pl-11">
                <h1 class="font-weight-black">
                {{ $t('Centennial Park - Column of Heroes of October 9') }}
                </h1>
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes5"
            :key="img.id"
            cols="12"
            sm="6"
            :md="[2, 3].includes(img.id) ? 8 : 4"
            class="d-flex child-flex"
            >
            <div class="image-link" @click="openDialog(img.src)">
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
            </div>
            </v-col>
        </v-row>

        <v-row>
            <v-divider></v-divider>
        </v-row>

        <v-row>
            <v-col cols="12">
            <div class="pl-11">
                <h1 class="font-weight-black">
                {{ $t('General Cemetery of Guayaquil - Olmedo´s Tomb') }}
                </h1>
            </div>
            </v-col>

            <v-col
            v-for="img in imagenes6"
            :key="img.id"
            cols="12"
            sm="6"
            :md="[2, 3].includes(img.id) ? 8 : 4"
            class="d-flex child-flex"
            >
            <div class="image-link" @click="openDialog(img.src)">
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
            </div>
            </v-col>
        </v-row>
    </div>
</template>
<script src="./Galeria_Fotos.js"></script>
<style lang="css" src="./Galeria_Fotos.css"></style>