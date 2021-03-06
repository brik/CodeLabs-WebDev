﻿"use strict";
export default class MockOrders {
    private static orders: any[];
    private static ordersDetails: { [id: number]: any } = {};

    public static getOrders() {
        if (!this.orders || this.orders.length === 0) {
            this.orders = this.generateMockOrders();
        }

        return this.orders;
    }

    public static getOrderDetails(id: number) {
        if (!this.ordersDetails[id]) {
            this.ordersDetails[id] = this.generateMockOrderDetails();
        }

        return this.ordersDetails[id];
    }

    private static generateMockOrders() {
        var orders: any[] = [];
        var orderId: number = 1;
        var date: Date = new Date();

        for (var i = 0; i < 10000; i++) {
            var countryData = this.countries[i % this.countries.length];

            orders.push({
                id: orderId,
                date: new Date(date.setDate(date.getDate() - Math.round(Math.random() * 100))).toISOString().substr(0, 10),
                orderTotal: this.getTotalForOrder(orderId++),
                name: this.firstNames[i % this.firstNames.length] + " " + this.lastNames[i % this.lastNames.length],
                address: this.addresses[i % this.addresses.length],
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                phone: this.createRandomPhoneNumber()
            });
        }

        return orders;
    }

    private static generateMockOrderDetails() {
        var items: any[] = [];
        var itemId: number = 0;
        var currentProduct: any;
        var quantity: number;

        for (var i = 0; i < this.products.length; i++) {
            if (Math.random() >= 0.5) {
                currentProduct = this.products[i % this.products.length];
                quantity = Math.round(Math.random() * 100);
                items.push({
                    id: itemId++,
                    productId: currentProduct.id,
                    productName: currentProduct.name,
                    price: currentProduct.price,
                    quantity: quantity,
                    total: currentProduct.price * quantity
                });
            }
        }

        if (items.length === 0) {
            currentProduct = this.products[Math.round(Math.random() * (this.products.length - 1))];
            quantity = Math.round(Math.random() * 100);
            items.push({
                id: itemId++,
                productId: currentProduct.id,
                productName: currentProduct.name,
                price: currentProduct.price,
                quantity: quantity,
                total: currentProduct.price * quantity
            });
        }

        return items;
    }

    private static getTotalForOrder(orderId: number) {
        var details: any[] = this.generateMockOrderDetails();
        this.ordersDetails[orderId] = details;

        return details.reduce((previousValue: number, currentValue:any) => {
            return previousValue + currentValue.total;
        }, 0);
    }

    private static createRandomPhoneNumber() {
        "use strict";

        var result = "+";
        for (var i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += " ";
            }
        }
        return result;
    }

    private static products = [
        { id: 1, name: "Hammer", price: Math.round(Math.random() * 100) },
        { id: 2, name: "Drill", price: Math.round(Math.random() * 100) },
        { id: 3, name: "Ladder", price: Math.round(Math.random() * 100) },
        { id: 4, name: "Nail", price: Math.round(Math.random() * 100) },
        { id: 5, name: "Saw", price: Math.round(Math.random() * 100) },
        { id: 6, name: "Scissor", price: Math.round(Math.random() * 100) },
        { id: 7, name: "Brush", price: Math.round(Math.random() * 100) },
        { id: 8, name: "Wrench", price: Math.round(Math.random() * 100) },
    ];

    private static firstNames = ["Sophie", "Isabelle", "Emily", "Olivia", "Lily", "Chloe", "Isabella",
        "Amelia", "Jessica", "Sophia", "Ava", "Charlotte", "Mia", "Lucy", "Grace", "Ruby",
        "Ella", "Evie", "Freya", "Isla", "Poppy", "Daisy", "Layla"];
    private static lastNames = ["Beckham", "Black", "Braxton", "Brennan", "Brock", "Bryson", "Cadwell",
        "Cage", "Carson", "Chandler", "Cohen", "Cole", "Corbin", "Dallas", "Dalton", "Dane",
        "Donovan", "Easton", "Fisher", "Fletcher", "Grady", "Greyson", "Griffin", "Gunner",
        "Hayden", "Hudson", "Hunter", "Jacoby", "Jagger", "Jaxon", "Jett", "Kade", "Kane",
        "Keating", "Keegan", "Kingston", "Kobe"];

    private static countries = [
        { country: "Ireland", continent: "Europe", language: "English" },
        { country: "Spain", continent: "Europe", language: "Spanish" },
        { country: "United Kingdom", continent: "Europe", language: "English" },
        { country: "France", continent: "Europe", language: "French" },
        { country: "Germany", continent: "Europe", language: "(other)" },
        { country: "Sweden", continent: "Europe", language: "(other)" },
        { country: "Norway", continent: "Europe", language: "(other)" },
        { country: "Italy", continent: "Europe", language: "(other)" },
        { country: "Greece", continent: "Europe", language: "(other)" },
        { country: "Iceland", continent: "Europe", language: "(other)" },
        { country: "Portugal", continent: "Europe", language: "Portuguese" },
        { country: "Malta", continent: "Europe", language: "(other)" },
        { country: "Brazil", continent: "South America", language: "Portuguese" },
        { country: "Argentina", continent: "South America", language: "Spanish" },
        { country: "Colombia", continent: "South America", language: "Spanish" },
        { country: "Peru", continent: "South America", language: "Spanish" },
        { country: "Venezuela", continent: "South America", language: "Spanish" },
        { country: "Uruguay", continent: "South America", language: "Spanish" }
    ];

    private static addresses = [
        "1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US",
        "3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA",
        "3235 High Forest, Glen Campbell, MS, 39035-6845, US",
        "2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US",
        "2722 Hazy Turnabout, Burnt Cabins, NY, 14120-5642, US",
        "6686 Lazy Ledge, Two Rock, CA, 92639-3020, US",
        "2000 Dewy Limits, Wacahoota, NF, A4L-2V9, CA",
        "7710 Noble Pond Avenue, Bolivia, RI, 02931-1842, US",
        "3452 Sunny Vale, Pyro, ON, M8V-4Z0, CA",
        "4402 Dusty Cove, Many Farms, UT, 84853-8223, US",
        "5198 Silent Parade, Round Bottom, MD, 21542-9798, US",
        "8550 Shady Moor, Kitty Fork, CO, 80941-6207, US",
        "2131 Old Dell, Merry Midnight, AK, 99906-8842, US",
        "7390 Harvest Crest, Mosquito Crossing, RI, 02957-6116, US",
        "874 Little Point, Hot Coffee, BC, V3U-2P6, CA",
        "8834 Stony Pioneer Heights, Newlove, OR, 97419-8670, US",
        "9829 Grand Beach, Flint, UT, 84965-9900, US",
        "3799 Cozy Blossom Ramp, Ptarmigan, MS, 38715-0313, US",
        "3254 Silver Island Loop, Maunaloa, DE, 19869-3169, US",
        "1081 Middle Wood, Taylors Gut Landing, OR, 97266-2873, US",
        "1137 Umber Trail, Shacktown, NW, X3U-5Y8, CA",
        "9914 Hidden Bank, Wyoming, MO, 64635-9665, US",
        "7080 Misty Nectar Townline, Coward, AB, T9U-3N4, CA",
        "1184 Wishing Grounds, Vibank, NW, X7D-0V9, CA",
        "126 Easy Pointe, Grandview Beach, KY, 40928-9539, US",
        "6683 Colonial Street, Swan River, BC, V1A-9I8, CA",
        "960 Gentle Oak Lane, Shakopee, ND, 58618-6277, US",
        "6918 Cotton Pine Corner, Kenaston, IA, 52165-3975, US",
        "2368 Burning Woods, Ernfold, NY, 11879-9186, US",
        "5646 Quiet Shadow Chase, Tiger Tail, IA, 52283-5537, US",
        "5466 Foggy Mountain Dale, Sweet Home, MT, 59738-0251, US",
        "5313 Clear Willow Route, Amazon, BC, V0S-2S6, CA",
        "7000 Pleasant Autoroute, Spaceport City, UT, 84749-2448, US",
        "8359 Quaking Anchor Road, Gross, BC, V9O-0H5, CA",
        "5143 Amber Deer Hollow, New Deal, ND, 58446-0853, US",
        "6230 Jagged Bear Key, Young, AR, 72337-3811, US",
        "7207 Heather Vista, Devon, WY, 82520-1771, US",
        "9416 Red Rise Place, Spraytown, OK, 73809-4766, US",
        "3770 Golden Horse Diversion, Yelland, IL, 60471-1487, US",
        "4819 Honey Treasure Park, Alaska, NB, E1U-3I0, CA",
        "6187 Round Front, Land O Lakes, AK, 99873-6403, US",
        "9218 Crystal Highway, Pickelville, MT, 59847-9299, US",
        "6737 Bright Quay, Lazy Mountain, KY, 42390-4772, US",
        "237 Merry Campus, Twentysix, SC, 29330-4909, US",
        "446 Fallen Gate Rise, Petrolia, SC, 29959-9527, US",
        "2347 Indian Boulevard, Frisbee, VA, 23797-6458, US",
        "365 Emerald Grove Line, Level, NC, 28381-1514, US",
        "1207 Iron Extension, Klickitat, SC, 29197-8571, US",
        "6770 Cinder Glen, Caronport, OH, 45053-5002, US",
        "7619 Tawny Carrefour, Senlac, NV, 89529-9876, US"];
}
