sequelize model:generate --name Auth --attributes email:string,username:string,password:string,token:string,isAdmin:boolean
sequelize model:generate --name User --attributes authId:integer,first_name:string,last_name:string,fullname:string,email:string,photo:string

sequelize model:generate --name Novel --attributes id:smallint,user_id:integer,name:string,slug:string,othername:string,poster:string,author:string,type:enum,status:enum,language:string,year:string,publish:enum,created_by:string
sequelize model:generate --name ChapterWN --attributes id:smallint,user_id:integer,novel_id:integer,title:string,slug:string,content:text,episode:integer,status:enum,publish:enum,created_by:string,release_at:date
sequelize model:generate --name ChapterLN --attributes id:smallint,user_id:integer,novel_id:integer,title:string,slug:string,content:text,bab:integer,episode:integer,status:enum,publish:enum,created_by:string,release_at:date
sequelize model:generate --name Genre --attributes id:smallint,description:text
sequelize model:generate --name GenreNovel --attributes id:smallint,novel_id:integer,genre_id:integer