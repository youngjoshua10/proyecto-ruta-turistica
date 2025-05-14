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
        <!-- <br> -->
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-account-plus"
                    :subtitle="$t('Fill out the account creation form to be able to log in and browse the website')"
                    color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Create Account') }}</span>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="mx-auto" color="grey" elevation="10">
                    <v-card-text class="bg-surface-light pt-4">
                        <form>
                            <v-row>
                                <v-col cols="12">
                                    <h3>
                                        {{ $t('Personal Data') }}
                                    </h3>
                                </v-col>

                                <v-col cols="12">
                                    <v-avatar class="mx-5" :image="datos_usuario.foto_path || defaultImage" size="150"
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
                                        :label="$t('Number phone')" v-model="datos_usuario.numero_celular"
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

                                        <v-text-field variant="outlined" class="mx-2"
                                            :label="$t('Date of birth')" v-model="datos_usuario.fecha_nacimiento" readonly
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

                                <!-- <v-btn icon @click="triggerFileSelect">
                                    <v-icon>mdi-image</v-icon>
                                </v-btn> -->
                                <!-- 
                                <input ref="fileInput" type="file" accept="image/*" style="display: none"
                                    @change="onFileChange" /> -->

                                <!-- <v-col cols="3">
                                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp"
                                        label="Photos" placeholder="Upload your photos" prepend-icon="mdi-image"
                                        variant="outlined"></v-file-input>
                                        
                                </v-col> -->

                                <v-divider></v-divider>

                                <v-col cols="12">
                                    <h3>
                                        {{ $t('Account details') }}
                                    </h3>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field prepend-icon="mdi-email" variant="outlined" :label="$t('Email')"
                                        v-model="datos_usuario.correo_electronico"
                                        :error-count="form.error.correo_electronico ? form.error.correo_electronico.length : 0"
                                        :error-messages="form.error.correo_electronico"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field variant="outlined" :label="$t('Password')" prepend-icon="mdi-lock"
                                        v-model="datos_usuario.contraseña"
                                        :error-count="form.error.contraseña ? form.error.contraseña.length : 0"
                                        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                        :error-messages="form.error.contraseña" :type="show ? 'text' : 'password'"
                                        class="input-group--focused" @click:append-inner="show = !show"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                </v-col>

                            </v-row>
                        </form>
                        <v-card-actions>
                            <span v-if="!authStore.getToken" @click="abrirDialogoRecuperacion()" style="color: rgb(98, 139, 216); cursor: pointer;"> {{ $t('Forgot your account password? Start the recovery process.') }} </span>
                            <v-spacer></v-spacer>
                            <v-btn color="warning" size="small" variant="flat" prepend-icon="mdi-content-save-all-outline"
                                @click="validarParaGuardar()" :loading="loadingButtonValidar">{{ $t('Create Account') }}</v-btn>
                            <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-login"
                                @click="dialogInicioSesion = true">{{ $t('Login') }}</v-btn>
                        </v-card-actions>

                        <!-- dialog para guardar -->
                        <v-dialog persistent v-model="dialogCodigo" max-width="500" transition="dialog-top-transition">
                            <v-card>
                                <v-card-title class="text-h5">{{ $t('Confirm Account Creation') }}</v-card-title>
                                <v-card-text class="bg-surface-light pt-4">
                                    <span>
                                        {{ $t('To create the account, enter the 6 digits that were sent to the email registered') }}
                                        <div class="d-flex align-center">
                                            <v-col cols="12">
                                                <v-text-field :label="$t('Enter the 6 digits')" variant="outlined"
                                                    density="compact" v-model="datos_usuario.codigo_confirmacion_cuenta"
                                                    :error-count="form.error.codigo_confirmacion_cuenta ? form.error.codigo_confirmacion_cuenta.length : 0"
                                                    :error-messages="form.error.codigo_confirmacion_cuenta"></v-text-field>
                                            </v-col>
                                        </div>
                                    </span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                        @click="resetFormDialog()">{{ $t('Cancel') }}</v-btn>
                                    <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-send"
                                        :loading="loadingButtonCrear" @click="crearUsuario()">{{ $t('Send') }}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <!-- iniciar sesion dialog -->
                        <v-dialog persistent v-model="dialogInicioSesion" max-width="500"
                            transition="dialog-top-transition">
                            <v-card>
                                <v-card-title class="text-h5">{{ $t('Login') }}</v-card-title>
                                <v-card-text class="bg-surface-light pt-4">
                                    <span>
                                        {{ $t('Enter credentials') }}
                                    </span>
                                    <v-row class="mt-2">
                                        <v-col cols="12">
                                            <v-text-field :label="$t('Email')" variant="outlined"
                                                density="compact" prepend-icon="mdi-email"
                                                v-model="datos_inicio_sesion.correo_electronico_login"
                                                :error-count="form.error.correo_electronico_login ? form.error.correo_electronico_login.length : 0"
                                                :error-messages="form.error.correo_electronico_login"></v-text-field>
                                            <v-text-field :label="$t('Password')" variant="outlined" density="compact"
                                                prepend-icon="mdi-key-variant"
                                                :append-inner-icon="show_dos ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show_dos ? 'text' : 'password'" class="input-group--focused mt-2"
                                                @click:append-inner="show_dos = !show_dos"
                                                v-model="datos_inicio_sesion.contraseña_login"
                                                :error-count="form.error.contraseña_login ? form.error.contraseña_login.length : 0"
                                                :error-messages="form.error.contraseña_login"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                        @click="cerrarDialogLogin()">{{ $t('Exit') }}</v-btn>
                                    <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-login"
                                        :loading="loadingButtonLogin" @click="login()">{{ $t('Login') }}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <!-- dialog para recuperar cuenta -->
                        <v-dialog persistent v-model="dialogRecuperacion" max-width="800"
                            transition="dialog-top-transition">
                            <v-card>
                                <v-card-title class="text-h5">{{ $t('Recover account') }}</v-card-title>
                                <v-card-text class="bg-surface-light pt-4">
                                    <span>
                                        {{ $t('Enter your email address to start the recovery process.') }}
                                    </span>
                                    <v-row class="mt-2">
                                        <v-col cols="6">
                                            <v-text-field :label="$t('Email')" variant="outlined"
                                                density="compact" prepend-icon="mdi-email"
                                                v-model="datos_recuperación.correo_electronico_confirmacion"
                                                :error-count="form.error.correo_electronico_confirmacion ? form.error.correo_electronico_confirmacion.length : 0"
                                                :error-messages="form.error.correo_electronico_confirmacion"></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                            <div class="d-flex justify-center">
                                                <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-send-circle" class="mt-1"
                                                    :loading="loadingButtonValidarCorreo" @click="confirmarCorreo()">{{ $t('Send') }}</v-btn>
                                                <span v-if="validacionExitosa" class="ml-5 text-success">
                                                    {{ $t('Code sent, please check your email.') }}
                                                </span>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" v-if="validacionExitosa">
                                            <v-text-field :label="$t('Enter the 6 digits')" variant="outlined"
                                                density="compact" prepend-icon="mdi-numeric"
                                                v-model="datos_recuperación_2.codigo_recuperacion"
                                                :error-count="form.error.codigo_recuperacion ? form.error.codigo_recuperacion.length : 0"
                                                :error-messages="form.error.codigo_recuperacion"></v-text-field>
                                        </v-col>
                                        <v-col cols="5" v-if="validacionExitosa">
                                            <div class="d-flex justify-center">
                                                <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-check-circle" class="mt-1"
                                                    :loading="loadingButtonValidarCodigo" @click="confirmarCodigo()">{{ $t('Confirm') }}</v-btn>
                                                <span v-if="validacionExitosa_codigo" class="ml-5 text-success">
                                                    {{ $t('Correct code, validation completed.') }}
                                                </span>
                                            </div>
                                        </v-col>

                                        <v-col cols="5" v-if="validacionExitosa_codigo" class="mt-5">
                                            <v-text-field variant="outlined" :label="$t('Password')" density="compact" prepend-icon="mdi-lock"
                                                v-model="datos_usuario_2.contraseña_recuperacion"
                                                :error-count="form.error.contraseña_recuperacion ? form.error.contraseña_recuperacion.length : 0"
                                                :error-messages="form.error.contraseña_recuperacion"
                                                :append-inner-icon="show_2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show_2 ? 'text' : 'password'"
                                                class="input-group--focused" @click:append-inner="show_2 = !show_2"></v-text-field>
                                        </v-col>
                                        <v-col cols="5" v-if="validacionExitosa_codigo" class="mt-5">
                                            <v-text-field variant="outlined" :label="$t('Confirm password')" density="compact" prepend-icon="mdi-"
                                                v-model="datos_usuario_2.contraseña_2"
                                                :error-count="form.error.contraseña_2 ? form.error.contraseña_2.length : 0"
                                                :error-messages="form.error.contraseña_2"
                                                :append-inner-icon="show_3 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show_3 ? 'text' : 'password'"
                                                class="input-group--focused" @click:append-inner="show_3 = !show_3"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                        @click="dialogRecuperacion = false">{{ $t('Exit') }}</v-btn>
                                    <v-btn v-if="validacionExitosa_codigo" color="#0230ba" size="small" variant="flat" prepend-icon="mdi-pencil-lock"
                                        :loading="loadingEdit" @click="editarContraseña()">{{ $t('Recover account') }}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script src="./Crear_Cuenta.js"></script>
<style lang="css" src="./Crear_Cuenta.css"></style>