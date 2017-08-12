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

  var text = new PointText({
      point: view.center,
      justification: 'center',
      fontSize: 75,
      content: 'MAGIC FOCUS',
      fillColor: 'red',
      fontFamily: 'press_start_2pregular'
  });

  var blockWidth = text.bounds.width / 60,
      blockHeight = text.bounds.height / 2.5;
      size = new Size(blockWidth, blockHeight),
      rect = new Path.Rectangle(new Point(text.bounds.bottomLeft), size),
      endPoint = text.bounds.bottomRight.x - 10,
      startPoint = text.bounds.bottomLeft.x;

  group.addChildren([groupTB, groupLR, text, rect]);
  group.fillColor = 'red';

  function runTimeoutLoop(){
    var interval = setInterval(function() {
      if (startPoint <= endPoint) {
        var rect2 = rect.clone();
        startPoint = rect2.bounds.x = startPoint + (1.5 * blockWidth);
      } else {
        view.pause();
        $('#effing-focus').hide();
        $('#start-over').show().css('display', 'flex');
      }
    }, 500);
  }

  runTimeoutLoop();

  var barDir = 'u',
      sideDir = 'u',
      color = 'r';
  group.opacity = 1.0;
  groupS.opacity = Math.random() < 0.5 ? 1 : 0;

  view.onFrame = function(event) {

    if (event.count % 60 === 0) {
      if (sideDir == 'u') {
        groupTB.scale(2.5, 1);
        groupLR.scale(1, 2);
        groupS.opacity = Math.random() < 0.5 ? 1 : 0;
      } else {
        groupTB.scale(0.40, 1);
        groupLR.scale(1, 0.50);
        groupS.opacity = Math.random() < 0.5 ? 1 : 0;
      }
    }

    if (bM.bounds.width > width * 0.1) { sideDir = 'd'; }
    else if (bM.bounds.width <= width * 0.1) { sideDir = 'u'; }

    if (event.count < 60) {
       if (event.count == 20) {
          group.fillColor = 'green';
       } else if (event.count == 40) {
          group.fillColor = 'blue';
       } else if (event.count == 59) {
          group.fillColor = 'red';
       }
    } else {

      if (event.count % 395 === 0) {
        groupS.opacity = 0.75;
        group.opacity = 0.0
      }

      if (event.count % 415 === 0) {
        groupS.opacity = Math.random() < 0.5 ? 1 : 0;
        group.opacity = 1.0

        if (color == 'b') {
          color = 'g';
          text.fillColor = 'green';
        } else if (color == 'r') {
          color = 'b';
          text.fillColor = 'blue';
        } else if (color == 'g') {
          color = 'r';
          text.fillColor = 'red';
        }

        group.fillColor = text.fillColor;
        groupS.fillColor = text.fillColor;
      }
    }
  }
}