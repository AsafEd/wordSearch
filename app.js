let rows = 9;
let cols = 12;

// options for now are right to left, diagon right to left, upsidedown
// Let user choose directions to include less common direction? for instance: from bottom to top or left to right diagonal? 

let lettersArr = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת',]
let wordsArr = ['משה','פסח','מרור','ליל הסדר','מצה','חמץ','אפיקומן','חרוסת'];
let wordsArrLength = wordsArr.length;
let directionsArr = ['diagonalRtl','upButtom','rtl'];
let reservedCellsArr=[];// properties letter, row, col, wordId 
let wordObjArr=[];// properties original word,direction wordId

//On load
setReservedLetter(); 
paintSideBar();
paint();

//< SET RESERVED LETTER > 
function setReservedLetter(){
    //direction should be rand
    // make sure letters not collide
    // if collides try another rand location unless it is the same letter
    let wordObj = {};

    //Sort wordsArr by word length. from longers to shorters
     sortArrayByWordLength();
     let  randDirIndex;
     let randDir;
     let currentWord = '';
    //allocate direction to each word
    for(let i = 0; i<wordsArrLength;i++){        

        randDirIndex = Math.floor(Math.random() * directionsArr.length);
        randDir = directionsArr[randDirIndex];
         currentWord='';
        wordObj.originalWord = wordsArr[i];
        currentWord = replaceSuffixLetter(wordsArr[i]);//wordsArr[i].replace(' ', '');
        wordObj.word = currentWord;
        wordObj.direction = randDir;
        wordObj.wordId = i;
        wordObjArr.push(wordObj);
       // console.log('setReservedLetter for loop: ',currentWord, randDir);
        wordObj = {};
        allocateCellsToWord(randDir,currentWord, i);

    }
    
    console.log('wordObjArr: ',wordObjArr);
}

function sortArrayByWordLength(){
    let wordsArrHelper = [];
    let wordObj = {};
    
    for(let i = 0; i<wordsArrLength; i++ ){
        
        wordObj.word = wordsArr[i];
        wordObj.wordLength = wordsArr[i].length;
        wordsArrHelper.push(wordObj);
        wordObj = {};
    }

    console.log();
    // sort the helper array
    wordsArrHelper.sort(function(a,b){
        return b.wordLength - a.wordLength;//desc order
    });

    // clear the original words array
    wordsArr = [];
    for(let i = 0; i < wordsArrLength; i++){
        wordsArr.push(wordsArrHelper[i].word);

    }
    console.log('wordsArr SORTED: ', wordsArr);
    return wordsArr;
}

function replaceSuffixLetter(word){
    if(word.includes('ץ')){
        word = word.replace('ץ','צ')
    }
    else if(word.includes('ף')){
        word =  word.replace('ף','פ')
    }
    else if(word.includes('ם')){
        word =  word.replace('ם','מ')
    }
    else if(word.includes('ך')){
        word =  word.replace('ך','כ')
    }
    else{// if(word.includes('ן')){
        word =  word.replace('ן','נ')
    }

    return word.replace(' ','');
}

function allocateCellsToWord(direction, word, wordId){
 //let wordLength = word.length;
 //let reservedLetterObj = {};

 switch(direction){
     case "diagonalRtl":
     allocateDirDiagonalRtl(word, wordId);
     break;
     case "upButtom":
        allocateDirUpBottom(word, wordId);
     break;
     case "rtl":
        allocateDirRtl(word, wordId);
     break;
 }
}

function allocateDirRtl(word, wordId){
    let isReserved = true;
    let colLimit = cols - word.length + 1;
    let randCol;
    let randRow;

    while(isReserved){
         randCol = Math.ceil(Math.random()* colLimit);
         randRow = Math.ceil(Math.random()* rows);
         let currentRandCol = randCol;
         let currentLetterObj;
        // console.log('checking reservedCellsArr in RTL', reservedCellsArr, currentRandCol);
        for(i=0;i<word.length;i++){
          //  console.log(`word: ${word} rand Col:  ${randCol} randRow: ${randRow} currentRandCol: ${currentRandCol}`);
          currentLetterObj= reservedCellsArr.find(x=>x.row === randRow && x.col === currentRandCol);
            currentRandCol++;
           // console.log(`allocateDirRtl: currentLetterObj.letter: ${currentLetterObj.letter} word[i]: ${word[i]}`)

            if(typeof currentLetterObj !== 'undefined' && currentLetterObj.letter !== word[i]){ // not undefined means reserved location was found
                // console.log( currentLetterObj.letter, row, col);
                 isReserved = true; //keep looping
                 console.log(`colliding row = ${randRow} col = ${randCol}`)
                 break; //exit for
             }
             else{
                isReserved = false;
             }
        }
    }
    
    let reservedCellObj = {};
    // if is not reserved than
//reservedCellsArr
    // for(i = 0; i<word.length;i++){
    //     reservedCellObj.letter = word[i];
    //     reservedCellObj.row = randRow;
    //     reservedCellObj.col = randCol++;
    //     reservedCellObj.wordId = wordId;
        
    //     reservedCellsArr.push(reservedCellObj);
    //     reservedCellObj = {};

    // }
    setReservedCellObj(word,wordId,randRow,randCol, 'rtl');
}

function allocateDirUpBottom(word, wordId){

    let isReserved = true;
    let rowLimit = rows - word.length + 1;
    let randCol;
    let randRow;
    while(isReserved){
        
        randCol = Math.ceil(Math.random()*(cols));
        randRow = Math.ceil(Math.random()* (rowLimit));
        let currentRandRow = randRow;
        for(i=0;i<word.length;i++){
            let currentLetterObj = reservedCellsArr.find(x=>x.row === currentRandRow && x.col === randCol);
            currentRandRow++;
           // console.log(`allocateDirUpBottom: currentLetterObj.letter: ${currentLetterObj.letter} word[i]: ${word[i]}`)

            if(typeof currentLetterObj !== 'undefined'  && currentLetterObj.letter !== word[i]){ // not undefined means reserved location was found
                // console.log( currentLetterObj.letter, row, col);
                 isReserved = true; //keep looping
                 break; //exit for
             }
             else{
                isReserved = false;
             }
        } 
    }
    let reservedCellObj = {};
    // if is not reserved than
//reservedCellsArr
    // for(i = 0; i<word.length;i++){
    //     reservedCellObj.letter = word[i];
    //     reservedCellObj.row = randRow++;
    //     reservedCellObj.col = randCol;
    //     reservedCellObj.wordId = wordId;
        
    //     reservedCellsArr.push(reservedCellObj);
    //     reservedCellObj = {};

    // }
    setReservedCellObj(word,wordId,randRow,randCol, 'upBottom');
}

function allocateDirDiagonalRtl(word, wordId){
    let isReserved = true;
    let rowLimit = rows - word.length + 1;
    let colLimit = cols - word.length + 1;
    let randCol;
    let randRow;

    while(isReserved){
        randCol = Math.ceil(Math.random()*(colLimit ));
        randRow = Math.ceil(Math.random()* (rowLimit));

        let currentRandRow = randRow;
        let currentRandCol = randCol;
        for(i=0;i<word.length;i++){
            let currentLetterObj = reservedCellsArr.find(x=>x.row === currentRandRow && x.col === currentRandCol);
            currentRandRow++;
            currentRandCol++;
           // console.log(`allocateDirDiagonalRtl: currentLetterObj.letter: ${currentLetterObj.letter} word[i]: ${word[i]}`)
            if(typeof currentLetterObj !== 'undefined'  && currentLetterObj.letter != word[i]){ // not undefined means reserved location was found
                // console.log( currentLetterObj.letter, row, col);
                 isReserved = true; //keep looping
                 break; //exit for
             }
             else{
                isReserved = false;
             }
        }
    }
   
    let reservedCellObj = {};
    // if is not reserved than
//reservedCellsArr
    // for(i = 0; i<word.length;i++){
    //     reservedCellObj.letter = word[i];
    //     reservedCellObj.row = randRow++;
    //     reservedCellObj.col = randCol++;
    //     reservedCellObj.wordId = wordId;
        
    //     reservedCellsArr.push(reservedCellObj);
    //     reservedCellObj = {};

    // }
    setReservedCellObj(word,wordId,randRow,randCol, 'diagonalRtl');
}

function setReservedCellObj(word, wordId, randRow, randCol, direction){
    let reservedCellObj = {};
    for(i = 0; i<word.length;i++){
        reservedCellObj.letter = word[i];
        if( direction == 'diagonalRtl'){
            reservedCellObj.row = randRow++;
            reservedCellObj.col = randCol++;
        }
        else if(direction == 'upBottom'  ){
            reservedCellObj.row = randRow++;;
            reservedCellObj.col = randCol;
        }
        else if(direction == 'rtl' ) {
            reservedCellObj.row = randRow;
            reservedCellObj.col = randCol++;
        }
        
        
        reservedCellObj.wordId = wordId;
        
        reservedCellsArr.push(reservedCellObj);
        reservedCellObj = {};

    }
}

console.log('reservedCellsArr: ',reservedCellsArr);

function paintSideBar(){

    let parent = document.getElementById('sideBar');

    let ulOpen = `<ul>`;
    let li = '';

    // for(let i = 0; i<wordsArrLength; i++){
    //     li += `<li id="${wordsArr[i]}" class="wordsList" >${wordsArr[i]}</li>`
    // }

    for(let i = 0; i<wordsArrLength; i++){
        li += `<li id="word_${wordObjArr[i].wordId}" class="wordsList" >${wordObjArr[i].originalWord}</li>`
    }
    let ulClose = `</ul> `;
    newChild = ulOpen+li+ulClose;
    parent.insertAdjacentHTML('beforeend',newChild);  
}




function paint(){

    let parent = document.getElementById('theTable');
    let td = '';
    let trOpen = '';
    let trClose = '';
    let newChild = '';
    for (let r = 1; r<=rows; r++){
        
        trOpen = `<tr>`;
       for(let c = cols; c>=1;c--){
        let currentLetter = getRandLetter(r,c);
            td += `<td row=${r} col=${c} class="cellLetter" >
                        <span row=${r} col=${c} class="spanLetter"> ${currentLetter.letter} </span>
                    </td>`
       }
        trClose = `</tr> `;
        newChild += trOpen+td+trClose;
        parent.insertAdjacentHTML('beforeend',newChild);
        newChild = '';
        td = '';
   }
}


function getRandLetter(row,col){
    //check if cell is a reserved letter
    
    let currentLetterObj = reservedCellsArr.find(x=>x.row === row && x.col === col);
    
    if(typeof currentLetterObj !== 'undefined'){
     //   console.log( currentLetterObj.letter, row, col,currentLetterObj.wordId );
        return currentLetterObj;
    }

//If cell is not reserved generate a rand letter

    // let randLetter = {letter : 'x', wordId : 'x'}
    // return randLetter; // For testing
    
    let randLetterIndex = Math.floor(Math.random() * lettersArr.length);
    return {letter : lettersArr[randLetterIndex]};
 }


//++++++++++++ <INTERACTIVITY MOUSE OVER> +++++++++++++++

let cells = document.getElementsByClassName('cellLetter');//.addEventListener('click', func(), false);

//Assign events
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousemove", mouseMove);

let currentRow ;
let currentCol;
let isDown = false;
//let cellsMarkedArr = [];
//let currentCellMarkedObj = {row : -1, col : -1, counter: -1, letter : ''};
let cellsMarkedCounter = 0;
let liveTextInput = document.getElementById('liveText');
let liveText = '';
let tempRow=0;
let tempCol=0;
let direction;
let counterSolved = 0;

function mouseDown(e){
    isDown = true;
    let tdSpanClasslist = e.toElement.classList;
    if( tdSpanClasslist.contains('cellLetter') ){
        currentRow =Number( e.target.getAttribute('row'));
        currentCol = Number(e.target.getAttribute('col'));
        liveText = e.target.textContent.trim();
        liveTextInput.value = liveText.trim();
        cellsMarkedCounter++;
        markCell(e, 'td');
      //  console.log('td clicked', currentRow, currentCol, cellsMarkedCounter)
    }
    else if(tdSpanClasslist.contains('spanLetter')){
        currentRow = Number(e.target.getAttribute('row'));
        currentCol = Number(e.target.getAttribute('col'));
        liveText = e.target.textContent.trim();
        liveTextInput.value = liveText.trim();
        cellsMarkedCounter++;
        markCell(e, 'span' ); // send td element
      //  console.log('span clicked', currentRow, currentCol, cellsMarkedCounter);
        // console.log('span clicked', e.target.parentElement);
    }
}

function mouseMove(e){ 
    if(isDown){     
        let TempCurrentRow = Number(e.target.getAttribute('row'));   
        let TempCurrentCol = Number(e.target.getAttribute('col'));   
    // console.log('mouseMove', currentRow, currentCol,  e.target.getAttribute('row'), e.target.getAttribute('col'));
        if(currentRow !== TempCurrentRow || currentCol !== TempCurrentCol){
             let tdSpanClasslist = e.toElement.classList;
             if( tdSpanClasslist.contains('spanLetter')){                
                if(isInTheRightDirection(TempCurrentRow, TempCurrentCol)){

                //console.log(`isInTheRightDirection = True ` );
                liveText += e.target.textContent.trim();
                liveTextInput.value = liveText.trim();
                cellsMarkedCounter++;
                
                currentRow = TempCurrentRow;//e.target.getAttribute('row');
                currentCol = TempCurrentCol;//e.target.getAttribute('col');

                markCell(e, 'span');
                isWordFound();

                }               
             }           
        }      
    }
}

function isWordFound(){
    console.log(`isWordFound`);
    let wordCheck = wordObjArr.find(x=>x.word === liveText )

    if(typeof wordCheck !== 'undefined'){
        console.log(`word found! wordId = ${wordCheck.wordId}`);
        let markedCells = document.getElementsByClassName('markedCell');
        for(let i = 0;i<markedCells.length;i++){
            markedCells[i].classList.add('solved');
        }
        let li = document.getElementById(`word_${wordCheck.wordId}`);
        li.classList.add('liSolved'); 
        counterSolved++; 
        if(counterSolved == wordsArr.length){
            setTimeout(() => {
                alert('כל הכבוד! הצלחת :-)');
                location.reload();
            }, 400);
            
        }
    }
    
}

function markCell(e, elType){
    
    if(cellsMarkedCounter == 2){
     //   console.log(`cellsMarkedCounter = 2 ; tempRow = ${tempRow} tempCol = ${tempCol} row = ${currentRow} col = ${currentCol}` );
       determineDirection();
    }

        if(elType == 'span'){
            let parent = e.target.parentElement;
            parent.classList.add('markedCell');
    
        }
        else if(elType == 'td'){
            e.target.classList.add('markedCell');
        } 
        tempRow = currentRow;
        tempCol = currentCol;

}

function determineDirection(){
    if(tempRow == currentRow && currentCol > tempCol){
        direction = 'rtl';
    }
    else if(currentRow > tempRow && tempCol == currentCol){
        direction = 'upBottom';
    }
    else if(currentRow > tempRow && currentCol > tempCol){
        direction = 'diagonalRtl';
    }
}

function isInTheRightDirection(row, col){

    // ltr, diagonalLtr and bottom-up are not allowed
    // if(cellsMarkedCounter == 1){
        if(row < currentRow || col < currentCol){
            return false;
        }
    // }

    if(direction == 'rtl'){
         if(row != currentRow  ){
            
             return false;
         }
         else{
            if(col - 1 != currentCol){// force consecutive
                return false;
            }
         }
    }
    else if(direction == 'upBottom'){
        if(col!=currentCol){
            return false;
        }
        else{
            if(row - 1 != currentRow){ // force consecutive
                return false;
            }
        }

    }
    else if(direction == 'diagonalRtl'){
        //console.log(`diagonalRtl: row: ${row} col: ${col} currentRow: ${currentRow} currentCol: ${currentCol}`)
        if(col<=currentCol || row <= currentRow){
            console.log('INSIDE col<=currentCol || row <= currentRow' );
            console.log(`diagonalRtl: row: ${row} col: ${col} currentRow: ${currentRow} currentCol: ${currentCol}`);
            return false;
        }
        else
         if(row - 1 != currentRow || col - 1 != currentCol){ // force consecutive
                console.log('INSIDE row - 1 != currentRow || col - 1 != currentCol');
                return false;
            
        }
    }

    return true;
}

function mouseUp(){
    //Reset 
    isDown = false;
    currentRow = 0;
    currentCol = 0;
    liveText = '';
    cellsMarkedCounter = 0;
    // currentCellMarkedObj = {row : -1, col : -1, counter: -1};
    // cellsMarkedCounter = 0
    liveTextInput.value = '';
    direction = '';

    // // Unmark cells
     unmarkCells();
}
function unmarkCells(){
    for(let i = 0;i<cells.length;i++){
        cells[i].classList.remove('markedCell');
    }
}



// //++++++++++++ <INTERACTIVITY MOUSE OVER> +++++++++++++++

// let cells = document.getElementsByClassName('cellLetter');//.addEventListener('click', func(), false);

// //Assign events
// document.addEventListener("mousedown", mouseDown);
// document.addEventListener("mouseup", mouseUp);
// document.addEventListener("mousemove", mouseMove);

// let currentRow ;
// let currentCol;
// let isDown = false;
// let cellsMarkedArr = [];
// let currentCellMarkedObj = {row : -1, col : -1, counter: -1, letter : ''};
// let cellsMarkedCounter = 0;
// let liveTextSpan = document.getElementById('liveText');
// //let liveText = '';

// function mouseDown(e){
//     isDown = true;
//     currentRow = e.target.getAttribute('row');
//     currentCol = e.target.getAttribute('col');
   
//    // console.log('td clicked', currentRow, currentCol)

//     currentCellMarkedObj = {row : currentRow, col : currentCol, counter: cellsMarkedCounter};
//     // Mark the first cell 
//     markCell(e); 
  
// }

// function mouseMove(e){ 
//     if(isDown){  
//    // console.log('mouseMove', currentRow, currentCol, e.target, currentRow !== e.target.getAttribute('row'));
//         if(currentRow !== e.target.getAttribute('row') || currentCol !== e.target.getAttribute('col')){
//           //  console.log('mouseMove GO TO MARKCELL', currentRow, currentCol, e.target);
//             markCell(e); // e.toElement.style.backgroundColor = 'yellow';

//             currentRow = e.target.getAttribute('row');
//             currentCol = e.target.getAttribute('col');
        
//            // console.log('mouse MOVE',currentCellMarkedObj);
//         }      
//     }
// }


// function markCell(e){
//    // console.log('markCell parent: ', e.target);
//     if( e.target.classList.contains('spanLetter')){
//         let parent = e.target.parentElement; // Get parent td
//         //console.log( e.target.textContent);
       
//         liveTextSpan.value += e.target.textContent;
        
//         parent.classList.add('markedCell');

//         cellsMarkedCounter++;
//         currentCellMarkedObj = {row : currentRow, col : currentCol, counter: cellsMarkedCounter};

//         console.log('span mark',currentCellMarkedObj);

//     }
//     else if(e.target.classList.contains('cellLetter')){
//         liveTextSpan.value += e.target.textContent;
        
//        e.target.classList.add('markedCell');

//         cellsMarkedCounter++;
//         currentCellMarkedObj = {row : currentRow, col : currentCol, counter: cellsMarkedCounter};

//         console.log('td mark',currentCellMarkedObj);
//     }  
// }

// function mouseUp(){
//     //Reset 
//     isDown = false;
//     currentRow = '';
//     currentCol = '';
//     currentCellMarkedObj = {row : -1, col : -1, counter: -1};
//     cellsMarkedCounter = 0
//     liveTextSpan.value = '';

//     // Unmark cells
//     unmarkCells();
// }

// function unmarkCells(){
//     for(let i = 0;i<cells.length;i++){

//        // cells[i].style.backgroundColor = 'white';
//         cells[i].classList.remove('markedCell');
//     }
// }
// function getWordByRowCol(){

// }

// // 2nd cell should determine direction
// // from 3 rd and later only direction set should be highlighted 




// // //++++++++++++ <INTERACTIVITY MOUSE CLICK> +++++++++++++++

// //2nd click determines direction 
// //nothing but close-by cell can be marked (in one of 3 directions) 

// let cells = document.getElementsByClassName('cellLetter');//.addEventListener('click', func(), false);
// let cellsMarkedArr = [];
// let currentCellMarkedObj = {row : -1, col : -1, counter: -1, letter : ''};
// let cellsMarkedCounter = 0;
// let direction;
// let currentRow;
// let currentCol;

// for (var i = 0; i < cells.length; i++) {
//     cells[i].addEventListener('click', markCell, false);
// }

//   function markCell(e){

//     currentRow = e.target.getAttribute('row');
//     currentCol = e.target.getAttribute('col');
    

//    // console.log(currentRow, currentCol);
//     if( e.target.classList.contains('spanLetter')){
//         e.target.parentElement.classList.add('markedCell');
//        // console.log('span');

//     }
//     else if(e.target.classList.contains('cellLetter')){
//         e.target.classList.add('markedCell');
//         //console.log('td');
//     }
//     cellsMarkedCounter++;


//     console.log(cellsMarkedCounter);

// }

// function determineDirection(){

// }
