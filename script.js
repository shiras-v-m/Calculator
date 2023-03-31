time=document.getElementById("time");
ques=ques=JSON.parse(localStorage.getItem("ques"))
if(ques){
    

}
else{
    ques=[]
}
answ=[]
resultCopy=''
ansCopy=''
ifHistory=false
var calc=false
// check wethear mobile or desktop
let details = navigator.userAgent;
      
     
      let regexp = /android|iphone|kindle|ipad/i;
        

      let isMobileDevice = regexp.test(details);
        
      
     
getTime = ()=>{
    amorpm=''
    let date=new Date();
    let hours=date.getHours();
    if(hours>12){
        hours-=12
        amorpm='PM'
    }
    else{
        amorpm='AM'
    }

    hours<10?hours="0"+hours:hours

    // if(hours.length==1)
    // {hours="0"+hours}
    let minutes=date.getMinutes();
    let seconds=date.getSeconds();
    minutes<10?minutes="0"+minutes:minutes
    seconds<10?seconds="0"+seconds:seconds
    time.innerHTML=`${hours}:${minutes}:${seconds} ${amorpm}`;
    setTimeout(()=>{
        getTime()
        
    },1000)
}
getTime();

// display content of a button in calculator display
function display(content){
    resultCopy=''
    ansCopy=''
    
        result.value+=content;
    
    
    console.log(calc);
    ifHistory=true
    console.log("result.value[length-1]",result.value[result.value.length-1])
    if(calc==true && (result.value[result.value.length-1]=='+' || result.value[result.value.length-1]=='-' || result.value[result.value.length-1]=='*' || result.value[result.value.length-1]=='/' || result.value[result.value.length-1]=='%')){
        op=result.value[result.value.length-1]
        result.value=ans.value+op
        calc=false
        
    }
    
    
    result.style.color="white"
    ans.style.color="rgb(229, 229, 229)"
    result.focus();
    result.setSelectionRange(result.value.length,result.value.length);
    if (isMobileDevice) {
        result.style.fontSize ="36px"
        ans.style.fontSize ="38px"
     
    }
    else{
        ans.style.fontSize ="24px"
    }
    
        check();
}

// all clear content of calculator display
function allClear(){
    ifHistory=false
    result.value="";
    ans.value='';
    document.getElementById("equalSymbol").style.display = "none";

    ans.style.color="rgb(229, 229, 229)"
    result.style.color="white"
    if (isMobileDevice) {
        result.style.fontSize ="36px"
        ans.style.fontSize ="38px"
     
    }
    else{
        
        ans.style.fontSize ="24px"
    }
    
}

function back(){
    ifHistory=false
     result.value=result.value.slice(0,-1);
    if(result.value.length==0){
        allClear();
    }
    else{
        if(result.value[result.value.length-1]=='+' || result.value[result.value.length-1]=='-' || result.value[result.value.length-1]=='*' || result.value[result.value.length-1]=='/' || result.value[result.value.length-1]=='%'){
            temp=result.value.slice(0,-1);
            ans.value=eval(temp)
        }
            
        else
            check()
        ans.style.color="rgb(229, 229, 229)"
        result.style.color="white"
        if (isMobileDevice) {
            result.style.fontSize ="36px"
            ans.style.fontSize ="38px"
         
        }
        else{
             result.style.fontSize ="26px"
            ans.style.fontSize ="24px"
        }
        
    }
    // check()
}

// calculate
function calculate(){
   try{
    if(result.value){
    calc=true
    // result.value=eval(result.value)
    ans.value=eval(result.value);
    document.getElementById("equalSymbol").style.display = "block";
    ans.style.color="white"
    result.style.color="rgb(229, 229, 229)"
    if (isMobileDevice) {
        result.style.fontSize ="36px"
        ans.style.fontSize ="46px"
        
    }
    else{
        result.style.fontSize ="25px"
        ans.style.fontSize ="30px"
    }
    

    if(result.value!=resultCopy && ans.value!=ansCopy){
        output.innerHTML=''
        resultCopy=result.value
        ansCopy=ans.value
        ques.push(resultCopy)
        quesadd=JSON.stringify(ques)
        localStorage.setItem("ques",quesadd)
        
        answ.push(ansCopy)
        answadd=JSON.stringify(answ)
        localStorage.setItem("answ",answadd)

    
        // array=JSON.parse(localStorage.getItem("ques"))
        
        array=JSON.parse(localStorage.getItem("ques"))
        for(item in array) {
            

        output.innerHTML+=
        `<div class="notesFrame" >
        <p class="ques">${array[item]} </p>
        <p class="ans">=  ${eval(array[item])} </p>

    </div>`
    }
        console.log("array = ",array ,'typeof =',typeof(array));
      
       
    document.getElementById("history").style.display = "block";
    
    
   
    }
    
   
   }
   }
   catch{
    // alert("invalid expression")
   }
}

function check(){
    // if (result.value.indexOf('+')>-1 || result.value.indexOf('-')> -1 || result.value.indexOf('*')> -1 || result.value.indexOf('/')> -1 || result.value.indexOf('%')> -1)
    try{

        ans.value=eval(result.value)
        document.getElementById("equalSymbol").style.display = "block";
    }
    catch{

    }

}

// history
const closeBtn=document.querySelector(".closeBtn")
const historyBtn=document.querySelector(".historyBtn");
const clearBtn=document.querySelector("#clearBtn")

const historyFrame=document.querySelector(".historyFrame")
closeBtn.addEventListener("click",()=>{
    historyFrame.style.display="none"
    
})

    const history=document.querySelector('.history')
historyBtn.addEventListener("click",()=>{
    output.innerHTML=''
    historyFrame.style.display="block"
    history.style.display="block"
    historyFrame.style.height="100%"
    historyFrame.style.transition = "all 2s";

    array=JSON.parse(localStorage.getItem("ques"))
    console.log("retrieved values",array)
        for(item in array) {
            console.log("item=",array[item]);

        output.innerHTML+=
        `<div class="notesFrame" >
        <p class="ques">${array[item]} </p>
        <p class="ans">=  ${eval(array[item])} </p>

    </div>`
    }
})

clearBtn.addEventListener("click",()=>{
    alert("cleared")
    allClear()
    localStorage.clear();
    output.innerHTML=''
    ques=[]
 

})
// swipe detection begins

// document.addEventListener('touchstart', handleTouchStart, false);        
// document.addEventListener('touchmove', handleTouchMove, false);

// var xDown = null;                                                        
// var yDown = null;

// function getTouches(evt) {
//   return evt.touches ||             // browser API
//          evt.originalEvent.touches; // jQuery
// }                                                     
                                                                         
// function handleTouchStart(evt) {
//     const firstTouch = getTouches(evt)[0];                                      
//     xDown = firstTouch.clientX;                                      
//     yDown = firstTouch.clientY;                                      
// };                                                
                                                                         
// function handleTouchMove(evt) {
//     if ( ! xDown || ! yDown ) {
//         return;
//     }

//     var xUp = evt.touches[0].clientX;                                    
//     var yUp = evt.touches[0].clientY;

//     var xDiff = xDown - xUp;
//     var yDiff = yDown - yUp;
                                                                         
//     if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
//         if ( xDiff > 0 ) {
//             /* right swipe */ 
//             alert("right swipe")
//         } else {
//             /* left swipe */
//             alert("left swipe")
//         }                       
//     } else {
//         if ( yDiff > 0 ) {
//             /* down swipe */ 
//         } else { 
//             /* up swipe */
//         }                                                                 
//     }
//     /* reset values */
//     xDown = null;
//     yDown = null;                                             
// };

// swipe detection ends