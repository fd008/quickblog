import sequelize, {DataTypes} from "../database/db.mjs";

export default () => 
    sequelize.define('post', {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true, 
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false 
        },
    
    }, 
    {
        freezeTableName: true
    }
)
