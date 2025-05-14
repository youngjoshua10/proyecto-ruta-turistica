<template>
    <div class="table-container">
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto" prepend-icon="mdi-train" color="#0230ba" elevation="10">
                    <template v-slot:title>
                        <span class="font-weight-black">{{ $t('Review Route: From poet to patriot, the hero´s journey') }}</span>
                        <v-btn class="mx-5" 
                                    color="white" size="small" 
                                    variant="text" prepend-icon="mdi-book-edit" 
                                    @click="irAReservasPag()"
                                >{{ $t('Make a reservation for this tourist route') }}</v-btn>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12">
                <div class="pl-5">
                        <span class="font-weight-black">{{ $t('Cultural and Heritage Tour Route of Guayaquil') }}</span>
                        <!-- <v-list-item-title>
                            d
                        </v-list-item-title> -->
                        <v-list-item-subtitle class="mt-2">
                            1. {{ $t('Estimated total duration: 2h30 min to 3 hours') }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-2">
                            2. {{ $t('Type of tour: Guided walking (With accessibility at key sections)') }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-2">
                            3. {{ $t('Theme: Life, legacy, and influence of José Joaquín de Olmedo') }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-2">
                            4. {{ $t('Segments: Seniors / Young people and adolescents / Children') }}
                        </v-list-item-subtitle>



                    <br>
                    <v-timeline side="end" align="start">
                        <v-timeline-item dot-color="#FF5733">
                            <template v-slot:opposite>
                                <v-chip variant="elevated" color="#FF5733">
                                    {{ $t('First journey') }}
                                </v-chip>
                            </template>
                            <v-card elevation="16">
                                <v-card-tex>
                                    <div>
                                        <div>
                                            <v-carousel hide-delimiters
                                            height="400"
                                            class="my-carousel"
                                            show-arrows="hover">
                                                <v-carousel-item
                                                v-for="(item,i) in items"
                                                :key="i"
                                                :src="item.src"
                                                cover
                                                ></v-carousel-item>
                                            </v-carousel>
                                        </div>
                                        <br>
                                        <div class="text-h6 font-weight-black mx-3">{{ $t('Plaza Olmedo - Olmedo Monument') }}</div>
                                        <p class="mx-3">
                                            {{ $t('Olmedo Plaza is the ideal starting point for this historical route, as it pays tribute to one of the most emblematic figures of Guayaquil: José Joaquín de Olmedo. The monument located in the center of the plaza is a symbolic work of art that represents his role as a poet, politician, and key figure in the city´s independence. Its strategic location and accessibility allow visitors to gather for a contextualized introduction to his life and times.In addition to its aesthetic value, the plaza allows for an emotional connection to the character. Being an open and tree-filled space, it facilitates group interaction and invites reflection on the civic values that Olmedo defended. It is a place where one can begin the narrative with symbolic strength, framing the journey as a cultural and educational experience that connects history and the urban environment.') }}
                                       
                                        </p>
                                        <br>
                                        <v-expansion-panels>
                                            <v-expansion-panel>
                                                <v-expansion-panel-title color="#FF5733" class="font-weight-black">
                                                    {{ $t('Objective of the activity: Introduce the figure of Olmedo from a symbolic perspective.') }}
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <div class="font-weight-black">• 👴 {{ $t('Older adults:') }}</div>
                                                    <div class="mx-3">🎤 {{ $t('´Reciting Olmedo´ - An open mic space where visitors can recite poems of the hero in a relaxed environment with instrumental music.') }}</div>
                                                    <br>
                                                    <div class="font-weight-black">• 👧 {{ $t('Children:') }}</div>
                                                    <div class="mx-3">🎨 {{ $t('´Paint a hero´ - An artistic activity where they draw Olmedo or the monument and participate in a mobile gallery of patriotic art.') }}</div>
                                                    <br>
                                                    <div class="font-weight-black">• 👩‍🎓 {{ $t('Youth') }}</div>
                                                    <div class="mx-3">📱 {{ $t('´QR Code: Olmedo Mission´ - Interactive game with questions about Olmedo´s life; those who complete the mission receive a collectible sticker of the route.') }}</div>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </div>
                                </v-card-tex>
                            </v-card>
                        </v-timeline-item>


                        
                        <v-timeline-item dot-color="#83da00">
                        <template v-slot:opposite>
                            <v-chip variant="elevated" color="#83da00">
                                {{ $t('Second journey') }}
                            </v-chip>
                        </template>
                        <v-card elevation="16">
                            <v-card-tex>
                                <div>
                                    <div>
                                        <v-carousel hide-delimiters
                                        height="400"
                                        class="my-carousel"
                                        show-arrows="hover">
                                            <v-carousel-item
                                            v-for="(item,i) in items2"
                                            :key="i"
                                            :src="item.src"
                                            cover
                                            ></v-carousel-item>
                                        </v-carousel>
                                    </div>
                                    <br>
                                    <div class="text-h6 font-weight-black mx-3">{{ $t('Municipal Museum - Works of Olmedo, portraits and personal objects') }}</div>
                                    <p class="mx-3">
                                        {{ $t('The Municipal Museum of Guayaquil is a key cultural space for understanding the tangible and intellectual legacy of José Joaquín de Olmedo. Its rooms showcase a valuable collection of historical documents, portraits, letters, and objects that belonged to the national hero. This museum allows visitors to delve into the political, social, and artistic context of the 19th century, with a special emphasis on Olmedo´s thinking as a humanist and creator. Its inclusion in the route enriches the experience by connecting visitors with material evidence of history. It is an ideal space for different segments of the audience to observe, touch (when permitted), and interpret original elements from the era, elevating the educational level of the tour. Additionally, it has suitable infrastructure to host groups, educational activities, and themed visits.') }}
                                    </p>
                                    <br>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title color="#83da00" class="font-weight-black">
                                                {{ $t('Objective of the activity: Explore his political, literary, and personal legacy.') }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <div class="font-weight-black">• 👴 {{ $t('Older adults:') }}</div>
                                                <div class="mx-3">🗣 {{ $t('´Coffee with History´ - Guided dialogue in a room with a local historian, accompanied by traditional coffee and old photographs.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👧 {{ $t('Children:') }}</div>
                                                <div class="mx-3">🕵 {{ $t('´Detectives of the past´ - With a magnifying glass, children must find marked objects and mark their sheet.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👩‍🎓 {{ $t('Youth:') }}</div>
                                                <div class="mx-3">📸 {{ $t('´Vintage photoreto´ - Using old filters, you must recreate a photo in the style of the 19th century and upload it with a hashtag.') }}</div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </v-card-tex>
                        </v-card>
                        </v-timeline-item>

                        <v-timeline-item dot-color="#00daaa">
                        <template v-slot:opposite>
                            <v-chip variant="elevated" color="#00daaa">
                                {{ $t('Third journey') }}
                            </v-chip>
                        </template>
                        <v-card elevation="16">
                            <v-card-tex>
                                <div>
                                    <div>
                                        <v-carousel hide-delimiters
                                        height="400"
                                        class="my-carousel"
                                        show-arrows="hover">
                                            <v-carousel-item
                                            v-for="(item,i) in items3"
                                            :key="i"
                                            :src="item.src"
                                            cover
                                            ></v-carousel-item>
                                        </v-carousel>
                                    </div>
                                    <br>
                                    <div class="text-h6 font-weight-black mx-3">{{ $t('Municipality of the Mayor´s Office of Guayaquil - Olmedo´s Armchair') }}</div>
                                    <p class="mx-3">
                                        {{ $t('The Municipal Palace is one of the most emblematic buildings in the historic center of Guayaquil. There is the famous ´Sillón de Olmedo´, symbol of civil power and leadership of the hero when he was president of the government of Guayaquil after independence. This historic piece of furniture is not just a decoration, but a symbolic representation of his vision for autonomy, institutionalism, and development for the city. Including this site allows for a connection between Olmedo´s figure and the public function and political structure of his time. It is a significant stop to reflect on the exercise of power, political decision-making, and the legacy he left in the formation of the first independent governments. Its heritage value and its presence within an active institution make this visit a lively and relevant experience.') }}
                                    </p>
                                    <br>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title color="#00daaa" class="font-weight-black">
                                                {{ $t('Activity objective: Reflect on leadership and historical decisions.') }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <div class="font-weight-black">• 👴 {{ $t('Older adults:') }}</div>
                                                <div class="mx-3">👑 {{ $t('´Dialogue in the Armchair´ - Participants take turns sitting down and saying a phrase they would direct to Guayaquil if they were leaders.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👧 {{ $t('Children:') }}</div>
                                                <div class="mx-3">🎭 {{ $t('´Small council of children´ - Activity with hats and capes in which they simulate being mayors for a day.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👩‍🎓 {{ $t('Youth:') }}</div>
                                                <div class="mx-3">📷 {{ $t('´#SillónChallenge´ - Photo challenge with a leader´s pose and a motivational message featuring a viral hashtag.') }}</div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </v-card-tex>
                        </v-card>
                        </v-timeline-item>

                        <v-timeline-item dot-color="#005cda">
                        <template v-slot:opposite>
                            <v-chip variant="elevated" color="#005cda">
                                {{ $t('Fourth journey') }}
                            </v-chip>
                        </template>
                        <v-card elevation="16">
                            <v-card-tex>
                                <div>
                                    <div>
                                        <v-carousel hide-delimiters
                                        height="400"
                                        class="my-carousel"
                                        show-arrows="hover">
                                            <v-carousel-item
                                            v-for="(item,i) in items4"
                                            :key="i"
                                            :src="item.src"
                                            cover
                                            ></v-carousel-item>
                                        </v-carousel>
                                    </div>
                                    <br>
                                    <div class="text-h6 font-weight-black mx-3">{{ $t('Administration Position - Fragua Vulcano') }}</div>
                                    <p class="mx-3">
                                        {{ $t('The Forge of Vulcan is a sculpture of deep symbolic value located in the Administration Plaza. It represents the heroes of independence shaping freedom in the fire of struggle. This monumental work honors those, like Olmedo, who forged republican and emancipatory ideals. It is an essential stop to discuss the processes of Latin American independence and how public art communicates historical memory.This site is also an excellent connection point between the artistic and the patriotic, ideal for interactive activities. The urban environment makes it accessible, and the aesthetic quality of the sculpture invites active reflection on civic values. The figure of Olmedo as a promoter of freedom is reinforced in this space.') }}
                                    </p>
                                    <br>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title color="#005cda" class="font-weight-black">
                                                {{ $t('Activity objective: Visualize the collective effort for freedom.') }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <div class="font-weight-black">• 👴 {{ $t('Older adults:') }}</div>
                                                <div class="mx-3">🔥 {{ $t('´Forging the homeland´ - A brief writing workshop where they write a message to future generations on burned paper (aged effect).') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👧 {{ $t('Children:') }}</div>
                                                <div class="mx-3">🧩 {{ $t('´Puzzle of Heroes´ - A game to assemble portraits of the heroes, including Olmedo.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👩‍🎓 {{ $t('Youth:') }}</div>
                                                <div class="mx-3">🔓 {{ $t('´Small historical escape´ - Escape room type game with locks and clues hidden in the square that recount episodes of independence.') }}</div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </v-card-tex>
                        </v-card>
                        </v-timeline-item>

                        <v-timeline-item dot-color="#8700da">
                        <template v-slot:opposite>
                            <v-chip variant="elevated" color="#8700da">
                                {{ $t('Fifth journey') }}
                            </v-chip>
                        </template>
                        <v-card elevation="16">
                            <v-card-tex>
                                <div>
                                    <div>
                                        <v-carousel hide-delimiters
                                        height="400"
                                        class="my-carousel"
                                        show-arrows="hover">
                                            <v-carousel-item
                                            v-for="(item,i) in items5"
                                            :key="i"
                                            :src="item.src"
                                            cover
                                            ></v-carousel-item>
                                        </v-carousel>
                                    </div>
                                    <br>
                                    <div class="text-h6 font-weight-black mx-3">{{ $t('Centennial Park - Column of Heroes of October 9') }}</div>
                                    <p class="mx-3">
                                        {{ $t('This park is one of the most important in the city and hosts the Column of the Heroes of October 9, a key date in the independence of Guayaquil. The column and the commemorative sculptures provide a perfect setting to discuss the role of Olmedo in the independence movement and in the consolidation of freedom in the region. Besides its historical importance, the park is an open space ideal for cultural and recreational activities. Its calm and majestic atmosphere invites contemplation and conversation. It is a place that connects the historical with the emotional, promoting values such as civility, identity, and local pride.') }}
                                    </p>
                                    <br>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title color="#8700da" class="font-weight-black">
                                                {{ $t('Activity objective: To revalue civility and independence.') }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <div class="font-weight-black">• 👴 {{ $t('Older adults:') }}</div>
                                                <div class="mx-3">🧵 {{ $t('´Weaving memory´ - They place ribbons on a mural in the shape of a column with messages about what freedom means today.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👧 {{ $t('Children:') }}</div>
                                                <div class="mx-3">🎯 {{ $t('´Search for the national symbol´ - Flags, shields or hidden words are found in the park.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👩‍🎓 {{ $t('Youth:') }}</div>
                                                <div class="mx-3">🎬 {{ $t('´Virtual time capsule´ - They record a 30-second video with a message that should be heard in 100 years.') }}</div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </v-card-tex>
                        </v-card>
                        </v-timeline-item>

                        <v-timeline-item dot-color="#da0064">
                        <template v-slot:opposite>
                            <v-chip variant="elevated" color="#da0064">
                                {{ $t('Sixth and final journey') }}
                            </v-chip>
                        </template>
                        <v-card elevation="16">
                            <v-card-tex>
                                <div>
                                    <div>
                                        <v-carousel hide-delimiters
                                        height="400"
                                        class="my-carousel"
                                        show-arrows="hover">
                                            <v-carousel-item
                                            v-for="(item,i) in items6"
                                            :key="i"
                                            :src="item.src"
                                            cover
                                            ></v-carousel-item>
                                        </v-carousel>
                                    </div>
                                    <br>
                                    <div class="text-h6 font-weight-black mx-3">{{ $t('General Cemetery of Guayaquil - Olmedo´s Tomb') }}</div>
                                    <p class="mx-3">
                                        {{ $t('This place, in addition to being a symbol of historical memory, pays tribute to the man who played a crucial role in the independence of Ecuador and left an invaluable literary legacy, reflected in his poem ´Hymn to October 9, 1820´, which celebrates the freedom and glory of the homeland. The tomb of José Joaquín de Olmedo is not only a resting place but a space that invites reflection on his immense contribution to the independence and culture of Ecuador. Olmedo´s tomb is located in an emblematic area of the cemetery, within the Route of the Founding Fathers and the Route of Writers and Artists of the Guide to Eternity.') }}
                                    </p>
                                    <br>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title color="#da0064" class="font-weight-black">
                                                {{ $t('Activity objective: Tribute and emotional conclusion of the journey.') }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <div class="font-weight-black">• 👴 {{ $t('Older adults:') }}</div>
                                                <div class="mx-3">🌸 {{ $t('´Offering and silence´ - A short walk with white flowers to the rhythm of an instrumental song while leaving messages on a reflection wall.') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👧 {{ $t('Children:') }}</div>
                                                <div class="mx-3">🎈 {{ $t('´Wishes to the wind´ - They write on little papers what they wish for their city and tie them to biodegradable white balloons (controlled use).') }}</div>
                                                <br>
                                                <div class="font-weight-black">• 👩‍🎓 {{ $t('Youth:') }}</div>
                                                <div class="mx-3">🎙 {{ $t('´Live podcast: Olmedo today´ - They record a short interview-style episode where each person answers: ´What did I learn from Olmedo today?´.') }}</div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </v-card-tex>
                        </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script src="./Ruta_Turistica.js"></script>
<style lang="css" src="./Ruta_Turistica.css"></style>