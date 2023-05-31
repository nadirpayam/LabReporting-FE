import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
             'Sign Up':'Sign Up',
             'Password mismatch':'Password mismatch',
             'Your Name':'Your Name',
             'Your Surname':'Your Surname',
             'Your Username':'Your Username',
             'Your Identity':'Your Identity',
             'Your Email': 'Your Email',
             'Your Password':'Your Password',
             'Repeat Your Password':'Repeat Your Password',
             'Login':'Login',
             "LoginYonu":"Don't have an account?",
             "RegisterYonu":"Do you have an account?",
             "Logout":"Logout",
             'Patients':'Patients',
             next:'next >',
             previous:'< previous',
             'Load Failure':'Load Failure',
             'User not found!':'User not found!',
             Edit:'Edit',
             Save:'Save',
             Cancel:'Cancel',
             EmailUp:'Update Your Email',
             "My Profile":"My Profile",
             'Name':'NAME',
             Soyad:"SURNAME",
             'TC':'IDENTİTY NO',
             'EMAİL':'EMAIL',
             'Add report':'Add Report',
             "My Reports":"My Reports",
             "PName":"Patient Name",
             "PSurName":"Patient SurName",
             "DIAGNOSIS":"Diagnosis",
             "DIAGNOSIS DETAILS":"Diagnosis Details",
             "REPORT DATE":"Report Date",
             "update":"Edit",
             "delete":"Delete",
             "Patients":"Patients",
             "All Reports":"All Reports",
             "GoRapor":"Go To Rapor",
             "DNo":"REPORT NO",
             "EmailH":"Patient's Email",
                              "labad":"Laborant Name",
                              "labsad":"Laborant Surname",
                              "labno":"Laborant Hospital No",
                              "labemail":"Laborant Mail"

            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch':'Şifreler eşleşmedi',
                'Your Name':'Adınız',
                'Your Surname':'Soyadınız',
                'Your Email':'Emailiniz',
                'Your Username':'Kullanıcı Adınız',
                'Your Identity':'TC Kimlik Numaranız',
                'Your Password':'Şifreniz',
                'Repeat Your Password':'Şifrenizi Tekrarlayınız',
                'Login':'Giriş Yap',
                "LoginYonu":"Hesabın yok mu?",
                "RegisterYonu":"Hesabın var mı?",
                "Logout":"Çıkış Yap",
                'Patients':'Hastalar',
                 next: 'sonraki >',
                 previous: '< önceki',
                 'Load Failure':'Liste Alınamadı',
                 'User not found!':'Kullanıcı Bulunamadı!',
                 Edit:'Düzenle',
                 Save:'Kaydet',
                 Cancel:'İptal',
                 EmailUp:'Emailinizi Güncellein',
                 "My Profile":"Profilim",
                 'Name':'AD',
                 Soyad:"SOYAD",
                 'TC':'TC',
                 'EMAİL':'EMAIL',
                 'Add report':'Rapor Oluştur',
                 "My Reports":"Raporlarım",
                 "PName":"Hasta Adı",
                 "PSurName":"Hasta Soyadı",
                 "DIAGNOSIS":"Tanı",
                 "DIAGNOSIS DETAILS":"Tanı Detayı",
                 "REPORT DATE":"Rapor Tarihi",
                 "update":"Düzenle",
                 "delete":"Sil",
                 "Patients":"Hastalar",
                 "All Reports":"Tüm Raporlar",
                 "GoRapor":"Rapora Git",
                 "DNo":"RAPOR NO",
                 "EmailH":"Hasta Mail",
                 "labad":"Laborant Adı",
                 "labsad":"Laborant Soyadı",
                 "labno":"Laborant Hastane No",
                 "labemail":"Laborant Mail"
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation: {
        excapeValue: false,
        formatSeperator: ','
    },
    reac: {
        wait: true
    }
});

export default i18n;