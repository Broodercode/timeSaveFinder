// function convertTimesToSeconds(times) {
//     return times.map(time => {
//         let [minutes, rest] = time.split(":");
//         let [seconds, milliseconds] = rest.split(".");
        
//         let totalSeconds = parseInt(minutes, 10) * 60;   // Convert minutes to seconds
//         totalSeconds += parseInt(seconds, 10);           // Add seconds
//         totalSeconds += parseInt(milliseconds, 10) / 1000; // Convert milliseconds to seconds and add them

//         return Math.floor(totalSeconds);  // Round down to the nearest second
//     });
// }

// function compareTimes(runner01, runner02, names) {
//     if(runner01.length !== runner02.length) {
//         throw new Error(`Runner01 and Runner02 sizes differ by ${Math.abs(runner01.length - runner02.length)} items.`);
//     }

//     if(names === undefined) {
//         names = runner01.map((_, index) => `Segment ${index + 1}`);
//     } else if(runner01.length !== names.length) {
//         throw new Error(`Runner01 and Names sizes differ by ${Math.abs(runner01.length - names.length)} items.`);
//     }

//     let results = [];
//     for (let i = 0; i < runner01.length; i++) {
//         let segmentTimeRunner01 = i === 0 ? runner01[i] : runner01[i] - runner01[i - 1];
//         let segmentTimeRunner02 = i === 0 ? runner02[i] : runner02[i] - runner02[i - 1];

//         let difference = segmentTimeRunner01 - segmentTimeRunner02;  // Segment time difference

//         let result = {
//             name: names[i],
//             runner01: segmentTimeRunner01,
//             runner02: segmentTimeRunner02,
//             difference: difference
//         };

//         results.push(result);
//     }

//     return results;
// }



// function convertStringToArray(timesString) {
//     return timesString.split(" ").filter(time => time.trim() !== '');  // Filter out any empty strings
// }

// function processAndCompareTimes(runner01TimesString, runner02TimesString, names) {
//     // Convert strings to arrays
//     let runner01TimesArray = convertStringToArray(runner01TimesString);
//     let runner02TimesArray = convertStringToArray(runner02TimesString);

//     // Convert arrays of times to arrays of seconds
//     let runner01SecondsArray = convertTimesToSeconds(runner01TimesArray);
//     let runner02SecondsArray = convertTimesToSeconds(runner02TimesArray);

//     // Compare the times
//     return compareTimes(runner01SecondsArray, runner02SecondsArray, names);
// }

function convertTimeToSeconds(time) {
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
    const runner01SecondsArray = runner01TimesArray.map(convertTimeToSeconds);
    const runner02SecondsArray = runner02TimesArray.map(convertTimeToSeconds);

    // Compare the times
    return compareTimes(runner01SecondsArray, runner02SecondsArray, namesArray);
}




sorPB="1:49.58 3:08.48 3:33.12 5:08.47 5:38.50 6:01.25 6:55.73 7:35.69 8:17.39 8:34.14 8:53.28 9:20.34 10:06.87 11:27.49 12:08.02 13:24.35 14:57.65 15:13.71 15:22.78 15:37.84 15:50.53 16:01.52 16:30.02 17:24.35 18:43.95 19:24.51 20:46.56 21:48.18 23:09.83 25:02.24 26:01.17 28:25.69 28:44.57 29:16.94 29:59.60 30:31.47 31:09.72 32:16.86 33:46.46 34:14.01 34:38.32 35:20.10 36:54.51"

sorWR="1:15.00 2:04.00 2:21.00 3:33.00 3:52.00 4:08.00 4:29.00 5:02.00 5:28.00 5:45.00 6:00.00 6:25.00 6:49.00 7:36.00 8:02.00 9:01.00 10:13.00 10:27.00 10:31.00 10:43.00 10:51.00 11:00.00 11:15.00 11:37.00 12:33.00 12:49.00 14:04.00 14:44.00 15:36.00 16:56.00 17:23.00 18:45.00 19:04.00 19:21.00 19:32.00 19:56.00 20:28.00 20:56.00 21:28.00 21:53.00 22:10.00 22:35.00 23:24.00"

sorNames="-Streets, Bar, Barbon, Bridge, Truck, Bridge, Jet, Park, Arcade, Passage 1, Passage 2, Pirate Ship, Alien Entrance, Alien, Zamza, Road to Stadium, Stadium, Elevator Wave 1, Elevator Wave 2, Elevator Wave 3, Elevator Wave 4, Elevator Wave 6, Elevator Wave 7, Abadede, Ship's Hold 1, Ship's Hold 2, Ship's Deck, R. Bear, Beach, Jungle, Soother, Factory, Hellevator Signals, Hellevator Jets, Hellevator Ninjas, Hellevator Kickboxers, Hellevator Soya, Robots, Bear Jr., Vulture, Nail, Z. Kusano, Mr. X"

console.log(processAndCompareTimes(sorPB, sorWR, sorNames))