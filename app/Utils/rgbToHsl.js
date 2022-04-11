// FIXME Hue isnt quite right, but I'm only using it for lightness for now
export function rgbToHsl(rgbString)
{
    const hslObj = {hue: 0, saturation: 0, lightness: 0};
    const rgbObj = {red: rgbString.substring(1, 3), green: rgbString.substring(3, 5), blue: rgbString.substring(5, 7)};
    
    for(let key in rgbObj)
    {
        rgbObj[key] = hexDigitToDec(rgbObj[key][0]) * 16 + hexDigitToDec(rgbObj[key][1]);
    }
    
    if(rgbObj.red === rgbObj.green && rgbObj.green === rgbObj.blue)
    {
        hslObj.hue = 0;
        hslObj.saturation = 0;
        hslObj.lightness = rgbObj.red;

        return hslObj;
    }

    let smallest = "red";

    if(rgbObj.green < rgbObj.red)
    {
        smallest = "green";
    }

    if(rgbObj.blue < rgbObj.green)
    {
        smallest = "blue";
    }

    switch(smallest)
    {
        case "red":
            if(rgbObj.green >= rgbObj.blue)
            {
                hslObj.saturation = (1 - (rgbObj.red / rgbObj.green)) * 255
                hslObj.lightness = rgbObj.green;
                hslObj.hue = 120 + (60 * (rgbObj.blue / rgbObj.green) * (rgbObj.red / rgbObj.blue));
            }
            else
            {
                hslObj.saturation = (1 - (rgbObj.red / rgbObj.blue)) * 255
                hslObj.lightness = rgbObj.blue;
                hslObj.hue = 240 - (60 * (rgbObj.green / rgbObj.blue) * (rgbObj.red / rgbObj.green));
            }
            return hslObj;
        case "green":
            if(rgbObj.red >= rgbObj.blue)
            {
                hslObj.saturation = (1 - (rgbObj.green / rgbObj.red)) * 255
                hslObj.lightness = rgbObj.red;
                hslObj.hue = 300 + (60 * (rgbObj.blue / rgbObj.red) * (rgbObj.green / rgbObj.blue)) % 360;
            }
            else
            {
                hslObj.saturation = (1 - (rgbObj.green / rgbObj.blue)) * 255
                hslObj.lightness = rgbObj.blue;
                hslObj.hue = 240 + (60 * (rgbObj.red / rgbObj.blue) * (rgbObj.green / rgbObj.red));
            }
            return hslObj;
        case "blue":
            if(rgbObj.red >= rgbObj.green)
            {
                hslObj.saturation = (1 - (rgbObj.blue / rgbObj.red)) * 255
                hslObj.lightness = rgbObj.red ;
                hslObj.hue = 0 + (60 * (rgbObj.green / rgbObj.red) * (rgbObj.blue / rgbObj.green));
            }
            else
            {
                hslObj.saturation = (1 - (rgbObj.blue / rgbObj.green)) * 255
                hslObj.lightness = rgbObj.green;
                hslObj.hue = 120 - (60 * (rgbObj.red / rgbObj.green) * (rgbObj.blue / rgbObj.red));
            }
            return hslObj;
    }
}

function hexDigitToDec(hexDigit)
{
    switch(hexDigit)
    {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return +hexDigit;
        case "A":
        case "a":
            return 10;
        case "B":
        case "b":
            return 11;
        case "C":
        case "c":
            return 12;
        case "D":
        case "d":
            return 13;
        case "E":
        case "e":
            return 14;
        case "F":
        case "f":
            return 15;
    }
}

function decToHexDigit(decNum)
{
    switch(decNum)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            return decNum.toString();
        case 10:
            return "A";
        case 11:
            return "B";
        case 12:
            return "C";
        case 13:
            return "D";
        case 14:
            return "E";
        case 15:
            return "F";
    }
}

export function colorDecToHex(decColor)
{
    let hexColor = "";
    hexColor += decToHexDigit(Math.floor(decColor / 16));
    decColor -= hexDigitToDec(hexColor) * 16;
    hexColor += decToHexDigit(decColor);
    return hexColor;
}