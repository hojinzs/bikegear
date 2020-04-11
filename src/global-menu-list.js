const ShotLinks = [
    {
        name: 'old',
        url: 'https://www.journey66.cc',
        target: '_blank',
    }
]

/**
 * Global menu tree. 'route' Must be VueRoute Object
 *
 * @type array of {name: string, route: Object, use: boolean, children: array }
 */
const GlobalMenu = [
    {
        name: "Route",
        route: { name: "Route"},
        use: false,
    },
    {
        name: "Database",
        route: { name: "Database"},
        use: false,
        children: [
            {
                name: "Components",
                route: { name : "Components" },
                use: true,
            },
            {
                name: "Places",
                route: { name : "PlaceMap" },
                use: true,
            },
            {
                name: "Events",
                route: { name : "Events" },
                use: false,
            },
        ]
    },
    {
        name: "Apps",
        route: { name : "Apps" },
        use: false,
        children: [
            {
                name: "Gear Calculator",
                route: { name : "GearCalculator" },
                use: true,
            },
        ]
    }
]


export { GlobalMenu, ShotLinks }