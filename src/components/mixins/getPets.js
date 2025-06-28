import axios from 'axios';

export const getPets = {
    methods: {
        _getPets(a) {
            axios
                .get('') // ADD ENDPOINT FOR PET DATA
                .then(response => {
                    a === '1' ? this.petData = this._getPet(response.data.animals) : 
                    this.petData = this._removeNull(response.data.animals)
                })
                .catch(error =>  {
                    console.log(error)
                    this.errordetail = error
                    this.errors = true
                })
                .finally( () => { this.loading = false
                    if(this.petData.length != 0) {
                        this.hasPets = true
                    }
                })
        },
        _removeNull: function(obj) {
            obj.forEach(function (ob) {
                Object.keys(ob).forEach(function (k) {
                    if (ob[k] === null) {
                        ob[k] = '';
                    }
                });
            });
            
            return obj;
        },
        _getPet: function(petData) {
            petData = [petData.find(el => el.id === parseInt(this.$route.query.petID))];
            this.petImage = petData[0].photos[0].medium;
            return petData[0];
        }
    }
}
