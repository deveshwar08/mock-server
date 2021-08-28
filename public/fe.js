function createEndPoint() {
    document.getElementsByClassName('create-endpoint')[0].style.display = 'inline';
}
function createModel() {
    document.getElementsByClassName('create-model')[0].style.display = 'inline';
}
async function deleteModel(ele) {
    console.log('deleting');
    const modelname = ele.parentElement.firstElementChild.innerText;
    const servername = ele.parentElement.parentElement.parentElement.firstElementChild.innerText;
    const res = await fetch('/' + servername + '/model-schema/' + modelname, {
        method: 'DELETE',
        body: null,
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if(data == 'deleted')
        window.location.reload();
}
async function addData(ele) {
    const modelname = ele.parentElement.firstElementChild.innerText;
    const servername = ele.parentElement.parentElement.parentElement.firstElementChild.innerText;
    const res = await fetch('/' + servername + '/model-schema/' + modelname, {
        method: 'GET',
        body: null,
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (data.length > 0) {
        let form = addDataForm;
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement('div');
            div.className = 'form-group';
            let label = document.createElement('label');
            label.setAttribute('for', data[i].key);
            label.innerText = data[i].key;
            let input = document.createElement('input');
            input.setAttribute('name', data[i].key);
            input.setAttribute('type', data[i].type);
            input.className = 'form-control';
            input.required = true;
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        }
        let div1 = document.createElement('div');
        div1.className = 'form-group';
        let label1 = document.createElement('label');
        label1.setAttribute('for', 'servername');
        label1.innerText = 'Server Name:';
        let input1 = document.createElement('input');
        input1.setAttribute('name', 'servername');
        input1.setAttribute('type', 'text');
        input1.className = 'form-control';
        input1.required = true;
        input1.readOnly = true;
        input1.setAttribute('value', servername);
        div1.appendChild(label1);
        div1.appendChild(input1);
        let div2 = document.createElement('div');
        div2.className = 'form-group';
        let label2 = document.createElement('label');
        label2.setAttribute('for', 'modelname');
        label2.innerText = 'Model Name:';
        let input2 = document.createElement('input');
        input2.setAttribute('name', 'modelname');
        input2.setAttribute('type', 'text');
        input2.className = 'form-control';
        input2.required = true;
        input2.readOnly = true;
        input2.setAttribute('value', modelname);
        div2.appendChild(label2);
        div2.appendChild(input2);
        form.appendChild(div1);
        form.appendChild(div2);
        let button = document.createElement('button');
        button.className = 'btn btn-success';
        button.setAttribute('type', 'submit');
        button.innerText = 'Add data';
        form.appendChild(button);
        document.querySelectorAll('.add-data')[0].style.display = 'inline';
        document.querySelectorAll('.add-data')[0].appendChild(form);
    }
}
function addOption() {
    let form = createModelForm;
    let option = Number(form.children.length);
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
    label1.setAttribute('for', 'key' + option);
    label1.innerText = "Key: ";
    let input1 = document.createElement('input');
    input1.className = 'form-control';
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', 'key' + option);
    input1.required = true;
    let label2 = document.createElement('label');
    label2.setAttribute('for', 'type' + option);
    label2.innerText = "Type: ";
    let select = document.createElement('select');
    select.setAttribute('name', 'type' + option);
    let option1 = document.createElement('option');
    option1.setAttribute('value', 'String');
    option1.innerText = 'String';
    let option2 = document.createElement('option');
    option2.setAttribute('value', 'Number');
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

createEndPointForm.addEventListener('submit', async e => {
    e.preventDefault();
    const servername = createEndPointForm.servername.value;
    const admin = createEndPointForm.admin.value;

    const res = await fetch('/create-server', {
        method: 'POST',
        body: JSON.stringify({ servername, admin }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (data.servername)
        window.location.reload();
});
const createModelForm = document.querySelector('#create-model-form');
createModelForm.addEventListener('submit', async e => {
    e.preventDefault();

    let arr = [];
    for (let i = 3; i < createModelForm.children.length; i++) {
        let obj = { "key": "", "type": "" };
        console.log(i);
        obj["key"] = createModelForm.children[i].firstElementChild.children[1].children[1].value;
        obj["type"] = createModelForm.children[i].firstElementChild.children[2].children[1].value;
        arr.push(obj);
    }
    let servername = createModelForm.children[2].children[1].value;
    let modelname = createModelForm.children[1].children[1].value;
    console.log(servername, modelname, arr);
    const res = await fetch('/create-model', {
        method: 'POST',
        body: JSON.stringify({ servername, modelname, arr }),
        headers: { 'Content-Type': 'application/json' }
    });

})
const addDataForm = document.querySelector('#add-data-form');

addDataForm.addEventListener('submit', async e => {
    e.preventDefault();
    let arr = [];
    for (let i = 0; i < addDataForm.children.length - 3; i++) {
        arr.push(addDataForm.children[i].children[1].value);
    }
    const servername = addDataForm.servername.value;
    const modelname = addDataForm.modelname.value;

    const res = await fetch('/'+servername+'/'+modelname+'/add-data',{
        method: 'POST',
        body: JSON.stringify({arr}),
        headers: {'Content-Type': 'application/json'}
    }); 

    const data = await res.json();
    if(data == 'successs')
        window.location.reload();

})