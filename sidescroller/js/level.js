//global game variables
let body = []; //non static bodies
let map = []; //all static bodies
let cons = []; //all constaints between a point and a body
let consBB = []; //all constaints between two bodies
//main object for spawning levels
const level = {
    levels: ["towers", "skyscrapers", "rooftops", "warehouse"], // name of the level methods that the player runs through
    onLevel: undefined,
    start: function() {
        //game.levelsCleared = 7;  //for testing to simulate all possible mobs spawns
        spawn.setSpawnList(); //picks a couple mobs types for a themed random mob spawns
        this[this.levels[this.onLevel]](); //spawn the level player is on, this cycles in a loop
        //this.boss();
        //this.warehouse();
        //this.highrise();
        //this.towers();
        //this.skyscrapers();
        //this.rooftops();

        this.addToWorld(); //add map to world
        const text = "level " + (game.levelsCleared + 1) + " " + level.levels[level.onLevel];
        document.title = text;
        //game.makeTextLog(text,120)
    },
    //******************************************************************************************************************
    //******************************************************************************************************************
    //empty map for testing mobs
    boss: function() {
        mech.setPosToSpawn(-75, -60); //normal spawn
        level.enter.x = mech.spawnPos.x - 50;
        level.enter.y = mech.spawnPos.y + 20;

        level.exit.x = 3500;
        level.exit.y = -870;
        this.addZone(level.exit.x, level.exit.y, 100, 30, "nextLevel");
        // this.addZone(250, -1000, 500, 1500, "laser");
        document.body.style.backgroundColor = "#f6f6f6";
        spawn.debris(0, -900, 4500, 10); //20 debris per level

        // this.addQueryRegion(550, -25, 100, 50, "bounce", { Vx: 0, Vy: -25 });
        // level.fillBG.push({ x: 550, y: -25, width: 100, height: 50, color: "#ff0" });

        spawn.mapRect(3500, -860, 100, 50); //ground bump wall
        spawn.mapRect(-200, 0, 1200, 300); //ground
        spawn.mapVertex(1250, 0, "0 0 0 300 -500 600 -500 300");
        spawn.mapRect(1500, -300, 2000, 300); //upper ground
        spawn.mapVertex(3750, 0, "0 600 0 300 -500 0 -500 300");
        spawn.mapRect(4000, 0, 1000, 300); //right lower ground
        spawn.mapRect(2200, -600, 600, 50); //center platform
        spawn.mapRect(1300, -850, 700, 50); //center platform
        spawn.mapRect(3000, -850, 700, 50); //center platform
        spawn.spawnBuilding(-200, -250, 275, 240, false, true, "left"); //far left; player spawns in side
        spawn.boost(350, -25,7,-27);
        powerUps.spawn(450, -125, "gun", false);
        for (let i = 0; i < 5; i++) {
            //powerUps.spawn(2500+i*15, -1000, "gun", false);
            powerUps.spawn(2500 + i * 20, -1100, "ammo", false);
        }
        // spawn.springer(1225,-1000)
        //spawn.puller(1625, -1000);
		spawn.blackHoler(2000, -1000);
    },
    warehouse: function() {
        // document.body.style.backgroundColor = (Math.random() < 0.5) ? "#aaa" : "#e3e3f0"
        document.body.style.backgroundColor = "#bbb";
        mech.setPosToSpawn(25, -60); //normal spawn
        //mech.setPosToSpawn(-2000, -1700); // left ledge spawn
        level.enter.x = mech.spawnPos.x - 50;
        level.enter.y = mech.spawnPos.y + 20;
        level.exit.x = 425;
        level.exit.y = -35;
        this.addZone(level.exit.x, level.exit.y, 100, 30, "nextLevel");
        spawn.debris(-2250, 1330, 3000, 7); //20 debris per level
        spawn.debris(-3000, -800, 3280, 7); //20 debris per level
        spawn.debris(-1400, 410, 2300, 6); //20 debris per level
        if (!game.levelsCleared) powerUps.spawn(-1250, 560, "gun", false);
        //foreground
        // level.fill.push({ x: -3025, y: 50, width: 4125, height: 1350, color: "rgba(0,0,0,0.05)"});
        // level.fill.push({ x: -1800, y: -500, width: 1975, height: 550, color: "rgba(0,0,0,0.05)"});
        // level.fill.push({ x: -2600, y: -150, width: 700, height: 200, color: "rgba(0,0,0,0.05)"});
        //background
        const BGColor = "#f3f3ea";
        level.fillBG.push({ x: -3025, y: 50, width: 4125, height: 1350, color: BGColor });
        level.fillBG.push({ x: -1800, y: -500, width: 1975, height: 555, color: BGColor });
        level.fillBG.push({ x: -2600, y: -150, width: 700, height: 205, color: BGColor });
        level.fillBG.push({ x: 300, y: -250, width: 350, height: 250, color: "#cff" });
        spawn.mapRect(-1500, 0, 2750, 100);
        spawn.mapRect(175, -600, 125, 700);
        spawn.mapRect(-1900, -600, 2200, 100);
        spawn.mapRect(-1900, -600, 100, 1300);
        //house
        spawn.mapRect(-175, -550, 50, 400);
        spawn.mapRect(-175, -15, 350, 50);
        spawn.mapRect(-25, -25, 100, 50);
        // spawn.mapRect(-175, -275, 350, 25);
        // spawn.mapRect(-175, -250, 25, 75);
        // spawn.bodyRect(-170, -175, 14, 160, 1, spawn.propsFriction); //door to starting room
        //exit house
        spawn.mapRect(300, -15, 350, 50);
        spawn.mapRect(300, -275, 350, 25);
        spawn.mapRect(625, -250, 25, 75);
        spawn.mapRect(425, -25, 100, 25);
        // spawn.mapRect(-1900, 600, 2700, 100);
        spawn.mapRect(1100, 0, 150, 1500);
        spawn.mapRect(-2850, 1400, 4100, 100);
        spawn.mapRect(-2375, 875, 1775, 100);
        spawn.mapRect(-1450, 950, 75, 346);
        spawn.mapRect(-1450, 662, 75, 111);
        spawn.mapRect(-2950, 1250, 175, 250);
        spawn.mapRect(-3050, 1100, 150, 400);
        spawn.mapRect(-3150, 50, 125, 1450);
        spawn.mapRect(-2375, 600, 3175, 100);
        spawn.mapRect(-2125, 300, 250, 325);
        spawn.mapRect(-1950, -400, 100, 25);
        spawn.mapRect(-3150, 50, 775, 100);
        spawn.mapRect(-2600, -200, 775, 50);
        spawn.bodyRect(-1350, -200, 200, 200, 1, spawn.propsSlide); //weight
        spawn.bodyRect(-1800, -180, 300, 100, 1, spawn.propsHoist); //hoist
        cons[cons.length] = Constraint.create({
            pointA: {
                x: -1650,
                y: -500
            },
            bodyB: body[body.length - 1],
            stiffness: 0.0015
        });

        spawn.bodyRect(400, 400, 200, 200, 1, spawn.propsSlide); //weight
        spawn.bodyRect(800, 420, 300, 100, 1, spawn.propsHoist); //hoist
        cons[cons.length] = Constraint.create({
            pointA: {
                x: 950,
                y: 100
            },
            bodyB: body[body.length - 1],
            stiffness: 0.0015
        });

        spawn.bodyRect(-2775, 550, 190, 150, 1, spawn.propsSlide); //weight
        spawn.bodyRect(-2575, 550, 200, 150, 1, spawn.propsSlide); //weight
        spawn.bodyRect(-2775, 700, 400, 100, 1, spawn.propsHoist); //hoist
        cons[cons.length] = Constraint.create({
            pointA: {
                x: -2575,
                y: 150
            },
            bodyB: body[body.length - 1],
            stiffness: 0.0015
        });
        //blocks
        spawn.bodyRect(-155, -150, 10, 140, 1, spawn.propsFriction);
        spawn.bodyRect(-750, 400, 150, 150, 0.5);
        spawn.bodyRect(250, 1175, 250, 225, 0.95); //block to get to top path on bottom level
        spawn.bodyRect(-1450, 737, 75, 103, 0.5); //blocking path
        spawn.bodyRect(-2525, -50, 145, 100, 0.5);
        spawn.bodyRect(-2325, -300, 150, 100, 0.5);
        spawn.bodyRect(-1275, -750, 200, 150, 0.5); //roof block
        spawn.bodyRect(-525, -700, 125, 100, 0.5); //roof block

        //mobs
        spawn.randomMob(-1425, -100, 0.3);
        spawn.randomMob(-750, -150, 0.3);
        spawn.randomSmallMob(-1125, 550);
        spawn.randomBoss(-125, 250, -0.1);
        spawn.randomMob(475, 300, 0.3);
        spawn.randomSmallMob(825, 300);
        spawn.randomMob(650, 1300, 0.1);
        spawn.randomMob(375, 1100, 0.1);
        spawn.randomSmallMob(-900, 825);
        spawn.randomSmallMob(-2325, 800);
        spawn.randomBoss(-825, 1000, 0.3);
        spawn.randomBoss(-1300, -1100, 0.1);
        spawn.randomMob(-2025, 175, 0.3);
        spawn.randomMob(-2325, 450, 0.3);
        spawn.randomMob(-2700, 300, 0);
        spawn.randomMob(-2500, 300, 0);
        spawn.randomSmallMob(-2950, -50);
        spawn.randomMob(-2075, -425, 0.2);
        spawn.randomMob(-2925, 675, 0.3);
        spawn.randomMob(-1550, -725, 0.2);
        spawn.randomMob(-800, -750, 0.2);
        spawn.randomMob(-75, -700, 0.2);
        spawn.randomMob(400, -350, 0.2);
        spawn.randomMob(900, -200, -0.1);
        //spawn.randomBoss(600, -1575, 0);
        //spawn.randomMob(1120, -1200, 0.3);
        //spawn.randomSmallMob(2200, -1775); //
    },
    highrise: function() {
        document.body.style.backgroundColor = "#fff7f3";
        mech.setPosToSpawn(0, -50); //normal spawn
        //mech.setPosToSpawn(-2000, -1700); // left ledge spawn
        level.enter.x = mech.spawnPos.x - 50;
        level.enter.y = mech.spawnPos.y + 20;
        level.exit.x = 1700;
        level.exit.y = -2440;
        this.addZone(level.exit.x, level.exit.y, 100, 30, "nextLevel");

		level.addQueryRegion(-250,-3000, 300, 2700, "antiGrav");
		level.fill.push({ x: -250, y: -3000, width: 300, height: 2700, color: "rgba(255,0,255,0.4)" });
        //spawn.debris(1650, -1800, 3800, 20); //20 debris per level
        // if (!game.levelsCleared) powerUps.spawn(2450, -1675, "gun", false);
        //foreground
        level.fill.push({ x: -175, y: -275, width: 325, height: 275, color: "rgba(0,0,0,0.2)" });
        //background
        level.fillBG.push({ x: -950, y: -2300, width: 700, height: 2300, color: "#ccc" });
        level.fillBG.push({ x: 150, y: -2400, width: 725, height: 1700, color: "#ccc" });
        level.fillBG.push({ x: 1150, y: -2075, width: 750, height: 2075, color: "#ccc" });
        level.fillBG.push({ x: -2500, y: -1150, width: 1150, height: 650, color: "#ccc" });
        level.fillBG.push({ x: 1575, y: -2650, width: 325, height: 250, color: "#eff" });

        spawn.mapRect(-1500, 0, 3500, 100); //ground
        //house
        spawn.mapRect(-175, -15, 350, 50);
        spawn.mapRect(-175, -275, 350, 25);
        spawn.mapRect(-175, -250, 25, 75);
        spawn.bodyRect(-170, -175, 14, 160, 1, spawn.propsFriction); //door to starting room

        spawn.mapRect(150, -700, 1000, 800);
        spawn.mapRect(-2500, -500, 1300, 600);
        spawn.mapRect(1150, -1525, 750, 575);
        spawn.boost(-850, -25, 15, -25);
        spawn.mapRect(-2500, -1600, 1150, 450);

        spawn.mapRect(1900, -275, 575, 375);
        spawn.mapRect(2475, -575, 875, 675);
        spawn.boost(3000, -600, -14, -27);
        spawn.mapRect(150, -1525, 725, 300);
        spawn.mapRect(-950, -1600, 700, 300);
        spawn.boost(-2300, -1625, 11, -34);

        spawn.mapRect(-950, -2600, 700, 300);
        spawn.mapRect(150, -2700, 725, 300);
        spawn.mapRect(1150, -2400, 750, 325);

        spawn.mapRect(1575, -2675, 325, 25);
        spawn.mapRect(1875, -2675, 25, 300);
        spawn.mapRect(1575, -2675, 25, 100);
        spawn.mapRect(1575, -2410, 325, 50);
        spawn.mapRect(1700, -2420, 100, 50); //exit platform
    },
    //******************************************************************************************************************
    //******************************************************************************************************************
    rooftops: function() {
        document.body.style.backgroundColor = "#eee4e4";
        // this.addZone(-700, -50, 4100, 100, "death");
        mech.setPosToSpawn(-450, -2050); //normal spawn
        //mech.setPosToSpawn(4600, -900); //normal spawn
        //mech.setPosToSpawn(4400, -400); //normal spawn
        level.enter.x = mech.spawnPos.x - 50;
        level.enter.y = mech.spawnPos.y + 20;
        level.exit.x = 3600;
        level.exit.y = -300;
        this.addZone(level.exit.x, level.exit.y, 100, 30, "nextLevel");
        spawn.debris(1650, -1800, 3800, 20); //20 debris per level
        if (!game.levelsCleared) powerUps.spawn(2450, -1675, "gun", false);

        //foreground
        level.fill.push({ x: -650, y: -2300, width: 450, height: 300, color: "rgba(0,0,0,0.15)" });
        level.fill.push({ x: 3450, y: -1250, width: 1100, height: 1250, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 4550, y: -725, width: 900, height: 725, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 3400, y: 100, width: 2150, height: 900, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: -700, y: -1900, width: 2100, height: 2900, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 1950, y: -1550, width: 1025, height: 550, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 1600, y: -900, width: 1600, height: 1900, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 3450, y: -1550, width: 350, height: 300, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 700, y: -2225, width: 700, height: 225, color: "rgba(0,0,0,0.1)" });

        //spawn.mapRect(-700, 0, 6250, 100); //ground
        spawn.mapRect(3400, 0, 2150, 100); //ground
        spawn.mapRect(-700, -2000, 2100, 100); //Top left ledge
        spawn.bodyRect(1350, -2125, 50, 125, 0.8); //
        spawn.bodyRect(1350, -2225, 50, 100, 0.8); //
        spawn.mapRect(-700, -2350, 50, 400); //far left starting left wall
        spawn.mapRect(-700, -2010, 500, 50); //far left starting ground
        spawn.mapRect(-700, -2350, 500, 50); //far left starting ceiling
        spawn.mapRect(-250, -2350, 50, 200); //far left starting right part of wall
        spawn.bodyRect(-230, -2130, 14, 140, 1, spawn.propsFriction); //door to starting room
        spawn.bodyRect(200, -2150, 200, 220, 0.8); //
        spawn.mapRect(700, -2275, 700, 50); //
        spawn.bodyRect(1050, -2350, 50, 75, 0.8); //
        spawn.boost(1800, -1030);
        spawn.bodyRect(1625, -1100, 100, 75); //
        spawn.bodyRect(1350, -1025, 400, 25); //
        spawn.mapRect(-700, -1000, 2100, 100); //lower left ledge
        spawn.bodyRect(350, -1100, 200, 100, 0.8); //
        spawn.bodyRect(370, -1200, 100, 100, 0.8); //
        spawn.bodyRect(360, -1300, 100, 100, 0.8); //
        spawn.bodyRect(950, -1050, 300, 50, 0.8); //
        spawn.bodyRect(-600, -1250, 400, 250, 0.8); //
        spawn.mapRect(1600, -1000, 1600, 100); //middle ledge
        spawn.bodyRect(2700, -1125, 125, 125, 0.8); //
        spawn.bodyRect(2710, -1250, 125, 125, 0.8); //
        spawn.bodyRect(2705, -1350, 75, 100, 0.8); //
        spawn.mapRect(3450, -1600, 350, 50); //
        spawn.mapRect(1950, -1600, 1025, 50); //
        spawn.bodyRect(3100, -1015, 375, 15, 0.8); //
        spawn.bodyRect(3500, -850, 75, 125, 0.8); //
        spawn.bodyRect(4425, -1775, 75, 525, 0.1); //
        spawn.mapRect(3400, -1000, 100, 1100); //left building wall
        spawn.mapRect(5450, -775, 100, 875); //right building wall
        spawn.bodyRect(4850, -750, 300, 25, 0.8); //
        spawn.bodyRect(3925, -1400, 100, 150, 0.8); //
        spawn.mapRect(3450, -1250, 1100, 50); //
        spawn.mapRect(3450, -1225, 50, 75); //
        spawn.mapRect(4500, -1225, 50, 350); //
        spawn.mapRect(3450, -725, 1450, 50); //
        spawn.mapRect(5100, -725, 400, 50); //
        spawn.mapRect(4500, -700, 50, 600); //
        spawn.bodyRect(4500, -100, 50, 100, 0.8); //
        spawn.boost(4950, -30, 0, -24);

        spawn.spawnStairs(3800, 0, 3, 150, 206); //stairs top exit
        spawn.mapRect(3500, -275, 350, 275); //exit platform
        spawn.mapRect(3600, -285, 100, 50); //ground bump wall

        spawn.randomMob(900, -2125, 0.3); //
        spawn.randomSmallMob(-350, -2400); //
        spawn.randomMob(1225, -2400, 0.3); //

        spawn.randomBoss(600, -1575, 0);
        spawn.randomMob(1120, -1200, 0.3);
        spawn.randomSmallMob(2200, -1775); //
        spawn.randomBoss(2225, -1325, 0.4); //
        spawn.randomBoss(4900, -1200, 0); //
        spawn.randomMob(3000, -1150, 0.2); //
        spawn.randomMob(3200, -1150, 0.3); //
        spawn.randomMob(3300, -1750, 0.3); //
        spawn.randomMob(4250, -1350, 0.3); //
        spawn.randomMob(3650, -1350, 0.3); //
        spawn.randomMob(3600, -1800, 0.1); //
        spawn.randomMob(2550, -1350, 0.3); //
        spawn.randomSmallMob(4000, -825); //
        spawn.randomSmallMob(4100, -100);
        spawn.randomSmallMob(4600, -100);
        spawn.randomMob(5200, -100, 0.3);
        spawn.randomMob(5275, -900, 0.2);
        spawn.randomMob(3765, -450, 0.3); //
        //spawn.randomBoss(4850, -1250,0.7);
    },
    //******************************************************************************************************************
    //******************************************************************************************************************
    towers: function() {
        mech.setPosToSpawn(1375, -1550); //normal spawn
        level.enter.x = mech.spawnPos.x - 50;
        level.enter.y = mech.spawnPos.y + 20;
        level.exit.x = 3250;
        level.exit.y = -530;
        this.addZone(level.exit.x, level.exit.y, 100, 30, "nextLevel");

        document.body.style.backgroundColor = "#e0e5e0";
        //foreground
        level.fill.push({ x: -550, y: -1700, width: 1300, height: 1700, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 750, y: -1450, width: 650, height: 1450, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 750, y: -1950, width: 800, height: 450, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 3000, y: -1000, width: 650, height: 1000, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 3650, y: -1300, width: 1300, height: 1300, color: "rgba(0,0,0,0.1)" });
        //background
        level.fillBG.push({ x: 2495, y: -500, width: 10, height: 525, color: "#ccc" });

        //mech.setPosToSpawn(600, -1200); //normal spawn
        //mech.setPosToSpawn(525, -150); //ground first building
        //mech.setPosToSpawn(3150, -700); //near exit spawn
        spawn.debris(-300, -200, 4800, 10); //ground debris //20 debris per level
        spawn.debris(-300, -650, 4800, 10); //1st floor debris //20 debris per level
        if (!game.levelsCleared) powerUps.spawn(525, -700, "gun", false);

        spawn.mapRect(-600, 25, 5600, 300); //ground
        spawn.mapRect(-600, 0, 2000, 50); //ground
        spawn.mapRect(-600, -1700, 50, 2000 - 100); //left wall
        spawn.bodyRect(-295, -1540, 40, 40); //center block under wall
        spawn.bodyRect(-298, -1580, 40, 40); //center block under wall
        spawn.mapRect(1550, -2000, 50, 550); //right wall
        spawn.mapRect(1350, -2000 + 505, 50, 1295); //right wall
        spawn.mapRect(-600, -2000 + 250, 2000 - 700, 50); //roof left
        spawn.mapRect(-600 + 1300, -2000, 50, 300); //right roof wall
        spawn.mapRect(-600 + 1300, -2000, 900, 50); //center wall
        map[map.length] = Bodies.polygon(425, -1700, 0, 15); //circle above door
        spawn.bodyRect(420, -1675, 15, 170, 1, spawn.propsDoor); // door
        //makes door swing
        consBB[consBB.length] = Constraint.create({
            bodyA: body[body.length - 1],
            pointA: {
                x: 0,
                y: -90
            },
            bodyB: map[map.length - 1],
            stiffness: 1
        });
        spawn.mapRect(-600 + 300, -2000 * 0.75, 1900, 50); //3rd floor
        spawn.mapRect(-600 + 2000 * 0.7, -2000 * 0.74, 50, 375); //center wall
        spawn.bodyRect(-600 + 2000 * 0.7, -2000 * 0.5 - 106, 50, 106); //center block under wall
        spawn.mapRect(-600, -1000, 1100, 50); //2nd floor
        spawn.mapRect(600, -1000, 500, 50); //2nd floor
        spawn.spawnStairs(-600, -1000, 4, 250, 350); //stairs 2nd
        spawn.mapRect(350, -600, 350, 150); //center table
        spawn.mapRect(-600 + 300, -2000 * 0.25, 2000 - 300, 50); //1st floor
        spawn.spawnStairs(-600 + 2000 - 50, -500, 4, 250, 350, true); //stairs 1st
        spawn.spawnStairs(-600, 0, 4, 250, 350); //stairs ground
        spawn.bodyRect(700, -200, 100, 100); //center block under wall
        spawn.bodyRect(700, -300, 100, 100); //center block under wall
        spawn.bodyRect(700, -400, 100, 100); //center block under wall
        spawn.mapRect(1390, 13, 30, 20); //step left
        spawn.mapRect(2980, 13, 30, 20); //step right
        spawn.mapRect(3000, 0, 2000, 50); //ground
        spawn.bodyRect(4250, -700, 50, 100);
        spawn.bodyRect(3000, -200, 50, 200); //door
        spawn.mapRect(3000, -1000, 50, 800); //left wall
        spawn.mapRect(3000 + 2000 - 50, -1300, 50, 1100); //right wall
        spawn.mapRect(4150, -600, 350, 150); //table
        spawn.mapRect(3650, -1300, 50, 650); //exit wall
        spawn.mapRect(3650, -1300, 1350, 50); //exit wall
        spawn.mapRect(3000 + 250, -510, 100, 50); //ground bump wall
        spawn.mapRect(3000, -2000 * 0.5, 700, 50); //exit roof
        spawn.mapRect(3000, -2000 * 0.25, 2000 - 300, 50); //1st floor
        spawn.spawnStairs(3000 + 2000 - 50, 0, 4, 250, 350, true); //stairs ground
        //teatherball
        spawn[spawn.pickList[0]](2850, -80, 40 + game.levelsCleared * 8);
        cons[cons.length] = Constraint.create({
            pointA: {
                x: 2500,
                y: -500
            },
            bodyB: mob[mob.length - 1],
            stiffness: 0.0004
        });
        spawn.randomSmallMob(0, -1600);
        spawn.randomMob(200, -1200, 1);
        spawn.randomMob(950, -1150, 0.25);
        spawn.randomSmallMob(1315, -880, 1);
        spawn.randomSmallMob(800, -600);
        spawn.randomMob(-250, -700, 0.4);
        spawn.randomMob(-100, -225, 0.1);
        spawn.randomMob(450, -225, 0.15);
        spawn.randomMob(1150, -225, 0.15);
        spawn.randomMob(2000, -225, 0.15);
        spawn.randomMob(3250, -225, 0.15);
        spawn.randomMob(4500, -225, 0.15);
        spawn.randomBoss(1800, -800, 0.4);
        spawn.randomMob(4100, -225, 0.4);
        spawn.randomSmallMob(4575, -560, 1);
        spawn.randomBoss(4150, -1000, 0.6);
        spawn.randomSmallMob(3550, -550);
    },
    //******************************************************************************************************************
    //******************************************************************************************************************
    skyscrapers: function() {
        mech.setPosToSpawn(-50, -50); //normal spawn
        //mech.setPosToSpawn(1550, -1200); //spawn left high
        //mech.setPosToSpawn(1800, -2000); //spawn near exit
        level.enter.x = mech.spawnPos.x - 50;
        level.enter.y = mech.spawnPos.y + 20;
        level.exit.x = 1500;
        level.exit.y = -1875;
        this.addZone(level.exit.x, level.exit.y, 100, 30, "nextLevel");

        if (!game.levelsCleared) powerUps.spawn(1475, -1175, "gun", false);
        spawn.debris(700, -2200, 3800, 20); //20 debris per level
        document.body.style.backgroundColor = "#dcdcde";

        //foreground
        level.fill.push({ x: 2500, y: -1100, width: 450, height: 250, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 2400, y: -550, width: 600, height: 150, color: "rgba(0,0,0,0.1)" });
        level.fill.push({ x: 2550, y: -1650, width: 250, height: 200, color: "rgba(0,0,0,0.1)" });
        //level.fill.push({ x: 1350, y: -2100, width: 400, height: 250, color: "rgba(0,255,255,0.1)" });
        level.fill.push({ x: 700, y: -110, width: 400, height: 110, color: "rgba(0,0,0,0.2)" });
        level.fill.push({ x: 3600, y: -110, width: 400, height: 110, color: "rgba(0,0,0,0.2)" });
        level.fill.push({ x: -250, y: -300, width: 450, height: 300, color: "rgba(0,0,0,0.15)" });

        //background
        level.fillBG.push({ x: 1300, y: -1800, width: 750, height: 1800, color: "#d4d4d7" });
        level.fillBG.push({ x: 3350, y: -1325, width: 50, height: 1325, color: "#d4d4d7" });
        level.fillBG.push({ x: 1350, y: -2100, width: 400, height: 250, color: "#d4f4f4" });

        spawn.mapRect(-300, 0, 5000, 300); //***********ground
        spawn.mapRect(-300, -350, 50, 400); //far left starting left wall
        spawn.mapRect(-300, -10, 500, 50); //far left starting ground
        spawn.mapRect(-300, -350, 500, 50); //far left starting ceiling
        spawn.mapRect(150, -350, 50, 200); //far left starting right part of wall
        spawn.bodyRect(170, -130, 14, 140, 1, spawn.propsFriction); //door to starting room
        spawn.boost(475, -30, 3, -30);
        spawn.mapRect(700, -1100, 400, 990); //far left building
        spawn.mapRect(1600, -400, 1500, 500); //long center building
        spawn.mapRect(1345, -1100, 250, 25); //left platform
        spawn.mapRect(1755, -1100, 250, 25); //right platform
        spawn.mapRect(1300, -1850, 750, 50); //left higher platform
        spawn.mapRect(1300, -2150, 50, 350); //left higher platform left edge wall
        spawn.mapRect(1300, -2150, 450, 50); //left higher platform roof
        spawn.mapRect(1500, -1860, 100, 50); //ground bump wall
        spawn.mapRect(2400, -850, 600, 300); //center floating large square
        //spawn.bodyRect(2500, -1100, 25, 250); //wall before chasers
        spawn.mapRect(2500, -1450, 450, 350); //higher center floating large square
        spawn.mapRect(2500, -1700, 50, 300); //left wall on higher center floating large square
        spawn.mapRect(2500, -1700, 300, 50); //roof on higher center floating large square
        spawn.mapRect(3300, -850, 150, 25); //ledge by far right building
        spawn.mapRect(3300, -1350, 150, 25); //higher ledge by far right building
        spawn.mapRect(3600, -1100, 400, 990); //far right building
        spawn.boost(4150, -30, -3, -30);
        spawn.randomSmallMob(1300, -70);
        spawn.randomMob(-100, -450, 0.4);
        spawn.randomMob(2650, -975, 0.4);
        spawn.randomMob(2650, -1550, 0.2);
        spawn.randomMob(1700, -1300, 0.2);
        spawn.randomMob(2200, -600, 0.2);
        spawn.randomBoss(3700, -1500, 0.4);
        spawn.randomBoss(1700, -900, 0.4);
        spawn.randomSmallMob(3200, -100);
        spawn.randomSmallMob(4450, -100);
        spawn.randomMob(1850, -1950, 0.25);
        spawn.randomMob(2610, -1880, 0.25);
        spawn.randomMob(3350, -950, 0.25);
        spawn.randomMob(4150, -200, 0.15);
        spawn.randomMob(1690, -2250, 0.25);
        spawn.randomSmallMob(2700, -475);
        spawn.randomMob(900, -1300, 0.25);

        spawn.bodyRect(3200, -1375, 300, 25, 0.9);
        spawn.bodyRect(1825, -1875, 400, 25, 0.9);
        spawn.bodyRect(1800, -575, 250, 150, 0.8);
        spawn.bodyRect(2557, -450, 35, 55, 0.7);
        spawn.bodyRect(2957, -450, 30, 15, 0.7);
        spawn.bodyRect(2900, -450, 60, 45, 0.7);
        spawn.bodyRect(1915, -1200, 60, 100, 0.8);
        spawn.bodyRect(1925, -1300, 50, 100, 0.8);
        if (Math.random() < 0.9) {
            spawn.bodyRect(2300, -1720, 400, 20);
            spawn.bodyRect(2590, -1780, 80, 80);
        }
        spawn.bodyRect(2925, -1100, 25, 250, 0.8);
        spawn.bodyRect(3325, -1550, 50, 200, 0.3);
        if (Math.random() < 0.8) {
            spawn.bodyRect(1400, -75, 200, 75); //block to get up ledge from ground
            spawn.bodyRect(1525, -125, 50, 50); //block to get up ledge from ground
        }
        spawn.bodyRect(1025, -1110, 400, 10, 0.9); //block on far left building
        spawn.bodyRect(1550, -1110, 250, 10, 0.9); //block on far left building
    },
    //******************************************************************************************************************
    //******************************************************************************************************************
    buildings: function() {
        document.body.style.backgroundColor = "#f9faff";
        playSound("ambient_crickets"); //play ambient audio for level
        mech.setPosToSpawn(0, -100);
        //mech.setPosToSpawn(3900,-400); //spawn near exit for testing

        spawn.mapRect(-1000, 0, 5100, 500); //***********ground
        spawn.spawnBuilding(-300, -250, 600, 240, true, true); //first floor  player spawns in side
        spawn.spawnBuilding(-200, -500, 400, 240, true, true); //second floor
        spawn.mapVertex(-844, -50, "0 0 0 -150 200 -150 400 0");
        spawn.bodyRect(50, -600, 50, 100); //block on top of buildings
        spawn.shooter(650, -600, 50); //near entrance high up
        spawn.spawnBuilding(700, -400, 1400, 390, true, true); //long building
        body[body.length] = Bodies.circle(1400, -240, 20); //hanging ball
        spawn.constraintPB(1400, -375, body.length - 1, 0.9, spawn.propsNoRotation); //hanging ball
        spawn.mapRect(700, -185, 85, 25); //ledge for sneak attackers inside building
        spawn.mapRect(1250, -80, 300, 100); //table inside long building
        spawn.sneakAttacker(765, -230, 30); //inside long center building
        spawn.mapRect(2015, -185, 85, 25); //ledge for sneak attackers inside building
        spawn.sneakAttacker(2035, -230, 30); //inside long center building
        for (let i = 0; i < 9; i++) {
            //some random blocks on the roof
            const size = 20 + Math.round(Math.random() * Math.random() * 300);
            spawn.bodyRect(
                900 + 100 * i + Math.random() * 100,
                -600,
                size + Math.round(Math.random() * 50),
                size + Math.round(Math.random() * 50)
            );
        }
        spawn.mapRect(2700, -100, 1400, 150); //far right block higher ground
        spawn.mapRect(3100, -200, 1000, 150); //far right block higher ground
        spawn.spawnBuilding(3500, -500, 500, 290, false, false, "right"); //building around exit at the far right
        spawn.mapRect(3700, -220, 100, 25); //ground bump wall
        spawn.chaser(-850, -190, 30); //far left on ground
        spawn.hopper(3150, -250, 75); //near exit on ground
        spawn.hopper(3000, -150, 100); //near exit on ground
        spawn.hopper(3700, -300, 50); //near exit on ground
        spawn.ghoster(1000, -1800, 100); //high up looks like a sun
        spawn.shooter(3600, -600, 50); //near entrance high up
    },
    //*****************************************************************************************************************
    //*****************************************************************************************************************
    enter: {
        x: 0,
        y: 0,
        draw: function() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + 30);
            ctx.lineTo(this.x, this.y - 80);
            ctx.bezierCurveTo(this.x, this.y - 170, this.x + 100, this.y - 170, this.x + 100, this.y - 80);
            ctx.lineTo(this.x + 100, this.y + 30);
            ctx.lineTo(this.x, this.y + 30);
            ctx.fillStyle = "#ccc";
            ctx.fill();
        }
    },
    exit: {
        x: 0,
        y: 0,
        draw: function() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + 30);
            ctx.lineTo(this.x, this.y - 80);
            ctx.bezierCurveTo(this.x, this.y - 170, this.x + 100, this.y - 170, this.x + 100, this.y - 80);
            ctx.lineTo(this.x + 100, this.y + 30);
            ctx.lineTo(this.x, this.y + 30);
            ctx.fillStyle = "#0ff";
            ctx.fill();
        }
    },
    fillBG: [],
    drawFillBGs: function() {
        for (let i = 0, len = level.fillBG.length; i < len; ++i) {
            const f = level.fillBG[i];
            ctx.fillStyle = f.color;
            ctx.fillRect(f.x, f.y, f.width, f.height);
        }
    },

    fill: [],
    drawFills: function() {
        for (let i = 0, len = level.fill.length; i < len; ++i) {
            const f = level.fill[i];
            ctx.fillStyle = f.color;
            ctx.fillRect(f.x, f.y, f.width, f.height);
        }
    },
    zones: [],
    checkZones: function() {
        for (let i = 0, len = this.zones.length; i < len; ++i) {
            if (
                player.position.x > this.zones[i].x1 &&
                player.position.x < this.zones[i].x2 &&
                player.position.y > this.zones[i].y1 &&
                player.position.y < this.zones[i].y2
            ) {
                this.zoneActions[this.zones[i].action](i);
                break;
            }
        }
    },
    addZone: function(x, y, width, height, action, info) {
        this.zones[this.zones.length] = {
            x1: x,
            y1: y - 70,
            x2: x + width,
            y2: y + height - 70, //-70 to adjust for player height
            action: action,
            info: info
        };
    },
	zoneActions: {
		fling: function(i) {
			Matter.Body.setVelocity(player, {
				x: level.zones[i].info.Vx,
				y: level.zones[i].info.Vy
			});
		},
		nextLevel: function() {
			level.onLevel++;
			if (level.onLevel > level.levels.length - 1) level.onLevel = 0;
			game.dmgScale += 0.2; //damage done by mobs increases each level
			b.dmgScale *= 0.85; //damage done by player decreases each level
			game.levelsCleared++;
			game.clearNow = true;
		},
		death: function() {
			mech.death();
		},
		laser: function(i) {
			//draw these in game with spawn.background
			mech.damage(0.001);
		},
		slow: function() {
			Matter.Body.setVelocity(player, {
				//reduce player velocity every cycle until not true
				x: player.velocity.x * 0.5,
				y: player.velocity.y * 0.5
			});
		}
	},
    queryList: [],
    checkQuery: function() {
		let bounds,action,info
        function isInZone(targetArray) {
            let results = Matter.Query.region(targetArray, bounds);
            for (let i = 0, len = results.length; i < len; ++i) {
                level.queryActions[action](results[i], info);
            }
        }
        for (let i = 0, len = level.queryList.length; i < len; ++i) {
            bounds = level.queryList[i].bounds;
            action = level.queryList[i].action;
            info = level.queryList[i].info;
			for(let j = 0, l = level.queryList[i].groups.length; j < l; ++j){
				isInZone(level.queryList[i].groups[j]);
			}
			// isInZone([player]);
            // isInZone(body);
            // isInZone(powerUp);
            // isInZone(bullet);
            // isInZone(mob);
			// isInZone(mobBullet);
        }
    },
    addQueryRegion: function(x, y, width, height, action, groups=[[player],body,mob,powerUp,bullet],info) {
        this.queryList[this.queryList.length] = {
            bounds: {
                min: {
                    x: x,
                    y: y
                },
                max: {
                    x: x + width,
                    y: y + height
                }
            },
            action: action,
			groups: groups,
            info: info
        };
    },
    queryActions: {
        bounce: function(target, info) {
            Matter.Body.setVelocity(target, { x: info.Vx + (Math.random()-0.5)*6, y: info.Vy });
            target.torque = (Math.random() - 0.5) * 2 * target.mass;
        },
		antiGrav: function(target) {
			target.force.y -= 0.0011*target.mass
		},

    },
    addToWorld: function(mapName) {
        //needs to be run to put bodies into the world
        for (let i = 0; i < body.length; i++) {
            //body[i].collisionFilter.group = 0;
            body[i].collisionFilter.category = 0x0000001;
            body[i].collisionFilter.mask = 0x111101;
            World.add(engine.world, body[i]); //add to world
        }
        for (let i = 0; i < map.length; i++) {
            //map[i].collisionFilter.group = 0;
            map[i].collisionFilter.category = 0x000001;
            map[i].collisionFilter.mask = 0x111111;
            Matter.Body.setStatic(map[i], true); //make static
            World.add(engine.world, map[i]); //add to world
        }
        for (let i = 0; i < cons.length; i++) {
            World.add(engine.world, cons[i]);
        }
        for (let i = 0; i < consBB.length; i++) {
            World.add(engine.world, consBB[i]);
        }
    }
};
