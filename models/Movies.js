export default (database, DataTypes) => 
{
    const Movies = database.define(
      'tv_movie',
      {
        catalogue_id: 
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        category_id: 
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        title: 
        {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        pricing: 
        {
          type: DataTypes.DECIMAL(4,2),
          allowNull: false
        },
        year: 
        {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        duration: 
        {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        episodes: 
        {
          type: DataTypes.INTEGER
        },
        seasons: 
        {
          type: DataTypes.INTEGER
        },
        avg_star_rating: 
        {
          type: DataTypes.DECIMAL(3,2),
          allowNull: false
        },
        media_type: 
        {
          type: DataTypes.STRING(10),
          allowNull: false
        },
        rating_id: 
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        studio_id: 
        {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return Movies;
  };
  