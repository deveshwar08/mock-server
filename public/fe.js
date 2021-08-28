function createEndPoint() {
    document.getElementsByClassName('create-endpoint')[0].style.display = 'inline';
    console.log(document.getElementsByClassName('create-endpoint')[0].style.display);
}

function addOption(){
    let form = document.querySelector('#create-model-form');
    let option = Number(form.children.length) + 1;
    let div = document.createElement('div');
    div.className = 'form-group';
    let fieldSet = document.createElement('fieldset');
    let legend = document.createElement('legend');
    legend.innerText = "Option";
    let div1 = document.createElement('div');
    div1.className = 'form-group';
    let div2 = document.createElement('div');
    div2.className = 'form-group';
    let label1 = document.createElement('label');
    label1.setAttribute('for','key'+option);
    label1.innerText = "Key: ";
    let input1 = document.createElement('input');
    input1.className = 'form-control';
    input1.setAttribute('type','text');
    input1.setAttribute('name','key'+option);
    input1.required = true;
    let label2 = document.createElement('label');
    label2.setAttribute('for','type'+option);
    label2.innerText = "Type: ";
    let select = document.createElement('select');
    select.setAttribute('name','type'+option);
    let option1 = document.createElement('option');
    option1.setAttribute('value','String');
    option1.innerText = 'String';
    let option2 = document.createElement('option');
    option2.setAttribute('value','Number');
    option2.innerText = 'Number';
    select.required = true;
    select.className = 'form-control';
    select.appendChild(option1);
    select.appendChild(option2);
    div1.appendChild(label1);
    div1.appendChild(input1);
    div2.appendChild(label2);
    div2.appendChild(select);
    fieldSet.appendChild(legend);
    fieldSet.appendChild(div1);
    fieldSet.appendChild(div2);
    div.appendChild(fieldSet);
    form.appendChild(div);
    
}
const createEndPointForm = document.querySelector('#create-endpoint-form');

createEndPointForm.addEventListener('submit', async e=> {
    e.preventDefault();
    const servername = createEndPointForm.servername.value;
    const admin = createEndPointForm.admin.value;

    const res = await fetch('/create-server',{
        method: 'POST',
        body: JSON.stringify({servername, admin}),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    if(data.servername)
        window.location.reload();
});