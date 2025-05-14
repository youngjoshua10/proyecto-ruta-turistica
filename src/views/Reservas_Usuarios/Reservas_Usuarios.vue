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
            <v-dialog persistent v-model="dialogCrearReserva" max-width="600" transition="dialog-top-transition">
                <v-card>
                    <v-card-title class="text-h5">{{ $t('Save reservation') }}</v-card-title>
                    <v-card-text class="bg-surface-light pt-4">
                        <span>
                            {{ $t('Review the filled fields carefully; if you are sure of the information you provided, save the reservation.') }}
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                            @click="dialogCrearReserva = false">{{ $t('Cancel') }}</v-btn>
                        <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingButtonCrear"
                            @click="crearReserva()">{{ $t('Save') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            

            <v-dialog persistent v-model="dialogReservas" max-width="900" transition="dialog-top-transition">
                <!-- <template> -->
                    <v-card >
                        <v-card-title class="text-h5">{{ $t('Completed reservations') }}</v-card-title>
                        <v-card-text class="bg-surface-light pt-4">
                            <v-row dense>
                            <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6">

                                <v-dialog persistent v-model="dialogEliminar" max-width="600" transition="dialog-top-transition">
                                    <v-card>
                                        <v-card-title class="text-h5">{{ $t('Cancel reservation') }}</v-card-title>
                                        <v-card-text class="bg-surface-light pt-4">
                                            <span>
                                                {{ $t('The reservation will be canceled permanently.') }}
                                            </span>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                                @click="dialogEliminar = false">{{ $t('Cancel') }}</v-btn>
                                            <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingCancelarReserva"
                                                @click="eliminarReserva(item.id)">{{ $t('Delete') }}</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                                <!-- <div class="d-flex justify-center align-center"> -->

                                <!-- <v-col cols="6"> -->
                                <v-card variant="outlined"
                                    class="mx-auto"
                                    max-width="350"
                                >
                                    <!-- <v-img
                                    height="200px"
                                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                    cover
                                    ></v-img> -->
                                    <v-card-title>
                                    {{ $t('Reservation in the name of:') }}
                                    <br>{{ item.primer_nombre }} {{ item.primer_apellido }}
                                    </v-card-title>
                                    <v-card-subtitle>
                                    {{ $t('Type of route:') }} {{ item.tipo_ruta }}
                                    </v-card-subtitle>

                                    <v-card-actions>
                                    <v-btn
                                        color="red"
                                        density="compact"
                                        @click="dialogEliminar = true"
                                    >  {{ $t('Cancel reservation') }} </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        :icon="expandedIndex === index ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        @click="expandedIndex = expandedIndex === index ? null : index"
                                    ></v-btn>
                                    </v-card-actions>

                                    <v-expand-transition>
                                    <div v-show="expandedIndex === index">
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <h3 style="color: #ca2400;">
                                                {{ $t('Personal Data') }}
                                            </h3>
                                            <br>
                                            <span>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('ID number') }}</span> <span>{{ item.numero_cedula }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Number phone') }}</span> <span>{{ item.numero_celular }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Email') }}</span> <span>{{ item.correo_electronico }}</span>
                                            </span>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <h3 style="color: #ca2400;">
                                                {{ $t('Reservation data') }}
                                            </h3>
                                            <br>
                                            <span>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Tour date') }}</span> <span>{{ item.fecha_tour }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Start time') }}</span> <span>{{ item.hora_inicio }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Type of route:') }}</span> <span>{{ item.tipo_ruta }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('preferred language') }}</span> <span>{{ item.idioma_preferencia }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Number of companions') }}</span> <span>{{ item.numero_personas }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Full name of each companion') }}</span> <span>{{ item.nombre_integrantes }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Reduced mobility or disabilities') }}</span> <span>{{ item.movilidad_discapacidad }}</span>
                                            </span>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <h3 style="color: #ca2400;">
                                                {{ $t('Payment data') }}
                                            </h3>
                                            <span>
                                                
                                                <br>
                                                <span>{{ item.metodo_pago_tarjeta_bo === 1 ? $t('Cash') : $t('Credit card') }}</span>
                                                <br>
                                                <span style="color: rgb(98, 139, 216);">{{ $t('Amount to be canceled/canceled:') }}</span> <span>{{ item.efectivo }}</span>
                                            </span>
                                        </v-card-text>
                                    </div>
                                    </v-expand-transition>
                                </v-card>
                                <!-- </v-col>
                                
                                </div> -->
                            </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                                @click="dialogReservas = false">{{ $t('Exit') }}</v-btn>
                            <!-- <v-btn color="success" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loadingButtonCrear"
                                @click="crearReserva()">{{ $t('Save') }}</v-btn> -->
                        </v-card-actions>
                    </v-card>
                <!-- </template> -->
            </v-dialog>

            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-note-edit" color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Reservations') }}</span>
                        <!-- <v-spacer></v-spacer> -->
                            <v-btn class="mx-5" 
                                    color="white" size="small" 
                                    variant="text" prepend-icon="mdi-book-search" 
                                    @click="mostrarReservas()"
                                    :loading="loadingMostrarReserva"
                                >{{ $t('View completed reservations') }}</v-btn>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="mx-auto" color="grey" elevation="10">
                    <v-card-text class="bg-surface-light pt-4">
                        <v-row>
                            <v-col cols="12">
                                    <h3>
                                        {{ $t('Reservation in the name of:') }}
                                    </h3>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field prepend-icon="mdi-account" 
                                    variant="outlined" 
                                    :label="$t('First name')"
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
                            <v-col cols="4">
                                <v-text-field prepend-icon="mdi-card-account-details" 
                                    variant="outlined" 
                                    :label="$t('ID number')"
                                    v-model="datos_usuario.numero_cedula"
                                    :error-count="form.error.numero_cedula ? form.error.numero_cedula.length : 0"
                                    :error-messages="form.error.numero_cedula"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                    <h3>
                                        {{ $t('Contact data') }}
                                    </h3>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field prepend-icon="mdi-email"
                                    variant="outlined" 
                                    :label="$t('Email')"
                                    v-model="datos_usuario.correo_electronico"
                                    :error-count="form.error.correo_electronico ? form.error.correo_electronico.length : 0"
                                    :error-messages="form.error.correo_electronico"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field prepend-icon="mdi-cellphone"
                                    variant="outlined" 
                                    :label="$t('Number phone')"
                                    v-model="datos_usuario.numero_celular"
                                    :error-count="form.error.numero_celular ? form.error.numero_celular.length : 0"
                                    :error-messages="form.error.numero_celular"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                    <h3>
                                        {{ $t('Reservation data') }}
                                    </h3>
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
                                        <v-text-field variant="outlined" class="mx-2" readonly
                                            :label="$t('Tour date')" v-model="datos_usuario.fecha_tour"
                                            :error-count="form.error.fecha_tour ? form.error.fecha_tour.length : 0"
                                            :error-messages="form.error.fecha_tour"></v-text-field>
                                    </div>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    :items="itemsHora"
                                    prepend-icon="mdi-clock-time-eight"
                                    variant="outlined" :label="$t('Start time')"
                                    v-model="datos_usuario.hora_inicio"
                                    :error-count="form.error.hora_inicio ? form.error.hora_inicio.length : 0"
                                    :error-messages="form.error.hora_inicio"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    :items="itemsRuta"
                                    prepend-icon="mdi-road-variant"
                                    variant="outlined" :label="$t('Type of route:')"
                                    v-model="datos_usuario.tipo_ruta"
                                    :error-count="form.error.tipo_ruta ? form.error.tipo_ruta.length : 0"
                                    :error-messages="form.error.tipo_ruta"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    :items="itemsIidoma"
                                    prepend-icon="mdi-alpha-e-box"
                                    variant="outlined" :label="$t('preferred language')"
                                    v-model="datos_usuario.idioma_preferencia"
                                    :error-count="form.error.idioma_preferencia ? form.error.idioma_preferencia.length : 0"
                                    :error-messages="form.error.idioma_preferencia"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                
                            </v-col>

                            <v-col cols="3">
                                <v-number-input prepend-icon="mdi-counter"
                                    variant="outlined" 
                                    reverse
                                    :hideInput="false"
                                    inset
                                    :max="3"
                                    :min="0"
                                    :model-value="0"
                                    :label="$t('Number of companions')"
                                    v-model="datos_usuario.numero_personas"
                                    :error-count="form.error.numero_personas ? form.error.numero_personas.length : 0"
                                    :error-messages="form.error.numero_personas"></v-number-input>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field 
                                    variant="outlined" :label="$t('Full name of each companion')"
                                    :hint="$t('Example: Saul Ramirez, Joshua Crespin, etc.')"
                                    v-model="datos_usuario.nombre_integrantes"
                                    :error-count="form.error.nombre_integrantes ? form.error.nombre_integrantes.length : 0"
                                    :error-messages="form.error.nombre_integrantes"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field prepend-icon="mdi-human-wheelchair"
                                    variant="outlined" :label="$t('Reduced mobility or disabilities')"
                                    :hint="$t('Write down any mobility issues or disabilities of any member.')"
                                    v-model="datos_usuario.movilidad_discapacidad"
                                    :error-count="form.error.movilidad_discapacidad ? form.error.movilidad_discapacidad.length : 0"
                                    :error-messages="form.error.movilidad_discapacidad"></v-text-field>
                            </v-col>

                            <v-col cols="3">
                                <v-radio-group inline :label="$t('Payment method')" v-model="selectedPago" @change="updateBooleanos">
                                        <v-radio :label="$t('Cash')" value="efectivo"
                                            :error-count="form.error.metodo_pago_efectivo_bo ? form.error.metodo_pago_efectivo_bo.length : 0"
                                            :error-messages="form.error.metodo_pago_efectivo_bo"></v-radio>
                                        <v-radio :label="$t('Credit card')" value="tarjeta"
                                            :error-count="form.error.metodo_pago_tarjeta_bo ? form.error.metodo_pago_tarjeta_bo.length : 0"
                                            :error-messages="form.error.metodo_pago_tarjeta_bo"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="4">
                                <h3 
                                    style="color: #000000; 
                                    "> 
                                    {{ $t('Cost of the reservation:') }}
                                </h3>
                                <v-text-field density="compact" variant="outlined"
                                    v-model="datos_usuario.efectivo" readonly disabled
                                    :error-count="form.error.efectivo ? form.error.efectivo.length : 0"
                                    :error-messages="form.error.efectivo"> 
                                    <!-- $20 -->
                                </v-text-field>
                                <br>
                                <span 
                                    style="color: #000000; 
                                    "> 
                                    {{ $t('$20 per person, for each additional person added to the booking, the price will increase.') }}
                                </span>
                            </v-col>


                            <template v-if="selectedPago === 'efectivo'">
                                <v-col cols="4" class="mt-8">
                                        <span 
                                        style="color: #000000; 
                                        "> 
                                            {{ $t('It will be paid at the time of the tour.') }}
                                        </span>
                                </v-col>
                            </template>

                            <!-- solo si es tarjeta de credito -->
                            <template v-if="selectedPago === 'tarjeta'">
                                <v-col cols="5">
                                </v-col>
                                <v-col cols="3">
                                </v-col>
                                <v-col cols="9">
                                    <div>
                                        <img src="@/assets/visa.jpg" alt="Tarjeta de Crédito/Débito" style="max-width: 100%; max-height: 200px;">
                                        <span class="text-caption grey--text text--darken-1">
                                            <h4>{{ $t('Credit/Debit Card') }}</h4>
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        prepend-icon="mdi-alpha-e-box"
                                        variant="outlined" :label="$t('Card number')"
                                        v-model="datos_usuario.numero_tarjeta"
                                        :error-count="form.error.numero_tarjeta ? form.error.numero_tarjeta.length : 0"
                                        :error-messages="form.error.numero_tarjeta"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field prepend-icon="mdi-calendar-range"
                                        variant="outlined" :label="$t('Due date')"
                                        hint="Ejemplo: 01/24"
                                        v-model="datos_usuario.fecha_vencimiento"
                                        :error-count="form.error.fecha_vencimiento ? form.error.fecha_vencimiento.length : 0"
                                        :error-messages="form.error.fecha_vencimiento"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field
                                        prepend-icon="mdi-"
                                        variant="outlined" label="CVV *"
                                        :hint="$t('Security code, example: 573')"
                                        v-model="datos_usuario.cvv"
                                        :error-count="form.error.cvv ? form.error.cvv.length : 0"
                                        :error-messages="form.error.cvv"></v-text-field>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>


                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="warning" size="small" variant="flat" prepend-icon="mdi-reload" @click="resetForm()"
                                >{{ $t('Reset form') }}</v-btn>
                            <v-btn color="#0230ba" size="small" variant="flat" prepend-icon="mdi-content-save-all-outline"
                                @click="validarReserva()" :loading="loadingButtonValidar">{{ $t('Save reservation') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script src="./Reservas_Usuarios.js"></script>
<style lang="css" src="./Reservas_Usuarios.css"></style>