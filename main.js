$(document).ready(function () {
  
    let cur = 0, pressed = 'none', mem = 0;
    
    function update() {
      document.getElementById("input").value = cur;
    }
    
    function toNumber() {

      mem = Number.parseFloat(mem)
      cur = Number.parseFloat(cur);
    }
    function toMem() {
      if (pressed == 'divide') 
        mem /= cur
      else if (pressed == 'times') 
        mem*=cur
      else if (pressed == 'minus') 
        mem-=cur
      else if (pressed == 'plus') 
        mem+=cur
      cur=0;
      update();
    }
    function allClear() {
      cur = 0, mem=0, pressed = 'none';
      update();
      
    }
    //#dot is not functional
    $('#ac').click(function () {
      allClear();
      
    });
    $('#ce').click(function () {
        allClear();
        
      });
    $('#enter').click(function () {
      console.log(cur);
      toNumber();
      if (cur == 0) {
        cur=mem;
        mem=0;
        
      }
      if (mem !== 0) {
        toMem();
        cur=mem;
        mem = 0;
        update();
        
      }
      pressed = 'equals';
      
    });
    $('.number').click(function() {
      if(pressed == 'equals') {
        allClear();
        pressed = 'num';
        
      }
      let number=$(this).attr('id');
      if (cur == 0)
        cur = number;
      else{cur += number;}
      update();
  
    });
    $('.operator').click(function () {
      if (mem == 0) {mem=cur;}
      if($(this).is('#divide')) {
        toNumber();
        toMem();
        pressed = 'divide';
        
      }
      else if($(this).is('#x')) {
        toNumber();
        toMem()
        pressed = 'times';
        
      }
      else if($(this).is('#minus')) {
        toNumber();
        toMem();
        pressed = 'minus';
        
      }
      else if($(this).is('#plus')) {
        toNumber();
        toMem();
        pressed = 'plus';
        
      }
      else if($(this).is('#percent')) {
        cur.toString();
        cur += '00';
        update();
        console.log(typeof cur);
        
      }
    });
    $('#dot').click(function() {
      cur += '.';
      update();
    });
 
  });