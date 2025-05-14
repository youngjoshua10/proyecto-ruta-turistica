<template>
    <div class="table-container">
        <v-row>
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

            <v-dialog persistent v-model="dialogConfirmarContraseña" max-width="500" transition="dialog-top-transition">
                            <v-card>
                                <v-card-title class="text-h5">{{ $t('Account confirmation') }}</v-card-title>
                                <v-card-text>
                                    <span>
                                        {{ $t('Insert your current password to change personal details.') }}
                                        <div class="d-flex align-center">
                                            <v-col cols="12">
                                                <v-text-field :label="$t('Current password')" variant="outlined"
                                                    density="compact" v-model="datos_usuario_confirmacion.contraseña"
                                                    :error-count="form.error.contraseña ? form.error.contraseña.length : 0"
                                                    :error-messages="form.error.contraseña"
                                                    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="show ? 'text' : 'password'"
                                                    class="input-group--focused" @click:append-inner="show = !show">
                                                </v-text-field>
                                            </v-col>
                                        </div>
                                    </span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                        @click="resetFormDialog()">{{ $t('Cancel') }}</v-btn>
                                    <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-send"
                                        :loading="loadingEdit" @click="editarUsuario(datos_usuario.id)">{{ $t('Send') }}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>



            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-account-outline" color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Edit personal data') }}</span>
                    </template>
                </v-card>
           
                <div>
                    <v-card class="mx-auto" color="grey">
                    <v-card-text class="bg-surface-light pt-4">
                        <form>
                            <v-row>
                                <v-col cols="12">
                                    <h3>
                                        {{ $t('Personal Data') }}
                                    </h3>
                                </v-col>

                                <v-col cols="12">
                                    <v-avatar class="mx-5" :key="datos_usuario.foto_path" :image="datos_usuario.foto_path || defaultImage" size="150"
                                        @click="triggerFileSelect" style="cursor: pointer" v-model="datos_usuario.foto_path"/>
                                    <input ref="fileInput" type="file" accept="image/*" @change="onFileChange"
                                        style="display: none" />
                                    <v-btn color="#0230ba" size="small" variant="flat"
                                        prepend-icon="mdi-image" @click="triggerFileSelect"
                                        >{{ $t('Select a profile picture') }}</v-btn>
                                </v-col>

                                <v-col cols="3">
                                    <v-text-field prepend-icon="mdi-account" variant="outlined" :label="$t('First name')"
                                        v-model="datos_usuario.primer_nombre"
                                        :error-count="form.error.primer_nombre ? form.error.primer_nombre.length : 0"
                                        :error-messages="form.error.primer_nombre"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field variant="outlined" :label="$t('Second name')"
                                        v-model="datos_usuario.segundo_nombre"
                                        :error-count="form.error.segundo_nombre ? form.error.segundo_nombre.length : 0"
                                        :error-messages="form.error.segundo_nombre"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field variant="outlined" :label="$t('First surname')"
                                        v-model="datos_usuario.primer_apellido"
                                        :error-count="form.error.primer_apellido ? form.error.primer_apellido.length : 0"
                                        :error-messages="form.error.primer_apellido"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field variant="outlined" :label="$t('Second surname')"
                                        v-model="datos_usuario.segundo_apellido"
                                        :error-count="form.error.segundo_apellido ? form.error.segundo_apellido.length : 0"
                                        :error-messages="form.error.segundo_apellido"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field prepend-icon="mdi-cellphone" variant="outlined"
                                        :label="$t('Number phone')" v-model="numero_celular_visible"
                                        :error-count="form.error.numero_celular ? form.error.numero_celular.length : 0"
                                        :error-messages="form.error.numero_celular"></v-text-field>
                                </v-col>


                                <v-col cols="3">
                                    <div class="d-flex align-center">
                                        <v-btn color="primary" density="compact" icon="mdi-calendar-range" 
                                        @click="datePickerDialog = true">
                                        </v-btn>

                                        <v-dialog v-model="datePickerDialog" width="290">
                                            <v-card>
                                                <v-date-picker
                                                v-model="selectedDate"
                                                @update:model-value="onDateSelected"
                                                ></v-date-picker>
                                                <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text @click="datePickerDialog = false">{{ $t('Exit') }}</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>

                                        <v-text-field variant="outlined" readonly class="mx-2"
                                            :label="$t('Date of birth')" v-model="datos_usuario.fecha_nacimiento"
                                            :error-count="form.error.fecha_nacimiento ? form.error.fecha_nacimiento.length : 0"
                                            :error-messages="form.error.fecha_nacimiento"></v-text-field>
                                    </div>
                                    
                                </v-col>


                                <v-col cols="6">
                                    <v-radio-group inline :label="$t('Sexual preference')" v-model="selectedSexo" @change="updateBooleanos">
                                        <v-radio :label="$t('Man/Male')" value="hombre"
                                            :error-count="form.error.sexo_hombre_bo ? form.error.sexo_hombre_bo.length : 0"
                                            :error-messages="form.error.sexo_hombre_bo"></v-radio>
                                        <v-radio :label="$t('Woman/Female')" value="mujer"
                                            :error-count="form.error.sexo_mujer_bo ? form.error.sexo_mujer_bo.length : 0"
                                            :error-messages="form.error.sexo_mujer_bo"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-content-save-all-outline"
                                @click="validarParaGuardar(datos_usuario.id)" :loading="loadingButtonValidar">{{ $t('Edit') }}</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script src="./Cambiar_Datos_Personales.js"></script>
<style lang="css" src="./Cambiar_Datos_Personales.css"></style>