export default (database, DataTypes) =>
{
    const Poster = database.define(
        'poster',
        {
            poster_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            poster_link:
            {
                type: DataTypes.TEXT,
                allowNull: false
            },
            trailer_link:
            {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Poster;
};
