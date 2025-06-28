import petfinderPets from './components/petfinderPets.vue';
import petfinderDetails from './components/petfinderDetails.vue';

export const routes = [
    { path: '*', component: petfinderPets},
    {  name: 'pets', path: '/pets', component: petfinderPets }
];