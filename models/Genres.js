export default (database, DataTypes) =>
{
    const Genres = database.define(
        'genre',
        {
            genre_id:
            {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            genre_name:
            {
                type: DataTypes.STRING(45),
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Genres;
};
