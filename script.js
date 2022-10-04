window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})


let btnone = document.querySelector('.btnone');
let divone = document.querySelector('.divone');

let btntwo = document.querySelector('.btntwo');
let divtwo = document.querySelector('.divtwo');

let btnthree = document.querySelector('.btnthree');
let divthree = document.querySelector('.divthree');

let btnfour = document.querySelector('.btnfour');
let divfour = document.querySelector('.divfour');

let sec = document.querySelector('.sections');




btnone.addEventListener('click', () =>{
    if(divone.style.display === 'none'){
        divtwo.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'none';
        divone.style.display = 'block';
        divone.classList.toggle("open");
        
        if (divtwo.classList.contains("open"))
        {
            divtwo.classList.toggle("open");
        }
        if (divthree.classList.contains("open"))
        {
            divthree.classList.toggle("open");
        }
        if (divfour.classList.contains("open")){
            divfour.classList.toggle("open");
        }

    }else if (divone.style.display === 'block') {
        divone.style.display = 'none';
        divtwo.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'none';  
        divone.classList.toggle("open");
        
        
    }
    if (divone.classList.contains("open") || divtwo.classList.contains("open") || divthree.classList.contains("open") || divfour.classList.contains("open")) {
        sec.classList.add("active");
    }
    else {
        sec.classList.remove("active");
    }

})

btntwo.addEventListener('click', () =>{
    if(divtwo.style.display === 'none'){
        divone.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'none';
        divtwo.style.display = 'block';
        divtwo.classList.toggle("open");
        if (divone.classList.contains("open"))
        {
            divone.classList.toggle("open");
        }
        if (divthree.classList.contains("open"))
        {
            divthree.classList.toggle("open");
        }
        if (divfour.classList.contains("open")){
            divfour.classList.toggle("open");
        }


    }else if (divtwo.style.display === 'block') {
        divone.style.display = 'none';
        divtwo.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'none';
        divtwo.classList.toggle("open");
        
    }
    if (divone.classList.contains("open") || divtwo.classList.contains("open") || divthree.classList.contains("open") || divfour.classList.contains("open")) {
        sec.classList.add("active");
    }
    else {
        sec.classList.remove("active");
    }
})


btnthree.addEventListener('click', () =>{
    if(divthree.style.display === 'none'){
        divone.style.display = 'none';
        divtwo.style.display = 'none';
        divfour.style.display = 'none';
        divthree.style.display = 'block';
        divthree.classList.toggle("open");
        
        if (divtwo.classList.contains("open"))
        {
            divtwo.classList.toggle("open");
        }
        if (divone.classList.contains("open")){
            divone.classList.toggle("open");
        }
        if (divfour.classList.contains("open")){
            divfour.classList.toggle("open");
        }
        


    }else if (divthree.style.display === 'block') {
        divone.style.display = 'none';
        divtwo.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'none';
        divthree.classList.toggle("open");
    }
    if (divone.classList.contains("open") || divtwo.classList.contains("open") || divthree.classList.contains("open") || divfour.classList.contains("open")) {
        sec.classList.add("active");
    }
    else {
        sec.classList.remove("active");
    }
    
})


btnfour.addEventListener('click', () =>{
    if(divfour.style.display === 'none'){
        divone.style.display = 'none';
        divtwo.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'block';
        divfour.classList.toggle("open");
        if (divtwo.classList.contains("open"))
        {
            divtwo.classList.toggle("open");
        }
        if (divone.classList.contains("open")){
            divone.classList.toggle("open");
        }
        if (divthree.classList.contains("open")){
            divthree.classList.toggle("open");
        }

    }else if (divfour.style.display === 'block') {
        divone.style.display = 'none';
        divtwo.style.display = 'none';
        divthree.style.display = 'none';
        divfour.style.display = 'none';
        divfour.classList.toggle("open");
    }
    if (divone.classList.contains("open") || divtwo.classList.contains("open") || divthree.classList.contains("open") || divfour.classList.contains("open")) {
        sec.classList.add("active");
    }
    else {
        sec.classList.remove("active");
    }
}
)