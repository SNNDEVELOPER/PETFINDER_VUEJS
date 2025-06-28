<template>

        <appPetErrors v-if="errors" :petError="errordetail"></appPetErrors>
 
        <section v-else>

            <b-row class="justify-content-center border border-secondary rounded p-4 bg-light">
 
            <b-col lg="12" v-if="loading" class="text-center">
                <b-spinner label="Spinning"></b-spinner>
            </b-col>

            <div v-if="!loading"> 

                <b-row>
                    <b-col lg="12">
                        <h1>Hi, I'm {{ petData.name }}, nice to meet you!</h1>
                    </b-col>
           
                    
                    <b-col lg="8">
                        <div class="petCard-content">

                            <appPetChars    :petCharsAge="petData.age"
                                            :petCharsGender="petData.gender"
                                            :petCharsSize="petData.size"
                                            :petCharsColor="petData.colors.primary"
                                            :petCharsCoat="petData.attributes.coat"
                                            :petCharsTrained="petData.attributes.house_trained"
                                            :petCharsNeeds="petData.attributes.special_needs"
                                            :petCharsEnvironment="petData.attributes.environment"
                            />  

                            <p v-html="petData.description"></p>
                           
                            <div class="petButtons">
                                <b-button class="btn-primary m-1" :href="petData.url">
                                    <b-icon icon="heart-fill" variant="danger"></b-icon> Adopt {{ petData.name }}</b-button>
                                <router-link tag="b-button" class="btn-primary m-1" :to="{ name: 'pets' }"><b-icon icon="back"></b-icon> See more pets</router-link>
                            </div>
                        </div>
                    </b-col>

                    <b-col lg="4" class="petImageGallery text-center p-4 bg-secondary" v-if="petData.photos">

                        <transition name="fade" mode="out-in">
                             <b-img   class="petMainImage" rounded fluid-grow :style="{ backgroundImage: 'url(' + petImage + ')' }" :key="petImage"></b-img>  
                        </transition>

                            <b-row class="justify-content-center">
                                <b-col cols="auto"
                                        v-for="photos in petData.photos" 
                                        :key="photos.id" 
                                        class="m-1 text-center"
                                    >

                                    <b-img :src="photos.small" thumbnail fluid-grow rounded class="petThumbnail"  @click="showLargeImage(photos.medium)"></b-img>


                                </b-col>
                            </b-row>
                        
                    </b-col>

                </b-row>
            </div>
            </b-row>
        </section>
</template>

<script>
import petChars from './petChars';
import petErrors from './petErrors';
import { getPets } from './mixins/getPets';

export default {
  name: 'petfinderDetails',
  mixins: [ getPets ],
  components: { 
    'appPetChars': petChars,
    'appPetErrors': petErrors
  },
  props: {
    
  },
  data() {
      return {
          petData: {},
          loading: true,
          errors: false,
          petImage: ''
      }
  },
  mounted() {
      this._getPets("1")      
  },
  methods: {
    getPet: function(petData) {
      petData = [petData.find(el => el.id === parseInt(this.$route.query.petID))];
      this.petImage = petData[0].photos[0].medium;
      return petData[0];
    },
    showLargeImage: function(img) {
      this.petImage = img;
    }
  }
}
</script>


<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>