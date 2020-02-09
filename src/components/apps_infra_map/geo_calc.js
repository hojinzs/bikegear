const geo = geo || {}

geo.Calc = class geoCalc{
    static getCenterLatLng(Array_LatLngs = [geo.LatLng]){

        let minLat,
            maxLat,
            minLng,
            maxLng,
            centerLat,
            centerLng

        Array_LatLngs.forEach((point) => {
            if(point.Lng < minLng || minLng == null) minLng = point.Lng
            if(point.Lng > maxLng || maxLng == null) maxLng = point.Lng
            if(point.Lat < minLat || minLat == null) minLat = point.Lat
            if(point.Lat > maxLat || maxLat == null) maxLat = point.Lat
        })

        centerLat = (maxLat + minLat) / 2
        centerLng = (maxLng + minLng) / 2 

        return new geo.LatLng(centerLat.toFixed(5),centerLng.toFixed(5))
    }
}

geo.LatLng = class geoLatLng{
    constructor(_Lat,_Lng){
        this.Lat = Number(_Lat)
        this.Lng = Number(_Lng)
    }
}

export default geo