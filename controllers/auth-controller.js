const {query} = require('../config/database');
const {dec, hashPassword, generateToken, comparePassword} = require('../helpers/Global')

module.exports = {
    async findAll(req, res) {
        try {
            const results = await query('SELECT * FROM auths ORDER BY id DESC')

            res.status(200).json({data: results})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async createAccount(req, res){
        const {email, fullname, username, password} = req.body;
        const now = new Date;
        try {
            const pass = await hashPassword(password)
            const results = await query(`INSERT INTO auths(
                email, username, password, is_admin, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7) returning id, email;`, [email, username, pass, false, now, now])

            if (results.rowCount > 0) {
                const {id, email} = results.rows[0]
                const response = await query(`INSERT INTO public.profiles(
                    auth_id, fullname, created_at, updated_at)
                    VALUES ($1, $2, $3, $4) returning id;`, [id, fullname, new Date, new Date])
                
                let user_id = response.row[0].id
                const token = generateToken({user_id, email})

                if (response.rowCount > 0) {
                    res.status(201).json({
                        message: `Create account successfully for ${fullname}`,
                        token: token
                    })
                }
            } else {
                res.status(500).json({
                    message: `Some error on query`,
                    err: results
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error || `Some error on function createAuth`
            })
        }
    },
    /**
     * Useful function to handle user login
     * @returns Object
     */
    async loginAccount(req, res) {
        // var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ regex
        var {us} = req.body
        var q_get = `
            SELECT 
                a.id as id, 
                a.email, 
                a.password,
                p.id as user_id
            FROM 
                auths as a 
            LEFT JOIN
                profiles as p ON p.auth_id = a.id
            WHERE email=$1
        `
        try {
            var {email, password} = JSON.parse(dec(us, 1, 6))
            if (!(email && password))
                return res.status(400).json({message: "Please check your email and password!"});

            // Checking if the email is in the database dan men
            var {rows} = await query(q_get, [email])
            var data = rows[0]

            // If the email is already in the database, the system will compare the input password whether or not it matches with the password in the database
            if (data && (await comparePassword(password, data.password))) {

                // if match then add value last_login and generate token for user
                const {rowCount} = await query('UPDATE auths SET last_login=$1 WHERE id=$2', [new Date(), data.id])
                if (rowCount < 1)
                    return res.status(400).send({message: "Something error when updating data!"});

                const token = generateToken({user_id: data.user_id, email: data.email})
                data.token = token;
                
                return res.status(200).json({
                    message: `Login success for ${data.email}`,
                    data: data
                })
            }

            return res.status(400).json({message: "Please check your email and password!"});
        } catch (error) {
            return res.status(500).json({
                message: error || `Something err in funtion do login`
            })
        }

    }
}