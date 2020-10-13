<template>
    <div class="form-bagian-pengguna">
        <h1 class="title-pengguna">Login</h1>
        <div class="input-masuk d-flex align-item-center justify-content-center mt-5">
            <FormInput name="masuk" @inputMasuk="simpanInput($event,'loginInput')" label="Masuk" txtColor="black" bgColor="white" class="pengguna-form mr-5 "/>
            <MyButton name="masuk"  @btn-click="loginDiKlik" bgColor="success" txtColor="white" ><p>Masuk</p></MyButton>
        </div>
        <div class="input-daftar d-flex align-item-center justify-content-center mt-5">
            <FormInput name="daftar" @inputMasuk="simpanInput($event,'daftarInput')" label="Daftar" txtColor="black" bgColor="white" class="pengguna-form mr-5"/>
            <MyButton name="daftar" @btn-click="daftarDiKlik" bgColor="primary" txtColor="white" ><p>Daftar</p></MyButton>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name : 'formBagianPenggguna',
    components : {
        FormInput : () => import('../AppFormInput'),
        MyButton : () => import('../AppTombol'),
    },
    data() {
        return {
            daftarInput : null,
            loginInput : null,
        }
    },
    methods : {
        ...mapActions('pengguna',[
            'loginPengguna',
            'daftarPengguna',
        ]),
        simpanInput(value,varName){
            // Checking  val before execute func
            const existVal = this.checkValue(value);
            if(!existVal) return;
            this[varName] = value;
            return
        },
        loginDiKlik() {
            // Checking val before execute func
            this.loginInput = this.loginInput.trim();
            const existVal = this.checkValue(this.loginInput);
            if(!existVal) return;
            this.loginPengguna(this.loginInput);
        },
        daftarDiKlik() {
            // Checking val before execute func
            this.daftarInput = this.daftarInput.trim();
            const existVal = this.checkValue(this.daftarInput);
            if(!existVal) return;
            this.daftarPengguna(this.daftarInput);
        },
        checkValue(value) {
            if(!value || value == "") return false;
            return true;
        }
    },
}
</script>

<style scoped>

    .form-bagian-pengguna {
        background-color: #2eb9d1;
        border-bottom: 4px solid #1a1818;
        padding : 2rem;
    }

    .pengguna-form {
        display :inline;
    }

    .pengguna-btn {
        display :inline;
    }

    .title-pengguna {
        color : #fff8f8;
        font-weight: bold;
    }

</style>