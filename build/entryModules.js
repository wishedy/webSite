var fs = require('fs');
var path = require('path')
var moduleDataPath = path.resolve(__dirname+'/modules.json');
var moduleData = fs.readFileSync(moduleDataPath,'utf-8');
var moduleJson = JSON.parse(moduleData);
module.exports = {
    entryModuleName:'help_center',
    checkEntryPath:function(){
        var pathStr = '';
        var t = this;
        if(t.entryModuleName.length===0){
            pathStr = '/modules/**/*.html';
        }else{
            if(t.entryModuleName.length>2){
                for(var checkKey in moduleJson){
                    var checkInnerName = function(){
                        for(var innerKey in moduleJson[checkKey]){
                            if(innerKey===t.entryModuleName){
                                pathStr = '/modules/'+checkKey+'/'+innerKey+'/'+innerKey+'.html';
                            }
                        }
                    };
                    if(checkKey===t.entryModuleName){
                        if(moduleJson[checkKey]['author']){
                            pathStr = '/modules/'+checkKey+'/'+checkKey+'.html';
                        }else{
                            checkInnerName();
                        }
                    }else{
                        checkInnerName();
                    }
                }
            }
        }
        return pathStr;
    },
    checkIpAddress:function(){
        var  interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
        var  IPAdress = '';
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    IPAdress = alias.address;
                }
            }
        }
        return IPAdress;
    }
};
