<template>
    
            <appPetErrors v-if="errors" :petError="errordetail"></appPetErrors>

            <section v-else>
                <b-row class="border border-secondary rounded p-4 bg-light">
                    <b-col lg="12">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            pills
                            size="sm"
                            align="right"
                            aria-controls="my-table"
                            class="customPagination"
                            >
                        </b-pagination>

                    </b-col>
                 
                    <b-col lg="12" class="justify-content-center">
                    <div v-if="loading" class="text-center">
                        <b-spinner label="Spinning"></b-spinner>
                    </div>
  
                    <b-card-group columns v-else>  

                         
                        <b-card 
                            v-for="pets in paginatedCards"
                            :key="pets.id"
                            :title="pets.name"
                            :card-title="pets.name"
                            :img-src="pets.photos[0].medium"
                            img-alt="pet for adoption"
                            class="mb-2 shadow" 
                        >

                            <b-card-text class="text-center">
                                <appPetChars :petCharsAge="pets.age" :petCharsGender="pets.gender" :petCharsSize="pets.size" :petCharsColor="pets.colors.primary" />
                                
                            </b-card-text>

                                <router-link tag="b-button" class="btn-primary" :to="{ name: 'petdetails', query: { petID: pets.id} }"><b-icon icon="reply-fill"></b-icon> Meet {{ capitalizeFirst(pets.name) }}</router-link>
                                

                        </b-card>

                    </b-card-group>
                    </b-col>
                </b-row>

            </section>
       
     
</template>

<script>
import petChars from './petChars';
import petErrors from './petErrors';
import { getPets } from './mixins/getPets';

export default {
    name: 'petfinderPets',
    mixins: [ getPets ],
    components: { 
        'appPetChars': petChars,
        'appPetErrors': petErrors
    },
    data() {
        return {
            petData: {},
            loading: true,
            hasPets: false,
            errors: false,
            errordetail: '',
            perPage: 10,
            currentPage: 1,
            currentComponent: 'petfinderPets'
        }
    },
    mounted() {
        this._getPets();
    },
    methods: {
        stringLength: function(yourString, maxLength) { 
            let trimmedString = yourString.substr(0, maxLength);
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
            trimmedString.length > 0 ? trimmedString = trimmedString + " ..." : trimmedString;
            return trimmedString;  
        },
        swapComponent: function(component) {
            this.currentComponent = component;
        },
        removeNull: function(obj) {
            obj.forEach(function (ob) {
                Object.keys(ob).forEach(function (k) {
                    if (ob[k] === null) {
                        ob[k] = '';
                    }
                });
            });
            return obj;
        },
        capitalizeFirst: function(str) {
            if (typeof str !== 'string') return ''
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    computed: {
        rows() {
            return this.petData.length
        },
        allPetsArray() {
            return Object.keys(this.petData).map(pid => this.petData[pid])
        },
        paginatedCards() {
            return this.allPetsArray.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage )
        }
    }
}
</script>


<style scoped>
 
.card {
    width: 100%;
}
.card-body {
    text-align: center;
}
.card img { 
    width: 100%;
    height: 20vw;
    object-fit: cover;
    max-height:100%;
    max-width: 100%;
}

@media (max-width: 576px) { 
    .card img {
        height: 100%;
    }
 }

</style>