'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //used Sequelize validations to filter data trying to be put into DB
      validate: {
        len: {
          args: [2,25],
          msg: 'Name Must be 2 to 25 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please Enter Valid Email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8,99],
          msg: 'password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  //hook to encrypt password before it is stored in DB
  user.addHook('beforeCreate', async (user, options)=>{
    const plainTextPw = user.password
    const saltRounds = 10
    await bcrypt.hash(plainTextPw, saltRounds)
    .then((hash)=>{
      user.password = hash
    })
  })

  user.prototype.validPassword = async function(passwordInput) {
    let match = await bcrypt.compare(passwordInput, this.password)
    return match
  }
  return user;
};