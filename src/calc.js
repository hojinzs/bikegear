// calculating Functions
export default class Calculator{

    constructor(_props = {
        crank: Array,
        sprocket: Array,
        wheelset: Object,
    }){
        this.crank = _props.crank;
        this.sprocket = _props.sprocket;
        this.wheelset = _props.wheelset;
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

    get Round(){

        let wheel = this.wheelset.wheel;
        let tire = this.wheelset.tire;

        return this.calRound(wheel,tire);
    }

    get SpeedTable(){
        let maxCad = 120;
        let minCad = 60;

        let Table = {
            Cranks: {},
            maxSpeed: null,
            minSpeed: null,
            maxCad: maxCad,
            minCad: minCad,
        };

        for(let chainring in this.RatioTable){

            Table.Cranks[chainring] = {};

            for(let cog in this.RatioTable[chainring]){

                Table.Cranks[chainring][cog] = {
                    CadperSpeed : {},
                    ratio : this.RatioTable[chainring][cog],
                    minSpeed : null,
                    maxSpeed : null,
                };

                for (let i = minCad; i < maxCad; i++) {

                    let speed = this.calSpeed(i,this.Round,Table.Cranks[chainring][cog].ratio)
                    
                    Table.Cranks[chainring][cog].CadperSpeed[i] = speed;
                    
                    if(Table.Cranks[chainring][cog].maxSpeed < speed || Table.Cranks[chainring][cog].maxSpeed == null) Table.Cranks[chainring][cog].maxSpeed = speed;
                    if(Table.Cranks[chainring][cog].minSpeed > speed || Table.Cranks[chainring][cog].minSpeed == null) Table.Cranks[chainring][cog].minSpeed = speed;

                }

                if(Table.maxSpeed < Table.Cranks[chainring][cog].maxSpeed || Table.maxSpeed == null) Table.maxSpeed = Table.Cranks[chainring][cog].maxSpeed;
                if(Table.minSpeed > Table.Cranks[chainring][cog].minSpeed || Table.minSpeed == null) Table.minSpeed = Table.Cranks[chainring][cog].minSpeed;                
                
            }

        }
        
        return Table;
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
        let speed = ( cadence * ratio * round * 60 ) / 1000000

        return speed;
    }
}