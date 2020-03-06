import Tag from '../../plugins/journey66_tag'

const featured = ['maintenance','recharge','share-point','monument','supply-point']

const type = ['shop', 'lockstand', 'sharing', 'convinience','monument', 'goverment']
const brand = ['trek','bontrager','rapha','cannondale',]
const merchant = ['cycle','minivelo' ,'mtb', 'e-mtb', 'e-bike', 'smartmobility', 'component', 'food', 'coffee', 'apparel']

const tags = Tag.getDefaultTagList()

const response = [
    {
        "id" : 1,
        "name": "싸이클웍스(Cycleworks)",
        "type": "shop",
        "description": "싸이클웍스(Cycleworks)",
        "geoPoint": {
            "latitude": 37.41742,
            "longitude": 127.1252
        },
        "like": 122,
        "phone": "025730980",
        "formattedAddress": "경기 성남시 중원구 성남대로 997번길 49-4",
        "Url": "www.cycleworks.co.kr",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_348194?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["maintenance"]),
            "Brand": Tag.getTagDetailFromArray(["trek"]),
            "Merchant": Tag.getTagDetailFromArray(["cycle", "mtb"]),
            "others": []
        }
    },
    {
        "id" : 2,
        "name": "마니또바이크",
        "type": "shop",
        "description": "마니또바이크",
        "geoPoint": {
            "latitude": 37.59279,
            "longitude": 127.07831
        },
        "like": 122,
        "phone": "024912040",
        "formattedAddress": "서울 중랑구 중랑천로 10길 98 , (면목동) 1층",
        "Url": "http://www.manitoubike.co.kr/",
        "Image": "https://modo-phinf.pstatic.net/20151110_11/1447154093942Ut5Vk_JPEG/mosa6YkuQl.jpeg?type=w1100",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["maintenance"]),
            "Brand": Tag.getTagDetailFromArray(["trek"]),
            "Merchant": Tag.getTagDetailFromArray(["cycle", "mtb"]),
            "others": []
        }
    },
    {
        "id" : 3,
        "name": "트렉 바이시클 분당점",
        "type": "shop",
        "description": "트렉 바이시클 분당점",
        "geoPoint": {
            "latitude": 37.37081,
            "longitude": 127.1075
        },
        "like": 122,
        "Url": "https://www.trekbikes.com/kr/ko_KR/retail/bundang/",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_390332?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["maintenance"]),
            "Brand": Tag.getTagDetailFromArray(["trek"]),
            "Merchant": Tag.getTagDetailFromArray(["cycle", "mtb"]),
            "others": []
        }
    },
    {
        "id" : 4,
        "name": "매디슨(송파점)",
        "type": "shop",
        "description": "매디슨(송파점)",
        "geoPoint": {
            "latitude": 37.4876,
            "longitude": 127.1246
        },
        "like": 122,
        "Url": "https://www.trekbikes.com/kr/ko_KR/store/389636/",
        "Image": "https://trek.scene7.com/is/image/TrekBicycleProducts/store_image_389636?$responsive-pjpg$&cache=on,on&wid=480&hei=360&fit=fit,1",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["maintenance"]),
            "Brand": Tag.getTagDetailFromArray(["trek"]),
            "Merchant": Tag.getTagDetailFromArray(["cycle", "mtb"]),
            "others": []
        }
    },
    {
        "id" : 5,
        "name": "홍가네슈퍼",
        "type": "convinience",
        "description": "홍가네슈퍼",
        "geoPoint": {
            "latitude": 37.49065,
            "longitude": 127.39235
        },
        "like": 122,
        "Url": "https://www.facebook.com/pages/%ED%99%8D%EA%B0%80%EB%84%A4-%EC%8A%88%ED%8D%BC/197049727031560",
        "Image": "https://t1.daumcdn.net/cfile/tistory/2348FA3F57B325052E",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["supply-point"]),
            "Brand": Tag.getTagDetailFromArray([]),
            "Merchant": Tag.getTagDetailFromArray(["meal", "apparel"]),
            "others": []
        }
    },
    {
        "id" : 6,
        "name": "북악 팔각정",
        "type": "monument",
        "description": "북악 팔각정",
        "geoPoint": {
            "latitude": 37.601575,
            "longitude": 126.980692
        },
        "like": 122,
        "Url": "https://www.facebook.com/pages/%ED%99%8D%EA%B0%80%EB%84%A4-%EC%8A%88%ED%8D%BC/197049727031560",
        "Image": "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=16151&fileTy=MEDIA&fileNo=1&thumbTy=L",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["monument", "supply-point", "maintenance"]),
            "Brand": Tag.getTagDetailFromArray(["cannondale"]),
            "Merchant": Tag.getTagDetailFromArray(["food", "apparel", "coffee", "component"]),
            "others": []
        }
    },
    {
        "id" : 7,
        "name": "남산",
        "type": "monument",
        "description": "남산",
        "geoPoint": {
            "latitude": 37.55086,
            "longitude": 126.99089
        },
        "like": 122,
        "Url": "https://www.facebook.com/pages/%ED%99%8D%EA%B0%80%EB%84%A4-%EC%8A%88%ED%8D%BC/197049727031560",
        "Image": "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=17972&fileTy=MEDIA&fileNo=1&thumbTy=L",
        "Tags": {
            "Utility": Tag.getTagDetailFromArray(["monument", "supply-point"]),
            "Brand": Tag.getTagDetailFromArray(["cannondale"]),
            "Merchant": Tag.getTagDetailFromArray(["food", "apparel", "coffee", "component"]),
            "others": []
        },
    }
]


export { response, tags, featured, type, brand, merchant }