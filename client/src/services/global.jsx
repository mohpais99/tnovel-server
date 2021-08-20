// const _LWX = 'MPPAIS'
var _asciiBitAmt = 8,
    _defaultBaseNBitLen = 7,
    StringFromCharCode = String.fromCharCode,
    _Value = {},
    _Secret = {
        production: "VE5vdmVsSW5kb25lc2lhOlZlcnNpb24uMC4x",
        test: "LTYgZnotZGV2OjIwMjFAcHJvZ3JhbW1pbmcK",
        development: "LTYgZnotZGV2OjIwMjFAcHJvZ3JhbW1pbmcK"
    };

const
    _mathPow = Math.pow,
    charCodeAt = function (src, idx) {
        return src.charCodeAt(idx);
    },
    _getSvrKey = function () {
        var tmp = _Secret[process.env.NODE_ENV || 'development'];
        //key should be encrypted too, so when hacker try to search from memory, it get something else
        return _nBitDec(tmp); //better save encrypted key in array not string
    },
    _genKey = function(keyType) {
        var _As = 65,
            _Ze = 91,
            _as = 97,
            _ze = 123,
            _0s = 48,
            _9e = 58,
            _QuestionMark_s = 63, //?
            _Colon_e = 59, //:
            _Number_Sign_s = 35, //#
            _Ampersand_e = 39, //Terminate before 39 (& actually 38)
            _Left_Parenthis_s = 40, //(
            _FullStop_e = 47, //Terminate before 47, FullStop actually 46
            _LeftSquareBracket_e = 92, //Terminate before 92, [ actually 91
            _RightSquareBracket_s = 93, //]
            _Low_Line_e = 96, //Terminate before 96, _ actually 95
            _Tilde_e = 127, //Terminate before 127, ~ actually 126
            _LatinAwGrave_s = 192,
            _LatinSmall_ae_e = 231, //Terminate before 231, ae actually 230
            _key = "",
            suffix = "",
            arrRange = [_As, _Ze, _as, _ze, _0s, _9e], //[[_As,_Ze],[_as,_ze],[_0s,_9e]],
            i = 0,
            j, k, l;
        if (keyType === 0) { // standard base 64
            suffix = "+/=";
        } else if (keyType === 1) { // non standard uri safe base 64
            suffix = "-_."; // standard uri safe using "+-$"
        } else if (keyType === 2) { // non standard base 64
            arrRange = [_as, _ze, _QuestionMark_s, _Ze, _0s, _Colon_e];
        } else if (keyType === 9) { // key was from server and session specific after successfull login
            arrRange = [];
            _key = _getSvrKey();
        } else { //own base 2 to base 128
            _key = "!";
            arrRange = [_Number_Sign_s, _Ampersand_e, _Left_Parenthis_s, _FullStop_e, _0s, _LeftSquareBracket_e, _RightSquareBracket_s, _Low_Line_e, _as, _Tilde_e, _LatinAwGrave_s, _LatinSmall_ae_e];
        };
        for (l = getLength(arrRange); i < l; i += 2) {
            for (j = arrRange[i], k = arrRange[i + 1]; j < k; j++) {
                _key += StringFromCharCode(j);
            }
        }
        return _key + suffix;
    },
    dataIsDefined = function (value) {
        return value !== undefined
    },
    isUndefined = function (value) {
        return value === undefined
    },
    value = function (key, value) {
        if (dataIsDefined(value)) { //setValue
            _Value[key] = value;
        } else {
            return _Value[key]; //getValue
        }
    },
    _nBitEnc = function (source, baseNBitLen, key) {
        //return _bNE(baseNBitLen || 6, source, key);
        baseNBitLen = baseNBitLen || _defaultBaseNBitLen;
        key = key || _genKey();
        var binData = 0,
            bitLen = 0,
            baseNBit = _mathPow(2, baseNBitLen) - 1,
            encResult = source.replace(/./g, function (v) {
                var encResultTmp = "";
                binData = (binData << _asciiBitAmt) + charCodeAt(v, 0); //v.charCodeAt(0);
                bitLen += _asciiBitAmt;
                while (bitLen >= baseNBitLen) {
                    bitLen -= baseNBitLen;
                    encResultTmp += key[(binData >>> bitLen) & baseNBit];
                    //binData = binData & (_mathPow(2,bitLen)-1);
                }
                return encResultTmp;
            });
        return bitLen > 0 ? encResult + key[(binData << (baseNBitLen - bitLen)) & baseNBit] : encResult;
    },
    _nBitDec = function(source, baseNBitLen, key) {
        //return _bND(baseNBitLen || 6, source, key);
        baseNBitLen = baseNBitLen || _defaultBaseNBitLen;
        var binData = 0,
            bitLen = 0;
        key = key || _genKey();
        return source.replace(/./g, function (v) {
            binData = (binData << baseNBitLen) + key.indexOf(v);
            bitLen += baseNBitLen;
            return bitLen < _asciiBitAmt ? '' : StringFromCharCode((binData >>> (bitLen -= _asciiBitAmt)) & 0xff);
        })
    },
    getLength = function(key) {
        return key.length
    },
    enc = function(source, edType, nBitLen) {
        try {
            if (isUndefined(edType)) { //default base 128 encrypt
                return _nBitEnc(source);
            } else { //base 64 uri safe encrypt
                return _nBitEnc(source, nBitLen || 6, isNaN(edType) ? edType : _genKey(edType));
            }
        } catch (error) {
            console.log(error);
            return error
        }
    },
    dec = function(source, edType, nBitLen) {
        try {
            if (isUndefined(edType)) { //default base 128 decrypt
                return _nBitDec(source);
            } else { //base 64 uri safe decrypt
                return _nBitDec(source, nBitLen || 6, isNaN(edType) ? edType : _genKey(edType));
            }
        } catch (error) {
            console.log(error);
            return error
        }
    },
    rndStr = function(resultLength, keyType, addVarLen) {
        var i = 0,
            random = Math.random,
            round = Math.floor,
            result = '',
            key = _genKey(keyType || 1),
            keyLength = getLength(key);
        for (
            resultLength += addVarLen ? round(random() * addVarLen) : 0; i < resultLength; result += key[round(random() * keyLength)], i += 1
        );
        return result;
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
    rndStr,
    value,
    enc,
    dec,
    getDateInd,
    toBase64,
    prettyDate,
    subStr,
    buildFormData
}