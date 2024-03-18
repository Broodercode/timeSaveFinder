

function convertTimeToSeconds(time) {
    console.log(time)
    const [minutes, rest] = time.split(":");
    const [seconds, milliseconds = '0'] = rest.split(".");
    // Convert time to hundredths of a second
    return Math.round((parseInt(minutes, 10) * 60 + parseInt(seconds, 10) + parseInt(milliseconds, 10) / 1000) * 100);
}

function secondsToStandardTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = (seconds % 60).toFixed(2);  // Preserve two decimal places for seconds
    let timeSegments = [];

    if (hours > 0) {
        timeSegments.push(`${hours}h`);
    }
    if (minutes > 0) {
        timeSegments.push(`${minutes}m`);
    }
    if (seconds > 0) {
        timeSegments.push(`${seconds}s`);
    }

    return timeSegments.join(" ");
}

function compareTimes(runner01, runner02, names = []) {
    if (runner01.length !== runner02.length) {
        throw new Error(`Runner01 and Runner02 sizes differ by ${Math.abs(runner01.length - runner02.length)} items.`);
    }

    names = names.length === 0 ? runner01.map((_, index) => `Segment ${index + 1}`) : names;
    
    if (names.length > runner01.length) {
        let diff = names.length - runner01.length;
        throw new Error(`Names array is larger by ${Math.abs(diff)} items.`);
    }

    return runner01.map((time, i) => {
        const segmentTimeRunner01 = i === 0 ? time : time - runner01[i - 1];
        const segmentTimeRunner02 = i === 0 ? runner02[i] : runner02[i] - runner02[i - 1];
        const difference = segmentTimeRunner01 - segmentTimeRunner02;

        return {
            name: names[i] || `Segment ${i + 1}`, // If a name doesn't exist, auto-generate one
            position: i + 1,
            runner01: secondsToStandardTime(segmentTimeRunner01 / 100),
            runner02: secondsToStandardTime(segmentTimeRunner02 / 100),
            difference: secondsToStandardTime(Math.abs(difference) / 100)
        };
    });
}



function processAndCompareTimes(runner01TimesString, runner02TimesString, namesString) {
    // Convert strings to arrays
    const runner01TimesArray = runner01TimesString.split(" ").filter(Boolean);
    const runner02TimesArray = runner02TimesString.split(" ").filter(Boolean);

    // If namesString is provided and it's a string, split it into an array
    // Else, use an empty array and let compareTimes auto-generate names
    const namesArray = namesString && typeof namesString === 'string' ? namesString.split(", ").filter(Boolean) : [];

    // Convert arrays of times to arrays of hundredths of a second
    console.log(runner01TimesArray)
    const runner01SecondsArray = runner01TimesArray.map(convertTimeToSeconds);
    console.log(runner01SecondsArray)
    console.log(runner02TimesArray)
    const runner02SecondsArray = runner02TimesArray.map(convertTimeToSeconds);

    // Compare the times
    return compareTimes(runner01SecondsArray, runner02SecondsArray, namesArray);
}




sorPB="1:39.19 2:53.68 3:12.87 4:45.09 5:09.59 5:32.25 6:04.03 6:40.80 7:12.83 7:31.33 7:56.52 8:30.48 9:12.27 10:13.83 10:40.20 11:59.49 13:34.71 13:56.37 14:03.61 14:16.62 14:29.31 14:39.80 15:06.59 15:27.96 16:48.12 17:24.40 19:00.90 19:48.24 20:54.17 22:41.84 23:21.31 25:21.22 25:52.11 26:08.26 26:27.65 27:00.58 27:44.20 28:11.35 28:57.17 29:27.22 30:01.64 30:30.94 32:00.03"
sorWR="1:15.00 2:04.00 2:21.00 3:33.00 3:52.00 4:08.00 4:29.00 5:02.00 5:28.00 5:45.00 6:00.00 6:25.00 6:49.00 7:36.00 8:02.00 9:01.00 10:13.00 10:27.00 10:31.00 10:43.00 10:51.00 11:00.00 11:15.00 11:37.00 12:33.00 12:49.00 14:04.00 14:44.00 15:36.00 16:56.00 17:23.00 18:45.00 19:04.00 19:21.00 19:32.00 19:56.00 20:28.00 20:56.00 21:28.00 21:53.00 22:10.00 22:35.00 23:24.00"
sorManiaWR="4:22.00 7:25.32 13:21.00 18:24.29 23:33.78 28:18.69 35:38.01 40:55.47"
sorManiaBrady="4:23.81 7:51.28 13:45.42 19:20.35 24:24.70 29:01.41 36:39.21 42:06.14"
sorNamesShort="Barbon, Jet, Zamza, Abadede, R. Bear, Souther, Robots, Mr.X"
sorNames="-Streets, Bar, Barbon, Bridge, Truck, Bridge, Jet, Park, Arcade, Passage 1, Passage 2, Pirate Ship, Alien Entrance, Alien, Zamza, Road to Stadium, Stadium, Elevator Wave 1, Elevator Wave 2, Elevator Wave 3, Elevator Wave 4, Elevator Wave 6, Elevator Wave 7, Abadede, Ship's Hold 1, Ship's Hold 2, Ship's Deck, R. Bear, Beach, Jungle, Soother, Factory, Hellevator Signals, Hellevator Jets, Hellevator Ninjas, Hellevator Kickboxers, Hellevator Soya, Robots, Bear Jr., Vulture, Nail, Z. Kusano, Mr. X"

smb2PB="1:10.07 1:57.45 2:24.77 3:17.89 4:10.88 5:25.47 6:39.08 8:25.00 10:24.06 12:30.92"

smb2Yogi="0:59.00 1:39.00 2:04.00 2:54.00 3:42.00 4:48.00 5:35.00 6:30.00 7:35.00 9:24.00"
smb2OS="0:54.9 1:35.5 2:00.6 2:49.6 3:34.7 4:30.9 5:20.9 6:16.5 7:21.00 9:09.9"
smb2WR="0:48.5 1:20.5 1:44.8 2:31.9 3:15.7 4:10.9 4:53.4 5:39.8 6:35.5 8:11.4"
smb2Names="1-1, 1-2, 1-3, 4-1, 4-2, 6-1, 6-2, 6-3, 7-1, 7-2"

ActWR="0:53.20 2:14.20 3:18.10 5:11.10 6:41.30 8:29.30 10:29.40 11:40.30 12:52.00 14:14.40 16:09.40 17:33.50 21:42.60"
ActPB="0:54.24 2:22.64 3:28.20 5:24.73 7:01.13 9:01.94 11:18.62 12:36.30 13:53.88 15:23.74 17:44.26 19:27.61 24:16.55"

MegaManWR="2:07.90 4:33.60 7:14.30 9:24.80 11:42.50 14:12.60 16:28.70 19:00.40 22:01.90 24:53.40 27:47.0 31:30.00"
MegaManPB="2:15.25 5:03.52 7:57.76 10:23.05 13:23.56 16:14.35 19:02.05 21:56.67 25:32.56 29:39.48 34:14.01 39:52.44"

ActNames="Fillmore 1, Fillmore 2, Bloodpool 1, Bloodpool 2, Kassandora 1, Kassandora 2, Aitos 1, Aitos 2, Marahna 1, Marahna 2, Northwall 1, Northwall 2, Death Heim"
MegaManNames="Cement, Fire, Gravity, Hornet, Gem, Water, Plug, Tornado, Wily 1, Wily 2, Wily 3, Wily 4"
console.log('test')
console.log(processAndCompareTimes(MegaManPB, MegaManWR, MegaManNames))