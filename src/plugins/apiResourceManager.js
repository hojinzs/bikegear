const apiResourceManager = class {
    constructor(url, props = {
        method: null,
        failTimeout: null
    }) {
        this._url = url
        this._method = props.method || 'GET';
        this._statusList = props.status || ['ready','loading','finish','fail'];
        this._failTimeout = props.failTimeout || 3000

        this._data = [];

        this._status = this._statusList[0]
        this.errormsg = ''
    }

    get data(){
        return this._data;
    }

    set data(data){
        this._status = 'finish'
        this._data = data
    }

    mergeData(dataArray){
        this._status = 'finish'

        dataArray.forEach( data => {
            // todo :: 중복 검사 추가
            this._data.push(data)
        })
    }

    clearData(){
        this._status = 'ready'
        this._data = []
    }

    get apiUrl(){
        return this._url
    }

    /**
     * turn API status Loading
     */
    setLoading(){
        this._status = 'loading'
    }

    get status(){
        return this._status
    }

    /**
     * set Api Endpoint
     * @param url
     * @param methods
     */
    setApiEndpoint(url, methods = 'GET'){
        this._url = url
        this._method = methods
    }

    /**
     * set api Error Message and Error timeout
     * @param {string||array} message
     * @param {Boolean} returnReady
     */
    handlingFail(message = 'error',returnReady = true){
        this.errormsg = message
        this._status = 'fail'

        if(returnReady){
            setTimeout(() => {
                this._status = 'ready'
            },this._errorTimeout)
        }
    }
}

export default apiResourceManager