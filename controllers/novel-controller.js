const {query} = require('../config/database');
const { makeSlug } = require('../helpers/Global');

module.exports = {
    async listAllNovel(req, res) {
        try {
            const {rows} = await query(`SELECT * FROM novels ORDER BY updated_at DESC`)

            return res.status(200).json({data: rows})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async getNovelBySlug(req, res) {
        const {slug} = req.params
        try {
            const {rowCount, rows} = await query(`SELECT * FROM novels WHERE slug=$1`, [slug])
            if (rowCount > 0) {
                var novel = rows[0];
                var chapter = await query(
                    `SELECT title, slug, episode, publish FROM 
                        ${novel.type === 'WN' ? 'webnovels' : 'lightnovels'} WHERE novel_id =$1`, [novel.id])
                novel.chapter = chapter.rows
                return res.status(200).json({data: novel})
            }
            return res.status(200).json({data: []})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    
    async createNovelWithUpload(req, res) {
        var file = req.file;
        var {name, sinopsys, othername, author, type, genre, language} = req.body;
        console.log(name, sinopsys, othername, author, type, genre, language);        
        return res.status(200).send({ message: "Something err when upload file!" });

    },
    async createNovel(req, res) {
        var {user_id} = req.user;
        
        const {name, sinopsys, othername, author, type, genre, language} = req.body
        
        if (!(name && sinopsys && author && type && genre && language && user_id))
            return res.status(400).json({message: 'No data!'})

        var q_insert = `
            INSERT INTO 
                novels (
                    name,
                    profile_id,
                    sinopsys, 
                    slug, 
                    othername,
                    genres,
                    author,
                    language, 
                    type, 
                    status,
                    publish, 
                    created_at, 
                    updated_at
                ) 
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            returning id
        `
        try {
            const now = new Date()
            const {rowCount, rows} = await query(q_insert, 
                [name, user_id, sinopsys, makeSlug(name), othername, JSON.stringify(genre), author, language, type, false, false, now, now]
            )

            if (rowCount < 1)
                return res.status(500).json({message: `Failed when inserted ${title}`})
            
            return res.status(201).json({message: `Successfully when inserted ${name} with id => ${rows[0].id}`})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function create novel`
            })
        }
    },
    async updateNovel(req, res) {
        const {slug} = req.params
        const {name, sinopsys, othername, author, type, genre, language, status, publish} = req.body
        try {
            const {rowCount} = await query(
                `UPDATE novels SET 
                    name=$1, sinopsys=$2, slug=$3, othername=$4, genres=$5, author=$6, language=$7, type=$8, status=$9, publish=$10, updated_at=$1
                WHERE slug=$1`, 
                [name, sinopsys, makeSlug(name), othername, genre, author, language, type, status, publish, new Date(), slug]
            )

            if (rowCount < 1)
                return res.status(500).json({message: `Failed update ${title}`})

            return res.status(201).json({
                message: `Successfully update ${name}`
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function updateNovel`
            })
        }
    },
    async deleteNovel(req, res) {
        const {slug} = req.params
        
        const qr = 'DELERE FROM novels WHERE slug=$1'
        try {
            var {rowCount} = await query(qr, [slug])
            if (rowCount < 1)
                return res.status(500).json({message: `Failed update ${title}`})

            return res.status(201)
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    }
}