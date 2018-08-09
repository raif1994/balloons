export default class DialogsController {



showDialog(type:string)
{
    cc.loader.loadRes("Prefabs/Dialogs/"+ type,  (err, prefab) =>{
        var newNode = cc.instantiate(prefab);
        cc.director.getScene().addChild(newNode);
    });
    
}




}