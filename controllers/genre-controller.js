const {query} = require('../config/database');
const { makeSlug } = require('../helpers/Global');

module.exports = {
    async listAllGenre(req, res) {
        try {
            const {rows} = await query(`SELECT * FROM genres ORDER BY title ASC`)

            return res.status(200).json({data: rows})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async getGenreById(req, res) {
        const {id} = req.params
        try {
            const {rows} = await query(`SELECT * FROM genres WHERE id=$1`, [id])

            return res.status(200).json({data: rows[0]})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async getGenreBySlug(req, res) {
        const {slug} = req.params
        try {
            const {rows} = await query(`SELECT * FROM genres WHERE slug=$1`, [slug])

            return res.status(200).json({data: rows[0]})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async createGenre(req, res) {
        const {title, description} = req.body
        if (!(title && description))
            return res.status(400).json({message: 'No data!'})

        var now = new Date()
        try {
            const {rows} = await query('SELECT * FROM genres WHERE title=$1', [title])
            if (rows.length > 0)
                return res.status(500).json(`${title} is defined! Please enter another Genre!`)

            const {rowCount} = await query('INSERT INTO genres (title, slug, description, created_at, updated_at) VALUES($1, $2, $3, $4, $5)', [title, makeSlug(title), description, now, now])
            if (rowCount < 1)
                return res.status(500).json({message: `Failed when inserted ${title}`})

            return res.status(201).json({message: `Successfully when inserted ${title}`})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function create genre`
            })
        }
    },
    async updateGenre(req, res) {
        const {slug} = req.params
        const {title, description} = req.body
        if (!(slug && title && description))
            return res.status(500).json()
        
        const qr = 'UPDATE genres SET title=$1, description=$2, slug=$3 WHERE slug=$4'
        try {
            const {rows} = await query('SELECT * FROM genres WHERE title=$1', [title])
            if (rows.length > 0)
                return res.status(500).json(`${title} is defined! Please enter another Genre!`)

            var {rowCount} = await query(qr, [title, description, makeSlug(title), slug])
            if (rowCount < 1)
                return res.status(500).json({message: `Failed update ${title}`})

            return res.status(201).json({
                message: `Successfully update ${title}`
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async deleteGenre(req, res) {
        const {slug} = req.params
        
        const qr = 'DELERE FROM genres WHERE slug=$1'
        try {
            var {rowCount} = await query(qr, [slug])
            if (rowCount < 1)
                return res.status(500).json({message: `Failed update ${title}`})

            return res.status(201).json({
                message: `Successfully delete ${title}`
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    }
}