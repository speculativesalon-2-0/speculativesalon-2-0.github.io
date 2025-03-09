

const table = document.querySelector('.artistTable');
const filePath = 'https://raw.githubusercontent.com/speculativesalon/speculativesalon.github.io/main/data.jsonl';
let elementsWithDateRev = null;
const increment = 30;
let numImages = increment;


// Function to load elements from a JSONL file using Fetch API
async function loadElementsFromJsonlFile(filePath) {
  const response = await fetch(filePath);
  const jsonlData = await response.text();
  const elements = [];

  jsonlData.split('\n').forEach((line) => {
    if (line.trim() !== '') {
      const element = JSON.parse(line);
      elements.push(element);
    }
  });

  return elements;
}

// Function to assign "dateCreated" field with timestamps
function assignDateCreated(elements) {
  let filteredElements = new Array();
  const startDate = new Date('May 30, 2023 18:00:00 GMT+0300'); // Start date and time
  const minute = 60 * 1000* 10; // One minute in milliseconds
  let now = Date.now(); // Current timestamp

  for (let i = 0; i < elements.length; i++) {
    let timestamp = startDate.getTime() + (i * minute);
      if (timestamp <= now) {
          console.log(now)
      let el = elements[i]
      el.time = new Date(timestamp).toUTCString().slice(0, -12);
      filteredElements.push(el) 
      }
  }
    return filteredElements;
  }



// Load elements from the JSONL file
loadElementsFromJsonlFile(filePath)
  .then((elements) => {
    // Assign "dateCreated" field with timestamps
    const elementsWithDate = assignDateCreated(elements);
    elementsWithDateRev = elementsWithDate.reverse();
       for  (let step = 0; step < increment; step++){
            addToPage(elementsWithDateRev[step], false);
    }
  })
  .catch((error) => {
    console.error('Error loading elements:', error);
  });



window.addEventListener('DOMContentLoaded',()=>{
   loadElementsFromJsonlFile() 
})



function loadMore(){


    for (let i = numImages; i<= numImages+increment; i++){
            addToPage(elementsWithDateRev[i], false); 
    }
    numImages += increment;
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}




function addToPage(el, addTop){

   const frame = document.createElement('tr')
   if (addTop){ 
    insertAfter(frame,  table.firstElementChild);
   }else{
        table.append(frame)
   }
   const tdImg = document.createElement('div');
   const img = document.createElement('img');
   img.src = el.img

   //const link = document.createElement('a');
    
   //link.href = el.img + '_small.jpeg'
   //link.appendChild(img)
   //tdImg.append(link)
   tdImg.append(img)
   const name = document.createElement('div')
   name.textContent = 'Speculative Collaboration between: '

   //name.textContent = 'Artists: ' + el.name1 + ', ' + el.name2;
   const port1 = document.createElement('a')
   const and = document.createElement('text')
   and.textContent = ' and '
   port1.textContent = el.name1
   port1.href = el.port1
   const port2 = document.createElement('a')
   port2.textContent = el.name2 
   port2.href = el.port2

   name.append(port1)
    name.append(and)
   name.append(port2)
   const dateDiv = document.createElement('div')
   dateDiv.textContent = "Created: " + el.time
   dateDiv.id = 'bottomDiv'
   frame.append(tdImg)
   frame.append(name)
   frame.append(dateDiv)
   frame.append(document.createElement('br'))
}


//const refreshIntervalSeconds = 10; // Change this value to your desired interval
//setInterval(fetchData, refreshIntervalSeconds * 1000);





