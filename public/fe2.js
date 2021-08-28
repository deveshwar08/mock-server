const getAllForm = document.querySelector('#get-all-form');

getAllForm.addEventListener('submit', async e => {
    e.preventDefault();

    const servername = getAllForm.servername.value;
    const modelname = getAllForm.modelname.value;

    const res = await fetch('/'+servername+'/api/'+modelname+'/all/',{
        method: 'GET',
        body: null,
        headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    console.log(data[0]);
    document.querySelectorAll('.display')[0].innerText = JSON.stringify(data);
});

const getIdForm = document.querySelector('#get-id-form');

getIdForm.addEventListener('submit', async e => {
    e.preventDefault();

    const servername = getIdForm.servername.value;
    const modelname = getIdForm.modelname.value;
    const id = getIdForm.id.value;

    const res = await fetch('/'+servername+'/api/'+modelname+'/'+id,{
        method: 'GET',
        body: null,
        headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();

    document.querySelectorAll('.display')[0].innerText = JSON.stringify(data);
});
