export default class Tag{

    static getDefaultTagList(){
        return defalut_tags
    }

    /**
     * 인프라에서 태그 목록을 반환한다.
     * @param {Object} _item 태그를 탐색할 인프라(Infra) Object
     * @param {Array} _tagArray (Nullable) 찾을 태그 name (기본: 내장 태그 전체)
     */
    static getTagsOnInfra(_item,_tagArray = null){
        let keys = Object.keys(_item.Tags)
        let tags = []

        if(_tagArray == null) defalut_tags.forEach(i => _tagArray.push(i.name))

        keys.forEach(key => {
            // console.log(_tagArray)
            _tagArray.forEach(searchTag => {
                _item.Tags[key].forEach(targetTag => {
                    if(targetTag.name === searchTag) tags.push(searchTag)
                })
            })
        });

        return tags
    }

    /**
     * 인프라에 태그 정보들이 있는지 판별한다.
     * @param {Object} _item 태그를 탐색할 인프라(Infra Object)
     * @param {Array} _tagNameArray 태그 name의 배열
     */
    static findTagsOnInfra(_item,_tagNameArray = []){
        let tagFind = 0
        _tagNameArray.forEach(name => {
            let find = this.getTagsOnInfra(_item,[name])
            if(find.length > 0) ++tagFind
        })
        return tagFind > 0
    }

    /**
     * 인프라 배열에서 해당 태그가 있는 인프라를 필터한다.
     * @param {Array} _itemArray 태그를 탐색할 인프라(Infra Object)의 배열
     * @param {String} _tagName 찾을 태그 name
     */
    static countInfrasByTag(_itemArray,_tagName){
        return _itemArray.filter((item) => this.findTagsOnInfra(item,[_tagName]) > 0)
    }

    /**
     * 태그 배열에서 태그 Object를 반환한다.
     * @param {Array} _tagArray 태그 name의 배열
     * @param {Array} _defaltTags [Nullable] 태그 Obejct의 배열. (기본: 내장 태그 목록)
     * @returns {Object} 태그 Object
     */
    static getTagDetailFromArray(_tagArray,_defaltTags = defalut_tags){
        let tags = []

        _defaltTags.forEach(searchTag => {
            _tagArray.forEach(targetTag => {
                if(targetTag === searchTag.name) tags.push(searchTag)
            })
        })

        return tags
    }

}

// 나중에 비동기 클래스로 만들기 https://stackoverflow.com/questions/46626144/es6-async-await-in-classes

const defalut_tags = [
    {
        'index' : '1',
        'name' : 'maintenance',
        'label' : '정비',
        'icon' : 'tools',
        'color' : '#ffcc66',
        'type' : 'Utility',
        'description' : '자전거 정비가 가능합니다.'
    },
    {
        'index' : '2',
        'name' : 'recharge',
        'label' : '충전소',
        'icon' : 'charging-station',
        'color' : '#00cc7a',
        'type' : 'Utility',
        'description' : '전기 자전거 충전이 가능합니다.'
    },
    {
        'index' : '3',
        'name' : 'share-point',
        'label' : '공유',
        'icon' : 'bicycle',
        'color' : '#009900',
        'type' : 'Utility',
        'description' : '공유 자전거를 대여하는 장소입니다.'
    },
    {
        'index' : '4',
        'name' : 'supply-point',
        'label' : '보급',
        'icon' : 'pizza-slice',
        'color' : '#ff3300',
        'type' : 'Utility',
        'description' : '식료품이나 음료등을 취급하며 보급이 가능합니다.'
    },
    {
        'index' : '5',
        'name' : 'bike-pariking',
        'label' : '거치',
        'icon' : 'parking',
        'color' : '#ff0080',
        'type' : 'Utility',
        'description' : '자전거 거치대가 있어 잠시 자전거를 거치할 수 있습니다.'
    },
    {
        'index' : '6',
        'name' : 'drinking',
        'label' : '음료제공',
        'icon' : 'glass-whiskey',
        'color' : '#1a75ff',
        'type' : 'Utility',
        'description' : '음료를 제공하여 물통을 채울 수 있는 곳입니다.'
    },
    {
        'index' : '7',
        'name' : 'monument',
        'label' : '명소',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Utility',
        'description' : '볼거리가 있거나 특별한 의미가 있는 곳입니다.'
    },
    {
        'index' : '8',
        'name' : 'trek',
        'label' : '트렉',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Brand',
        'description' : '트렉은 미국 최대의 자전거 브랜드입니다.'
    },
    {
        'index' : '9',
        'name' : 'cycle',
        'label' : '싸이클',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Merchant',
        'description' : '로드바이크, 싸이클을 취급합니다.'
    },
    {
        'index' : '10',
        'name' : 'meal',
        'label' : '식사가능',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Merchant',
        'description' : '식사가 가능합니다.'
    },
    {
        'index' : '11',
        'name' : 'grocery',
        'label' : '식품판매',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Merchant',
        'description' : '보급이 가능한 식료품을 판매합니다.'
    },
    {
        'index' : '12',
        'name' : 'apparel',
        'label' : '의류',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Merchant',
        'description' : '자전거 관련 의류를 판매합니다.'
    },
    {
        'index' : '13',
        'name' : 'coffee',
        'label' : '커피',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Merchant',
        'description' : '에스프레소 기계와 함께 커피를 제공합니다.'
    },
    {
        'index' : '14',
        'name' : 'component',
        'label' : '부품',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Merchant',
        'description' : '자전거 부품을 판매합니다.'
    },
    {
        'index' : '15',
        'name' : 'cannondale',
        'label' : '캐논데일',
        'icon' : 'monument',
        'color' : '#6600ff',
        'type' : 'Brand',
        'description' : '캐논데일은 미국의 종합 자전거 브랜드입니다.'
    },
]