export default (database, DataTypes) =>
{
    const Trailers = database.define(
        'trailer',
        {
            catalogue_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            trailer_link:
            {
                type: DataTypes.STRING(60),
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Trailers;
};