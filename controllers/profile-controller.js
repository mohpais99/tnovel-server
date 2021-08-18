const {query} = require('../config/database');

module.exports = {
    async findProfielById(req, res) {
        const {id} = req.params
        let q = `
            SELECT 
                prof.fullname, 
                prof.photo,
                auth.email,
                auth.username,
                auth.token
            FROM 
                profiles as prof 
            LEFT JOIN
                auths as auth ON prof.auth_id = auth.id
            WHERE prof.id = $1
        `
        try {
            const results = await query(q, [id])

            res.status(200).json({data: results})

        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async updateProfileData(req, res) {
        var user = req.user;
        let q = `
            UPDATE 
                profiles
            SET 
                fullname=$1,
                no_telp=$2
            WHERE
                id=$3
        `
        try {
            var {fullname, no_telp} = req.body
            if (!(fullname && no_telp && user))
                return res.status(400).send({ message: "Something err when updating profile!" });

            const {rowCount} = await query(q, [fullname, no_telp, user.user_id])
            if (rowCount < 1)
                return res.status(400).send({ message: "Something err when updating profile!" });

            return res.status(200).json(`Berhasil mengupdate data ${fullname}`)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async uploadProfilePhoto(req, res) {
        var file = req.file;
        var user = req.user;
        // Handling err
        if (!(file && user))
            return res.status(400).send({ message: "Something err when upload file!" });
        
        try {
            let q = `
                UPDATE 
                    profiles
                SET 
                    photo=$1
                WHERE
                    id=$2
            `
            // Updating data on database
            let filename = file.originalname.replace(/\s+/g, '-').toLowerCase()
            var {rowCount} = await query(q, [filename, user.user_id])
            if (rowCount < 1)
                return res.status(400).send({ message: "Something err when upload file!" });

            return res.status(200).json({ message: `Berhasil meng-upload foto!`})
        } catch (error) {
            res.status(500).send({
                message: `Could not upload the file: ${file.originalname}. ${error}`,
            });
        }
    }
}