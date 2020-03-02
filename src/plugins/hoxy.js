export default class Hoxy{
    static bl2r(str){
        let breakTag = '<br />';    
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    }
}