module.exports ={
    HOST:'Localhost',
    USER:'root',
    PASSWORD:'EouG6467*@cargoflash',
    DB:'ecom_db',
    dialect:'mysql',
    pool:{
    max:5,
    min:0,
    acquire:30000, //max time  in ms that a pool will try to getconnection before throwing error    
    idle:10000 //maximum time in ms that a connection can be idlebefore being released
    }
} 