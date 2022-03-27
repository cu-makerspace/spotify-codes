/**
 * @Author: Nick Steele
 * @Date:   26-Mar-2022 21:06
 * @Last modified by:   Nick Steele
 * @Last modified time: 27-Mar-2022 01:01
 */

var REQUESTED_BACKGROUND_COLOR = '00ff00';


function removeSpotifyLogo(svg_el) {
  // Preys that the only path is the spotify logo (as of development, it is)
  var count = svg_el.find('*').length;
  svg_el.find('path').remove();

  if (svg_el.find('*').length !== (count - 1)) {
    throw 'Unexpected number of children killed D:';
  }
}


function removeBackground(svg_el) {
  // Relies on the background color being set in the request.
  var count = svg_el.find('*').length;
  var color = '';

  candidates = svg_el.find('rect');

  candidates.filter(function() {
    return $(this).attr('fill').substr(1, 6).toLowerCase() === REQUESTED_BACKGROUND_COLOR.toLowerCase();
  }).remove();

  if (svg_el.find('*').length !== (count - 1)) {
    throw 'Unexpected number of children killed D:';
  }
}


function removeAllAttrib(elem) {
  while (elem.attributes.length > 0)
    elem.removeAttribute(elem.attributes[0].name);
}


function groupAllChildren(svg_el, width, height) {
  // WARNING: This function causes wierd DOM issues causing the SVG to be unrendered
  var elem = svg_el[0];

  var children = elem.childNodes;
  var group_el = $('<g>').appendTo(svg_el).append(children);
  return group_el;
}

function replaceWithChildren(elem) {
  elem.replaceWith(...elem.childNodes);
}

function zeroAllElements(svg_el) {
  var minimum = {};
  minimum.x = Number.MAX_SAFE_INTEGER;
  minimum.y = Number.MAX_SAFE_INTEGER;
  var elems = svg_el.find('*');
  var xval, yval, el;

  for (var idx = 0; idx < elems.length; idx++) {
    el = elems.eq(idx);
    xval = Number(el.attr('x'));
    if (xval < minimum.x) minimum.x = xval;
    yval = Number(el.attr('y'));
    if (yval < minimum.y) minimum.y = yval;
  }


  for (var idx = 0; idx < elems.length; idx++) {
    el = elems.eq(idx);
    xval = Number(el.attr('x'));
    yval = Number(el.attr('y'));

    el.attr('x', xval - minimum.x);
    el.attr('y', yval - minimum.y);
  }
}

function getFullWidthOfChildren(svg_el) {
  // Getting width from the DOM will not work since it's impacted by things
  // other than the SVG contents. Mutating the SVGs can create DOM rendering issues.

  var elems = svg_el.find('*');
  var xmin = Number.MAX_SAFE_INTEGER,
    xmax = Number.MIN_SAFE_INTEGER,
    x_width_at_max;
  var xval, el;

  var elems = svg_el.find('*');

  for (var idx = 0; idx < elems.length; idx++) {
    el = elems.eq(idx);
    xpos = Number(el.attr('x'));
    if (xpos > xmax) {
      x_width_at_max = Number(el[0].width.baseVal.value)
      xmax = xpos;
    }
    if (xpos < xmin) {
      xmin = xpos;
    }
  }

  return x_width_at_max + xmax - xmin;
}

function getFullHeightOfChildren(svg_el) {
  // Getting width from the DOM will not work since it's impacted by things
  // other than the SVG contents. Mutating the SVGs can create DOM rendering issues.

  var elems = svg_el.find('*');
  var ymin = Number.MAX_SAFE_INTEGER,
    ymax = Number.MIN_SAFE_INTEGER,
    y_height_at_max;
  var yval, height, el;

  var elems = svg_el.find('*');

  for (var idx = 0; idx < elems.length; idx++) {
    el = elems[idx];
    if (!el.y) continue;
    ypos = Number(el.y.baseVal.value);
    height = Number(el.height.baseVal.value)
    if (ypos + height > ymax) {
      // y_height_at_max = height;
      ymax = ypos + height;
    }
    if (ypos < ymin) {
      ymin = ypos;
    }
  }

  return ymax - ymin;
}


function insertCodeIntoTemplate(spotcode, template) {
  var template_el = $('#svg-workspace-1').empty();
  var spotcode_el = $('#svg-workspace-2').empty();
  template_el.html(template);
  spotcode_el.html(spotcode);
  replaceWithChildren(template_el.children()[0]);
  replaceWithChildren(spotcode_el.children()[0]);
  var frame_el = template_el.find('#code-frame');

  removeSpotifyLogo(spotcode_el);
  removeBackground(spotcode_el);
  zeroAllElements(spotcode_el);

  var new_width = frame_el[0].width.baseVal.value;
  var old_width = getFullWidthOfChildren(spotcode_el);
  var scale = new_width / old_width;
  var template_height = frame_el[0].height.baseVal.value;
  var new_height = getFullHeightOfChildren(spotcode_el) * scale;
  var x_val = frame_el[0].x.baseVal.value;
  var center = frame_el[0].y.baseVal.value + (frame_el[0].height.baseVal.value / 2);
  var y_val = center - (new_height / 2);

  frame_el.parent().attr('transform', ` scale(${scale}) translate(${x_val / scale}, ${y_val / scale})`);
  frame_el.replaceWith(spotcode_el.children());
}
