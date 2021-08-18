// const _LWX = 'MPPAIS'
const _Value = {}

const
    dataIsDefined = function (value) {
        return value !== undefined
    },

    value = function (key, value) {
        if (dataIsDefined(value)) { //setValue
            _Value[key] = value;
        } else {
            return _Value[key]; //getValue
        }
    },

    getDateInd = function (dat){
        var hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
        var bulan = ['Januari','Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus','September','Oktober','November','Desember'];
        var basetanggal = new Date(dat);
        var tanggal = basetanggal.getDate();
        var _hari = basetanggal.getDay();
        var _bulan = basetanggal.getMonth();
        var _tahun = basetanggal.getYear();

        var day = hari[_hari];
        var month = bulan[_bulan];
        var year = (_tahun < 1000)?_tahun + 1900 : _tahun;

        return day +', ' + tanggal + ' ' + month + ' ' + year;
    },

    toBase64 = async function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    subStr = function(str, index) {
        if (str.length > index) {
            return str.substr(0, index) + '...'
        } else {
            return str
        }
    },
    prettyDate = function (time) {
        var date = new Date(time),
            diff = (new Date().getTime() - date.getTime()) / 1000,
            day_diff = Math.floor(diff / 86400);

        if (isNaN(day_diff) || day_diff < 0) return;

        return (
            (day_diff === 0 &&
                ((diff < 60 && "Baru saja") ||
                    (diff < 120 && "1 menit yang lalu") ||
                    (diff < 3600 && Math.floor(diff / 60) + " menit yang lalu") ||
                    (diff < 7200 && "1 jam yang lalu") ||
                    (diff < 86400 && Math.floor(diff / 3600) + " jam yang lalu"))) ||
            (day_diff === 1 && "Kemarin") ||
            (day_diff < 7 && day_diff + " hari yang lalu") ||
            (day_diff < 31 && Math.ceil(day_diff / 7) + " minggu yang lalu") ||
            (day_diff < 372 && Math.ceil(day_diff / 31) + " bulan yang lalu") ||
            (day_diff >= 372 && Math.round(day_diff / 372) + " tahun yang lalu")
        );
    },
    buildFormData = function(formData, data, parentKey) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    }


export {
    value,
    getDateInd,
    toBase64,
    prettyDate,
    subStr,
    buildFormData
}