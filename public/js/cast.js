var orm = require("../config/orm.js")

var cast = {

    all: function(cb){
        orm.all("cast", function(res){
            cb(res);
        });
    },

    create: function (col){
        
    }
}