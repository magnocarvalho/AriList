import cordenates from "../cordenates.json";
export async function testPoint(point) {
  let tipo = null;
  let inside = false;
  if (await isMarkerInsidePolygon(point, cordenates.primeiro)) {
    tipo = "primeiro";
    inside = true;
    return { inside, tipo };
  } else if (await isMarkerInsidePolygon(point, cordenates.segundo)) {
    tipo = "segundo";
    inside = true;
    return { inside, tipo };
  } else if (await isMarkerInsidePolygon(point, cordenates.terceiro)) {
    tipo = "terceiro";
    inside = true;
    return { inside, tipo };
  }
  return { inside, tipo };
}

export function isMarkerInsidePolygon(point, vs) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  //https://github.com/substack/point-in-polygon/blob/master/index.js
  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}
