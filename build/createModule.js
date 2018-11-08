var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var chalk = require('chalk')
var moduleDataPath = path.resolve(__dirname+'/modules.json');
var moduleData = fs.readFileSync(moduleDataPath,'utf-8');
var moduleJson = JSON.parse(moduleData);
var fs=require("fs");
function readFile(op,tp,cb){
    fs.readFile(op, 'utf-8', function(err, data) {
        if (err) {
            console.log("读取失败");
        } else {
            cb&&cb(data,tp);
            return data;
        }
    });
}

function writeFile(data,tp){
    fs.writeFile(tp,data,function(error){
        if(error){
            throw error;
        }else{
            //console.log("文件已保存");
        }
    });
}
function copyFile(originalPath,targetPath){
    //console.log(originalPath);
    readFile(originalPath,targetPath,writeFile);

}
var createModule = function(createPath,createKeyName){
    var storeKey = false;
    var routerKey = false;
    var arrKey =[];
    if(createPath.indexOf('\/')>-1){
        arrKey = createPath.split('\/');
        if(!(utils.fsExistsSync(utils.resolve('src/modules/'+arrKey[0]+"/"+arrKey[1])))){
            fs.mkdirSync(utils.resolve('src/modules/'+arrKey[0]+"/"+arrKey[1]));
        }
        storeKey = moduleJson[arrKey[0]][arrKey[1]]['store'];
        routerKey = moduleJson[arrKey[0]][arrKey[1]]['router'];
    }else{
        storeKey = moduleJson[createKeyName]['store'];
        routerKey = moduleJson[createKeyName]['router'];
    }
    var createStoreFile = function(){
        if(!utils.fsExistsSync(utils.resolve('src/modules/'+createPath+"/"+'store'))){
            fs.mkdirSync(utils.resolve('src/modules/'+createPath+"/"+'store'));
            var storeFileName = ["store","mutaions","state","actions","getters"];
            for(var numStroe = 0;numStroe<storeFileName.length;numStroe++){
                copyFile(utils.resolve('src/commModule/store/'+storeFileName[numStroe]+'.js'),utils.resolve('src/modules/'+createPath+"/"+'store/'+storeFileName[numStroe]+'.js'));
            }
        }
    };
    var createRouterFile = function(){
        if(!utils.fsExistsSync(utils.resolve('src/modules/'+createPath+"/"+'router'))){
            fs.mkdirSync(utils.resolve('src/modules/'+createPath+"/"+'router'));
            copyFile(utils.resolve('src/commModule/router/router.config.js'),utils.resolve('src/modules/'+createPath+"/"+'router/router.config.js'));
        }
    };
    if(storeKey&&routerKey){
        copyFile(utils.resolve('src/commModule/main.js'),utils.resolve('src/modules/'+createPath+'/main.js'));
        createRouterFile();
        createStoreFile();
    }else if(storeKey||routerKey){
        if(storeKey){
            console.log('这里');
            createStoreFile();
            copyFile(utils.resolve('src/commModule/mainStore.js'),utils.resolve('src/modules/'+createPath+'/main.js'));
        }
        if(routerKey){
            createRouterFile();
            copyFile(utils.resolve('src/commModule/mainRouter.js'),utils.resolve('src/modules/'+createPath+'/main.js'));
        }

    }else if((!storeKey)&&(!routerKey)){
        copyFile(utils.resolve('src/commModule/default.js'),utils.resolve('src/modules/'+createPath+'/main.js'));
    }
    console.log(utils.resolve('src/commModule/App.vue'));
    copyFile(utils.resolve('src/commModule/App.vue'),utils.resolve('src/modules/'+createPath+'/App.vue'));
    copyFile(utils.resolve('src/commModule/index.html'),utils.resolve('src/modules/'+createPath+'/'+createKeyName+'.html'));
    console.log(chalk.yellow('module创建完成'));
};
for(var keyName in moduleJson){
    var index = 0;
        var isDirExist = utils.fsExistsSync(utils.resolve('src/modules/'+keyName));
    if(isDirExist){
        if(moduleJson[keyName]['author']){
            continue;
        }else{
            for(var innerKeyName in moduleJson[keyName]){
                var isInnerDirExist = utils.fsExistsSync(utils.resolve('src/modules/'+keyName+"/"+innerKeyName));
                if(isInnerDirExist){
                    continue;
                }else{
                    createModule(keyName+"/"+innerKeyName,innerKeyName)
                    //console.log(keyName+'不存在'+innerKeyName)
                }
            }
        }
    }else{
        fs.mkdir(utils.resolve('src/modules/'+keyName),{ recursive: false },function(error){
            if(error){
                console.log(error);
            }else{
                    console.log(keyName);
                 if(moduleJson[keyName]['author']){
                     createModule(keyName,keyName);
                   }else{
                        for(var innerKeyName in moduleJson[keyName]){
                            var isInnerDirExist = utils.fsExistsSync(utils.resolve('src/modules/'+keyName+"/"+innerKeyName));
                            if(isInnerDirExist){
                                continue;
                            }else{
                                createModule(keyName+"/"+innerKeyName,innerKeyName);
                                //console.log(keyName+'不存在'+innerKeyName)
                            }
                        }
                 }
            }
        });
        //console.log('不存在'+keyName);
    }
}