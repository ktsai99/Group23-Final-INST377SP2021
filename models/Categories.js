export default (database, DataTypes) =>
{
    const Categories = database.define(
        'Categories_',
        {
            category_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            genre_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Categories;
};
