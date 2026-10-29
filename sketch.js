// 載入預設跌倒動畫與方向鍵移動動畫。
function preload() { // 在畫布啟動前載入精靈圖。
  idleSprite = loadImage("1/跌倒/跌倒.png"); // 載入待機用的跌倒精靈圖。
  moveSprite = loadImage("1/嚇到跌倒站起來背面/嚇到跌倒站起來背面.png"); // 載入移動用的起身精靈圖。
} // 結束精靈圖載入設定。

let idleSprite; // 儲存待機動畫精靈圖。
let moveSprite; // 儲存移動動畫精靈圖。
const idleFrameCount = 9; // 設定待機精靈圖中的實際影格數。
const moveFrameCount = 16; // 設定移動精靈圖中的實際影格數。
const frameDuration = 100; // 設定動畫每格的播放時間（毫秒）。
const spriteScale = 4; // 設定精靈圖放大倍率，讓像素角色更容易觀看。
let characterX; // 儲存角色目前的水平位置。
let characterY; // 儲存角色目前的垂直位置。
let facingDirection = 1; // 設定角色初始朝向右方。

function setup() { // 設定全螢幕畫布與角色初始位置。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布。
  imageMode(CENTER); // 讓精靈圖以指定座標作為中心繪製。
  characterX = width / 2; // 將角色放在畫面水平中央。
  characterY = height / 2; // 將角色放在畫面垂直中央。
} // 結束畫布初始化設定。

function draw() { // 每個動畫影格更新背景、角色位置與精靈圖。
  background(255, 220, 230); // 使用淺粉色清除畫布。

  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查使用者是否按住右方向鍵。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查使用者是否按住左方向鍵。
  let movement = 0; // 預設角色本影格保持不動。

  if (movingRight && !movingLeft) { // 判斷是否只按住右方向鍵。
    movement = 1; // 設定角色向右移動。
  } else if (movingLeft && !movingRight) { // 判斷是否只按住左方向鍵。
    movement = -1; // 設定角色向左移動。
  } // 結束方向鍵狀態判斷。

  if (movement !== 0) { // 只有按住方向鍵時才更新位置與朝向。
    facingDirection = movement; // 讓角色面向目前的移動方向。
    characterX += movement * 4 * (deltaTime / 16.67); // 依方向與影格時間平順移動角色。
    characterX = constrain(characterX, 0, width); // 將角色限制在畫布水平範圍內。
  } // 結束角色移動更新。

  const isMoving = movement !== 0; // 判斷本影格應播放待機或移動動畫。
  const currentSprite = isMoving ? moveSprite : idleSprite; // 選擇目前狀態對應的精靈圖。
  const currentFrameCount = isMoving ? moveFrameCount : idleFrameCount; // 取得目前動畫的影格總數。
  const currentFrame = floor(millis() / frameDuration) % currentFrameCount; // 循環計算目前播放影格。
  const sourceFrameWidth = currentSprite.width / currentFrameCount; // 計算精靈圖每格的來源寬度。
  const sourceX = currentFrame * sourceFrameWidth; // 計算目前影格在精靈圖中的水平位置。
  const displayWidth = sourceFrameWidth * spriteScale; // 計算角色顯示時的寬度。
  const displayHeight = currentSprite.height * spriteScale; // 計算角色顯示時的高度。

  push(); // 暫存畫布狀態，避免翻轉影響其他繪圖。
  translate(characterX, characterY); // 將繪圖原點移至角色目前位置。
  scale(facingDirection, 1); // 依角色朝向水平翻轉精靈圖。
  image( // 繪製目前動畫影格。
    currentSprite, // 指定目前使用的精靈圖。
    0, // 設定精靈圖中心的水平座標。
    0, // 設定精靈圖中心的垂直座標。
    displayWidth, // 設定精靈圖顯示寬度。
    displayHeight, // 設定精靈圖顯示高度。
    sourceX, // 設定來源影格的水平起點。
    0, // 設定來源影格的垂直起點。
    sourceFrameWidth, // 設定來源影格的寬度。
    currentSprite.height // 設定來源影格的高度。
  ); // 結束目前影格的繪製。
  pop(); // 還原畫布狀態。
} // 結束每影格更新與繪製。

function keyPressed() { // 攔截方向鍵，避免瀏覽器捲動頁面。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷是否按下左右方向鍵。
    return false; // 阻止方向鍵的瀏覽器預設行為。
  } // 結束方向鍵判斷。
} // 結束按鍵事件處理。

function windowResized() { // 視窗尺寸改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗。
  characterY = height / 2; // 讓角色在調整後仍維持垂直置中。
  characterX = constrain(characterX, 0, width); // 確保角色仍位於新畫布範圍內。
} // 結束視窗尺寸調整處理。
