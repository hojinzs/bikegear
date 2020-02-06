const featured = ['maintenance','recharge','share-point','monument','supply-point']

const tags = [
    {
        'name' : 'maintenance',
        'label' : '정비',
        'icon' : 'tools',
        'color' : '#ffcc66'
    },
    {
        'name' : 'recharge',
        'label' : '충전소',
        'icon' : 'charging-station',
        'color' : '#00cc7a'
    },
    {
        'name' : 'share-point',
        'label' : '공유',
        'icon' : 'bicycle',
        'color' : '#009900'
    },
    {
        'name' : 'supply-point',
        'label' : '보급',
        'icon' : 'pizza-slice',
        'color' : '#ff3300'
    },
    {
        'name' : 'bike-pariking',
        'label' : '거치',
        'icon' : 'parking',
        'color' : '#ff0080',
    },
    {
        'name' : 'drinking',
        'label' : '음료제공',
        'icon' : 'glass-whiskey',
        'color' : '#1a75ff'
    },
    {
        'name' : 'monument',
        'label' : '볼거리',
        'icon' : 'monument',
        'color' : '#6600ff'
    },
]

const type = ['shop', 'lockstand', 'sharing', 'convinience','monument', 'goverment']
const brand = ['trek','bontrager','rapha','cannondale',]
const merchant = ['cycle','minivelo' ,'mtb', 'e-mtb', 'e-bike', 'smartmobility', 'component', 'food', 'coffee', 'apparel']

const response = [
    {
        "name": "싸이클웍스(Cycleworks)",
        "type": "shop",
        "description": "싸이클웍스(Cycleworks)",
        "geoPoint": {
            "latitude": 37.41742,
            "longitude": 127.1252
        },
        "phone": "025730980",
        "formattedAddress": "경기 성남시 중원구 성남대로 997번길 49-4",
        "Url": "www.cycleworks.co.kr",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_348194?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": [
                "repair"
            ],
            "Brand": [
                "trek"
            ],
            "Merchant": [
                "cycle", "mtb"
            ],
            "others": [

            ]
        }
    },
    {
        "name": "마니또바이크",
        "type": "shop",
        "description": "마니또바이크",
        "geoPoint": {
            "latitude": 37.59279,
            "longitude": 127.07831
        },
        "phone": "024912040",
        "formattedAddress": "서울 중랑구 중랑천로 10길 98 , (면목동) 1층",
        "Url": "http://www.manitoubike.co.kr/",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_348194?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": [
                "repair"
            ],
            "Brand": [
                "trek"
            ],
            "Merchant": [
                "cycle", "mtb"
            ],
            "others": [

            ]
        }
    },
    {
        "name": "트렉 바이시클 분당점",
        "type": "shop",
        "description": "트렉 바이시클 분당점",
        "geoPoint": {
            "latitude": 37.37081,
            "longitude": 127.1075
        },
        "Url": "https://www.trekbikes.com/kr/ko_KR/retail/bundang/",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_390332?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": [
                "repair"
            ],
            "Brand": [
                "trek"
            ],
            "Merchant": [
                "cycle", "mtb"
            ],
            "others": []
        }
    },
    {
        "name": "매디슨(송파점)",
        "type": "shop",
        "description": "매디슨(송파점)",
        "geoPoint": {
            "latitude": 37.4876,
            "longitude": 127.1246
        },
        "Url": "https://www.trekbikes.com/kr/ko_KR/store/389636/",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_389636?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": [
                "repair"
            ],
            "Brand": [
                "trek"
            ],
            "Merchant": [
                "cycle", "mtb"
            ],
            "others": []
        }
    },
    {
        "name": "홍가네슈퍼",
        "type": "convinience",
        "description": "홍가네슈퍼",
        "geoPoint": {
            "latitude": 37.49065,
            "longitude": 127.39235
        },
        "Url": "https://www.facebook.com/pages/%ED%99%8D%EA%B0%80%EB%84%A4-%EC%8A%88%ED%8D%BC/197049727031560",
        "Image": "https://t1.daumcdn.net/cfile/tistory/2348FA3F57B325052E",
        "Tags": {
            "Utility": [
                "supply-point"
            ],
            "Brand": [
            ],
            "Merchant": [
                "food", "apparel"
            ],
            "others": []
        }
    },
    {
        "name": "북악 팔각정",
        "type": "monument",
        "description": "북악 팔각정",
        "geoPoint": {
            "latitude": 37.49065,
            "longitude": 127.39235
        },
        "Url": "https://www.facebook.com/pages/%ED%99%8D%EA%B0%80%EB%84%A4-%EC%8A%88%ED%8D%BC/197049727031560",
        "Image": "https://t1.daumcdn.net/cfile/tistory/2348FA3F57B325052E",
        "Tags": {
            "Utility": [
                "supply-point", "maintenance"
            ],
            "Brand": [
                "cannondale"
            ],
            "Merchant": [
                "food", "apparel", "coffee", "component"
            ],
            "others": []
        },
    },
    {
        "name": "남산",
        "type": "monument",
        "description": "남산",
        "geoPoint": {
            "latitude": 37.49065,
            "longitude": 127.39235
        },
        "Url": "https://www.facebook.com/pages/%ED%99%8D%EA%B0%80%EB%84%A4-%EC%8A%88%ED%8D%BC/197049727031560",
        "Image": "https://t1.daumcdn.net/cfile/tistory/2348FA3F57B325052E",
        "Tags": {
            "Utility": [
                "supply-point", "maintenance"
            ],
            "Brand": [
                "cannondale"
            ],
            "Merchant": [
                "food", "apparel", "coffee", "component"
            ],
            "others": []
        },
    }
]


export { response, tags, featured, type, brand, merchant }