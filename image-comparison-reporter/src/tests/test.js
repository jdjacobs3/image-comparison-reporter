var assert = require('assert');
var createURLs = require('../methods-lib/createURLs');
// var describe = require('describe');

describe('createURLs test', function() {
    it('Should create a url array using a base url string and an array of query parameters', function() {
      var result = createURLs('test.com', ["?text=<strike>Introduce%20KeyBank%20checking%20into%20<span%20style=\"font-family: 12289\">your%20world</span></strike>&font_family=10667&max_font_size=23&width=336&height=29&color=%23000000&align=right&pixel_density=2&min_font_size=4&line_height=1.2&force_line_height=true&tracking=0&end=true",
      ,"?text=<sup><span%20style=\"y-offset: 0.3\"><u>%24</u></span><%2Fsup>XXX<sup><span%20style=\"yoffset: 0.5\"><strike>XX</strike></span><%2Fsup><sub><u><span%20style=\"y-offset: -0.3\">XX</span></u><%2Fsub>&font_family=10715&max_font_size=72&width=400&height=300&color=%23F06031&align=center&min_font_size=4&force_line_height=false&line_height=1.2&trim=false&valign=bottom&end=true",
    ]);
     assert.equal(result[0], 'test.com?text=<strike>Introduce%20KeyBank%20checking%20into%20<span%20style=\"font-family: 12289\">your%20world</span></strike>&font_family=10667&max_font_size=23&width=336&height=29&color=%23000000&align=right&pixel_density=2&min_font_size=4&line_height=1.2&force_line_height=true&tracking=0&end=true');
    });
});

describe('getComparison test', function() {
  it('', function() {
  var result = '';
   assert.equal(result, '');
  });
});

describe('getHeaders test', function() {
  it('', function() {
  var result = '';
   assert.equal(result, '');
  });
});

describe('createComparisonArray test', function() {
  it('', function() {
  var result = '';
   assert.equal(result, '');
  });
});

describe('BuildHTMLReport test', function() {
  it('', function() {
  var result = '';
   assert.equal(result, '');
  });
});