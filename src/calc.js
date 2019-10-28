// calculating Functions
export default class Calculator{

    constructor(_props = {
        crank: Array,
        sprocket: Array,
        cadence: Number,
        wheel: Number,
        tire: Number,
    }){
        this.crank = _props.crank;
        this.sprocket = _props.sprocket;
        this.cadence = _props.cadence;
        this.wheel = _props.wheel;
        this.tire = _props.tire;
    }

    get RatioTable(){
        let table = {}

        for(let crg in this.crank){
            let arr = {};

            for(let cog in this.sprocket){
                arr[this.sprocket[cog]] = this.calGearRatio(this.crank[crg],this.sprocket[cog]);
            }

            table[this.crank[crg]] = arr;

        }

        return table;
    }

    calGearRatio(chainring,cog){
        let ratio = Number(chainring) / Number(cog);

        return ratio;
    }

    calRound(wheel,tire){
        let diameter = Number(wheel) + Number(tire) * 2;
        let round = diameter * Math.PI + Number(wheel)*0.04;

        return round;
    }

    calSpeed(cadence,round,ratio){
        let speed = ( cadence * ratio * round * 60 ) / 100000

        return speed;
    }
}