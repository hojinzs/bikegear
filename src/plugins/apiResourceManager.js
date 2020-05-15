const apiResourceManager = class {
    constructor(url, props = {
        method: null,
        failTimeout: null,
        successTimeout: null,
    }) {
        this._url = url
        this._method = props.method || 'GET';
        this._statusList = props.status || ['ready','loading','finish','fail'];
        this._failTimeout = props.failTimeout || 3000;
        this._successTimeout = props.successTimeout;

        this._pagingMeta = {
            current_page: 1,
            last_page: 1,
            per_page: 10,
        }

        this._data = [];

        this._status = this._statusList[0]
        this.errormsg = ''

        return this
    }

    get data(){
        return this._data;
    }

    set data(data){
        this._status = 'finish'
        this._data = data
    }

    setData(data){
        console.log("set Data => ", data)
        this._data = data
    }

    setPaging(pageMetaData = {
        'current_page': 1,
        'last_page': 1,
        'per_page': 10,
    }){
        this._pagingMeta = {
            current_page: pageMetaData.current_page || 1,
            last_page: pageMetaData.last_page || 1,
            per_page: pageMetaData.per_page || 10,
        }

        return this
    }

    get currentPage(){
        return this._pagingMeta.current_page
    }

    get perPage(){
        return this._pagingMeta.per_page
    }

    get lastPage(){
        return this._pagingMeta.last_page
    }

    get nextPage(){
        if(this._pagingMeta.current_page === this._pagingMeta.last_page){
            return null
        } else {
            return this._pagingMeta.current_page + 1
        }
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

    get method(){
        return this._method
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

        return this
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
            },this._failTimeout)
        }
    }

    handlingSuccess(timeout = null){
        this._status = 'finish'

        if(this._successTimeout || timeout){
            let timeout = this._successTimeout || timeout
            setTimeout(() => {
                this._status = 'ready'
            },timeout)
        }
    }
}

export default apiResourceManager