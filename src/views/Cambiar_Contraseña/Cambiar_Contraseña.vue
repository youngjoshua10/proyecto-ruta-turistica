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
        
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-lock-reset" color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Change password') }}</span>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="mx-auto" color="grey" elevation="10">
                    <v-card-text class="bg-surface-light pt-4">
                        <v-row>
                                <v-col cols="4">
                                    <v-text-field :label="$t('Current password')" variant="outlined" prepend-icon="mdi-lock-alert-outline"
                                    density="compact" v-model="datos_usuario_confirmacion.contraseña_confirmacion"
                                    :error-count="form.error.contraseña_confirmacion ? form.error.contraseña_confirmacion.length : 0"
                                    :error-messages="form.error.contraseña_confirmacion"
                                    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    class="input-group--focused" @click:append-inner="show = !show"></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                    <div class="d-flex justify-center">
                                        <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-check-circle" class="mt-1"
                                            :loading="loadingButtonValidar" @click="confirmarContraseña(authStore.getUserId)">{{ $t('Confirm') }}</v-btn>
                                        <span v-if="validacionExitosa" class="ml-5 mt-1 text-success">
                                            {{ $t('Correct password. Validation complete.') }}
                                        </span>
                                    </div>
                                </v-col>

                                <v-col cols="3">
                                    
                                </v-col>

                                <v-divider></v-divider>
                                
                                <v-col cols="4" v-if="validacionExitosa" class="mt-5">
                                    <v-text-field variant="outlined" :label="$t('Password')" density="compact" prepend-icon="mdi-lock"
                                        v-model="datos_usuario.contraseña"
                                        :error-count="form.error.contraseña ? form.error.contraseña.length : 0"
                                        :error-messages="form.error.contraseña"
                                        :append-inner-icon="show_2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show_2 ? 'text' : 'password'"
                                        class="input-group--focused" @click:append-inner="show_2 = !show_2"></v-text-field>
                                </v-col>
                                <v-col cols="4" v-if="validacionExitosa" class="mt-5">
                                    <v-text-field variant="outlined" :label="$t('Confirm password')" density="compact" prepend-icon="mdi-"
                                        v-model="datos_usuario.contraseña_2"
                                        :error-count="form.error.contraseña_2 ? form.error.contraseña_2.length : 0"
                                        :error-messages="form.error.contraseña_2"
                                        :append-inner-icon="show_3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show_3 ? 'text' : 'password'"
                                        class="input-group--focused" @click:append-inner="show_3 = !show_3"></v-text-field>
                                </v-col>

                                <v-col cols="3" v-if="validacionExitosa" class="mt-6">
                                    <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingEdit"
                                    @click="editarContraseña(authStore.getUserId)">{{ $t('Confirm') }}</v-btn>
                                </v-col>
                                
                        </v-row>

                        <!-- <v-card-actions class="mt-4" v-if="validacionExitosa">
                            <v-btn color="success" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingEdit"
                                @click="editarContraseña(authStore.getUserId)">{{ $t('Confirm') }}</v-btn>
                            </v-card-actions> -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script src="./Cambiar_Contraseña.js"></script>
<style lang="css" src="./Cambiar_Contraseña.css"></style>