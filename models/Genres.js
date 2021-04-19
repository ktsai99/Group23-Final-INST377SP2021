export default (database, DataTypes) =>
{
    const Genres = database.define(
        'Genres',
        {
            genre_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            genre_name:
            {
                type: DataTypes.STRING(30),
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Genres;
};