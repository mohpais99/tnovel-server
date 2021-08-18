const {query} = require('../config/database');
const { makeSlug } = require('../helpers/Global');


module.exports = {
    async listAllChapter(req, res) {
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
    async getChapterBySlug(req, res) {
        const {typenovel, slug} = req.params
        try {
            const {rowCount, rows} = await query(
                `SELECT chap.*, nov.name as novel_name, nov.slug as novel_slug, nov.genres FROM ${typenovel === 'wn' ? 'webnovels' : 'lightnovels'} as chap
                INNER JOIN novels as nov ON chap.novel_id = nov.id WHERE chap.slug = $1`,
                [slug]
            )

            if (rowCount < 1)
                return res.status(500).json({data: []})

            return res.status(200).json({data: rows})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createAuth`
            })
        }
    },
    async createChapter(req, res) {
        const {
            typenovel,
            novel_id,
            title,
            content,
            episode
        } = req.body
        try {
            const current = new Date()
            const {rowCount} = await query(`
                INSERT INTO ${typenovel === 'wn' ? 'webnovels' : 'lightnovels'}(
                    novel_id, title, slug, content, episode, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [novel_id, title, makeSlug(title), content, episode, current, current]
            )
            if (rowCount < 1)
                return res.status(400).json({s: 0, message: `Failed create chapter ${title}`})

            return res.status(201).json({s: 1, message: `Successfully create chapter ${title} `})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function createChapter`
            })
        }
    },
    async updateChapter(req, res) {
        const {typenovel, slug} = req.params
        const {
            title,
            content,
            episode
        } = req.body
        try {
            const current = new Date()
            const {rowCount} = await query(`
                UPDATE ${typenovel === 'wn' ? 'webnovels' : 'lightnovels'}
                SET
                    title=$1, slug=$2, content=$3, episode=$4, updated_at=$5
                WHERE slug=$6`,
                [title, makeSlug(title), content, episode, current, slug]
            )
            if (rowCount < 1)
                return res.status(400).json({s: 0, message: `Failed create chapter ${title}`})

            return res.status(201).json({s: 1, message: `Successfully create chapter ${title} `})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function updateChapter`
            })
        }
    },
    async deleteChapter(req, res) {
        const {typenovel, slug} = req.params
        try {
            const data = await query(`
                UPDATE FROM ${typenovel === 'wn' ? 'webnovels' : 'lightnovels'} WHERE slug=$1`,
                [slug]
            )
            
            return res.status(201).json({s: 1, message: data })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                message: error || `Some error on function updateChapter`
            })
        }
    }
}