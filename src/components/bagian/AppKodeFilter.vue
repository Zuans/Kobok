<template>
    <div class="filter-kode">
        <AppFormInput 
            formType="number" 
            name="jumlah-kode" 
            @inputMasuk="inputMasuk($event,'jmlKode')" 
            label="Jumlah kode" 
            bgColor="white"
            txtColor="black"
        />
        <AppFormInput 
            formType="options" 
            name="jumlah-kode" 
            @inputMasuk="inputMasuk($event,'opsiFltr')" 
            label="Jumlah kode" 
            :dataOpsi="dataOpsiFltr"
        />
        <AppFormInput 
            formType="options" 
            name="jumlah-kode" 
            @inputMasuk="inputMasuk($event,'opsiUrut')" 
            label="Urutkan" 
            :dataOpsi="dataOpsiUrut"
        />
    </div>
</template>

<script>
import debounce from 'debounce';
import { mapActions} from 'vuex';
export default {
    name : 'appFilterKode',
    components : {
        AppFormInput : () => import('../AppFormInput')
    },
    data() {
        return {
            formFilter : {
                jmlKode : '',
                opsiFltr : '',
                opsiUrut : '',
            },
            dataOpsiFltr : [
                'Bahasa pemrograman',
                'Nama file',
                'Kapan dibuat',
            ],
            dataOpsiUrut : [],
        }
    },
    methods : {
        ...mapActions('kode',[
            'ambilFilterKode',
        ]),
        inputMasuk(val,filter) {
            // Check asal filter 
            if( filter == 'opsiFltr') {
                return this.olahOpsiFilter(val);
            } else if ( filter == 'opsiUrut') {
                return this.olahOpsiUrut(val);
            }
            this.formFilter[filter] = val;
        },
        olahOpsiFilter(opsi) {
            // Checking value manual
            if( !opsi || opsi == 'null') {
                this.formFilter.opsiFltr = null
                return this.dataOpsiUrut = null;
            }
            if ( opsi == 'Bahasa pemrograman') {
                this.formFilter.opsiFltr = 'lang'
                return this.dataOpsiUrut = [
                    'A-Z',
                    'Z-A',
                ]
            } else  if ( opsi == 'Nama file') {
                this.formFilter.opsiFltr = 'fileName';
                return this.dataOpsiUrut = [
                    'A-Z',
                    'Z-A'
                ]
            } else  if ( opsi == 'Kapan dibuat') {
                this.formFilter.opsiFltr = 'createdAt';
                return this.dataOpsiUrut = [
                    'terlama',
                    'terbaru',
                ]
            }
        },
        olahOpsiUrut(opsi) {
            if ( opsi == 'A-Z' || opsi == 'terbaru' ) {
                this.formFilter.opsiUrut = 'DESC';
            } else {
                this.formFilter.opsiUrut = 'ASC';
            }
            return;
        },
        checkOpsi(val) {
            // check apa properti kosong
            if ( val.jmlKode == "" || !val.jmlKode) val.jmlKode = 6;
            if ( val.opsiFltr == "" || !val.opsiFltr ) val.opsiFltr = 'createdAt';
            if ( val.opsiUrut == "" || !val.opsiUrut ) val.opsiUrut = 'DESC';
            return val;
        } 
    },
    watch : {
        formFilter : {
            deep : true,
            handler : debounce(async function(val){
                // let url = ``;
                const data = this.checkOpsi(val);
                this.$emit('formBerubah',data);
            }),
        }
    },
}
</script>

<style lang="scss">
    .filter-kode {
        width : 40%;
    }
</style>