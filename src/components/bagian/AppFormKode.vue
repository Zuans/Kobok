<template>
  <div class="form-bagian-kode">
      <h1>Code</h1>
      <div class="line-black mx-auto mt-3 w-25"></div>
      <div class="body-kode">
        <h3>Tolong isi semua</h3>
        <div class="container-content">
          <div class="form-wrapper">
            <form action="">
              <AppFormInput 
                  name="input-namaFile" 
                  :value="form.namaFile" 
                  formType="text"     
                  @inputMasuk="testInput($event,'namaFile')"  
                  label="Nama File" 
                  bgColor="white"
                  txtColor="black"
                />
              <AppFormInput 
                  name="input-bahasa"   
                  formType="options"  
                  @inputMasuk="testInput($event,'bhsProgram')"   
                  :value="form.bhsProgram"     
                  :dataOpsi="dataOpsi"  
                  label="Bahasa Program" 
                />
              <AppFormInput name="input-kode" 
                  formType="textarea" 
                  @inputMasuk="testInput($event,'kode')"         
                  :value="form.kode"           
                  label="Kode" 
                  bgColor="matte-black" 
                  txtColor="white" 
                  cols="20" 
                  rows="5"  
                />
          </form>
          <div class="btn-form">
              <AppTombol 
                @btn-click="resetDiKlik($event)"  
                bgColor="danger"  
                txtColor="white">
                <p>Reset</p>
              </AppTombol>
              <AppTombol 
                  @btn-click="unduhDiKlik($event)"  
                  bgColor="primary" 
                  txtColor="white" 
                  v-if="hasilKode != ''"
                  >
                  <p>Unduh</p>
              </AppTombol>
              <AppTombol 
                  @btn-click="simpanDiKlik($event)" 
                  bgColor="success" 
                  txtColor="white" 
                  v-if="$store.state.pengguna.user.logIn && hasilKode != '' " >
                  <p>Simpan</p>
                </AppTombol>
            </div>
          </div>
          <div class="container-highlight">
              <h1>Highlight Code</h1>
              <div class="line-black w-50"></div>
              <div class="highlight-box" v-html="hasilKode" >
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import API_URL from '@/constant/index';
import { mapActions } from 'vuex';
import { ambilData, kirimData, unduhKode } from '@/utils/index';
export default {
    name : 'formBagianKode',
    components : {
      AppFormInput : () => import('../AppFormInput'),
      AppTombol : () => import('../AppTombol'),
    },
    data() {
      return {
        form : {
          namaFile : '',
          bhsProgram : '',
          kode : '',
        },
        hasilKode : '',
        dataOpsi : [],
      }
    },
    async created() {
      try {
        const url = `${API_URL}/options`;
        const { data : { languages : lang }} = await ambilData(url);
        this.dataOpsi = lang;
      } catch(err) {
        console.error(err);
      }
    },
    methods : {
      ...mapActions('notif',[
        'prosesNotif',
        'tampilkanNotif',
        'hilangkanNotif'
      ]),
      ...mapActions('kode',[
        'ambilSemuaKode',
      ]),
      testInput(value,formValue) {
        this.form[formValue] = value;
      },
      resetDiKlik(){
        this.resetForm();
        return;
      },
      async simpanDiKlik() {
        //  Dapatkan user id
        const userId = this.$store.state.pengguna.user.id;
        let dataNotif = {};
        try {
          const url = `${API_URL}/code/store`;
          const bodyData = {
            user : this.$store.state.pengguna.user.id,
            content : {
              fileName : this.form.namaFile,
              lang : this.form.bhsProgram,
              code : this.form.kode,
            }
          };
            //  Init callback
            const cb =  () => kirimData(url,bodyData);
            const { error,message } = await this.prosesNotif(cb);
            this.ambilSemuaKode(userId);
            // Checking error
            if (error) throw new Error(message)
            dataNotif = {
              status : 'success',
              pesan : 'Kode berhasil disimpan..',
            }
            await this.tampilkanNotif(dataNotif);
            return;
        } catch(err) {
          console.log(err);
          dataNotif = {
            status : 'error',
            pesan : err || 'Ups sepertinya ada yang salah',
          }
          this.tampilkanNotif(dataNotif);
        } finally {
          setTimeout(() => {
            this.hilangkanNotif(dataNotif);
          },1500);
        }
      },
      async unduhDiKlik(){
        let dataNotif = {};
        try {
            const {
              namaFile,
              bhsProgram,
              kode
            } = this.form
            const url = `${API_URL}?lang=${bhsProgram}&fileName=${namaFile}&download=${1}`;
            const dataKode = {
              code : kode,
            }
            const cb = () => unduhKode(url,dataKode);
            const data = await this.prosesNotif(cb);
            return data;
        } catch(err) {
          console.log(err);
          dataNotif = {
            status : 'error',
            pesan : err || 'Ups sepertinya ada yang salah',
          }
          this.tampilkanNotif(dataNotif);
        } finally {
          setTimeout(() => {
            this.hilangkanNotif(dataNotif);
          },600);
        }
      },

      resetForm() {
        // Reset form
          this.form = {
            namaFile : '',
            bhsProgram : '',
            kode : '',
          };
        // Reset highlight kode 
        this.hasilKode = "";
      },
      validateForm({namaFile,bhsProgram,kode}) {
          if( !namaFile || namaFile == "") return false;
          if( !bhsProgram || bhsProgram == "" || bhsProgram == "null") return false;
          if( !kode || kode == "") return false;
          return true;
      }
    },
    watch : {
      form : {
        deep : true,
        handler : debounce(async function(val){
          try {
            const validate = this.validateForm(val);
            if(!validate) throw new Error('Pastikan semua input sudah terisi !');
            const {
              namaFile,
              bhsProgram,
              kode
            } = val;
            const url = `${API_URL}?lang=${bhsProgram}&highlight=2&fileName=${namaFile}`;
            const data = {
              code : kode,
            };
            const cb = () => kirimData(url,data);
            const { data : hasilKode } = await this.prosesNotif(cb);
            this.hasilKode = hasilKode;
          } catch(err) {
            const dataNotif  = {
              status : 'error',
              pesan : err,
            }
            await this.tampilkanNotif(dataNotif);
            setTimeout( async() => {
              await this.hilangkanNotif(dataNotif);
            },3000)
          }
        },800),
      }
    },
}
</script>

<style lang="scss">

  .form-bagian-kode {
      padding : 2rem;
      min-height : 100vh; 
      
      .body-kode {
          margin-top : 2rem;
          min-height: 80vh;
          text-align : left;

          .container-content {
            display : grid;
            grid-template-columns : 1.1fr .9fr;
            grid-template-rows : minmax(200px,1fr);
            grid-gap : 4rem;
            
            .btn-form {
              display : flex;
              justify-content : space-around;
              width : 65%;
              margin : auto;
            }

            form {
              margin-top : 2rem;
            }
            
            .container-highlight {
               .highlight-box {
                  margin-top : 2rem;
                  width: 100%;
                  height: 85%;
                  padding : 2rem;
                  color : white;
                  background-color : #444444;
                  border-radius : 1rem;
                  
              }
            }
          }

      }
  }
</style>