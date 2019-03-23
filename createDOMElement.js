

function createDOMElement(element, id, innerText = '', width = 100, height = 40){
    //defininng the element
    let tmpElement = document.createElement(element);
    //setting the properties
    tmpElement.width = width;
    tmpElement.height = height;
    tmpElement.innerHTML = innerText;
    document.body.appendChild(tmpElement).id = id;

    return tmpElement;
}

 

 

 
 


