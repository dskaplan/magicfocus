function mf() {

  var canvas = document.getElementById('effing-focus');
		  paper.setup(canvas);

  var width = view.size.width,
      height = view.size.height,
      widthMid = view.size.width / 2,
      heightMid = view.size.height / 2;

  var a = new Point(widthMid - (width * 0.05), 0),
      b = new Point(widthMid + width * 0.05, height * 0.05),
      c = new Point(widthMid, (height - height * 0.05)),
      tM = new Path.Rectangle(a, b),
      bM = tM.clone();

  bM.bounds.topCenter = c;

  var a = new Point(0, heightMid - (height * 0.05)),
      b = new Point(width * 0.025, heightMid + (height * 0.05)),
      c = new Point((width - width * 0.025), heightMid),
      lM = new Path.Rectangle(a,b),
      rM = lM.clone();

  rM.bounds.leftCenter = c;
  
  if (width * 0.05 > height * 0.05) { var squareStart = new Point(width * 0.05, width * 0.05); }
  else { var squareStart = new Point(height * 0.05, height * 0.05); }

  var squareEnd = new Point(0, 0),
      tL = new Path.Rectangle(squareEnd, squareStart),
      bL = tL.clone(),
      tR = tL.clone(),
      bR = tL.clone();

  bL.bounds.bottomLeft = new Point(0, height);
  tR.bounds.topRight = new Point(width, 0);
  bR.bounds.bottomRight = new Point(width, height);

  var groupTB = new Group(),
      groupLR = new Group(),
      groupS = new Group(),
      group = new Group();

  groupS.addChildren([bL, tL, bR, tR]);
  groupS.opacity = 0.75;
  groupLR.addChildren([lM, rM]);
  groupTB.addChildren([tM, bM]);

  var startColors = ['blue', 'red', 'green', 'yellow', 'pink', 'orange'],
      startColor = startColors[Math.floor(Math.random()*startColors.length)];

  var text = new PointText({
      point: view.center,
      justification: 'center',
      fontSize: 75, 
      content: 'MAGIC FOCUS',
      fillColor: startColor,
      fontFamily: 'press_start_2pregular'
  });

  var blockWidth = text.bounds.width / 45,
      blockHeight = text.bounds.height / 3;
      size = new Size(blockWidth, blockHeight),
      rect = new Path.Rectangle(new Point(text.bounds.bottomLeft), size),
      endPoint = text.bounds.bottomRight.x - 20,
      startPoint = text.bounds.bottomLeft.x;

  group.addChildren([groupTB, groupLR, text, rect]);

  function runTimeoutLoop(){
    var interval = setInterval(function() {
      if (startPoint <= endPoint) {
        var rect2 = rect.clone();
        startPoint = rect2.bounds.x = startPoint + (1.25 * blockWidth);
      } else {
        view.pause();
        $('#effing-focus').hide();
        $('#start-over').show();
      }
    }, 1000); 
  }

  runTimeoutLoop();

  var barDir = 'u',
      sideDir = 'u';

  group.opacity = 0.9;

  view.onFrame = function(event) {

    if (group.opacity >= 0.99) { barDir = 'd'; }
    else if (group.opacity <= 0.20) { barDir = 'u'; }

    if (bM.bounds.width > width * 0.1) { sideDir = 'd'; }
    else if (bM.bounds.width <= width * 0.1) { sideDir = 'u'; }

    if (event.count % 60 === 0) {
      if (sideDir == 'u') {
        groupTB.scale(2.5, 1);
        groupLR.scale(1, 2);
      } else {
        groupTB.scale(0.40, 1);
        groupLR.scale(1, 0.50);
      }
    }

    if (event.count % 100 === 0) {
      if (groupS.opacity > 0.0) {
        groupS.opacity = 0;
      } else {
        groupS.opacity = 0.75;
      }
    }

    if ( barDir == 'd') { group.opacity -= 0.01; }
    else { group.opacity += 0.01; }

    text.fillColor.hue += 1;
    group.fillColor = text.fillColor;
    groupS.fillColor = text.fillColor;

  }
}
