<template>
    <div class="table-container">
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-cog" color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Change language/idiom') }}</span>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="mx-auto" color="grey" elevation="10">
                    <v-card-text class="bg-surface-light pt-4">
                        <v-row>
                            <v-col cols="12" class="pl-9 d-flex justify-center">
                                <v-col cols="3">
                                    <div class="mt-3">
                                        <h3>{{ $t('Change') }} {{ $t('Idiom') }}</h3>
                                    </div>
                                </v-col>
                            <v-col cols="5">
                                <v-select class="pl-4"
                                    v-model="selectedLanguage"
                                    :items="languages"
                                    :label="$t('select a language')"
                                    variant="outlined"
                                ></v-select>
                                <v-btn class="ml-4" 
                                color="#0230ba"
                                :loading="loading" 
                                :disabled="loading" 
                                @click="changeLanguage(selectedLanguage)">{{ $t('Change') }}</v-btn>
                            </v-col>
                            <!-- <v-btn @click="changeLanguage('en')">EN</v-btn>
                            <v-btn @click="changeLanguage('es')">ES</v-btn> -->
                            <!-- <v-col cols="3">
                                <p>{{ $t('Welcome') }}</p>
                            </v-col> -->
                                <!-- <v-text-field variant="outlined" label="Segundo Nombre"></v-text-field> -->
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- <v-overlay :model-value="loading" persistent>
                    <v-progress-circular indeterminate size="64" color="primary" />
                </v-overlay> -->
            </v-col>
        </v-row>
    </div>
</template>
<script src="./Configuracion.js"></script>
<style lang="css" src="./Configuracion.css"></style>