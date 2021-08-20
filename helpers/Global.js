require('dotenv').config()
var bcrypt = require ('bcrypt');
var jwt = require('jsonwebtoken');

var _asciiBitAmt = 8,
    _defaultBaseNBitLen = 7,
    StringFromCharCode = String.fromCharCode,
    _Value = {
        saltRounds: 10
    },
    _Secret = {
        production: process.env.NODE_SECRET,
        test: "LTYgZnotZGV2OjIwMjFAcHJvZ3JhbW1pbmcK",
        development: "LTYgZnotZGV2OjIwMjFAcHJvZ3JhbW1pbmcK"
    };

var
    _mathPow = Math.pow,
    arrPush = function (arr, newItem) {
        arr.push(newItem);
    },
    charCodeAt = function (src, idx) {
        return src.charCodeAt(idx);
    },
    charAt = function (src, idx) {
        return src.charAt(idx);
    },
    _getSvrKey = () => {
        var tmp = _Secret[process.env.NODE_ENV || 'development'];
        //key should be encrypted too, so when hacker try to search from memory, it get something else
        return _nBitDec(tmp); //better save encrypted key in array not string
    },
    _genKey = (keyType) => {
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
        if (keyType == 0) { // standard base 64
            suffix = "+/=";
        } else if (keyType == 1) { // non standard uri safe base 64
            suffix = "-_."; // standard uri safe using "+-$"
        } else if (keyType == 2) { // non standard base 64
            arrRange = [_as, _ze, _QuestionMark_s, _Ze, _0s, _Colon_e];
        } else if (keyType == 9) { // key was from server and session specific after successfull login
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
    isUndefined = (str) => {
        return !str
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
    _nBitDec = (source, baseNBitLen, key) => {
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
    getLength = (key) => {
        return key.length
    },
    enc = (source, edType, nBitLen) => {
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
    dec = (source, edType, nBitLen) => {
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
    rndStr = (resultLength, keyType, addVarLen) => {
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
    /**
     * Hashing password using bcrypt module
     * @param (_pass) => Str::password kiriman untuk register
     * @param (_salt) => Str::The salt generation for your hash function can range from a 
     *                     few seconds to many days, depending on how many rounds
     *                     you passed. The bcrypt module will go through 2^rounds
     *                     to generate the salt to give you a secure hash.
     */
    hashPassword = async (_pass, _salt) => {
        let _genSalt = await bcrypt.genSalt(_salt ? _salt : _Value.saltRounds);
        let _hash = await bcrypt.hash(_pass, _genSalt);

        return _hash
    },
    /**
     * Comparing Password with bcrypt module
     * @param (_paramsPass) => Str::password kiriman untuk login
     * @param (_passUSer) => Str::password yang disimpan dalam database
     */
    comparePassword = async (_paramsPass, _passUSer) => {
        return await bcrypt.compare(_paramsPass, _passUSer); // return true or false
    },
    /**
        * Generate Token
        * @param {string} email 
        * @param {int} id 
        * @param {boolean} is_admin 
        * @param {String} fullname 
    */
    generateToken = (_Source) => {
        try {
            return jwt.sign(
                _Source, 
                _Secret[process.env.NODE_ENV || 'development'], 
                { 
                    expiresIn: "2h" 
                }
            );
        } catch (error) {
            res.status(500).json({'message': 'Something wrong!'});
        }
    },
    /**
        * Verify Token
        * @param {string} email 
        * @param {int} id 
        * @param {boolean} is_admin 
        * @param {String} fullname 
    */
    verifyToken = (req, res, next) => {
        var token = req.body.token || req.query.token || req.headers['x-access-token']
        if (!token)
            return res.status(401).json({
                message: "A token is required for authentication"
            });
        try {
            const decoded = jwt.verify(token, _Secret[process.env.NODE_ENV || 'development']);
            req.user = decoded
        } catch (error) {
            return res.status(401).json({'message': 'No authorization!'});
        }

        return next()
    },
    /**
     * Make slug for title
     */
    makeSlug = (_Title) => {
        return _Title.replace(/\s+/g, '-').toLowerCase()
    }
    

module.exports = {
    rndStr,
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    enc,
    dec,
    makeSlug
}